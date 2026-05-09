<?php

declare(strict_types=1);

namespace App\Services\Radio;

use App\Models\Sound;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class RadioStreamService
{
    private const CACHE_KEY_NOW_PLAYING = 'radio:now-playing';
    private const CACHE_KEY_HISTORY = 'radio:history';
    private const CACHE_KEY_LISTENERS = 'radio:listeners';
    private const CACHE_KEY_EPOCH = 'radio:epoch';
    private const CACHE_KEY_PLAYLIST = 'radio:playlist';

    private int $icyMetaint;
    private int $chunkSize;
    private int $historyLimit;
    private bool $shuffle;
    private int $tempUrlTtlMinutes;
    private bool $loop;
    private int $gapMs;

    public function __construct()
    {
        $this->icyMetaint = config('radio.icy_metaint', 8192);
        $this->chunkSize = config('radio.chunk_size', 8192);
        $this->historyLimit = config('radio.history_limit', 20);
        $this->shuffle = config('radio.playlist_shuffle', true);
        $this->tempUrlTtlMinutes = config('radio.temp_url_ttl_minutes', 60);
        $this->loop = config('radio.loop', true);
        $this->gapMs = config('radio.gap_ms', 500);
    }

    public function getPlaylist(): Collection
    {
        return Sound::public()
            ->with(['user', 'soundFile'])
            ->whereHas('soundFile', function ($query) {
                $query->where(function ($q) {
                    $q->whereNotNull('radio_path')
                        ->orWhere('mime_type', 'audio/mpeg');
                });
            })
            ->get();
    }

    public function getPlaylistMimeType(): string
    {
        $playlist = $this->getDeterministicPlaylist();

        if ($playlist->isEmpty()) {
            return 'audio/mpeg';
        }

        $hasRadio = $playlist->contains(fn (Sound $s) => $s->soundFile?->radio_path !== null);

        if ($hasRadio) {
            return 'audio/mpeg';
        }

        $mimes = $playlist->pluck('soundFile.mime_type')->filter()->unique()->values();

        if ($mimes->count() === 1) {
            return $mimes->first();
        }

        return 'audio/mpeg';
    }

    public function supportsIcyMetadata(): bool
    {
        $mime = $this->getPlaylistMimeType();

        return str_starts_with($mime, 'audio/mpeg') || str_starts_with($mime, 'audio/mp3');
    }

    /**
     * Retourne les sons effectivement jouables (MP3 ou convertis en MP3).
     * Seuls les IDs sont mis en cache pour éviter la sérialisation d'objets Eloquent.
     */
    public function getPlayablePlaylist(): Collection
    {
        $ids = Cache::remember(self::CACHE_KEY_PLAYLIST, 60, function () {
            $sounds = $this->getPlaylist();

            if ($sounds->isEmpty()) {
                $fallbackIds = config('radio.fallback_sounds', []);
                if (! empty($fallbackIds)) {
                    $sounds = Sound::with(['user', 'soundFile'])
                        ->whereIn('id', $fallbackIds)
                        ->whereHas('soundFile')
                        ->get();
                }
            }

            return $sounds->filter(function (Sound $sound) {
                $mimeType = $sound->soundFile?->radio_mime_type ?? $sound->soundFile?->mime_type;

                return $mimeType === 'audio/mpeg';
            })->pluck('id')->all();
        });

        if (empty($ids)) {
            return new Collection();
        }

        return Sound::with(['user', 'soundFile'])
            ->whereIn('id', $ids)
            ->get();
    }

    /**
     * Playlist ordonnée de manière déterministe.
     * Si shuffle est activé, l'ordre change chaque jour mais est identique
     * pour tous les auditeurs (seed basé sur la date).
     */
    public function getDeterministicPlaylist(): Collection
    {
        $sounds = $this->getPlayablePlaylist();

        if ($sounds->isEmpty()) {
            return $sounds;
        }

        if ($this->shuffle) {
            $seed = now()->format('Y-m-d');

            return $sounds->sortBy(fn (Sound $s) => md5($seed.$s->id))->values();
        }

        return $sounds->sortBy('id')->values();
    }

    private function getEpoch(): int
    {
        return (int) Cache::get(self::CACHE_KEY_EPOCH, now()->startOfDay()->timestamp);
    }

    private function calculateCycleDuration(Collection $playlist): int
    {
        $total = 0;
        foreach ($playlist as $sound) {
            $total += (int) ($sound->duration ?? 0);
        }
        $total += $playlist->count() * (int) ceil($this->gapMs / 1000);

        return max(1, $total);
    }

    /**
     * Résout le son en cours à un timestamp Unix donné.
     * Retourne un tableau [sound, index, elapsed] ou null.
     */
    public function resolveScheduleAt(int $timestamp): ?array
    {
        $playlist = $this->getDeterministicPlaylist();

        if ($playlist->isEmpty()) {
            return null;
        }

        $epoch = $this->getEpoch();
        $elapsed = max(0, $timestamp - $epoch);
        $cycleDuration = $this->calculateCycleDuration($playlist);
        $position = $elapsed % $cycleDuration;
        $currentPos = 0;

        foreach ($playlist as $index => $sound) {
            $duration = (int) ($sound->duration ?? 0);
            $end = $currentPos + $duration;

            if ($position >= $currentPos && $position < $end) {
                return [
                    'sound' => $sound,
                    'index' => $index,
                    'elapsed' => $position - $currentPos,
                ];
            }

            $currentPos = $end + (int) ceil($this->gapMs / 1000);
        }

        // Fallback théorique (ne devrait pas arriver si cycleDuration > 0)
        return [
            'sound' => $playlist->first(),
            'index' => 0,
            'elapsed' => 0,
        ];
    }

    public function resolveCurrentSound(): ?Sound
    {
        $schedule = $this->resolveScheduleAt(time());

        return $schedule['sound'] ?? null;
    }

    public function resolveCurrentIndex(): int
    {
        $schedule = $this->resolveScheduleAt(time());

        return $schedule['index'] ?? 0;
    }

    public function resolveNextSound(): ?Sound
    {
        $playlist = $this->getDeterministicPlaylist();

        if ($playlist->isEmpty()) {
            return null;
        }

        $currentIndex = $this->resolveCurrentIndex();

        return $playlist[($currentIndex + 1) % $playlist->count()] ?? null;
    }

    public function resolveHistory(int $limit = 5): Collection
    {
        $playlist = $this->getDeterministicPlaylist();

        if ($playlist->isEmpty()) {
            return new Collection();
        }

        $currentIndex = $this->resolveCurrentIndex();
        $historyIds = [];
        $count = $playlist->count();

        for ($i = 1; $i <= $limit; $i++) {
            $idx = ($currentIndex - $i) % $count;
            if ($idx < 0) {
                $idx += $count;
            }
            $historyIds[] = $playlist[$idx]->id;
        }

        if (empty($historyIds)) {
            return new Collection();
        }

        return Sound::with('user')
            ->whereIn('id', $historyIds)
            ->get()
            ->sortBy(function ($sound) use ($historyIds) {
                return array_search($sound->id, $historyIds, true);
            })
            ->values();
    }

    public function getCurrentSound(): ?Sound
    {
        return $this->resolveCurrentSound();
    }

    public function getCurrentMetadata(): ?array
    {
        $sound = $this->resolveCurrentSound();

        if (! $sound) {
            return null;
        }

        $schedule = $this->resolveScheduleAt(time());
        $startedAt = now()->subSeconds($schedule['elapsed'] ?? 0);

        return [
            'title' => $sound->title,
            'artist' => $sound->user?->name ?? 'Arborisis',
            'cover' => $sound->cover_url,
            'duration' => $sound->duration,
            'started_at' => $startedAt->toIso8601String(),
            'sound_id' => $sound->id,
            'slug' => $sound->slug,
        ];
    }

    public function getHistory(): array
    {
        return $this->resolveHistory($this->historyLimit)->pluck('id')->all();
    }

    public function getHistorySounds(int $limit = 5): Collection
    {
        return $this->resolveHistory($limit);
    }

    public function incrementListeners(): void
    {
        Cache::increment(self::CACHE_KEY_LISTENERS);
    }

    public function decrementListeners(): void
    {
        $current = Cache::decrement(self::CACHE_KEY_LISTENERS);

        if ($current === false || $current < 0) {
            Cache::put(self::CACHE_KEY_LISTENERS, 0);
        }
    }

    public function getListenerCount(): int
    {
        return (int) Cache::get(self::CACHE_KEY_LISTENERS, 0);
    }

    public function streamToOutput(callable $outputCallback): void
    {
        $this->incrementListeners();

        try {
            $playlist = $this->getDeterministicPlaylist();

            if ($playlist->isEmpty()) {
                Log::warning('Radio stream: no playable sounds available');
                while (! connection_aborted()) {
                    $this->streamSilence($outputCallback);
                    sleep(5);
                }

                return;
            }

            $startIndex = $this->resolveCurrentIndex();
            $index = $startIndex;
            $icyEnabled = $this->supportsIcyMetadata();

            while (! connection_aborted()) {
                $sound = $playlist[$index] ?? null;

                if (! $sound) {
                    if (! $this->loop) {
                        Log::info('Radio stream: loop disabled, ending stream');
                        break;
                    }
                    $index = 0;
                    $sound = $playlist[0];
                }

                $bytesStreamed = $this->streamSound($sound, $outputCallback, $icyEnabled);

                if ($bytesStreamed === 0) {
                    Log::warning('Radio stream: sound streamed 0 bytes, throttling', ['sound_id' => $sound->id]);
                    sleep(1);
                }

                if ($this->gapMs > 0) {
                    $this->streamGap($outputCallback);
                }

                $index++;

                if ($index >= $playlist->count()) {
                    if (! $this->loop) {
                        Log::info('Radio stream: reached end of playlist, loop disabled');
                        break;
                    }
                    $index = 0;
                }
            }
        } finally {
            $this->decrementListeners();
        }
    }

    private function streamSound(Sound $sound, callable $outputCallback, bool $icyEnabled = true): int
    {
        if (! $sound->soundFile) {
            Log::warning('Radio stream: sound has no file', ['sound_id' => $sound->id]);

            return 0;
        }

        $disk = $sound->soundFile->disk;
        $path = $sound->soundFile->radio_path ?? $sound->soundFile->path;
        $mimeType = $sound->soundFile->radio_mime_type ?? $sound->soundFile->mime_type;

        if ($mimeType !== 'audio/mpeg') {
            Log::warning('Radio stream: skipping non-MPEG file without radio conversion', [
                'sound_id' => $sound->id,
                'mime_type' => $mimeType,
            ]);

            return 0;
        }

        $handle = Storage::disk($disk)->readStream($path);

        if (! $handle) {
            Log::warning('Radio stream: failed to open audio stream', [
                'sound_id' => $sound->id,
                'disk' => $disk,
                'path' => $path,
            ]);

            return 0;
        }

        $totalBytes = 0;

        try {
            $bytesSinceMeta = 0;
            $title = $sound->title;
            $artist = $sound->user?->name ?? 'Arborisis';

            while (! feof($handle) && ! connection_aborted()) {
                $chunk = fread($handle, $this->chunkSize);

                if ($chunk === false || $chunk === '') {
                    break;
                }

                $outputCallback($chunk);
                $chunkLen = strlen($chunk);
                $totalBytes += $chunkLen;

                if ($icyEnabled) {
                    $bytesSinceMeta += $chunkLen;

                    if ($bytesSinceMeta >= $this->icyMetaint) {
                        $meta = $this->generateIcyMetadata($title, $artist);
                        $outputCallback($meta);
                        $bytesSinceMeta = 0;
                    }
                }

                if (ob_get_level() > 0) {
                    ob_flush();
                }
                flush();
            }
        } finally {
            fclose($handle);
        }

        return $totalBytes;
    }

    private function streamGap(callable $outputCallback): void
    {
        if ($this->gapMs <= 0) {
            return;
        }

        usleep($this->gapMs * 1000);
    }

    private function streamSilence(callable $outputCallback): void
    {
        $silenceFile = config('radio.silence_file') ?: storage_path('app/radio_silence.mp3');

        if ($silenceFile && file_exists($silenceFile)) {
            $handle = fopen($silenceFile, 'r');
            if ($handle) {
                while (! feof($handle) && ! connection_aborted()) {
                    $chunk = fread($handle, $this->chunkSize);
                    if ($chunk === false || $chunk === '') {
                        break;
                    }
                    $outputCallback($chunk);
                    if (ob_get_level() > 0) {
                        ob_flush();
                    }
                    flush();
                }
                fclose($handle);

                return;
            }
        }

        $silence = str_repeat("\x00", $this->chunkSize);
        for ($i = 0; $i < 10 && ! connection_aborted(); $i++) {
            $outputCallback($silence);
            if (ob_get_level() > 0) {
                ob_flush();
            }
            flush();
            usleep(100000);
        }
    }

    public function generateIcyMetadata(string $title, string $artist): string
    {
        $meta = "StreamTitle='{$title} - {$artist}';";
        $length = (int) ceil(strlen($meta) / 16);
        $padded = str_pad($meta, $length * 16, "\x00");

        return chr($length).$padded;
    }

    public function getAudioUrl(Sound $sound): ?string
    {
        if (! $sound->soundFile) {
            return null;
        }

        $disk = $sound->soundFile->disk;
        $path = $sound->soundFile->path;

        if ($disk === 'audio' || $disk === 's3') {
            return Storage::disk($disk)->temporaryUrl(
                $path,
                now()->addMinutes($this->tempUrlTtlMinutes)
            );
        }

        return Storage::disk($disk)->url($path);
    }
}

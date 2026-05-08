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

    private int $icyMetaint;
    private int $chunkSize;
    private int $historyLimit;
    private bool $shuffle;
    private int $tempUrlTtlMinutes;

    public function __construct()
    {
        $this->icyMetaint = config('radio.icy_metaint', 8192);
        $this->chunkSize = config('radio.chunk_size', 8192);
        $this->historyLimit = config('radio.history_limit', 20);
        $this->shuffle = config('radio.playlist_shuffle', true);
        $this->tempUrlTtlMinutes = config('radio.temp_url_ttl_minutes', 60);
    }

    public function getPlaylist(): Collection
    {
        return Sound::public()
            ->with(['user', 'soundFile'])
            ->whereHas('soundFile')
            ->get();
    }

    public function getNextSound(): ?Sound
    {
        $playlist = $this->getPlaylist();

        if ($playlist->isEmpty()) {
            $fallbackIds = config('radio.fallback_sounds', []);
            if (!empty($fallbackIds)) {
                $playlist = Sound::with(['user', 'soundFile'])
                    ->whereIn('id', $fallbackIds)
                    ->whereHas('soundFile')
                    ->get();
            }
        }

        if ($playlist->isEmpty()) {
            return null;
        }

        $history = $this->getHistory();

        $available = $playlist->filter(function (Sound $sound) use ($history) {
            return !in_array($sound->id, $history, true);
        });

        if ($available->isEmpty()) {
            $this->clearHistory();
            $available = $playlist;
        }

        $next = $this->shuffle
            ? $available->random()
            : $available->first();

        $this->setNowPlaying($next);
        $this->addToHistory($next->id);

        return $next;
    }

    public function getCurrentSound(): ?Sound
    {
        $data = Cache::get(self::CACHE_KEY_NOW_PLAYING);

        if (!$data) {
            return null;
        }

        $decoded = json_decode($data, true);

        if (!is_array($decoded) || empty($decoded['sound_id'])) {
            return null;
        }

        return Sound::with(['user', 'soundFile'])
            ->find($decoded['sound_id']);
    }

    public function getCurrentMetadata(): ?array
    {
        $sound = $this->getCurrentSound();

        if (!$sound) {
            return null;
        }

        $data = Cache::get(self::CACHE_KEY_NOW_PLAYING);
        $decoded = $data ? json_decode($data, true) : [];

        return [
            'title' => $sound->title,
            'artist' => $sound->user?->name ?? 'Arborisis',
            'cover' => $sound->cover_url,
            'duration' => $sound->duration,
            'started_at' => $decoded['started_at'] ?? null,
            'sound_id' => $sound->id,
            'slug' => $sound->slug,
        ];
    }

    public function getHistory(): array
    {
        $data = Cache::get(self::CACHE_KEY_HISTORY);

        return $data ? json_decode($data, true) : [];
    }

    public function getHistorySounds(int $limit = 5): Collection
    {
        $history = $this->getHistory();
        $ids = array_slice(array_reverse($history), 0, $limit);

        if (empty($ids)) {
            return new Collection();
        }

        return Sound::with('user')
            ->whereIn('id', $ids)
            ->get()
            ->sortBy(function ($sound) use ($ids) {
                return array_search($sound->id, $ids, true);
            })
            ->values();
    }

    public function incrementListeners(): void
    {
        Cache::increment(self::CACHE_KEY_LISTENERS);
    }

    public function decrementListeners(): void
    {
        $current = (int) Cache::get(self::CACHE_KEY_LISTENERS, 0);
        if ($current > 0) {
            Cache::put(self::CACHE_KEY_LISTENERS, $current - 1);
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
            while (!connection_aborted()) {
                $sound = $this->getNextSound();

                if (!$sound) {
                    Log::warning('Radio stream: no sounds available, streaming silence');
                    $this->streamSilence($outputCallback);
                    sleep(5);
                    continue;
                }

                $bytesStreamed = $this->streamSound($sound, $outputCallback);

                if ($bytesStreamed === 0) {
                    Log::warning('Radio stream: sound streamed 0 bytes, throttling', ['sound_id' => $sound->id]);
                    sleep(1);
                }
            }
        } finally {
            $this->decrementListeners();
        }
    }

    private function streamSound(Sound $sound, callable $outputCallback): int
    {
        if (!$sound->soundFile) {
            Log::warning('Radio stream: sound has no file', ['sound_id' => $sound->id]);

            return 0;
        }

        $disk = $sound->soundFile->disk;
        $path = $sound->soundFile->path;

        $handle = Storage::disk($disk)->readStream($path);

        if (!$handle) {
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

            while (!feof($handle) && !connection_aborted()) {
                $chunk = fread($handle, $this->chunkSize);

                if ($chunk === false || $chunk === '') {
                    break;
                }

                $outputCallback($chunk);
                $chunkLen = strlen($chunk);
                $totalBytes += $chunkLen;
                $bytesSinceMeta += $chunkLen;

                if ($bytesSinceMeta >= $this->icyMetaint) {
                    $meta = $this->generateIcyMetadata($title, $artist);
                    $outputCallback($meta);
                    $bytesSinceMeta = 0;
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

    private function streamSilence(callable $outputCallback): void
    {
        $silenceFile = config('radio.silence_file');

        if ($silenceFile && file_exists($silenceFile)) {
            $handle = fopen($silenceFile, 'r');
            if ($handle) {
                while (!feof($handle) && !connection_aborted()) {
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
        for ($i = 0; $i < 10 && !connection_aborted(); $i++) {
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
        if (!$sound->soundFile) {
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

    private function setNowPlaying(Sound $sound): void
    {
        Cache::put(self::CACHE_KEY_NOW_PLAYING, json_encode([
            'sound_id' => $sound->id,
            'started_at' => now()->toIso8601String(),
            'url_expires_at' => now()->addMinutes($this->tempUrlTtlMinutes)->toIso8601String(),
        ]));
    }

    private function addToHistory(int $soundId): void
    {
        $history = $this->getHistory();
        $history[] = $soundId;

        if (count($history) > $this->historyLimit) {
            $history = array_slice($history, -$this->historyLimit);
        }

        Cache::put(self::CACHE_KEY_HISTORY, json_encode($history));
    }

    private function clearHistory(): void
    {
        Cache::forget(self::CACHE_KEY_HISTORY);
    }
}

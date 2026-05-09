<?php

declare(strict_types=1);

namespace App\Services\Sound;

use App\Enums\SoundStatus;
use App\Jobs\ProcessAudioAnalysis;
use App\Models\Sound;
use App\Services\Audio\AudioDurationService;
use App\Models\SoundFile;
use App\Models\SoundLocation;
use App\Models\Tag;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class SoundUploadService
{
    public function __construct(
        private readonly AudioDurationService $durationService,
    ) {}

    /**
     * @throws \Exception
     */
    public function upload(array $data, int $userId): Sound
    {
        $storedPaths = [];

        try {
            return DB::transaction(function () use ($data, $userId, &$storedPaths) {
                /** @var UploadedFile $audioFile */
                $audioFile = $data['audio_file'];

                $duration = $this->durationService->getDuration($audioFile->getRealPath());

                // 1. Create sound record
                $sound = Sound::create([
                    'user_id' => $userId,
                    'category_id' => $data['category_id'] ?? null,
                    'environment_id' => $data['environment_id'] ?? null,
                    'title' => $data['title'],
                    'description' => $data['description'] ?? null,
                    'recorded_at' => $this->combineDateTime($data['recorded_at'] ?? null, $data['recorded_time'] ?? null),
                    'duration' => $duration ? (int) round($duration) : null,
                    'equipment' => $data['equipment'] ?? null,
                    'license' => $data['license'],
                    'visibility' => $data['visibility'],
                    'status' => SoundStatus::Published,
                ]);

                // 2. Store audio file
                $storedName = $this->generateFileName($audioFile);
                $path = "audio/{$userId}/{$storedName}";

                $disk = config('filesystems.default') === 'local' && empty(config('filesystems.disks.s3.key'))
                    ? 'public'
                    : 'audio';

                $audioFile->storeAs(
                    dirname($path),
                    basename($path),
                    $disk
                );

                $storedPaths[] = ['disk' => $disk, 'path' => $path];

                SoundFile::create([
                    'sound_id' => $sound->id,
                    'original_name' => $audioFile->getClientOriginalName(),
                    'stored_name' => $storedName,
                    'path' => $path,
                    'mime_type' => $audioFile->getMimeType(),
                    'size_bytes' => $audioFile->getSize(),
                    'disk' => $disk,
                ]);

                // 3. Store location (with privacy)
                $exactLat = (float) $data['latitude'];
                $exactLng = (float) $data['longitude'];
                $isSensitive = $data['is_sensitive_location'] ?? false;

                $publicCoords = SoundLocation::obscure($exactLat, $exactLng);

                SoundLocation::create([
                    'sound_id' => $sound->id,
                    'exact_latitude' => $exactLat,
                    'exact_longitude' => $exactLng,
                    'public_latitude' => $isSensitive ? $publicCoords['public_latitude'] : $exactLat,
                    'public_longitude' => $isSensitive ? $publicCoords['public_longitude'] : $exactLng,
                    'location_name' => $data['location_name'] ?? null,
                    'is_sensitive' => $isSensitive,
                ]);

                // 4. Store cover image if provided
                if (! empty($data['cover_image'])) {
                    /** @var UploadedFile $coverImage */
                    $coverImage = $data['cover_image'];
                    $coverName = 'cover_'.Str::uuid().'.'.$coverImage->getClientOriginalExtension();
                    $coverPath = "covers/{$userId}/{$coverName}";
                    $coverImage->storeAs(dirname($coverPath), basename($coverPath), $disk);
                    $storedPaths[] = ['disk' => $disk, 'path' => $coverPath];
                    $sound->update(['cover_image' => $coverPath]);
                }

                // 5. Attach tags
                if (! empty($data['tags'])) {
                    $tagNames = array_filter(array_map('trim', explode(',', $data['tags'])));
                    $tagIds = [];

                    foreach ($tagNames as $tagName) {
                        $slug = Str::slug($tagName);
                        $tag = Tag::firstOrCreate(
                            ['slug' => $slug],
                            ['name' => $tagName]
                        );
                        $tagIds[] = $tag->id;
                    }

                    $sound->tags()->sync($tagIds);
                }

                // 6. Dispatch audio analysis job
                $analysisOnUpload = $data['analysis_on_upload'] ?? true;
                if ($analysisOnUpload) {
                    ProcessAudioAnalysis::dispatch($sound->id);
                }

                return $sound->fresh(['soundFile', 'soundLocation', 'tags', 'category', 'user']);
            });
        } catch (\Exception $e) {
            $this->cleanupStoredFiles($storedPaths);
            throw $e;
        }
    }

    /**
     * @param  array<int, array{disk: string, path: string}>  $storedPaths
     */
    private function cleanupStoredFiles(array $storedPaths): void
    {
        foreach ($storedPaths as $file) {
            try {
                Storage::disk($file['disk'])->delete($file['path']);
            } catch (\Exception $e) {
                report($e);
            }
        }
    }

    private function generateFileName(UploadedFile $file): string
    {
        $extension = $file->getClientOriginalExtension();
        $base = Str::uuid();

        return "{$base}.{$extension}";
    }

    private function combineDateTime(?string $date, ?string $time): ?\DateTimeInterface
    {
        if (empty($date)) {
            return null;
        }

        if (empty($time)) {
            return new \DateTimeImmutable($date);
        }

        return new \DateTimeImmutable("{$date} {$time}");
    }
}

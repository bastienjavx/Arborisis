<?php

declare(strict_types=1);

namespace App\Jobs;

use App\Models\Sound;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class RequestAudioAnalysis implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 3;
    public int $timeout = 60;

    public function __construct(
        public int $soundId,
        public string $originalR2Key,
        public bool $force = false,
    ) {}

    public function handle(): void
    {
        $sound = Sound::with('soundFile')->find($this->soundId);

        if (! $sound || ! $sound->soundFile) {
            Log::warning('RequestAudioAnalysis: sound or soundFile not found.', [
                'sound_id' => $this->soundId,
            ]);

            return;
        }

        $analyzerUrl = config('services.analyzer.url');
        $analyzerSecret = config('services.analyzer.secret');

        if (empty($analyzerUrl) || empty($analyzerSecret)) {
            Log::error('RequestAudioAnalysis: analyzer URL or secret not configured.');

            return;
        }

        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer '.$analyzerSecret,
                'Content-Type' => 'application/json',
            ])
                ->timeout(30)
                ->post("{$analyzerUrl}/analyze", [
                    'sound_id' => $this->soundId,
                    'original_r2_key' => $this->originalR2Key,
                    'force' => $this->force,
                ]);

            if (! $response->successful()) {
                Log::error('RequestAudioAnalysis: analyzer returned error.', [
                    'sound_id' => $this->soundId,
                    'status' => $response->status(),
                    'body' => $response->body(),
                ]);

                $this->fail('Analyzer returned HTTP '.$response->status());
            }
        } catch (\Throwable $e) {
            Log::error('RequestAudioAnalysis: network error.', [
                'sound_id' => $this->soundId,
                'error' => $e->getMessage(),
            ]);

            throw $e;
        }
    }
}

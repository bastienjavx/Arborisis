<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Enums\AnalysisStatus;
use App\Models\Sound;
use App\Models\SoundAnalysis;
use Illuminate\Database\Eloquent\Factories\Factory;

class SoundAnalysisFactory extends Factory
{
    protected $model = SoundAnalysis::class;

    public function definition(): array
    {
        return [
            'sound_id' => Sound::factory(),
            'status' => AnalysisStatus::COMPLETED,
            'features_json' => [
                'temporal' => [
                    'zcr' => ['stats' => ['mean' => 0.1]],
                    'rms' => ['stats' => ['mean' => 0.5]],
                    'duration_seconds' => 120,
                ],
                'spectral' => [
                    'centroid' => ['stats' => ['mean' => 2500]],
                ],
            ],
            'parameters_json' => ['n_fft' => 2048],
            'processed_at' => now(),
        ];
    }

    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => AnalysisStatus::PENDING,
            'processed_at' => null,
        ]);
    }

    public function failed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => AnalysisStatus::FAILED,
            'failed_reason' => 'Test failure',
        ]);
    }
}

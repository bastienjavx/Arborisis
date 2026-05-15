<?php

declare(strict_types=1);

use App\Models\Sound;
use App\Models\SoundAnalysis;
use App\Services\Scientific\ScientificStatsService;

beforeEach(function () {
    SoundAnalysis::query()->delete();
    Sound::query()->forceDelete();
});

describe('ScientificStatsService', function () {
    it('uses normalized audio metric columns when features_json is missing', function () {
        $soundA = Sound::factory()->create();
        $soundB = Sound::factory()->create();

        SoundAnalysis::factory()->create([
            'sound_id' => $soundA->id,
            'features_json' => null,
            'rms_db' => -41.88,
            'spectral_centroid' => 2151.32,
            'spectral_rolloff' => 4476.91,
            'zero_crossing_rate' => 0.1385,
        ]);

        SoundAnalysis::factory()->create([
            'sound_id' => $soundB->id,
            'features_json' => null,
            'rms_db' => -52.25,
            'spectral_centroid' => 2548.49,
            'spectral_rolloff' => 4753.42,
            'zero_crossing_rate' => 0.1887,
        ]);

        $service = new ScientificStatsService();

        $averages = $service->getAudioFeatureAverages();
        $distributions = $service->getAudioFeatureDistribution();

        expect($averages['rms']['count'])->toBe(2);
        expect($averages['rms']['mean'])->toBe(-47.065);
        expect($averages['spectral_centroid']['count'])->toBe(2);
        expect($averages['spectral_rolloff']['count'])->toBe(2);
        expect($averages['zcr']['count'])->toBe(2);
        expect($distributions['rms'])->toHaveCount(20);
    });

    it('reads nested feature stats from features_json', function () {
        $sound = Sound::factory()->create();

        SoundAnalysis::factory()->create([
            'sound_id' => $sound->id,
            'features_json' => [
                'temporal' => [
                    'rms' => ['stats' => ['mean' => 0.5]],
                    'zcr' => ['stats' => ['mean' => 0.12]],
                ],
                'spectral' => [
                    'centroid' => ['stats' => ['mean' => 2300.0]],
                    'rolloff' => ['stats' => ['mean' => 4700.0]],
                    'bandwidth' => ['stats' => ['mean' => 900.0]],
                ],
            ],
            'rms_db' => null,
            'spectral_centroid' => null,
            'spectral_rolloff' => null,
            'zero_crossing_rate' => null,
        ]);

        $averages = (new ScientificStatsService())->getAudioFeatureAverages();

        expect($averages['rms']['mean'])->toBe(0.5);
        expect($averages['zcr']['mean'])->toBe(0.12);
        expect($averages['spectral_centroid']['mean'])->toBe(2300.0);
        expect($averages['spectral_rolloff']['mean'])->toBe(4700.0);
        expect($averages['spectral_bandwidth']['mean'])->toBe(900.0);
    });
});

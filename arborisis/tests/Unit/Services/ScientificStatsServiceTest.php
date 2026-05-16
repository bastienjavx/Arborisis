<?php

declare(strict_types=1);

use App\Models\BirdnetDetection;
use App\Models\Sound;
use App\Models\SoundAnalysis;
use App\Models\SoundLocation;
use App\Services\Scientific\ScientificStatsService;

beforeEach(function () {
    BirdnetDetection::query()->delete();
    SoundLocation::query()->delete();
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

    it('summarizes public species detections with confidence filtering', function () {
        $publicSound = Sound::factory()->create();
        $privateSound = Sound::factory()->private()->create();

        $publicAnalysis = SoundAnalysis::factory()->create(['sound_id' => $publicSound->id]);
        $privateAnalysis = SoundAnalysis::factory()->create(['sound_id' => $privateSound->id]);

        BirdnetDetection::query()->create([
            'sound_analysis_id' => $publicAnalysis->id,
            'sound_id' => $publicSound->id,
            'scientific_name' => 'Turdus merula',
            'common_name' => 'Merle noir',
            'confidence' => 0.91,
            'start_time' => 1.0,
            'end_time' => 3.5,
            'source' => 'birdnet',
        ]);

        BirdnetDetection::query()->create([
            'sound_analysis_id' => $publicAnalysis->id,
            'sound_id' => $publicSound->id,
            'scientific_name' => 'Turdus merula',
            'common_name' => 'Merle noir',
            'confidence' => 0.42,
            'start_time' => 6.0,
            'end_time' => 7.0,
            'source' => 'birdnet',
        ]);

        BirdnetDetection::query()->create([
            'sound_analysis_id' => $privateAnalysis->id,
            'sound_id' => $privateSound->id,
            'scientific_name' => 'Erithacus rubecula',
            'common_name' => 'Rougegorge familier',
            'confidence' => 0.99,
            'start_time' => 1.0,
            'end_time' => 2.0,
            'source' => 'birdnet',
        ]);

        $species = (new ScientificStatsService())->getSpeciesDistribution(filters: ['min_confidence' => 0.8]);

        expect($species)->toHaveCount(1);
        expect($species[0]['scientific_name'])->toBe('Turdus merula');
        expect($species[0]['detections_count'])->toBe(1);
        expect($species[0]['sounds_count'])->toBe(1);
    });

    it('computes quality and metadata completeness for public scientific data', function () {
        $sound = Sound::factory()->create([
            'equipment' => 'Zoom F3 + parabolique',
        ]);

        SoundLocation::query()->create([
            'sound_id' => $sound->id,
            'public_latitude' => 48.85000000,
            'public_longitude' => 2.35000000,
            'location_name' => 'Paris',
        ]);

        $analysis = SoundAnalysis::factory()->create([
            'sound_id' => $sound->id,
            'quality_label' => 'good',
            'duration_seconds' => 120.0,
            'sample_rate' => 48000,
            'loudness_lufs' => -23.5,
            'noise_floor_db' => -61.0,
            'spectral_centroid' => 2400.0,
            'zero_crossing_rate' => 0.12,
            'processed_at' => now(),
        ]);

        BirdnetDetection::query()->create([
            'sound_analysis_id' => $analysis->id,
            'sound_id' => $sound->id,
            'scientific_name' => 'Parus major',
            'common_name' => 'Mesange charbonniere',
            'confidence' => 0.88,
            'start_time' => 2.0,
            'end_time' => 4.0,
            'source' => 'birdnet',
        ]);

        $service = new ScientificStatsService();

        $quality = $service->getQualityOverview();
        $completeness = $service->getDatasetCompleteness();

        expect($quality['analyses_count'])->toBe(1);
        expect($quality['quality_labels'][0]['label'])->toBe('good');
        expect($quality['metric_coverage']['sample_rate']['percentage'])->toBe(100.0);
        expect($completeness['sounds_count'])->toBe(1);
        expect($completeness['scientific_readiness_score'])->toBe(100.0);
    });
});

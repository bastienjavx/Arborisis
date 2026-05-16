<?php

declare(strict_types=1);

use App\Models\BirdnetDetection;
use App\Models\Sound;
use App\Models\SoundAnalysis;

beforeEach(function () {
    BirdnetDetection::query()->delete();
    SoundAnalysis::query()->delete();
    Sound::query()->forceDelete();
});

it('exposes public species statistics with scientific response metadata', function () {
    $sound = Sound::factory()->create();
    $analysis = SoundAnalysis::factory()->create(['sound_id' => $sound->id]);

    BirdnetDetection::query()->create([
        'sound_analysis_id' => $analysis->id,
        'sound_id' => $sound->id,
        'scientific_name' => 'Parus major',
        'common_name' => 'Mesange charbonniere',
        'confidence' => 0.93,
        'start_time' => 1.0,
        'end_time' => 2.0,
        'source' => 'birdnet',
    ]);

    $this->getJson(route('api.scientific-stats.species', ['min_confidence' => 0.8]))
        ->assertOk()
        ->assertJsonPath('data.0.scientific_name', 'Parus major')
        ->assertJsonPath('data.0.sounds_count', 1)
        ->assertJsonPath('meta.schema_version', 1)
        ->assertJsonPath('meta.privacy.scope', 'public_published_sounds_only');
});

it('validates scientific API query parameters', function () {
    $this->getJson(route('api.scientific-stats.species', ['min_confidence' => 1.5]))
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['min_confidence']);
});

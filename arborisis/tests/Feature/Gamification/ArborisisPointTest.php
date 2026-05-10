<?php

declare(strict_types=1);

use App\Enums\ArborisisCategory;
use App\Enums\ModerationStatus;
use App\Enums\NatureSensitivityLevel;
use App\Models\ArborisisPoint;
use App\Models\User;

beforeEach(function () {
    $this->user = User::factory()->create([
        'email_verified_at' => now(),
    ]);
});

describe('création de point', function () {
    it('permet à un utilisateur vérifié de créer un point', function () {
        $response = $this->actingAs($this->user)
            ->postJson('/api/<redacted>-points', [
                'title' => 'Point de test',
                'description' => 'Description test',
                'latitude' => 48.8566,
                'longitude' => 2.3522,
                'category' => ArborisisCategory::Forest->value,
            ]);

        $response->assertStatus(201)
            ->assertJsonPath('point.title', 'Point de test')
            ->assertJsonPath('point.moderation_status', 'En attente');

        $this->assertDatabaseHas('<redacted>_points', [
            'title' => 'Point de test',
            'moderation_status' => ModerationStatus::Pending->value,
            'user_id' => $this->user->id,
        ]);
    });

    it('masque les coordonnées exactes dans la réponse', function () {
        $point = ArborisisPoint::factory()->create([
            'latitude' => 48.8566,
            'longitude' => 2.3522,
            'approximate_latitude' => 48.86,
            'approximate_longitude' => 2.35,
            'moderation_status' => ModerationStatus::Approved,
        ]);

        $response = $this->getJson("/api/<redacted>-points/{$point->slug}");

        $response->assertStatus(200)
            ->assertJsonPath('latitude', 48.86)
            ->assertJsonPath('longitude', 2.35)
            ->assertJsonMissing(['latitude' => 48.8566]);
    });

    it('floute automatiquement les coordonnées pour les lieux sensibles', function () {
        $response = $this->actingAs($this->user)
            ->postJson('/api/<redacted>-points', [
                'title' => 'Nid d\'aigle',
                'latitude' => 48.8566,
                'longitude' => 2.3522,
                'category' => ArborisisCategory::Birds->value,
                'nature_sensitivity_level' => NatureSensitivityLevel::SensitiveSpecies->value,
            ]);

        $response->assertStatus(201);

        $point = ArborisisPoint::latest()->first();

        expect($point->latitude)->toBe($point->approximate_latitude);
        expect($point->longitude)->toBe($point->approximate_longitude);
    });
});

describe('modération', function () {
    it('seuls les points approuvés apparaissent dans la liste publique', function () {
        ArborisisPoint::factory()->create([
            'title' => 'Approuvé',
            'moderation_status' => ModerationStatus::Approved,
        ]);
        ArborisisPoint::factory()->create([
            'title' => 'En attente',
            'moderation_status' => ModerationStatus::Pending,
        ]);

        $response = $this->getJson('/api/<redacted>-points');

        $response->assertStatus(200)
            ->assertJsonCount(1, 'features')
            ->assertJsonPath('features.0.properties.title', 'Approuvé');
    });
});

describe('signalements', function () {
    it('permet de signaler un point', function () {
        $point = ArborisisPoint::factory()->create([
            'moderation_status' => ModerationStatus::Approved,
        ]);
        $reporter = User::factory()->create(['email_verified_at' => now()]);

        $response = $this->actingAs($reporter)
            ->postJson("/api/<redacted>-points/{$point->slug}/report", [
                'reason' => 'inaccurate_location',
                'description' => 'La position est incorrecte',
            ]);

        $response->assertStatus(200);

        $this->assertDatabaseHas('point_reports', [
            '<redacted>_point_id' => $point->id,
            'user_id' => $reporter->id,
            'reason' => 'inaccurate_location',
        ]);
    });
});

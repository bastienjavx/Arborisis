<?php

use App\Enums\SoundStatus;
use App\Enums\SoundVisibility;
use App\Models\Sound;
use App\Models\SoundFile;
use App\Models\User;
use Illuminate\Support\Facades\Cache;

beforeEach(function () {
    Cache::flush();
});

it('displays the radio page', function () {
    $response = $this->get('/radio');

    $response->assertStatus(200)
        ->assertInertia(fn ($page) => $page
            ->component('Radio/Index')
        );
});

it('returns audio/mpeg for stream endpoint', function () {
    $response = $this->get('/radio/stream');

    $response->assertStatus(200)
        ->assertHeader('Content-Type', 'audio/mpeg')
        ->assertHeader('icy-name', 'Arborisis Radio')
        ->assertHeader('icy-metaint');
});

it('returns a valid m3u playlist file', function () {
    $response = $this->get('/radio/stream.m3u');

    $response->assertStatus(200)
        ->assertHeader('Content-Type', 'audio/x-mpegurl')
        ->assertSee('#EXTM3U')
        ->assertSee('Arborisis Radio')
        ->assertSee('/radio/stream');
});

it('returns now-playing metadata as json', function () {
    $user = User::factory()->create();
    $sound = Sound::factory()->create([
        'user_id' => $user->id,
        'status' => SoundStatus::Published,
        'visibility' => SoundVisibility::Public,
        'title' => 'Forest Morning',
    ]);
    SoundFile::factory()->create([
        'sound_id' => $sound->id,
        'path' => 'sounds/test.mp3',
        'disk' => 'public',
        'mime_type' => 'audio/mpeg',
    ]);

    Cache::put('radio:now-playing', json_encode([
        'sound_id' => $sound->id,
        'started_at' => now()->toIso8601String(),
        'url_expires_at' => now()->addHour()->toIso8601String(),
    ]));

    $response = $this->getJson('/api/radio/now-playing');

    $response->assertStatus(200)
        ->assertJsonPath('now_playing.title', 'Forest Morning')
        ->assertJsonPath('now_playing.artist', $user->name)
        ->assertJsonPath('now_playing.sound_id', $sound->id)
        ->assertJsonPath('listener_count', 0)
        ->assertJsonStructure([
            'now_playing' => ['title', 'artist', 'cover', 'duration', 'started_at', 'sound_id', 'slug'],
            'next_up',
            'listener_count',
            'updated_at',
        ]);
});

it('builds playlist from public sounds only', function () {
    $user = User::factory()->create();

    $published = Sound::factory()->create([
        'user_id' => $user->id,
        'status' => SoundStatus::Published,
        'visibility' => SoundVisibility::Public,
    ]);
    SoundFile::factory()->create([
        'sound_id' => $published->id,
        'path' => 'sounds/published.mp3',
        'disk' => 'public',
        'mime_type' => 'audio/mpeg',
    ]);

    $draft = Sound::factory()->create([
        'user_id' => $user->id,
        'status' => SoundStatus::Draft,
        'visibility' => SoundVisibility::Public,
    ]);
    SoundFile::factory()->create([
        'sound_id' => $draft->id,
        'path' => 'sounds/draft.mp3',
        'disk' => 'public',
        'mime_type' => 'audio/mpeg',
    ]);

    $private = Sound::factory()->create([
        'user_id' => $user->id,
        'status' => SoundStatus::Published,
        'visibility' => SoundVisibility::Private,
    ]);
    SoundFile::factory()->create([
        'sound_id' => $private->id,
        'path' => 'sounds/private.mp3',
        'disk' => 'public',
        'mime_type' => 'audio/mpeg',
    ]);

    $service = app(\App\Services\Radio\RadioStreamService::class);
    $playlist = $service->getPlaylist();

    expect($playlist)->toHaveCount(1)
        ->and($playlist->first()->id)->toBe($published->id);
});

it('tracks listener count on stream', function () {
    $service = app(\App\Services\Radio\RadioStreamService::class);

    expect($service->getListenerCount())->toBe(0);

    $service->incrementListeners();
    expect($service->getListenerCount())->toBe(1);

    $service->decrementListeners();
    expect($service->getListenerCount())->toBe(0);
});

it('does not decrement listeners below zero', function () {
    $service = app(\App\Services\Radio\RadioStreamService::class);

    $service->decrementListeners();
    expect($service->getListenerCount())->toBe(0);
});

it('generates valid icy metadata', function () {
    $service = app(\App\Services\Radio\RadioStreamService::class);
    $meta = $service->generateIcyMetadata('Forest Rain', 'Jane Doe');

    expect($meta)->toBeString()
        ->toStartWith(chr(3))
        ->toContain('StreamTitle=')
        ->toContain('Forest Rain')
        ->toContain('Jane Doe');
});

it('excludes inertia middleware from stream route', function () {
    $response = $this->get('/radio/stream');

    $response->assertStatus(200);
    $response->assertHeader('Content-Type', 'audio/mpeg');
});

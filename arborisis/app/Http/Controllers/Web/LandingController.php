<?php

declare(strict_types=1);

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Sound;
use App\Models\SoundLocation;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class LandingController extends Controller
{
    public function index(): Response
    {
        $soundsCount = Sound::public()->count();

        $creatorsCount = User::whereHas('sounds', function ($query): void {
            $query->public();
        })->count();

        $countriesCount = SoundLocation::whereHas('sound', function ($query): void {
            $query->public();
        })
            ->whereNotNull('location_name')
            ->distinct()
            ->count('location_name');

        // Featured sounds for the landing audio demo section
        $featuredSounds = Sound::public()
            ->with(['user', 'category'])
            ->latest()
            ->take(6)
            ->get()
            ->map(fn (Sound $sound) => [
                'id' => $sound->id,
                'slug' => $sound->slug,
                'title' => $sound->title,
                'user_name' => $sound->user->name,
                'audio_url' => $sound->audio_url,
                'cover_url' => $sound->cover_url,
                'duration' => $sound->duration,
                'play_count' => $sound->play_count,
                'like_count' => $sound->like_count,
                'category' => $sound->category?->only('id', 'name'),
            ]);

        // Featured creators for the landing creators section
        $featuredCreators = User::whereHas('sounds', function ($query): void {
            $query->public();
        })
            ->withCount(['sounds' => fn ($q) => $q->public()])
            ->withSum(['sounds as total_plays' => fn ($q) => $q->public()], 'play_count')
            ->orderByDesc('sounds_count')
            ->take(3)
            ->get()
            ->map(fn (User $user) => [
                'id' => $user->id,
                'name' => $user->name,
                'avatar_url' => $user->avatar_url,
                'location' => $user->location,
                'sounds_count' => $user->sounds_count,
                'total_plays' => $user->total_plays ?? 0,
            ]);

        // Attach each creator's most popular sound as featured
        $featuredCreators = $featuredCreators->map(function ($creator) {
            $popularSound = Sound::public()
                ->where('user_id', $creator['id'])
                ->orderByDesc('play_count')
                ->first();

            $creator['featured_sound'] = $popularSound ? [
                'slug' => $popularSound->slug,
                'title' => $popularSound->title,
                'cover_url' => $popularSound->cover_url,
            ] : null;

            return $creator;
        });

        return Inertia::render('Landing', [
            'stats' => [
                'sounds' => $soundsCount,
                'creators' => $creatorsCount,
                'countries' => $countriesCount,
            ],
            'featuredSounds' => $featuredSounds,
            'featuredCreators' => $featuredCreators,
        ]);
    }
}

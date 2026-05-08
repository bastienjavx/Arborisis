<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Enums\SoundStatus;
use App\Enums\SoundVisibility;
use App\Http\Controllers\Controller;
use App\Models\Sound;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MapController extends Controller
{
    public function sounds(Request $request): JsonResponse
    {
        $query = Sound::public()
            ->with(['user:id,name', 'category:id,name,slug', 'soundLocation', 'soundFile'])
            ->whereHas('soundLocation', function ($q) {
                $q->whereNotNull('public_latitude')
                   ->whereNotNull('public_longitude');
            });

        if ($request->filled('category')) {
            $query->where('category_id', $request->integer('category'));
        }

        if ($request->filled('environment')) {
            $query->where('environment->value', $request->input('environment'));
        }

        $sounds = $query->get();

        $features = $sounds->map(function (Sound $sound) {
            $location = $sound->soundLocation;

            return [
                'type' => 'Feature',
                'geometry' => [
                    'type' => 'Point',
                    'coordinates' => [
                        (float) $location->public_longitude,
                        (float) $location->public_latitude,
                    ],
                ],
                'properties' => [
                    'id' => $sound->id,
                    'title' => $sound->title,
                    'slug' => $sound->slug,
                    'description' => $sound->description,
                    'duration' => $sound->duration,
                    'user_name' => $sound->user?->name ?? 'Anonyme',
                    'category' => $sound->category?->name,
                    'cover_url' => $sound->cover_url,
                    'play_count' => $sound->play_count,
                    'like_count' => $sound->like_count,
                    'location_name' => $location->location_name,
                    'recorded_at' => $sound->recorded_at?->format('d/m/Y'),
                ],
            ];
        });

        return response()->json([
            'type' => 'FeatureCollection',
            'features' => $features,
        ]);
    }

    public function search(Request $request): JsonResponse
    {
        $request->validate([
            'q' => ['required', 'string', 'min:2', 'max:100'],
        ]);

        $query = $request->input('q');

        $sounds = Sound::public()
            ->with(['user:id,name', 'category:id,name', 'soundLocation', 'soundFile'])
            ->whereHas('soundLocation', function ($q) {
                $q->whereNotNull('public_latitude')
                   ->whereNotNull('public_longitude');
            })
            ->where(function ($q) use ($query) {
                $q->where('title', 'ilike', "%{$query}%")
                  ->orWhere('description', 'ilike', "%{$query}%")
                  ->orWhereHas('soundLocation', function ($ql) use ($query) {
                      $ql->where('location_name', 'ilike', "%{$query}%");
                  });
            })
            ->limit(20)
            ->get();

        $features = $sounds->map(function (Sound $sound) {
            $location = $sound->soundLocation;

            return [
                'type' => 'Feature',
                'geometry' => [
                    'type' => 'Point',
                    'coordinates' => [
                        (float) $location->public_longitude,
                        (float) $location->public_latitude,
                    ],
                ],
                'properties' => [
                    'id' => $sound->id,
                    'title' => $sound->title,
                    'slug' => $sound->slug,
                    'user_name' => $sound->user?->name ?? 'Anonyme',
                    'category' => $sound->category?->name,
                    'duration' => $sound->duration,
                    'cover_url' => $sound->cover_url,
                    'location_name' => $location->location_name,
                ],
            ];
        });

        return response()->json([
            'type' => 'FeatureCollection',
            'features' => $features,
        ]);
    }
}

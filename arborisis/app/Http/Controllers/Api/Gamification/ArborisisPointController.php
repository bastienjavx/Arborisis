<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\Gamification;

use App\Enums\ModerationStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Gamification\ReportPointRequest;
use App\Http\Requests\Gamification\StoreArborisisPointRequest;
use App\Http\Requests\Gamification\UpdateArborisisPointRequest;
use App\Models\ArborisisPoint;
use App\Services\Gamification\ArborisisPointService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ArborisisPointController extends Controller
{
    public function __construct(
        private readonly ArborisisPointService $pointService,
    ) {
    }

    public function index(Request $request): JsonResponse
    {
        $query = ArborisisPoint::query()
            ->with(['user:id,name,slug']);

        if ($query->getConnection()->getDriverName() === 'pgsql') {
            $query->whereRaw("slug !~ '-[a-f0-9]{13}$'");
        }

        // Show public approved points, plus the current user's own points
        $query->where(function ($q) {
            $q->public();
            if (auth()->check()) {
                $q->orWhere('user_id', auth()->id());
            }
        });

        if ($request->filled('category')) {
            $query->where('category', $request->input('category'));
        }

        if ($request->filled('bounds')) {
            $bounds = $request->array('bounds');
            $query->whereBetween('approximate_latitude', [$bounds['south'], $bounds['north']])
                ->whereBetween('approximate_longitude', [$bounds['west'], $bounds['east']]);
        }

        $points = $query->get();

        $features = $points->map(function (ArborisisPoint $point) {
            return [
                'type' => 'Feature',
                'geometry' => [
                    'type' => 'Point',
                    'coordinates' => [
                        $point->getPublicLongitude(),
                        $point->getPublicLatitude(),
                    ],
                ],
                'properties' => [
                    'id' => $point->id,
                    'slug' => $point->slug,
                    'title' => $point->title,
                    'description' => $point->description,
                    'category' => $point->category?->label(),
                    'category_value' => $point->category?->value,
                    'difficulty_level' => $point->difficulty_level,
                    'nature_sensitivity_level' => $point->nature_sensitivity_level?->label(),
                    'nature_sensitivity_warning' => $point->nature_sensitivity_level?->warningText(),
                    'recommended_time' => $point->recommended_time,
                    'audio_environment_type' => $point->audio_environment_type,
                    'tags' => $point->tags ?? [],
                    'cover_image' => $point->cover_image,
                    'moderation_status' => $point->moderation_status?->value,
                    'created_at' => $point->created_at?->format('d/m/Y'),
                    'user' => $point->user?->only('id', 'name', 'slug'),
                ],
            ];
        });

        return response()->json([
            'type' => 'FeatureCollection',
            'features' => $features,
        ]);
    }

    public function show(Request $request, ArborisisPoint $<redacted>Point): JsonResponse
    {
        $this->authorize('view', $<redacted>Point);

        return response()->json([
            'id' => $<redacted>Point->id,
            'slug' => $<redacted>Point->slug,
            'title' => $<redacted>Point->title,
            'description' => $<redacted>Point->description,
            'latitude' => $<redacted>Point->getPublicLatitude(),
            'longitude' => $<redacted>Point->getPublicLongitude(),
            'category' => $<redacted>Point->category?->label(),
            'category_value' => $<redacted>Point->category?->value,
            'tags' => $<redacted>Point->tags,
            'difficulty_level' => $<redacted>Point->difficulty_level,
            'nature_sensitivity_level' => $<redacted>Point->nature_sensitivity_level?->label(),
            'nature_sensitivity_warning' => $<redacted>Point->nature_sensitivity_level?->warningText(),
            'recommended_time' => $<redacted>Point->recommended_time,
            'audio_environment_type' => $<redacted>Point->audio_environment_type,
            'cover_image' => $<redacted>Point->cover_image,
            'user' => $<redacted>Point->user?->only('id', 'name', 'slug'),
            'created_at' => $<redacted>Point->created_at?->format('d/m/Y'),
            'moderation_status' => $<redacted>Point->moderation_status?->value,
        ]);
    }

    public function store(StoreArborisisPointRequest $request): JsonResponse
    {
        $point = $this->pointService->createPoint(
            $request->user(),
            $request->validated()
        );

        return response()->json([
            'message' => 'Point proposé avec succès. Il sera examiné par la modération avant publication.',
            'point' => [
                'id' => $point->id,
                'slug' => $point->slug,
                'title' => $point->title,
                'moderation_status' => $point->moderation_status->label(),
            ],
        ], 201);
    }

    public function update(UpdateArborisisPointRequest $request, ArborisisPoint $<redacted>Point): JsonResponse
    {
        $point = $this->pointService->updatePoint(
            $<redacted>Point,
            $request->validated()
        );

        return response()->json([
            'message' => 'Point mis à jour avec succès.',
            'point' => [
                'id' => $point->id,
                'slug' => $point->slug,
                'title' => $point->title,
            ],
        ]);
    }

    public function destroy(Request $request, ArborisisPoint $<redacted>Point): JsonResponse
    {
        $this->authorize('delete', $<redacted>Point);

        $<redacted>Point->delete();

        return response()->json([
            'message' => 'Point supprimé avec succès.',
        ]);
    }

    public function report(ReportPointRequest $request, ArborisisPoint $<redacted>Point): JsonResponse
    {
        $this->authorize('report', $<redacted>Point);

        $this->pointService->reportPoint(
            $request->user(),
            $<redacted>Point,
            $request->validated()
        );

        return response()->json([
            'message' => 'Signalement envoyé. Merci de contribuer à la protection de la carte.',
        ]);
    }

    public function suggestEdit(Request $request, ArborisisPoint $<redacted>Point): JsonResponse
    {
        $this->authorize('suggestEdit', $<redacted>Point);

        $validated = $request->validate([
            'field' => ['required', 'string', 'in:title,description,category,tags,recommended_time,audio_environment_type'],
            'proposed_value' => ['required', 'string', 'max:5000'],
            'reason' => ['nullable', 'string', 'max:2000'],
        ]);

        $this->pointService->suggestEdit(
            $request->user(),
            $<redacted>Point,
            $validated
        );

        return response()->json([
            'message' => 'Suggestion envoyée. Elle sera examinée par la modération.',
        ]);
    }

    public function nearby(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'lat' => ['required', 'numeric', 'between:-90,90'],
            'lng' => ['required', 'numeric', 'between:-180,180'],
            'radius' => ['nullable', 'numeric', 'min:1', 'max:50'],
        ]);

        $lat = (float) $validated['lat'];
        $lng = (float) $validated['lng'];
        $radiusKm = $validated['radius'] ?? 10;

        $latDelta = $radiusKm / 111;
        $lngDelta = $radiusKm / (111 * cos(deg2rad($lat)));

        $query = ArborisisPoint::query()
            ->with(['user:id,name,slug'])
            ->where(function ($q) {
                $q->public();
                if (auth()->check()) {
                    $q->orWhere('user_id', auth()->id());
                }
            })
            ->whereBetween('approximate_latitude', [$lat - $latDelta, $lat + $latDelta])
            ->whereBetween('approximate_longitude', [$lng - $lngDelta, $lng + $lngDelta]);

        $points = $query->limit(50)->get();

        $features = $points->map(function (ArborisisPoint $point) {
            return [
                'type' => 'Feature',
                'geometry' => [
                    'type' => 'Point',
                    'coordinates' => [
                        $point->getPublicLongitude(),
                        $point->getPublicLatitude(),
                    ],
                ],
                'properties' => [
                    'id' => $point->id,
                    'slug' => $point->slug,
                    'title' => $point->title,
                    'description' => $point->description,
                    'category' => $point->category?->label(),
                    'category_value' => $point->category?->value,
                    'difficulty_level' => $point->difficulty_level,
                    'nature_sensitivity_level' => $point->nature_sensitivity_level?->label(),
                    'nature_sensitivity_warning' => $point->nature_sensitivity_level?->warningText(),
                    'recommended_time' => $point->recommended_time,
                    'audio_environment_type' => $point->audio_environment_type,
                    'tags' => $point->tags ?? [],
                    'cover_image' => $point->cover_image,
                    'user' => $point->user?->only('id', 'name', 'slug'),
                    'distance_km' => null, // computed roughly by frontend or omitted
                ],
            ];
        });

        return response()->json([
            'type' => 'FeatureCollection',
            'features' => $features,
        ]);
    }
}

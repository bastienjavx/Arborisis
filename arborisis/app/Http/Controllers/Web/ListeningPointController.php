<?php

declare(strict_types=1);

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\ListeningPoint;
use App\Services\OpenSearch\SoundSearchRepository;
use App\Services\Scientific\GeoMatchingService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ListeningPointController extends Controller
{
    public function __construct(
        private readonly SoundSearchRepository $searchRepository,
        private readonly GeoMatchingService $geoMatching,
    ) {}

    public function index(Request $request): Response
    {
        $points = ListeningPoint::approved()
            ->with(['creator', 'environment'])
            ->when($request->get('habitat'), fn ($q, $habitat) => $q->where('habitat_type', $habitat))
            ->when($request->get('q'), fn ($q, $search) => $q->whereRaw('LOWER(title) LIKE ?', ['%'.strtolower($search).'%']))
            ->latest('last_recorded_at')
            ->paginate(24);

        return Inertia::render('ListeningPoints/Index', [
            'points' => $points,
            'filters' => $request->only(['habitat', 'q']),
        ]);
    }

    public function show(string $slug): Response
    {
        $point = ListeningPoint::approved()
            ->with([
                'creator',
                'environment',
                'sounds' => fn ($q) => $q->public()->with(['user', 'tags', 'soundFile', 'soundAnalysis'])->latest('recorded_at'),
                'contributors',
                'scientificMetrics',
            ])
            ->where('slug', $slug)
            ->firstOrFail();

        $sounds = $point->sounds;

        // Timeline data
        $timeline = $sounds->map(fn ($sound) => [
            'id' => $sound->id,
            'slug' => $sound->slug,
            'title' => $sound->title,
            'recorded_at' => $sound->recorded_at?->toIso8601String(),
            'duration' => $sound->duration,
            'cover_url' => $sound->cover_url,
            'user' => [
                'name' => $sound->user->name,
                'slug' => $sound->user->slug,
            ],
            'species_count' => $sound->soundAnalysis?->birdnetDetections->count() ?? 0,
            'biodiversity_score' => $sound->scientificMetrics->firstWhere('metric_type', 'biodiversity_score')?->value ?? null,
        ]);

        // Species aggregated
        $speciesList = [];
        foreach ($sounds as $sound) {
            foreach ($sound->soundAnalysis?->birdnetDetections ?? [] as $detection) {
                $key = $detection->scientific_name;
                if (! isset($speciesList[$key])) {
                    $speciesList[$key] = [
                        'scientific_name' => $detection->scientific_name,
                        'common_name' => $detection->common_name,
                        'count' => 0,
                        'avg_confidence' => 0,
                        'detections' => [],
                    ];
                }
                $speciesList[$key]['count']++;
                $speciesList[$key]['detections'][] = [
                    'sound_id' => $sound->id,
                    'confidence' => $detection->confidence,
                    'recorded_at' => $sound->recorded_at?->toIso8601String(),
                ];
            }
        }

        foreach ($speciesList as &$s) {
            $confidences = array_column($s['detections'], 'confidence');
            $s['avg_confidence'] = count($confidences) > 0 ? round(array_sum($confidences) / count($confidences), 3) : 0;
        }
        unset($s);

        usort($speciesList, fn ($a, $b) => $b['count'] <=> $a['count']);

        // Metrics
        $metrics = $point->scientificMetrics->keyBy('metric_type');

        // Nearby points
        $nearby = $this->geoMatching->findNearbyPoints(
            (float) $point->public_latitude,
            (float) $point->public_longitude,
            5000,
            5,
        )->reject(fn ($p) => $p->id === $point->id)->values();

        return Inertia::render('ListeningPoints/Show', [
            'point' => [
                'id' => $point->id,
                'slug' => $point->slug,
                'title' => $point->title,
                'description' => $point->description,
                'public_latitude' => (float) $point->public_latitude,
                'public_longitude' => (float) $point->public_longitude,
                'public_accuracy_meters' => $point->public_accuracy_meters,
                'habitat_type' => $point->habitat_type,
                'recordings_count' => $point->recordings_count,
                'species_detected_count' => $point->species_detected_count,
                'first_recorded_at' => $point->first_recorded_at?->toIso8601String(),
                'last_recorded_at' => $point->last_recorded_at?->toIso8601String(),
                'dominant_tags' => $point->dominant_tags ?? [],
                'creator' => [
                    'name' => $point->creator->name,
                    'slug' => $point->creator->slug,
                ],
                'environment' => $point->environment?->name,
            ],
            'timeline' => $timeline,
            'species' => array_values($speciesList),
            'metrics' => [
                'biodiversity_score' => $metrics->get('biodiversity_score')?->value ?? null,
                'acoustic_activity_score' => $metrics->get('acoustic_activity_score')?->value ?? null,
            ],
            'nearbyPoints' => $nearby->map(fn ($p) => [
                'slug' => $p->slug,
                'title' => $p->title,
                'public_latitude' => (float) $p->public_latitude,
                'public_longitude' => (float) $p->public_longitude,
                'distance_meters' => (float) ($p->distance_meters ?? 0),
            ])->values(),
        ]);
    }
}

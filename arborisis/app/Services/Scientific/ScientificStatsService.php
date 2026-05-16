<?php

declare(strict_types=1);

namespace App\Services\Scientific;

use App\Enums\MetricType;
use App\Enums\ModerationStatus;
use App\Models\BirdnetDetection;
use App\Models\ListeningPoint;
use App\Models\ScientificMetric;
use App\Models\Sound;
use App\Models\SoundAnalysis;
use App\Models\SoundLocation;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Query\Builder as QueryBuilder;
use Illuminate\Support\Facades\DB;

class ScientificStatsService
{
    /**
     * @param array<string, mixed> $filters
     */
    private function publicSoundQuery(array $filters = []): Builder
    {
        return $this->applyPublicSoundFilters(Sound::public(), $filters);
    }

    /**
     * @param array<string, mixed> $filters
     */
    private function applyPublicSoundFilters(Builder $query, array $filters = []): Builder
    {
        if (! empty($filters['from'])) {
            $query->whereDate('recorded_at', '>=', $filters['from']);
        }

        if (! empty($filters['to'])) {
            $query->whereDate('recorded_at', '<=', $filters['to']);
        }

        if (! empty($filters['category_id'])) {
            $query->where('category_id', (int) $filters['category_id']);
        }

        if (! empty($filters['environment_id'])) {
            $query->where('environment_id', (int) $filters['environment_id']);
        }

        return $query;
    }

    /**
     * @param array<string, mixed> $filters
     */
    private function applyPublicSoundTableFilters(QueryBuilder $query, array $filters = []): QueryBuilder
    {
        if (! empty($filters['from'])) {
            $query->whereDate('sounds.recorded_at', '>=', $filters['from']);
        }

        if (! empty($filters['to'])) {
            $query->whereDate('sounds.recorded_at', '<=', $filters['to']);
        }

        if (! empty($filters['category_id'])) {
            $query->where('sounds.category_id', (int) $filters['category_id']);
        }

        if (! empty($filters['environment_id'])) {
            $query->where('sounds.environment_id', (int) $filters['environment_id']);
        }

        return $query;
    }

    /**
     * @param array<string, mixed> $filters
     */
    private function publicAnalysisQuery(array $filters = []): Builder
    {
        return SoundAnalysis::whereHas('sound', fn (Builder $q) => $this->applyPublicSoundFilters($q->public(), $filters));
    }

    /**
     * @return array<string, mixed>
     */
    public function getGlobalStats(array $filters = []): array
    {
        $query = $this->publicSoundQuery($filters);

        return [
            'total_sounds' => (int) (clone $query)->count(),
            'total_duration_seconds' => (float) ((clone $query)->sum('duration') ?? 0),
            'total_creators' => (int) (clone $query)->distinct('user_id')->count('user_id'),
            'total_analyses' => (int) $this->publicAnalysisQuery($filters)->count(),
            'completed_analyses' => (int) $this->publicAnalysisQuery($filters)->whereNotNull('processed_at')->count(),
            'avg_duration_seconds' => (float) ((clone $query)->avg('duration') ?? 0),
            'total_locations' => (int) SoundLocation::whereHas('sound', fn (Builder $q) => $this->applyPublicSoundFilters($q->public(), $filters))->whereNotNull('public_latitude')->count(),
        ];
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    public function getCategoryDistribution(array $filters = []): array
    {
        return $this->applyPublicSoundTableFilters(DB::table('sounds'), $filters)
            ->select('categories.name', DB::raw('COUNT(*) as count'), DB::raw('ROUND(AVG(sounds.duration), 2) as avg_duration'))
            ->join('categories', 'sounds.category_id', '=', 'categories.id')
            ->where('sounds.status', 'published')
            ->where('sounds.visibility', 'public')
            ->groupBy('categories.id', 'categories.name')
            ->orderByDesc('count')
            ->get()
            ->map(fn ($row) => [
                'name' => $row->name,
                'count' => (int) $row->count,
                'avg_duration' => (float) $row->avg_duration,
            ])
            ->values()
            ->all();
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    public function getEnvironmentDistribution(array $filters = []): array
    {
        return $this->applyPublicSoundTableFilters(DB::table('sounds'), $filters)
            ->select('environments.name', DB::raw('COUNT(*) as count'))
            ->join('environments', 'sounds.environment_id', '=', 'environments.id')
            ->where('sounds.status', 'published')
            ->where('sounds.visibility', 'public')
            ->groupBy('environments.id', 'environments.name')
            ->orderByDesc('count')
            ->get()
            ->map(fn ($row) => [
                'name' => $row->name,
                'count' => (int) $row->count,
            ])
            ->values()
            ->all();
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    public function getTemporalDistribution(array $filters = []): array
    {
        return $this->applyPublicSoundTableFilters(DB::table('sounds'), $filters)
            ->select(
                DB::raw("TO_CHAR(recorded_at, 'YYYY-MM') as month"),
                DB::raw('COUNT(*) as count'),
                DB::raw('ROUND(AVG(duration), 2) as avg_duration')
            )
            ->where('status', 'published')
            ->where('visibility', 'public')
            ->whereNotNull('recorded_at')
            ->groupBy(DB::raw("TO_CHAR(recorded_at, 'YYYY-MM')"))
            ->orderBy('month')
            ->get()
            ->map(fn ($row) => [
                'month' => $row->month,
                'count' => (int) $row->count,
                'avg_duration' => (float) $row->avg_duration,
            ])
            ->values()
            ->all();
    }

    /**
     * Geographic heatmap aggregated into ~0.5 degree cells to preserve privacy.
     *
     * @return array<int, array<string, mixed>>
     */
    public function getGeoHeatmap(array $filters = []): array
    {
        return $this->applyPublicSoundTableFilters(DB::table('sound_locations'), $filters)
            ->select(
                DB::raw('ROUND(public_latitude::numeric, 1) as lat'),
                DB::raw('ROUND(public_longitude::numeric, 1) as lng'),
                DB::raw('COUNT(*) as count'),
                DB::raw("STRING_AGG(DISTINCT categories.name, ', ') as categories")
            )
            ->join('sounds', 'sound_locations.sound_id', '=', 'sounds.id')
            ->leftJoin('categories', 'sounds.category_id', '=', 'categories.id')
            ->where('sounds.status', 'published')
            ->where('sounds.visibility', 'public')
            ->whereNotNull('sound_locations.public_latitude')
            ->whereNotNull('sound_locations.public_longitude')
            ->groupBy(
                DB::raw('ROUND(public_latitude::numeric, 1)'),
                DB::raw('ROUND(public_longitude::numeric, 1)')
            )
            ->orderByDesc('count')
            ->limit(2000)
            ->get()
            ->map(fn ($row) => [
                'lat' => (float) $row->lat,
                'lng' => (float) $row->lng,
                'count' => (int) $row->count,
                'categories' => $row->categories,
            ])
            ->values()
            ->all();
    }

    /**
     * @return array<string, mixed>
     */
    public function getAudioFeatureAverages(array $filters = []): array
    {
        $analyses = $this->publicAnalysisQuery($filters)->get();

        if ($analyses->isEmpty()) {
            return [];
        }

        $featureMap = [
            'zcr' => 'zero_crossing_rate',
            'rms' => 'rms_db',
            'spectral_centroid' => 'spectral_centroid',
            'spectral_rolloff' => 'spectral_rolloff',
            'spectral_bandwidth' => 'spectral_bandwidth',
            'zero_crossing_rate' => 'zero_crossing_rate',
        ];

        $result = [];

        foreach ($featureMap as $feature => $key) {
            $values = $analyses->map(function ($a) use ($key) {
                return $this->audioFeatureValue($a, $key);
            })
            ->filter(fn ($v) => is_numeric($v))
            ->map(fn ($v) => (float) $v);

            if ($values->isNotEmpty()) {
                $result[$feature] = [
                    'mean' => round($values->avg(), 4),
                    'median' => round($this->median($values->all()), 4),
                    'std' => round($this->std($values->all()), 4),
                    'min' => round($values->min(), 4),
                    'max' => round($values->max(), 4),
                    'count' => $values->count(),
                ];
            }
        }

        return $result;
    }

    /**
     * @return array<string, array<int, array<string, mixed>>>
     */
    public function getAudioFeatureDistribution(array $filters = []): array
    {
        $analyses = $this->publicAnalysisQuery($filters)->get();

        if ($analyses->isEmpty()) {
            return [];
        }

        $featureMap = [
            'zcr' => 'zero_crossing_rate',
            'rms' => 'rms_db',
            'spectral_centroid' => 'spectral_centroid',
            'spectral_rolloff' => 'spectral_rolloff',
        ];

        $result = [];

        foreach ($featureMap as $feature => $key) {
            $allValues = $analyses->map(function ($a) use ($key) {
                return $this->audioFeatureValue($a, $key);
            })
            ->filter(fn ($v) => is_numeric($v))
            ->map(fn ($v) => (float) $v)
            ->sort()
            ->values();

            if ($allValues->count() < 2) {
                continue;
            }

            $bins = 20;
            $min = $allValues->first();
            $max = $allValues->last();

            if ($min === $max) {
                $result[$feature] = [[
                    'range' => sprintf('%.4f', $min),
                    'mid' => $min,
                    'count' => $allValues->count(),
                ]];

                continue;
            }

            $step = ($max - $min) / $bins;

            $histogram = [];
            for ($i = 0; $i < $bins; $i++) {
                $binMin = $min + ($step * $i);
                $binMax = $min + ($step * ($i + 1));
                $histogram[] = [
                    'range' => sprintf('%.4f - %.4f', $binMin, $binMax),
                    'mid' => ($binMin + $binMax) / 2,
                    'count' => $allValues->filter(fn ($v) => $v >= $binMin && ($i === $bins - 1 ? $v <= $binMax : $v < $binMax))->count(),
                ];
            }

            $result[$feature] = $histogram;
        }

        return $result;
    }

    private function audioFeatureValue(SoundAnalysis $analysis, string $key): mixed
    {
        $json = $analysis->features_json ?? [];

        $value = $json[$key] ?? null;

        if ($value === null) {
            $nestedPaths = [
                'rms_db' => [
                    ['temporal', 'rms', 'stats', 'mean'],
                    ['temporal', 'rms_db', 'stats', 'mean'],
                ],
                'zero_crossing_rate' => [
                    ['temporal', 'zero_crossing_rate', 'stats', 'mean'],
                    ['temporal', 'zcr', 'stats', 'mean'],
                ],
                'spectral_centroid' => [
                    ['spectral', 'spectral_centroid', 'stats', 'mean'],
                    ['spectral', 'centroid', 'stats', 'mean'],
                ],
                'spectral_rolloff' => [
                    ['spectral', 'spectral_rolloff', 'stats', 'mean'],
                    ['spectral', 'rolloff', 'stats', 'mean'],
                ],
                'spectral_bandwidth' => [
                    ['spectral', 'spectral_bandwidth', 'stats', 'mean'],
                    ['spectral', 'bandwidth', 'stats', 'mean'],
                ],
            ];

            foreach ($nestedPaths[$key] ?? [] as $path) {
                $value = $this->pluckNested($json, $path);
                if ($value !== null) {
                    break;
                }
            }
        }

        if ($value === null && isset($analysis->{$key})) {
            $value = $analysis->{$key};
        }

        return $value;
    }

    /**
     * @param array<string, mixed> $array
     * @param array<int, string> $path
     */
    private function pluckNested(array $array, array $path): mixed
    {
        $current = $array;
        foreach ($path as $key) {
            if (! is_array($current) || ! array_key_exists($key, $current)) {
                return null;
            }
            $current = $current[$key];
        }
        return $current;
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    public function getTopLocations(int $limit = 20, array $filters = []): array
    {
        return $this->applyPublicSoundTableFilters(DB::table('sound_locations'), $filters)
            ->select('location_name', DB::raw('COUNT(*) as count'))
            ->join('sounds', 'sound_locations.sound_id', '=', 'sounds.id')
            ->where('sounds.status', 'published')
            ->where('sounds.visibility', 'public')
            ->whereNotNull('location_name')
            ->where('location_name', '!=', '')
            ->groupBy('location_name')
            ->orderByDesc('count')
            ->limit($limit)
            ->get()
            ->map(fn ($row) => [
                'name' => $row->location_name,
                'count' => (int) $row->count,
            ])
            ->values()
            ->all();
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    public function getEquipmentDistribution(int $limit = 15, array $filters = []): array
    {
        return $this->applyPublicSoundTableFilters(DB::table('sounds'), $filters)
            ->select('equipment', DB::raw('COUNT(*) as count'))
            ->where('status', 'published')
            ->where('visibility', 'public')
            ->whereNotNull('equipment')
            ->where('equipment', '!=', '')
            ->groupBy('equipment')
            ->orderByDesc('count')
            ->limit($limit)
            ->get()
            ->map(fn ($row) => [
                'name' => $row->equipment,
                'count' => (int) $row->count,
            ])
            ->values()
            ->all();
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    public function getRawDataSample(int $limit = 100, array $filters = []): array
    {
        return $this->publicSoundQuery($filters)
            ->with(['category', 'environment', 'soundLocation', 'soundAnalysis'])
            ->latest('recorded_at')
            ->limit($limit)
            ->get()
            ->map(fn (Sound $sound) => [
                'id' => $sound->id,
                'title' => $sound->title,
                'duration' => $sound->duration,
                'category' => $sound->category?->name,
                'environment' => $sound->environment?->name,
                'license' => $sound->license->value ?? null,
                'recorded_at' => $sound->recorded_at?->toIso8601String(),
                'latitude' => $sound->soundLocation?->public_latitude,
                'longitude' => $sound->soundLocation?->public_longitude,
                'location_name' => $sound->soundLocation?->location_name,
                'equipment' => $sound->equipment,
                'play_count' => $sound->play_count,
                'like_count' => $sound->like_count,
                'analysis_status' => $sound->soundAnalysis?->status->value ?? null,
            ])
            ->all();
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    public function getSpeciesDistribution(int $limit = 50, array $filters = []): array
    {
        $query = BirdnetDetection::query()
            ->whereHas('sound', fn (Builder $q) => $this->applyPublicSoundFilters($q->public(), $filters));

        if (isset($filters['min_confidence'])) {
            $query->where('confidence', '>=', (float) $filters['min_confidence']);
        }

        return $query
            ->select(
                'scientific_name',
                'common_name',
                DB::raw('COUNT(*) as detections_count'),
                DB::raw('COUNT(DISTINCT sound_id) as sounds_count'),
                DB::raw('ROUND(AVG(confidence), 4) as mean_confidence'),
                DB::raw('MAX(confidence) as max_confidence')
            )
            ->groupBy('scientific_name', 'common_name')
            ->orderByDesc('sounds_count')
            ->orderByDesc('mean_confidence')
            ->limit($limit)
            ->get()
            ->map(fn ($row) => [
                'scientific_name' => $row->scientific_name,
                'common_name' => $row->common_name,
                'detections_count' => (int) $row->detections_count,
                'sounds_count' => (int) $row->sounds_count,
                'mean_confidence' => (float) $row->mean_confidence,
                'max_confidence' => (float) $row->max_confidence,
            ])
            ->values()
            ->all();
    }

    /**
     * @return array<string, mixed>
     */
    public function getQualityOverview(array $filters = []): array
    {
        $analyses = $this->publicAnalysisQuery($filters);
        $total = (int) (clone $analyses)->count();

        $qualityLabels = (clone $analyses)
            ->whereNotNull('quality_label')
            ->select('quality_label', DB::raw('COUNT(*) as count'))
            ->groupBy('quality_label')
            ->orderByDesc('count')
            ->get()
            ->map(fn ($row) => [
                'label' => $row->quality_label,
                'count' => (int) $row->count,
                'percentage' => $this->percentage((int) $row->count, $total),
            ])
            ->values()
            ->all();

        $statusCounts = $this->publicAnalysisQuery($filters)
            ->select('status', DB::raw('COUNT(*) as count'))
            ->groupBy('status')
            ->orderBy('status')
            ->get()
            ->map(fn ($row) => [
                'status' => $row->status instanceof \BackedEnum ? $row->status->value : (string) $row->status,
                'count' => (int) $row->count,
                'percentage' => $this->percentage((int) $row->count, $total),
            ])
            ->values()
            ->all();

        return [
            'analyses_count' => $total,
            'status_counts' => $statusCounts,
            'quality_labels' => $qualityLabels,
            'technical_averages' => [
                'duration_seconds' => round((float) ((clone $analyses)->avg('duration_seconds') ?? 0), 2),
                'sample_rate' => round((float) ((clone $analyses)->avg('sample_rate') ?? 0), 2),
                'loudness_lufs' => round((float) ((clone $analyses)->avg('loudness_lufs') ?? 0), 2),
                'peak_db' => round((float) ((clone $analyses)->avg('peak_db') ?? 0), 2),
                'noise_floor_db' => round((float) ((clone $analyses)->avg('noise_floor_db') ?? 0), 2),
            ],
            'metric_coverage' => [
                'duration_seconds' => $this->analysisMetricCoverage('duration_seconds', $filters, $total),
                'sample_rate' => $this->analysisMetricCoverage('sample_rate', $filters, $total),
                'loudness_lufs' => $this->analysisMetricCoverage('loudness_lufs', $filters, $total),
                'noise_floor_db' => $this->analysisMetricCoverage('noise_floor_db', $filters, $total),
                'spectral_centroid' => $this->analysisMetricCoverage('spectral_centroid', $filters, $total),
                'zero_crossing_rate' => $this->analysisMetricCoverage('zero_crossing_rate', $filters, $total),
            ],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public function getDatasetCompleteness(array $filters = []): array
    {
        $query = $this->publicSoundQuery($filters);
        $total = (int) (clone $query)->count();

        $fields = [
            'recorded_at' => (clone $query)->whereNotNull('recorded_at')->count(),
            'duration' => (clone $query)->whereNotNull('duration')->where('duration', '>', 0)->count(),
            'category' => (clone $query)->whereNotNull('category_id')->count(),
            'environment' => (clone $query)->whereNotNull('environment_id')->count(),
            'public_location' => (clone $query)->whereHas('soundLocation', fn (Builder $q) => $q->whereNotNull('public_latitude')->whereNotNull('public_longitude'))->count(),
            'equipment' => (clone $query)->whereNotNull('equipment')->where('equipment', '!=', '')->count(),
            'license' => (clone $query)->whereNotNull('license')->count(),
            'completed_analysis' => (clone $query)->whereHas('soundAnalysis', fn (Builder $q) => $q->whereNotNull('processed_at'))->count(),
            'species_detection' => (clone $query)->whereHas('soundAnalysis.birdnetDetections')->count(),
        ];

        return [
            'sounds_count' => $total,
            'fields' => collect($fields)
                ->map(fn (int $count, string $field) => [
                    'field' => $field,
                    'count' => $count,
                    'missing' => max(0, $total - $count),
                    'percentage' => $this->percentage($count, $total),
                ])
                ->values()
                ->all(),
            'scientific_readiness_score' => $this->scientificReadinessScore($fields, $total),
        ];
    }

    /**
     * @param array<string, mixed> $filters
     *
     * @return array<string, mixed>
     */
    private function analysisMetricCoverage(string $column, array $filters, int $total): array
    {
        $count = (int) $this->publicAnalysisQuery($filters)->whereNotNull($column)->count();

        return [
            'count' => $count,
            'percentage' => $this->percentage($count, $total),
        ];
    }

    private function percentage(int $count, int $total): float
    {
        if ($total === 0) {
            return 0.0;
        }

        return round(($count / $total) * 100, 2);
    }

    /**
     * @param array<string, int> $fields
     */
    private function scientificReadinessScore(array $fields, int $total): float
    {
        if ($total === 0 || $fields === []) {
            return 0.0;
        }

        $weights = [
            'recorded_at' => 1.1,
            'duration' => 1.0,
            'category' => 1.0,
            'environment' => 1.0,
            'public_location' => 1.2,
            'equipment' => 0.7,
            'license' => 0.5,
            'completed_analysis' => 1.4,
            'species_detection' => 1.1,
        ];

        $score = 0.0;
        $totalWeight = 0.0;

        foreach ($fields as $field => $count) {
            $weight = $weights[$field] ?? 1.0;
            $score += ($count / $total) * $weight;
            $totalWeight += $weight;
        }

        return round(($score / $totalWeight) * 100, 2);
    }

    /**
     * @param array<int, float> $values
     */
    private function median(array $values): float
    {
        sort($values);
        $count = count($values);
        $middle = (int) floor($count / 2);

        if ($count % 2) {
            return $values[$middle];
        }

        return ($values[$middle - 1] + $values[$middle]) / 2;
    }

    /**
     * @param array<int, float> $values
     */
    private function std(array $values): float
    {
        $count = count($values);
        if ($count < 2) {
            return 0.0;
        }

        $mean = array_sum($values) / $count;
        $variance = array_sum(array_map(fn (float $v): float => pow($v - $mean, 2), $values)) / $count;

        return sqrt($variance);
    }

    /**
     * @return array<string, mixed>
     */
    public function getListeningPointsOverview(): array
    {
        $total = ListeningPoint::approved()->count();
        $withRecordings = ListeningPoint::approved()->where('recordings_count', '>', 0)->count();

        $byHabitat = ListeningPoint::approved()
            ->select('habitat_type', DB::raw('COUNT(*) as count'))
            ->whereNotNull('habitat_type')
            ->groupBy('habitat_type')
            ->orderByDesc('count')
            ->get()
            ->map(fn ($row) => [
                'habitat' => $row->habitat_type,
                'count' => (int) $row->count,
            ])
            ->values()
            ->all();

        $mostActive = ListeningPoint::approved()
            ->where('recordings_count', '>', 0)
            ->orderByDesc('recordings_count')
            ->limit(10)
            ->get()
            ->map(fn ($point) => [
                'slug' => $point->slug,
                'title' => $point->title,
                'recordings_count' => $point->recordings_count,
                'species_count' => $point->species_detected_count,
            ])
            ->values()
            ->all();

        return [
            'total_points' => $total,
            'points_with_recordings' => $withRecordings,
            'by_habitat' => $byHabitat,
            'most_active' => $mostActive,
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public function getGlobalMetricsOverview(): array
    {
        $sbsValues = ScientificMetric::where('metric_type', MetricType::BiodiversityScore->value)
            ->where('measurable_type', Sound::class)
            ->pluck('value')
            ->map(fn ($v) => (float) $v);

        $aasValues = ScientificMetric::where('metric_type', MetricType::AcousticActivityScore->value)
            ->where('measurable_type', Sound::class)
            ->pluck('value')
            ->map(fn ($v) => (float) $v);

        return [
            'biodiversity_score' => [
                'count' => $sbsValues->count(),
                'mean' => $sbsValues->isNotEmpty() ? round($sbsValues->avg(), 2) : null,
                'median' => $sbsValues->isNotEmpty() ? round($this->median($sbsValues->all()), 2) : null,
                'min' => $sbsValues->isNotEmpty() ? round($sbsValues->min(), 2) : null,
                'max' => $sbsValues->isNotEmpty() ? round($sbsValues->max(), 2) : null,
            ],
            'acoustic_activity_score' => [
                'count' => $aasValues->count(),
                'mean' => $aasValues->isNotEmpty() ? round($aasValues->avg(), 2) : null,
                'median' => $aasValues->isNotEmpty() ? round($this->median($aasValues->all()), 2) : null,
                'min' => $aasValues->isNotEmpty() ? round($aasValues->min(), 2) : null,
                'max' => $aasValues->isNotEmpty() ? round($aasValues->max(), 2) : null,
            ],
        ];
    }
}

<?php

declare(strict_types=1);

namespace App\Services\Scientific;

use App\Models\Sound;
use App\Models\SoundAnalysis;
use App\Models\SoundLocation;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

class ScientificStatsService
{
    /**
     * @return array<string, mixed>
     */
    public function getGlobalStats(): array
    {
        $query = Sound::public();

        return [
            'total_sounds' => (int) (clone $query)->count(),
            'total_duration_seconds' => (float) ((clone $query)->sum('duration') ?? 0),
            'total_creators' => (int) (clone $query)->distinct('user_id')->count('user_id'),
            'total_analyses' => (int) SoundAnalysis::whereHas('sound', fn (Builder $q) => $q->public())->count(),
            'completed_analyses' => (int) SoundAnalysis::whereHas('sound', fn (Builder $q) => $q->public())->whereNotNull('processed_at')->count(),
            'avg_duration_seconds' => (float) ((clone $query)->avg('duration') ?? 0),
            'total_locations' => (int) SoundLocation::whereHas('sound', fn (Builder $q) => $q->public())->whereNotNull('public_latitude')->count(),
        ];
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    public function getCategoryDistribution(): array
    {
        return DB::table('sounds')
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
    public function getEnvironmentDistribution(): array
    {
        return DB::table('sounds')
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
    public function getTemporalDistribution(): array
    {
        return DB::table('sounds')
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
    public function getGeoHeatmap(): array
    {
        return DB::table('sound_locations')
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
    public function getAudioFeatureAverages(): array
    {
        $analyses = SoundAnalysis::whereHas('sound', fn (Builder $q) => $q->public())
            ->get();

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
    public function getAudioFeatureDistribution(): array
    {
        $analyses = SoundAnalysis::whereHas('sound', fn (Builder $q) => $q->public())
            ->get();

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
    public function getTopLocations(int $limit = 20): array
    {
        return DB::table('sound_locations')
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
    public function getEquipmentDistribution(int $limit = 15): array
    {
        return DB::table('sounds')
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
    public function getRawDataSample(int $limit = 100): array
    {
        return Sound::public()
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
}

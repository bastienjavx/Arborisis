<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\Scientific\ScientificStatsService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ScientificStatsController extends Controller
{
    public function __construct(
        private readonly ScientificStatsService $statsService
    ) {}

    public function globalStats(): JsonResponse
    {
        return response()->json([
            'data' => $this->statsService->getGlobalStats(),
        ]);
    }

    public function categories(): JsonResponse
    {
        return response()->json([
            'data' => $this->statsService->getCategoryDistribution(),
        ]);
    }

    public function environments(): JsonResponse
    {
        return response()->json([
            'data' => $this->statsService->getEnvironmentDistribution(),
        ]);
    }

    public function temporal(): JsonResponse
    {
        return response()->json([
            'data' => $this->statsService->getTemporalDistribution(),
        ]);
    }

    public function geoHeatmap(): JsonResponse
    {
        return response()->json([
            'data' => $this->statsService->getGeoHeatmap(),
        ]);
    }

    public function audioFeatures(): JsonResponse
    {
        return response()->json([
            'data' => [
                'averages' => $this->statsService->getAudioFeatureAverages(),
                'distributions' => $this->statsService->getAudioFeatureDistribution(),
            ],
        ]);
    }

    public function topLocations(): JsonResponse
    {
        return response()->json([
            'data' => $this->statsService->getTopLocations(),
        ]);
    }

    public function equipment(): JsonResponse
    {
        return response()->json([
            'data' => $this->statsService->getEquipmentDistribution(),
        ]);
    }

    public function rawData(Request $request): JsonResponse
    {
        $limit = min($request->integer('limit', 100), 1000);

        return response()->json([
            'data' => $this->statsService->getRawDataSample($limit),
        ]);
    }
}

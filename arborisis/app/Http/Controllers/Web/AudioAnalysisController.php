<?php

declare(strict_types=1);

namespace App\Http\Controllers\Web;

use App\Enums\AnalysisStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\AudioAnalysis\AnalyzeSoundRequest;
use App\Http\Requests\AudioAnalysis\RetryRequest;
use App\Jobs\ProcessAudioAnalysis;
use App\Models\Sound;
use App\Models\SoundAnalysis;
use App\Services\AudioAnalysis\AudioAnalysisOrchestrationService;
use App\Services\AudioAnalysis\AudioAnalysisService;
use App\Services\AudioAnalysis\FeatureExtractorService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class AudioAnalysisController extends Controller
{
    public function __construct(
        private AudioAnalysisService $audioAnalysisService,
        private AudioAnalysisOrchestrationService $orchestrationService,
        private FeatureExtractorService $featureExtractor,
    ) {}

    public function show(Sound $sound): Response|JsonResponse
    {
        Gate::authorize('view', [SoundAnalysis::class, $sound]);

        $analysis = SoundAnalysis::with('visualizations')->where('sound_id', $sound->id)->first();
        $isOwner = auth()->check() && auth()->user()->id === $sound->user_id;

        if (request()->wantsJson() || request()->segment(1) === 'api') {
            return response()->json([
                'sound' => [
                    'id' => $sound->id,
                    'slug' => $sound->slug,
                    'title' => $sound->title,
                    'duration' => $sound->duration,
                ],
                'analysis' => $this->orchestrationService->getAnalysisWithUrls($sound),
            ]);
        }

        return Inertia::render('AudioAnalysis/Dashboard', [
            'sound' => [
                'id' => $sound->id,
                'slug' => $sound->slug,
                'title' => $sound->title,
                'duration' => $sound->duration,
                'audio_url' => $sound->audio_url,
            ],
            'analysis' => $analysis ? [
                'id' => $analysis->id,
                'status' => $analysis->status->value,
                'features' => $analysis->features_json,
                'parameters' => $analysis->parameters_json,
                'processed_at' => $analysis->processed_at,
                'visualizations' => $analysis->visualizations->map(fn ($v) => [
                    'id' => $v->id,
                    'type' => $v->type->value,
                    'scale' => $v->scale->value,
                    'url' => $v->url,
                ])->values(),
            ] : null,
            'isOwner' => $isOwner,
        ]);
    }

    public function analyze(Sound $sound, AnalyzeSoundRequest $request): JsonResponse
    {
        Gate::authorize('analyze', [SoundAnalysis::class, $sound]);

        $config = $request->validatedConfig();

        ProcessAudioAnalysis::dispatch($sound->id, $config);

        return response()->json([
            'message' => 'Analyse en cours de traitement.',
            'sound_id' => $sound->id,
            'status' => AnalysisStatus::PENDING->value,
        ]);
    }

    public function export(Sound $sound, string $format): JsonResponse|\Symfony\Component\HttpFoundation\StreamedResponse
    {
        $analysis = SoundAnalysis::where('sound_id', $sound->id)->firstOrFail();
        Gate::authorize('export', [SoundAnalysis::class, $analysis]);

        if (! in_array($format, ['json', 'csv'], true)) {
            return response()->json(['error' => 'Format non supporté. Utilisez json ou csv.'], 400);
        }

        $export = $this->audioAnalysisService->exportFeatures($analysis, $format);

        return response()->stream(function () use ($export) {
            echo $export['content'];
        }, 200, [
            'Content-Type' => $export['mime'],
            'Content-Disposition' => 'attachment; filename="' . $export['filename'] . '"',
        ]);
    }

    public function showApi(Sound $sound): JsonResponse
    {
        Gate::authorize('view', [SoundAnalysis::class, $sound]);

        $analysisData = $this->orchestrationService->getAnalysisWithUrls($sound);

        return response()->json([
            'sound' => [
                'id' => $sound->id,
                'slug' => $sound->slug,
                'title' => $sound->title,
                'duration' => $sound->duration,
            ],
            'analysis' => $analysisData,
        ]);
    }

    public function retry(Sound $sound, RetryRequest $request): JsonResponse
    {
        Gate::authorize('analyze', [SoundAnalysis::class, $sound]);

        $analysis = $this->orchestrationService->retry(
            $sound,
            auth()->user(),
            $request->boolean('force', false)
        );

        return response()->json([
            'message' => 'Analysis retry requested.',
            'sound_id' => $sound->id,
            'status' => $analysis->status->value,
            'attempts' => $analysis->attempts,
        ]);
    }

    public function realtimeData(Sound $sound): JsonResponse
    {
        Gate::authorize('view', [SoundAnalysis::class, $sound]);

        return response()->json([
            'sound_id' => $sound->id,
            'audio_url' => $sound->audio_url,
            'duration' => $sound->duration,
            'sample_rate' => 22050,
        ]);
    }
}

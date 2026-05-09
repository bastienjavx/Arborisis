<?php

declare(strict_types=1);

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Services\Radio\RadioStreamService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;
use Symfony\Component\HttpFoundation\StreamedResponse;

class RadioController extends Controller
{
    public function __construct(
        private readonly RadioStreamService $streamService
    ) {}

    public function index(): InertiaResponse
    {
        $nowPlaying = $this->streamService->getCurrentMetadata();
        $history = $this->streamService->getHistorySounds(5);
        $listenerCount = $this->streamService->getListenerCount();

        return Inertia::render('Radio/Index', [
            'nowPlaying' => $nowPlaying,
            'history' => $history->map(fn ($sound) => [
                'id' => $sound->id,
                'title' => $sound->title,
                'slug' => $sound->slug,
                'user_name' => $sound->user?->name,
                'cover_url' => $sound->cover_url,
                'duration' => $sound->duration,
            ])->values(),
            'listenerCount' => $listenerCount,
        ]);
    }

    public function stream(Request $request): StreamedResponse
    {
        set_time_limit(0);
        ignore_user_abort(true);

        $mimeType = $this->streamService->getPlaylistMimeType();

        $headers = [
            'Content-Type' => $mimeType,
            'Cache-Control' => 'no-cache, no-store, must-revalidate',
            'Pragma' => 'no-cache',
            'Expires' => '0',
            'Access-Control-Allow-Origin' => '*',
            'X-Accel-Buffering' => 'no',
        ];

        $icyRequested = $request->headers->get('Icy-MetaData') === '1';

        if ($icyRequested && $this->streamService->supportsIcyMetadata()) {
            $headers['icy-metaint'] = (string) config('radio.icy_metaint', 8192);
            $headers['icy-name'] = 'Arborisis Radio';
            $headers['icy-genre'] = 'Field Recording / Nature';
            $headers['icy-url'] = config('app.url');
        }

        return response()->stream(function () use ($icyRequested) {
            if (app()->environment('testing')) {
                echo 'test-stream';

                return;
            }

            try {
                $this->streamService->streamToOutput(function (string $chunk): void {
                    echo $chunk;
                }, $icyRequested);
            } catch (\Throwable $e) {
                Log::error('Radio stream error', ['exception' => $e]);
            }
        }, 200, $headers);
    }

    public function playlist(): \Illuminate\Http\Response
    {
        $streamUrl = route('radio.stream');
        $content = "#EXTM3U\n#EXTINF:-1,Arborisis Radio\n{$streamUrl}\n";

        return response($content, 200, [
            'Content-Type' => 'audio/x-mpegurl',
            'Content-Disposition' => 'attachment; filename="arborisis-radio.m3u"',
        ]);
    }

    public function nowPlaying(): \Illuminate\Http\JsonResponse
    {
        $metadata = $this->streamService->getCurrentMetadata();
        $listenerCount = $this->streamService->getListenerCount();
        $nextSound = $this->streamService->resolveNextSound();

        return response()->json([
            'now_playing' => $metadata,
            'next_up' => $nextSound ? [
                'id' => $nextSound->id,
                'title' => $nextSound->title,
                'slug' => $nextSound->slug,
                'user_name' => $nextSound->user?->name,
                'cover_url' => $nextSound->cover_url,
                'duration' => $nextSound->duration,
            ] : null,
            'listener_count' => $listenerCount,
            'updated_at' => now()->toIso8601String(),
        ]);
    }
}

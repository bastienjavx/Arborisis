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

        $icyMetaint = config('radio.icy_metaint', 8192);

        $headers = [
            'Content-Type' => 'audio/mpeg',
            'Cache-Control' => 'no-cache, no-store, must-revalidate',
            'Pragma' => 'no-cache',
            'Expires' => '0',
            'Connection' => 'close',
            'icy-name' => 'Arborisis Radio',
            'icy-genre' => 'Nature / Field Recording',
            'icy-metaint' => (string) $icyMetaint,
            'icy-url' => route('radio.index'),
            'Access-Control-Allow-Origin' => '*',
        ];

        return response()->stream(function () {
            if (app()->environment('testing')) {
                echo 'test-stream';

                return;
            }

            try {
                $this->streamService->streamToOutput(function (string $chunk): void {
                    echo $chunk;
                });
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
        $nextSound = $this->getNextInQueue();

        return response()->json([
            'now_playing' => $metadata,
            'next_up' => $nextSound,
            'listener_count' => $listenerCount,
            'updated_at' => now()->toIso8601String(),
        ]);
    }

    private function getNextInQueue(): ?array
    {
        $history = $this->streamService->getHistory();
        $playlist = $this->streamService->getPlaylist();

        if ($playlist->isEmpty()) {
            return null;
        }

        $available = $playlist->filter(function ($sound) use ($history) {
            return !in_array($sound->id, $history, true);
        });

        if ($available->isEmpty()) {
            $available = $playlist;
        }

        $next = $available->first();

        if (!$next) {
            return null;
        }

        return [
            'id' => $next->id,
            'title' => $next->title,
            'slug' => $next->slug,
            'user_name' => $next->user?->name,
            'cover_url' => $next->cover_url,
            'duration' => $next->duration,
        ];
    }
}

<?php

declare(strict_types=1);

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Http\Requests\Sound\StoreSoundRequest;
use App\Models\Category;
use App\Models\Environment;
use App\Models\Sound;
use App\Models\SoundAnalysis;
use App\Services\Sound\SoundUploadService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class SoundController extends Controller
{
    public function __construct(
        private readonly SoundUploadService $uploadService
    ) {}

    public function index(): Response
    {
        $sounds = Sound::public()
            ->with(['user.profile', 'category', 'tags', 'soundFile'])
            ->latest()
            ->paginate(12);

        return Inertia::render('Sounds/Index', [
            'sounds' => $sounds,
            'categories' => Category::orderBy('order')->get(),
        ]);
    }

    public function show(string $slug): Response
    {
        $sound = Sound::public()
            ->with(['user.profile', 'category', 'environment', 'tags', 'soundLocation', 'soundFile'])
            ->where('slug', $slug)
            ->firstOrFail();

        $this->authorize('view', $sound);

        // Increment play count (can be optimized with cache/queue later)
        $sound->increment('play_count');

        // Get audio URL
        $audioUrl = null;
        if ($sound->soundFile) {
            $disk = $sound->soundFile->disk;
            $audioUrl = $this->getFileUrl($disk, $sound->soundFile->path);
        }

        // Get cover URL
        $coverUrl = null;
        if ($sound->cover_image) {
            $disk = $sound->soundFile?->disk ?? 'public';
            $coverUrl = $this->getFileUrl($disk, $sound->cover_image);
        }

        $comments = $sound->comments()
            ->with(['user', 'replies.user'])
            ->latest()
            ->paginate(10);

        $isLiked = auth()->check()
            ? $sound->isLikedBy(auth()->user())
            : false;

        $isFollowing = auth()->check() && $sound->user
            ? auth()->user()->isFollowing($sound->user)
            : false;

        $analysis = SoundAnalysis::with('visualizations')
            ->where('sound_id', $sound->id)
            ->where('status', 'completed')
            ->first();

        return Inertia::render('Sounds/Show', [
            'sound' => [
                ...$sound->toArray(),
                'sound_location' => $sound->soundLocation ? [
                    'public_latitude' => $sound->soundLocation->public_latitude,
                    'public_longitude' => $sound->soundLocation->public_longitude,
                    'location_name' => $sound->soundLocation->location_name,
                    'is_sensitive' => $sound->soundLocation->is_sensitive,
                ] : null,
            ],
            'audioUrl' => $audioUrl,
            'coverUrl' => $coverUrl,
            'comments' => $comments,
            'isLiked' => $isLiked,
            'isFollowing' => $isFollowing,
            'analysis' => $analysis ? [
                'id' => $analysis->id,
                'status' => $analysis->status->value,
                'features' => $analysis->features_json,
                'visualizations' => $analysis->visualizations->map(fn ($v) => [
                    'id' => $v->id,
                    'type' => $v->type->value,
                    'url' => $v->url,
                ])->values(),
            ] : null,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Sounds/Create', [
            'categories' => Category::orderBy('order')->get(),
            'environments' => Environment::orderBy('order')->get(),
        ]);
    }

    public function store(StoreSoundRequest $request): RedirectResponse
    {
        $this->authorize('create', Sound::class);

        try {
            $sound = $this->uploadService->upload(
                $request->validated(),
                $request->user()->id
            );

            return redirect()
                ->route('sounds.show', $sound->slug)
                ->with('success', 'Votre son a été publié avec succès.');
        } catch (\Exception $e) {
            report($e);

            return back()
                ->withInput()
                ->with('error', 'Une erreur est survenue lors de la publication. Veuillez réessayer.');
        }
    }

    private function getFileUrl(string $disk, string $path): string
    {
        $storage = Storage::disk($disk);

        if ($disk === 'audio' || $disk === 's3') {
            return $storage->temporaryUrl($path, now()->addMinutes(60));
        }

        return $storage->url($path);
    }
}

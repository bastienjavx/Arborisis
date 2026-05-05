<?php

declare(strict_types=1);

namespace App\Http\Controllers\Web;

use App\Enums\SoundStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Sound\StoreSoundRequest;
use App\Models\Category;
use App\Models\Sound;
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
            ->with(['user.profile', 'category', 'tags'])
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
            ->with(['user.profile', 'category', 'tags', 'soundLocation', 'soundFile'])
            ->where('slug', $slug)
            ->firstOrFail();

        // Increment play count (can be optimized with cache/queue later)
        $sound->increment('play_count');

        // Get audio URL
        $audioUrl = null;
        if ($sound->soundFile) {
            $audioUrl = Storage::disk($sound->soundFile->disk)
                ->url($sound->soundFile->path);
        }

        // Get cover URL
        $coverUrl = null;
        if ($sound->cover_image) {
            $coverUrl = Storage::disk($sound->soundFile?->disk ?? 'public')
                ->url($sound->cover_image);
        }

        return Inertia::render('Sounds/Show', [
            'sound' => $sound,
            'audioUrl' => $audioUrl,
            'coverUrl' => $coverUrl,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Sounds/Create', [
            'categories' => Category::orderBy('order')->get(),
        ]);
    }

    public function store(StoreSoundRequest $request): RedirectResponse
    {
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
}

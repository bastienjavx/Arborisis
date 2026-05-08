<?php

declare(strict_types=1);

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CreatorController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->input('search');

        $creators = User::query()
            ->whereHas('profile', fn ($q) => $q->where('is_creator', true))
            ->withCount('sounds')
            ->with('profile')
            ->when($search, fn ($q) => $q->where(function ($q) use ($search) {
                $q->where('name', 'ilike', "%{$search}%")
                  ->orWhereHas('profile', fn ($q) => $q->where('bio', 'ilike', "%{$search}%"));
            }))
            ->orderBy('sounds_count', 'desc')
            ->paginate(24)
            ->withQueryString();

        return Inertia::render('Creators/Index', [
            'creators' => $creators,
            'filters' => ['search' => $search],
        ]);
    }
}

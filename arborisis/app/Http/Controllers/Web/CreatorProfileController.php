<?php

declare(strict_types=1);

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class CreatorProfileController extends Controller
{
    public function show(string $slug): Response
    {
        $user = User::where('slug', $slug)
            ->with(['profile', 'sounds' => function ($query) {
                $query->public()
                    ->with(['category', 'tags', 'soundFile'])
                    ->latest();
            }])
            ->firstOrFail();

        $sounds = $user->sounds()
            ->public()
            ->with(['category', 'tags', 'soundFile'])
            ->latest()
            ->paginate(12);

        $stats = [
            'sounds_count' => $user->sounds()->public()->count(),
            'followers_count' => $user->followers()->count(),
            'following_count' => $user->following()->count(),
            'total_plays' => $user->sounds()->public()->sum('play_count'),
        ];

        $avatarUrl = null;
        if ($user->profile?->avatar) {
            $avatarUrl = Storage::disk('public')->url($user->profile->avatar);
        }

        return Inertia::render('Profile/Show', [
            'creator' => $user,
            'sounds' => $sounds,
            'stats' => $stats,
            'avatarUrl' => $avatarUrl,
            'isFollowing' => auth()->check() ? auth()->user()->isFollowing($user) : false,
        ]);
    }
}

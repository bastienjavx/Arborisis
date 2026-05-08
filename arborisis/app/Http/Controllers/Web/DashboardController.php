<?php

declare(strict_types=1);

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Services\Echo\WalletService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __construct(
        private readonly WalletService $walletService
    ) {}

    public function index(Request $request): Response
    {
        $user = $request->user();

        $totalSounds = $user->sounds()->count();
        $totalPlays = $user->sounds()->sum('play_count') ?? 0;
        $totalLikes = $user->sounds()->sum('like_count') ?? 0;
        $totalFollowers = $user->followers()->count();

        $recentSounds = $user->sounds()
            ->with('category')
            ->latest()
            ->limit(5)
            ->get()
            ->map(fn ($sound) => [
                'id' => $sound->id,
                'slug' => $sound->slug,
                'title' => $sound->title,
                'cover_url' => $sound->cover_url,
                'duration' => $sound->duration,
                'play_count' => $sound->play_count,
                'like_count' => $sound->like_count,
                'category' => $sound->category ? ['name' => $sound->category->name] : null,
            ]);

        $activities = $this->gatherActivities($user);
        $echoBalance = $this->walletService->getBalance($user);

        return Inertia::render('Dashboard', [
            'stats' => [
                'totalSounds' => $totalSounds,
                'totalPlays' => (int) $totalPlays,
                'totalLikes' => (int) $totalLikes,
                'totalFollowers' => $totalFollowers,
            ],
            'recentSounds' => $recentSounds,
            'activities' => $activities,
            'echoBalance' => $echoBalance,
        ]);
    }

    private function gatherActivities($user): array
    {
        $activities = [];

        $recentLikes = $user->sounds()
            ->with(['likes.user'])
            ->whereHas('likes', fn ($q) => $q->where('created_at', '>=', now()->subDays(30)))
            ->get()
            ->flatMap(fn ($sound) => $sound->likes->map(fn ($like) => [
                'id' => 'like-' . $like->id,
                'type' => 'like',
                'user' => $like->user ? ['name' => $like->user->name] : null,
                'description' => "a aimé \"{$sound->title}\"",
                'created_at' => $like->created_at->toISOString(),
            ]));

        $recentComments = $user->sounds()
            ->with(['comments.user'])
            ->whereHas('comments', fn ($q) => $q->where('created_at', '>=', now()->subDays(30)))
            ->get()
            ->flatMap(fn ($sound) => $sound->comments->map(fn ($comment) => [
                'id' => 'comment-' . $comment->id,
                'type' => 'comment',
                'user' => $comment->user ? ['name' => $comment->user->name] : null,
                'description' => "a commenté \"{$sound->title}\"",
                'created_at' => $comment->created_at->toISOString(),
            ]));

        $recentFollows = $user->followers()
            ->where('follows.created_at', '>=', now()->subDays(30))
            ->get()
            ->map(fn ($follower) => [
                'id' => 'follow-' . $follower->pivot->created_at->timestamp,
                'type' => 'follow',
                'user' => ['name' => $follower->name],
                'description' => 's\'est abonné à votre profil',
                'created_at' => $follower->pivot->created_at->toISOString(),
            ]);

        $activities = $recentLikes
            ->merge($recentComments)
            ->merge($recentFollows)
            ->sortByDesc('created_at')
            ->take(6)
            ->values()
            ->toArray();

        return $activities;
    }
}

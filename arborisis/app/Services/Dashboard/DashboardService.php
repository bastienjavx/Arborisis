<?php

declare(strict_types=1);

namespace App\Services\Dashboard;

use App\Models\Quest;
use App\Models\User;
use App\Services\Echo\WalletService;
use App\Services\Gamification\XpService;

class DashboardService
{
    public function __construct(
        private readonly WalletService $walletService,
        private readonly XpService $xpService,
    ) {}

    public function getStats(User $user): array
    {
        return [
            'totalSounds' => $user->sounds()->count(),
            'totalPlays' => (int) ($user->sounds()->sum('play_count') ?? 0),
            'totalLikes' => (int) ($user->sounds()->sum('like_count') ?? 0),
            'totalFollowers' => $user->followers()->count(),
        ];
    }

    public function getRecentSounds(User $user): array
    {
        return $user->sounds()
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
            ])
            ->toArray();
    }

    public function getActivities(User $user): array
    {
        $activities = [];

        $recentLikes = $user->sounds()
            ->with(['likes.user'])
            ->whereHas('likes', fn ($q) => $q->where('created_at', '>=', now()->subDays(30)))
            ->get()
            ->flatMap(fn ($sound) => $sound->likes->map(fn ($like) => [
                'id' => 'like-'.$like->id,
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
                'id' => 'comment-'.$comment->id,
                'type' => 'comment',
                'user' => $comment->user ? ['name' => $comment->user->name] : null,
                'description' => "a commenté \"{$sound->title}\"",
                'created_at' => $comment->created_at->toISOString(),
            ]));

        $recentFollows = $user->followers()
            ->where('follows.created_at', '>=', now()->subDays(30))
            ->get()
            ->map(fn ($follower) => [
                'id' => 'follow-'.$follower->pivot->created_at->timestamp,
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

    public function getGamificationData(User $user): array
    {
        $xpForNext = $this->xpService->xpForNextLevel($user->level);
        $xpForCurrent = $this->xpService->xpForNextLevel($user->level - 1);
        $xpProgress = $user->xp_total - $xpForCurrent;
        $xpNeeded = $xpForNext - $xpForCurrent;

        $activeQuests = $user->questProgress()
            ->with('quest')
            ->whereIn('status', ['in_progress', 'completed'])
            ->latest('updated_at')
            ->limit(3)
            ->get()
            ->map(fn ($progress) => [
                'id' => $progress->id,
                'quest_id' => $progress->quest_id,
                'title' => $progress->quest->title,
                'description' => $progress->quest->description,
                'current_progress' => $progress->current_progress,
                'target_progress' => $progress->target_progress,
                'progress_percentage' => $progress->progressPercentage(),
                'status' => $progress->status->value,
                'reward_xp' => $progress->quest->reward_xp,
                'is_repeatable' => $progress->quest->is_repeatable,
            ])
            ->toArray();

        // If user has fewer than 3 active quests, suggest available ones
        if (count($activeQuests) < 3) {
            $existingQuestIds = array_column($activeQuests, 'quest_id');
            $suggestedQuests = Quest::active()
                ->whereNotIn('id', function ($query) use ($user) {
                    $query->select('quest_id')
                        ->from('quest_progress')
                        ->where('user_id', $user->id)
                        ->whereIn('status', ['in_progress', 'completed', 'claimed']);
                })
                ->limit(3 - count($activeQuests))
                ->get()
                ->map(fn ($quest) => [
                    'id' => null,
                    'title' => $quest->title,
                    'description' => $quest->description,
                    'current_progress' => 0,
                    'target_progress' => $quest->objective_target,
                    'progress_percentage' => 0,
                    'status' => 'available',
                    'reward_xp' => $quest->reward_xp,
                    'is_repeatable' => $quest->is_repeatable,
                ])
                ->toArray();

            $activeQuests = array_merge($activeQuests, $suggestedQuests);
        }

        $recentAchievements = $user->achievements()
            ->latest('user_achievements.unlocked_at')
            ->limit(4)
            ->get()
            ->map(fn ($achievement) => [
                'id' => $achievement->id,
                'title' => $achievement->title,
                'description' => $achievement->description,
                'icon' => $achievement->icon,
                'category' => $achievement->category?->value,
                'points' => $achievement->points,
                'unlocked_at' => $achievement->pivot->unlocked_at instanceof \Carbon\Carbon
                    ? $achievement->pivot->unlocked_at->toISOString()
                    : ($achievement->pivot->unlocked_at ? \Carbon\Carbon::parse($achievement->pivot->unlocked_at)->toISOString() : null),
            ])
            ->toArray();

        $recentMedals = $user->medals()
            ->latest('user_medals.unlocked_at')
            ->limit(4)
            ->get()
            ->map(fn ($medal) => [
                'id' => $medal->id,
                'name' => $medal->name,
                'description' => $medal->description,
                'icon' => $medal->icon,
                'rarity' => $medal->rarity?->value,
                'category' => $medal->category?->value,
                'unlocked_at' => $medal->pivot->unlocked_at instanceof \Carbon\Carbon
                    ? $medal->pivot->unlocked_at->toISOString()
                    : ($medal->pivot->unlocked_at ? \Carbon\Carbon::parse($medal->pivot->unlocked_at)->toISOString() : null),
            ])
            ->toArray();

        return [
            'level' => $user->level,
            'xp_total' => $user->xp_total,
            'xp_for_next_level' => $xpForNext,
            'xp_progress' => $xpProgress,
            'xp_needed' => $xpNeeded,
            'progress_percentage' => min(100, (int) round(($xpProgress / max($xpNeeded, 1)) * 100)),
            'current_streak' => $user->current_streak,
            'longest_streak' => $user->longest_streak,
            'quests' => $activeQuests,
            'achievements' => $recentAchievements,
            'medals' => $recentMedals,
            'quests_completed' => $user->questProgress()->where(function ($q) {
                $q->where('status', 'completed')->orWhere('status', 'claimed');
            })->count(),
            'achievements_unlocked' => $user->achievements()->count(),
            'medals_unlocked' => $user->medals()->count(),
        ];
    }
}

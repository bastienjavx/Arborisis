<?php

declare(strict_types=1);

namespace App\Services\Dashboard;

use App\Enums\QuestType;
use App\Enums\SoundIdeaStatus;
use App\Models\DailySoundIdea;
use App\Models\Quest;
use App\Models\User;
use App\Models\UserSoundIdeaProgress;
use App\Services\Echo\WalletService;
use App\Services\Gamification\QuestService;
use App\Services\Gamification\XpService;

class DashboardService
{
    public function __construct(
        private readonly WalletService $walletService,
        private readonly XpService $xpService,
        private readonly QuestService $questService,
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

        $activeProgress = $user->questProgress()
            ->with('quest')
            ->whereHas('quest', fn ($q) => $q->active())
            ->whereIn('status', ['in_progress', 'completed'])
            ->latest('updated_at')
            ->get();

        $startedQuestIds = $activeProgress->pluck('quest_id')->all();

        $suggestedQuests = Quest::active()
            ->whereNotIn('id', function ($query) use ($user) {
                $query->select('quest_id')
                    ->from('quest_progress')
                    ->where('user_id', $user->id)
                    ->whereIn('status', ['in_progress', 'completed', 'claimed']);
            })
            ->get()
            ->map(function ($quest) use ($user) {
                // Auto-start daily quests automatically
                if ($quest->type === QuestType::Daily) {
                    $progress = $this->questService->startQuest($user, $quest);

                    return [
                        'id' => $progress->id,
                        'quest_id' => $quest->id,
                        'title' => $quest->title,
                        'description' => $quest->description,
                        'current_progress' => $progress->current_progress,
                        'target_progress' => $progress->target_progress,
                        'progress_percentage' => $progress->progressPercentage(),
                        'status' => $progress->status->value,
                        'reward_xp' => $quest->reward_xp,
                        'is_repeatable' => $quest->is_repeatable,
                        'type' => $quest->type->value,
                    ];
                }

                return [
                    'id' => null,
                    'quest_id' => $quest->id,
                    'title' => $quest->title,
                    'description' => $quest->description,
                    'current_progress' => 0,
                    'target_progress' => $quest->objective_target,
                    'progress_percentage' => 0,
                    'status' => 'available',
                    'reward_xp' => $quest->reward_xp,
                    'is_repeatable' => $quest->is_repeatable,
                    'type' => $quest->type->value,
                ];
            });

        $progressItems = $activeProgress->map(fn ($progress) => [
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
            'type' => $progress->quest->type->value,
        ]);

        // Priorité : daily disponibles > daily en cours > autres en cours > daily complétées > autres complétées
        $activeQuests = collect()
            ->merge($suggestedQuests->filter(fn ($q) => $q['type'] === QuestType::Daily->value))
            ->merge($progressItems->filter(fn ($q) => $q['type'] === QuestType::Daily->value && $q['status'] === 'in_progress'))
            ->merge($progressItems->filter(fn ($q) => $q['status'] === 'in_progress'))
            ->merge($progressItems->filter(fn ($q) => $q['type'] === QuestType::Daily->value && $q['status'] === 'completed'))
            ->merge($progressItems->filter(fn ($q) => $q['status'] === 'completed'))
            ->merge($suggestedQuests->filter(fn ($q) => $q['type'] !== QuestType::Daily->value))
            ->unique('quest_id')
            ->take(3)
            ->values()
            ->toArray();

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

    public function getDailySoundIdeas(User $user): array
    {
        $ideas = DailySoundIdea::today()
            ->orderBy('id')
            ->get();

        if ($ideas->isEmpty()) {
            return [
                'ideas' => [],
                'theme' => null,
                'completed_count' => 0,
                'total_count' => 0,
            ];
        }

        $progress = UserSoundIdeaProgress::where('user_id', $user->id)
            ->whereIn('daily_sound_idea_id', $ideas->pluck('id'))
            ->get()
            ->keyBy('daily_sound_idea_id');

        $mappedIdeas = $ideas->map(fn (DailySoundIdea $idea) => [
            'id' => $idea->id,
            'title' => $idea->title,
            'description' => $idea->description,
            'difficulty' => $idea->difficulty,
            'tags' => $idea->tags ?? [],
            'season_context' => $idea->season_context,
            'weather_context' => $idea->weather_context,
            'time_of_day' => $idea->time_of_day,
            'status' => $progress->has($idea->id) ? $progress[$idea->id]->status->value : SoundIdeaStatus::Pending->value,
        ])->toArray();

        $completedCount = $progress->where('status', SoundIdeaStatus::Completed)->count();

        return [
            'ideas' => $mappedIdeas,
            'theme' => $ideas->first()->theme,
            'completed_count' => $completedCount,
            'total_count' => $ideas->count(),
        ];
    }
}

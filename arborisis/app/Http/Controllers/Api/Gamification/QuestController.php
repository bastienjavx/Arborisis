<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\Gamification;

use App\Enums\QuestStatus;
use App\Http\Controllers\Controller;
use App\Models\Quest;
use App\Models\QuestProgress;
use App\Services\Gamification\QuestService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class QuestController extends Controller
{
    public function __construct(
        private readonly QuestService $questService,
    ) {
    }

    public function index(Request $request): JsonResponse
    {
        $quests = Quest::active()
            ->with(['rewardMedal:id,name,icon', 'rewardAchievement:id,title,icon'])
            ->get();

        return response()->json($quests);
    }

    public function show(Request $request, Quest $quest): JsonResponse
    {
        return response()->json(
            $quest->load(['rewardMedal:id,name,icon', 'rewardAchievement:id,title,icon'])
        );
    }

    public function start(Request $request, Quest $quest): JsonResponse
    {
        $progress = $this->questService->startQuest($request->user(), $quest);

        return response()->json([
            'message' => 'Quête commencée.',
            'progress' => $progress,
        ]);
    }

    public function claim(Request $request, Quest $quest): JsonResponse
    {
        $progress = QuestProgress::where('user_id', $request->user()->id)
            ->where('quest_id', $quest->id)
            ->where('status', QuestStatus::Completed)
            ->firstOrFail();

        $rewards = $this->questService->claimReward($request->user(), $progress);

        return response()->json([
            'message' => 'Récompenses réclamées !',
            'rewards' => $rewards,
        ]);
    }

    public function myQuests(Request $request): JsonResponse
    {
        $progresses = QuestProgress::with('quest')
            ->where('user_id', $request->user()->id)
            ->latest()
            ->get();

        return response()->json($progresses);
    }
}

<?php

declare(strict_types=1);

namespace App\Jobs;

use App\Enums\ObjectiveType;
use App\Enums\QuestType;
use App\Models\Quest;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class GenerateDailyQuests implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function handle(): void
    {
        // Deactivate old daily quests
        Quest::where('type', QuestType::Daily)
            ->where('ends_at', '<', now())
            ->update(['is_active' => false]);

        // Create new daily quest if none exists for today
        $existingToday = Quest::where('type', QuestType::Daily)
            ->whereDate('starts_at', today())
            ->exists();

        if ($existingToday) {
            return;
        }

        $dailyQuests = [
            [
                'title' => 'Première exploration',
                'description' => 'Visiter 1 point Arborisis validé aujourd\'hui.',
                'objective_type' => ObjectiveType::VisitPoints,
                'objective_target' => 1,
                'reward_xp' => 15,
            ],
            [
                'title' => 'Oreille attentive',
                'description' => 'Visiter 3 points différents aujourd\'hui.',
                'objective_type' => ObjectiveType::VisitPoints,
                'objective_target' => 3,
                'reward_xp' => 30,
            ],
        ];

        $selected = $dailyQuests[array_rand($dailyQuests)];

        Quest::create([
            ...$selected,
            'type' => QuestType::Daily,
            'category' => 'daily',
            'starts_at' => now(),
            'ends_at' => now()->endOfDay(),
            'is_repeatable' => false,
            'is_active' => true,
        ]);
    }
}

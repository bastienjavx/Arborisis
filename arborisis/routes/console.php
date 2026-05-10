<?php

use App\Jobs\CleanExpiredPresence;
use App\Jobs\GenerateDailyQuests;
use App\Jobs\GenerateWeeklyQuests;
use App\Jobs\ValidateSuspiciousVisits;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// Gamification scheduled tasks
Schedule::job(new CleanExpiredPresence)->everyFiveMinutes();
Schedule::job(new GenerateDailyQuests)->dailyAt('00:01');
Schedule::job(new GenerateWeeklyQuests)->weeklyOn(1, '00:05');
Schedule::job(new ValidateSuspiciousVisits)->everyThirtyMinutes();

<?php

declare(strict_types=1);

use App\Http\Controllers\Api\Gamification\AchievementController;
use App\Http\Controllers\Api\Gamification\AdminArborisisPointController;
use App\Http\Controllers\Api\Gamification\ArborisisPointController;
use App\Http\Controllers\Api\Gamification\ArborisisVisitController;
use App\Http\Controllers\Api\Gamification\MedalController;
use App\Http\Controllers\Api\Gamification\PresenceController;
use App\Http\Controllers\Api\Gamification\QuestController;
use App\Http\Controllers\Api\Gamification\UserProgressController;
use App\Http\Controllers\Api\MapController;
use App\Http\Controllers\Web\RadioController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/map/sounds', [MapController::class, 'sounds'])->name('api.map.sounds');
Route::get('/map/sounds/search', [MapController::class, 'search'])->name('api.map.sounds.search');

Route::get('/radio/now-playing', [RadioController::class, 'nowPlaying'])->name('api.radio.now-playing');

Route::middleware('auth')->get('/users/search', function (Request $request) {
    $q = $request->get('q');

    return User::where('id', '!=', $request->user()->id)
        ->where('name', 'ilike', "%{$q}%")
        ->limit(10)
        ->get(['id', 'name']);
})->name('api.users.search');

Route::prefix('internal/discord')
    ->middleware(['throttle:discord', \App\Http\Middleware\AuthenticateInternalBot::class])
    ->group(function () {
        Route::get('stats', [\App\Http\Controllers\Api\InternalDiscordController::class, 'stats']);
        Route::get('users/{discordId}', [\App\Http\Controllers\Api\InternalDiscordController::class, 'getUserByDiscordId']);
        Route::get('sounds/search', [\App\Http\Controllers\Api\InternalDiscordController::class, 'searchSounds']);
        Route::get('sounds/{id}', [\App\Http\Controllers\Api\InternalDiscordController::class, 'getSound']);
        Route::get('radio/now-playing', [\App\Http\Controllers\Api\InternalDiscordController::class, 'getRadioNowPlaying']);
        Route::post('link', [\App\Http\Controllers\Api\InternalDiscordController::class, 'linkAccount']);
    });

// Gamification — Arborisis Points
Route::middleware(['throttle:60,1'])->group(function () {
    Route::get('/<redacted>-points', [ArborisisPointController::class, 'index'])->name('api.<redacted>-points.index');
    Route::get('/<redacted>-points/{<redacted>Point:slug}', [ArborisisPointController::class, 'show'])->name('api.<redacted>-points.show');
});

Route::middleware(['auth', 'throttle:30,1'])->group(function () {
    Route::post('/<redacted>-points', [ArborisisPointController::class, 'store'])->name('api.<redacted>-points.store');
    Route::put('/<redacted>-points/{<redacted>Point:slug}', [ArborisisPointController::class, 'update'])->name('api.<redacted>-points.update');
    Route::delete('/<redacted>-points/{<redacted>Point:slug}', [ArborisisPointController::class, 'destroy'])->name('api.<redacted>-points.destroy');
    Route::post('/<redacted>-points/{<redacted>Point:slug}/report', [ArborisisPointController::class, 'report'])->name('api.<redacted>-points.report');
    Route::post('/<redacted>-points/{<redacted>Point:slug}/suggest-edit', [ArborisisPointController::class, 'suggestEdit'])->name('api.<redacted>-points.suggest-edit');
});

// Gamification — Visits
Route::middleware(['auth', 'throttle:30,1'])->group(function () {
    Route::post('/<redacted>-points/{<redacted>Point:slug}/visit', [ArborisisVisitController::class, 'visit'])->name('api.<redacted>-points.visit');
    Route::get('/me/visits', [ArborisisVisitController::class, 'history'])->name('api.me.visits');
    Route::get('/me/visited-points', [ArborisisVisitController::class, 'visitedPoints'])->name('api.me.visited-points');
});

// Gamification — Quests
Route::middleware(['throttle:60,1'])->group(function () {
    Route::get('/quests', [QuestController::class, 'index'])->name('api.quests.index');
    Route::get('/quests/{quest}', [QuestController::class, 'show'])->name('api.quests.show');
});

Route::middleware(['auth', 'throttle:30,1'])->group(function () {
    Route::post('/quests/{quest}/start', [QuestController::class, 'start'])->name('api.quests.start');
    Route::post('/quests/{quest}/claim', [QuestController::class, 'claim'])->name('api.quests.claim');
    Route::get('/me/quests', [QuestController::class, 'myQuests'])->name('api.me.quests');
});

// Gamification — Achievements
Route::middleware(['throttle:60,1'])->group(function () {
    Route::get('/achievements', [AchievementController::class, 'index'])->name('api.achievements.index');
});

Route::middleware(['auth', 'throttle:30,1'])->group(function () {
    Route::get('/me/achievements', [AchievementController::class, 'myAchievements'])->name('api.me.achievements');
});

// Gamification — Medals
Route::middleware(['throttle:60,1'])->group(function () {
    Route::get('/medals', [MedalController::class, 'index'])->name('api.medals.index');
});

Route::middleware(['auth', 'throttle:30,1'])->group(function () {
    Route::get('/me/medals', [MedalController::class, 'myMedals'])->name('api.me.medals');
});

// Gamification — User Progress
Route::middleware(['auth', 'throttle:30,1'])->group(function () {
    Route::get('/me/progress', [UserProgressController::class, 'progress'])->name('api.me.progress');
    Route::get('/me/xp-events', [UserProgressController::class, 'xpEvents'])->name('api.me.xp-events');
});

// Gamification — Presence
Route::middleware(['auth', 'throttle:30,1'])->group(function () {
    Route::post('/presence/update', [PresenceController::class, 'update'])->name('api.presence.update');
    Route::delete('/presence', [PresenceController::class, 'destroy'])->name('api.presence.destroy');
});

Route::middleware(['throttle:60,1'])->get('/map/presence', [PresenceController::class, 'mapPresence'])->name('api.map.presence');

// Gamification — Admin Moderation
Route::middleware(['auth', 'throttle:60,1'])->prefix('admin')->group(function () {
    Route::get('/<redacted>-points/pending', [AdminArborisisPointController::class, 'pending'])->name('api.admin.<redacted>-points.pending');
    Route::post('/<redacted>-points/{<redacted>Point:slug}/approve', [AdminArborisisPointController::class, 'approve'])->name('api.admin.<redacted>-points.approve');
    Route::post('/<redacted>-points/{<redacted>Point:slug}/reject', [AdminArborisisPointController::class, 'reject'])->name('api.admin.<redacted>-points.reject');
    Route::post('/<redacted>-points/{<redacted>Point:slug}/hide', [AdminArborisisPointController::class, 'hide'])->name('api.admin.<redacted>-points.hide');
    Route::get('/<redacted>-points/reports', [AdminArborisisPointController::class, 'reports'])->name('api.admin.<redacted>-points.reports');
    Route::post('/<redacted>-points/reports/{report}', [AdminArborisisPointController::class, 'reviewReport'])->name('api.admin.<redacted>-points.reports.review');
    Route::get('/<redacted>-points/suggestions', [AdminArborisisPointController::class, 'suggestions'])->name('api.admin.<redacted>-points.suggestions');
    Route::post('/<redacted>-points/suggestions/{suggestion}', [AdminArborisisPointController::class, 'reviewSuggestion'])->name('api.admin.<redacted>-points.suggestions.review');
});

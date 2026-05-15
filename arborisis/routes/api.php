<?php

declare(strict_types=1);

use App\Http\Controllers\Api\HealthController;
use App\Http\Controllers\Api\HealthRadioController;
use App\Http\Controllers\Api\Gamification\AchievementController;
use App\Http\Controllers\Api\Gamification\AdminArborisisPointController;
use App\Http\Controllers\Api\Gamification\ArborisisPointController;
use App\Http\Controllers\Api\Gamification\ArborisisVisitController;
use App\Http\Controllers\Api\Gamification\MedalController;
use App\Http\Controllers\Api\Gamification\GroupRecordingEventController;
use App\Http\Controllers\Api\Gamification\NearbyInteractionController;
use App\Http\Controllers\Api\Gamification\PresenceController;
use App\Http\Controllers\Api\Gamification\QuestController;
use App\Http\Controllers\Api\Gamification\UserProgressController;
use App\Http\Controllers\Api\BlogController as ApiBlogController;
use App\Http\Controllers\Api\MapController;
use App\Http\Controllers\Api\SoundIdeas\DailySoundIdeaController;
use App\Http\Controllers\Web\RadioController;
use App\Http\Controllers\RadioInteractionController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/health', HealthController::class)->name('api.health');
Route::get('/health/radio', HealthRadioController::class)->name('api.health.radio');

Route::get('/scientific-stats/global', [\App\Http\Controllers\Api\ScientificStatsController::class, 'globalStats'])->name('api.scientific-stats.global');
Route::get('/scientific-stats/categories', [\App\Http\Controllers\Api\ScientificStatsController::class, 'categories'])->name('api.scientific-stats.categories');
Route::get('/scientific-stats/environments', [\App\Http\Controllers\Api\ScientificStatsController::class, 'environments'])->name('api.scientific-stats.environments');
Route::get('/scientific-stats/temporal', [\App\Http\Controllers\Api\ScientificStatsController::class, 'temporal'])->name('api.scientific-stats.temporal');
Route::get('/scientific-stats/geo-heatmap', [\App\Http\Controllers\Api\ScientificStatsController::class, 'geoHeatmap'])->name('api.scientific-stats.geo-heatmap');
Route::get('/scientific-stats/audio-features', [\App\Http\Controllers\Api\ScientificStatsController::class, 'audioFeatures'])->name('api.scientific-stats.audio-features');
Route::get('/scientific-stats/top-locations', [\App\Http\Controllers\Api\ScientificStatsController::class, 'topLocations'])->name('api.scientific-stats.top-locations');
Route::get('/scientific-stats/equipment', [\App\Http\Controllers\Api\ScientificStatsController::class, 'equipment'])->name('api.scientific-stats.equipment');
Route::get('/scientific-stats/raw-data', [\App\Http\Controllers\Api\ScientificStatsController::class, 'rawData'])->name('api.scientific-stats.raw-data');

Route::get('/map/sounds', [MapController::class, 'sounds'])->name('api.map.sounds');
Route::get('/map/sounds/search', [MapController::class, 'search'])->name('api.map.sounds.search');

Route::get('/sounds/featured', [\App\Http\Controllers\Api\FeaturedController::class, 'sounds'])->name('api.sounds.featured');
Route::get('/creators/featured', [\App\Http\Controllers\Api\FeaturedController::class, 'creators'])->name('api.creators.featured');

Route::get('/blog', [ApiBlogController::class, 'index'])->name('api.blog.index');
Route::get('/blog/{slug}', [ApiBlogController::class, 'show'])->name('api.blog.show');

Route::get('/radio/now-playing', [RadioController::class, 'nowPlaying'])->name('api.radio.now-playing');
Route::get('/radio/programme', [RadioController::class, 'programme'])->name('api.radio.programme');
Route::get('/radio/channels', [RadioController::class, 'channels'])->name('api.radio.channels');
Route::prefix('radio/interactions')->middleware('throttle:60,1')->group(function () {
    Route::post('like', [RadioInteractionController::class, 'like'])->name('api.radio.interactions.like');
    Route::post('react', [RadioInteractionController::class, 'react'])->name('api.radio.interactions.react');
    Route::post('share', [RadioInteractionController::class, 'share'])->name('api.radio.interactions.share');
});

Route::prefix('internal/radio')
    ->middleware([\App\Http\Middleware\VerifyRadioInternalToken::class])
    ->group(function () {
        Route::get('playlist', [\App\Http\Controllers\Api\InternalRadioController::class, 'playlist']);
        Route::get('playlist.m3u', [\App\Http\Controllers\Api\InternalRadioController::class, 'playlistM3u']);
        Route::match(['get', 'post'], 'now-playing', [\App\Http\Controllers\Api\InternalRadioController::class, 'nowPlaying']);
        Route::get('status', [\App\Http\Controllers\Api\InternalRadioController::class, 'status']);
        Route::post('actions/reload', [\App\Http\Controllers\Api\InternalRadioController::class, 'reload']);
    });

Route::middleware(['web', 'auth'])->get('/users/search', function (Request $request) {
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
    Route::get('/arborisis-points', [ArborisisPointController::class, 'index'])->name('api.arborisis-points.index');
    Route::get('/arborisis-points/{arborisisPoint:slug}', [ArborisisPointController::class, 'show'])->name('api.arborisis-points.show');
});

Route::middleware(['web', 'auth', 'throttle:30,1'])->group(function () {
    Route::post('/arborisis-points', [ArborisisPointController::class, 'store'])->name('api.arborisis-points.store');
    Route::put('/arborisis-points/{arborisisPoint:slug}', [ArborisisPointController::class, 'update'])->name('api.arborisis-points.update');
    Route::delete('/arborisis-points/{arborisisPoint:slug}', [ArborisisPointController::class, 'destroy'])->name('api.arborisis-points.destroy');
    Route::post('/arborisis-points/{arborisisPoint:slug}/report', [ArborisisPointController::class, 'report'])->name('api.arborisis-points.report');
    Route::post('/arborisis-points/{arborisisPoint:slug}/suggest-edit', [ArborisisPointController::class, 'suggestEdit'])->name('api.arborisis-points.suggest-edit');
});

// Gamification — Visits
Route::middleware(['web', 'auth', 'throttle:30,1'])->group(function () {
    Route::post('/arborisis-points/{arborisisPoint:slug}/visit', [ArborisisVisitController::class, 'visit'])->name('api.arborisis-points.visit');
    Route::get('/me/visits', [ArborisisVisitController::class, 'history'])->name('api.me.visits');
    Route::get('/me/visited-points', [ArborisisVisitController::class, 'visitedPoints'])->name('api.me.visited-points');
});

// Gamification — Quests
Route::middleware(['throttle:60,1'])->group(function () {
    Route::get('/quests', [QuestController::class, 'index'])->name('api.quests.index');
    Route::get('/quests/daily-theme', [QuestController::class, 'dailyTheme'])->name('api.quests.daily-theme');
    Route::get('/quests/{quest}', [QuestController::class, 'show'])->name('api.quests.show');
});

Route::middleware(['web', 'auth', 'throttle:30,1'])->group(function () {
    Route::post('/quests/{quest}/start', [QuestController::class, 'start'])->name('api.quests.start');
    Route::post('/quests/{quest}/claim', [QuestController::class, 'claim'])->name('api.quests.claim');
    Route::get('/me/quests', [QuestController::class, 'myQuests'])->name('api.me.quests');
});

// Gamification — Achievements
Route::middleware(['throttle:60,1'])->group(function () {
    Route::get('/achievements', [AchievementController::class, 'index'])->name('api.achievements.index');
});

Route::middleware(['web', 'auth', 'throttle:30,1'])->group(function () {
    Route::get('/me/achievements', [AchievementController::class, 'myAchievements'])->name('api.me.achievements');
});

// Gamification — Medals
Route::middleware(['throttle:60,1'])->group(function () {
    Route::get('/medals', [MedalController::class, 'index'])->name('api.medals.index');
});

Route::middleware(['web', 'auth', 'throttle:30,1'])->group(function () {
    Route::get('/me/medals', [MedalController::class, 'myMedals'])->name('api.me.medals');
});

// Gamification — User Progress
Route::middleware(['web', 'auth', 'throttle:30,1'])->group(function () {
    Route::get('/me/progress', [UserProgressController::class, 'progress'])->name('api.me.progress');
    Route::get('/me/xp-events', [UserProgressController::class, 'xpEvents'])->name('api.me.xp-events');
});

// Gamification — Presence
Route::middleware(['web', 'auth', 'throttle:30,1'])->group(function () {
    Route::post('/presence/update', [PresenceController::class, 'update'])->name('api.presence.update');
    Route::delete('/presence', [PresenceController::class, 'destroy'])->name('api.presence.destroy');
});

Route::middleware(['throttle:60,1'])->get('/map/presence', [PresenceController::class, 'mapPresence'])->name('api.map.presence');

// Gamification — Nearby Interactions
Route::middleware(['web', 'auth', 'throttle:10,1'])->group(function () {
    Route::post('/nearby/greet/{user}', [NearbyInteractionController::class, 'greet'])->name('api.nearby.greet');
    Route::post('/nearby/share-tip', [NearbyInteractionController::class, 'shareTip'])->name('api.nearby.share-tip');
    Route::get('/nearby/history', [NearbyInteractionController::class, 'history'])->name('api.nearby.history');
});

// Gamification — Group Recording Events
Route::middleware(['throttle:60,1'])->group(function () {
    Route::get('/group-events/nearby', [GroupRecordingEventController::class, 'nearby'])->name('api.group-events.nearby');
});

Route::middleware(['web', 'auth', 'throttle:30,1'])->group(function () {
    Route::post('/group-events', [GroupRecordingEventController::class, 'store'])->name('api.group-events.store');
    Route::post('/group-events/{event}/join', [GroupRecordingEventController::class, 'join'])->name('api.group-events.join');
    Route::post('/group-events/{event}/leave', [GroupRecordingEventController::class, 'leave'])->name('api.group-events.leave');
    Route::post('/group-events/{event}/check-in', [GroupRecordingEventController::class, 'checkIn'])->name('api.group-events.check-in');
});

// Audio Analysis — Internal callback
Route::post('/internal/audio-analysis/callback', [\App\Http\Controllers\Api\InternalAudioAnalysisController::class, 'callback'])
    ->name('api.internal.audio-analysis.callback')
    ->middleware(\App\Http\Middleware\VerifyInternalApiToken::class);

// Audio Analysis — Public API
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/sounds/{sound}/analysis', [\App\Http\Controllers\Web\AudioAnalysisController::class, 'showApi'])
        ->name('api.sounds.analysis.show');
    Route::post('/sounds/{sound}/analysis/retry', [\App\Http\Controllers\Web\AudioAnalysisController::class, 'retry'])
        ->name('api.sounds.analysis.retry')
        ->middleware('throttle:5,1');
});

// Gamification — Admin Moderation
Route::middleware(['web', 'auth', 'throttle:60,1'])->prefix('admin')->group(function () {
    Route::get('/arborisis-points/pending', [AdminArborisisPointController::class, 'pending'])->name('api.admin.arborisis-points.pending');
    Route::post('/arborisis-points/{arborisisPoint:slug}/approve', [AdminArborisisPointController::class, 'approve'])->name('api.admin.arborisis-points.approve');
    Route::post('/arborisis-points/{arborisisPoint:slug}/reject', [AdminArborisisPointController::class, 'reject'])->name('api.admin.arborisis-points.reject');
    Route::post('/arborisis-points/{arborisisPoint:slug}/hide', [AdminArborisisPointController::class, 'hide'])->name('api.admin.arborisis-points.hide');
    Route::get('/arborisis-points/reports', [AdminArborisisPointController::class, 'reports'])->name('api.admin.arborisis-points.reports');
    Route::post('/arborisis-points/reports/{report}', [AdminArborisisPointController::class, 'reviewReport'])->name('api.admin.arborisis-points.reports.review');
    Route::get('/arborisis-points/suggestions', [AdminArborisisPointController::class, 'suggestions'])->name('api.admin.arborisis-points.suggestions');
    Route::post('/arborisis-points/suggestions/{suggestion}', [AdminArborisisPointController::class, 'reviewSuggestion'])->name('api.admin.arborisis-points.suggestions.review');
});

// Daily Sound Ideas
Route::middleware(['web', 'auth', 'throttle:60,1'])->group(function () {
    Route::get('/sound-ideas', [DailySoundIdeaController::class, 'index'])->name('api.sound-ideas.index');
    Route::post('/sound-ideas/{idea}/toggle', [DailySoundIdeaController::class, 'toggle'])->name('api.sound-ideas.toggle');
    Route::post('/sound-ideas/{idea}/dismiss', [DailySoundIdeaController::class, 'dismiss'])->name('api.sound-ideas.dismiss');
});

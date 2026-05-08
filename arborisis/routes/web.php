<?php

declare(strict_types=1);

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StripeWebhookController;
use App\Http\Controllers\Web\CommentController;
use App\Http\Controllers\Web\CreatorController;
use App\Http\Controllers\Web\CreatorProfileController;
use App\Http\Controllers\Web\DashboardController;
use App\Http\Controllers\Web\EchoDonationController;
use App\Http\Controllers\Web\FollowController;
use App\Http\Controllers\Web\LandingController;
use App\Http\Controllers\Web\LikeController;
use App\Http\Controllers\Web\MapController;
use App\Http\Controllers\Web\PageController;
use App\Http\Controllers\Web\RadioController;
use App\Http\Controllers\Web\ReportController;
use App\Http\Controllers\Web\AudioAnalysisController;
use App\Http\Controllers\Web\SoundController;
use App\Http\Controllers\Web\WalletController;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Support\Facades\Route;

Route::get('/', [LandingController::class, 'index'])->name('landing');

Route::get('/sounds', [SoundController::class, 'index'])->name('sounds.index');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/sounds/create', [SoundController::class, 'create'])->name('sounds.create');
    Route::post('/sounds', [SoundController::class, 'store'])->name('sounds.store');
});

Route::get('/sounds/{slug}', [SoundController::class, 'show'])->name('sounds.show');

Route::get('/sounds/{sound}/analysis', [AudioAnalysisController::class, 'show'])->name('sounds.analysis.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('/sounds/{sound}/analysis', [AudioAnalysisController::class, 'analyze'])->name('sounds.analysis.store');
    Route::get('/sounds/{sound}/analysis/export/{format}', [AudioAnalysisController::class, 'export'])->name('sounds.analysis.export');
});

Route::get('/api/sounds/{sound}/analysis', [AudioAnalysisController::class, 'show'])->name('api.sounds.analysis.show');
Route::get('/api/sounds/{sound}/analysis/realtime', [AudioAnalysisController::class, 'realtimeData'])->name('api.sounds.analysis.realtime');

Route::get('/map', [MapController::class, 'index'])->name('map.index');

Route::get('/creators', [CreatorController::class, 'index'])->name('creators.index');
Route::get('/creators/{slug}', [CreatorProfileController::class, 'show'])->name('creators.show');

Route::get('/transparency', [PageController::class, 'transparency'])->name('transparency');
Route::get('/echo', [PageController::class, 'echoInfo'])->name('echo.info');
Route::get('/mission', [PageController::class, 'mission'])->name('mission');
Route::get('/charte', [PageController::class, 'charte'])->name('charte');
Route::get('/offline', [PageController::class, 'offline'])->name('offline');

Route::get('/radio', [RadioController::class, 'index'])->name('radio.index');
Route::get('/radio/stream', [RadioController::class, 'stream'])
    ->name('radio.stream')
    ->withoutMiddleware([
        \App\Http\Middleware\HandleInertiaRequests::class,
        \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
    ]);
Route::get('/radio/stream.m3u', [RadioController::class, 'playlist'])->name('radio.playlist');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Social
    Route::post('/sounds/{sound}/likes', [LikeController::class, 'store'])->name('likes.store');
    Route::delete('/sounds/{sound}/likes', [LikeController::class, 'destroy'])->name('likes.destroy');

    Route::post('/sounds/{sound}/comments', [CommentController::class, 'store'])->name('comments.store');
    Route::delete('/comments/{comment}', [CommentController::class, 'destroy'])->name('comments.destroy');

    Route::post('/users/{user}/follows', [FollowController::class, 'store'])->name('follows.store');
    Route::delete('/users/{user}/follows', [FollowController::class, 'destroy'])->name('follows.destroy');

    Route::post('/reports', [ReportController::class, 'store'])->name('reports.store');

    // ECHO Wallet
    Route::get('/wallet', [WalletController::class, 'show'])->name('wallet.show');
    Route::post('/wallet/checkout', [WalletController::class, 'checkout'])->name('wallet.checkout');
    Route::get('/wallet/success', [WalletController::class, 'success'])->name('wallet.success');
    Route::get('/wallet/cancel', [WalletController::class, 'cancel'])->name('wallet.cancel');

    // ECHO Donations
    Route::post('/donations', [EchoDonationController::class, 'store'])->name('donations.store');
    Route::get('/donations/history', [EchoDonationController::class, 'history'])->name('donations.history');
});

// Stripe Webhook (no auth, signed by Stripe)
Route::post('/webhooks/stripe', StripeWebhookController::class)
    ->name('webhooks.stripe')
    ->withoutMiddleware([
        VerifyCsrfToken::class,
    ]);

require __DIR__.'/auth.php';

<?php

use App\Http\Controllers\Web\CommentController;
use App\Http\Controllers\Web\CreatorProfileController;
use App\Http\Controllers\Web\FollowController;
use App\Http\Controllers\Web\LandingController;
use App\Http\Controllers\Web\LikeController;
use App\Http\Controllers\Web\ReportController;
use App\Http\Controllers\Web\SoundController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [LandingController::class, 'index'])->name('landing');

Route::get('/sounds', [SoundController::class, 'index'])->name('sounds.index');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/sounds/create', [SoundController::class, 'create'])->name('sounds.create');
    Route::post('/sounds', [SoundController::class, 'store'])->name('sounds.store');
});

Route::get('/sounds/{slug}', [SoundController::class, 'show'])->name('sounds.show');

Route::get('/map', [\App\Http\Controllers\Web\MapController::class, 'index'])->name('map.index');

Route::get('/creators/{slug}', [CreatorProfileController::class, 'show'])->name('creators.show');

Route::get('/transparency', function () {
    return Inertia::render('Transparency');
})->name('transparency');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

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
    Route::get('/wallet', [\App\Http\Controllers\Web\WalletController::class, 'show'])->name('wallet.show');
    Route::post('/wallet/checkout', [\App\Http\Controllers\Web\WalletController::class, 'checkout'])->name('wallet.checkout');
    Route::get('/wallet/success', [\App\Http\Controllers\Web\WalletController::class, 'success'])->name('wallet.success');
    Route::get('/wallet/cancel', [\App\Http\Controllers\Web\WalletController::class, 'cancel'])->name('wallet.cancel');

    // ECHO Donations
    Route::post('/donations', [\App\Http\Controllers\Web\EchoDonationController::class, 'store'])->name('donations.store');
    Route::get('/donations/history', [\App\Http\Controllers\Web\EchoDonationController::class, 'history'])->name('donations.history');
});

// Stripe Webhook (no auth, signed by Stripe)
Route::post('/webhooks/stripe', \App\Http\Controllers\StripeWebhookController::class)
    ->name('webhooks.stripe')
    ->withoutMiddleware([
        \Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class,
    ]);

require __DIR__.'/auth.php';

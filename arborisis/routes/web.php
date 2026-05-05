<?php

use App\Http\Controllers\Web\LandingController;
use App\Http\Controllers\Web\SoundController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [LandingController::class, 'index'])->name('landing');

Route::get('/sounds', [SoundController::class, 'index'])->name('sounds.index');
Route::get('/sounds/{slug}', [SoundController::class, 'show'])->name('sounds.show');

Route::get('/map', [\App\Http\Controllers\Web\MapController::class, 'index'])->name('map.index');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/sounds/create', [SoundController::class, 'create'])->name('sounds.create');
    Route::post('/sounds', [SoundController::class, 'store'])->name('sounds.store');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

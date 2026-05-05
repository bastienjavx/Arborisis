<?php

declare(strict_types=1);

use App\Http\Controllers\Api\MapController;
use Illuminate\Support\Facades\Route;

Route::get('/map/sounds', [MapController::class, 'sounds'])->name('api.map.sounds');
Route::get('/map/sounds/search', [MapController::class, 'search'])->name('api.map.sounds.search');

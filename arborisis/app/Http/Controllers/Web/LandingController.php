<?php

declare(strict_types=1);

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Sound;
use App\Models\SoundLocation;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class LandingController extends Controller
{
    public function index(): Response
    {
        $soundsCount = Sound::public()->count();

        $creatorsCount = User::whereHas('sounds', function ($query): void {
            $query->public();
        })->count();

        $countriesCount = SoundLocation::whereHas('sound', function ($query): void {
            $query->public();
        })
            ->whereNotNull('location_name')
            ->distinct()
            ->count('location_name');

        return Inertia::render('Landing', [
            'stats' => [
                'sounds' => $soundsCount,
                'creators' => $creatorsCount,
                'countries' => $countriesCount,
            ],
        ]);
    }
}

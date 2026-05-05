<?php

declare(strict_types=1);

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class LandingController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Landing', [
            'stats' => [
                'sounds' => 0,
                'creators' => 0,
                'countries' => 0,
            ],
        ]);
    }
}

<?php

declare(strict_types=1);

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\Social\FollowService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FollowController extends Controller
{
    public function __construct(
        private readonly FollowService $followService
    ) {}

    public function store(Request $request, User $user): JsonResponse
    {
        $result = $this->followService->toggle($request->user(), $user);

        return response()->json($result);
    }

    public function destroy(Request $request, User $user): JsonResponse
    {
        $result = $this->followService->toggle($request->user(), $user);

        return response()->json($result);
    }
}

<?php

declare(strict_types=1);

namespace App\Services\Social;

use App\Models\Like;
use App\Models\Sound;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class LikeService
{
    public function toggle(User $user, Sound $sound): array
    {
        return DB::transaction(function () use ($user, $sound) {
            $existing = Like::where('user_id', $user->id)
                ->where('sound_id', $sound->id)
                ->first();

            if ($existing) {
                $existing->delete();
                $sound->decrement('like_count');
                $liked = false;
            } else {
                Like::create([
                    'user_id' => $user->id,
                    'sound_id' => $sound->id,
                ]);
                $sound->increment('like_count');
                $liked = true;
            }

            return ['liked' => $liked, 'count' => $sound->fresh()->like_count];
        });
    }
}

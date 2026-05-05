<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\EchoTransaction;
use App\Models\User;

class EchoTransactionPolicy
{
    public function view(User $user, EchoTransaction $transaction): bool
    {
        return $user->id === $transaction->user_id;
    }

    public function create(User $user): bool
    {
        return true;
    }
}

<?php

declare(strict_types=1);

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Services\Echo\StripeCheckoutService;
use App\Services\Echo\WalletService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class WalletController extends Controller
{
    public function __construct(
        private readonly WalletService $walletService,
        private readonly StripeCheckoutService $stripeService
    ) {}

    public function show(Request $request): Response
    {
        $user = $request->user();
        $balance = $this->walletService->getBalance($user);

        $transactions = $user->echoTransactions()
            ->with('relatedTransaction')
            ->latest()
            ->paginate(20);

        return Inertia::render('Wallet/Show', [
            'balance' => $balance,
            'transactions' => $transactions,
        ]);
    }

    public function checkout(Request $request): RedirectResponse
    {
        $request->validate([
            'amount' => ['required', 'numeric', 'min:1', 'max:500'],
        ]);

        $user = $request->user();
        $amount = (float) $request->input('amount');

        $session = $this->stripeService->createSession(
            $user,
            $amount,
            route('wallet.success', [], true),
            route('wallet.cancel', [], true)
        );

        return redirect($session->url);
    }

    public function success(Request $request): Response
    {
        return Inertia::render('Wallet/Success');
    }

    public function cancel(Request $request): Response
    {
        return Inertia::render('Wallet/Cancel');
    }
}

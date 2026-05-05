<?php

declare(strict_types=1);

namespace App\Services\Echo;

use App\Enums\TransactionStatus;
use App\Enums\TransactionType;
use App\Models\EchoTransaction;
use App\Models\User;
use Stripe\Checkout\Session;
use Stripe\PaymentIntent;
use Stripe\Stripe;
use Stripe\Webhook;

class StripeCheckoutService
{
    public function __construct()
    {
        Stripe::setApiKey(config('services.stripe.secret_key'));
    }

    public function createSession(User $user, float $amount, string $successUrl, string $cancelUrl): Session
    {
        $echoAmount = $this->calculateEchoAmount($amount);

        $transaction = EchoTransaction::create([
            'user_id' => $user->id,
            'type' => TransactionType::Purchase,
            'status' => TransactionStatus::Pending,
            'amount' => $amount,
            'currency' => 'EUR',
            'echo_amount' => $echoAmount,
            'metadata' => [
                'user_email' => $user->email,
                'user_name' => $user->name,
            ],
        ]);

        $session = Session::create([
            'payment_method_types' => ['card'],
            'line_items' => [
                [
                    'price_data' => [
                        'currency' => 'eur',
                        'product_data' => [
                            'name' => 'Crédits ECHO',
                            'description' => sprintf('%.2f ECHO', $echoAmount),
                        ],
                        'unit_amount' => (int) ($amount * 100),
                    ],
                    'quantity' => 1,
                ],
            ],
            'mode' => 'payment',
            'success_url' => $successUrl,
            'cancel_url' => $cancelUrl,
            'client_reference_id' => (string) $transaction->id,
            'customer_email' => $user->email,
            'metadata' => [
                'transaction_id' => (string) $transaction->id,
                'user_id' => (string) $user->id,
            ],
        ]);

        $transaction->update([
            'stripe_checkout_session_id' => $session->id,
        ]);

        return $session;
    }

    public function handleWebhook(string $payload, string $sigHeader): void
    {
        $event = Webhook::constructEvent(
            $payload,
            $sigHeader,
            config('services.stripe.webhook_secret')
        );

        match ($event->type) {
            'checkout.session.completed' => $this->handleCheckoutSessionCompleted($event->data->object),
            'checkout.session.expired' => $this->handleCheckoutSessionExpired($event->data->object),
            'payment_intent.payment_failed' => $this->handlePaymentFailed($event->data->object),
            default => null,
        };
    }

    private function handleCheckoutSessionCompleted(Session $session): void
    {
        $transaction = EchoTransaction::where('stripe_checkout_session_id', $session->id)
            ->where('status', TransactionStatus::Pending)
            ->first();

        if (! $transaction) {
            return;
        }

        $transaction->update([
            'status' => TransactionStatus::Completed,
            'stripe_payment_intent_id' => $session->payment_intent,
            'completed_at' => now(),
        ]);

        $walletService = app(WalletService::class);
        $walletService->credit(
            $transaction->user,
            (float) $transaction->echo_amount,
            'Achat ECHO via Stripe'
        );
    }

    private function handleCheckoutSessionExpired(Session $session): void
    {
        EchoTransaction::where('stripe_checkout_session_id', $session->id)
            ->where('status', TransactionStatus::Pending)
            ->update(['status' => TransactionStatus::Cancelled]);
    }

    private function handlePaymentFailed(PaymentIntent $paymentIntent): void
    {
        EchoTransaction::where('stripe_payment_intent_id', $paymentIntent->id)
            ->where('status', TransactionStatus::Pending)
            ->update(['status' => TransactionStatus::Failed]);
    }

    private function calculateEchoAmount(float $eurAmount): float
    {
        return round($eurAmount * 10, 2);
    }
}

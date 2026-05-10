<?php

declare(strict_types=1);

namespace App\Services\Contact;

use App\Enums\ContactTicketStatus;
use App\Mail\ContactTicketReceived;
use App\Mail\ContactTicketSubmitted;
use App\Models\ContactTicket;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class ContactTicketService
{
    public function generateTicketNumber(): string
    {
        return 'ARB-'.now()->format('Ymd').'-'.strtoupper(Str::random(5));
    }

    public function create(array $data, ?int $userId): ContactTicket
    {
        $ticket = ContactTicket::create([
            'ticket_number' => $this->generateTicketNumber(),
            'type' => $data['type'],
            'name' => $data['name'],
            'email' => $data['email'],
            'subject' => $data['subject'],
            'message' => $data['message'],
            'status' => ContactTicketStatus::New,
            'user_id' => $userId,
        ]);

        $this->sendNotificationEmail($ticket);
        $this->sendReceiptEmail($ticket);

        return $ticket;
    }

    public function sendNotificationEmail(ContactTicket $ticket): void
    {
        $recipient = $ticket->type->recipientEmail();

        Mail::to($recipient)->queue(new ContactTicketSubmitted($ticket));
    }

    public function sendReceiptEmail(ContactTicket $ticket): void
    {
        Mail::to($ticket->email)->queue(new ContactTicketReceived($ticket));
    }
}

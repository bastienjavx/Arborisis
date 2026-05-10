<?php

declare(strict_types=1);

namespace App\Mail;

use App\Models\ContactTicket;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;

class ContactTicketReplied extends Mailable implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public ContactTicket $ticket,
        public string $reply
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "Re: [{$this->ticket->ticket_number}] Votre demande — Réponse de l'équipe",
            replyTo: $this->ticket->email,
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'mail.contact.ticket-replied',
        );
    }
}

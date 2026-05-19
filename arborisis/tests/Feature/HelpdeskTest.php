<?php

declare(strict_types=1);

use App\Enums\ContactTicketCategory;
use App\Enums\ContactTicketPriority;
use App\Enums\ContactTicketStatus;
use App\Enums\ContactTicketType;
use App\Models\ContactTicket;
use App\Models\User;
use Illuminate\Support\Facades\Mail;

beforeEach(function () {
    $this->user = User::factory()->create([
        'email_verified_at' => now(),
    ]);
});

it('displays the helpdesk index with user tickets', function () {
    ContactTicket::create([
        'ticket_number' => 'ARB-20260519-TEST1',
        'type' => ContactTicketType::Support,
        'category' => ContactTicketCategory::Bug,
        'priority' => ContactTicketPriority::High,
        'name' => $this->user->name,
        'email' => $this->user->email,
        'subject' => 'Bug test',
        'message' => 'Description du bug',
        'status' => ContactTicketStatus::New,
        'user_id' => $this->user->id,
    ]);

    $response = $this->actingAs($this->user)->get(route('helpdesk.index'));

    $response->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('Helpdesk/Index')
            ->has('tickets', 1)
            ->where('stats.total', 1)
            ->where('stats.open', 1)
            ->where('stats.resolved', 0)
        );
});

it('creates a new ticket via the helpdesk', function () {
    Mail::fake();

    $response = $this->actingAs($this->user)->post(route('helpdesk.store'), [
        'type' => ContactTicketType::Support->value,
        'category' => ContactTicketCategory::Bug->value,
        'subject' => 'Problème d\'upload',
        'message' => 'Je ne peux pas uploader mon fichier.',
    ]);

    $response->assertRedirect()
        ->sessionHas('success');

    $this->assertDatabaseHas('contact_tickets', [
        'subject' => 'Problème d\'upload',
        'user_id' => $this->user->id,
        'category' => ContactTicketCategory::Bug->value,
        'priority' => ContactTicketPriority::Medium->value,
    ]);
});

it('shows a specific ticket to its owner', function () {
    $ticket = ContactTicket::create([
        'ticket_number' => 'ARB-20260519-TEST2',
        'type' => ContactTicketType::Support,
        'category' => ContactTicketCategory::Account,
        'priority' => ContactTicketPriority::Medium,
        'name' => $this->user->name,
        'email' => $this->user->email,
        'subject' => 'Question compte',
        'message' => 'Comment changer mon mot de passe ?',
        'status' => ContactTicketStatus::New,
        'user_id' => $this->user->id,
    ]);

    $response = $this->actingAs($this->user)->get(route('helpdesk.show', $ticket->ticket_number));

    $response->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('Helpdesk/Show')
            ->where('ticket.ticket_number', $ticket->ticket_number)
            ->where('ticket.subject', 'Question compte')
        );
});

it('allows the owner to reply to an open ticket', function () {
    $ticket = ContactTicket::create([
        'ticket_number' => 'ARB-20260519-TEST3',
        'type' => ContactTicketType::Support,
        'category' => ContactTicketCategory::General,
        'priority' => ContactTicketPriority::Low,
        'name' => $this->user->name,
        'email' => $this->user->email,
        'subject' => 'Question',
        'message' => 'Message initial',
        'status' => ContactTicketStatus::New,
        'user_id' => $this->user->id,
    ]);

    $response = $this->actingAs($this->user)->post(route('helpdesk.reply', $ticket->ticket_number), [
        'message' => 'Merci pour votre réponse rapide.',
    ]);

    $response->assertRedirect()
        ->sessionHas('success');

    $this->assertDatabaseHas('contact_ticket_replies', [
        'contact_ticket_id' => $ticket->id,
        'reply' => 'Merci pour votre réponse rapide.',
        'is_internal' => false,
    ]);

    expect($ticket->fresh()->status)->toBe(ContactTicketStatus::InProgress);
});

it('prevents replying to a resolved ticket', function () {
    $ticket = ContactTicket::create([
        'ticket_number' => 'ARB-20260519-TEST4',
        'type' => ContactTicketType::Support,
        'category' => ContactTicketCategory::General,
        'priority' => ContactTicketPriority::Low,
        'name' => $this->user->name,
        'email' => $this->user->email,
        'subject' => 'Question',
        'message' => 'Message initial',
        'status' => ContactTicketStatus::Resolved,
        'user_id' => $this->user->id,
        'resolved_at' => now(),
    ]);

    $response = $this->actingAs($this->user)->post(route('helpdesk.reply', $ticket->ticket_number), [
        'message' => 'Essai de réponse.',
    ]);

    $response->assertNotFound();
});

it('denies access to another user\'s ticket', function () {
    $otherUser = User::factory()->create();

    $ticket = ContactTicket::create([
        'ticket_number' => 'ARB-20260519-TEST5',
        'type' => ContactTicketType::Support,
        'category' => ContactTicketCategory::General,
        'priority' => ContactTicketPriority::Low,
        'name' => $otherUser->name,
        'email' => $otherUser->email,
        'subject' => 'Question privée',
        'message' => 'Message',
        'status' => ContactTicketStatus::New,
        'user_id' => $otherUser->id,
    ]);

    $response = $this->actingAs($this->user)->get(route('helpdesk.show', $ticket->ticket_number));

    $response->assertNotFound();
});

it('requires authentication for helpdesk routes', function () {
    $this->get(route('helpdesk.index'))->assertRedirect('/login');
    $this->get(route('helpdesk.create'))->assertRedirect('/login');
    $this->post(route('helpdesk.store'))->assertRedirect('/login');
});

<?php

declare(strict_types=1);

namespace App\Http\Controllers\Web;

use App\Enums\ContactTicketReplySource;
use App\Enums\ContactTicketStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Helpdesk\StoreHelpdeskReplyRequest;
use App\Http\Requests\Helpdesk\StoreHelpdeskTicketRequest;
use App\Models\ContactTicket;
use App\Services\Helpdesk\HelpdeskService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class HelpdeskController extends Controller
{
    public function __construct(
        private readonly HelpdeskService $helpdeskService
    ) {}

    public function index(): Response
    {
        $user = Auth::user();

        $tickets = ContactTicket::forUser($user->id)
            ->with('assignedTo')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(fn (ContactTicket $ticket) => $this->mapTicket($ticket));

        $stats = [
            'total' => $tickets->count(),
            'open' => $tickets->whereIn('status', [ContactTicketStatus::New->value, ContactTicketStatus::InProgress->value])->count(),
            'resolved' => $tickets->where('status', ContactTicketStatus::Resolved->value)->count(),
        ];

        return Inertia::render('Helpdesk/Index', [
            'tickets' => $tickets,
            'stats' => $stats,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Helpdesk/Create');
    }

    public function store(StoreHelpdeskTicketRequest $request): RedirectResponse
    {
        $ticket = $this->helpdeskService->createTicket(
            $request->validated(),
            $request->user()
        );

        return redirect()
            ->route('helpdesk.show', $ticket->ticket_number)
            ->with('success', "Votre ticket {$ticket->ticket_number} a été créé.");
    }

    public function show(string $ticketNumber): Response
    {
        $user = Auth::user();

        $ticket = ContactTicket::with(['replies.user', 'assignedTo'])
            ->where('ticket_number', $ticketNumber)
            ->where('user_id', $user->id)
            ->firstOrFail();

        return Inertia::render('Helpdesk/Show', [
            'ticket' => $this->mapTicket($ticket, true),
        ]);
    }

    public function reply(StoreHelpdeskReplyRequest $request, string $ticketNumber): RedirectResponse
    {
        $user = Auth::user();

        $ticket = ContactTicket::where('ticket_number', $ticketNumber)
            ->where('user_id', $user->id)
            ->whereIn('status', [ContactTicketStatus::New, ContactTicketStatus::InProgress])
            ->firstOrFail();

        $this->helpdeskService->addReply(
            $ticket,
            $request->validated('message'),
            $user
        );

        return back()->with('success', 'Votre réponse a été envoyée.');
    }

    private function mapTicket(ContactTicket $ticket, bool $withReplies = false): array
    {
        $data = [
            'id' => $ticket->id,
            'ticket_number' => $ticket->ticket_number,
            'subject' => $ticket->subject,
            'message' => $ticket->message,
            'status' => $ticket->status->value,
            'status_label' => $ticket->status->label(),
            'priority' => $ticket->priority->value,
            'priority_label' => $ticket->priority->label(),
            'category' => $ticket->category->value,
            'category_label' => $ticket->category->label(),
            'type' => $ticket->type->value,
            'type_label' => $ticket->type->label(),
            'created_at' => $ticket->created_at->toIso8601String(),
            'replied_at' => $ticket->replied_at?->toIso8601String(),
            'resolved_at' => $ticket->resolved_at?->toIso8601String(),
            'assigned_to' => $ticket->assignedTo?->name,
        ];

        if ($withReplies) {
            $data['replies'] = $ticket->replies
                ->where('is_internal', false)
                ->map(fn ($reply) => [
                    'id' => $reply->id,
                    'reply' => $reply->reply,
                    'source' => $reply->source->value,
                    'source_label' => $reply->source->label(),
                    'author' => $reply->source === ContactTicketReplySource::Customer
                        ? $ticket->name
                        : ($reply->user?->name ?? 'Équipe Arborisis'),
                    'created_at' => $reply->created_at->toIso8601String(),
                ])
                ->values();
        }

        return $data;
    }
}

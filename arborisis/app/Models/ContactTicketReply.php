<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ContactTicketReply extends Model
{
    use HasFactory;

    protected $fillable = [
        'contact_ticket_id',
        'user_id',
        'reply',
    ];

    public function ticket(): BelongsTo
    {
        return $this->belongsTo(ContactTicket::class, 'contact_ticket_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}

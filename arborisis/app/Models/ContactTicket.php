<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\ContactTicketStatus;
use App\Enums\ContactTicketType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class ContactTicket extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'ticket_number',
        'type',
        'name',
        'email',
        'subject',
        'message',
        'status',
        'user_id',
        'replied_at',
    ];

    protected $casts = [
        'type' => ContactTicketType::class,
        'status' => ContactTicketStatus::class,
        'replied_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function replies(): HasMany
    {
        return $this->hasMany(ContactTicketReply::class, 'contact_ticket_id')
            ->orderBy('created_at', 'desc');
    }
}

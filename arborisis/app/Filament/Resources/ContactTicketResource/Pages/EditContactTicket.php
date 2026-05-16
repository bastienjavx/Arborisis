<?php

declare(strict_types=1);

namespace App\Filament\Resources\ContactTicketResource\Pages;

use App\Enums\ContactTicketReplySource;
use App\Enums\ContactTicketStatus;
use App\Filament\Resources\ContactTicketResource;
use App\Mail\ContactTicketReplied;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Mail;

class EditContactTicket extends EditRecord
{
    protected static string $resource = ContactTicketResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
            Actions\ForceDeleteAction::make(),
            Actions\RestoreAction::make(),
        ];
    }

    protected function handleRecordUpdate(Model $record, array $data): Model
    {
        if (! empty($data['new_reply'])) {
            $record->replies()->create([
                'user_id' => auth()->id(),
                'source' => ContactTicketReplySource::Team,
                'reply' => $data['new_reply'],
            ]);

            Mail::to($record->email)->queue(new ContactTicketReplied($record, $data['new_reply']));

            $data['replied_at'] = now();

            if ($data['status'] === ContactTicketStatus::New->value) {
                $data['status'] = ContactTicketStatus::InProgress->value;
            }
        }

        $record->update($data);

        return $record;
    }
}

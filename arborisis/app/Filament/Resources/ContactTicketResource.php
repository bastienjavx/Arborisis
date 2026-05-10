<?php

declare(strict_types=1);

namespace App\Filament\Resources;

use App\Enums\ContactTicketStatus;
use App\Enums\ContactTicketType;
use App\Filament\Resources\ContactTicketResource\Pages;
use App\Models\ContactTicket;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\HtmlString;

class ContactTicketResource extends Resource
{
    protected static ?string $model = ContactTicket::class;
    protected static ?string $navigationIcon = 'heroicon-o-envelope';
    protected static ?string $navigationLabel = 'Tickets de contact';
    protected static ?string $modelLabel = 'Ticket';
    protected static ?string $pluralModelLabel = 'Tickets';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('type')
                    ->label('Type')
                    ->options(
                        collect(ContactTicketType::cases())
                            ->mapWithKeys(fn (ContactTicketType $type) => [$type->value => $type->label()])
                            ->toArray()
                    )
                    ->disabled()
                    ->required(),
                Forms\Components\TextInput::make('ticket_number')
                    ->label('Numéro de suivi')
                    ->disabled(),
                Forms\Components\TextInput::make('name')
                    ->label('Nom')
                    ->disabled(),
                Forms\Components\TextInput::make('email')
                    ->label('E-mail')
                    ->disabled(),
                Forms\Components\TextInput::make('subject')
                    ->label('Sujet')
                    ->disabled(),
                Forms\Components\Textarea::make('message')
                    ->label('Message')
                    ->disabled()
                    ->columnSpanFull(),
                Forms\Components\Select::make('status')
                    ->label('Statut')
                    ->options(
                        collect(ContactTicketStatus::cases())
                            ->mapWithKeys(fn (ContactTicketStatus $status) => [$status->value => $status->label()])
                            ->toArray()
                    )
                    ->required(),
                Forms\Components\Section::make('Historique des réponses')
                    ->visibleOn('edit')
                    ->schema([
                        Forms\Components\Placeholder::make('replies_list')
                            ->label('')
                            ->content(function (ContactTicket $record): HtmlString {
                                if ($record->replies->isEmpty()) {
                                    return new HtmlString('<p class="text-sm text-gray-500">Aucune réponse pour le moment.</p>');
                                }

                                $html = $record->replies->map(function ($reply) {
                                    $author = e($reply->user?->name ?? 'Équipe Arborisis');
                                    $date = $reply->created_at->format('d/m/Y à H:i');
                                    $message = nl2br(e($reply->reply));

                                    return <<<HTML
                                    <div class="mb-4 border-l-4 border-primary-600 pl-4 py-1">
                                        <p class="text-xs font-medium text-gray-500 mb-1">{$author} — {$date}</p>
                                        <div class="text-sm text-gray-900">{$message}</div>
                                    </div>
                                    HTML;
                                })->implode('');

                                return new HtmlString($html);
                            })
                            ->columnSpanFull(),
                    ]),
                Forms\Components\Section::make('Répondre au ticket')
                    ->visibleOn('edit')
                    ->schema([
                        Forms\Components\Textarea::make('new_reply')
                            ->label('Nouvelle réponse')
                            ->placeholder('Rédigez votre réponse à l\'utilisateur ici...')
                            ->rows(6)
                            ->columnSpanFull(),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('ticket_number')
                    ->label('N° suivi')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('type')
                    ->label('Type')
                    ->badge()
                    ->formatStateUsing(fn (ContactTicketType $state): string => $state->label())
                    ->color(fn (ContactTicketType $state): string => match ($state) {
                        ContactTicketType::Contact => 'info',
                        ContactTicketType::Privacy => 'warning',
                        ContactTicketType::Support => 'danger',
                    })
                    ->sortable(),
                Tables\Columns\TextColumn::make('name')
                    ->label('Nom')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('email')
                    ->label('E-mail')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('subject')
                    ->label('Sujet')
                    ->searchable()
                    ->limit(40),
                Tables\Columns\TextColumn::make('status')
                    ->label('Statut')
                    ->badge()
                    ->formatStateUsing(fn (ContactTicketStatus $state): string => $state->label())
                    ->color(fn (ContactTicketStatus $state): string => match ($state) {
                        ContactTicketStatus::New => 'gray',
                        ContactTicketStatus::InProgress => 'warning',
                        ContactTicketStatus::Resolved => 'success',
                        ContactTicketStatus::Spam => 'danger',
                    })
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Reçu le')
                    ->dateTime('d/m/Y H:i')
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('type')
                    ->label('Type')
                    ->options(
                        collect(ContactTicketType::cases())
                            ->mapWithKeys(fn (ContactTicketType $type) => [$type->value => $type->label()])
                            ->toArray()
                    ),
                Tables\Filters\SelectFilter::make('status')
                    ->label('Statut')
                    ->options(
                        collect(ContactTicketStatus::cases())
                            ->mapWithKeys(fn (ContactTicketStatus $status) => [$status->value => $status->label()])
                            ->toArray()
                    ),
                Tables\Filters\TernaryFilter::make('deleted_at')
                    ->label('Supprimés')
                    ->native(false),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
                Tables\Actions\RestoreAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                    Tables\Actions\ForceDeleteBulkAction::make(),
                    Tables\Actions\RestoreBulkAction::make(),
                ]),
            ])
            ->defaultSort('created_at', 'desc');
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->withoutGlobalScopes([
                SoftDeletingScope::class,
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListContactTickets::route('/'),
            'edit' => Pages\EditContactTicket::route('/{record}/edit'),
        ];
    }
}

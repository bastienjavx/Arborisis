<?php

declare(strict_types=1);

namespace App\Filament\Resources;

use App\Enums\EnvironmentType;
use App\Enums\LicenseType;
use App\Enums\SoundStatus;
use App\Enums\SoundVisibility;
use App\Filament\Resources\SoundResource\Pages;
use App\Models\Sound;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class SoundResource extends Resource
{
    protected static ?string $model = Sound::class;

    protected static ?string $navigationIcon = 'heroicon-o-speaker-wave';

    protected static ?string $navigationLabel = 'Sons';

    protected static ?string $modelLabel = 'Son';

    protected static ?string $pluralModelLabel = 'Sons';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Informations')
                    ->schema([
                        Forms\Components\TextInput::make('title')
                            ->label('Titre')
                            ->required()
                            ->maxLength(255),

                        Forms\Components\Textarea::make('description')
                            ->label('Description')
                            ->rows(3)
                            ->columnSpanFull(),

                        Forms\Components\Select::make('user_id')
                            ->label('Créateur')
                            ->relationship('user', 'name')
                            ->searchable()
                            ->preload()
                            ->required(),

                        Forms\Components\Select::make('category_id')
                            ->label('Catégorie')
                            ->relationship('category', 'name')
                            ->searchable()
                            ->preload(),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('Métadonnées')
                    ->schema([
                        Forms\Components\Select::make('environment')
                            ->label('Environnement')
                            ->options(
                                collect(EnvironmentType::cases())
                                    ->mapWithKeys(fn (EnvironmentType $env) => [$env->value => $env->label()])
                                    ->toArray()
                            ),

                        Forms\Components\TextInput::make('equipment')
                            ->label('Équipement')
                            ->maxLength(255),

                        Forms\Components\Select::make('license')
                            ->label('Licence')
                            ->options(
                                collect(LicenseType::cases())
                                    ->mapWithKeys(fn (LicenseType $license) => [$license->value => $license->label()])
                                    ->toArray()
                            )
                            ->default(LicenseType::AllRightsReserved->value)
                            ->required(),

                        Forms\Components\DateTimePicker::make('recorded_at')
                            ->label('Date d\'enregistrement'),

                        Forms\Components\TextInput::make('duration')
                            ->label('Durée (sec)')
                            ->numeric()
                            ->suffix('s'),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('Publication')
                    ->schema([
                        Forms\Components\Select::make('status')
                            ->label('Statut')
                            ->options(
                                collect(SoundStatus::cases())
                                    ->mapWithKeys(fn (SoundStatus $status) => [$status->value => $status->label()])
                                    ->toArray()
                            )
                            ->default(SoundStatus::Pending->value)
                            ->required(),

                        Forms\Components\Select::make('visibility')
                            ->label('Visibilité')
                            ->options(
                                collect(SoundVisibility::cases())
                                    ->mapWithKeys(fn (SoundVisibility $vis) => [$vis->value => $vis->label()])
                                    ->toArray()
                            )
                            ->default(SoundVisibility::Public->value)
                            ->required(),

                        Forms\Components\FileUpload::make('cover_image')
                            ->label('Image de couverture')
                            ->image()
                            ->directory('sounds/covers')
                            ->maxSize(5120),
                    ])
                    ->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('cover_image')
                    ->label('Cover')
                    ->size(40)
                    ->defaultImageUrl(fn () => 'https://placehold.co/40x40/2d5a3d/white?text=A')
                    ->circular(),

                Tables\Columns\TextColumn::make('title')
                    ->label('Titre')
                    ->searchable()
                    ->sortable()
                    ->limit(40),

                Tables\Columns\TextColumn::make('user.name')
                    ->label('Créateur')
                    ->sortable()
                    ->searchable(),

                Tables\Columns\TextColumn::make('category.name')
                    ->label('Catégorie')
                    ->sortable()
                    ->searchable(),

                Tables\Columns\TextColumn::make('status')
                    ->label('Statut')
                    ->badge()
                    ->formatStateUsing(fn (string $state): string => SoundStatus::from($state)->label())
                    ->color(fn (string $state): string => match (SoundStatus::from($state)) {
                        SoundStatus::Published => 'success',
                        SoundStatus::Pending => 'warning',
                        SoundStatus::Draft => 'gray',
                        SoundStatus::Hidden => 'danger',
                    })
                    ->sortable(),

                Tables\Columns\TextColumn::make('visibility')
                    ->label('Visibilité')
                    ->badge()
                    ->formatStateUsing(fn (string $state): string => SoundVisibility::from($state)->label())
                    ->color(fn (string $state): string => match (SoundVisibility::from($state)) {
                        SoundVisibility::Public => 'success',
                        SoundVisibility::Followers => 'warning',
                        SoundVisibility::Private => 'gray',
                    })
                    ->sortable(),

                Tables\Columns\TextColumn::make('duration')
                    ->label('Durée')
                    ->suffix(' s')
                    ->sortable(),

                Tables\Columns\TextColumn::make('likes_count')
                    ->label('Likes')
                    ->counts('likes')
                    ->sortable(),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('Créé le')
                    ->dateTime('d/m/Y')
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->label('Statut')
                    ->options(
                        collect(SoundStatus::cases())
                            ->mapWithKeys(fn (SoundStatus $status) => [$status->value => $status->label()])
                            ->toArray()
                    ),

                Tables\Filters\SelectFilter::make('visibility')
                    ->label('Visibilité')
                    ->options(
                        collect(SoundVisibility::cases())
                            ->mapWithKeys(fn (SoundVisibility $vis) => [$vis->value => $vis->label()])
                            ->toArray()
                    ),

                Tables\Filters\SelectFilter::make('category_id')
                    ->label('Catégorie')
                    ->relationship('category', 'name')
                    ->searchable()
                    ->preload(),

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

    public static function getEloquentQuery(): \Illuminate\Database\Eloquent\Builder
    {
        return parent::getEloquentQuery()
            ->withoutGlobalScopes([
                \Illuminate\Database\Eloquent\SoftDeletingScope::class,
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListSounds::route('/'),
            'create' => Pages\CreateSound::route('/create'),
            'edit' => Pages\EditSound::route('/{record}/edit'),
        ];
    }
}

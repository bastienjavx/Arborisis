<?php

declare(strict_types=1);

namespace App\Filament\Resources\ArborisisPointResource\Pages;

use App\Filament\Resources\ArborisisPointResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditArborisisPoint extends EditRecord
{
    protected static string $resource = ArborisisPointResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}

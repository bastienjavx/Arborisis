<?php

namespace App\Filament\Resources\EchoTransactionResource\Pages;

use App\Filament\Resources\EchoTransactionResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateEchoTransaction extends CreateRecord
{
    protected static string $resource = EchoTransactionResource::class;
}

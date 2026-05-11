<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BirdnetDetection extends Model
{
    use HasFactory;

    protected $fillable = [
        'sound_analysis_id',
        'sound_id',
        'scientific_name',
        'common_name',
        'confidence',
        'start_time',
        'end_time',
        'frequency_min',
        'frequency_max',
        'source',
    ];

    protected $casts = [
        'confidence' => 'float',
        'start_time' => 'float',
        'end_time' => 'float',
        'frequency_min' => 'float',
        'frequency_max' => 'float',
    ];

    public function soundAnalysis(): BelongsTo
    {
        return $this->belongsTo(SoundAnalysis::class);
    }

    public function sound(): BelongsTo
    {
        return $this->belongsTo(Sound::class);
    }
}

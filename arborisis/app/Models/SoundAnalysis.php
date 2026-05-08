<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\AnalysisStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SoundAnalysis extends Model
{
    use HasFactory;

    protected $table = 'sound_analyses';

    protected $fillable = [
        'sound_id',
        'status',
        'features_json',
        'features_detailed_json',
        'parameters_json',
        'processed_at',
        'failed_reason',
    ];

    protected $casts = [
        'status' => AnalysisStatus::class,
        'features_json' => 'array',
        'features_detailed_json' => 'array',
        'parameters_json' => 'array',
        'processed_at' => 'datetime',
    ];

    public function sound(): BelongsTo
    {
        return $this->belongsTo(Sound::class);
    }

    public function visualizations(): HasMany
    {
        return $this->hasMany(SoundVisualization::class);
    }

    public function markCompleted(): void
    {
        $this->update([
            'status' => AnalysisStatus::COMPLETED,
            'processed_at' => now(),
            'failed_reason' => null,
        ]);
    }

    public function markFailed(string $reason): void
    {
        $this->update([
            'status' => AnalysisStatus::FAILED,
            'processed_at' => now(),
            'failed_reason' => $reason,
        ]);
    }
}

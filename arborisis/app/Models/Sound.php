<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\EnvironmentType;
use App\Enums\LicenseType;
use App\Enums\SoundStatus;
use App\Enums\SoundVisibility;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Sound extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'category_id',
        'title',
        'slug',
        'description',
        'recorded_at',
        'duration',
        'environment',
        'equipment',
        'license',
        'visibility',
        'status',
        'cover_image',
    ];

    protected $casts = [
        'recorded_at' => 'datetime',
        'status' => SoundStatus::class,
        'visibility' => SoundVisibility::class,
        'license' => LicenseType::class,
        'environment' => EnvironmentType::class,
    ];

    protected static function booted(): void
    {
        static::creating(function (Sound $sound) {
            if (empty($sound->slug)) {
                $sound->slug = Str::slug($sound->title . '-' . uniqid());
            }
        });
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class, 'sound_tag');
    }

    public function soundFile(): HasOne
    {
        return $this->hasOne(SoundFile::class);
    }

    public function soundLocation(): HasOne
    {
        return $this->hasOne(SoundLocation::class);
    }

    public function isPublic(): bool
    {
        return $this->status === SoundStatus::Published
            && $this->visibility === SoundVisibility::Public;
    }

    public function scopePublic($query)
    {
        return $query->where('status', SoundStatus::Published)
                     ->where('visibility', SoundVisibility::Public);
    }
}

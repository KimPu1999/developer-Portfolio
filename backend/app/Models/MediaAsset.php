<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class MediaAsset extends Model
{
    use HasUuids;

    protected $fillable = ['disk', 'path', 'original_name', 'mime_type', 'size', 'mediable_type', 'mediable_id', 'is_public'];

    protected function casts(): array
    {
        return ['size' => 'integer', 'is_public' => 'boolean'];
    }

    public function mediable(): MorphTo
    {
        return $this->morphTo();
    }
}

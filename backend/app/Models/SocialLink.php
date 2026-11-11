<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class SocialLink extends Model
{
    use HasUuids;

    protected $fillable = ['label', 'kind', 'url', 'is_enabled', 'display_order'];

    protected function casts(): array
    {
        return ['is_enabled' => 'boolean'];
    }
}

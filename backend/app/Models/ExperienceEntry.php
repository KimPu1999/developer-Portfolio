<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class ExperienceEntry extends Model
{
    use HasUuids;

    protected $fillable = ['title', 'organization', 'location', 'employment_dates', 'duration', 'summary', 'responsibilities', 'achievements', 'role', 'technologies', 'status', 'experience_type', 'project_slug', 'is_public', 'display_order'];

    protected function casts(): array
    {
        return ['responsibilities' => 'array', 'achievements' => 'array', 'technologies' => 'array', 'is_public' => 'boolean'];
    }
}

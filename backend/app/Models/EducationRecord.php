<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class EducationRecord extends Model
{
    use HasUuids;

    protected $fillable = ['title', 'focus', 'institution', 'graduation_year', 'date_label', 'coursework', 'related_technologies', 'is_public', 'display_order'];

    protected function casts(): array
    {
        return ['coursework' => 'array', 'related_technologies' => 'array', 'is_public' => 'boolean'];
    }
}

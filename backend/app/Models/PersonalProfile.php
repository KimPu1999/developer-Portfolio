<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class PersonalProfile extends Model
{
    use HasUuids;

    protected $fillable = ['display_name', 'initials', 'role', 'subtitle', 'summary', 'about', 'career_objective', 'focus_areas', 'interests', 'profile_image_path'];

    protected function casts(): array
    {
        return ['focus_areas' => 'array', 'interests' => 'array'];
    }
}

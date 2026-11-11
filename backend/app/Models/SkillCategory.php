<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SkillCategory extends Model
{
    use HasUuids;

    protected $fillable = ['name', 'description', 'display_order'];

    public function skills(): HasMany
    {
        return $this->hasMany(Skill::class);
    }
}

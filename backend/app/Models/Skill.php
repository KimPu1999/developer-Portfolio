<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Skill extends Model
{
    use HasUuids;

    protected $fillable = ['skill_category_id', 'name', 'description', 'project_slugs', 'is_public', 'display_order'];

    protected function casts(): array
    {
        return ['project_slugs' => 'array', 'is_public' => 'boolean'];
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(SkillCategory::class, 'skill_category_id');
    }
}

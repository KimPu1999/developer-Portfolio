<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = ['slug', 'title', 'short_title', 'category', 'project_type', 'company_name', 'role', 'contributions', 'description', 'status', 'overview', 'problem', 'objectives', 'solution', 'development_approach', 'technical_architecture', 'planned_modules', 'challenges', 'outcomes', 'lessons_learned', 'visual_key', 'image_path', 'image_alt', 'github_url', 'live_url', 'is_featured', 'is_published', 'display_order'];

    protected function casts(): array
    {
        return ['objectives' => 'array', 'planned_modules' => 'array', 'challenges' => 'array', 'contributions' => 'array', 'is_featured' => 'boolean', 'is_published' => 'boolean'];
    }

    public function technologies(): HasMany
    {
        return $this->hasMany(ProjectTechnology::class)->orderBy('display_order');
    }

    public function images(): HasMany
    {
        return $this->hasMany(ProjectImage::class)->orderBy('display_order');
    }
}

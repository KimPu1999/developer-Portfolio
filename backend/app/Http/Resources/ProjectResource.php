<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ProjectResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'title' => $this->title,
            'shortTitle' => $this->short_title,
            'category' => $this->category,
            'projectType' => $this->project_type,
            'company' => $this->company_name,
            'role' => $this->role,
            'contributions' => $this->contributions ?? [],
            'description' => $this->description,
            'status' => $this->status,
            'overview' => $this->overview,
            'problem' => $this->problem,
            'objectives' => $this->objectives ?? [],
            'solution' => $this->solution,
            'developmentApproach' => $this->development_approach,
            'technicalArchitecture' => $this->technical_architecture,
            'plannedModules' => $this->planned_modules ?? [],
            'githubUrl' => $this->github_url,
            'liveUrl' => $this->live_url,
            'isFeatured' => $this->is_featured,
            'isPublished' => $this->is_published,
            'displayOrder' => $this->display_order,
            'visualKey' => $this->visual_key,
            'imagePath' => $this->image_path,
            'imageAlt' => $this->image_alt,
            'technologies' => $this->whenLoaded('technologies', fn () => $this->technologies->pluck('technology')->values()),
            'images' => $this->whenLoaded('images', fn () => $this->images->map(fn ($image) => ['id' => $image->id, 'path' => $image->path, 'url' => $image->disk === 'public' ? Storage::disk('public')->url($image->path) : null, 'alt' => $image->alt, 'caption' => $image->caption, 'displayOrder' => $image->display_order])),
        ];
    }
}

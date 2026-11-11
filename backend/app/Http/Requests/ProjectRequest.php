<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Models\Project;

class ProjectRequest extends FormRequest
{
    public function authorize(): bool { return $this->user()?->isAdmin() === true; }

    public function rules(): array
    {
        $project = $this->route('project');
        $projectId = $project instanceof Project ? $project->id : null;

        return [
            'slug' => ['required', 'alpha_dash', 'max:100', Rule::unique('projects', 'slug')->ignore($projectId)],
            'title' => ['required', 'string', 'max:180'],
            'short_title' => ['nullable', 'string', 'max:40'],
            'category' => ['required', 'string', 'max:80'],
            'description' => ['required', 'string', 'max:1000'],
            'status' => ['required', 'in:In Development,Concept,Completed'],
            'overview' => ['nullable', 'string', 'max:5000'],
            'problem' => ['nullable', 'string', 'max:5000'],
            'objectives' => ['nullable', 'array'],
            'objectives.*' => ['string', 'max:300'],
            'solution' => ['nullable', 'string', 'max:5000'],
            'development_approach' => ['nullable', 'string', 'max:5000'],
            'technical_architecture' => ['nullable', 'string', 'max:5000'],
            'planned_modules' => ['nullable', 'array'],
            'planned_modules.*' => ['string', 'max:120'],
            'github_url' => ['nullable', 'url:https', 'max:500'],
            'live_url' => ['nullable', 'url:https', 'max:500'],
            'is_featured' => ['boolean'],
            'is_published' => ['boolean'],
            'display_order' => ['integer', 'min:0', 'max:10000'],
            'technologies' => ['array'],
            'technologies.*' => ['string', 'max:80'],
        ];
    }
}

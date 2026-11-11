<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ExperienceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->isAdmin() === true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:180'],
            'organization' => ['nullable', 'string', 'max:180'],
            'location' => ['nullable', 'string', 'max:180'],
            'employment_dates' => ['nullable', 'string', 'max:120'],
            'duration' => ['nullable', 'string', 'max:80'],
            'summary' => ['required', 'string', 'max:3000'],
            'responsibilities' => ['nullable', 'array', 'max:30'],
            'responsibilities.*' => ['string', 'max:500'],
            'achievements' => ['nullable', 'array', 'max:30'],
            'achievements.*' => ['string', 'max:500'],
            'role' => ['nullable', 'string', 'max:180'],
            'technologies' => ['nullable', 'array', 'max:30'],
            'technologies.*' => ['string', 'max:80'],
            'status' => ['required', 'string', 'max:80'],
            'experience_type' => ['required', 'in:professional,project'],
            'project_slug' => ['nullable', 'alpha_dash', 'max:100'],
            'is_public' => ['sometimes', 'boolean'],
            'display_order' => ['sometimes', 'integer', 'min:0', 'max:10000'],
        ];
    }
}

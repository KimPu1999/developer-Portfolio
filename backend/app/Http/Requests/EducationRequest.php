<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EducationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->is_admin === true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:180'],
            'focus' => ['nullable', 'string', 'max:180'],
            'status_label' => ['nullable', 'string', 'max:80'],
            'academic_level' => ['nullable', 'string', 'max:80'],
            'institution' => ['nullable', 'string', 'max:180'],
            'location' => ['nullable', 'string', 'max:180'],
            'graduation_year' => ['nullable', 'string', 'max:20'],
            'date_label' => ['nullable', 'string', 'max:120'],
            'coursework' => ['nullable', 'array', 'max:30'],
            'coursework.*' => ['string', 'max:120'],
            'related_technologies' => ['nullable', 'array', 'max:30'],
            'related_technologies.*' => ['string', 'max:120'],
            'is_public' => ['sometimes', 'boolean'],
            'display_order' => ['sometimes', 'integer', 'min:0'],
        ];
    }
}

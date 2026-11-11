<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CertificationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->is_admin === true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:180'],
            'category' => ['nullable', 'string', 'max:80'],
            'description' => ['nullable', 'string', 'max:2000'],
            'issuer' => ['nullable', 'string', 'max:180'],
            'issue_date' => ['nullable', 'date'],
            'credential_id' => ['nullable', 'string', 'max:180'],
            'verification_url' => ['nullable', 'url:https', 'max:500'],
            'is_public' => ['sometimes', 'boolean'],
            'is_downloadable' => ['sometimes', 'boolean'],
            'is_verified' => ['sometimes', 'boolean'],
            'display_order' => ['sometimes', 'integer', 'min:0'],
        ];
    }
}

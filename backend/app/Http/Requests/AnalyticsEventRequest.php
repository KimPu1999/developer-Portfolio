<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AnalyticsEventRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'event_type' => ['required', 'in:page_view,project_view'],
            'path' => ['required', 'string', 'max:500', 'regex:/^\/[a-zA-Z0-9\-._~\/?=&%]*$/'],
            'project_slug' => ['nullable', 'string', 'max:160', 'exists:projects,slug'],
            'referrer_domain' => ['nullable', 'string', 'max:255', 'regex:/^[a-zA-Z0-9.-]+$/'],
            'device_category' => ['nullable', 'in:desktop,mobile,tablet,unknown'],
        ];
    }
}

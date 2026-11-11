<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\PersonalProfile;
use App\Services\AuditService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminProfileController extends Controller
{
    public function show(): JsonResponse { return response()->json(['profile' => PersonalProfile::query()->latest()->first()]); }

    public function update(Request $request): JsonResponse
    {
        $data = $request->validate(['display_name' => ['nullable', 'string', 'max:120'], 'initials' => ['nullable', 'string', 'max:8'], 'role' => ['nullable', 'string', 'max:120'], 'subtitle' => ['nullable', 'string', 'max:180'], 'summary' => ['nullable', 'string', 'max:2000'], 'about' => ['nullable', 'string', 'max:5000'], 'career_objective' => ['nullable', 'string', 'max:3000'], 'focus_areas' => ['array'], 'interests' => ['array']]);
        $profile = PersonalProfile::query()->latest()->first() ?? new PersonalProfile();
        $profile->fill($data)->save();
        app(AuditService::class)->record('profile.updated', $profile, [], $request);
        return response()->json(['profile' => $profile->refresh()]);
    }
}

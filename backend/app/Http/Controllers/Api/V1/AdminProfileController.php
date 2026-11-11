<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\PersonalProfile;
use App\Services\AuditService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class AdminProfileController extends Controller
{
    public function show(): JsonResponse
    {
        $profile = PersonalProfile::query()->latest()->first();
        if ($profile?->profile_image_path && Storage::disk('public')->exists($profile->profile_image_path)) {
            $profile->profile_image_url = Storage::disk('public')->url($profile->profile_image_path);
        }

        return response()->json(['profile' => $profile]);
    }

    public function update(Request $request): JsonResponse
    {
        $data = $request->validate(['display_name' => ['nullable', 'string', 'max:120'], 'email' => ['nullable', 'email', 'max:254'], 'phone' => ['nullable', 'string', 'max:40'], 'location' => ['nullable', 'string', 'max:180'], 'initials' => ['nullable', 'string', 'max:8'], 'role' => ['nullable', 'string', 'max:120'], 'subtitle' => ['nullable', 'string', 'max:180'], 'summary' => ['nullable', 'string', 'max:2000'], 'about' => ['nullable', 'string', 'max:5000'], 'career_objective' => ['nullable', 'string', 'max:3000'], 'focus_areas' => ['array'], 'interests' => ['array'], 'profile_image_position' => ['nullable', 'in:center,top,bottom,left,right']]);
        $profile = PersonalProfile::query()->latest()->first() ?? new PersonalProfile();
        $profile->fill($data)->save();
        app(AuditService::class)->record('profile.updated', $profile, [], $request);
        return response()->json(['profile' => $profile->refresh()]);
    }

    public function uploadPhoto(Request $request): JsonResponse
    {
        $request->validate(['file' => ['required', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5120'], 'profile_image_position' => ['nullable', 'in:center,top,bottom,left,right']]);
        $file = $request->file('file');
        $mime = (string) $file->getMimeType();
        abort_unless(in_array($mime, ['image/jpeg', 'image/png', 'image/webp'], true), 422, 'Unsupported image type.');
        $profile = PersonalProfile::query()->latest()->first() ?? new PersonalProfile();
        $oldPath = $profile->profile_image_path;
        $extension = match ($mime) { 'image/jpeg' => 'jpg', 'image/png' => 'png', default => 'webp' };
        $path = $file->storeAs('profile', Str::uuid()->toString().'.'.$extension, 'public');
        $profile->fill(['profile_image_path' => $path, 'profile_image_position' => $request->input('profile_image_position', $profile->profile_image_position ?: 'center')])->save();
        if ($oldPath && $oldPath !== $path) Storage::disk('public')->delete($oldPath);
        app(AuditService::class)->record('profile.photo_uploaded', $profile, ['mime_type' => $mime, 'size' => $file->getSize()], $request);
        $profile->profile_image_url = Storage::disk('public')->url($path);
        return response()->json(['profile' => $profile->refresh(), 'profile_image_url' => $profile->profile_image_url], 201);
    }

    public function removePhoto(Request $request): JsonResponse
    {
        $profile = PersonalProfile::query()->latest()->first();
        if ($profile?->profile_image_path) Storage::disk('public')->delete($profile->profile_image_path);
        if ($profile) $profile->update(['profile_image_path' => null]);
        if ($profile) app(AuditService::class)->record('profile.photo_removed', $profile, [], $request);
        return response()->json(['message' => 'Profile photo removed.']);
    }
}

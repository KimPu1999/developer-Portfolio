<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\CertificationResource;
use App\Http\Resources\EducationResource;
use App\Models\Certification;
use App\Models\EducationRecord;
use App\Models\ExperienceEntry;
use App\Models\PersonalProfile;
use App\Models\Project;
use App\Models\SkillCategory;
use App\Models\SocialLink;
use App\Models\ResumeMetadata;
use Illuminate\Http\JsonResponse;

class PublicContentController extends Controller
{
    public function profile(): JsonResponse
    {
        $education = EducationResource::collection(EducationRecord::where('is_public', true)->orderBy('display_order')->get())->resolve();
        $certifications = CertificationResource::collection(Certification::where('is_public', true)->orderBy('display_order')->orderBy('created_at')->get())->resolve();
        return response()->json(['profile' => PersonalProfile::query()->latest()->first(), 'education' => $education, 'experience' => ExperienceEntry::where('is_public', true)->orderBy('display_order')->get(), 'skills' => SkillCategory::with(['skills' => fn ($query) => $query->where('is_public', true)->orderBy('display_order')])->orderBy('display_order')->get(), 'socialLinks' => SocialLink::where('is_enabled', true)->orderBy('display_order')->get(), 'certifications' => $certifications, 'resume' => ResumeMetadata::where('is_public', true)->latest()->first()]);
    }

    public function projects(): JsonResponse
    {
        $projects = Project::query()->where('is_published', true)->with(['technologies', 'images'])->orderByDesc('is_featured')->orderBy('display_order')->paginate(12);

        return ProjectResource::collection($projects)->response();
    }

    public function project(Project $project): ProjectResource
    {
        abort_unless($project->is_published, 404);

        return new ProjectResource($project->load(['technologies', 'images']));
    }
}

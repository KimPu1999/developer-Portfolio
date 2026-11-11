<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Certification;
use App\Models\EducationRecord;
use App\Models\ExperienceEntry;
use App\Models\ResumeMetadata;
use App\Services\AuditService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminContentController extends Controller
{
    public function __construct(private readonly AuditService $audit) {}

    public function education(): JsonResponse { return response()->json(['education' => EducationRecord::orderBy('display_order')->get()]); }
    public function saveEducation(Request $request, ?EducationRecord $education = null): JsonResponse
    {
        $data = $request->validate(['title' => ['required', 'string', 'max:180'], 'focus' => ['nullable', 'string', 'max:180'], 'institution' => ['nullable', 'string', 'max:180'], 'graduation_year' => ['nullable', 'string', 'max:20'], 'date_label' => ['nullable', 'string', 'max:120'], 'coursework' => ['array'], 'related_technologies' => ['array'], 'is_public' => ['boolean'], 'display_order' => ['integer', 'min:0']]);
        $education ??= new EducationRecord(); $education->fill($data)->save(); $this->audit->record('education.saved', $education, [], $request); return response()->json(['education' => $education], $education->wasRecentlyCreated ? 201 : 200);
    }

    public function certification(): JsonResponse { return response()->json(['certifications' => Certification::latest()->get()]); }
    public function saveCertification(Request $request, ?Certification $certification = null): JsonResponse
    {
        $data = $request->validate(['name' => ['required', 'string', 'max:180'], 'issuer' => ['nullable', 'string', 'max:180'], 'issue_date' => ['nullable', 'date'], 'credential_id' => ['nullable', 'string', 'max:180'], 'verification_url' => ['nullable', 'url:https', 'max:500'], 'is_public' => ['boolean']]);
        $certification ??= new Certification(); $certification->fill($data)->save(); $this->audit->record('certification.saved', $certification, [], $request); return response()->json(['certification' => $certification], $certification->wasRecentlyCreated ? 201 : 200);
    }

    public function experience(): JsonResponse { return response()->json(['experience' => ExperienceEntry::orderBy('display_order')->get()]); }
    public function saveExperience(Request $request, ?ExperienceEntry $experience = null): JsonResponse
    {
        $data = $request->validate(['title' => ['required', 'string', 'max:180'], 'summary' => ['required', 'string', 'max:3000'], 'role' => ['nullable', 'string', 'max:180'], 'technologies' => ['array'], 'status' => ['required', 'string', 'max:80'], 'project_slug' => ['nullable', 'alpha_dash'], 'is_public' => ['boolean'], 'display_order' => ['integer', 'min:0']]);
        $experience ??= new ExperienceEntry(); $experience->fill($data)->save(); $this->audit->record('experience.saved', $experience, [], $request); return response()->json(['experience' => $experience], $experience->wasRecentlyCreated ? 201 : 200);
    }

    public function resume(): JsonResponse { return response()->json(['resume' => ResumeMetadata::query()->latest()->first()]); }
    public function saveResume(Request $request): JsonResponse
    {
        $data = $request->validate(['title' => ['required', 'string', 'max:120'], 'file_path' => ['nullable', 'string', 'max:500'], 'last_updated' => ['nullable', 'date'], 'is_public' => ['boolean']]);
        $resume = ResumeMetadata::query()->latest()->first() ?? new ResumeMetadata(); $resume->fill($data)->save(); $this->audit->record('resume.saved', $resume, [], $request); return response()->json(['resume' => $resume]);
    }
}

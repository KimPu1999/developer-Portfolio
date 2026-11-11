<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\CertificationRequest;
use App\Http\Requests\EducationRequest;
use App\Models\Certification;
use App\Models\EducationRecord;
use App\Models\ExperienceEntry;
use App\Models\ResumeMetadata;
use App\Services\AuditService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AdminContentController extends Controller
{
    public function __construct(private readonly AuditService $audit) {}

    public function education(): JsonResponse { return response()->json(['education' => EducationRecord::orderBy('display_order')->orderBy('created_at')->get()]); }
    public function saveEducation(EducationRequest $request, ?EducationRecord $education = null): JsonResponse
    {
        $education ??= new EducationRecord();
        $education->fill($request->validated())->save();
        $this->audit->record('education.saved', $education, [], $request);
        return response()->json(['education' => $education], $education->wasRecentlyCreated ? 201 : 200);
    }

    public function deleteEducation(EducationRecord $education, Request $request): JsonResponse
    {
        $this->audit->record('education.deleted', $education, [], $request);
        $education->delete();
        return response()->json(['message' => 'Education record deleted.']);
    }

    public function reorderEducation(Request $request): JsonResponse
    {
        $data = $request->validate(['items' => ['required', 'array'], 'items.*.id' => ['required', 'uuid'], 'items.*.display_order' => ['required', 'integer', 'min:0']]);
        foreach ($data['items'] as $item) EducationRecord::whereKey($item['id'])->update(['display_order' => $item['display_order']]);
        return response()->json(['message' => 'Education order updated.']);
    }

    public function certification(): JsonResponse
    {
        $certifications = Certification::orderBy('display_order')->orderBy('created_at')->get()->map(function (Certification $certification): Certification {
            $certification->certificate_url = $certification->certificate_path && $certification->certificate_disk === 'public'
                ? Storage::disk('public')->url($certification->certificate_path)
                : null;
            return $certification;
        });
        return response()->json(['certifications' => $certifications]);
    }
    public function saveCertification(CertificationRequest $request, ?Certification $certification = null): JsonResponse
    {
        $certification ??= new Certification();
        $certification->fill($request->validated())->save();
        $this->audit->record('certification.saved', $certification, [], $request);
        return response()->json(['certification' => $certification], $certification->wasRecentlyCreated ? 201 : 200);
    }

    public function deleteCertification(Certification $certification, Request $request): JsonResponse
    {
        $this->audit->record('certification.deleted', $certification, [], $request);
        $certification->delete();
        return response()->json(['message' => 'Certification record deleted.']);
    }

    public function reorderCertifications(Request $request): JsonResponse
    {
        $data = $request->validate(['items' => ['required', 'array'], 'items.*.id' => ['required', 'uuid'], 'items.*.display_order' => ['required', 'integer', 'min:0']]);
        foreach ($data['items'] as $item) Certification::whereKey($item['id'])->update(['display_order' => $item['display_order']]);
        return response()->json(['message' => 'Certification order updated.']);
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

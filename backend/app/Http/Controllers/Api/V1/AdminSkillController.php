<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use App\Models\SkillCategory;
use App\Services\AuditService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminSkillController extends Controller
{
    public function __construct(private readonly AuditService $audit) {}

    public function index(): JsonResponse
    {
        return response()->json(['categories' => SkillCategory::with('skills')->orderBy('display_order')->get()]);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate(['skill_category_id' => ['required', 'exists:skill_categories,id'], 'name' => ['required', 'string', 'max:120'], 'description' => ['nullable', 'string', 'max:500'], 'project_slugs' => ['array'], 'is_public' => ['boolean'], 'display_order' => ['integer', 'min:0']]);
        $skill = Skill::create($data);
        $this->audit->record('skill.created', $skill, [], $request);

        return response()->json(['skill' => $skill], 201);
    }

    public function update(Request $request, Skill $skill): JsonResponse
    {
        $data = $request->validate(['skill_category_id' => ['sometimes', 'exists:skill_categories,id'], 'name' => ['sometimes', 'string', 'max:120'], 'description' => ['nullable', 'string', 'max:500'], 'project_slugs' => ['array'], 'is_public' => ['boolean'], 'display_order' => ['integer', 'min:0']]);
        $skill->update($data);
        $this->audit->record('skill.updated', $skill, [], $request);

        return response()->json(['skill' => $skill->refresh()]);
    }

    public function destroy(Request $request, Skill $skill): JsonResponse
    {
        $this->audit->record('skill.deleted', $skill, [], $request);
        $skill->delete();

        return response()->json(['message' => 'Skill deleted.']);
    }
}

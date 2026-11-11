<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use App\Services\AuditService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminProjectController extends Controller
{
    public function __construct(private readonly AuditService $audit) {}

    public function index(Request $request): JsonResponse
    {
        return ProjectResource::collection(Project::with(['technologies', 'images'])->when($request->string('search')->isNotEmpty(), fn ($query) => $query->where('title', 'like', '%'.$request->string('search')->toString().'%'))->when($request->has('published'), fn ($query) => $query->where('is_published', $request->boolean('published')))->orderBy('display_order')->paginate(20))->response();
    }

    public function store(ProjectRequest $request): ProjectResource
    {
        $project = DB::transaction(fn () => $this->saveProject(new Project(), $request->validated()));
        $this->audit->record('project.created', $project, [], $request);

        return new ProjectResource($project->load('technologies'));
    }

    public function show(Project $project): ProjectResource
    {
        return new ProjectResource($project->load(['technologies', 'images']));
    }

    public function update(ProjectRequest $request, Project $project): ProjectResource
    {
        $project = DB::transaction(fn () => $this->saveProject($project, $request->validated()));
        $this->audit->record('project.updated', $project, [], $request);

        return new ProjectResource($project->load('technologies'));
    }

    public function destroy(Request $request, Project $project): JsonResponse
    {
        $this->audit->record('project.deleted', $project, [], $request);
        $project->delete();

        return response()->json(['message' => 'Project deleted.']);
    }

    private function saveProject(Project $project, array $data): Project
    {
        $technologies = $data['technologies'] ?? [];
        unset($data['technologies']);
        $project->fill($data)->save();
        $project->technologies()->delete();
        foreach (array_values(array_unique($technologies)) as $index => $technology) {
            $project->technologies()->create(['technology' => $technology, 'display_order' => $index]);
        }

        return $project;
    }
}

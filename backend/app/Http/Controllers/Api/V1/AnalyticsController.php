<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\AnalyticsEventRequest;
use App\Models\AnalyticsEvent;
use App\Models\Project;
use Illuminate\Http\JsonResponse;

class AnalyticsController extends Controller
{
    public function store(AnalyticsEventRequest $request): JsonResponse
    {
        if ($request->user()?->isAdmin()) {
            return response()->json(null, 204);
        }

        $validated = $request->validated();
        $projectId = isset($validated['project_slug'])
            ? Project::query()->where('slug', $validated['project_slug'])->where('is_published', true)->value('id')
            : null;
        unset($validated['project_slug']);

        AnalyticsEvent::create([...$validated, 'project_id' => $projectId, 'occurred_at' => now('UTC')]);

        return response()->json(null, 202);
    }
}

<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\SocialLink;
use App\Services\AuditService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminSocialLinkController extends Controller
{
    public function __construct(private readonly AuditService $audit) {}

    public function index(): JsonResponse { return response()->json(['socialLinks' => SocialLink::orderBy('display_order')->get()]); }

    public function store(Request $request): JsonResponse
    {
        $link = SocialLink::create($this->validated($request));
        $this->audit->record('social_link.created', $link, [], $request);
        return response()->json(['socialLink' => $link], 201);
    }

    public function update(Request $request, SocialLink $socialLink): JsonResponse
    {
        $socialLink->update($this->validated($request, true));
        $this->audit->record('social_link.updated', $socialLink, [], $request);
        return response()->json(['socialLink' => $socialLink->refresh()]);
    }

    public function destroy(Request $request, SocialLink $socialLink): JsonResponse
    {
        $this->audit->record('social_link.deleted', $socialLink, [], $request);
        $socialLink->delete();
        return response()->json(['message' => 'Social link deleted.']);
    }

    private function validated(Request $request, bool $partial = false): array
    {
        $rules = ['label' => [$partial ? 'sometimes' : 'required', 'string', 'max:80'], 'kind' => [$partial ? 'sometimes' : 'required', 'string', 'max:40'], 'url' => [$partial ? 'sometimes' : 'required', 'url:http,https,mailto', 'max:500'], 'is_enabled' => ['boolean'], 'display_order' => ['integer', 'min:0']];
        return $request->validate($rules);
    }
}

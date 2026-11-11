<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\ContactMessage;
use App\Models\Project;
use App\Models\Skill;
use Illuminate\Http\JsonResponse;

class AdminDashboardController extends Controller
{
    public function __invoke(): JsonResponse
    {
        return response()->json(['metrics' => ['projects' => Project::count(), 'publishedProjects' => Project::where('is_published', true)->count(), 'draftProjects' => Project::where('is_published', false)->count(), 'skills' => Skill::count(), 'messages' => ContactMessage::count(), 'unreadMessages' => ContactMessage::where('status', 'unread')->count()], 'recentMessages' => ContactMessage::latest()->limit(5)->get(['id', 'full_name', 'email', 'subject', 'status', 'created_at']), 'recentChanges' => AuditLog::latest()->limit(8)->get(['id', 'action', 'auditable_type', 'created_at'])]);
    }
}

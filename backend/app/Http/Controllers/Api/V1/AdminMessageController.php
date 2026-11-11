<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\ContactMessageResource;
use App\Models\ContactMessage;
use App\Models\ContactMessageEvent;
use App\Services\AuditService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminMessageController extends Controller
{
    public function __construct(private readonly AuditService $audit) {}

    public function index(Request $request): JsonResponse
    {
        $messages = ContactMessage::query()->when($request->string('search')->isNotEmpty(), function ($query) use ($request): void { $term = '%'.$request->string('search')->toString().'%'; $query->where(fn ($q) => $q->where('full_name', 'like', $term)->orWhere('email', 'like', $term)->orWhere('subject', 'like', $term)); })->when($request->string('status')->isNotEmpty(), fn ($query) => $query->where('status', $request->string('status')->toString()))->latest()->paginate(20);

        return ContactMessageResource::collection($messages)->response();
    }

    public function show(ContactMessage $message): ContactMessageResource
    {
        return new ContactMessageResource($message->load('events'));
    }

    public function updateStatus(Request $request, ContactMessage $message): ContactMessageResource
    {
        $data = $request->validate(['status' => ['required', 'in:unread,read,archived,spam']]);
        $message->update(['status' => $data['status'], 'read_at' => $data['status'] === 'read' ? now() : $message->read_at, 'archived_at' => $data['status'] === 'archived' ? now() : $message->archived_at, 'spam_at' => $data['status'] === 'spam' ? now() : $message->spam_at]);
        ContactMessageEvent::create(['contact_message_id' => $message->id, 'user_id' => $request->user()->id, 'event' => 'status_changed', 'metadata' => ['status' => $data['status']]]);
        $this->audit->record('message.status_changed', $message, ['status' => $data['status']], $request);

        return new ContactMessageResource($message->refresh());
    }
}

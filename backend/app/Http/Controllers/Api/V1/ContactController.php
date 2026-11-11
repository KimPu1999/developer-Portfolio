<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\ContactMessageRequest;
use App\Http\Resources\ContactMessageResource;
use App\Models\ContactMessage;
use App\Models\ContactMessageEvent;
use App\Notifications\ContactMessageReceived;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification;

class ContactController extends Controller
{
    public function store(ContactMessageRequest $request): JsonResponse
    {
        $data = $request->validated();
        unset($data['website']);

        $recentDuplicate = ContactMessage::query()
            ->where('email', $data['email'])
            ->where('subject', $data['subject'])
            ->where('message', $data['message'])
            ->where('created_at', '>=', now()->subMinutes(10))
            ->exists();

        if ($recentDuplicate) {
            return response()->json(['message' => 'Your message was already received.'], 202);
        }

        $message = DB::transaction(function () use ($data, $request): ContactMessage {
            $message = ContactMessage::create([
                ...$data,
                'ip_hash' => hash_hmac('sha256', (string) $request->ip(), (string) config('app.key')),
                'user_agent' => substr((string) $request->userAgent(), 0, 512),
            ]);
            ContactMessageEvent::create(['contact_message_id' => $message->id, 'event' => 'created']);

            return $message;
        });

        $recipient = config('mail.admin_notification_email');
        if ($recipient) {
            DB::afterCommit(fn () => Notification::route('mail', $recipient)->notify(new ContactMessageReceived($message->id)));
        }

        return response()->json(['message' => 'Thanks for reaching out. Your message has been received.'], 202);
    }
}

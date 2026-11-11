<?php

namespace Tests\Feature;

use App\Models\ContactMessage;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;

class ContactApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_contact_message_is_validated_and_persisted(): void
    {
        Notification::fake();
        $response = $this->postJson('/api/v1/contact', ['full_name' => 'Visitor Example', 'email' => 'visitor@example.com', 'subject' => 'A project question', 'message' => 'I would like to discuss a software project.']);
        $response->assertAccepted()->assertJsonStructure(['message']);
        $this->assertDatabaseHas('contact_messages', ['email' => 'visitor@example.com', 'status' => 'unread']);
    }

    public function test_contact_message_requires_valid_fields(): void
    {
        $this->postJson('/api/v1/contact', ['full_name' => 'A', 'email' => 'invalid', 'subject' => '', 'message' => 'short'])->assertUnprocessable()->assertJsonValidationErrors(['email', 'subject', 'message']);
        $this->assertSame(0, ContactMessage::count());
    }
}

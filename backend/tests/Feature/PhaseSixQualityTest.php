<?php

namespace Tests\Feature;

use App\Models\AnalyticsEvent;
use App\Models\Project;
use App\Models\User;
use App\Notifications\ContactMessageReceived;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;

class PhaseSixQualityTest extends TestCase
{
    use RefreshDatabase;

    public function test_health_endpoint_and_security_headers_are_available(): void
    {
        $this->getJson('/api/health')
            ->assertOk()
            ->assertJsonStructure(['status', 'service', 'timestamp'])
            ->assertHeader('X-Content-Type-Options', 'nosniff')
            ->assertHeader('X-Frame-Options', 'DENY');
    }

    public function test_contact_submission_dispatches_a_notification_after_persistence(): void
    {
        Notification::fake();
        config(['mail.admin_notification_email' => 'admin@example.com']);

        $this->postJson('/api/v1/contact', [
            'full_name' => 'QA Visitor',
            'email' => 'qa-visitor@example.com',
            'subject' => 'Quality review',
            'message' => 'This is a controlled test submission for the local test suite.',
        ])->assertAccepted();

        Notification::assertSentOnDemand(ContactMessageReceived::class);
    }

    public function test_contact_rate_limit_rejects_the_sixth_request_for_the_same_key(): void
    {
        Notification::fake();

        for ($index = 1; $index <= 5; $index++) {
            $this->postJson('/api/v1/contact', [
                'full_name' => 'Rate Limit Visitor',
                'email' => 'rate-limit@example.com',
                'subject' => 'Attempt '.$index,
                'message' => 'This is a controlled rate-limit test submission.',
            ])->assertAccepted();
        }

        $this->postJson('/api/v1/contact', [
            'full_name' => 'Rate Limit Visitor',
            'email' => 'rate-limit@example.com',
            'subject' => 'Attempt 6',
            'message' => 'This request should be rate limited.',
        ])->assertStatus(429);
    }

    public function test_analytics_resolves_only_published_project_slugs(): void
    {
        $published = Project::factory()->create(['slug' => 'published-qa-project', 'is_published' => true]);
        Project::factory()->create(['slug' => 'draft-qa-project', 'is_published' => false]);

        $this->postJson('/api/v1/analytics/events', [
            'event_type' => 'project_view',
            'path' => '/projects/published-qa-project',
            'project_slug' => 'published-qa-project',
            'device_category' => 'desktop',
        ])->assertStatus(202);

        $this->postJson('/api/v1/analytics/events', [
            'event_type' => 'project_view',
            'path' => '/projects/draft-qa-project',
            'project_slug' => 'draft-qa-project',
            'device_category' => 'desktop',
        ])->assertStatus(202);

        $this->assertDatabaseHas('analytics_events', ['project_id' => $published->id]);
        $this->assertDatabaseHas('analytics_events', ['path' => '/projects/draft-qa-project', 'project_id' => null]);
    }

    public function test_non_admin_users_cannot_access_admin_analytics(): void
    {
        $this->actingAs(User::factory()->create(['is_admin' => false]))
            ->getJson('/api/v1/admin/analytics/overview')
            ->assertForbidden();
    }
}

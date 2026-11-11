<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminAccessTest extends TestCase
{
    use RefreshDatabase;

    public function test_dashboard_requires_an_admin_session(): void
    {
        $this->getJson('/api/v1/admin/dashboard')->assertUnauthorized();
        $this->actingAs(User::factory()->create(['is_admin' => false]))->getJson('/api/v1/admin/dashboard')->assertForbidden();
    }

    public function test_admin_can_view_dashboard(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);
        $this->actingAs($admin)->getJson('/api/v1/admin/dashboard')->assertOk()->assertJsonStructure(['metrics']);
    }
}

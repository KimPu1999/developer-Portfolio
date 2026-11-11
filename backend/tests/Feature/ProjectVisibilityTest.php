<?php

namespace Tests\Feature;

use App\Models\Project;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProjectVisibilityTest extends TestCase
{
    use RefreshDatabase;

    public function test_unpublished_projects_are_hidden_from_public_api(): void
    {
        Project::factory()->create(['slug' => 'public-project', 'is_published' => true]);
        Project::factory()->create(['slug' => 'draft-project', 'is_published' => false]);
        $this->getJson('/api/v1/projects')->assertOk()->assertJsonFragment(['slug' => 'public-project'])->assertJsonMissing(['slug' => 'draft-project']);
    }

    public function test_admin_can_create_a_draft_project(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);
        $this->actingAs($admin)->postJson('/api/v1/admin/projects', ['slug' => 'draft-project', 'title' => 'Draft Project', 'category' => 'Enterprise', 'description' => 'A draft project.', 'status' => 'In Development', 'is_published' => false, 'technologies' => ['React']])->assertCreated();
        $this->assertDatabaseHas('projects', ['slug' => 'draft-project', 'is_published' => false]);
    }
}

<?php

namespace Tests\Feature;

use App\Models\Certification;
use App\Models\EducationRecord;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class EducationCertificationTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_profile_exposes_only_published_education_and_certifications(): void
    {
        EducationRecord::create(['title' => 'Public BCA', 'status_label' => 'Graduated', 'is_public' => true]);
        EducationRecord::create(['title' => 'Private education', 'status_label' => 'Second Year', 'is_public' => false]);
        Certification::create(['name' => 'Public certificate', 'is_public' => true]);
        Certification::create(['name' => 'Private certificate', 'is_public' => false]);

        $this->getJson('/api/v1/profile')
            ->assertOk()
            ->assertJsonFragment(['title' => 'Public BCA'])
            ->assertJsonMissing(['title' => 'Private education'])
            ->assertJsonFragment(['name' => 'Public certificate'])
            ->assertJsonMissing(['name' => 'Private certificate']);
    }

    public function test_admin_can_create_update_reorder_and_delete_education(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);
        $response = $this->actingAs($admin)->postJson('/api/v1/admin/education', [
            'title' => 'Bachelor of Science (B.Sc.) in Mathematics',
            'focus' => 'Mathematics',
            'status_label' => 'Second Year',
            'is_public' => true,
        ])->assertCreated();

        $id = $response->json('education.id');
        $this->assertDatabaseHas('education_records', ['id' => $id, 'status_label' => 'Second Year']);
        $this->actingAs($admin)->putJson('/api/v1/admin/education/'.$id, ['title' => 'Updated Mathematics record', 'status_label' => 'Second Year', 'is_public' => false])->assertOk();
        $this->actingAs($admin)->postJson('/api/v1/admin/education/reorder', ['items' => [['id' => $id, 'display_order' => 0]]])->assertOk();
        $this->actingAs($admin)->deleteJson('/api/v1/admin/education/'.$id)->assertOk();
        $this->assertDatabaseMissing('education_records', ['id' => $id]);
    }

    public function test_certificate_upload_rejects_unsupported_files(): void
    {
        Storage::fake('public');
        $admin = User::factory()->create(['is_admin' => true]);
        $certificate = Certification::create(['name' => 'Upload test', 'is_public' => true]);

        $this->actingAs($admin)->post('/api/v1/admin/certifications/'.$certificate->id.'/certificate', [
            'file' => UploadedFile::fake()->create('malware.exe', 20, 'application/x-msdownload'),
            'is_public' => true,
        ])->assertUnprocessable();
    }
}

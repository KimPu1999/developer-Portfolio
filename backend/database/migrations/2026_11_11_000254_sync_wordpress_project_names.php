<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

return new class extends Migration {
    public function up(): void
    {
        DB::transaction(function (): void {
            DB::table('projects')->where('slug', 'f-tech')->update(['title' => 'F-Tech Solution', 'short_title' => 'F-Tech Solution']);
            DB::table('projects')->where('slug', 'fusionsol')->update(['live_url' => 'https://www.fusionsol.com/']);
            DB::table('projects')->where('slug', 'thetys-myanmar')->update(['live_url' => 'https://www.thetysmyanmar.com/']);
            DB::table('projects')->where('slug', 'jarviz')->update(['live_url' => 'https://www.jarvizapp.com/']);
            DB::table('projects')->where('slug', 'f-tech')->update(['live_url' => 'https://f-techsolution.com/']);

            if (DB::table('projects')->where('slug', 'attendent')->doesntExist()) {
                $id = (string) Str::uuid();
                DB::table('projects')->insert([
                    'id' => $id,
                    'slug' => 'attendent',
                    'title' => 'Attendent',
                    'short_title' => 'Attendent',
                    'category' => 'WordPress',
                    'project_type' => 'professional',
                    'company_name' => 'Fusion Solution Co., Ltd.',
                    'role' => 'WordPress Developer',
                    'contributions' => json_encode([]),
                    'description' => 'A professional WordPress project associated with Fusion Solution Co., Ltd. Verified project details, contributions, screenshots and live URL can be added when available.',
                    'status' => 'In Development',
                    'visual_key' => 'wordpress',
                    'image_alt' => 'Abstract interface placeholder for the Attendent WordPress project',
                    'is_featured' => false,
                    'is_published' => true,
                    'display_order' => 4,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
                DB::table('project_technologies')->insert(['project_id' => $id, 'technology' => 'WordPress', 'display_order' => 0]);
            }
        });
    }

    public function down(): void
    {
        DB::table('project_technologies')->whereIn('project_id', DB::table('projects')->where('slug', 'attendent')->pluck('id'))->delete();
        DB::table('projects')->where('slug', 'attendent')->delete();
        DB::table('projects')->where('slug', 'f-tech')->update(['title' => 'F-Tech', 'short_title' => 'F-Tech']);
    }
};

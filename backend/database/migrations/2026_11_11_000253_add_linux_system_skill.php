<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

return new class extends Migration {
    public function up(): void
    {
        $category = DB::table('skill_categories')->where('name', 'Backend')->first();
        if (! $category) {
            return;
        }

        $exists = DB::table('skills')->where('skill_category_id', $category->id)->where('name', 'Linux System')->exists();
        if (! $exists) {
            DB::table('skills')->insert([
                'id' => (string) Str::uuid(),
                'skill_category_id' => $category->id,
                'name' => 'Linux System',
                'description' => 'Linux system and development environment fundamentals.',
                'is_public' => true,
                'display_order' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }

    public function down(): void
    {
        DB::table('skills')->where('name', 'Linux System')->delete();
    }
};

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

return new class extends Migration {
    public function up(): void
    {
        $category = DB::table('skill_categories')->where('name', 'Programming')->first();
        if (! $category) {
            return;
        }

        $exists = DB::table('skills')->where('skill_category_id', $category->id)->where('name', 'Advanced Java Programming')->exists();
        if (! $exists) {
            DB::table('skills')->insert([
                'id' => (string) Str::uuid(),
                'skill_category_id' => $category->id,
                'name' => 'Advanced Java Programming',
                'description' => 'Java programming concepts for structured application development.',
                'is_public' => true,
                'display_order' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }

    public function down(): void
    {
        DB::table('skills')->where('name', 'Advanced Java Programming')->delete();
    }
};

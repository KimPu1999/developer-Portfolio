<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void
    {
        DB::table('skill_categories')->where('name', 'CMS')->update(['name' => 'WordPress Developer', 'description' => 'WordPress development, custom themes and responsive web delivery.']);
    }

    public function down(): void
    {
        DB::table('skill_categories')->where('name', 'WordPress Developer')->update(['name' => 'CMS', 'description' => 'CMS technologies and concepts.']);
    }
};

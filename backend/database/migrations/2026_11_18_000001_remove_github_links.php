<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::table('projects')->update(['github_url' => null]);
        DB::table('social_links')->where('kind', 'github')->update(['is_enabled' => false]);
    }

    public function down(): void
    {
        // GitHub links were intentionally removed and cannot be restored safely.
    }
};

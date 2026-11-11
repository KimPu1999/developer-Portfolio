<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void
    {
        DB::table('projects')->whereIn('slug', ['erp-system', 'pos-system', 'social-discovery', 'digital-wallet'])->update(['github_url' => 'https://github.com/KimPu1999']);
    }

    public function down(): void
    {
        DB::table('projects')->whereIn('slug', ['erp-system', 'pos-system', 'social-discovery', 'digital-wallet'])->update(['github_url' => null]);
    }
};

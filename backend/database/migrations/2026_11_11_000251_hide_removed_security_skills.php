<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    private array $removed = ['Cybersecurity Fundamentals', 'Authentication', 'Authorization', 'Secure Coding'];

    public function up(): void
    {
        DB::table('skills')->whereIn('name', $this->removed)->update(['is_public' => false]);
    }

    public function down(): void
    {
        DB::table('skills')->whereIn('name', $this->removed)->update(['is_public' => true]);
    }
};

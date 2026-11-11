<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('experience_entries', function (Blueprint $table): void {
            $table->string('organization')->nullable()->after('title');
            $table->string('location')->nullable()->after('organization');
            $table->string('employment_dates')->nullable()->after('location');
            $table->string('duration')->nullable()->after('employment_dates');
            $table->jsonb('responsibilities')->nullable()->after('summary');
            $table->jsonb('achievements')->nullable()->after('responsibilities');
            $table->string('experience_type')->default('project')->index()->after('status');
        });
    }

    public function down(): void
    {
        Schema::table('experience_entries', function (Blueprint $table): void {
            $table->dropIndex(['experience_type']);
            $table->dropColumn(['organization', 'location', 'employment_dates', 'duration', 'responsibilities', 'achievements', 'experience_type']);
        });
    }
};

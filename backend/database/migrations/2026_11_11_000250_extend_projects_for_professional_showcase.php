<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('projects', function (Blueprint $table): void {
            $table->string('project_type', 30)->default('personal')->after('category')->index();
            $table->string('company_name')->nullable()->after('project_type');
            $table->string('role')->nullable()->after('company_name');
            $table->jsonb('contributions')->nullable()->after('role');
        });

        Schema::table('project_images', function (Blueprint $table): void {
            $table->string('disk', 30)->default('public')->after('path');
        });
    }

    public function down(): void
    {
        Schema::table('project_images', fn (Blueprint $table) => $table->dropColumn('disk'));
        Schema::table('projects', function (Blueprint $table): void {
            $table->dropIndex(['project_type']);
            $table->dropColumn(['project_type', 'company_name', 'role', 'contributions']);
        });
    }
};

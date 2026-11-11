<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('education_records', function (Blueprint $table): void {
            $table->string('status_label', 80)->nullable()->after('focus');
            $table->string('academic_level', 80)->nullable()->after('status_label');
        });

        Schema::table('certifications', function (Blueprint $table): void {
            $table->string('category', 80)->nullable()->after('name');
            $table->text('description')->nullable()->after('category');
            $table->string('certificate_disk', 40)->default('local')->after('certificate_path');
            $table->string('certificate_mime_type', 120)->nullable()->after('certificate_disk');
            $table->unsignedBigInteger('certificate_size')->nullable()->after('certificate_mime_type');
            $table->unsignedInteger('display_order')->default(0)->after('certificate_size');
            $table->boolean('is_downloadable')->default(false)->after('display_order');
            $table->boolean('is_verified')->default(false)->after('is_downloadable');
            $table->index(['is_public', 'display_order']);
        });
    }

    public function down(): void
    {
        Schema::table('certifications', function (Blueprint $table): void {
            $table->dropIndex('certifications_is_public_display_order_index');
            $table->dropColumn(['category', 'description', 'certificate_disk', 'certificate_mime_type', 'certificate_size', 'display_order', 'is_downloadable', 'is_verified']);
        });

        Schema::table('education_records', function (Blueprint $table): void {
            $table->dropColumn(['status_label', 'academic_level']);
        });
    }
};

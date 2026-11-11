<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('personal_profiles', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->string('display_name')->nullable();
            $table->string('initials', 8)->nullable();
            $table->string('role')->nullable();
            $table->string('subtitle')->nullable();
            $table->text('summary')->nullable();
            $table->text('about')->nullable();
            $table->text('career_objective')->nullable();
            $table->jsonb('focus_areas')->nullable();
            $table->jsonb('interests')->nullable();
            $table->string('profile_image_path')->nullable();
            $table->timestampsTz();
        });

        Schema::create('education_records', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->string('title');
            $table->string('focus')->nullable();
            $table->string('institution')->nullable();
            $table->string('graduation_year', 20)->nullable();
            $table->string('date_label')->nullable();
            $table->jsonb('coursework')->nullable();
            $table->jsonb('related_technologies')->nullable();
            $table->boolean('is_public')->default(true)->index();
            $table->unsignedInteger('display_order')->default(0);
            $table->timestampsTz();
        });

        Schema::create('experience_entries', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->string('title');
            $table->text('summary');
            $table->string('role')->nullable();
            $table->jsonb('technologies')->nullable();
            $table->string('status')->default('In Development');
            $table->string('project_slug')->nullable();
            $table->boolean('is_public')->default(true)->index();
            $table->unsignedInteger('display_order')->default(0);
            $table->timestampsTz();
        });

        Schema::create('resume_metadata', function (Blueprint $table): void {
            $table->id();
            $table->string('title')->default('Resume');
            $table->string('file_path')->nullable();
            $table->date('last_updated')->nullable();
            $table->boolean('is_public')->default(false)->index();
            $table->timestampsTz();
        });

        Schema::create('skill_categories', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->string('name')->unique();
            $table->string('description')->nullable();
            $table->unsignedInteger('display_order')->default(0);
            $table->timestampsTz();
        });

        Schema::create('skills', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->foreignUuid('skill_category_id')->constrained('skill_categories')->cascadeOnDelete();
            $table->string('name');
            $table->text('description')->nullable();
            $table->jsonb('project_slugs')->nullable();
            $table->boolean('is_public')->default(true)->index();
            $table->unsignedInteger('display_order')->default(0);
            $table->timestampsTz();
            $table->unique(['skill_category_id', 'name']);
        });

        Schema::create('projects', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->string('slug')->unique();
            $table->string('title');
            $table->string('short_title')->nullable();
            $table->string('category')->index();
            $table->text('description');
            $table->string('status')->default('In Development')->index();
            $table->text('overview')->nullable();
            $table->text('problem')->nullable();
            $table->jsonb('objectives')->nullable();
            $table->text('solution')->nullable();
            $table->text('development_approach')->nullable();
            $table->text('technical_architecture')->nullable();
            $table->jsonb('planned_modules')->nullable();
            $table->jsonb('challenges')->nullable();
            $table->text('outcomes')->nullable();
            $table->text('lessons_learned')->nullable();
            $table->string('visual_key')->nullable();
            $table->string('image_path')->nullable();
            $table->string('image_alt')->nullable();
            $table->string('github_url')->nullable();
            $table->string('live_url')->nullable();
            $table->boolean('is_featured')->default(false)->index();
            $table->boolean('is_published')->default(false)->index();
            $table->unsignedInteger('display_order')->default(0);
            $table->timestampsTz();
        });

        Schema::create('project_technologies', function (Blueprint $table): void {
            $table->id();
            $table->foreignUuid('project_id')->constrained('projects')->cascadeOnDelete();
            $table->string('technology');
            $table->unsignedInteger('display_order')->default(0);
            $table->unique(['project_id', 'technology']);
        });

        Schema::create('project_images', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->foreignUuid('project_id')->constrained('projects')->cascadeOnDelete();
            $table->string('path');
            $table->string('alt');
            $table->string('caption')->nullable();
            $table->unsignedInteger('display_order')->default(0);
            $table->timestampsTz();
        });

        Schema::create('social_links', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->string('label');
            $table->string('kind')->index();
            $table->string('url');
            $table->boolean('is_enabled')->default(true)->index();
            $table->unsignedInteger('display_order')->default(0);
            $table->timestampsTz();
        });

        Schema::create('contact_messages', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->string('full_name', 120);
            $table->string('email');
            $table->string('subject', 180);
            $table->text('message');
            $table->string('status')->default('unread')->index();
            $table->timestampTz('read_at')->nullable();
            $table->timestampTz('archived_at')->nullable();
            $table->timestampTz('spam_at')->nullable();
            $table->timestampTz('last_reply_at')->nullable();
            $table->string('reply_status')->default('not_replied');
            $table->string('ip_hash', 128)->nullable();
            $table->string('user_agent', 512)->nullable();
            $table->timestampsTz();
            $table->index(['email', 'created_at']);
        });

        Schema::create('contact_message_events', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->foreignUuid('contact_message_id')->constrained('contact_messages')->cascadeOnDelete();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('event');
            $table->jsonb('metadata')->nullable();
            $table->timestampsTz();
        });

        Schema::create('certifications', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('issuer')->nullable();
            $table->date('issue_date')->nullable();
            $table->string('credential_id')->nullable();
            $table->string('verification_url')->nullable();
            $table->string('certificate_path')->nullable();
            $table->boolean('is_public')->default(false)->index();
            $table->timestampsTz();
        });

        Schema::create('media_assets', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->string('disk')->default('public');
            $table->string('path');
            $table->string('original_name')->nullable();
            $table->string('mime_type');
            $table->unsignedBigInteger('size');
            $table->string('mediable_type')->nullable();
            $table->uuid('mediable_id')->nullable();
            $table->boolean('is_public')->default(false)->index();
            $table->timestampsTz();
            $table->index(['mediable_type', 'mediable_id']);
        });

        Schema::create('site_settings', function (Blueprint $table): void {
            $table->id();
            $table->string('key')->unique();
            $table->jsonb('value')->nullable();
            $table->boolean('is_public')->default(false)->index();
            $table->timestampsTz();
        });

        Schema::create('audit_logs', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('action');
            $table->string('auditable_type')->nullable();
            $table->uuid('auditable_id')->nullable();
            $table->jsonb('metadata')->nullable();
            $table->string('ip_address', 45)->nullable();
            $table->timestampsTz();
            $table->index(['auditable_type', 'auditable_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('audit_logs');
        Schema::dropIfExists('site_settings');
        Schema::dropIfExists('media_assets');
        Schema::dropIfExists('certifications');
        Schema::dropIfExists('contact_message_events');
        Schema::dropIfExists('contact_messages');
        Schema::dropIfExists('social_links');
        Schema::dropIfExists('project_images');
        Schema::dropIfExists('project_technologies');
        Schema::dropIfExists('projects');
        Schema::dropIfExists('skills');
        Schema::dropIfExists('skill_categories');
        Schema::dropIfExists('education_records');
        Schema::dropIfExists('personal_profiles');
        Schema::dropIfExists('resume_metadata');
        Schema::dropIfExists('experience_entries');
    }
};

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('analytics_events', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->string('event_type', 40)->index();
            $table->string('path', 500);
            $table->foreignUuid('project_id')->nullable()->constrained('projects')->nullOnDelete();
            $table->string('referrer_domain', 255)->nullable();
            $table->string('device_category', 20)->nullable();
            $table->timestampTz('occurred_at')->index();
            $table->index(['event_type', 'occurred_at']);
        });

        Schema::create('analytics_daily_aggregates', function (Blueprint $table): void {
            $table->id();
            $table->date('day')->unique();
            $table->unsignedBigInteger('page_views')->default(0);
            $table->unsignedBigInteger('project_views')->default(0);
            $table->jsonb('device_breakdown')->nullable();
            $table->jsonb('referrer_breakdown')->nullable();
            $table->timestampsTz();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('analytics_daily_aggregates');
        Schema::dropIfExists('analytics_events');
    }
};

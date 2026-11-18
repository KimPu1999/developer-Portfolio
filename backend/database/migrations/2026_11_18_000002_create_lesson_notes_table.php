<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('lesson_notes', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('lesson_key', 180);
            $table->text('content');
            $table->timestampsTz();
            $table->unique(['user_id', 'lesson_key']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lesson_notes');
    }
};

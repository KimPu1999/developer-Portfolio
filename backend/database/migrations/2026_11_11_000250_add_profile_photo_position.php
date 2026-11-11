<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('personal_profiles', function (Blueprint $table): void {
            $table->string('profile_image_position', 40)->default('center')->after('profile_image_path');
        });
    }

    public function down(): void
    {
        Schema::table('personal_profiles', function (Blueprint $table): void {
            $table->dropColumn('profile_image_position');
        });
    }
};

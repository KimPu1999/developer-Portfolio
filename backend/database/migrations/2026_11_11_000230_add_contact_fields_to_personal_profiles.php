<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('personal_profiles', function (Blueprint $table): void {
            $table->string('email')->nullable()->after('display_name');
            $table->string('phone', 40)->nullable()->after('email');
            $table->string('location')->nullable()->after('phone');
        });
    }

    public function down(): void
    {
        Schema::table('personal_profiles', function (Blueprint $table): void {
            $table->dropColumn(['email', 'phone', 'location']);
        });
    }
};

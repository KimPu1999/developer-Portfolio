<?php

use Illuminate\Database\Migrations\Migration;

return new class extends Migration {
    public function up(): void
    {
        // The Laravel skeleton migration already creates this table.
        // Keep this historical migration as a no-op so a clean install does not
        // attempt to create the same table twice.
    }

    public function down(): void
    {
        // The table belongs to the skeleton migration and must not be removed here.
    }
};

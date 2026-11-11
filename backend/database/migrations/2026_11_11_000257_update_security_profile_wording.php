<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void
    {
        DB::table('personal_profiles')->update([
            'subtitle' => 'BCA Graduate | Studied Cybersecurity',
            'summary' => 'I am a Full-Stack Software Developer and WordPress Developer with 3 years of WordPress development experience, 20+ websites built and academic study in Cybersecurity.',
            'about' => 'I am a Bachelor of Computer Applications (BCA) graduate who studied Cybersecurity and has 3 years of professional WordPress development experience. I have developed more than 20 websites, built custom WordPress themes with personalized layouts and designs, and worked with HTML, CSS, JavaScript and PHP. I also work with React, Laravel and relational databases to build modern full-stack software applications. My project work includes ERP, POS, Social Discovery and Digital Wallet platforms.',
            'career_objective' => 'To contribute as a Software Developer or Full-Stack Developer by applying my programming, database and web development knowledge to reliable, scalable and user-friendly software solutions.',
        ]);
    }

    public function down(): void
    {
        DB::table('personal_profiles')->update([
            'subtitle' => 'BCA Graduate | Cybersecurity Background',
            'summary' => 'I am a Full-Stack Software Developer and WordPress Developer with 3 years of WordPress development experience, 20+ websites built and a strong interest in secure, maintainable web applications.',
            'about' => 'I am a Bachelor of Computer Applications (BCA) graduate with a background in Cybersecurity and 3 years of professional WordPress development experience. I have developed more than 20 websites, built custom WordPress themes with personalized layouts and designs, and worked with HTML, CSS, JavaScript and PHP. I also work with React, Laravel and relational databases to build modern full-stack software applications. My project work includes ERP, POS, Social Discovery and Digital Wallet platforms.',
            'career_objective' => 'To contribute as a Software Developer or Full-Stack Developer by applying my programming, database and cybersecurity knowledge to secure, reliable, scalable and user-friendly software solutions.',
        ]);
    }
};

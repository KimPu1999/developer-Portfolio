<?php

namespace Database\Seeders;

use App\Models\EducationRecord;
use App\Models\Certification;
use App\Models\ExperienceEntry;
use App\Models\PersonalProfile;
use App\Models\Project;
use App\Models\Skill;
use App\Models\SkillCategory;
use App\Models\SocialLink;
use Illuminate\Database\Seeder;

class PortfolioSeeder extends Seeder
{
    public function run(): void
    {
        $profile = PersonalProfile::query()->first() ?? new PersonalProfile();
        $profile->fill([
            'display_name' => 'Thawng Kim Piang', 'email' => 'kimpiang1999@gmail.com', 'phone' => '09954060717', 'location' => 'Tamwe', 'initials' => 'TKP', 'role' => 'Full-Stack Software Developer', 'subtitle' => 'BCA Graduate | Cybersecurity Background',
            'summary' => 'I am a Full-Stack Software Developer and WordPress Developer with 3 years of WordPress development experience, 20+ websites built and a strong interest in secure, maintainable web applications.',
            'about' => 'I am a Bachelor of Computer Applications (BCA) graduate with a background in Cybersecurity and 3 years of professional WordPress development experience. I have developed more than 20 websites, built custom WordPress themes with personalized layouts and designs, and worked with HTML, CSS, JavaScript and PHP. I also work with React, Laravel and relational databases to build modern full-stack software applications. My project work includes ERP, POS, Social Discovery and Digital Wallet platforms.',
            'career_objective' => 'To contribute as a Software Developer or Full-Stack Developer by applying my programming, database and cybersecurity knowledge to secure, reliable, scalable and user-friendly software solutions.',
            'focus_areas' => ['Full-stack web development', 'Secure application development', 'Scalable architecture', 'User-friendly digital solutions'],
            'interests' => ['Frontend and backend integration', 'Relational database design', 'Authentication and authorization'],
        ])->save();

        EducationRecord::query()->updateOrCreate(['title' => 'Bachelor of Computer Applications (BCA)'], [
            'focus' => 'Cybersecurity', 'status_label' => 'Graduated', 'academic_level' => 'Graduated', 'institution' => 'Tilak Maharashtra Vidyapeeth (TMV)', 'location' => 'Pune, India', 'graduation_year' => 'Graduation year to be added', 'date_label' => 'Dates to be added', 'display_order' => 0,
            'related_technologies' => ['Programming fundamentals', 'Web development', 'Databases', 'Cybersecurity fundamentals'], 'is_public' => true,
        ]);
        EducationRecord::query()->updateOrCreate(['title' => 'Bachelor of Science (B.Sc.) in Mathematics'], [
            'focus' => 'Mathematics', 'status_label' => null, 'academic_level' => 'Second Year', 'institution' => 'Kalay University', 'location' => 'Kalay, Myanmar', 'date_label' => 'Dates to be added',
            'related_technologies' => [], 'is_public' => true, 'display_order' => 1,
        ]);

        $certifications = [
            ['name' => 'LCCI Level I', 'category' => 'LCCI'],
            ['name' => 'LCCI Level II', 'category' => 'LCCI'],
            ['name' => 'LCCI Level III', 'category' => 'LCCI'],
            ['name' => 'JavaScript Programming Certificate', 'category' => 'Programming'],
            ['name' => 'C++ Programming Certificate', 'category' => 'Programming'],
        ];
        foreach ($certifications as $order => $certificate) {
            Certification::query()->updateOrCreate(['name' => $certificate['name']], [...$certificate, 'description' => 'Certificate record supplied; issuer and credential details remain pending certificate verification.', 'display_order' => $order, 'is_public' => true, 'is_verified' => false]);
        }

        SocialLink::query()->updateOrCreate(['kind' => 'github'], ['label' => 'GitHub', 'url' => 'https://github.com/KimPu1999', 'is_enabled' => true, 'display_order' => 0]);
        SocialLink::query()->updateOrCreate(['kind' => 'linkedin'], ['label' => 'LinkedIn', 'url' => 'https://www.linkedin.com/in/kim-pu-5189bb2ba/', 'is_enabled' => true, 'display_order' => 1]);

        ExperienceEntry::query()->updateOrCreate(['organization' => 'Fusion Solution Co., Ltd.', 'title' => 'WordPress Developer'], [
            'duration' => '3 years',
            'summary' => 'WordPress website development and custom theme development across more than 20 websites.',
            'responsibilities' => ['Developed over 20 WordPress websites.', 'Built custom WordPress themes with personalized layouts and designs.', 'Developed responsive websites using HTML, CSS, JavaScript and PHP.', 'Worked on website frontend design and WordPress customization.'],
            'achievements' => ['Created professional, maintainable website layouts.'],
            'technologies' => ['WordPress', 'PHP', 'HTML', 'CSS', 'JavaScript', 'Responsive Web Design'],
            'status' => 'Professional experience', 'experience_type' => 'professional', 'is_public' => true, 'display_order' => 0,
        ]);

        $groups = [
            'Frontend' => ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Tailwind CSS'],
            'Backend' => ['PHP', 'Laravel', 'Node.js', 'REST API Development'],
            'Programming' => ['C', 'C++', 'Java', 'Python', 'JavaScript', 'PHP'],
            'Databases' => ['MySQL', 'PostgreSQL', 'SQL'],
            'CMS' => ['WordPress'],
            'Security' => ['Cybersecurity Fundamentals', 'Authentication', 'Authorization', 'Secure Coding', 'Web Application Security', 'Database Security'],
        ];
        foreach ($groups as $order => $names) {
            $category = SkillCategory::query()->updateOrCreate(['name' => $order], ['description' => $order.' technologies and concepts.', 'display_order' => array_search($order, array_keys($groups), true)]);
            foreach ($names as $skillOrder => $name) {
                Skill::query()->updateOrCreate(['skill_category_id' => $category->id, 'name' => $name], ['description' => $name.' for portfolio development work.', 'is_public' => true, 'display_order' => $skillOrder]);
            }
        }

        $projects = [
            ['slug' => 'erp-system', 'short_title' => 'ERP', 'title' => 'Enterprise Resource Planning System', 'category' => 'Enterprise', 'description' => 'An enterprise resource planning platform for organizational operations, procurement, inventory, sales and accounting.', 'visual_key' => 'erp', 'technologies' => ['React', 'TypeScript', 'Laravel', 'PHP', 'PostgreSQL']],
            ['slug' => 'pos-system', 'short_title' => 'POS', 'title' => 'Point of Sale System', 'category' => 'Retail', 'description' => 'A point-of-sale and retail management platform supporting checkout workflows, products, stock, business administration and reporting.', 'visual_key' => 'pos', 'technologies' => ['React', 'TypeScript', 'Laravel', 'PostgreSQL']],
            ['slug' => 'social-discovery', 'short_title' => 'Social', 'title' => 'Social Discovery Platform', 'category' => 'Social', 'description' => 'A social discovery application for profiles, people discovery, content and user connections.', 'visual_key' => 'social', 'technologies' => ['React', 'TypeScript', 'Laravel', 'PostgreSQL']],
            ['slug' => 'digital-wallet', 'short_title' => 'Wallet', 'title' => 'Digital Wallet Platform', 'category' => 'Fintech', 'description' => 'A digital wallet platform project focused on international multi-currency architecture, wallet transactions, authentication and financial security.', 'visual_key' => 'wallet', 'technologies' => ['React', 'TypeScript', 'Laravel', 'PostgreSQL']],
        ];
        foreach ($projects as $order => $data) {
            $technologies = $data['technologies']; unset($data['technologies']);
            $project = Project::query()->updateOrCreate(['slug' => $data['slug']], [...$data, 'status' => 'In Development', 'is_published' => true, 'display_order' => $order, 'image_alt' => 'Abstract interface placeholder for the '.$data['title']]);
            $project->technologies()->delete();
            foreach ($technologies as $technologyOrder => $technology) $project->technologies()->create(['technology' => $technology, 'display_order' => $technologyOrder]);
        }
    }
}

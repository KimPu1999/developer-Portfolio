<?php

namespace Database\Factories;

use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends Factory<Project> */
class ProjectFactory extends Factory
{
    protected $model = Project::class;

    public function definition(): array
    {
        return ['slug' => fake()->unique()->slug(), 'title' => fake()->sentence(3), 'category' => 'Enterprise', 'description' => fake()->sentence(12), 'status' => 'In Development', 'is_published' => false, 'is_featured' => false];
    }
}

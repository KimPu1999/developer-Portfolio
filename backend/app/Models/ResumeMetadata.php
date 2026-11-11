<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ResumeMetadata extends Model
{
    protected $table = 'resume_metadata';
    protected $fillable = ['title', 'file_path', 'last_updated', 'is_public'];

    protected function casts(): array
    {
        return ['last_updated' => 'date', 'is_public' => 'boolean'];
    }
}

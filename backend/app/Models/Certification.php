<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Certification extends Model
{
    use HasUuids;

    protected $fillable = ['name', 'category', 'description', 'issuer', 'issue_date', 'credential_id', 'verification_url', 'certificate_path', 'certificate_disk', 'certificate_mime_type', 'certificate_size', 'display_order', 'is_downloadable', 'is_verified', 'is_public'];

    protected function casts(): array
    {
        return ['issue_date' => 'date', 'certificate_size' => 'integer', 'display_order' => 'integer', 'is_downloadable' => 'boolean', 'is_verified' => 'boolean', 'is_public' => 'boolean'];
    }
}

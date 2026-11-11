<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Certification extends Model
{
    use HasUuids;

    protected $fillable = ['name', 'issuer', 'issue_date', 'credential_id', 'verification_url', 'certificate_path', 'is_public'];

    protected function casts(): array
    {
        return ['issue_date' => 'date', 'is_public' => 'boolean'];
    }
}

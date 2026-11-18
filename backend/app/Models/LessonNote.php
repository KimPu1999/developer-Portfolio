<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LessonNote extends Model
{
    use HasUuids;

    protected $fillable = ['user_id', 'lesson_key', 'content'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}

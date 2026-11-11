<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ContactMessage extends Model
{
    use HasUuids;

    protected $fillable = ['full_name', 'email', 'subject', 'message', 'status', 'read_at', 'archived_at', 'spam_at', 'last_reply_at', 'reply_status', 'ip_hash', 'user_agent'];

    protected function casts(): array
    {
        return ['read_at' => 'datetime', 'archived_at' => 'datetime', 'spam_at' => 'datetime', 'last_reply_at' => 'datetime'];
    }

    public function events(): HasMany
    {
        return $this->hasMany(ContactMessageEvent::class);
    }
}

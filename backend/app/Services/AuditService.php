<?php

namespace App\Services;

use App\Models\AuditLog;
use Illuminate\Foundation\Auth\User;
use Illuminate\Http\Request;

class AuditService
{
    public function record(string $action, ?object $model = null, array $metadata = [], ?Request $request = null): void
    {
        $user = $request?->user();
        AuditLog::create([
            'user_id' => $user instanceof User ? $user->getAuthIdentifier() : null,
            'action' => $action,
            'auditable_type' => $model ? $model::class : null,
            'auditable_id' => $model?->getKey(),
            'metadata' => $metadata,
            'ip_address' => $request?->ip(),
        ]);
    }
}

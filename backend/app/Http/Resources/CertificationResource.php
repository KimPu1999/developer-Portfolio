<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class CertificationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $file = null;
        if ($this->is_public && $this->certificate_path && $this->certificate_disk === 'public') {
            $file = Storage::disk($this->certificate_disk)->url($this->certificate_path);
        }

        return [
            'id' => $this->id,
            'name' => $this->name,
            'category' => $this->category,
            'description' => $this->description,
            'issuer' => $this->issuer,
            'issueDate' => $this->issue_date?->toDateString(),
            'credentialId' => $this->credential_id,
            'verificationUrl' => $this->verification_url,
            'certificateFile' => $file,
            'certificateMimeType' => $this->certificate_mime_type,
            'isDownloadable' => $this->is_public && $this->is_downloadable && $file !== null,
            'isVerified' => $this->is_verified,
            'displayOrder' => $this->display_order,
        ];
    }
}

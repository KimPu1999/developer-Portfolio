<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\MediaAsset;
use App\Models\Certification;
use App\Services\AuditService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class MediaController extends Controller
{
    public function __construct(private readonly AuditService $audit) {}

    public function store(Request $request): JsonResponse
    {
        $request->validate(['file' => ['required', 'file', 'mimes:jpg,jpeg,png,webp,pdf', 'max:10240'], 'is_public' => ['boolean']]);
        $file = $request->file('file');
        $mime = (string) $file->getMimeType();
        abort_unless(in_array($mime, ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'], true), 422, 'Unsupported file type.');
        $path = $file->storeAs('portfolio', Str::uuid()->toString().'.'.$file->extension(), $request->boolean('is_public') ? 'public' : 'local');
        $asset = MediaAsset::create(['disk' => $request->boolean('is_public') ? 'public' : 'local', 'path' => $path, 'original_name' => $file->getClientOriginalName(), 'mime_type' => $mime, 'size' => $file->getSize(), 'is_public' => $request->boolean('is_public')]);
        $this->audit->record('media.uploaded', $asset, ['mime_type' => $mime, 'size' => $file->getSize()], $request);
        return response()->json(['media' => $asset], 201);
    }

    public function storeCertificationCertificate(Request $request, Certification $certification): JsonResponse
    {
        $request->validate(['file' => ['required', 'file', 'mimes:jpg,jpeg,png,webp,pdf', 'max:10240'], 'is_public' => ['sometimes', 'boolean'], 'is_downloadable' => ['sometimes', 'boolean']]);
        $file = $request->file('file');
        $mime = (string) $file->getMimeType();
        abort_unless(in_array($mime, ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'], true), 422, 'Unsupported file type.');
        $isPublic = $request->boolean('is_public') && $certification->is_public;
        $disk = $isPublic ? 'public' : 'local';
        $path = $file->storeAs('certificates', Str::uuid()->toString().'.'.$file->extension(), $disk);
        $certification->update(['certificate_path' => $path, 'certificate_disk' => $disk, 'certificate_mime_type' => $mime, 'certificate_size' => $file->getSize(), 'is_downloadable' => $isPublic && $request->boolean('is_downloadable')]);
        $this->audit->record('certification.file_uploaded', $certification, ['mime_type' => $mime, 'size' => $file->getSize(), 'is_public' => $isPublic], $request);
        $fresh = $certification->fresh();
        $fresh->certificate_url = $isPublic ? Storage::disk('public')->url($path) : null;
        return response()->json(['certification' => $fresh], 201);
    }
}

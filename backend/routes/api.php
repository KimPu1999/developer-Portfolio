<?php

use App\Http\Controllers\Api\V1\AdminDashboardController;
use App\Http\Controllers\Api\V1\AdminAnalyticsController;
use App\Http\Controllers\Api\V1\AnalyticsController;
use App\Http\Controllers\Api\V1\AdminContentController;
use App\Http\Controllers\Api\V1\AdminMessageController;
use App\Http\Controllers\Api\V1\AdminProjectController;
use App\Http\Controllers\Api\V1\AdminProfileController;
use App\Http\Controllers\Api\V1\AdminSkillController;
use App\Http\Controllers\Api\V1\AdminSocialLinkController;
use App\Http\Controllers\Api\V1\MediaController;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\ContactController;
use App\Http\Controllers\Api\V1\PublicContentController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HealthController;

Route::get('/health', HealthController::class);

Route::prefix('v1')->group(function (): void {
    Route::get('/profile', [PublicContentController::class, 'profile']);
    Route::get('/projects', [PublicContentController::class, 'projects']);
    Route::get('/projects/{project:slug}', [PublicContentController::class, 'project']);
    Route::post('/contact', [ContactController::class, 'store'])->middleware('throttle:contact');
    Route::post('/analytics/events', [AnalyticsController::class, 'store'])->middleware('throttle:analytics');

    Route::post('/auth/login', [AuthController::class, 'login'])->middleware('throttle:login');
    Route::post('/auth/forgot-password', [AuthController::class, 'forgotPassword'])->middleware('throttle:login');
    Route::post('/auth/reset-password', [AuthController::class, 'resetPassword']);

    Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function (): void {
        Route::post('/auth/logout', [AuthController::class, 'logout']);
        Route::get('/auth/me', [AuthController::class, 'me']);
        Route::get('/dashboard', AdminDashboardController::class);
        Route::prefix('analytics')->group(function (): void {
            Route::get('/overview', [AdminAnalyticsController::class, 'overview']);
            Route::get('/traffic', [AdminAnalyticsController::class, 'traffic']);
            Route::get('/projects', [AdminAnalyticsController::class, 'projects']);
            Route::get('/referrers', [AdminAnalyticsController::class, 'referrers']);
        });
        Route::get('/messages', [AdminMessageController::class, 'index']);
        Route::get('/messages/{message}', [AdminMessageController::class, 'show']);
        Route::patch('/messages/{message}/status', [AdminMessageController::class, 'updateStatus']);
        Route::apiResource('/projects', AdminProjectController::class);
        Route::post('/projects/{project}/images', [MediaController::class, 'storeProjectImage']);
        Route::delete('/projects/{project}/images/{image}', [MediaController::class, 'deleteProjectImage']);
        Route::get('/skills', [AdminSkillController::class, 'index']);
        Route::post('/skills', [AdminSkillController::class, 'store']);
        Route::patch('/skills/{skill}', [AdminSkillController::class, 'update']);
        Route::delete('/skills/{skill}', [AdminSkillController::class, 'destroy']);
        Route::apiResource('/social-links', AdminSocialLinkController::class)->except(['create', 'edit', 'show']);
        Route::get('/profile', [AdminProfileController::class, 'show']);
        Route::put('/profile', [AdminProfileController::class, 'update']);
        Route::post('/profile/photo', [AdminProfileController::class, 'uploadPhoto']);
        Route::delete('/profile/photo', [AdminProfileController::class, 'removePhoto']);
        Route::get('/education', [AdminContentController::class, 'education']);
        Route::post('/education', [AdminContentController::class, 'saveEducation']);
        Route::post('/education/reorder', [AdminContentController::class, 'reorderEducation']);
        Route::put('/education/{education}', [AdminContentController::class, 'saveEducation']);
        Route::delete('/education/{education}', [AdminContentController::class, 'deleteEducation']);
        Route::get('/certifications', [AdminContentController::class, 'certification']);
        Route::post('/certifications', [AdminContentController::class, 'saveCertification']);
        Route::post('/certifications/reorder', [AdminContentController::class, 'reorderCertifications']);
        Route::put('/certifications/{certification}', [AdminContentController::class, 'saveCertification']);
        Route::delete('/certifications/{certification}', [AdminContentController::class, 'deleteCertification']);
        Route::get('/experience', [AdminContentController::class, 'experience']);
        Route::post('/experience', [AdminContentController::class, 'saveExperience']);
        Route::put('/experience/{experience}', [AdminContentController::class, 'saveExperience']);
        Route::delete('/experience/{experience}', [AdminContentController::class, 'deleteExperience']);
        Route::post('/experience/reorder', [AdminContentController::class, 'reorderExperience']);
        Route::get('/resume', [AdminContentController::class, 'resume']);
        Route::put('/resume', [AdminContentController::class, 'saveResume']);
        Route::post('/media', [MediaController::class, 'store']);
        Route::post('/certifications/{certification}/certificate', [MediaController::class, 'storeCertificationCertificate']);
    });
});

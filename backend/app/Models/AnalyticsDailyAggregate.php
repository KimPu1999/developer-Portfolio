<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AnalyticsDailyAggregate extends Model
{
    protected $fillable = ['day', 'page_views', 'project_views', 'device_breakdown', 'referrer_breakdown'];

    protected function casts(): array
    {
        return ['day' => 'date', 'page_views' => 'integer', 'project_views' => 'integer', 'device_breakdown' => 'array', 'referrer_breakdown' => 'array'];
    }
}

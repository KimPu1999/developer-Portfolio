<?php

namespace App\Console\Commands;

use App\Models\AnalyticsDailyAggregate;
use App\Models\AnalyticsEvent;
use Carbon\CarbonImmutable;
use Illuminate\Console\Command;

class AggregateAnalyticsCommand extends Command
{
    protected $signature = 'portfolio:aggregate-analytics {--date=}';
    protected $description = 'Aggregate privacy-conscious analytics events for one UTC day and apply retention.';

    public function handle(): int
    {
        $day = $this->option('date') ? CarbonImmutable::parse($this->option('date'), 'UTC') : now('UTC')->subDay();
        $from = $day->startOfDay(); $to = $day->endOfDay();
        $events = AnalyticsEvent::whereBetween('occurred_at', [$from, $to])->get(['event_type', 'device_category', 'referrer_domain']);
        $devices = $events->groupBy('device_category')->map->count()->all();
        $referrers = $events->filter(fn ($event) => $event->referrer_domain)->groupBy('referrer_domain')->map->count()->all();
        AnalyticsDailyAggregate::updateOrCreate(['day' => $day->toDateString()], ['page_views' => $events->where('event_type', 'page_view')->count(), 'project_views' => $events->where('event_type', 'project_view')->count(), 'device_breakdown' => $devices, 'referrer_breakdown' => $referrers]);
        AnalyticsEvent::where('occurred_at', '<', now('UTC')->subDays((int) env('ANALYTICS_RETENTION_DAYS', 365)))->delete();
        $this->info('Analytics aggregated for '.$day->toDateString().'.');
        return self::SUCCESS;
    }
}

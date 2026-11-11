<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\AnalyticsEvent;
use Carbon\CarbonImmutable;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminAnalyticsController extends Controller
{
    public function overview(Request $request): JsonResponse
    {
        [$from, $to] = $this->bounds($request);
        $events = AnalyticsEvent::query()->whereBetween('occurred_at', [$from, $to]);
        $daily = $events->clone()->selectRaw("DATE(occurred_at AT TIME ZONE 'UTC') AS day, COUNT(*) FILTER (WHERE event_type = 'page_view') AS page_views, COUNT(*) FILTER (WHERE event_type = 'project_view') AS project_views")->groupByRaw("DATE(occurred_at AT TIME ZONE 'UTC')")->orderBy('day')->get();
        $topPages = $events->clone()->where('event_type', 'page_view')->select('path')->selectRaw('COUNT(*) AS views')->groupBy('path')->orderByDesc('views')->limit(10)->get();

        return response()->json(['range' => ['from' => $from->toDateString(), 'to' => $to->toDateString()], 'metrics' => ['pageViews' => (clone $events)->where('event_type', 'page_view')->count(), 'projectViews' => (clone $events)->where('event_type', 'project_view')->count(), 'estimatedUniqueVisitors' => null], 'traffic' => $daily, 'topPages' => $topPages]);
    }

    public function traffic(Request $request): JsonResponse
    {
        [$from, $to] = $this->bounds($request);
        return response()->json(['data' => AnalyticsEvent::query()->whereBetween('occurred_at', [$from, $to])->selectRaw("DATE(occurred_at AT TIME ZONE 'UTC') AS day, COUNT(*) AS events, COUNT(*) FILTER (WHERE event_type = 'page_view') AS page_views, COUNT(*) FILTER (WHERE event_type = 'project_view') AS project_views")->groupByRaw("DATE(occurred_at AT TIME ZONE 'UTC')")->orderBy('day')->get()]);
    }

    public function projects(Request $request): JsonResponse
    {
        [$from, $to] = $this->bounds($request);
        return response()->json(['data' => AnalyticsEvent::query()->leftJoin('projects', 'projects.id', '=', 'analytics_events.project_id')->whereBetween('occurred_at', [$from, $to])->where('event_type', 'project_view')->selectRaw('analytics_events.project_id, projects.slug, projects.title, COUNT(*) AS views')->groupBy('analytics_events.project_id', 'projects.slug', 'projects.title')->orderByDesc('views')->limit(20)->get()]);
    }

    public function referrers(Request $request): JsonResponse
    {
        [$from, $to] = $this->bounds($request);
        return response()->json(['data' => AnalyticsEvent::query()->whereBetween('occurred_at', [$from, $to])->whereNotNull('referrer_domain')->select('referrer_domain')->selectRaw('COUNT(*) AS views')->groupBy('referrer_domain')->orderByDesc('views')->limit(20)->get()]);
    }

    private function bounds(Request $request): array
    {
        $data = $request->validate(['range' => ['nullable', 'in:7,30,90,custom'], 'from' => ['nullable', 'date'], 'to' => ['nullable', 'date', 'after_or_equal:from']]);
        $to = isset($data['to']) ? CarbonImmutable::parse($data['to'], 'UTC')->endOfDay() : now('UTC')->endOfDay();
        $from = isset($data['from']) ? CarbonImmutable::parse($data['from'], 'UTC')->startOfDay() : $to->subDays((int) ($data['range'] ?? 30) - 1)->startOfDay();
        abort_if($from->diffInDays($to) > 366, 422, 'The analytics range cannot exceed 366 days.');
        return [$from, $to];
    }
}

# Privacy-conscious analytics

Analytics is disabled unless `VITE_ANALYTICS_ENABLED=true` and the visitor grants consent. Do Not Track disables collection. The client records page/project event type, path, optional referrer hostname and a broad device category. It does not send contact form fields, raw IP addresses or admin sessions.

Laravel stores events in `analytics_events`, aggregates daily counts with `portfolio:aggregate-analytics`, and deletes events older than `ANALYTICS_RETENTION_DAYS`. Admin endpoints are protected by Sanctum and the admin middleware. Unique visitors are intentionally reported as unavailable because this implementation does not use a visitor identifier or fingerprint.

Run the daily scheduler and review retention requirements with the applicable privacy policy before enabling collection.

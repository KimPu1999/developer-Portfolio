# Production readiness

## Status: NOT READY FOR LAUNCH

The implementation is prepared for a controlled staging setup, but the launch gate is not satisfied.

## Verified

- Frontend source has route-level code splitting, theme persistence, SEO hooks, analytics consent and Vercel configuration.
- Laravel source has versioned API routes, migrations, session authentication, validation, rate limits, security headers and queued contact notification wiring.
- Production setup, backup, rollback, domain and security documentation exists.

## Blocked or required before approval

- Install Composer dependencies and generate/commit a verified `composer.lock`.
- Run Laravel migrations and feature tests against isolated PostgreSQL.
- Configure real staging environment values without committing secrets.
- Verify Sanctum CSRF/session behavior across the final frontend/API origins.
- Verify queue workers, SMTP notification dispatch, storage and health checks.
- Run Playwright/axe/browser responsive checks.
- Configure a real domain, HTTPS, `VITE_SITE_URL`, sitemap and monitoring.
- Take and restore a real database/media backup.

Do not deploy until these gates pass and a human approves the launch checklist.

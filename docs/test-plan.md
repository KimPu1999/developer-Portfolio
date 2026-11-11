# Phase 6 test plan

## Local automated checks

```bash
npm ci
npm run typecheck
npm run test:static
npm run build
cd backend
composer install
php artisan migrate --env=testing
php artisan test
```

Use an isolated PostgreSQL test database for the backend CI job. Never use `migrate:fresh` against production.

## Browser checks

When Playwright is installed, cover public navigation, skills/project filters, project gallery keyboard behavior, contact validation, theme persistence, admin login protection and logout. Run the same suite at 320, 375, 390, 768, 1024, 1440 and 1920 CSS pixels.

## Current status

- **Verified:** static source checks and route smoke checks when the Vite server is available.
- **Blocked:** Laravel feature tests because `backend/vendor/autoload.php` is unavailable after Packagist timeouts.
- **Not tested:** Playwright, axe, real PostgreSQL, real SMTP, production queues and provider deployments.

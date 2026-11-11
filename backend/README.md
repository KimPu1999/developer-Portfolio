# Portfolio API

This directory contains the Phase 4 Laravel API for the React portfolio. It is intentionally separate from the existing Vite application.

## Local setup

1. Install PHP 8.3+, Composer, PostgreSQL and a queue-capable PHP runtime.
2. Copy `.env.example` to `.env` and set `APP_KEY`, PostgreSQL credentials, `FRONTEND_URL`, `SANCTUM_STATEFUL_DOMAINS`, `ADMIN_NOTIFICATION_EMAIL` and mail settings.
3. Run `composer install` and `php artisan key:generate`.
4. Run `php artisan migrate --seed`. This is an additive migration path; do not run `migrate:fresh` against a populated database.
5. Provision the first administrator interactively: `php artisan portfolio:provision-admin admin@example.com --name="Portfolio Admin"`.
6. Start the API with `php artisan serve` and process queued notifications with `php artisan queue:work --tries=3`.

Development uses Laravel's `log` mailer by default. Production SMTP configuration belongs in the environment only. A logged message is not confirmation of delivery by an email provider.

## API

Public endpoints:

- `GET /api/v1/profile`
- `GET /api/v1/projects`
- `GET /api/v1/projects/{slug}`
- `POST /api/v1/contact`
- `POST /api/v1/analytics/events` (consent required on the frontend)
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/forgot-password`
- `POST /api/v1/auth/reset-password`

Admin endpoints use Sanctum's first-party session cookie and CSRF protection:

- `GET /sanctum/csrf-cookie`
- `GET|POST /api/v1/admin/auth/me|logout`
- `GET /api/v1/admin/dashboard`
- `GET /api/v1/admin/analytics/overview`
- `GET /api/v1/admin/analytics/traffic`
- `GET /api/v1/admin/analytics/projects`
- `GET /api/v1/admin/analytics/referrers`
- `GET /api/v1/admin/messages`
- `PATCH /api/v1/admin/messages/{id}/status`
- `GET|POST|PUT|DELETE /api/v1/admin/projects`
- `GET|POST|PATCH|DELETE /api/v1/admin/skills`
- `GET|POST|PUT|DELETE /api/v1/admin/social-links`
- `GET|PUT /api/v1/admin/profile`

Operational endpoint:

- `GET /api/health` returns a minimal application status response and does not expose database or environment details.

The public project query always filters `is_published = true`. Project edits use database transactions for the project and technology rows. Public URLs are restricted to HTTP(S) in project validation and social links use an explicit scheme allowlist.

## Security and operations

- Use HTTPS and secure, HTTP-only session cookies in production.
- Set `SESSION_SECURE_COOKIE=true`, a same-site session domain, and an explicit frontend allowlist.
- Keep `APP_KEY`, database passwords, SMTP credentials and provider credentials outside source control.
- Back up PostgreSQL before migrations and test restoration separately.
- Review `audit_logs` and remove contact records according to the retention policy that you choose.
- Uploaded media should be added through a future authenticated media endpoint after MIME, signature, size and storage visibility checks. The schema is ready for that workflow; no unsafe upload endpoint is exposed yet.

## Testing

Use a dedicated PostgreSQL test database and run:

```bash
php artisan migrate --env=testing
php artisan test
```

The feature tests cover contact validation/persistence, admin authorization and draft project isolation. Mail and notification behavior should be extended with provider-specific integration tests when SMTP credentials are configured.

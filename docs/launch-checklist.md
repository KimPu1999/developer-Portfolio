# Launch approval checklist

## Application

- [ ] `npm ci`, typecheck, static QA tests and production build pass.
- [ ] Composer install succeeds and `composer.lock` is reviewed.
- [ ] PostgreSQL migrations and Laravel tests pass on staging.
- [ ] Public routes, project visibility, contact form and 404 behavior pass browser QA.
- [ ] Admin login, logout, authorization, CRUD, media validation and audit logging pass staging QA.

## Security and operations

- [ ] `APP_ENV=production`, `APP_DEBUG=false` and an established `APP_KEY` are configured.
- [ ] HTTPS, secure HTTP-only cookies, exact CORS and Sanctum stateful domains are verified.
- [ ] SMTP, SPF, DKIM, DMARC, queue worker and failed-job monitoring are verified.
- [ ] PostgreSQL and published media backups exist and a restore test is recorded.
- [ ] Rollback procedure and protected deployment approval are ready.

## SEO and monitoring

- [ ] Real canonical domain is configured and sitemap generation succeeds.
- [ ] robots, canonical and structured-data validation passes on staging.
- [ ] Health checks, application logs and provider alerts are configured.
- [ ] Real Core Web Vitals are measured and recorded.

Production deployment remains intentionally pending explicit approval.

# Production readiness checklist

- [ ] Configure a real frontend domain and `VITE_SITE_URL`.
- [ ] Configure the Laravel API domain, HTTPS and exact CORS/stateful domains.
- [ ] Install dependencies and commit a verified `backend/composer.lock`.
- [ ] Run migrations against a backup; never run `migrate:fresh`.
- [ ] Provision the admin interactively and verify password reset.
- [ ] Configure SMTP, SPF, DKIM, DMARC and a queue worker.
- [ ] Configure PostgreSQL least privilege, TLS, backups and restore testing.
- [ ] Configure `APP_DEBUG=false`, secure cookies, CSP and HSTS after HTTPS verification.
- [ ] Run frontend build, backend tests, migration tests, dependency audits and smoke checks.
- [ ] Set `VITE_ANALYTICS_ENABLED` only after consent/privacy review.
- [ ] Submit and validate the production sitemap in Search Console.
- [ ] Run Lighthouse or equivalent and record real Core Web Vitals.
- [ ] Use a manual approval for production deployment.

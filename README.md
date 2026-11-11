# Full-Stack Software Developer Portfolio

Phase 1 and Phase 2 portfolio built with React, TypeScript, Vite, Tailwind CSS, Motion for React, Lucide React and React Router.

## Run locally

```bash
npm install
npm run dev
```

The contact form uses FormSubmit's cross-origin AJAX endpoint and does not
require the Laravel backend. On the first submission, FormSubmit sends an
activation email to the configured recipient; click that confirmation link
before expecting messages to arrive.

The optional Laravel API can still be started in a second terminal for the
admin and database-backed portfolio features:

```bash
cd backend
touch database/database.sqlite
composer install
php artisan migrate --seed
php artisan serve
```

During local development, Vite proxies `/api` and `/sanctum` to
`http://localhost:8000`. For a separately hosted API, create a frontend
`.env.local` file with `VITE_API_URL=https://your-api.example.com/api/v1`.

## Verify a production build

```bash
npm run typecheck
npm run build
```

## Customize

Editable content is separated into typed modules:

- [`src/data/profile.ts`](src/data/profile.ts) — name, about text, focus areas and contact placeholders
- [`src/data/education.ts`](src/data/education.ts) — BCA record and editable institution/date fields
- [`src/data/skills.ts`](src/data/skills.ts) — categorized skills, descriptions and project references
- [`src/data/projects.ts`](src/data/projects.ts) — project cards and verified-link placeholders
- [`src/data/experience.ts`](src/data/experience.ts) — project-based experience derived from project data
- [`src/data/certifications.ts`](src/data/certifications.ts) — empty until verified credentials are supplied
- [`src/data/resume.ts`](src/data/resume.ts) — optional PDF path and last-updated field
- [`src/data/projects.ts`](src/data/projects.ts) — typed project registry, planned modules and case-study content

The Projects page stores search, category, technology, status and sort state in URL search parameters. Add `VITE_SITE_URL` when deploying to enable canonical and project Open Graph URLs. Real screenshots can be added through the optional `screenshots` field; the gallery stays in an explicit empty state until images are supplied.

Add real email, GitHub, LinkedIn, location, university, dates and certification details only when verified. Project repository/live-demo buttons and resume actions remain hidden until real URLs/files are configured. A real PDF can be placed in `public/resume/` and then referenced from `src/data/resume.ts`.

The theme uses the system preference on the first visit and stores later choices in `localStorage` under `portfolio-theme`.

## Phase 4 backend

The `backend/` directory contains an additive Laravel 13 API with Sanctum-ready session authentication, PostgreSQL migrations, public project/profile endpoints, contact message persistence, rate limiting, queued notification wiring, audit records and protected admin routes. See [`backend/README.md`](backend/README.md) for setup, provisioning, queue and security instructions.

The frontend uses `VITE_API_URL` for the optional API base URL and keeps the public static content as the intentional fallback until a backend environment is configured. Contact submissions use the configured email in [`src/data/profile.ts`](src/data/profile.ts) through FormSubmit's AJAX endpoint.

## Phase 5 production preparation

Phase 5 adds consent-aware analytics storage/API, an admin analytics screen, route-level code splitting, SEO metadata and structured data hooks, sitemap generation, robots rules, Vercel configuration, Laravel security headers, `/api/health`, scheduled analytics aggregation, CI configuration and provider-neutral production documentation. See the files in [`docs/`](docs/) for deployment, domain, security, analytics, backup and release checklists.

## Phase 6 quality gate

Phase 6 adds the public Experience route, migration safety correction, CSP coverage, dialog accessibility improvements, static QA tests and launch-review documentation. The site is not marked launch-ready until Composer dependencies, isolated PostgreSQL tests, browser accessibility checks, production configuration and backup/rollback verification are complete. See [`docs/production-readiness.md`](docs/production-readiness.md) and [`docs/qa-report.md`](docs/qa-report.md).

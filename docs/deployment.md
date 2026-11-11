# Deployment overview

The frontend is a Vite SPA intended for Vercel. The Laravel API is deployed separately with the Laravel `public/` directory as its document root. Set `VITE_SITE_URL` to the final HTTPS frontend URL during the frontend build and set `FRONTEND_URL` plus `SANCTUM_STATEFUL_DOMAINS` to the exact frontend origin(s) in Laravel.

Production deployment is intentionally manual. Build and verify the release first, then use the hosting provider's approval flow. Do not place Laravel secrets in `VITE_` variables.

Frontend commands:

```bash
npm ci
VITE_SITE_URL=https://yourdomain.com npm run build
```

API commands after configuring the production environment:

```bash
composer install --no-dev --prefer-dist --optimize-autoloader
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan storage:link
php artisan queue:work --tries=3
```

Run migrations against a backup and never use `migrate:fresh` in production.

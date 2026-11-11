# Vercel frontend

Use the repository root as the Vercel project directory. Vercel should run `npm ci` and `npm run build`, with the output directory `dist`.

Required public environment variables:

- `VITE_SITE_URL`: final canonical HTTPS frontend URL
- `VITE_API_URL`: Laravel API URL ending in `/api/v1`
- `VITE_ANALYTICS_ENABLED`: `true` only after consent and privacy review are ready

The `vercel.json` rewrite preserves React Router refreshes and adds baseline response headers. Keep backend secrets, SMTP credentials and database values out of Vercel frontend variables. Preview deployments should use a matching preview API origin or leave API-backed features visibly unavailable.

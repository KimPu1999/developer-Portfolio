# Phase 6 SEO validation

## Verified by source review

- Page titles and descriptions are set through `PageMeta`.
- Canonical, Open Graph, Twitter and optional JSON-LD metadata use `VITE_SITE_URL`.
- Admin pages use `noindex,nofollow`.
- `public/robots.txt` disallows admin and API paths.
- Sitemap generation is conditional on a configured real `VITE_SITE_URL` and does not publish a fake domain.
- Vercel rewrites support React Router refreshes.

## Not tested or blocked

- **Blocked:** production sitemap generation because the real domain is not configured.
- **Not tested:** Google Search Console, structured-data validation, crawl behavior, redirects and index status.
- **Limitation:** the current Vite SPA renders route content in the browser. SSR or prerendering is still required if dynamic project content must be present in initial server HTML.

# SEO and indexing

Set `VITE_SITE_URL` to the verified production URL. The frontend updates titles, descriptions, canonical URLs, Open Graph, Twitter cards, robots directives and optional JSON-LD through `PageMeta`. Home and project pages emit WebSite, Person and CreativeWork/Breadcrumb data only when a configured site URL exists.

`npm run build` generates `dist/sitemap.xml` when `VITE_SITE_URL` is present. It omits the file when the domain is unknown rather than publishing a fake URL. `public/robots.txt` disallows `/admin` and `/api/`; the generated production robots file adds the sitemap URL.

Submit the final sitemap URL in Search Console after DNS/domain verification. Validate canonical URLs, robots access, sitemap parsing and structured data with Google's tools. Indexing and Search Console verification are manual provider actions and are not claimed here.

The current frontend remains a Vite client-rendered SPA: Vercel serves the application shell and React renders route content in the browser. Route-level code splitting improves loading performance, but it does not provide server-rendered HTML for dynamic project pages. If search visibility for dynamic content becomes a priority, add a verified SSR or prerendering pipeline before launch and revalidate the generated metadata in production.

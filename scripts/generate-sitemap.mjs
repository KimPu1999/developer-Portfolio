import { mkdir, readFile, writeFile } from 'node:fs/promises'

const siteUrl = (process.env.VITE_SITE_URL || '').replace(/\/$/, '')
if (!siteUrl) {
  console.warn('VITE_SITE_URL is not configured; sitemap.xml was not generated.')
  process.exit(0)
}

const slugs = ['erp-system', 'pos-system', 'social-discovery', 'digital-wallet']
const paths = ['/', '/about', '/skills', '/education', '/projects', '/contact', ...slugs.map((slug) => `/projects/${slug}`)]
const urls = paths.map((path) => `  <url><loc>${siteUrl}${path}</loc></url>`).join('\n')
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
await mkdir('dist', { recursive: true })
await writeFile('dist/sitemap.xml', sitemap)
const robotsPath = 'dist/robots.txt'
const robots = await readFile(robotsPath, 'utf8').catch(() => 'User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api/\n')
await writeFile(robotsPath, `${robots.trim()}\nSitemap: ${siteUrl}/sitemap.xml\n`)
console.log(`Generated ${paths.length} sitemap URLs for ${siteUrl}`)

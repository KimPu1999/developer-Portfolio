import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import test from 'node:test'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const read = (path) => readFile(resolve(root, path), 'utf8')

test('public routes include the complete portfolio surface', async () => {
  const app = await read('src/App.tsx')
  for (const route of ['/', '/about', '/skills', '/projects', '/education', '/experience', '/certifications', '/resume', '/contact']) {
    assert.match(app, new RegExp(`path="${route === '/' ? '\\/' : route}"`), `missing route ${route}`)
  }
  assert.match(app, /path="\*" element={<NotFoundPage \/>}\s*\/>/)
})

test('navigation exposes public routes and admin navigation is protected', async () => {
  const header = await read('src/components/layout/Header.tsx')
  assert.match(header, /label: 'Experience', to: '\/experience'/)
  assert.match(header, /label: 'Contact', to: '\/contact'/)
  const adminRoutes = await read('backend/routes/api.php')
  assert.match(adminRoutes, /auth:sanctum', 'admin'/)
})

test('public project data does not claim completed project status', async () => {
  const projects = await read('src/data/projects.ts')
  assert.doesNotMatch(projects, /status:\s*'Completed'/)
  assert.match(projects, /status:\s*'In Development'/)
})

test('education and certification records preserve supplied academic status', async () => {
  const education = await read('src/data/education.ts')
  assert.match(education, /title:\s*'Bachelor of Computer Applications \(BCA\)'/)
  assert.match(education, /status:\s*'Graduated'/)
  assert.match(education, /institution:\s*'Tilak Maharashtra Vidyapeeth \(TMV\)'/)
  assert.match(education, /location:\s*'Pune, India'/)
  assert.match(education, /title:\s*'Bachelor of Science \(B\.Sc\.\) in Mathematics'/)
  assert.match(education, /academicLevel:\s*'Second Year'/)
  assert.match(education, /institution:\s*'Kalay University'/)
  assert.match(education, /location:\s*'Kalay, Myanmar'/)
  assert.doesNotMatch(education, /B\.Sc[\s\S]{0,500}status:\s*'Graduated'/)
  const certifications = await read('src/data/certifications.ts')
  for (const title of ['LCCI Level I', 'LCCI Level II', 'LCCI Level III', 'JavaScript Programming Certificate', 'C++ Programming Certificate']) assert.match(certifications, new RegExp(title.replace(/[+]/g, '\\$&')))
  assert.doesNotMatch(certifications, /London Chamber of Commerce/)
})

test('certificate actions are conditional on configured files and download permission', async () => {
  const card = await read('src/components/certifications/CertificationCard.tsx')
  assert.match(card, /item\.certificateFile &&/)
  assert.match(card, /item\.isDownloadable/)
  const resources = await read('backend/app/Http/Resources/CertificationResource.php')
  assert.match(resources, /certificate_disk === 'public'/)
  assert.match(resources, /isDownloadable/)
})

test('security and crawl controls are present', async () => {
  const vercel = JSON.parse(await read('vercel.json'))
  const headers = vercel.headers.flatMap((entry) => entry.headers)
  const csp = headers.find((header) => header.key === 'Content-Security-Policy')
  assert.ok(csp)
  assert.match(csp.value, /object-src 'none'/)
  assert.match(csp.value, /frame-ancestors 'none'/)
  const robots = await read('public/robots.txt')
  assert.match(robots, /Disallow: \/admin/)
  assert.match(robots, /Disallow: \/api\//)
  const sitemapScript = await read('scripts/generate-sitemap.mjs')
  assert.match(sitemapScript, /'\/experience'/)
})

test('analytics and health endpoints are explicitly registered', async () => {
  const routes = await read('backend/routes/api.php')
  assert.match(routes, /Route::get\('\/health', HealthController::class\)/)
  assert.match(routes, /Route::post\('\/analytics\/events'/)
  assert.match(routes, /Route::get\('\/overview', \[AdminAnalyticsController::class, 'overview'\]\)/)
})

test('duplicate Laravel skeleton table migrations are inert', async () => {
  const passwordTokens = await read('backend/database/migrations/2026_11_11_000120_create_password_reset_tokens_table.php')
  const sessions = await read('backend/database/migrations/2026_11_11_000130_create_sessions_table.php')
  assert.doesNotMatch(passwordTokens, /Schema::create\(/)
  assert.doesNotMatch(sessions, /Schema::create\(/)
})

test('frontend source does not use raw HTML injection', async () => {
  const app = await read('src/App.tsx')
  assert.doesNotMatch(app, /dangerouslySetInnerHTML/)
})

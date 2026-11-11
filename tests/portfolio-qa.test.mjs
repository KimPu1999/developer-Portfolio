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

test('professional WordPress projects remain separate from personal software projects', async () => {
  const projects = await read('src/data/projects.ts')
  for (const title of ['FusionSol', 'Thetys Myanmar', 'Jarviz', 'F-Tech Solution', 'Attendent']) assert.match(projects, new RegExp(`title: '${title}'`))
  assert.match(projects, /projectType: 'professional'/)
  assert.match(projects, /company: 'Fusion Solution Co\., Ltd\.'/)
  for (const title of ['ERP System', 'CIINLV POS System', 'Social Discovery', 'Moneta Digital Wallet']) assert.match(projects, new RegExp(`title: '${title}'`))
  assert.match(projects, /projectType: 'personal'/)
  const migration = await read('backend/database/migrations/2026_11_11_000250_extend_projects_for_professional_showcase.php')
  assert.match(migration, /project_type/)
  assert.match(migration, /company_name/)
  assert.match(migration, /contributions/)
  const projectSync = await read('backend/database/migrations/2026_11_11_000254_sync_wordpress_project_names.php')
  assert.match(projectSync, /attendent/)
  assert.match(projectSync, /F-Tech Solution/)
  for (const url of ['https:\/\/www\.fusionsol\.com\/', 'https:\/\/www\.jarvizapp\.com\/', 'https:\/\/f-techsolution\.com\/', 'https:\/\/www\.thetysmyanmar\.com\/']) assert.match(projects, new RegExp(`liveUrl: '${url}'`))
  assert.equal((projects.match(/githubUrl: 'https:\/\/github\.com\/KimPu1999'/g) ?? []).length, 4)
  const githubMigration = await read('backend/database/migrations/2026_11_11_000255_add_personal_project_github_profile_links.php')
  assert.match(githubMigration, /github\.com\/KimPu1999/)
  assert.match(projects, /const professionalCaseStudy/)
  const details = await read('src/pages/ProjectDetailPage.tsx')
  assert.match(details, /const project = remoteProject \|\| staticProject/)
})

test('removed security skills are absent from the public skill catalog', async () => {
  const skills = await read('src/data/skills.ts')
  for (const name of ['Cybersecurity Fundamentals', 'Authentication', 'Authorization', 'Secure Coding']) assert.doesNotMatch(skills, new RegExp(`name: '${name}'`))
  const profile = await read('src/data/profile.ts')
  assert.doesNotMatch(profile, /Authentication and authorization/)
  const migration = await read('backend/database/migrations/2026_11_11_000251_hide_removed_security_skills.php')
  assert.match(migration, /is_public.*false/)
})

test('advanced Java programming is listed in the programming skills', async () => {
  const skills = await read('src/data/skills.ts')
  assert.match(skills, /name: 'Advanced Java Programming'/)
  const seeder = await read('backend/database/seeders/PortfolioSeeder.php')
  assert.match(seeder, /'Advanced Java Programming'/)
})

test('Linux System is listed in the backend skills', async () => {
  const skills = await read('src/data/skills.ts')
  assert.match(skills, /name: 'Linux System'/)
  const seeder = await read('backend/database/seeders/PortfolioSeeder.php')
  assert.match(seeder, /'Linux System'/)
})

test('WordPress skill category is presented as WordPress Developer', async () => {
  const skills = await read('src/data/skills.ts')
  assert.match(skills, /name: 'WordPress Developer'/)
  const migration = await read('backend/database/migrations/2026_11_11_000258_rename_cms_skill_category.php')
  assert.match(migration, /WordPress Developer/)
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

test('resume metadata points to the generated public PDF', async () => {
  const resume = await read('src/data/resume.ts')
  assert.match(resume, /filePath: '\/resume\/resume\.pdf'/)
  const { stat } = await import('node:fs/promises')
  const pdf = await stat(resolve(root, 'public/resume/resume.pdf'))
  assert.ok(pdf.size > 0)
  const pdfText = (await readFile(resolve(root, 'public/resume/resume.pdf'))).toString('latin1')
  assert.match(pdfText, /PROFESSIONAL EXPERIENCE/)
  assert.match(pdfText, /Fusion Solution Co\.?, Ltd\./)
  assert.match(pdfText, /WordPress Developer/)
  assert.match(pdfText, /3 years/)
  assert.match(pdfText, /\(WordPress Developer\)/)
  assert.doesNotMatch(pdfText, /\(CMS\)/)
  assert.doesNotMatch(pdfText, /Cybersecurity Fundamentals, Authentication/)
  assert.doesNotMatch(pdfText, /Authorization, Secure Coding/)
  assert.match(pdfText, /Web Application Security, Database Security/)
  assert.equal((pdfText.match(/\/Subtype \/Link/g) ?? []).length, 5)
  assert.match(pdfText, /mailto:kimpiang1999@gmail\.com/)
  assert.match(pdfText, /tel:\+959954060717/)
  assert.match(pdfText, /https:\/\/github\.com\/KimPu1999/)
  assert.match(pdfText, /https:\/\/www\.linkedin\.com\/in\/kim-pu-5189bb2ba\//)
  assert.match(pdfText, /Portfolio website/)
  assert.match(pdfText, /https:\/\/developer-portfolio-one\.netlify\.app\//)
  assert.match(pdfText, /\/Subtype \/Image/)
  assert.match(pdfText, /\/Im1 15 0 R/)
})

test('verified profile contact details are wired without inventing social URLs', async () => {
  const profile = await read('src/data/profile.ts')
  assert.match(profile, /displayName: 'Thawng Kim Piang'/)
  assert.match(profile, /kimpiang1999@gmail\.com/)
  assert.match(profile, /09954060717/)
  assert.match(profile, /value: 'Tamwe'/)
  assert.match(profile, /https:\/\/github\.com\/KimPu1999/)
  assert.match(profile, /https:\/\/www\.linkedin\.com\/in\/kim-pu-5189bb2ba\//)
})

test('professional WordPress experience is represented with supplied facts only', async () => {
  const profile = await read('src/data/profile.ts')
  const experience = await read('src/data/experience.ts')
  assert.match(profile, /3 years of professional WordPress development experience/)
  assert.match(profile, /more than 20 websites/)
  assert.match(experience, /organization: 'Fusion Solution Co\., Ltd\.'/)
  assert.match(experience, /title: 'WordPress Developer'/)
  assert.match(experience, /duration: '3 years'/)
  assert.match(experience, /Built custom WordPress themes/)
  assert.match(experience, /responsibilities:/)
  assert.doesNotMatch(experience, /employmentDates:/)
})

test('WordPress projects are API-driven and admin experience CRUD is protected', async () => {
  const projects = await read('src/pages/ProjectsPage.tsx')
  assert.match(projects, /publicProjects\(\)/)
  assert.match(projects, /project\.category === 'WordPress'/)
  const admin = await read('src/App.tsx')
  assert.match(admin, /path="experience" element={<AdminExperiencePage \/>}/)
  const routes = await read('backend/routes/api.php')
  assert.match(routes, /deleteExperience/)
  assert.match(routes, /experience\/reorder/)
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

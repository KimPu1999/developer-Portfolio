import { lazy, Suspense } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { useTheme } from './hooks/useTheme'
import { AnalyticsConsent } from './analytics/AnalyticsConsent'
import { AnalyticsTracker } from './analytics/AnalyticsTracker'
const HomePage = lazy(() => import('./pages/HomePage').then((module) => ({ default: module.HomePage })))
const AboutPage = lazy(() => import('./pages/AboutPage').then((module) => ({ default: module.AboutPage })))
const SkillsPage = lazy(() => import('./pages/SkillsPage').then((module) => ({ default: module.SkillsPage })))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage').then((module) => ({ default: module.ProjectsPage })))
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage').then((module) => ({ default: module.ProjectDetailPage })))
const EducationPage = lazy(() => import('./pages/EducationPage').then((module) => ({ default: module.EducationPage })))
const ExperiencePage = lazy(() => import('./pages/ExperiencePage').then((module) => ({ default: module.ExperiencePage })))
const ContactPage = lazy(() => import('./pages/ContactPage').then((module) => ({ default: module.ContactPage })))
const CertificationsPage = lazy(() => import('./pages/CertificationsPage').then((module) => ({ default: module.CertificationsPage })))
const ResumePage = lazy(() => import('./pages/ResumePage').then((module) => ({ default: module.ResumePage })))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((module) => ({ default: module.NotFoundPage })))
const AdminLayout = lazy(() => import('./components/admin/AdminLayout').then((module) => ({ default: module.AdminLayout })))
const AdminLoginPage = lazy(() => import('./pages/admin/AdminLoginPage').then((module) => ({ default: module.AdminLoginPage })))
const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboardPage').then((module) => ({ default: module.AdminDashboardPage })))
const AdminAnalyticsPage = lazy(() => import('./pages/admin/AdminAnalyticsPage').then((module) => ({ default: module.AdminAnalyticsPage })))
const AdminMessagesPage = lazy(() => import('./pages/admin/AdminMessagesPage').then((module) => ({ default: module.AdminMessagesPage })))
const AdminProjectsPage = lazy(() => import('./pages/admin/AdminProjectsPage').then((module) => ({ default: module.AdminProjectsPage })))
const AdminSkillsPage = lazy(() => import('./pages/admin/AdminSkillsPage').then((module) => ({ default: module.AdminSkillsPage })))
const AdminProfilePage = lazy(() => import('./pages/admin/AdminProfilePage').then((module) => ({ default: module.AdminProfilePage })))
const AdminSocialLinksPage = lazy(() => import('./pages/admin/AdminSocialLinksPage').then((module) => ({ default: module.AdminSocialLinksPage })))
const AdminContentPage = lazy(() => import('./pages/admin/AdminContentPage').then((module) => ({ default: module.AdminContentPage })))
const AdminMediaPage = lazy(() => import('./pages/admin/AdminMediaPage').then((module) => ({ default: module.AdminMediaPage })))

export default function App() {
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')
  const routes = isAdmin ? <Routes><Route path="/admin/login" element={<AdminLoginPage />} /><Route path="/admin" element={<AdminLayout theme={theme} onThemeToggle={toggleTheme} />}><Route index element={<AdminDashboardPage />} /><Route path="analytics" element={<AdminAnalyticsPage />} /><Route path="messages" element={<AdminMessagesPage />} /><Route path="projects" element={<AdminProjectsPage />} /><Route path="skills" element={<AdminSkillsPage />} /><Route path="profile" element={<AdminProfilePage />} /><Route path="content" element={<AdminContentPage />} /><Route path="social-links" element={<AdminSocialLinksPage />} /><Route path="media" element={<AdminMediaPage />} /></Route><Route path="*" element={<AdminLoginPage />} /></Routes> : <div className="min-h-screen bg-white text-slate-950 transition-colors dark:bg-slate-950 dark:text-white"><Header theme={theme} onThemeToggle={toggleTheme} /><Routes><Route path="/" element={<HomePage />} /><Route path="/about" element={<AboutPage />} /><Route path="/skills" element={<SkillsPage />} /><Route path="/projects" element={<ProjectsPage />} /><Route path="/projects/:slug" element={<ProjectDetailPage />} /><Route path="/education" element={<EducationPage />} /><Route path="/experience" element={<ExperiencePage />} /><Route path="/certifications" element={<CertificationsPage />} /><Route path="/resume" element={<ResumePage />} /><Route path="/contact" element={<ContactPage />} /><Route path="*" element={<NotFoundPage />} /></Routes><Footer /></div>
  return <><AnalyticsTracker /><AnalyticsConsent /><Suspense fallback={<div className="grid min-h-screen place-items-center bg-slate-950 text-slate-400">Loading portfolio…</div>}>{routes}</Suspense></>
}

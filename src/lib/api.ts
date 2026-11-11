import type { AdminDashboard, AdminMessage, AdminUser, ApiProject, ContactPayload } from '../types/api'

const apiBase = (import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1').replace(/\/$/, '')

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${apiBase}${path}`, { credentials: 'include', headers: { Accept: 'application/json', 'Content-Type': 'application/json', ...(options.headers || {}) }, ...options })
  const body = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(body.message || 'The request could not be completed.')
  return body as T
}

export function sendContact(payload: ContactPayload) {
  return request<{ message: string }>('/contact', { method: 'POST', body: JSON.stringify(payload) })
}

async function csrf() {
  const origin = apiBase.replace(/\/api\/v1$/, '')
  await fetch(`${origin}/sanctum/csrf-cookie`, { credentials: 'include', headers: { Accept: 'application/json' } })
}

export async function adminLogin(email: string, password: string) {
  await csrf()
  return request<{ user: AdminUser }>('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) })
}

export function adminLogout() { return request<{ message: string }>('/admin/auth/logout', { method: 'POST' }) }
export function adminMe() { return request<{ user: AdminUser }>('/admin/auth/me') }
export function adminDashboard() { return request<AdminDashboard>('/admin/dashboard') }
export interface AnalyticsOverview { range: { from: string; to: string }; metrics: { pageViews: number; projectViews: number; estimatedUniqueVisitors: number | null }; traffic: Array<{ day: string; page_views: number; project_views: number }>; topPages: Array<{ path: string; views: number }> }
export function adminAnalyticsOverview(range = '30') { return request<AnalyticsOverview>(`/admin/analytics/overview?range=${range}`) }
export function adminAnalyticsProjects(range = '30') { return request<{ data: Array<{ slug?: string; title?: string; views: number }> }>(`/admin/analytics/projects?range=${range}`) }
export function adminAnalyticsReferrers(range = '30') { return request<{ data: Array<{ referrer_domain: string; views: number }> }>(`/admin/analytics/referrers?range=${range}`) }
export function adminMessages(search = '', status = '') { return request<{ data: AdminMessage[]; meta: { current_page: number; last_page: number } }>(`/admin/messages?search=${encodeURIComponent(search)}&status=${encodeURIComponent(status)}`) }
export function updateMessageStatus(id: string, status: string) { return request<{ data: AdminMessage }>(`/admin/messages/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }) }
export function adminProjects() { return request<{ data: ApiProject[] }>('/admin/projects') }
export function createAdminProject(payload: Record<string, unknown>) { return request<{ data: ApiProject }>('/admin/projects', { method: 'POST', body: JSON.stringify(payload) }) }
export function updateAdminProject(id: string, payload: Record<string, unknown>) { return request<{ data: ApiProject }>(`/admin/projects/${id}`, { method: 'PUT', body: JSON.stringify(payload) }) }
export function deleteAdminProject(id: string) { return request<{ message: string }>(`/admin/projects/${id}`, { method: 'DELETE' }) }
export function adminSkills() { return request<{ categories: Array<{ id: string; name: string; skills: Array<{ id: string; name: string; description?: string }> }> }>('/admin/skills') }
export function createAdminSkill(payload: Record<string, unknown>) { return request<{ skill: { id: string } }>('/admin/skills', { method: 'POST', body: JSON.stringify(payload) }) }
export function updateAdminProfile(payload: Record<string, unknown>) { return request<{ profile: Record<string, unknown> }>('/admin/profile', { method: 'PUT', body: JSON.stringify(payload) }) }
export function adminProfile() { return request<{ profile: Record<string, unknown> | null }>('/admin/profile') }
export function adminSocialLinks() { return request<{ socialLinks: Array<{ id: string; label: string; kind: string; url: string; is_enabled: boolean }> }>('/admin/social-links') }
export function createAdminSocialLink(payload: Record<string, unknown>) { return request<{ socialLink: { id: string } }>('/admin/social-links', { method: 'POST', body: JSON.stringify(payload) }) }
export function adminEducation() { return request<{ education: Array<Record<string, unknown>> }>('/admin/education') }
export function saveAdminEducation(payload: Record<string, unknown>) { return request<{ education: Record<string, unknown> }>('/admin/education', { method: 'POST', body: JSON.stringify(payload) }) }
export function adminCertifications() { return request<{ certifications: Array<Record<string, unknown>> }>('/admin/certifications') }
export function saveAdminCertification(payload: Record<string, unknown>) { return request<{ certification: Record<string, unknown> }>('/admin/certifications', { method: 'POST', body: JSON.stringify(payload) }) }
export function adminExperience() { return request<{ experience: Array<Record<string, unknown>> }>('/admin/experience') }
export function saveAdminExperience(payload: Record<string, unknown>) { return request<{ experience: Record<string, unknown> }>('/admin/experience', { method: 'POST', body: JSON.stringify(payload) }) }
export function adminResume() { return request<{ resume: Record<string, unknown> | null }>('/admin/resume') }
export function saveAdminResume(payload: Record<string, unknown>) { return request<{ resume: Record<string, unknown> }>('/admin/resume', { method: 'PUT', body: JSON.stringify(payload) }) }
export async function uploadAdminMedia(file: File, isPublic = false) { const body = new FormData(); body.append('file', file); body.append('is_public', String(isPublic)); const response = await fetch(`${apiBase}/admin/media`, { method: 'POST', credentials: 'include', headers: { Accept: 'application/json' }, body }); if (!response.ok) throw new Error('The media upload could not be completed.'); return response.json() as Promise<{ media: Record<string, unknown> }> }


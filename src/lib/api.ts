import type { AdminDashboard, AdminMessage, AdminUser, ApiProject, ContactPayload } from '../types/api'

// Use the Vite proxy during local development. Production deployments should
// set VITE_API_URL to the public Laravel API origin ending in /api/v1.
const apiBase = (import.meta.env.VITE_API_URL?.trim() || '/api/v1').replace(/\/$/, '')

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  try {
    const response = await fetch(`${apiBase}${path}`, { credentials: 'include', headers: { Accept: 'application/json', 'Content-Type': 'application/json', ...(options.headers || {}) }, ...options })
    const body = await response.json().catch(() => ({}))
    if (!response.ok) {
      if (response.status >= 500) {
        throw new Error(`The contact service is unavailable right now (HTTP ${response.status}). Please start the Laravel API or try again later.`)
      }
      throw new Error(body.message || `The request could not be completed (HTTP ${response.status}).`)
    }
    return body as T
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error('The contact service is unavailable. Please start the Laravel API or try again later.')
    }
    throw error
  }
}

export function sendContact(payload: ContactPayload) {
  return request<{ message: string }>('/contact', { method: 'POST', body: JSON.stringify(payload) })
}

export function publicProfile() {
  return request<{ education: Array<Record<string, unknown>>; certifications: Array<Record<string, unknown>>; experience: Array<Record<string, unknown>> }>('/profile')
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
export function publicProjects() { return request<{ data: ApiProject[] }>('/projects') }
export function publicProject(slug: string) { return request<ApiProject>('/projects/' + encodeURIComponent(slug)) }
export function createAdminProject(payload: Record<string, unknown>) { return request<{ data: ApiProject }>('/admin/projects', { method: 'POST', body: JSON.stringify(payload) }) }
export function updateAdminProject(id: string, payload: Record<string, unknown>) { return request<{ data: ApiProject }>(`/admin/projects/${id}`, { method: 'PUT', body: JSON.stringify(payload) }) }
export function deleteAdminProject(id: string) { return request<{ message: string }>(`/admin/projects/${id}`, { method: 'DELETE' }) }
export async function uploadAdminProjectImage(id: string, file: File, alt: string, caption: string, isPublic: boolean) {
  const body = new FormData(); body.append('file', file); body.append('alt', alt); if (caption) body.append('caption', caption); body.append('is_public', String(isPublic))
  const response = await fetch(`${apiBase}/admin/projects/${id}/images`, { method: 'POST', credentials: 'include', headers: { Accept: 'application/json' }, body })
  const data = await response.json().catch(() => ({})); if (!response.ok) throw new Error(data.message || 'The project image upload could not be completed.'); return data as { image: import('../types/api').ApiProjectImage }
}
export function deleteAdminProjectImage(projectId: string, imageId: string) { return request<{ message: string }>(`/admin/projects/${projectId}/images/${imageId}`, { method: 'DELETE' }) }
export function adminSkills() { return request<{ categories: Array<{ id: string; name: string; skills: Array<{ id: string; name: string; description?: string }> }> }>('/admin/skills') }
export function createAdminSkill(payload: Record<string, unknown>) { return request<{ skill: { id: string } }>('/admin/skills', { method: 'POST', body: JSON.stringify(payload) }) }
export function updateAdminProfile(payload: Record<string, unknown>) { return request<{ profile: Record<string, unknown> }>('/admin/profile', { method: 'PUT', body: JSON.stringify(payload) }) }
export function adminProfile() { return request<{ profile: Record<string, unknown> | null }>('/admin/profile') }
export async function uploadAdminProfilePhoto(file: File, imagePosition = 'center') { const body = new FormData(); body.append('file', file); body.append('profile_image_position', imagePosition); const response = await fetch(`${apiBase}/admin/profile/photo`, { method: 'POST', credentials: 'include', headers: { Accept: 'application/json' }, body }); const data = await response.json().catch(() => ({})); if (!response.ok) throw new Error(data.message || 'The profile photo upload could not be completed.'); return data as { profile: Record<string, unknown>; profile_image_url?: string } }
export function removeAdminProfilePhoto() { return request<{ message: string }>('/admin/profile/photo', { method: 'DELETE' }) }
export function adminSocialLinks() { return request<{ socialLinks: Array<{ id: string; label: string; kind: string; url: string; is_enabled: boolean }> }>('/admin/social-links') }
export function createAdminSocialLink(payload: Record<string, unknown>) { return request<{ socialLink: { id: string } }>('/admin/social-links', { method: 'POST', body: JSON.stringify(payload) }) }
export function adminEducation() { return request<{ education: Array<Record<string, unknown>> }>('/admin/education') }
export function saveAdminEducation(payload: Record<string, unknown>) { return request<{ education: Record<string, unknown> }>('/admin/education', { method: 'POST', body: JSON.stringify(payload) }) }
export function updateAdminEducation(id: string, payload: Record<string, unknown>) { return request<{ education: Record<string, unknown> }>('/admin/education/' + id, { method: 'PUT', body: JSON.stringify(payload) }) }
export function deleteAdminEducation(id: string) { return request<{ message: string }>('/admin/education/' + id, { method: 'DELETE' }) }
export function reorderAdminEducation(items: Array<{ id: string; display_order: number }>) { return request<{ message: string }>('/admin/education/reorder', { method: 'POST', body: JSON.stringify({ items }) }) }
export function adminCertifications() { return request<{ certifications: Array<Record<string, unknown>> }>('/admin/certifications') }
export function saveAdminCertification(payload: Record<string, unknown>) { return request<{ certification: Record<string, unknown> }>('/admin/certifications', { method: 'POST', body: JSON.stringify(payload) }) }
export function updateAdminCertification(id: string, payload: Record<string, unknown>) { return request<{ certification: Record<string, unknown> }>('/admin/certifications/' + id, { method: 'PUT', body: JSON.stringify(payload) }) }
export function deleteAdminCertification(id: string) { return request<{ message: string }>('/admin/certifications/' + id, { method: 'DELETE' }) }
export function reorderAdminCertifications(items: Array<{ id: string; display_order: number }>) { return request<{ message: string }>('/admin/certifications/reorder', { method: 'POST', body: JSON.stringify({ items }) }) }
export async function uploadAdminCertificate(id: string, file: File, isPublic: boolean, isDownloadable: boolean) { const body = new FormData(); body.append('file', file); body.append('is_public', String(isPublic)); body.append('is_downloadable', String(isDownloadable)); const response = await fetch(apiBase + '/admin/certifications/' + id + '/certificate', { method: 'POST', credentials: 'include', headers: { Accept: 'application/json' }, body }); const data = await response.json().catch(() => ({})); if (!response.ok) throw new Error(data.message || 'The certificate upload could not be completed.'); return data as { certification: Record<string, unknown> } }
export function adminExperience() { return request<{ experience: Array<Record<string, unknown>> }>('/admin/experience') }
export function saveAdminExperience(payload: Record<string, unknown>) { return request<{ experience: Record<string, unknown> }>('/admin/experience', { method: 'POST', body: JSON.stringify(payload) }) }
export function updateAdminExperience(id: string, payload: Record<string, unknown>) { return request<{ experience: Record<string, unknown> }>('/admin/experience/' + id, { method: 'PUT', body: JSON.stringify(payload) }) }
export function deleteAdminExperience(id: string) { return request<{ message: string }>('/admin/experience/' + id, { method: 'DELETE' }) }
export function reorderAdminExperience(items: Array<{ id: string; display_order: number }>) { return request<{ message: string }>('/admin/experience/reorder', { method: 'POST', body: JSON.stringify({ items }) }) }
export function adminResume() { return request<{ resume: Record<string, unknown> | null }>('/admin/resume') }
export function saveAdminResume(payload: Record<string, unknown>) { return request<{ resume: Record<string, unknown> }>('/admin/resume', { method: 'PUT', body: JSON.stringify(payload) }) }
export async function uploadAdminMedia(file: File, isPublic = false) { const body = new FormData(); body.append('file', file); body.append('is_public', String(isPublic)); const response = await fetch(`${apiBase}/admin/media`, { method: 'POST', credentials: 'include', headers: { Accept: 'application/json' }, body }); if (!response.ok) throw new Error('The media upload could not be completed.'); return response.json() as Promise<{ media: Record<string, unknown> }> }


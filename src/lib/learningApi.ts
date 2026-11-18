const apiBase = (import.meta.env.VITE_API_URL?.trim() || '/api/v1').replace(/\/$/, '')
async function request<T>(path: string, options: RequestInit = {}) {
  const response = await fetch(`${apiBase}${path}`, { credentials: 'include', headers: { Accept: 'application/json', 'Content-Type': 'application/json', ...(options.headers || {}) }, ...options })
  const body = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(body.message || `The request failed (HTTP ${response.status}).`)
  return body as T
}
export interface LessonNote { id: string; lesson_key: string; content: string; updated_at: string }
export function getLessonNote(lessonKey: string) { return request<{ note: LessonNote | null }>(`/notes/${encodeURIComponent(lessonKey)}`) }
export function saveLessonNote(lessonKey: string, content: string) { return request<{ note: LessonNote }>(`/notes/${encodeURIComponent(lessonKey)}`, { method: 'PUT', body: JSON.stringify({ content }) }) }
export function deleteLessonNote(lessonKey: string) { return request<{ message: string }>(`/notes/${encodeURIComponent(lessonKey)}`, { method: 'DELETE' }) }

export interface ContactPayload {
  full_name: string
  email: string
  subject: string
  message: string
  website?: string
}

export interface AdminUser { id: number; name: string; email: string; is_admin: boolean }
export interface AdminMetricSet { projects: number; publishedProjects: number; draftProjects: number; skills: number; messages: number; unreadMessages: number }
export interface AdminDashboard { metrics: AdminMetricSet; recentMessages: Array<{ id: string; full_name: string; email: string; subject: string; status: string; created_at: string }>; recentChanges: Array<{ id: string; action: string; auditable_type?: string; created_at: string }> }
export interface ApiProject { id: string; slug: string; title: string; shortTitle?: string; category: string; description: string; status: string; isPublished: boolean; isFeatured: boolean; technologies?: string[] }
export interface AdminMessage { id: string; fullName: string; email: string; subject: string; message: string; status: string; replyStatus: string; createdAt: string; readAt?: string }


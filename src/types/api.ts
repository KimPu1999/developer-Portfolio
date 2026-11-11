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
export interface ApiProjectImage { id: string; path: string; url?: string; alt: string; caption?: string; displayOrder?: number }
export interface ApiProject { id: string; slug: string; title: string; shortTitle?: string; category: string; description: string; status: string; projectType?: 'professional' | 'personal'; company?: string; role?: string; contributions?: string[]; overview?: string; problem?: string; objectives?: string[]; solution?: string; developmentApproach?: string; technicalArchitecture?: string; plannedModules?: string[]; githubUrl?: string; liveUrl?: string; isPublished: boolean; isFeatured: boolean; displayOrder?: number; visualKey?: string; imagePath?: string; imageAlt?: string; technologies?: string[]; images?: ApiProjectImage[] }
export interface ApiExperience { id: string; title: string; organization?: string; location?: string; employment_dates?: string; duration?: string; summary: string; responsibilities?: string[]; achievements?: string[]; role?: string; technologies?: string[]; status: string; experience_type?: string; project_slug?: string; is_public: boolean; display_order: number }
export interface AdminMessage { id: string; fullName: string; email: string; subject: string; message: string; status: string; replyStatus: string; createdAt: string; readAt?: string }


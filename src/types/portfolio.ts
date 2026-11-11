export type Theme = 'dark' | 'light'

import type { PortfolioProject } from './project'

export type { PortfolioProject as Project } from './project'

export interface Skill {
  name: string
  description: string
  projectSlugs?: string[]
}

export interface SkillGroup {
  name: string
  eyebrow: string
  description: string
  skills: Skill[]
}

export interface ContactField {
  label: string
  value: string
  href?: string
  placeholder?: boolean
}

export interface Profile {
  displayName: string
  initials: string
  role: string
  subtitle: string
  summary: string
  about: string
  image?: string
  careerObjective: string
  focusAreas: string[]
  interests: string[]
  contact: ContactField[]
}

export interface EducationRecord {
  id: string
  title: string
  focus: string
  status?: string
  academicLevel?: string
  institution: string
  location?: string
  graduationYear?: string
  dates?: string
  coursework?: string[]
  relatedTechnologies: string[]
  relatedProjectSlugs: string[]
  verified: boolean
}

export interface ExperienceItem {
  id: string
  projectSlug: string
  title: string
  summary: string
  technologies: string[]
  status: PortfolioProject['status']
  role?: string
  repositoryUrl?: string
  liveUrl?: string
}

export interface Certification {
  id: string
  name: string
  category?: string
  description?: string
  issuer?: string
  issueDate?: string
  credentialId?: string
  verificationUrl?: string
  certificateFile?: string
  certificateMimeType?: string
  isDownloadable?: boolean
  verified: boolean
}

export interface ResumeResource {
  title: string
  description: string
  filePath?: string
  lastUpdated?: string
}

export type Theme = 'dark' | 'light'

import type { PortfolioProject } from './project'

export type { PortfolioProject as Project } from './project'

export interface Skill {
  name: string
  description: string
  projectSlugs?: string[]
}

export interface SkillLesson {
  id: string
  title: string
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Professional'
  summary: string
  sections: Array<{ heading: string; body: string }>
  overview?: string
  objectives?: string[]
  theory?: string
  syntax?: string
  concepts?: string[]
  codeExamples?: SkillCodeExample[]
  practicalUseCases?: string[]
  commonMistakes?: string[]
  bestPractices?: string[]
  keyTakeaways?: string[]
  summaryText?: string
  relatedLessonIds?: string[]
  readingTime?: string
}

export interface SkillCodeExample {
  language: string
  code: string
  explanation: string
}

export interface SkillModule {
  id: string
  title: string
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Professional'
  lessons: SkillLesson[]
}

export interface SkillDocumentation {
  slug: string
  category: string
  skill: Skill
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  duration: string
  prerequisites: string[]
  objectives: string[]
  technologyInfo: string
  modules: SkillModule[]
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
  imageAbout?: string
  imageResume?: string
  imagePosition?: string
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

export interface ProfessionalExperienceItem {
  id: string
  organization: string
  location?: string
  title: string
  duration: string
  employmentDates?: string
  summary: string
  responsibilities: string[]
  achievements: string[]
  technologies: string[]
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

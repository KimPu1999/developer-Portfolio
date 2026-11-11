export type ProjectCategory = 'Enterprise' | 'Retail' | 'Social' | 'Fintech' | 'WordPress'
export type ProjectStatus = 'In Development' | 'Concept'
export type ProjectTechnology = string
export type ProjectVisual = 'erp' | 'pos' | 'social' | 'wallet' | 'wordpress'
export type ProjectType = 'professional' | 'personal'

export interface ProjectScreenshot {
  src: string
  alt: string
  caption?: string
}

export interface ProjectCaseStudy {
  context?: string
  problem?: string
  objectives?: string[]
  solution?: string
  developmentApproach?: string
  technicalArchitecture?: string
  challenges?: string[]
  outcomes?: string
  lessonsLearned?: string
}

export interface PortfolioProject {
  slug: string
  title: string
  shortTitle: string
  category: ProjectCategory
  description: string
  technologies: ProjectTechnology[]
  status: ProjectStatus
  visual: ProjectVisual
  projectType: ProjectType
  company?: string
  role?: string
  contributions?: string[]
  isFeatured?: boolean
  image?: string
  imageAlt: string
  plannedModules?: string[]
  caseStudy?: ProjectCaseStudy
  screenshots?: ProjectScreenshot[]
  githubUrl?: string
  liveUrl?: string
}

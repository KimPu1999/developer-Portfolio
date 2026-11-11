import type { ApiProject } from '../types/api'
import type { PortfolioProject, ProjectCategory } from '../types/project'

const visuals = ['erp', 'pos', 'social', 'wallet'] as const

export function apiProjectToPortfolioProject(project: ApiProject): PortfolioProject {
  const visual = project.visualKey === 'wordpress' ? 'wordpress' : visuals.includes(project.visualKey as typeof visuals[number]) ? project.visualKey as PortfolioProject['visual'] : 'erp'
  const category = ['Enterprise', 'Retail', 'Social', 'Fintech', 'WordPress'].includes(project.category) ? project.category as ProjectCategory : 'Enterprise'
  return {
    slug: project.slug,
    title: project.title,
    shortTitle: project.shortTitle || project.title,
    category,
    description: project.description,
    technologies: project.technologies || [],
    status: project.status === 'Concept' ? 'Concept' : 'In Development',
    visual,
    projectType: project.projectType ?? (project.category === 'WordPress' ? 'professional' : 'personal'),
    company: project.company,
    role: project.role,
    contributions: project.contributions,
    isFeatured: project.isFeatured,
    image: project.imagePath || undefined,
    imageAlt: project.imageAlt || `${project.title} project visual`,
    caseStudy: { context: project.overview, problem: project.problem, objectives: project.objectives, solution: project.solution, developmentApproach: project.developmentApproach, technicalArchitecture: project.technicalArchitecture, challenges: project.plannedModules },
    githubUrl: project.githubUrl,
    liveUrl: project.liveUrl,
    screenshots: project.images?.filter((image) => Boolean(image.url)).map((image) => ({ src: image.url as string, alt: image.alt, caption: image.caption })),
  }
}

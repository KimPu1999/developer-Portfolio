import type { ApiProject } from '../types/api'
import type { PortfolioProject } from '../types/project'

const visuals = ['erp', 'pos', 'social', 'wallet'] as const

export function apiProjectToPortfolioProject(project: ApiProject): PortfolioProject {
  const visual = visuals.includes(project.visualKey as typeof visuals[number]) ? project.visualKey as PortfolioProject['visual'] : 'erp'
  return {
    slug: project.slug,
    title: project.title,
    shortTitle: project.shortTitle || project.title,
    category: project.category === 'WordPress' ? 'WordPress' : 'Enterprise',
    description: project.description,
    technologies: project.technologies || [],
    status: project.status === 'Concept' ? 'Concept' : 'In Development',
    visual,
    image: project.imagePath || undefined,
    imageAlt: project.imageAlt || `${project.title} project visual`,
    caseStudy: { context: project.overview, problem: project.problem, objectives: project.objectives, solution: project.solution, developmentApproach: project.developmentApproach, technicalArchitecture: project.technicalArchitecture, challenges: project.plannedModules },
    githubUrl: project.githubUrl,
    liveUrl: project.liveUrl,
  }
}

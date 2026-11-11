import type { ExperienceItem } from '../types/portfolio'
import { projects } from './projects'

export const projectExperience = projects.map((project) => ({
  id: project.slug,
  projectSlug: project.slug,
  title: project.title,
  summary: project.description,
  technologies: project.technologies,
  status: project.status,
})) satisfies ExperienceItem[]

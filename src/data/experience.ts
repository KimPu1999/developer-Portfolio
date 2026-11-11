import type { ExperienceItem, ProfessionalExperienceItem } from '../types/portfolio'
import { projects } from './projects'

export const professionalExperience = [
  {
    id: 'fusion-solution-wordpress-developer',
    organization: 'Fusion Solution Co., Ltd.',
    title: 'WordPress Developer',
    duration: '3 years',
    summary: 'WordPress website development and custom theme development across more than 20 websites.',
    responsibilities: [
      'Developed over 20 WordPress websites.',
      'Built custom WordPress themes with personalized layouts and designs.',
      'Developed responsive websites using HTML, CSS, JavaScript and PHP.',
      'Worked on website frontend design and WordPress customization.',
    ],
    achievements: ['Created professional, maintainable website layouts.'],
    technologies: ['WordPress', 'PHP', 'HTML', 'CSS', 'JavaScript', 'Responsive Web Design'],
  },
] satisfies ProfessionalExperienceItem[]

export const projectExperience = projects.map((project) => ({
  id: project.slug,
  projectSlug: project.slug,
  title: project.title,
  summary: project.description,
  technologies: project.technologies,
  status: project.status,
})) satisfies ExperienceItem[]

import { Link } from 'react-router-dom'
import type { PortfolioProject } from '../../types/project'
import { ProjectVisual } from './ProjectCard'

export function RelatedProjects({ current, projects }: { current: PortfolioProject; projects: PortfolioProject[] }) {
  const related = projects.filter((project) => project.slug !== current.slug).map((project, index) => ({ project, score: (project.category === current.category ? 2 : 0) + project.technologies.filter((technology) => current.technologies.includes(technology)).length, index })).sort((a, b) => b.score - a.score || a.index - b.index).slice(0, 3)
  if (related.length === 0) return null
  return <section className="border-t border-slate-200 pt-16 dark:border-slate-800"><h2 className="text-2xl font-semibold text-slate-950 dark:text-white">Related projects</h2><div className="mt-7 grid gap-5 md:grid-cols-3">{related.map(({ project }) => <Link key={project.slug} to={`/projects/${project.slug}`} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/60"><ProjectVisual project={project} compact /><div className="p-5"><p className="font-mono text-[10px] uppercase tracking-wider text-cyan-500">{project.category}</p><h3 className="mt-2 font-semibold text-slate-950 group-hover:text-cyan-500 dark:text-white">{project.title}</h3></div></Link>)}</div></section>
}

import { ArrowUpRight, LockKeyhole } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { PortfolioProject } from '../../types/project'
import { SkillBadge } from '../ui/SkillBadge'
import { safeExternalUrl } from '../../utils/projectLinks'

export function ProjectVisual({ project, compact = false }: { project: PortfolioProject; compact?: boolean }) {
  return <div className={`project-visual visual-${project.visual} ${compact ? 'h-44' : ''}`} aria-label={project.image ? project.imageAlt : `${project.title} visual placeholder`} role="img">
    {project.image ? <img src={project.image} alt={project.imageAlt} loading="lazy" className="h-full w-full object-cover" /> : <><div className="visual-window"><div className="visual-dots"><i /><i /><i /></div><div className="visual-lines"><b /><b /><b /><b /></div></div><div className="visual-orb" /></>}
  </div>
}

export function ProjectCard({ project }: { project: PortfolioProject }) {
  const githubUrl = safeExternalUrl(project.githubUrl); const liveUrl = safeExternalUrl(project.liveUrl)
  return <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-cyan-400/50 hover:shadow-xl hover:shadow-cyan-950/10 dark:border-slate-800 dark:bg-slate-900/70 dark:hover:shadow-cyan-950/20"><ProjectVisual project={project} compact /><div className="p-6 sm:p-7"><div className="mb-5 flex flex-wrap items-center justify-between gap-3"><span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-cyan-500 dark:text-cyan-300">{project.status}</span><span className="font-mono text-xs text-slate-400">{project.category}</span></div><h3 className="text-xl font-semibold text-slate-950 dark:text-white">{project.title}</h3><p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{project.description}</p><div className="mt-5 flex flex-wrap gap-2">{project.technologies.map((technology) => <SkillBadge key={technology}>{technology}</SkillBadge>)}</div><div className="mt-6 flex items-center gap-4 border-t border-slate-200 pt-5 dark:border-slate-800"><Link className="inline-flex items-center gap-1 text-sm font-semibold text-cyan-600 transition hover:text-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 dark:text-cyan-300" to={`/projects/${project.slug}`}>View details <ArrowUpRight size={15} /></Link>{!githubUrl && !liveUrl && <span className="ml-auto inline-flex items-center gap-1 text-xs text-slate-400"><LockKeyhole size={13} /> Links pending</span>}{githubUrl && <a className="text-sm text-slate-500 hover:text-cyan-400" href={githubUrl} target="_blank" rel="noopener noreferrer">GitHub</a>}{liveUrl && <a className="text-sm text-slate-500 hover:text-cyan-400" href={liveUrl} target="_blank" rel="noopener noreferrer">Live demo</a>}</div></div></article>
}

import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { ProjectCaseStudy } from '../components/projects/ProjectCaseStudy'
import { ProjectGallery } from '../components/projects/ProjectGallery'
import { ProjectHero } from '../components/projects/ProjectHero'
import { RelatedProjects } from '../components/projects/RelatedProjects'
import { ProjectTechStack } from '../components/projects/ProjectTechStack'
import { Container } from '../components/ui/Container'
import { EmptyState } from '../components/ui/EmptyState'
import { PageMeta } from '../components/ui/PageMeta'
import { SectionHeading } from '../components/ui/SectionHeading'
import { publicProject } from '../lib/api'
import { apiProjectToPortfolioProject } from '../utils/apiProjectMapper'
import { allProjects, projectRegistry } from '../data/projects'
import type { PortfolioProject } from '../types/project'
import { NotFoundPage } from './NotFoundPage'

export function ProjectDetailPage() {
  const { slug } = useParams()
  const staticProject = slug ? projectRegistry[slug] : undefined
  const [remoteProject, setRemoteProject] = useState<PortfolioProject>()
  const [loading, setLoading] = useState(!staticProject)
  useEffect(() => {
    if (!slug) { setLoading(false); return }
    let active = true
    if (!staticProject) setLoading(true)
    publicProject(slug).then((response) => { if (active) setRemoteProject(apiProjectToPortfolioProject(response)) }).catch(() => { if (active) setRemoteProject(undefined) }).finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [slug, staticProject])
  if (loading) return <main className="grid min-h-[60vh] place-items-center"><p role="status" className="text-sm text-slate-500">Loading project details…</p></main>
  const project = remoteProject || staticProject
  if (!project) return <NotFoundPage />
  const index = allProjects.findIndex((item) => item.slug === project.slug)
  const previous = index > 0 ? allProjects[index - 1] : undefined
  const next = index >= 0 && index < allProjects.length - 1 ? allProjects[index + 1] : undefined
  const siteUrl = import.meta.env.VITE_SITE_URL as string | undefined
  const jsonLd = siteUrl ? [{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Projects', item: `${siteUrl}/projects` }, { '@type': 'ListItem', position: 2, name: project.title, item: `${siteUrl}/projects/${project.slug}` }] }, { '@context': 'https://schema.org', '@type': 'CreativeWork', name: project.title, description: project.description, url: `${siteUrl}/projects/${project.slug}`, keywords: project.technologies.join(', ') }] : undefined
  return <main><PageMeta title={`${project.title} | Projects`} description={project.description} canonicalPath={`/projects/${project.slug}`} jsonLd={jsonLd} /><ProjectHero project={project} /><section className="py-16"><Container className="grid gap-14 lg:grid-cols-[.7fr_1.3fr]"><aside className="lg:sticky lg:top-28 lg:h-fit"><p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-500">Technology stack</p><div className="mt-5">{project.technologies.length > 0 ? <ProjectTechStack technologies={project.technologies} /> : <p className="text-sm text-slate-500">Technology details pending verification.</p>}</div>{project.contributions && project.contributions.length > 0 && <><p className="mt-10 font-mono text-xs uppercase tracking-[0.2em] text-cyan-500">My contributions</p><ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{project.contributions.map((contribution) => <li key={contribution} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />{contribution}</li>)}</ul></>}<p className="mt-10 font-mono text-xs uppercase tracking-[0.2em] text-cyan-500">Screenshots</p><p className="mt-4 text-sm leading-6 text-slate-500">Only verified project images are displayed.</p></aside><div>{project.caseStudy ? <ProjectCaseStudy project={project} /> : <EmptyState title="Project details are being documented" description="Verified project details can be added from the admin dashboard when available." />}</div></Container></section><section className="bg-slate-50 py-20 dark:bg-slate-900/40"><Container><SectionHeading eyebrow="Visual documentation" title="Screenshots and interface notes." /><div className="mt-10"><ProjectGallery screenshots={project.screenshots} /></div></Container></section><section className="py-20"><Container><RelatedProjects current={project} projects={allProjects} /><div className="mt-16 flex flex-col justify-between gap-5 border-t border-slate-200 pt-8 dark:border-slate-800 sm:flex-row"><div>{previous && <Link to={`/projects/${previous.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-600 hover:text-cyan-400 dark:text-cyan-300"><ArrowLeft size={16} /> Previous project</Link>}</div><div>{next && <Link to={`/projects/${next.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-600 hover:text-cyan-400 dark:text-cyan-300">Next project <ArrowRight size={16} /></Link>}</div></div></Container></section></main>
}

import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { StaggerContainer, StaggerItem } from '../components/motion/MotionPrimitives'
import { Container } from '../components/ui/Container'
import { EmptyState } from '../components/ui/EmptyState'
import { PageMeta } from '../components/ui/PageMeta'
import { ProjectCard } from '../components/projects/ProjectCard'
import { ProjectFilters, type ProjectSort } from '../components/projects/ProjectFilters'
import { SectionHeading } from '../components/ui/SectionHeading'
import { professionalProjects, projects } from '../data/projects'
import { publicProjects } from '../lib/api'
import { apiProjectToPortfolioProject } from '../utils/apiProjectMapper'
import type { PortfolioProject, ProjectCategory, ProjectStatus, ProjectType } from '../types/project'

function updateParam(params: URLSearchParams, key: string, value: string, defaultValue: string) {
  if (value === defaultValue || value === '') params.delete(key)
  else params.set(key, value)
  return params
}

function mergeProfessionalProjects(remote: PortfolioProject[]) {
  const remoteBySlug = new Map(remote.map((project) => [project.slug, project]))
  const known = professionalProjects.map((project) => remoteBySlug.get(project.slug) ?? project)
  const additional = remote.filter((project) => !professionalProjects.some((staticProject) => staticProject.slug === project.slug))
  return [...known, ...additional]
}

export function ProjectsPage() {
  const [remoteProfessional, setRemoteProfessional] = useState<PortfolioProject[]>([])
  const [wordPressLoading, setWordPressLoading] = useState(true)
  const [wordPressError, setWordPressError] = useState(false)
  useEffect(() => { publicProjects().then((response) => setRemoteProfessional(response.data.filter((project) => project.category === 'WordPress').map(apiProjectToPortfolioProject))).catch(() => { setRemoteProfessional([]); setWordPressError(true) }).finally(() => setWordPressLoading(false)) }, [])
  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('search') ?? ''
  const projectType = (searchParams.get('type') ?? 'all') as ProjectType | 'all'
  const category = (searchParams.get('category') ?? 'All') as ProjectCategory | 'All'
  const technology = searchParams.get('technology') ?? 'All'
  const status = (searchParams.get('status') ?? 'All') as ProjectStatus | 'All'
  const sort = (searchParams.get('sort') ?? 'curated') as ProjectSort
  const portfolioProjects = useMemo(() => [...mergeProfessionalProjects(remoteProfessional), ...projects], [remoteProfessional])
  const categories = ['All', ...Array.from(new Set(portfolioProjects.map((project) => project.category)))] as Array<ProjectCategory | 'All'>
  const technologies = Array.from(new Set(portfolioProjects.flatMap((project) => project.technologies))).sort()
  const results = useMemo(() => {
    const query = search.trim().toLowerCase()
    return portfolioProjects.filter((project) => {
      const matchesSearch = !query || `${project.title} ${project.description} ${project.category} ${project.company ?? ''} ${project.technologies.join(' ')}`.toLowerCase().includes(query)
      const matchesType = projectType === 'all' || project.projectType === projectType
      return matchesSearch && matchesType && (category === 'All' || project.category === category) && (technology === 'All' || project.technologies.includes(technology)) && (status === 'All' || project.status === status)
    }).sort((a, b) => sort === 'title-asc' ? a.title.localeCompare(b.title) : sort === 'title-desc' ? b.title.localeCompare(a.title) : portfolioProjects.indexOf(a) - portfolioProjects.indexOf(b))
  }, [category, portfolioProjects, projectType, search, sort, status, technology])
  const featured = portfolioProjects.filter((project) => project.isFeatured)
  const update = (key: string, value: string, defaultValue: string) => setSearchParams(updateParam(new URLSearchParams(searchParams), key, value, defaultValue))

  return <main><PageMeta title="Projects | Full-Stack Software Developer" description="Explore professional WordPress projects and personal software projects with verified details." /><section className="border-b border-slate-200 py-20 dark:border-slate-800"><Container><SectionHeading eyebrow="Projects portfolio" title="Professional work and personal systems." >Professional WordPress work is kept separate from personal software projects. URLs, screenshots and individual contributions appear only when configured and verified.</SectionHeading></Container></section><section className="py-20"><Container><ProjectFilters projectType={projectType} search={search} category={category} technology={technology} status={status} sort={sort} categories={categories} technologies={technologies} onProjectType={(value) => update('type', value, 'all')} onSearch={(value) => update('search', value, '')} onCategory={(value) => update('category', value, 'All')} onTechnology={(value) => update('technology', value, 'All')} onStatus={(value) => update('status', value, 'All')} onSort={(value) => update('sort', value as ProjectSort, 'curated')} onReset={() => setSearchParams({})} /><p className="mt-6 text-sm text-slate-500" aria-live="polite">Showing {results.length} of {portfolioProjects.length} projects</p>{wordPressLoading && <p role="status" className="mt-4 text-xs text-slate-400">Checking published WordPress project records…</p>}{wordPressError && <p role="status" className="mt-4 text-xs text-slate-400">Published WordPress records are unavailable; verified local project records remain visible.</p>}{results.length > 0 ? <StaggerContainer className="mt-8 grid gap-6 lg:grid-cols-2">{results.map((project) => <StaggerItem key={project.slug}><ProjectCard project={project} featured={project.isFeatured} /></StaggerItem>)}</StaggerContainer> : <div className="mt-8"><EmptyState title="No projects match these filters" description="Try a different search or reset the filters to view the complete project registry." /> </div>}</Container></section>{featured.length > 0 && <section className="border-y border-slate-200 bg-slate-50 py-20 dark:border-slate-800 dark:bg-slate-900/40"><Container><SectionHeading eyebrow="Featured projects" title="Selected work from the portfolio." /><div className="mt-10 grid gap-6 lg:grid-cols-2">{featured.map((project) => <ProjectCard key={project.slug} project={project} featured />)}</div></Container></section>}</main>
}

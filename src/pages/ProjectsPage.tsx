import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Container } from '../components/ui/Container'
import { ExperienceTimeline } from '../components/experience/ExperienceTimeline'
import { PageMeta } from '../components/ui/PageMeta'
import { ProjectCard } from '../components/projects/ProjectCard'
import { ProjectFilters, type ProjectSort } from '../components/projects/ProjectFilters'
import { SectionHeading } from '../components/ui/SectionHeading'
import { EmptyState } from '../components/ui/EmptyState'
import { projectExperience } from '../data/experience'
import { projects } from '../data/projects'
import { publicProjects } from '../lib/api'
import { apiProjectToPortfolioProject } from '../utils/apiProjectMapper'
import type { PortfolioProject } from '../types/project'
import type { ProjectCategory, ProjectStatus } from '../types/project'

function updateParam(params: URLSearchParams, key: string, value: string, defaultValue: string) {
  if (value === defaultValue || value === '') params.delete(key)
  else params.set(key, value)
  return params
}

export function ProjectsPage() {
  const [wordPressProjects, setWordPressProjects] = useState<PortfolioProject[]>([])
  const [wordPressLoading, setWordPressLoading] = useState(true)
  const [wordPressError, setWordPressError] = useState(false)
  useEffect(() => { publicProjects().then((response) => setWordPressProjects(response.data.filter((project) => project.category === 'WordPress').map(apiProjectToPortfolioProject))).catch(() => { setWordPressProjects([]); setWordPressError(true) }).finally(() => setWordPressLoading(false)) }, [])
  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('search') ?? ''
  const category = (searchParams.get('category') ?? 'All') as ProjectCategory | 'All'
  const technology = searchParams.get('technology') ?? 'All'
  const status = (searchParams.get('status') ?? 'All') as ProjectStatus | 'All'
  const sort = (searchParams.get('sort') ?? 'curated') as ProjectSort
  const categories = ['All', ...Array.from(new Set(projects.map((project) => project.category)))] as Array<ProjectCategory | 'All'>
  const technologies = Array.from(new Set(projects.flatMap((project) => project.technologies))).sort()
  const results = useMemo(() => {
    const query = search.trim().toLowerCase()
    return projects.filter((project) => {
      const matchesSearch = !query || `${project.title} ${project.description} ${project.category} ${project.technologies.join(' ')}`.toLowerCase().includes(query)
      return matchesSearch && (category === 'All' || project.category === category) && (technology === 'All' || project.technologies.includes(technology)) && (status === 'All' || project.status === status)
    }).sort((a, b) => sort === 'title-asc' ? a.title.localeCompare(b.title) : sort === 'title-desc' ? b.title.localeCompare(a.title) : projects.indexOf(a) - projects.indexOf(b))
  }, [category, search, sort, status, technology])
  const update = (key: string, value: string, defaultValue: string) => setSearchParams(updateParam(new URLSearchParams(searchParams), key, value, defaultValue))

  return <main><PageMeta title="Projects | Full-Stack Software Developer" description="Explore project concepts, WordPress websites entered through the admin dashboard and practical case-study notes." /><section className="border-b border-slate-200 py-20 dark:border-slate-800"><Container><SectionHeading eyebrow="Projects portfolio" title="Systems for real-world workflows.">Explore projects by category, technology or status. Each entry keeps planned scope and verified implementation details clearly separated.</SectionHeading></Container></section><section className="py-20"><Container><ProjectFilters search={search} category={category} technology={technology} status={status} sort={sort} categories={categories} technologies={technologies} onSearch={(value) => update('search', value, '')} onCategory={(value) => update('category', value, 'All')} onTechnology={(value) => update('technology', value, 'All')} onStatus={(value) => update('status', value, 'All')} onSort={(value) => update('sort', value as ProjectSort, 'curated')} onReset={() => setSearchParams({})} /><p className="mt-6 text-sm text-slate-500" aria-live="polite">Showing {results.length} of {projects.length} projects</p>{results.length > 0 ? <div className="mt-6 grid gap-6 lg:grid-cols-2">{results.map((project) => <ProjectCard key={project.slug} project={project} />)}</div> : <div className="mt-8"><EmptyState title="No projects match these filters" description="Try a different search or reset the filters to view the complete project registry." /></div>}</Container></section><section className="border-y border-slate-200 bg-slate-50 py-20 dark:border-slate-800 dark:bg-slate-900/40"><Container><SectionHeading eyebrow="WordPress portfolio" title="Websites published through the admin dashboard.">Only actual WordPress projects entered and published by the administrator appear here. No placeholder websites are generated.</SectionHeading>{wordPressLoading && <p role="status" className="mt-8 text-sm text-slate-500">Loading published WordPress websites…</p>}{!wordPressLoading && wordPressError && <div className="mt-8"><EmptyState title="WordPress websites are temporarily unavailable" description="The public project service could not be reached. Try again when the API is available." /></div>}{!wordPressLoading && !wordPressError && wordPressProjects.length === 0 && <div className="mt-8"><EmptyState title="No WordPress websites published yet" description="Add an actual website through Admin → Projects and publish it to show it here." /></div>}{wordPressProjects.length > 0 && <div className="mt-10 grid gap-6 lg:grid-cols-2">{wordPressProjects.map((project) => <ProjectCard key={project.slug} project={project} />)}</div>}</Container></section><section className="py-24"><Container><SectionHeading eyebrow="Project-based experience" title="Practical Project Experience">Each project below represents portfolio work in development. Dates, employers and commercial details are intentionally omitted.</SectionHeading><div className="mt-12"><ExperienceTimeline items={projectExperience} /></div></Container></section></main>
}

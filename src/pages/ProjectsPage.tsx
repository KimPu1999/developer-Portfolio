import { useMemo } from 'react'
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
import type { ProjectCategory, ProjectStatus } from '../types/project'

function updateParam(params: URLSearchParams, key: string, value: string, defaultValue: string) {
  if (value === defaultValue || value === '') params.delete(key)
  else params.set(key, value)
  return params
}

export function ProjectsPage() {
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

  return <main><PageMeta title="Projects | Full-Stack Software Developer" description="Explore project concepts, technology stacks, planned modules and case-study notes across ERP, POS, social discovery and digital wallet systems." /><section className="border-b border-slate-200 py-20 dark:border-slate-800"><Container><SectionHeading eyebrow="Projects portfolio" title="Systems for real-world workflows.">Explore projects by category, technology or status. Each entry keeps planned scope and verified implementation details clearly separated.</SectionHeading></Container></section><section className="py-20"><Container><ProjectFilters search={search} category={category} technology={technology} status={status} sort={sort} categories={categories} technologies={technologies} onSearch={(value) => update('search', value, '')} onCategory={(value) => update('category', value, 'All')} onTechnology={(value) => update('technology', value, 'All')} onStatus={(value) => update('status', value, 'All')} onSort={(value) => update('sort', value, 'curated')} onReset={() => setSearchParams({})} /><p className="mt-6 text-sm text-slate-500" aria-live="polite">Showing {results.length} of {projects.length} projects</p>{results.length > 0 ? <div className="mt-6 grid gap-6 lg:grid-cols-2">{results.map((project) => <ProjectCard key={project.slug} project={project} />)}</div> : <div className="mt-8"><EmptyState title="No projects match these filters" description="Try a different search or reset the filters to view the complete project registry." /></div>}</Container></section><section className="bg-slate-50 py-24 dark:bg-slate-900/40"><Container><SectionHeading eyebrow="Project-based experience" title="Practical Project Experience">Each project below represents portfolio work in development. Dates, employers and commercial details are intentionally omitted.</SectionHeading><div className="mt-12"><ExperienceTimeline items={projectExperience} /></div></Container></section></main>
}

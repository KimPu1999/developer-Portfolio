import type { ProjectCategory, ProjectStatus } from '../../types/project'
import { SkillSearch } from '../skills/SkillSearch'

export type ProjectSort = 'curated' | 'title-asc' | 'title-desc'

interface ProjectFiltersProps {
  search: string; category: ProjectCategory | 'All'; technology: string; status: ProjectStatus | 'All'; sort: ProjectSort
  categories: Array<ProjectCategory | 'All'>; technologies: string[]
  onSearch: (value: string) => void; onCategory: (value: ProjectCategory | 'All') => void; onTechnology: (value: string) => void; onStatus: (value: ProjectStatus | 'All') => void; onSort: (value: ProjectSort) => void; onReset: () => void
}

function SelectField({ label, value, onChange, children }: { label: string; value: string; onChange: (value: string) => void; children: React.ReactNode }) {
  return <label className="block text-sm font-medium text-slate-700 dark:text-slate-300"><span className="mb-2 block">{label}</span><select value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white">{children}</select></label>
}

export function ProjectFilters(props: ProjectFiltersProps) {
  const hasFilters = props.search || props.category !== 'All' || props.technology !== 'All' || props.status !== 'All' || props.sort !== 'curated'
  return <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900/60 sm:p-5"><div className="flex flex-col gap-4 lg:flex-row lg:items-end"><SkillSearch value={props.search} onChange={props.onSearch} /><div className="grid flex-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"><SelectField label="Category" value={props.category} onChange={(value) => props.onCategory(value as ProjectCategory | 'All')}><option>All</option>{props.categories.filter((item) => item !== 'All').map((item) => <option key={item}>{item}</option>)}</SelectField><SelectField label="Technology" value={props.technology} onChange={props.onTechnology}><option>All</option>{props.technologies.map((item) => <option key={item}>{item}</option>)}</SelectField><SelectField label="Status" value={props.status} onChange={(value) => props.onStatus(value as ProjectStatus | 'All')}><option>All</option><option>In Development</option><option>Concept</option></SelectField><SelectField label="Sort" value={props.sort} onChange={(value) => props.onSort(value as ProjectSort)}><option value="curated">Curated order</option><option value="title-asc">Title A–Z</option><option value="title-desc">Title Z–A</option></SelectField></div>{hasFilters && <button type="button" onClick={props.onReset} className="rounded-full border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-cyan-400 hover:text-cyan-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 dark:border-slate-700 dark:text-slate-300">Reset filters</button>}</div></div>
}

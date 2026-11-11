import { BriefcaseBusiness, CalendarDays, CheckCircle2, Code2, ListChecks } from 'lucide-react'
import type { ProfessionalExperienceItem } from '../../types/portfolio'
import { SkillBadge } from '../ui/SkillBadge'

export function ProfessionalExperienceCard({ item }: { item: ProfessionalExperienceItem }) {
  return <article className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/60 sm:p-8">
    <div className="flex flex-wrap items-start justify-between gap-5">
      <div>
        <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-300"><BriefcaseBusiness size={14} aria-hidden="true" /> Professional experience</p>
        <h3 className="mt-4 text-2xl font-semibold text-slate-950 dark:text-white">{item.title}</h3>
        <p className="mt-2 text-base font-medium text-cyan-600 dark:text-cyan-300">{item.organization}</p>
      </div>
      <div className="flex flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-400">
        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 dark:border-slate-700"><CalendarDays size={14} aria-hidden="true" />{item.duration}</span>
        <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-2 text-cyan-700 dark:text-cyan-300">20+ websites</span>
      </div>
    </div>
    {item.employmentDates && <p className="mt-4 text-sm text-slate-500">{item.employmentDates}</p>}
    <p className="mt-6 leading-7 text-slate-600 dark:text-slate-400">{item.summary}</p>
    <div className="mt-7 grid gap-7 md:grid-cols-2">
      <div><h4 className="flex items-center gap-2 text-sm font-semibold text-slate-950 dark:text-white"><ListChecks size={17} className="text-cyan-500" /> Key responsibilities</h4><ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{item.responsibilities.map((responsibility) => <li key={responsibility} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />{responsibility}</li>)}</ul></div>
      <div><h4 className="flex items-center gap-2 text-sm font-semibold text-slate-950 dark:text-white"><CheckCircle2 size={17} className="text-cyan-500" /> Highlights</h4><ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{item.achievements.map((achievement) => <li key={achievement} className="flex gap-3"><CheckCircle2 size={16} className="mt-1 shrink-0 text-emerald-500" />{achievement}</li>)}</ul></div>
    </div>
    <div className="mt-7 flex flex-wrap gap-2 border-t border-slate-200 pt-6 dark:border-slate-800"><Code2 size={17} className="mt-1 text-cyan-500" aria-hidden="true" />{item.technologies.map((technology) => <SkillBadge key={technology}>{technology}</SkillBadge>)}</div>
  </article>
}

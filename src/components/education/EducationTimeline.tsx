import type { EducationRecord } from '../../types/portfolio'
import { EducationCard } from './EducationCard'

export function EducationTimeline({ items }: { items: EducationRecord[] }) {
  return <div className="relative space-y-8 before:absolute before:bottom-6 before:left-3 before:top-6 before:w-px before:bg-cyan-400/30 sm:before:left-5">{items.map((item) => <div key={item.id} className="relative pl-10 sm:pl-14"><span className="absolute left-0 top-7 h-7 w-7 rounded-full border-4 border-white bg-cyan-400 shadow-[0_0_0_1px_rgba(56,189,248,.35)] dark:border-slate-950 sm:h-10 sm:w-10" /><EducationCard item={item} /></div>)}</div>
}

import type { ExperienceItem } from '../../types/portfolio'
import { ExperienceCard } from './ExperienceCard'

export function ExperienceTimeline({ items }: { items: ExperienceItem[] }) {
  return <div className="relative space-y-6 before:absolute before:bottom-8 before:left-3 before:top-8 before:w-px before:bg-cyan-400/30 sm:before:left-5">{items.map((item) => <div key={item.id} className="relative pl-10 sm:pl-14"><span className="absolute left-0 top-7 h-7 w-7 rounded-full border-4 border-white bg-blue-600 dark:border-slate-950 sm:h-10 sm:w-10" /><ExperienceCard item={item} /></div>)}</div>
}

import type { ProfessionalExperienceItem } from '../../types/portfolio'
import { StaggerContainer, StaggerItem } from '../motion/MotionPrimitives'
import { ProfessionalExperienceCard } from './ProfessionalExperienceCard'

export function ProfessionalExperienceTimeline({ items }: { items: ProfessionalExperienceItem[] }) {
  return <StaggerContainer className="relative space-y-6 before:absolute before:bottom-8 before:left-3 before:top-8 before:w-px before:bg-cyan-400/30 sm:before:left-5">{items.map((item) => <StaggerItem key={item.id} className="relative pl-10 sm:pl-14"><span className="absolute left-0 top-8 h-7 w-7 rounded-full border-4 border-white bg-blue-600 dark:border-slate-950 sm:h-10 sm:w-10" /><ProfessionalExperienceCard item={item} /></StaggerItem>)}</StaggerContainer>
}

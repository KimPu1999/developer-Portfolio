import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Container } from '../components/ui/Container'
import { SectionHeading } from '../components/ui/SectionHeading'
import { SkillBadge } from '../components/ui/SkillBadge'
import { portfolio } from '../data/portfolio'
import { FadeInSection, StaggerContainer, StaggerItem } from '../components/motion/MotionPrimitives'

export function SkillsPreview() {
  return <section className="skills-preview-section bg-white py-24 dark:bg-slate-900/40"><Container><FadeInSection><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><SectionHeading eyebrow="The toolkit" title="Curious across the stack." /><Link to="/skills" className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-600 hover:text-cyan-400 dark:text-cyan-300">See all skills <ArrowUpRight size={16} /></Link></div></FadeInSection><StaggerContainer className="skills-preview-grid mt-12 grid gap-px overflow-hidden rounded-[1.6rem] border border-slate-200 bg-slate-200 dark:border-slate-800 dark:bg-slate-800 sm:grid-cols-2 lg:grid-cols-3">{portfolio.skills.map((group) => <StaggerItem key={group.name} className="skills-preview-card bg-white p-6 transition-colors hover:bg-slate-50 dark:bg-slate-950 dark:hover:bg-slate-900"><div className="flex items-center justify-between"><h3 className="font-semibold text-slate-950 dark:text-white">{group.name}</h3><span className="font-mono text-xs text-cyan-500">{group.eyebrow}</span></div><div className="mt-5 flex flex-wrap gap-2">{group.skills.slice(0, 5).map((skill) => <SkillBadge key={skill.name}>{skill.name}</SkillBadge>)}</div></StaggerItem>)}</StaggerContainer></Container></section>
}

import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Container } from '../components/ui/Container'
import { SectionHeading } from '../components/ui/SectionHeading'
import { SkillBadge } from '../components/ui/SkillBadge'
import { portfolio } from '../data/portfolio'

export function SkillsPreview() {
  return <section className="py-24"><Container><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><SectionHeading eyebrow="The toolkit" title="Curious across the stack." /><Link to="/skills" className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-600 hover:text-cyan-400 dark:text-cyan-300">See all skills <ArrowUpRight size={16} /></Link></div><div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 dark:border-slate-800 dark:bg-slate-800 sm:grid-cols-2 lg:grid-cols-3">{portfolio.skills.map((group) => <div key={group.name} className="bg-white p-6 dark:bg-slate-950"><div className="flex items-center justify-between"><h3 className="font-semibold text-slate-950 dark:text-white">{group.name}</h3><span className="font-mono text-xs text-cyan-500">{group.eyebrow}</span></div><div className="mt-5 flex flex-wrap gap-2">{group.skills.slice(0, 5).map((skill) => <SkillBadge key={skill.name}>{skill.name}</SkillBadge>)}</div></div>)}</div></Container></section>
}

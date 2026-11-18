import { Braces, Code2, Database, Globe2, Server, ShieldCheck } from 'lucide-react'
import type { Skill } from '../../types/portfolio'
import { Link } from 'react-router-dom'
import { skillSlug } from '../../data/skillDocs'

const icons = { Frontend: Code2, Backend: Server, Programming: Braces, Databases: Database, CMS: Globe2, 'WordPress Developer': Globe2, Security: ShieldCheck }

export function SkillCard({ skill, category }: { skill: Skill; category: string }) {
  const Icon = icons[category as keyof typeof icons] ?? Code2
  return <Link to={`/skills/${skillSlug(skill.name)}`} className="group block rounded-2xl border border-slate-200 bg-white p-5 transition duration-200 hover:-translate-y-1 hover:border-cyan-400/60 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 dark:border-slate-800 dark:bg-slate-900/60"><div className="flex items-start justify-between gap-4"><span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-400/10 text-cyan-500 transition group-hover:bg-cyan-400 group-hover:text-slate-950 dark:text-cyan-300"><Icon size={19} /></span><span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">{category}</span></div><h3 className="mt-5 font-semibold text-slate-950 dark:text-white">{skill.name}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{skill.description}</p><span className="mt-5 inline-flex text-xs font-semibold text-cyan-600 opacity-0 transition group-hover:opacity-100 dark:text-cyan-300">Open learning path →</span></Link>
}

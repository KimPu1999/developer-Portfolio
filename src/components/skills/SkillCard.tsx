import { Braces, Code2, Database, Globe2, Server, ShieldCheck } from 'lucide-react'
import type { Skill } from '../../types/portfolio'

const icons = { Frontend: Code2, Backend: Server, Programming: Braces, Databases: Database, CMS: Globe2, 'WordPress Developer': Globe2, Security: ShieldCheck }

export function SkillCard({ skill, category }: { skill: Skill; category: string }) {
  const Icon = icons[category as keyof typeof icons] ?? Code2
  return <article className="rounded-2xl border border-slate-200 bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-cyan-400/50 dark:border-slate-800 dark:bg-slate-900/60"><div className="flex items-start justify-between gap-4"><span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-400/10 text-cyan-500 dark:text-cyan-300"><Icon size={19} /></span><span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">{category}</span></div><h3 className="mt-5 font-semibold text-slate-950 dark:text-white">{skill.name}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{skill.description}</p></article>
}

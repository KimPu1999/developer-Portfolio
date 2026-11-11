import { ArrowUpRight, BriefcaseBusiness, Code2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { portfolio } from '../../data/portfolio'

export function Footer() {
  return <footer className="border-t border-slate-200 py-10 dark:border-slate-800"><div className="mx-auto flex max-w-7xl flex-col gap-7 px-5 sm:px-8 md:flex-row md:items-end md:justify-between lg:px-10"><div><Link to="/" className="font-semibold text-slate-950 dark:text-white">{portfolio.displayName}</Link><p className="mt-2 text-sm text-slate-500">{portfolio.role}</p><p className="mt-5 text-xs text-slate-400">© {new Date().getFullYear()} · Built with React and TypeScript.</p></div><div className="flex items-center gap-5 text-sm text-slate-500"><span className="inline-flex items-center gap-1"><Code2 size={16} /> GitHub pending</span><span className="inline-flex items-center gap-1"><BriefcaseBusiness size={16} /> LinkedIn pending</span><Link to="/contact" className="inline-flex items-center gap-1 font-semibold text-cyan-500">Contact <ArrowUpRight size={15} /></Link></div></div></footer>
}

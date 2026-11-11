import { ArrowUpRight, BriefcaseBusiness, Code2, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { portfolio } from '../../data/portfolio'

export function Footer() {
  const github = portfolio.contact.find((item) => item.label === 'GitHub')
  const linkedin = portfolio.contact.find((item) => item.label === 'LinkedIn')
  const email = portfolio.contact.find((item) => item.label === 'Email')

  return <footer className="border-t border-slate-200 py-10 dark:border-slate-800"><div className="mx-auto flex max-w-7xl flex-col gap-7 px-5 sm:px-8 md:flex-row md:items-end md:justify-between lg:px-10"><div><Link to="/" className="inline-flex items-center gap-3 font-semibold text-slate-950 dark:text-white"><span className="grid h-9 w-9 place-items-center rounded-xl bg-cyan-400 font-mono text-sm font-bold text-slate-950">{portfolio.initials}</span><span>{portfolio.displayName}</span></Link><p className="mt-3 text-sm text-slate-500">{portfolio.role}</p><p className="mt-5 text-xs text-slate-400">© {new Date().getFullYear()} · Built with React and TypeScript.</p></div><nav className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-slate-500" aria-label="Footer links">{github?.href && <a className="inline-flex items-center gap-1 transition hover:text-cyan-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400" href={github.href} target="_blank" rel="noopener noreferrer"><Code2 size={16} /> GitHub</a>}{linkedin?.href && <a className="inline-flex items-center gap-1 transition hover:text-cyan-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400" href={linkedin.href} target="_blank" rel="noopener noreferrer"><BriefcaseBusiness size={16} /> LinkedIn</a>}{email?.href && <a className="inline-flex items-center gap-1 transition hover:text-cyan-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400" href={email.href}><Mail size={16} /> Email</a>}<Link to="/contact" className="inline-flex items-center gap-1 font-semibold text-cyan-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400">Contact <ArrowUpRight size={15} /></Link></nav></div></footer>
}

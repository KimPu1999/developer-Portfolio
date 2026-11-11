import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Container } from '../components/ui/Container'

export function ContactCta() {
  return <section className="py-24"><Container><div className="relative overflow-hidden rounded-3xl border border-cyan-400/30 bg-slate-900 px-7 py-12 dark:bg-slate-900 sm:px-12 sm:py-16"><div className="pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full bg-cyan-400/15 blur-3xl" /><div className="relative max-w-2xl"><p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Next step</p><h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Have a problem worth solving?</h2><p className="mt-4 max-w-xl leading-7 text-slate-400">I’m open to opportunities where I can contribute thoughtful frontend, backend and database work.</p><Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">Get in touch <ArrowUpRight size={16} /></Link></div></div></Container></section>
}

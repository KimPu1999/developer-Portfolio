import { ArrowUpRight, GraduationCap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Container } from '../components/ui/Container'
import { SectionHeading } from '../components/ui/SectionHeading'
import { portfolio } from '../data/portfolio'

export function AboutPreview() {
  return <section id="about" className="bg-slate-50 py-24 dark:bg-slate-900/40"><Container className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-end"><SectionHeading eyebrow="A little about me" title="A developer who likes to see the whole system.">My background in cybersecurity shapes how I think about the details: the data, the user journey and the trust a product needs to earn.</SectionHeading><div><p className="max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-400">{portfolio.about}</p><div className="mt-7 flex flex-wrap items-center gap-4"><Link to="/about" className="inline-flex items-center gap-2 font-semibold text-cyan-600 hover:text-cyan-400 dark:text-cyan-300">More about my approach <ArrowUpRight size={16} /></Link><span className="h-1 w-1 rounded-full bg-slate-400" /><span className="inline-flex items-center gap-2 text-sm text-slate-500"><GraduationCap size={17} /> {portfolio.education.title}</span></div></div></Container></section>
}

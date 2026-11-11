import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Container } from '../ui/Container'
import { ProfileCard } from '../ui/ProfileCard'
import { portfolio } from '../../data/portfolio'

export function AboutHero() {
  return <section className="border-b border-slate-200 py-16 dark:border-slate-800 sm:py-24"><Container className="grid items-center gap-14 lg:grid-cols-[.8fr_1.2fr]"><motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .55 }}><ProfileCard profile={portfolio} /></motion.div><motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55, delay: .1 }}><p className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-500 dark:text-cyan-300">About me</p><h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-6xl">Building useful software with a security-aware mindset.</h1><p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">{portfolio.about}</p><div className="mt-8 flex flex-wrap gap-3"><Link to="/projects" className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-300">View projects <ArrowUpRight size={16} /></Link><Link to="/skills" className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:border-cyan-400 hover:text-cyan-500 dark:border-slate-700 dark:text-slate-200">Explore skills</Link></div></motion.div></Container></section>
}

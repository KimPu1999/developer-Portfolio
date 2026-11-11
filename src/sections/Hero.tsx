import { ArrowDown, ArrowUpRight, BriefcaseBusiness, Code2, ShieldCheck } from 'lucide-react'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { FadeInSection, MagneticButton, RevealText } from '../components/motion/MotionPrimitives'
import { Button } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { portfolio } from '../data/portfolio'

export function Hero() {
  const experience = portfolio.professionalExperience[0]
  return <section className="grain relative overflow-hidden border-b border-slate-200 dark:border-slate-800">
    <div className="pointer-events-none absolute right-[-12rem] top-[-10rem] h-[34rem] w-[34rem] rounded-full border border-cyan-400/10" />
    <div className="pointer-events-none absolute right-[-5rem] top-[-3rem] h-[20rem] w-[20rem] rounded-full border border-blue-500/10" />
    <Container className="relative grid min-h-[calc(100vh-72px)] items-center gap-14 py-20 lg:grid-cols-[1.25fr_.75fr] lg:gap-20 lg:py-28">
      <div>
        <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .5 }} className="section-kicker mb-7 flex items-center gap-3"><span className="h-px w-10 bg-cyan-400" /> Full-stack developer · TKP</motion.p>
        <h1 className="max-w-5xl text-[clamp(3.25rem,8vw,7.8rem)] font-semibold leading-[.92] tracking-[-.075em] text-slate-950 dark:text-white"><RevealText>Build with</RevealText>{' '}<RevealText delay={.08} className="font-display text-cyan-600 dark:text-cyan-300">clarity.</RevealText><br /><RevealText delay={.16}>Secure by</RevealText>{' '}<RevealText delay={.24} className="font-display text-slate-500 dark:text-slate-400">design.</RevealText></h1>
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55, delay: .32 }} className="mt-8 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">{portfolio.summary}</motion.p>
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55, delay: .4 }} className="mt-4 font-medium text-slate-900 dark:text-slate-200">{portfolio.subtitle}</motion.p>
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55, delay: .48 }} className="mt-9 flex flex-wrap items-center gap-3"><MagneticButton><Button to="/projects" showArrow>View projects</Button></MagneticButton><Button to="/contact" variant="secondary">Start a conversation</Button></motion.div>
        <motion.a href="#about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .5, delay: .8 }} className="mt-14 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[.18em] text-slate-400 transition hover:text-cyan-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"><span className="grid h-9 w-9 place-items-center rounded-full border border-slate-300 dark:border-slate-700"><ArrowDown size={15} /></span> Scroll to explore</motion.a>
      </div>
      <FadeInSection className="relative lg:pt-24">
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900/70 sm:p-8">
          <div className="flex items-center justify-between border-b border-slate-200 pb-5 dark:border-slate-800"><span className="font-mono text-xs text-slate-400">/selected-signal</span><ShieldCheck size={17} className="text-cyan-500" aria-label="Security-aware development" /></div>
          <div className="py-9"><p className="section-kicker">Professional experience</p><h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">{experience.title}</h2><p className="mt-2 text-sm text-cyan-600 dark:text-cyan-300">{experience.organization}</p><p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-400">{experience.summary}</p></div>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 dark:border-slate-700 dark:bg-slate-700"><div className="bg-slate-50 p-4 dark:bg-slate-900"><Code2 size={17} className="text-cyan-500" /><p className="mt-4 text-2xl font-semibold text-slate-950 dark:text-white">3</p><p className="mt-1 text-xs text-slate-500">years experience</p></div><div className="bg-slate-50 p-4 dark:bg-slate-900"><BriefcaseBusiness size={17} className="text-cyan-500" /><p className="mt-4 text-2xl font-semibold text-slate-950 dark:text-white">20+</p><p className="mt-1 text-xs text-slate-500">websites built</p></div></div>
          <Link to="/experience" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-600 transition hover:text-cyan-400 dark:text-cyan-300">View professional experience <ArrowUpRight size={15} /></Link>
        </div>
        <div className="absolute -bottom-5 -left-5 hidden h-20 w-20 border-b border-l border-cyan-400/40 sm:block" aria-hidden="true" />
      </FadeInSection>
    </Container>
  </section>
}

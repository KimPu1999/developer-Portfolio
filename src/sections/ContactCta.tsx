import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Container } from '../components/ui/Container'
import { FadeInSection, MagneticButton } from '../components/motion/MotionPrimitives'

export function ContactCta() {
  return <section className="py-24"><Container><FadeInSection><div className="grain relative overflow-hidden rounded-[2rem] border border-cyan-400/30 bg-slate-900 px-7 py-12 dark:bg-slate-900 sm:px-12 sm:py-16"><div className="editorial-sheen pointer-events-none absolute right-0 top-0 h-full w-1/2 border-l border-cyan-400/10" /><div className="relative max-w-2xl"><p className="section-kicker">Next step</p><h2 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">Have a problem worth solving?</h2><p className="mt-5 max-w-xl leading-7 text-slate-400">I’m open to opportunities where I can contribute thoughtful frontend, backend and database work.</p><MagneticButton className="inline-block"><Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">Get in touch <ArrowUpRight size={16} /></Link></MagneticButton></div></div></FadeInSection></Container></section>
}

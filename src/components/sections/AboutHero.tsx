import { motion } from 'motion/react'
import { Container } from '../ui/Container'
import { ProfileCard } from '../ui/ProfileCard'
import { portfolio } from '../../data/portfolio'
import { Button } from '../ui/Button'

export function AboutHero() {
  return <section className="border-b border-slate-200 py-16 dark:border-slate-800 sm:py-24"><Container className="grid items-center gap-14 lg:grid-cols-[.8fr_1.2fr]"><motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .55 }}><ProfileCard profile={portfolio} /></motion.div><motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55, delay: .1 }}><p className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-text)]">About me</p><h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-[var(--color-text)] sm:text-6xl">Building useful software with a security-aware mindset.</h1><p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--color-text-soft)]">{portfolio.about}</p><p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--color-muted)]">Academic background: BCA in Cybersecurity at Tilak Maharashtra Vidyapeeth (TMV), plus a B.Sc. in Mathematics at Second Year from Kalay University. Graduation status for the B.Sc. record has not been confirmed.</p><div className="mt-8 flex flex-wrap gap-3"><Button to="/projects" showArrow>View projects</Button><Button to="/resume" variant="secondary">View resume</Button><Button href={portfolio.contact.find((item) => item.label === 'Email')?.href} variant="ghost">Contact me</Button></div></motion.div></Container></section>
}

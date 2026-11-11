import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import type { PointerEvent, ReactNode } from 'react'

interface MotionProps {
  children: ReactNode
  className?: string
  delay?: number
  role?: string
  'aria-label'?: string
}

export function FadeInSection({ children, className = '', delay = 0 }: MotionProps) {
  const reducedMotion = useReducedMotion()
  return <motion.div className={className} initial={reducedMotion ? false : { opacity: 0, y: 24 }} whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.16 }} transition={{ duration: 0.58, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>
}

export function StaggerContainer({ children, className = '', delay = 0 }: MotionProps) {
  const reducedMotion = useReducedMotion()
  return <motion.div className={className} initial={reducedMotion ? false : 'hidden'} whileInView={reducedMotion ? undefined : 'visible'} viewport={{ once: true, amount: 0.12 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: delay } } }}>{children}</motion.div>
}

export function StaggerItem({ children, className = '' }: Omit<MotionProps, 'delay'>) {
  const reducedMotion = useReducedMotion()
  return <motion.div className={className} variants={reducedMotion ? undefined : { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] } } }}>{children}</motion.div>
}

export function RevealText({ children, className = '', delay = 0 }: MotionProps) {
  const reducedMotion = useReducedMotion()
  return <span className={`inline-block overflow-hidden align-bottom ${className}`}><motion.span className="inline-block" initial={reducedMotion ? false : { y: '105%' }} animate={reducedMotion ? undefined : { y: 0 }} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.span></span>
}

export function AnimatedHeading({ children, className = '', delay = 0 }: MotionProps) {
  const reducedMotion = useReducedMotion()
  return <motion.h1 className={className} initial={reducedMotion ? false : { opacity: 0, y: 18 }} animate={reducedMotion ? undefined : { opacity: 1, y: 0 }} transition={{ duration: reducedMotion ? 0 : 0.62, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.h1>
}

export function HoverLift({ children, className = '' }: Omit<MotionProps, 'delay'>) {
  const reducedMotion = useReducedMotion()
  return <motion.div className={className} whileHover={reducedMotion ? undefined : { y: -5 }} transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>
}

export function ImageReveal({ children, className = '', delay = 0, role, 'aria-label': ariaLabel }: MotionProps) {
  const reducedMotion = useReducedMotion()
  return <motion.div role={role} aria-label={ariaLabel} className={`overflow-hidden ${className}`} initial={reducedMotion ? false : { opacity: 0, scale: 1.04 }} whileInView={reducedMotion ? undefined : { opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>
}

export function AnimatedTimeline({ children, className = '' }: Omit<MotionProps, 'delay'>) {
  return <FadeInSection className={className}>{children}</FadeInSection>
}

export function PageTransition({ children, pathname }: { children: ReactNode; pathname: string }) {
  const reducedMotion = useReducedMotion()
  return <AnimatePresence mode="wait" initial={false}><motion.div key={pathname} initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={reducedMotion ? undefined : { opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 0.28 }}>{children}</motion.div></AnimatePresence>
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.2 })
  return <motion.div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-cyan-400" style={{ scaleX }} aria-hidden="true" />
}

export function MagneticButton({ children, className = '' }: Omit<MotionProps, 'delay'>) {
  const reducedMotion = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 18 })
  const springY = useSpring(y, { stiffness: 300, damping: 18 })
  const rotate = useTransform(springX, [-12, 12], [-2, 2])
  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    x.set((event.clientX - (rect.left + rect.width / 2)) * 0.12)
    y.set((event.clientY - (rect.top + rect.height / 2)) * 0.12)
  }
  function onPointerLeave() { x.set(0); y.set(0) }
  return <motion.div className={className} style={reducedMotion ? undefined : { x: springX, y: springY, rotate }} onPointerMove={reducedMotion ? undefined : onPointerMove} onPointerLeave={reducedMotion ? undefined : onPointerLeave}>{children}</motion.div>
}

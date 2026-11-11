import type { ReactNode } from 'react'

export function SectionHeading({ eyebrow, title, children, align = 'left' }: { eyebrow: string; title: string; children?: ReactNode; align?: 'left' | 'center' }) {
  return <div className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
    <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.22em] text-cyan-400">{eyebrow}</p>
    <h2 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl">{title}</h2>
    {children && <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-400">{children}</p>}
  </div>
}

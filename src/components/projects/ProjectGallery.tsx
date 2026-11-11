import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { ProjectScreenshot } from '../../types/project'
import { EmptyState } from '../ui/EmptyState'

export function ProjectGallery({ screenshots = [] }: { screenshots?: ProjectScreenshot[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const active = activeIndex === null ? undefined : screenshots[activeIndex]
  useEffect(() => {
    if (activeIndex === null) return
    closeButtonRef.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') setActiveIndex(null); if (event.key === 'ArrowRight') setActiveIndex((index) => index === null ? 0 : (index + 1) % screenshots.length); if (event.key === 'ArrowLeft') setActiveIndex((index) => index === null ? 0 : (index - 1 + screenshots.length) % screenshots.length) }
    window.addEventListener('keydown', onKeyDown); return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeIndex, screenshots.length])
  if (screenshots.length === 0) return <EmptyState title="Screenshots coming later" description="Real project screenshots can be added to the typed project record when they are available." />
  return <><div className="grid gap-4 sm:grid-cols-2">{screenshots.map((screenshot, index) => <button key={screenshot.src} type="button" onClick={() => setActiveIndex(index)} className="group overflow-hidden rounded-2xl border border-slate-200 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 dark:border-slate-800"><img src={screenshot.src} alt={screenshot.alt} width={1280} height={720} loading="lazy" decoding="async" className="aspect-video w-full object-cover transition duration-300 group-hover:scale-105" />{screenshot.caption && <span className="block p-3 text-sm text-slate-500">{screenshot.caption}</span>}</button>)}</div>{active && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-5" role="dialog" aria-modal="true" aria-label="Project screenshot viewer" onClick={() => setActiveIndex(null)}><div className="relative max-h-full max-w-5xl" onClick={(event) => event.stopPropagation()}><button ref={closeButtonRef} type="button" onClick={() => setActiveIndex(null)} aria-label="Close screenshot viewer" className="absolute -right-2 -top-12 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"><X size={20} /></button><img src={active.src} alt={active.alt} width={1280} height={720} decoding="async" className="max-h-[80vh] max-w-full rounded-xl object-contain" />{active.caption && <p className="mt-3 text-center text-sm text-slate-300">{active.caption}</p>}<button type="button" onClick={() => setActiveIndex((index) => index === null ? 0 : (index - 1 + screenshots.length) % screenshots.length)} aria-label="Previous screenshot" className="absolute left-3 top-1/2 rounded-full bg-slate-950/70 p-3 text-white hover:bg-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"><ChevronLeft /></button><button type="button" onClick={() => setActiveIndex((index) => index === null ? 0 : (index + 1) % screenshots.length)} aria-label="Next screenshot" className="absolute right-3 top-1/2 rounded-full bg-slate-950/70 p-3 text-white hover:bg-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"><ChevronRight /></button></div></div>}</>
}

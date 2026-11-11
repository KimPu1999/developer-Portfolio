import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { portfolio } from '../../data/portfolio'
import { ThemeToggle } from '../ui/ThemeToggle'
import type { Theme } from '../../types/portfolio'
import { MobileNavigation, type NavigationLink } from './MobileNavigation'

const links: NavigationLink[] = [{ label: 'Home', to: '/' }, { label: 'About', to: '/about' }, { label: 'Skills', to: '/skills' }, { label: 'Projects', to: '/projects' }, { label: 'Experience', to: '/experience' }, { label: 'Education', to: '/education' }, { label: 'Certifications', to: '/certifications' }, { label: 'Resume', to: '/resume' }, { label: 'Contact', to: '/contact' }]

export function Header({ theme, onThemeToggle }: { theme: Theme; onThemeToggle: () => void }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  useEffect(() => setOpen(false), [location.pathname])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return <header className={`site-header sticky top-0 z-40 border-b transition-colors duration-300 ${scrolled ? 'border-slate-300/80 bg-white/95 shadow-sm dark:border-slate-700/80 dark:bg-slate-950/95' : 'border-slate-200/80 bg-white/80 dark:border-slate-800/80 dark:bg-slate-950/80'} backdrop-blur-xl`}>
    <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
      <Link to="/" className="group flex items-center gap-3" aria-label={`${portfolio.initials} home`}><span className="grid h-9 w-9 place-items-center rounded-xl bg-cyan-400 font-mono text-sm font-bold text-slate-950 transition group-hover:rotate-6">{portfolio.initials}</span><span className="hidden text-sm font-semibold text-slate-900 dark:text-white sm:block">{portfolio.displayName}</span></Link>
      <nav className="site-nav hidden items-center gap-0.5 xl:flex" aria-label="Main navigation">{links.map((link) => <NavLink key={link.to} to={link.to} className={({ isActive }) => `relative rounded-lg px-2.5 py-2 text-sm transition ${isActive ? 'font-semibold text-cyan-500 dark:text-cyan-300' : 'text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white'}`}>{({ isActive }) => <>{link.label}{isActive && <span className="absolute inset-x-2 -bottom-1 h-0.5 rounded-full bg-cyan-400 transition-transform duration-200" />}</>}</NavLink>)}</nav>
      <div className="flex items-center gap-2"><ThemeToggle theme={theme} onToggle={onThemeToggle} /><button type="button" className="rounded-full border border-slate-300 p-2.5 text-slate-600 dark:border-slate-700 dark:text-slate-300 xl:hidden" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={open} onClick={() => setOpen((value) => !value)}>{open ? <X size={18} /> : <Menu size={18} />}</button></div>
    </div>
    {open && <MobileNavigation links={links} />}
  </header>
}

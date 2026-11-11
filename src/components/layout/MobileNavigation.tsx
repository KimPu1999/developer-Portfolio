import { NavLink } from 'react-router-dom'

export interface NavigationLink {
  label: string
  to: string
}

export function MobileNavigation({ links }: { links: NavigationLink[] }) {
  return <nav className="site-mobile-nav border-t border-slate-200 bg-white px-5 py-3 dark:border-slate-800 dark:bg-slate-950 xl:hidden" aria-label="Mobile navigation">{links.map((link) => <NavLink key={link.to} to={link.to} className={({ isActive }) => `block rounded-lg px-3 py-3 text-sm ${isActive ? 'bg-cyan-400/10 font-semibold text-cyan-500 dark:text-cyan-300' : 'text-slate-600 dark:text-slate-300'}`}>{link.label}</NavLink>)}</nav>
}

import { Moon, Sun } from 'lucide-react'
import type { Theme } from '../../types/portfolio'

export function ThemeToggle({ theme, onToggle }: { theme: Theme; onToggle: () => void }) {
  const nextLabel = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
  return <button type="button" onClick={onToggle} aria-label={nextLabel} title={nextLabel} className="rounded-full border border-slate-300 p-2.5 text-slate-600 transition hover:border-cyan-400 hover:text-cyan-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 dark:border-slate-700 dark:text-slate-300">
    {theme === 'dark' ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
  </button>
}

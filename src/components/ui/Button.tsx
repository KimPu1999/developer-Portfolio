import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  to?: string
  href?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  showArrow?: boolean
}

const classes = 'inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:pointer-events-none disabled:opacity-50'

export function Button({ children, to, href, variant = 'primary', showArrow = false, className = '', ...props }: ButtonProps) {
  const styles = variant === 'primary'
    ? 'bg-cyan-400 text-slate-950 hover:bg-cyan-300'
    : variant === 'secondary'
      ? 'border border-slate-700 bg-slate-900/40 text-slate-100 hover:border-cyan-400/60 hover:bg-slate-800'
      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
  const content = <>{children}{showArrow && <ArrowUpRight size={16} aria-hidden="true" />}</>

  if (to) return <Link className={`${classes} ${styles} ${className}`} to={to}>{content}</Link>
  if (href) return <a className={`${classes} ${styles} ${className}`} href={href}>{content}</a>
  return <button className={`${classes} ${styles} ${className}`} {...props}>{content}</button>
}

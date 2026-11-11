export function SkillBadge({ children }: { children: string }) {
  return <span className="rounded-full border border-slate-300 bg-white/70 px-3 py-1.5 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300">{children}</span>
}

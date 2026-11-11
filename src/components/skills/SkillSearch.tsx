import { Search } from 'lucide-react'

export function SkillSearch({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return <div className="relative w-full max-w-sm"><label htmlFor="skill-search" className="sr-only">Search skills</label><Search size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input id="skill-search" value={value} onChange={(event) => onChange(event.target.value)} placeholder="Search skills" className="w-full rounded-full border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white" /></div>
}

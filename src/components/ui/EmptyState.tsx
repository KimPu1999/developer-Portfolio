import { Inbox } from 'lucide-react'

export function EmptyState({ title, description, action }: { title: string; description: string; action?: React.ReactNode }) {
  return <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center dark:border-slate-700 dark:bg-slate-900/50"><div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-cyan-400/10 text-cyan-500 dark:text-cyan-300"><Inbox size={22} /></div><h3 className="mt-5 font-semibold text-slate-950 dark:text-white">{title}</h3><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">{description}</p>{action && <div className="mt-5">{action}</div>}</div>
}

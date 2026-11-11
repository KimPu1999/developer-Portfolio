import { BadgeCheck, ExternalLink } from 'lucide-react'
import type { Certification } from '../../types/portfolio'

export function CertificationCard({ item }: { item: Certification }) {
  return <article className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/60"><div className="flex items-center justify-between"><span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-400/10 text-cyan-500 dark:text-cyan-300"><BadgeCheck size={20} /></span>{item.issueDate && <span className="text-xs text-slate-500">{item.issueDate}</span>}</div><h3 className="mt-5 font-semibold text-slate-950 dark:text-white">{item.name}</h3>{item.issuer && <p className="mt-2 text-sm text-slate-500">{item.issuer}</p>}{item.credentialId && <p className="mt-3 font-mono text-xs text-slate-400">ID: {item.credentialId}</p>}{item.verificationUrl && <a href={item.verificationUrl} className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-cyan-500">Verify credential <ExternalLink size={14} /></a>}</article>
}

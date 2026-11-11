import { Download, FileText, Eye } from 'lucide-react'
import { Button } from '../ui/Button'
import { EmptyState } from '../ui/EmptyState'
import type { ResumeResource } from '../../types/portfolio'

export function ResumeCard({ resume }: { resume: ResumeResource }) {
  if (!resume.filePath) return <EmptyState title="Resume PDF coming soon" description={resume.description} />
  return <article className="rounded-2xl border border-slate-200 bg-white p-7 dark:border-slate-800 dark:bg-slate-900/60"><div className="flex items-start gap-4"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-400/10 text-cyan-500 dark:text-cyan-300"><FileText /></span><div><h3 className="font-semibold text-slate-950 dark:text-white">{resume.title}</h3><p className="mt-1 text-sm text-slate-500">{resume.lastUpdated ? `Last updated ${resume.lastUpdated}` : 'Verified document'}</p></div></div><div className="mt-7 flex flex-wrap gap-3"><Button href={resume.filePath} showArrow><Download size={16} /> Download resume</Button><Button href={resume.filePath} variant="secondary"><Eye size={16} /> View resume</Button></div></article>
}

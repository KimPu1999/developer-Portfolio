import { Download, FileText, Eye, Printer } from 'lucide-react'
import { Button } from '../ui/Button'
import { EmptyState } from '../ui/EmptyState'
import type { Profile, ResumeResource } from '../../types/portfolio'
import { ProfilePhoto } from '../ui/ProfilePhoto'

export function ResumeCard({ resume, profile }: { resume: ResumeResource; profile: Profile }) {
  if (!resume.filePath) return <EmptyState title="Resume PDF coming soon" description={resume.description} />
  return <article className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8"><div className="flex flex-col gap-6 sm:flex-row sm:items-center"><div className="h-32 w-24 shrink-0 overflow-hidden rounded-xl border border-[var(--color-border)]"><ProfilePhoto profile={profile} alt={`${profile.displayName} resume profile photo`} /></div><div><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--color-accent-soft)] text-[var(--color-accent-text)]"><FileText aria-hidden="true" /></span><div><h3 className="font-semibold text-[var(--color-text)]">{resume.title}</h3><p className="mt-1 text-sm text-[var(--color-muted)]">{resume.lastUpdated ? `Last updated ${resume.lastUpdated}` : 'Resume document'}</p></div></div><p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--color-text-soft)]">{resume.description}</p></div></div><div className="mt-7 flex flex-wrap gap-3"><Button href={resume.filePath} showArrow><Download size={16} aria-hidden="true" /> Download resume</Button><Button href={resume.filePath} variant="secondary"><Eye size={16} aria-hidden="true" /> View resume</Button><Button to="/resume/print" variant="ghost"><Printer size={16} aria-hidden="true" /> Print / save PDF</Button></div></article>
}

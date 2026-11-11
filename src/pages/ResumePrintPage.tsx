import { Printer } from 'lucide-react'
import { profile } from '../data/profile'
import { professionalExperience } from '../data/experience'
import { skillGroups } from '../data/skills'
import { ProfilePhoto } from '../components/ui/ProfilePhoto'
import { PageMeta } from '../components/ui/PageMeta'

export function ResumePrintPage() {
  return <><PageMeta title="Thawng Kim Piang Portfolio" description="Printable resume for Thawng Kim Piang." noIndex /><main className="print-resume-page mx-auto max-w-[210mm] bg-white px-6 py-8 text-slate-900 sm:px-12 sm:py-12">
    <div className="no-print mb-6 flex justify-end"><button type="button" onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-white"><Printer size={16} aria-hidden="true" /> Print / save PDF</button></div>
    <header className="flex flex-col gap-6 border-b border-slate-200 pb-8 sm:flex-row sm:items-center">
      <div className="h-36 w-28 shrink-0 overflow-hidden rounded-xl"><ProfilePhoto profile={profile} source="resume" alt={`${profile.displayName} resume photo`} priority /></div>
      <div><h1 className="text-3xl font-bold tracking-tight">{profile.displayName}</h1><p className="mt-2 text-lg font-semibold text-[var(--color-accent-text)]">Full-Stack Software Developer / WordPress Developer</p><div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600">{profile.contact.filter((item) => item.href || item.label === 'Location').map((item) => <span key={item.label}>{item.value}</span>)}</div></div>
    </header>
    <section className="mt-8"><h2 className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-accent-text)]">Profile</h2><p className="mt-3 text-sm leading-6 text-slate-700">{profile.summary}</p></section>
    <section className="mt-8"><h2 className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-accent-text)]">Professional experience</h2>{professionalExperience.map((item) => <div key={item.id} className="mt-3"><h3 className="font-bold">{item.title} · {item.organization}</h3><p className="mt-1 text-sm text-slate-600">{item.duration}</p><p className="mt-2 text-sm leading-6 text-slate-700">{item.summary}</p><ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">{item.responsibilities.map((responsibility) => <li key={responsibility}>{responsibility}</li>)}</ul></div>)}</section>
    <section className="mt-8"><h2 className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-accent-text)]">Technical skills</h2><div className="mt-3 grid gap-3 sm:grid-cols-2">{skillGroups.map((group) => <div key={group.name}><h3 className="font-semibold">{group.name}</h3><p className="mt-1 text-sm text-slate-700">{group.skills.map((skill) => skill.name).join(', ')}</p></div>)}</div></section>
    <section className="mt-8"><h2 className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-accent-text)]">Education</h2><p className="mt-3 text-sm leading-6 text-slate-700">Bachelor of Computer Applications (BCA), Cybersecurity · Tilak Maharashtra Vidyapeeth (TMV), Pune, India · Graduated</p><p className="mt-2 text-sm leading-6 text-slate-700">Bachelor of Science (B.Sc.), Mathematics · Kalay University, Kalay, Myanmar · Second Year · Graduation status not confirmed</p></section>
  </main></>
}

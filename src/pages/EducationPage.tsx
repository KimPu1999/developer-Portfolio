import { Container } from '../components/ui/Container'
import { EducationTimeline } from '../components/education/EducationTimeline'
import { PageMeta } from '../components/ui/PageMeta'
import { SectionHeading } from '../components/ui/SectionHeading'
import { education } from '../data/education'

export function EducationPage() {
  return <main><PageMeta title="Education | Full-Stack Software Developer" description="Education background for a BCA graduate with a cybersecurity academic focus." /><section className="border-b border-slate-200 py-20 dark:border-slate-800"><Container><SectionHeading eyebrow="Education" title="The foundation behind the work.">A concise academic record with editable placeholders where the university, dates and graduation year still need to be added.</SectionHeading></Container></section><section className="py-24"><Container className="max-w-4xl"><EducationTimeline items={education} /></Container></section></main>
}

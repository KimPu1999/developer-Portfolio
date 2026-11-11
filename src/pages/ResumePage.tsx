import { Container } from '../components/ui/Container'
import { PageMeta } from '../components/ui/PageMeta'
import { ResumeCard } from '../components/resume/ResumeCard'
import { SectionHeading } from '../components/ui/SectionHeading'
import { resume } from '../data/resume'

export function ResumePage() {
  return <main><PageMeta title="Resume | Full-Stack Software Developer" description="Resume access for a BCA graduate with a cybersecurity background and full-stack software development interests." /><section className="border-b border-slate-200 py-20 dark:border-slate-800"><Container><SectionHeading eyebrow="Resume" title="A concise view of the work and direction.">The resume download becomes available once a real PDF is added to the project and configured in the typed resume data.</SectionHeading></Container></section><section className="py-24"><Container className="max-w-3xl"><ResumeCard resume={resume} /></Container></section></main>
}

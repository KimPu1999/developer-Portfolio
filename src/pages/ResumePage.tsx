import { Container } from '../components/ui/Container'
import { PageMeta } from '../components/ui/PageMeta'
import { ResumeCard } from '../components/resume/ResumeCard'
import { SectionHeading } from '../components/ui/SectionHeading'
import { resume } from '../data/resume'

export function ResumePage() {
  return <main><PageMeta title="Resume | Full-Stack Software Developer" description="Resume access for a WordPress Developer and full-stack software developer with a BCA and cybersecurity background." /><section className="border-b border-slate-200 py-20 dark:border-slate-800"><Container><SectionHeading eyebrow="Resume" title="A concise view of the work and direction.">The resume includes WordPress development experience, custom theme work, full-stack skills, academic background and practical software projects.</SectionHeading></Container></section><section className="py-24"><Container className="max-w-3xl"><ResumeCard resume={resume} /></Container></section></main>
}

import { Container } from '../components/ui/Container'
import { ExperienceTimeline } from '../components/experience/ExperienceTimeline'
import { PageMeta } from '../components/ui/PageMeta'
import { SectionHeading } from '../components/ui/SectionHeading'
import { projectExperience } from '../data/experience'

export function ExperiencePage() {
  return <main>
    <PageMeta title="Experience | Full-Stack Software Developer" description="Practical project experience across ERP, POS, social discovery and digital wallet portfolio work." />
    <section className="border-b border-slate-200 py-20 dark:border-slate-800">
      <Container>
        <SectionHeading eyebrow="Experience" title="Practical Project Experience">These entries describe portfolio projects in development. They do not represent employment history, commercial clients or production deployments.</SectionHeading>
      </Container>
    </section>
    <section className="py-20">
      <Container className="max-w-4xl">
        <ExperienceTimeline items={projectExperience} />
      </Container>
    </section>
  </main>
}

import { useEffect, useState } from 'react'
import { Container } from '../components/ui/Container'
import { ExperienceTimeline } from '../components/experience/ExperienceTimeline'
import { ProfessionalExperienceTimeline } from '../components/experience/ProfessionalExperienceTimeline'
import { PageMeta } from '../components/ui/PageMeta'
import { SectionHeading } from '../components/ui/SectionHeading'
import { professionalExperience, projectExperience } from '../data/experience'
import { publicProfile } from '../lib/api'
import type { ProfessionalExperienceItem } from '../types/portfolio'

function publicExperience(items: Array<Record<string, unknown>>): ProfessionalExperienceItem[] {
  return items.filter((item) => item.experience_type === 'professional' && item.title && item.organization).map((item) => ({
    id: String(item.id), organization: String(item.organization), location: item.location ? String(item.location) : undefined, title: String(item.title), duration: item.duration ? String(item.duration) : 'Duration to be added', employmentDates: item.employment_dates ? String(item.employment_dates) : undefined, summary: String(item.summary ?? ''), responsibilities: Array.isArray(item.responsibilities) ? item.responsibilities.map(String) : [], achievements: Array.isArray(item.achievements) ? item.achievements.map(String) : [], technologies: Array.isArray(item.technologies) ? item.technologies.map(String) : [],
  }))
}

export function ExperiencePage() {
  const [professionalItems, setProfessionalItems] = useState(professionalExperience)
  useEffect(() => { publicProfile().then((response) => { const records = publicExperience(response.experience); if (records.length > 0) setProfessionalItems(records) }).catch(() => undefined) }, [])
  return <main>
    <PageMeta title="Experience | Full-Stack Software Developer" description="WordPress development experience and practical software project work." />
    <section className="border-b border-slate-200 py-20 dark:border-slate-800">
      <Container>
        <SectionHeading eyebrow="Experience" title="Professional and project experience">WordPress development experience is shown separately from portfolio projects so responsibilities, achievements and project status stay clear.</SectionHeading>
      </Container>
    </section>
    <section className="py-20">
      <Container className="max-w-4xl">
        <SectionHeading eyebrow="Professional experience" title="WordPress development experience">Three years of WordPress development experience at Fusion Solution Co., Ltd., including custom theme development and more than 20 websites.</SectionHeading>
        <div className="mt-10"><ProfessionalExperienceTimeline items={professionalItems} /></div>
        <div className="mt-20 border-t border-slate-200 pt-20 dark:border-slate-800"><SectionHeading eyebrow="Project-based experience" title="Practical project experience">These entries describe portfolio projects in development. They do not represent employment history, commercial clients or production deployments.</SectionHeading><div className="mt-10"><ExperienceTimeline items={projectExperience} /></div></div>
      </Container>
    </section>
  </main>
}

import { Hero } from '../sections/Hero'
import { AboutPreview } from '../sections/AboutPreview'
import { SkillsPreview } from '../sections/SkillsPreview'
import { ProjectsPreview } from '../sections/ProjectsPreview'
import { ProfessionalExperiencePreview } from '../sections/ProfessionalExperiencePreview'
import { ContactCta } from '../sections/ContactCta'
import { PageMeta } from '../components/ui/PageMeta'
import { profile } from '../data/profile'

export function HomePage() { const siteUrl = import.meta.env.VITE_SITE_URL as string | undefined; const website = { '@context': 'https://schema.org', '@type': 'WebSite', name: 'Thawng Kim Piang Portfolio', url: siteUrl }; const person = profile.displayName !== 'Your Name' ? { '@context': 'https://schema.org', '@type': 'Person', name: profile.displayName, jobTitle: profile.role, description: profile.summary } : undefined; return <><PageMeta title="Full-Stack Software Developer | Portfolio" description="Portfolio of a BCA graduate, WordPress Developer and cybersecurity-aware full-stack software developer." jsonLd={siteUrl ? [website, ...(person ? [person] : [])] : undefined} /><Hero /><AboutPreview /><ProfessionalExperiencePreview /><SkillsPreview /><ProjectsPreview /><ContactCta /></> }

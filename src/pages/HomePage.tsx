import { Hero } from '../sections/Hero'
import { AboutPreview } from '../sections/AboutPreview'
import { SkillsPreview } from '../sections/SkillsPreview'
import { ProjectsPreview } from '../sections/ProjectsPreview'
import { ContactCta } from '../sections/ContactCta'
import { PageMeta } from '../components/ui/PageMeta'
import { profile } from '../data/profile'

export function HomePage() { const siteUrl = import.meta.env.VITE_SITE_URL as string | undefined; const website = { '@context': 'https://schema.org', '@type': 'WebSite', name: 'Full-Stack Software Developer Portfolio', url: siteUrl }; const person = profile.displayName !== 'Your Name' ? { '@context': 'https://schema.org', '@type': 'Person', name: profile.displayName, jobTitle: profile.role, description: profile.summary } : undefined; return <><PageMeta title="Full-Stack Software Developer | Portfolio" description="Portfolio of a BCA graduate with a cybersecurity background and an interest in secure full-stack web development." jsonLd={siteUrl ? [website, ...(person ? [person] : [])] : undefined} /><Hero /><AboutPreview /><SkillsPreview /><ProjectsPreview /><ContactCta /></> }

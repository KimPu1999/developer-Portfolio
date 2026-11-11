import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Container } from '../components/ui/Container'
import { ProjectCard } from '../components/ui/ProjectCard'
import { SectionHeading } from '../components/ui/SectionHeading'
import { FadeInSection, StaggerContainer, StaggerItem } from '../components/motion/MotionPrimitives'
import { portfolio } from '../data/portfolio'

export function ProjectsPreview() {
  return <section className="bg-slate-50 py-24 dark:bg-slate-900/40"><Container><FadeInSection><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><SectionHeading eyebrow="Selected projects" title="Systems for real-world workflows.">Project concepts and work in development, presented with clear scope and honest status.</SectionHeading><Link to="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-600 hover:text-cyan-400 dark:text-cyan-300">View all projects <ArrowUpRight size={16} /></Link></div></FadeInSection><StaggerContainer className="mt-12 grid gap-6 lg:grid-cols-12">{portfolio.projects.map((project, index) => <StaggerItem key={project.slug} className={index === 0 ? 'lg:col-span-7' : 'lg:col-span-5'}><ProjectCard project={project} featured={index === 0} /></StaggerItem>)}</StaggerContainer></Container></section>
}

import { useMemo, useState } from 'react'
import { Container } from '../components/ui/Container'
import { EmptyState } from '../components/ui/EmptyState'
import { PageMeta } from '../components/ui/PageMeta'
import { SectionHeading } from '../components/ui/SectionHeading'
import { SkillCategoryTabs } from '../components/skills/SkillCategoryTabs'
import { SkillCard } from '../components/skills/SkillCard'
import { SkillSearch } from '../components/skills/SkillSearch'
import { skillGroups } from '../data/skills'

export function SkillsPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [query, setQuery] = useState('')
  const categories = ['All', ...skillGroups.map((group) => group.name)]
  const results = useMemo(() => skillGroups.flatMap((group) => group.skills.map((skill) => ({ skill, category: group.name }))).filter(({ skill, category }) => (activeCategory === 'All' || category === activeCategory) && `${skill.name} ${skill.description}`.toLowerCase().includes(query.toLowerCase().trim())), [activeCategory, query])

  return <main><PageMeta title="Skills | Full-Stack Software Developer" description="Technical skills across frontend, backend, programming, databases, CMS and cybersecurity fundamentals." /><section className="border-b border-slate-200 py-20 dark:border-slate-800"><Container><SectionHeading eyebrow="Technical skills" title="A growing toolkit for full-stack work.">These are the technologies, concepts and areas I have studied or worked with. Skill depth is intentionally left open for continued growth.</SectionHeading></Container></section><section className="py-20"><Container><div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"><SkillCategoryTabs categories={categories} active={activeCategory} onChange={setActiveCategory} /><SkillSearch value={query} onChange={setQuery} /></div>{results.length > 0 ? <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{results.map(({ skill, category }) => <SkillCard key={`${category}-${skill.name}`} skill={skill} category={category} />)}</div> : <div className="mt-10"><EmptyState title="No matching skills" description="Try a different search term or return to the All category." /></div>}</Container></section></main>
}

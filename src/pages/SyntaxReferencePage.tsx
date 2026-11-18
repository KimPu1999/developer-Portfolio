import { useMemo, useState } from 'react'
import { ArrowLeft, Menu, Search, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Container } from '../components/ui/Container'
import { PageMeta } from '../components/ui/PageMeta'
import { syntaxReference, syntaxSkills } from '../data/syntaxReference'

export function SyntaxReferencePage() {
  const [skillSlug, setSkillSlug] = useState(syntaxSkills[0]?.slug || 'html5')
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const skill = syntaxSkills.find((item) => item.slug === skillSlug)
  const categories = useMemo(() => ['All', ...new Set(syntaxReference.filter((item) => item.skillSlug === skillSlug).map((item) => item.category))], [skillSlug])
  const items = useMemo(() => syntaxReference.filter((item) => item.skillSlug === skillSlug && (category === 'All' || item.category === category) && `${item.name} ${item.description} ${item.category}`.toLowerCase().includes(query.trim().toLowerCase())), [category, query, skillSlug])

  const changeSkill = (slug: string) => {
    setSkillSlug(slug)
    setCategory('All')
    setQuery('')
    setDrawerOpen(false)
  }

  return <main className="min-h-screen overflow-hidden bg-slate-950 text-slate-100">
    <PageMeta title="Syntax Reference | Learn Coding" description="Concise syntax reference lists for every programming skill." />
    <div className="flex min-h-[calc(100dvh-4rem)] flex-col lg:h-[calc(100dvh-4rem)] lg:flex-row">
      <aside className={`fixed inset-y-0 left-0 z-50 mt-16 w-[min(88vw,300px)] border-r border-slate-800 bg-slate-950 transition-transform lg:static lg:mt-0 lg:block lg:h-full lg:w-64 lg:translate-x-0 ${drawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-full min-h-0 flex-col">
          <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4 lg:hidden"><span className="font-semibold">Reference navigation</span><button type="button" onClick={() => setDrawerOpen(false)} className="rounded-lg p-2 text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400" aria-label="Close reference navigation"><X size={18} /></button></div>
          <div className="min-h-0 flex-1 overflow-y-auto p-4">
            <Link to="/skills" className="mb-6 inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-300"><ArrowLeft size={14} /> Back to skills</Link>
            <p className="font-mono text-[10px] uppercase tracking-[.2em] text-cyan-400">Learn Coding</p>
            <h1 className="mt-2 text-xl font-semibold text-white">Syntax Reference</h1>
            <p className="mt-2 text-xs leading-5 text-slate-500">Short reference entries for every available skill.</p>
            <p className="mb-2 mt-7 px-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">Skills</p>
            <nav className="space-y-1" aria-label="Syntax skills">{syntaxSkills.map((item) => <button type="button" key={item.slug} onClick={() => changeSkill(item.slug)} className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${item.slug === skillSlug ? 'bg-cyan-400 text-slate-950' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}><span className="truncate pr-2">{item.name}</span><span className="text-xs opacity-60">{syntaxReference.filter((entry) => entry.skillSlug === item.slug).length}</span></button>)}</nav>
          </div>
        </div>
      </aside>
      {drawerOpen && <button type="button" onClick={() => setDrawerOpen(false)} className="fixed inset-0 z-40 mt-16 bg-black/60 lg:hidden" aria-label="Close reference navigation" />}
      <section className="min-w-0 flex-1 overflow-y-auto">
        <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/95 px-5 py-5 backdrop-blur sm:px-8"><Container className="max-w-5xl px-0"><div className="flex items-center gap-3"><button type="button" onClick={() => setDrawerOpen(true)} className="rounded-lg p-2 text-slate-400 hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 lg:hidden" aria-label="Open reference navigation"><Menu size={19} /></button><div><p className="font-mono text-[10px] uppercase tracking-[.2em] text-cyan-400">Syntax Reference</p><p className="mt-1 text-sm text-slate-400">{skill?.name} · {items.length} entries</p></div></div></Container></header>
        <Container className="max-w-5xl px-5 py-8 sm:px-8">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row"><label className="relative block min-w-0 flex-1"><Search size={16} className="absolute left-3 top-3 text-slate-500" /><span className="sr-only">Search syntax</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search syntax" className="w-full rounded-xl border border-slate-800 bg-slate-900 py-2.5 pl-10 pr-4 text-sm text-slate-200 outline-none placeholder:text-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20" /></label><label className="sr-only" htmlFor="syntax-category">Category</label><select id="syntax-category" value={category} onChange={(event) => setCategory(event.target.value)} className="rounded-xl border border-slate-800 bg-slate-900 px-3 py-2.5 text-sm text-slate-300 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20">{categories.map((item) => <option key={item}>{item}</option>)}</select></div>
          <div className="overflow-hidden border-y border-slate-800"><div className="grid grid-cols-[minmax(0,.85fr)_minmax(0,1.7fr)] border-b border-slate-800 px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] sm:px-5"><span>Syntax</span><span>Description</span></div>{items.length ? items.map((item) => <div key={item.id} className="grid grid-cols-[minmax(0,.85fr)_minmax(0,1.7fr)] border-b border-slate-800 px-4 py-4 last:border-0 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] sm:px-5"><span className="break-words pr-4 font-mono text-sm font-medium text-white">{item.name}</span><span className="text-sm leading-6 text-slate-400">{item.description}</span></div>) : <div className="px-5 py-14 text-center text-sm text-slate-500">No syntax entries match your search.</div>}</div>
        </Container>
      </section>
    </div>
  </main>
}

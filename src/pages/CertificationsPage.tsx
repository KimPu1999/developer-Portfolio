import { Search } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Container } from '../components/ui/Container'
import { EmptyState } from '../components/ui/EmptyState'
import { PageMeta } from '../components/ui/PageMeta'
import { SectionHeading } from '../components/ui/SectionHeading'
import { CertificationCard } from '../components/certifications/CertificationCard'
import { certifications } from '../data/certifications'
import { publicProfile } from '../lib/api'
import type { Certification } from '../types/portfolio'

export function CertificationsPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [items, setItems] = useState<Certification[]>(certifications)
  const [loading, setLoading] = useState(true)
  useEffect(() => { publicProfile().then((response) => { if (response.certifications.length > 0) setItems(response.certifications.map((item) => ({ id: String(item.id), name: String(item.name ?? ''), category: item.category ? String(item.category) : undefined, description: item.description ? String(item.description) : undefined, issuer: item.issuer ? String(item.issuer) : undefined, issueDate: item.issueDate ? String(item.issueDate) : undefined, credentialId: item.credentialId ? String(item.credentialId) : undefined, verificationUrl: item.verificationUrl ? String(item.verificationUrl) : undefined, certificateFile: item.certificateFile ? String(item.certificateFile) : undefined, certificateMimeType: item.certificateMimeType ? String(item.certificateMimeType) : undefined, isDownloadable: Boolean(item.isDownloadable), verified: Boolean(item.isVerified) }))) }).catch(() => undefined).finally(() => setLoading(false)) }, [])
  const categories = ['All', ...Array.from(new Set(items.map((item) => item.category).filter(Boolean) as string[]))]
  const filtered = useMemo(() => items.filter((item) => {
    const searchable = [item.name, item.issuer, item.category].filter(Boolean).join(' ').toLowerCase()
    return (category === 'All' || item.category === category) && searchable.includes(query.trim().toLowerCase())
  }), [category, query, items])
  const activeTab = 'min-h-10 rounded-full px-4 py-2 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400'
  const inactiveTab = 'border border-slate-200 text-slate-600 hover:border-cyan-400 dark:border-slate-700 dark:text-slate-300'

  return <main><PageMeta title="Certifications | Full-Stack Software Developer" description="Certification records and credentials for a full-stack software developer." /><section className="border-b border-slate-200 py-20 dark:border-slate-800"><Container><SectionHeading eyebrow="Certifications" title="Learning records kept clear and verifiable.">These records reflect the certifications supplied for the portfolio. Issuers, dates and certificate files appear only after they are confirmed.</SectionHeading></Container></section><section className="py-24"><Container className="max-w-5xl">{loading && <p role="status" className="mb-5 text-sm text-slate-500">Loading published certifications…</p>}<div className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900/60 sm:flex-row sm:items-center sm:justify-between"><label className="relative block flex-1"><span className="sr-only">Search certifications</span><Search aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search certifications" className="min-h-11 w-full rounded-xl border border-slate-200 bg-transparent pl-10 pr-3 text-sm outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 dark:border-slate-700" /></label><div className="flex flex-wrap gap-2" aria-label="Certification categories">{categories.map((item) => <button type="button" key={item} aria-pressed={category === item} onClick={() => setCategory(item)} className={category === item ? activeTab + ' bg-cyan-400 text-slate-950' : activeTab + ' ' + inactiveTab}>{item}</button>)}</div></div><div className="mt-8">{filtered.length > 0 ? <div className="grid gap-5 sm:grid-cols-2">{filtered.map((item) => <CertificationCard key={item.id} item={item} />)}</div> : <EmptyState title="No certifications match this search" description="Try a different search term or category." />}</div></Container></section></main>
}

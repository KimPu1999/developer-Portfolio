import { useEffect, useState } from 'react'
import { Container } from '../components/ui/Container'
import { EducationTimeline } from '../components/education/EducationTimeline'
import { PageMeta } from '../components/ui/PageMeta'
import { SectionHeading } from '../components/ui/SectionHeading'
import { education } from '../data/education'
import { publicProfile } from '../lib/api'
import type { EducationRecord } from '../types/portfolio'

export function EducationPage() {
  const [items, setItems] = useState<EducationRecord[]>(education)
  const [loading, setLoading] = useState(true)
  useEffect(() => { publicProfile().then((response) => { if (response.education.length > 0) setItems(response.education.map((item) => ({ id: String(item.id), title: String(item.title ?? ''), focus: String(item.focus ?? ''), status: item.status ? String(item.status) : undefined, academicLevel: item.academicLevel ? String(item.academicLevel) : undefined, institution: String(item.institution ?? ''), location: item.location ? String(item.location) : undefined, graduationYear: item.graduationYear ? String(item.graduationYear) : undefined, dates: item.dates ? String(item.dates) : undefined, coursework: Array.isArray(item.coursework) ? item.coursework.map(String) : undefined, relatedTechnologies: Array.isArray(item.relatedTechnologies) ? item.relatedTechnologies.map(String) : [], relatedProjectSlugs: [], verified: true }))) }).catch(() => undefined).finally(() => setLoading(false)) }, [])
  return <main><PageMeta title="Education | Full-Stack Software Developer" description="Academic background including a BCA with a cybersecurity focus and a B.Sc. in Mathematics at Second Year." /><section className="border-b border-slate-200 py-20 dark:border-slate-800"><Container><SectionHeading eyebrow="Education" title="The foundation behind the work.">BCA in Cybersecurity at Tilak Maharashtra Vidyapeeth (TMV), alongside a B.Sc. in Mathematics at Second Year from Kalay University. Dates remain editable until supplied.</SectionHeading></Container></section><section className="py-24"><Container className="max-w-4xl">{loading && <p role="status" className="mb-5 text-sm text-slate-500">Loading published education…</p>}<EducationTimeline items={items} /></Container></section></main>
}

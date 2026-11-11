import { Container } from '../components/ui/Container'
import { EmptyState } from '../components/ui/EmptyState'
import { PageMeta } from '../components/ui/PageMeta'
import { SectionHeading } from '../components/ui/SectionHeading'
import { CertificationCard } from '../components/certifications/CertificationCard'
import { certifications } from '../data/certifications'

export function CertificationsPage() {
  return <main><PageMeta title="Certifications | Full-Stack Software Developer" description="Verified certifications and credentials for a full-stack software developer." /><section className="border-b border-slate-200 py-20 dark:border-slate-800"><Container><SectionHeading eyebrow="Certifications" title="Verified credentials, when they are ready to share.">Only confirmed certifications belong here. The data model is ready for future credentials without creating fictional records.</SectionHeading></Container></section><section className="py-24"><Container className="max-w-4xl">{certifications.length > 0 ? <div className="grid gap-5 sm:grid-cols-2">{certifications.map((item) => <CertificationCard key={item.id} item={item} />)}</div> : <EmptyState title="No verified certifications listed" description="Add a confirmed certification record in src/data/certifications.ts when you are ready to publish it." />}</Container></section></main>
}

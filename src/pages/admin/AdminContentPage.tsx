import { FormEvent, useEffect, useState } from 'react'
import { adminCertifications, adminEducation, adminExperience, adminResume, deleteAdminCertification, deleteAdminEducation, reorderAdminCertifications, reorderAdminEducation, saveAdminCertification, saveAdminEducation, saveAdminExperience, saveAdminResume, updateAdminCertification, updateAdminEducation, uploadAdminCertificate } from '../../lib/api'

type RecordValue = Record<string, unknown>
const inputClass = 'mt-2 w-full rounded-xl border border-slate-300 bg-transparent px-3 py-2 text-sm dark:border-slate-700'
const value = (item: RecordValue, key: string) => String(item[key] ?? '')
const checked = (item: RecordValue, key: string) => Boolean(item[key])

function moveItem(items: RecordValue[], index: number, direction: -1 | 1) {
  const next = [...items]
  const target = index + direction
  if (target < 0 || target >= next.length) return next
  ;[next[index], next[target]] = [next[target], next[index]]
  return next
}

export function AdminContentPage() {
  const [education, setEducation] = useState<RecordValue[]>([])
  const [certifications, setCertifications] = useState<RecordValue[]>([])
  const [experience, setExperience] = useState<RecordValue[]>([])
  const [resume, setResume] = useState<RecordValue | null>(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  async function load() {
    setLoading(true)
    try {
      const [e, c, x, r] = await Promise.all([adminEducation(), adminCertifications(), adminExperience(), adminResume()])
      setEducation(e.education); setCertifications(c.certifications); setExperience(x.experience); setResume(r.resume); setError('')
    } catch (reason) { setError(reason instanceof Error ? reason.message : 'Unable to load content.') } finally { setLoading(false) }
  }
  useEffect(() => { void load() }, [])

  async function saveEducationForm(event: FormEvent<HTMLFormElement>, id?: string) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const payload: Record<string, unknown> = Object.fromEntries(data.entries())
    payload.is_public = data.get('is_public') === 'on'
    try {
      if (id) await updateAdminEducation(id, payload)
      else await saveAdminEducation(payload)
      setMessage('Education record saved.'); await load()
    } catch (reason) { setError(reason instanceof Error ? reason.message : 'Unable to save education.') }
  }
  async function saveCertificationForm(event: FormEvent<HTMLFormElement>, id?: string) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const file = (form.elements.namedItem('certificate') as HTMLInputElement | null)?.files?.[0]
    data.delete('certificate')
    const payload: Record<string, unknown> = Object.fromEntries(data.entries())
    payload.is_public = data.get('is_public') === 'on'
    payload.is_downloadable = data.get('is_downloadable') === 'on'
    try {
      const response = id ? await updateAdminCertification(id, payload) : await saveAdminCertification(payload)
      const savedId = String(response.certification.id ?? id ?? '')
      if (file && savedId) await uploadAdminCertificate(savedId, file, Boolean(payload.is_public), Boolean(payload.is_downloadable))
      setMessage('Certification record saved.'); await load()
    } catch (reason) { setError(reason instanceof Error ? reason.message : 'Unable to save certification.') }
  }
  async function removeEducation(id: string) { if (!window.confirm('Delete this education record?')) return; try { await deleteAdminEducation(id); setMessage('Education record deleted.'); await load() } catch (reason) { setError(reason instanceof Error ? reason.message : 'Unable to delete education.') } }
  async function removeCertification(id: string) { if (!window.confirm('Delete this certification record?')) return; try { await deleteAdminCertification(id); setMessage('Certification record deleted.'); await load() } catch (reason) { setError(reason instanceof Error ? reason.message : 'Unable to delete certification.') } }
  async function reorderEducationItems(items: RecordValue[]) { const ordered = items.map((item, index) => ({ id: String(item.id), display_order: index })); setEducation(items); try { await reorderAdminEducation(ordered) } catch (reason) { setError(reason instanceof Error ? reason.message : 'Unable to reorder education.') } }
  async function reorderCertificationItems(items: RecordValue[]) { const ordered = items.map((item, index) => ({ id: String(item.id), display_order: index })); setCertifications(items); try { await reorderAdminCertifications(ordered) } catch (reason) { setError(reason instanceof Error ? reason.message : 'Unable to reorder certifications.') } }
  const card = 'rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/60'
  const label = (text: string, name: string, item?: RecordValue, type = 'text') => <label className="block text-sm text-slate-600 dark:text-slate-300">{text}<input name={name} type={type} defaultValue={item ? value(item, name) : undefined} className={inputClass} /></label>

  return <section><p className="font-mono text-xs uppercase tracking-widest text-cyan-600 dark:text-cyan-300">Content management</p><h1 className="mt-2 text-3xl font-semibold">Education, certifications, experience and resume</h1>{loading && <p role="status" className="mt-5 text-sm text-slate-500">Loading content…</p>}{message && <p role="status" className="mt-5 text-sm text-emerald-500">{message}</p>}{error && <p role="alert" className="mt-5 text-sm text-red-500">{error}</p>}
    <div className="mt-8 space-y-8">
      <section className={card}><div className="flex flex-wrap items-end justify-between gap-4"><div><h2 className="font-semibold">Education management</h2><p className="mt-1 text-sm text-slate-500">Keep academic status explicit so Second Year is never presented as completed.</p></div><span className="text-xs text-slate-500">{education.length} record(s)</span></div><form onSubmit={(event) => void saveEducationForm(event)} className="mt-6 grid gap-4 md:grid-cols-2">{label('Degree title', 'title')}{label('Field / focus', 'focus')}{label('Status', 'status_label')}{label('Academic level', 'academic_level')}{label('Institution / university', 'institution')}{label('Location', 'location')}{label('Graduation year', 'graduation_year')}{label('Date label', 'date_label')}<label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 md:mt-7"><input name="is_public" type="checkbox" defaultChecked /> Publish record</label><button className="min-h-10 rounded-xl bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 md:col-span-2 md:justify-self-start">Add education</button></form><div className="mt-8 space-y-4">{education.map((item, index) => <form key={String(item.id)} onSubmit={(event) => void saveEducationForm(event, String(item.id))} className="rounded-xl border border-slate-200 p-4 dark:border-slate-800"><div className="grid gap-4 md:grid-cols-2">{label('Degree title', 'title', item)}{label('Field / focus', 'focus', item)}{label('Status', 'status_label', item)}{label('Academic level', 'academic_level', item)}{label('Institution / university', 'institution', item)}{label('Location', 'location', item)}{label('Graduation year', 'graduation_year', item)}{label('Date label', 'date_label', item)}<label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 md:mt-7"><input name="is_public" type="checkbox" defaultChecked={checked(item, 'is_public')} /> Publish record</label></div><div className="mt-4 flex flex-wrap gap-2"><button className="min-h-10 rounded-xl bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950">Save changes</button><button type="button" onClick={() => void removeEducation(String(item.id))} className="min-h-10 rounded-xl border border-red-300 px-4 py-2 text-sm font-semibold text-red-600">Delete</button><button type="button" disabled={index === 0} onClick={() => void reorderEducationItems(moveItem(education, index, -1))} className="min-h-10 rounded-xl border border-slate-300 px-3 py-2 text-sm disabled:opacity-40 dark:border-slate-700">Move up</button><button type="button" disabled={index === education.length - 1} onClick={() => void reorderEducationItems(moveItem(education, index, 1))} className="min-h-10 rounded-xl border border-slate-300 px-3 py-2 text-sm disabled:opacity-40 dark:border-slate-700">Move down</button></div></form>)}</div></section>
      <section className={card}><div className="flex flex-wrap items-end justify-between gap-4"><div><h2 className="font-semibold">Certification management</h2><p className="mt-1 text-sm text-slate-500">Only add issuer, date, ID or verification details after checking the certificate.</p></div><span className="text-xs text-slate-500">{certifications.length} record(s)</span></div><form onSubmit={(event) => void saveCertificationForm(event)} className="mt-6 grid gap-4 md:grid-cols-2">{label('Certificate name', 'name')}{label('Category', 'category')}{label('Issuing organization', 'issuer')}{label('Issue date', 'issue_date', undefined, 'date')}{label('Credential ID', 'credential_id')}{label('Verification URL', 'verification_url', undefined, 'url')}<label className="block text-sm text-slate-600 dark:text-slate-300">Description<textarea name="description" rows={3} className={inputClass} /></label><label className="block text-sm text-slate-600 dark:text-slate-300">Certificate image or PDF<input name="certificate" type="file" accept="image/jpeg,image/png,image/webp,application/pdf" className={inputClass} /></label><label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"><input name="is_public" type="checkbox" /> Publish record</label><label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"><input name="is_downloadable" type="checkbox" /> Allow download</label><button className="min-h-10 rounded-xl bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 md:col-span-2 md:justify-self-start">Add certification</button></form><div className="mt-8 space-y-4">{certifications.map((item, index) => <form key={String(item.id)} onSubmit={(event) => void saveCertificationForm(event, String(item.id))} className="rounded-xl border border-slate-200 p-4 dark:border-slate-800"><div className="grid gap-4 md:grid-cols-2">{label('Certificate name', 'name', item)}{label('Category', 'category', item)}{label('Issuing organization', 'issuer', item)}{label('Issue date', 'issue_date', item, 'date')}{label('Credential ID', 'credential_id', item)}{label('Verification URL', 'verification_url', item, 'url')}<label className="block text-sm text-slate-600 dark:text-slate-300">Description<textarea name="description" defaultValue={value(item, 'description')} rows={3} className={inputClass} /></label><label className="block text-sm text-slate-600 dark:text-slate-300">Replace certificate<input name="certificate" type="file" accept="image/jpeg,image/png,image/webp,application/pdf" className={inputClass} /></label><label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"><input name="is_public" type="checkbox" defaultChecked={checked(item, 'is_public')} /> Publish record</label><label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"><input name="is_downloadable" type="checkbox" defaultChecked={checked(item, 'is_downloadable')} /> Allow download</label></div><div className="mt-4 flex flex-wrap gap-2"><button className="min-h-10 rounded-xl bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950">Save changes</button><button type="button" onClick={() => void removeCertification(String(item.id))} className="min-h-10 rounded-xl border border-red-300 px-4 py-2 text-sm font-semibold text-red-600">Delete</button><button type="button" disabled={index === 0} onClick={() => void reorderCertificationItems(moveItem(certifications, index, -1))} className="min-h-10 rounded-xl border border-slate-300 px-3 py-2 text-sm disabled:opacity-40 dark:border-slate-700">Move up</button><button type="button" disabled={index === certifications.length - 1} onClick={() => void reorderCertificationItems(moveItem(certifications, index, 1))} className="min-h-10 rounded-xl border border-slate-300 px-3 py-2 text-sm disabled:opacity-40 dark:border-slate-700">Move down</button>{value(item, 'certificate_url') ? <a href={value(item, 'certificate_url')} target="_blank" rel="noreferrer" className="self-center text-sm font-semibold text-cyan-600 dark:text-cyan-300">Preview certificate</a> : value(item, 'certificate_path') && <span className="self-center text-xs text-slate-500">Private file stored</span>}</div></form>)}</div></section>
      <div className="grid gap-6 xl:grid-cols-2"><form onSubmit={(event) => void saveExperience(event)} className={card}><h2 className="font-semibold">Add project experience</h2><label className="mt-4 block text-sm text-slate-600 dark:text-slate-300">Title<input name="title" required className={inputClass} /></label><label className="mt-4 block text-sm text-slate-600 dark:text-slate-300">Summary<textarea name="summary" required rows={4} className={inputClass} /></label><label className="mt-4 block text-sm text-slate-600 dark:text-slate-300">Role<input name="role" className={inputClass} /></label><label className="mt-4 block text-sm text-slate-600 dark:text-slate-300">Project slug<input name="project_slug" className={inputClass} /></label><button className="mt-5 min-h-10 rounded-xl bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950">Save experience</button><p className="mt-4 text-xs text-slate-500">{experience.length} record(s) currently stored.</p></form><form onSubmit={(event) => void saveResume(event)} className={card}><h2 className="font-semibold">Resume metadata</h2><label className="mt-4 block text-sm text-slate-600 dark:text-slate-300">Title<input name="title" defaultValue={value(resume ?? {}, 'title') || 'Resume'} className={inputClass} /></label><label className="mt-4 block text-sm text-slate-600 dark:text-slate-300">PDF path<input name="file_path" defaultValue={value(resume ?? {}, 'file_path')} placeholder="/storage/resume/file.pdf" className={inputClass} /></label><label className="mt-4 block text-sm text-slate-600 dark:text-slate-300">Last updated<input name="last_updated" type="date" className={inputClass} /></label><label className="mt-4 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"><input name="is_public" type="checkbox" defaultChecked={checked(resume ?? {}, 'is_public')} /> Publish resume metadata</label><button className="mt-5 min-h-10 rounded-xl bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950">Save resume metadata</button></form></div>
    </div>
  </section>
}

async function saveExperience(event: FormEvent<HTMLFormElement>) {
  event.preventDefault()
  const data = new FormData(event.currentTarget)
  await saveAdminExperience({ ...Object.fromEntries(data.entries()), status: 'In Development', is_public: true })
}

async function saveResume(event: FormEvent<HTMLFormElement>) {
  event.preventDefault()
  const data = new FormData(event.currentTarget)
  await saveAdminResume({ ...Object.fromEntries(data.entries()), is_public: data.get('is_public') === 'on' })
}

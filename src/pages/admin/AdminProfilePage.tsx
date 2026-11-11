import { FormEvent, useEffect, useState } from 'react'
import { adminProfile, removeAdminProfilePhoto, updateAdminProfile, uploadAdminProfilePhoto } from '../../lib/api'

type ProfileForm = {
  display_name: string
  role: string
  subtitle: string
  summary: string
  about: string
  career_objective: string
  profile_image_position: string
}

const initialForm: ProfileForm = { display_name: '', role: '', subtitle: '', summary: '', about: '', career_objective: '', profile_image_position: 'center' }

export function AdminProfilePage() {
  const [form, setForm] = useState<ProfileForm>(initialForm)
  const [photoUrl, setPhotoUrl] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    adminProfile().then(({ profile }) => {
      if (!profile) return
      setForm((value) => ({ ...value, ...Object.fromEntries(Object.keys(value).map((key) => [key, String(profile[key] ?? '')])) }))
      setPhotoUrl(String(profile.profile_image_url ?? ''))
    }).catch((reason) => setError(reason instanceof Error ? reason.message : 'Unable to load profile.'))
  }, [])

  async function submit(event: FormEvent) {
    event.preventDefault()
    try { await updateAdminProfile(form); setMessage('Profile saved.'); setError('') } catch (reason) { setError(reason instanceof Error ? reason.message : 'Unable to save profile.') }
  }

  async function uploadPhoto(file?: File) {
    if (!file) return
    setUploading(true); setError('')
    try { const data = await uploadAdminProfilePhoto(file, form.profile_image_position); setPhotoUrl(data.profile_image_url || ''); setMessage('Profile photo saved.') } catch (reason) { setError(reason instanceof Error ? reason.message : 'Unable to upload profile photo.') } finally { setUploading(false) }
  }

  async function removePhoto() {
    setUploading(true)
    try { await removeAdminProfilePhoto(); setPhotoUrl(''); setMessage('Profile photo removed.') } catch (reason) { setError(reason instanceof Error ? reason.message : 'Unable to remove profile photo.') } finally { setUploading(false) }
  }

  return <section>
    <p className="font-mono text-xs uppercase tracking-widest text-cyan-600 dark:text-cyan-300">Content</p>
    <h1 className="mt-2 text-3xl font-semibold">Personal profile</h1>
    {message && <p role="status" className="mt-5 text-sm text-emerald-500">{message}</p>}
    {error && <p role="alert" className="mt-5 text-sm text-red-500">{error}</p>}
    <form onSubmit={submit} className="mt-8 max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/60">
      <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
        <p className="font-semibold">Profile photo</p>
        <p className="mt-1 text-sm text-slate-500">JPG, PNG or WebP, up to 5 MB. The image is cropped responsively to a 3:4 portrait frame.</p>
        <div className="mt-4 flex flex-wrap items-end gap-4">
          <div className="h-32 w-24 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">{photoUrl ? <img src={photoUrl} alt="Current profile photo" className="h-full w-full object-cover" style={{ objectPosition: form.profile_image_position }} /> : <span className="grid h-full place-items-center text-xs text-slate-500">No photo</span>}</div>
          <div>
            <label className="block text-sm font-medium">Upload or replace<input type="file" accept="image/jpeg,image/png,image/webp" disabled={uploading} onChange={(event) => uploadPhoto(event.target.files?.[0])} className="mt-2 block max-w-full text-sm" /></label>
            <label className="mt-3 block text-sm font-medium">Image position<select value={form.profile_image_position} onChange={(event) => setForm({ ...form, profile_image_position: event.target.value })} className="mt-2 rounded-lg border border-slate-300 bg-transparent px-3 py-2 dark:border-slate-700"><option value="center">Center</option><option value="top">Top</option><option value="bottom">Bottom</option><option value="left">Left</option><option value="right">Right</option></select></label>
            {photoUrl && <button type="button" onClick={removePhoto} disabled={uploading} className="mt-3 text-sm font-semibold text-red-600 hover:underline">Remove photo</button>}
          </div>
        </div>
      </div>
      {([['display_name', 'Display name'], ['role', 'Role'], ['subtitle', 'Subtitle'], ['summary', 'Summary'], ['about', 'About'], ['career_objective', 'Career objective']] as const).map(([key, label]) => <label key={key} className="mt-4 block text-sm text-slate-600 first:mt-6 dark:text-slate-300">{label}{['summary', 'about', 'career_objective'].includes(key) ? <textarea rows={4} value={form[key]} onChange={(event) => setForm({ ...form, [key]: event.target.value })} className="mt-2 w-full rounded-xl border border-slate-300 bg-transparent px-3 py-2 dark:border-slate-700" /> : <input value={form[key]} onChange={(event) => setForm({ ...form, [key]: event.target.value })} className="mt-2 w-full rounded-xl border border-slate-300 bg-transparent px-3 py-2 dark:border-slate-700" />}</label>)}
      <button className="mt-6 rounded-xl bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950">Save profile</button>
    </form>
  </section>
}

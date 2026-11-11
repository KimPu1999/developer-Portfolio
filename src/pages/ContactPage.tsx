import { FormEvent, useState } from 'react'
import { ArrowUpRight, LoaderCircle, Mail, MapPin, Send } from 'lucide-react'
import { Container } from '../components/ui/Container'
import { SectionHeading } from '../components/ui/SectionHeading'
import { PageMeta } from '../components/ui/PageMeta'
import { portfolio } from '../data/portfolio'
import { sendContactEmail } from '../lib/formSubmit'

const initialForm = { full_name: '', email: '', subject: '', message: '', website: '' }

export function ContactPage() {
  const [form, setForm] = useState(initialForm)
  const [state, setState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (state === 'submitting') return

    const recipient = portfolio.contact.find((field) => field.label === 'Email')?.value ?? ''
    const validationError = !form.full_name.trim() || form.full_name.trim().length < 2
      ? 'Please enter your full name.'
      : !/^\S+@\S+\.\S+$/.test(form.email.trim())
        ? 'Please enter a valid email address.'
        : form.subject.trim().length < 3
          ? 'Please enter a subject.'
          : form.message.trim().length < 10
            ? 'Please enter at least 10 characters in your message.'
            : !recipient
              ? 'Contact email is not configured yet.'
              : ''

    if (validationError) {
      setState('error')
      setError(validationError)
      return
    }

    setState('submitting')
    setError('')
    try {
      await sendContactEmail(form, recipient)
      setForm(initialForm)
      setState('success')
    } catch (submissionError) {
      setState('error')
      setError(submissionError instanceof Error ? submissionError.message : 'The message could not be sent. Please try again later.')
    }
  }

  return <main><PageMeta title="Contact | Full-Stack Software Developer" description="Send a message about software development, secure web applications or collaboration." /><section className="border-b border-slate-200 py-20 dark:border-slate-800"><Container><SectionHeading eyebrow="Contact" title="Let’s start with a good conversation.">Use the form to send a message directly to my email. Contact details and social links remain editable until verified personal information is configured.</SectionHeading></Container></section><section className="py-20"><Container className="grid gap-12 lg:grid-cols-[.75fr_1.25fr]"><div><div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-cyan-400/10 text-cyan-500 dark:text-cyan-300"><Mail /></div><h2 className="text-2xl font-semibold text-slate-950 dark:text-white">Open to opportunities</h2><p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">I’m interested in contributing to secure, scalable and user-friendly software projects.</p><div className="mt-5 flex items-center gap-2 text-sm text-slate-500"><MapPin size={16} /> {portfolio.contact.find((field) => field.label === 'Location')?.value ?? 'Location to be added'}</div><div className="mt-8 space-y-3">{portfolio.contact.filter((field) => field.href).map((field) => <a key={field.label} href={field.href} className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-600 transition hover:border-cyan-400 hover:text-cyan-500 dark:border-slate-800 dark:text-slate-300"><span>{field.label}: {field.value}</span><ArrowUpRight size={15} /></a>)}</div></div><form onSubmit={submit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60 sm:p-8"><div className="grid gap-5 sm:grid-cols-2"><label className="text-sm font-medium text-slate-700 dark:text-slate-200">Full name<input required minLength={2} maxLength={120} value={form.full_name} onChange={(event) => setForm({ ...form, full_name: event.target.value })} className="mt-2 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-3 text-slate-950 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 dark:border-slate-700 dark:text-white" /></label><label className="text-sm font-medium text-slate-700 dark:text-slate-200">Email<input required type="email" maxLength={254} value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className="mt-2 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-3 text-slate-950 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 dark:border-slate-700 dark:text-white" /></label></div><label className="mt-5 block text-sm font-medium text-slate-700 dark:text-slate-200">Subject<input required minLength={3} maxLength={180} value={form.subject} onChange={(event) => setForm({ ...form, subject: event.target.value })} className="mt-2 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-3 text-slate-950 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 dark:border-slate-700 dark:text-white" /></label><label className="mt-5 block text-sm font-medium text-slate-700 dark:text-slate-200">Message<textarea required minLength={10} maxLength={5000} rows={7} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} className="mt-2 w-full resize-y rounded-xl border border-slate-300 bg-transparent px-4 py-3 text-slate-950 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 dark:border-slate-700 dark:text-white" /></label><label className="hidden" aria-hidden="true">Website<input tabIndex={-1} autoComplete="off" value={form.website} onChange={(event) => setForm({ ...form, website: event.target.value })} /></label><div className="mt-6 flex flex-wrap items-center gap-4"><button type="submit" disabled={state === 'submitting'} className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-wait disabled:opacity-60">{state === 'submitting' ? <LoaderCircle className="animate-spin" size={16} /> : <Send size={16} />} {state === 'submitting' ? 'Sending…' : 'Send message'}</button><p role="status" aria-live="polite" className="text-sm text-slate-500">{state === 'success' ? 'Your message has been accepted for delivery.' : state === 'error' ? error : 'Your message is sent securely to my email.'}</p></div></form></Container></section></main>
}

import { BadgeCheck, Download, ExternalLink, FileText, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { Certification } from '../../types/portfolio'

function isPdf(item: Certification) {
  return item.certificateMimeType === 'application/pdf' || item.certificateFile?.toLowerCase().endsWith('.pdf')
}

export function CertificationCard({ item }: { item: Certification }) {
  const [previewOpen, setPreviewOpen] = useState(false)
  const closeButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!previewOpen) return
    closeButton.current?.focus()
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setPreviewOpen(false) }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [previewOpen])

  const previewTitle = item.id + '-preview-title'
  return <>
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition-colors hover:border-cyan-300 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-cyan-500/40">
      {item.certificateFile && <div className="flex h-36 items-center justify-center border-b border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-950/60">{isPdf(item) ? <FileText aria-hidden="true" className="text-cyan-500" size={42} /> : <img src={item.certificateFile} alt={item.name + ' certificate preview'} loading="lazy" className="h-full w-full object-cover" />}</div>}
      <div className="p-6"><div className="flex items-center justify-between gap-4"><span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-400/10 text-cyan-500 dark:text-cyan-300"><BadgeCheck size={20} /></span>{item.category && <span className="text-xs font-medium uppercase tracking-wide text-slate-500">{item.category}</span>}</div><h3 className="mt-5 font-semibold text-slate-950 dark:text-white">{item.name}</h3>{item.issuer && <p className="mt-2 text-sm text-slate-500">{item.issuer}</p>}{item.issueDate && <p className="mt-2 text-xs text-slate-500">Issued {item.issueDate}</p>}{item.credentialId && <p className="mt-3 font-mono text-xs text-slate-400">ID: {item.credentialId}</p>}{item.description && <p className="mt-4 text-sm leading-6 text-slate-500">{item.description}</p>}{(item.certificateFile || item.verificationUrl) && <div className="mt-5 flex flex-wrap gap-3">{item.certificateFile && <button type="button" onClick={() => setPreviewOpen(true)} className="inline-flex min-h-10 items-center gap-2 rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900">View certificate</button>}{item.certificateFile && item.isDownloadable && <a href={item.certificateFile} download className="inline-flex min-h-10 items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-cyan-400 hover:text-cyan-500 dark:border-slate-700 dark:text-slate-200"><Download size={14} /> Download</a>}{item.verificationUrl && <a href={item.verificationUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-cyan-400 hover:text-cyan-500 dark:border-slate-700 dark:text-slate-200">Verify credential <ExternalLink size={14} /></a>}</div>}</div>
    </article>
    {previewOpen && item.certificateFile && <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/80 p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setPreviewOpen(false) }}><div role="dialog" aria-modal="true" aria-labelledby={previewTitle} className="max-h-[90vh] w-full max-w-4xl overflow-auto rounded-2xl border border-slate-700 bg-white p-4 shadow-2xl dark:bg-slate-900 sm:p-6"><div className="flex items-center justify-between gap-4"><h2 id={previewTitle} className="font-semibold text-slate-950 dark:text-white">{item.name} certificate preview</h2><button ref={closeButton} type="button" onClick={() => setPreviewOpen(false)} aria-label="Close certificate preview" className="grid h-10 w-10 place-items-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-cyan-400 dark:hover:bg-slate-800 dark:hover:text-white"><X size={19} /></button></div><div className="mt-5 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-950">{isPdf(item) ? <iframe title={item.name + ' certificate PDF'} src={item.certificateFile} className="h-[70vh] w-full" /> : <img src={item.certificateFile} alt={item.name + ' certificate'} className="mx-auto max-h-[70vh] w-auto object-contain" />}</div></div></div>}
  </>
}

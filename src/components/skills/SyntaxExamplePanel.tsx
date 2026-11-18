import { useMemo } from 'react'
import { Code2, Eye, Terminal } from 'lucide-react'
import { CodeBlock } from './CodeBlock'
import type { SyntaxReferenceItem } from '../../data/syntaxReference'

function safePreviewSource(item: SyntaxReferenceItem) {
  if (item.previewType === 'css') {
    const css = item.previewMarkup || item.exampleCode
    return `<!doctype html><html><head><meta charset="utf-8"><style>body{font-family:system-ui;padding:1.25rem;color:#172033} .preview-card{padding:1rem;border:1px solid #cbd5e1;border-radius:.75rem} @media (prefers-reduced-motion: reduce){*,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;scroll-behavior:auto!important}} ${css}</style></head><body><div class="preview-card"><p class="preview-text">Preview paragraph</p><div class="layout">Preview content</div></div></body></html>`
  }
  if (item.previewType === 'html') {
    return `<!doctype html><html><head><meta charset="utf-8"><style>body{font-family:system-ui;padding:1.25rem;color:#172033}img{max-width:100%}button{padding:.5rem .75rem}dialog{border:1px solid #cbd5e1;border-radius:.75rem;padding:1rem}</style></head><body>${(item.previewMarkup || item.exampleCode).replace(/<script[\s\S]*?<\/script>/gi, '')}</body></html>`
  }
  return ''
}

export function SyntaxExamplePanel({ item }: { item: SyntaxReferenceItem }) {
  const previewSource = useMemo(() => safePreviewSource(item), [item])
  return <div className="border-t border-slate-800 bg-slate-950/60 px-4 py-5 sm:px-5" data-syntax-example={item.id}>
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(220px,.65fr)]">
      <div className="min-w-0">
        <div className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.18em] text-cyan-400"><Code2 size={14} /> Example <span className="text-slate-600">·</span> {item.language}</div>
        <CodeBlock example={{ language: item.language, code: item.exampleCode, explanation: item.usageDescription }} />
        {item.additionalExamples?.map((example, index) => <div key={`${item.id}-example-${index}`} className="mt-4"><p className="mb-2 text-[10px] font-semibold uppercase tracking-[.18em] text-slate-500">Example {index + 2}</p><CodeBlock example={{ language: item.language, code: example.exampleCode, explanation: example.usageDescription }} /></div>)}
      </div>
      <div className="space-y-4">
        <section className="rounded-xl border border-slate-800 bg-slate-900/80 p-4">{item.typeCheckResult && <><div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.18em] text-violet-300">Type check</div><p className="mt-3 text-sm leading-6 text-slate-300">{item.typeCheckResult}</p></>}<div className="mt-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.18em] text-amber-300"><Terminal size={14} /> Runtime output</div><pre className="mt-3 whitespace-pre-wrap font-mono text-xs leading-6 text-slate-300">{item.expectedOutput}</pre>{item.additionalExamples?.map((example, index) => <pre key={`${item.id}-output-${index}`} className="mt-3 whitespace-pre-wrap border-t border-slate-800 pt-3 font-mono text-xs leading-6 text-slate-300">{example.expectedOutput}</pre>)}{item.previewType !== 'none' && <div className="mt-4 overflow-hidden rounded-lg border border-slate-700 bg-white"><div className="flex items-center gap-2 border-b border-slate-200 px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500"><Eye size={13} /> Rendered preview</div><iframe title={`${item.name} rendered preview`} sandbox="" srcDoc={previewSource} className="h-32 w-full border-0" /></div>}</section>
        <section className="rounded-xl border border-slate-800 bg-slate-900/80 p-4"><p className="text-[10px] font-semibold uppercase tracking-[.18em] text-emerald-300">Usage</p><p className="mt-3 text-sm leading-6 text-slate-400">{item.usageDescription}</p>{item.additionalExamples?.map((example, index) => <p key={`${item.id}-usage-${index}`} className="mt-3 border-t border-slate-800 pt-3 text-sm leading-6 text-slate-400">{example.usageDescription}</p>)}</section>
      </div>
    </div>
  </div>
}

import { useState } from 'react'
import { Check, Copy, WrapText } from 'lucide-react'
import type { SkillCodeExample } from '../../types/portfolio'

function tokenize(line: string) {
  return line.split(/(\/\/.*|#.*|\/\*.*\*\/|"[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*'|`[^`]*`|\b\d+(?:\.\d+)?\b|\b(?:const|let|var|function|return|def|class|if|else|for|while|import|from|public|private|SELECT|FROM|WHERE|CREATE|TABLE|echo|new|print)\b)/g).filter(Boolean).map((part, index) => <span key={`${part}-${index}`} className={/^(\/\/|#|\/\*)/.test(part) ? 'text-slate-500' : /^("|'|`)/.test(part) ? 'text-emerald-300' : /^\d/.test(part) ? 'text-amber-300' : /^(const|let|var|function|return|def|class|if|else|for|while|import|from|public|private|SELECT|FROM|WHERE|CREATE|TABLE|echo|new|print)$/.test(part) ? 'text-cyan-300' : 'text-slate-200'}>{part}</span>)
}

export function CodeBlock({ example }: { example: SkillCodeExample }) {
  const [copied, setCopied] = useState(false)
  const [wrap, setWrap] = useState(false)
  const lines = example.code.split('\n')
  async function copy() { await navigator.clipboard?.writeText(example.code); setCopied(true); window.setTimeout(() => setCopied(false), 1600) }
  return <figure className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-lg"><figcaption className="flex items-center justify-between gap-3 border-b border-slate-800 px-4 py-3 text-xs text-slate-400"><span className="font-mono uppercase tracking-wide">{example.language}</span><div className="flex items-center gap-2"><button type="button" onClick={() => setWrap((value) => !value)} className="inline-flex items-center gap-1 rounded-md px-2 py-1 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400" aria-pressed={wrap}><WrapText size={14} /> Wrap</button><button type="button" onClick={copy} className="inline-flex items-center gap-1 rounded-md px-2 py-1 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400" aria-label={copied ? 'Code copied' : 'Copy code'} aria-live="polite">{copied ? <Check size={14} /> : <Copy size={14} />}{copied ? 'Copied' : 'Copy code'}</button></div></figcaption><div className={`overflow-x-auto p-4 font-mono text-sm leading-7 ${wrap ? 'whitespace-pre-wrap break-words' : 'whitespace-pre'}`}><code>{lines.map((line, index) => <span key={index} className="flex"><span className="mr-5 inline-block w-6 select-none text-right text-slate-600" aria-hidden="true">{index + 1}</span><span>{tokenize(line)}</span></span>)}</code></div><p className="border-t border-slate-800 px-4 py-3 text-sm leading-6 text-slate-400">{example.explanation}</p></figure>
}

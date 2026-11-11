import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const CONSENT_KEY = 'portfolio-analytics-consent'

export function hasAnalyticsConsent() { return window.localStorage.getItem(CONSENT_KEY) === 'granted' }

export function AnalyticsConsent() {
  const enabled = import.meta.env.VITE_ANALYTICS_ENABLED === 'true'
  const location = useLocation()
  const [visible, setVisible] = useState(false)
  useEffect(() => { if (enabled && !window.localStorage.getItem(CONSENT_KEY) && navigator.doNotTrack !== '1') setVisible(true) }, [enabled])
  if (!visible || location.pathname.startsWith('/admin')) return null
  function choose(value: 'granted' | 'denied') { window.localStorage.setItem(CONSENT_KEY, value); setVisible(false); window.dispatchEvent(new Event('portfolio-analytics-consent')) }
  return <aside className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-xl rounded-2xl border border-slate-700 bg-slate-900 p-5 text-white shadow-2xl" aria-label="Analytics consent"><p className="font-semibold">Privacy-conscious analytics</p><p className="mt-2 text-sm leading-6 text-slate-300">Allow anonymous page and project view counts to improve this portfolio. No message content or raw IP address is stored.</p><div className="mt-4 flex flex-wrap gap-2"><button onClick={() => choose('granted')} className="rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950">Allow analytics</button><button onClick={() => choose('denied')} className="rounded-lg border border-slate-600 px-4 py-2 text-sm text-slate-200">Decline</button></div></aside>
}

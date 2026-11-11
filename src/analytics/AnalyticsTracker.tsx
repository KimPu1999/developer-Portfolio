import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { hasAnalyticsConsent } from './AnalyticsConsent'

function deviceCategory() { const width = window.innerWidth; return width < 640 ? 'mobile' : width < 1024 ? 'tablet' : 'desktop' }

export function AnalyticsTracker() {
  const location = useLocation()
  const [consentVersion, setConsentVersion] = useState(0)
  useEffect(() => {
    const onConsentChange = () => setConsentVersion((version) => version + 1)
    window.addEventListener('portfolio-analytics-consent', onConsentChange)
    return () => window.removeEventListener('portfolio-analytics-consent', onConsentChange)
  }, [])
  useEffect(() => {
    if (import.meta.env.VITE_ANALYTICS_ENABLED !== 'true' || location.pathname.startsWith('/admin') || navigator.doNotTrack === '1' || !hasAnalyticsConsent()) return
    const base = (import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1').replace(/\/$/, '')
    const referrer = document.referrer
    let referrerDomain: string | undefined
    try { referrerDomain = referrer ? new URL(referrer).hostname : undefined } catch { referrerDomain = undefined }
    const projectMatch = location.pathname.match(/^\/projects\/([^/]+)$/)
    fetch(`${base}/analytics/events`, { method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify({ event_type: projectMatch ? 'project_view' : 'page_view', path: `${location.pathname}${location.search}`, project_slug: projectMatch?.[1], referrer_domain: referrerDomain, device_category: deviceCategory() }), keepalive: true }).catch(() => undefined)
  }, [consentVersion, location.pathname, location.search])
  return null
}

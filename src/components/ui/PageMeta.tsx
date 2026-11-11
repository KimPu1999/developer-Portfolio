import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

interface PageMetaProps {
  title: string
  description: string
  canonicalPath?: string
  image?: string
  noIndex?: boolean
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>
}

function setMeta(name: string, content: string, property = false) {
  const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`
  const meta = document.querySelector(selector) ?? document.head.appendChild(Object.assign(document.createElement('meta'), property ? { property: name } : { name }))
  meta.setAttribute('content', content)
}

function absoluteUrl(path: string, siteUrl?: string) { return siteUrl ? new URL(path, siteUrl).toString() : path }

export function PageMeta({ title, description, canonicalPath, image = '/profile/tkp.png', noIndex = false, jsonLd }: PageMetaProps) {
  const location = useLocation()
  useEffect(() => {
    const siteUrl = import.meta.env.VITE_SITE_URL as string | undefined
    const canonicalUrl = siteUrl ? absoluteUrl(canonicalPath ?? location.pathname, siteUrl) : undefined
    document.title = title
    setMeta('description', description)
    setMeta('robots', noIndex ? 'noindex,nofollow' : 'index,follow')
    setMeta('og:title', title, true); setMeta('og:description', description, true); setMeta('og:type', 'website', true); setMeta('og:image', absoluteUrl(image, siteUrl), true)
    setMeta('twitter:card', 'summary_large_image'); setMeta('twitter:title', title); setMeta('twitter:description', description); setMeta('twitter:image', absoluteUrl(image, siteUrl))
    if (canonicalUrl) { const canonical = document.querySelector('link[rel="canonical"]') ?? document.head.appendChild(Object.assign(document.createElement('link'), { rel: 'canonical' })); canonical.setAttribute('href', canonicalUrl); setMeta('og:url', canonicalUrl, true) }
    document.getElementById('portfolio-structured-data')?.remove()
    if (jsonLd) { const script = document.createElement('script'); script.id = 'portfolio-structured-data'; script.type = 'application/ld+json'; script.textContent = JSON.stringify(jsonLd); document.head.appendChild(script) }
  }, [canonicalPath, description, image, jsonLd, location.pathname, noIndex, title])
  return null
}

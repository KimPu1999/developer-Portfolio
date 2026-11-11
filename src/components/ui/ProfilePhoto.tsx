import type { CSSProperties } from 'react'
import type { Profile } from '../../types/portfolio'

interface ProfilePhotoProps {
  profile: Pick<Profile, 'displayName' | 'initials' | 'image' | 'imagePosition'>
  alt?: string
  className?: string
  loading?: 'eager' | 'lazy'
  priority?: boolean
}

export function ProfilePhoto({ profile, alt, className = '', loading, priority = false }: ProfilePhotoProps) {
  const accessibleName = alt || `${profile.displayName} profile photo`
  const imageStyle: CSSProperties = { objectPosition: profile.imagePosition || 'center' }

  if (profile.image) {
    return <img src={profile.image} alt={accessibleName} loading={priority ? 'eager' : loading || 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async" style={imageStyle} className={`h-full w-full object-cover ${className}`} />
  }

  return <div role="img" aria-label={accessibleName} className={`flex h-full w-full items-center justify-center bg-[var(--color-accent)] text-white ${className}`}><span aria-hidden="true" className="font-mono text-5xl font-semibold tracking-[0.18em] sm:text-7xl">{profile.initials}</span></div>
}

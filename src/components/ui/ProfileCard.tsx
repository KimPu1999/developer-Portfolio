import { ShieldCheck } from 'lucide-react'
import type { Profile } from '../../types/portfolio'
import { ProfilePhoto } from './ProfilePhoto'

export function ProfileCard({ profile }: { profile: Profile }) {
  return <div className="mx-auto w-full max-w-sm"><div className="overflow-hidden rounded-[1.25rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-3 shadow-[0_18px_40px_rgba(37,40,33,0.12)] dark:shadow-[0_18px_40px_rgba(0,0,0,0.24)]"><div className="profile-image aspect-[3/4] overflow-hidden rounded-[0.9rem]"><ProfilePhoto profile={profile} source="about" priority /></div><div className="flex items-center justify-between gap-4 px-2 pb-1 pt-5"><div><p className="font-semibold text-[var(--color-text)]">{profile.displayName}</p><p className="mt-1 text-xs text-[var(--color-muted)]">{profile.role} / WordPress Developer</p></div><span className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--color-accent-soft)] text-[var(--color-accent-text)]" title="Full-stack and WordPress development"><ShieldCheck size={18} aria-hidden="true" /></span></div></div></div>
}

import { SkillBadge } from '../ui/SkillBadge'

export function ProjectTechStack({ technologies }: { technologies: string[] }) {
  return <div className="flex flex-wrap gap-2">{technologies.map((technology) => <SkillBadge key={technology}>{technology}</SkillBadge>)}</div>
}

import { education } from './education'
import { profile } from './profile'
import { projects } from './projects'
import { skillGroups } from './skills'

export const portfolio = {
  ...profile,
  education: education[0],
  skills: skillGroups,
  projects,
  contact: profile.contact,
}

export { education, profile, projects, skillGroups }

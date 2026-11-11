import { education } from './education'
import { profile } from './profile'
import { projects } from './projects'
import { skillGroups } from './skills'
import { certifications } from './certifications'

export const portfolio = {
  ...profile,
  education: education[0],
  educationRecords: education,
  certifications,
  skills: skillGroups,
  projects,
  contact: profile.contact,
}

export { education, profile, projects, skillGroups }

import { education } from './education'
import { profile } from './profile'
import { projects } from './projects'
import { skillGroups } from './skills'
import { certifications } from './certifications'
import { professionalExperience } from './experience'

export const portfolio = {
  ...profile,
  education: education[0],
  educationRecords: education,
  certifications,
  skills: skillGroups,
  projects,
  professionalExperience,
  contact: profile.contact,
}

export { education, profile, projects, skillGroups }

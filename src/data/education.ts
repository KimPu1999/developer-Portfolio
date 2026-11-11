import type { EducationRecord } from '../types/portfolio'

export const education = [
  {
    id: 'bca',
    title: 'Bachelor of Computer Applications (BCA)',
    focus: 'Cybersecurity',
    status: 'Graduated',
    institution: 'Tilak Maharashtra Vidyapeeth (TMV)',
    location: 'Pune, India',
    graduationYear: 'Graduation year to be added',
    dates: 'Dates to be added',
    coursework: undefined,
    relatedTechnologies: ['Programming fundamentals', 'Web development', 'Databases', 'Cybersecurity fundamentals'],
    relatedProjectSlugs: ['erp-system', 'pos-system', 'social-discovery', 'digital-wallet'],
    verified: true,
  },
  {
    id: 'bsc-mathematics',
    title: 'Bachelor of Science (B.Sc.) in Mathematics',
    focus: 'Mathematics',
    academicLevel: 'Second Year',
    institution: 'Kalay University',
    location: 'Kalay, Myanmar',
    dates: 'Dates to be added',
    coursework: undefined,
    relatedTechnologies: [],
    relatedProjectSlugs: [],
    verified: true,
  },
] satisfies EducationRecord[]

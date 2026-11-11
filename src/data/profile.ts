import type { Profile } from '../types/portfolio'

export const profile = {
  displayName: 'Your Name',
  initials: 'YN',
  role: 'Full-Stack Software Developer',
  subtitle: 'BCA Graduate | Cybersecurity Background',
  summary: 'I build secure, reliable and user-friendly web applications across the frontend, backend and database layers. My interests sit at the intersection of practical product development and thoughtful application security.',
  about: 'I am a Bachelor of Computer Applications (BCA) graduate with a background in Cybersecurity and a strong interest in full-stack web development. I work with frontend technologies, backend frameworks and relational databases to build modern software applications. My project work includes ERP, POS, Social Discovery and Digital Wallet platforms. I am interested in secure application development, scalable architecture and user-friendly digital solutions.',
  careerObjective: 'To contribute as a Software Developer or Full-Stack Developer by applying my programming, database and cybersecurity knowledge to secure, reliable, scalable and user-friendly software solutions.',
  focusAreas: ['Full-stack web development', 'Secure application development', 'Scalable architecture', 'User-friendly digital solutions'],
  interests: ['Frontend and backend integration', 'Relational database design', 'Authentication and authorization', 'Real-world business systems'],
  contact: [
    { label: 'Email', value: 'Add your email', href: undefined, placeholder: true },
    { label: 'GitHub', value: 'Add your GitHub profile', href: undefined, placeholder: true },
    { label: 'LinkedIn', value: 'Add your LinkedIn profile', href: undefined, placeholder: true },
    { label: 'Location', value: 'Add your location', href: undefined, placeholder: true },
  ],
} satisfies Profile

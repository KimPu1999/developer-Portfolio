import type { SkillGroup } from '../types/portfolio'

export const skillGroups = [
  {
    name: 'Frontend', eyebrow: '01', description: 'Building responsive interfaces and clear product experiences.',
    skills: [
      { name: 'HTML5', description: 'Semantic structure for accessible web interfaces.' },
      { name: 'CSS3', description: 'Responsive styling, layout and visual systems.' },
      { name: 'JavaScript', description: 'Core language for interactive web applications.', projectSlugs: ['social-discovery'] },
      { name: 'TypeScript', description: 'Typed application development for more predictable code.', projectSlugs: ['erp-system', 'pos-system', 'social-discovery', 'digital-wallet'] },
      { name: 'React', description: 'Component-based UI development for web applications.', projectSlugs: ['erp-system', 'pos-system', 'social-discovery', 'digital-wallet'] },
      { name: 'Tailwind CSS', description: 'Utility-first styling for consistent responsive layouts.' },
    ],
  },
  {
    name: 'Backend', eyebrow: '02', description: 'Server-side application structure and API concepts.',
    skills: [
      { name: 'PHP', description: 'Backend programming for web applications.', projectSlugs: ['erp-system'] },
      { name: 'Laravel', description: 'PHP framework for structured web application development.', projectSlugs: ['erp-system', 'pos-system', 'social-discovery', 'digital-wallet'] },
      { name: 'Node.js', description: 'JavaScript runtime concepts for backend services.' },
      { name: 'REST API Development', description: 'Resource-oriented API design and frontend integration.' },
    ],
  },
  {
    name: 'Programming', eyebrow: '03', description: 'Programming foundations across multiple languages.',
    skills: [
      { name: 'C', description: 'Programming fundamentals and problem solving.' },
      { name: 'C++', description: 'Object-oriented programming foundations.' },
      { name: 'Java', description: 'General-purpose programming and application fundamentals.' },
      { name: 'Python', description: 'General-purpose programming and scripting foundations.' },
      { name: 'JavaScript', description: 'Application logic for frontend and web development.' },
      { name: 'PHP', description: 'Web-oriented server-side programming.' },
    ],
  },
  {
    name: 'Databases', eyebrow: '04', description: 'Relational data, queries and application persistence.',
    skills: [
      { name: 'MySQL', description: 'Relational database concepts and SQL workflows.' },
      { name: 'PostgreSQL', description: 'Relational database design for application systems.', projectSlugs: ['erp-system', 'pos-system', 'social-discovery', 'digital-wallet'] },
      { name: 'SQL', description: 'Querying and working with relational data.' },
    ],
  },
  {
    name: 'CMS', eyebrow: '05', description: 'Content management and responsive web delivery.',
    skills: [
      { name: 'WordPress', description: 'Content-managed websites and web publishing.' },
      { name: 'Custom WordPress Theme Development', description: 'Personalized WordPress themes, layouts and website presentation.' },
      { name: 'Responsive Web Design', description: 'Responsive website layouts for mobile, tablet and desktop screens.' },
    ],
  },
  {
    name: 'Security', eyebrow: '06', description: 'Security-aware development principles and application concepts.',
    skills: [
      { name: 'Cybersecurity Fundamentals', description: 'Foundational security concepts and threat awareness.' },
      { name: 'Authentication', description: 'Identity and sign-in flow concepts.' },
      { name: 'Authorization', description: 'Access control and permission concepts.' },
      { name: 'Secure Coding', description: 'Development practices that account for application risk.' },
      { name: 'Web Application Security', description: 'Security considerations for web application design.' },
      { name: 'Database Security', description: 'Protecting application data and database access.' },
    ],
  },
] satisfies SkillGroup[]

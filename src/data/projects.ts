import type { PortfolioProject } from '../types/project'

export const projects: PortfolioProject[] = [
  {
    slug: 'erp-system', shortTitle: 'ERP', title: 'ERP System', category: 'Enterprise',
    description: 'An enterprise resource planning platform for organizational operations, procurement, inventory, sales and accounting.',
    technologies: ['React', 'TypeScript', 'Laravel', 'PHP', 'PostgreSQL'], status: 'In Development', visual: 'erp', projectType: 'personal',
    imageAlt: 'Abstract interface placeholder for the ERP project',
    plannedModules: ['Dashboard', 'Organization', 'Suppliers', 'Purchasing', 'Inventory', 'Sales', 'Accounting', 'Reports', 'Platform Administration'],
    caseStudy: { context: 'A portfolio project exploring how core organizational operations could be represented in one connected platform.', objectives: ['Model common enterprise workflows', 'Explore relational data across operations', 'Keep administrative areas organized and understandable'], solution: 'A planned full-stack web application using a React and TypeScript interface, a Laravel and PHP backend, and PostgreSQL for relational data.', developmentApproach: 'The project is currently represented as an in-development portfolio system. Modules listed on this page are planned areas, not claims of completed functionality.', technicalArchitecture: 'Planned architecture: React and TypeScript frontend → Laravel and PHP API layer → PostgreSQL relational database.' },
  },
  {
    slug: 'pos-system', shortTitle: 'POS', title: 'CIINLV POS System', category: 'Retail',
    description: 'A point-of-sale and retail management platform supporting checkout workflows, products, stock, business administration and reporting.',
    technologies: ['React', 'TypeScript', 'Laravel', 'PostgreSQL'], status: 'In Development', visual: 'pos', projectType: 'personal',
    imageAlt: 'Abstract interface placeholder for the POS project',
    plannedModules: ['POS Checkout', 'Product Catalog', 'Inventory', 'Branches', 'Sales History', 'Returns', 'Barcode', 'Reports'],
    caseStudy: { context: 'A portfolio project exploring how retail operations can be organized around products, stock and sales workflows.', objectives: ['Represent a clear checkout journey', 'Connect catalog and inventory concepts', 'Keep business administration and reporting discoverable'], solution: 'A planned retail management platform with a React and TypeScript frontend, Laravel backend and PostgreSQL data layer.', developmentApproach: 'The project remains in development. The potential modules shown here describe intended scope rather than completed features or a production deployment.', technicalArchitecture: 'Planned architecture: React and TypeScript frontend → Laravel API layer → PostgreSQL relational data model.' },
  },
  {
    slug: 'social-discovery', shortTitle: 'Social', title: 'Social Discovery', category: 'Social',
    description: 'A social discovery application for profiles, people discovery, content and user connections.',
    technologies: ['React', 'TypeScript', 'Laravel', 'PostgreSQL'], status: 'In Development', visual: 'social', projectType: 'personal',
    imageAlt: 'Abstract interface placeholder for the social discovery project',
    plannedModules: ['Discover', 'People', 'Profiles', 'Follow', 'Connections', 'Content'],
    caseStudy: { context: 'A portfolio project exploring discovery and social connection through profiles, people and content.', objectives: ['Create clear paths to discover people and content', 'Represent profiles and connections in a structured way', 'Consider authentication and authorization as part of the system design'], solution: 'A planned social web application using React and TypeScript, Laravel and PostgreSQL.', developmentApproach: 'The project is in development. Planned modules are documented as areas for exploration and are not presented as completed functionality.', technicalArchitecture: 'Planned architecture: React and TypeScript frontend → Laravel and PHP service layer → PostgreSQL relational database.' },
  },
  {
    slug: 'digital-wallet', shortTitle: 'Wallet', title: 'Moneta Digital Wallet', category: 'Fintech',
    description: 'A digital wallet platform project focused on international multi-currency architecture, wallet transactions, authentication and financial security.',
    technologies: ['React', 'TypeScript', 'Laravel', 'PostgreSQL'], status: 'In Development', visual: 'wallet', projectType: 'personal',
    imageAlt: 'Abstract interface placeholder for the digital wallet project',
    plannedModules: ['Wallets', 'Transactions', 'Currency Balances', 'Authentication', 'KYC', 'Compliance', 'Audit Logs'],
    caseStudy: { context: 'A portfolio project focused on thinking through multi-currency wallet architecture and security-oriented transaction concepts.', objectives: ['Explore wallet and currency balance relationships', 'Represent transaction history clearly', 'Keep authentication, auditability and security concerns visible in the design'], solution: 'A planned wallet application with a React and TypeScript frontend, Laravel backend and PostgreSQL data layer.', developmentApproach: 'The project is in development. No real-money payment integration, compliance certification or production security audit is claimed.', technicalArchitecture: 'Planned architecture: React and TypeScript frontend → Laravel API and authentication layer → PostgreSQL relational database.' },
  },
]

const professionalCaseStudy = {
  context: 'A professional WordPress project associated with Fusion Solution Co., Ltd. Project-specific details are shown only when verified records are available.',
  developmentApproach: 'This project record is being documented from supplied information. Screenshots, live URLs and individual contribution notes can be added after verification.',
  technicalArchitecture: 'WordPress project record. Site-specific integrations, deployment details and implementation scope are pending verification.',
}

export const professionalProjects: PortfolioProject[] = [
  { slug: 'fusionsol', shortTitle: 'FusionSol', title: 'FusionSol', category: 'WordPress', description: 'A professional WordPress project associated with Fusion Solution Co., Ltd. Verified project details, contributions and screenshots can be added when available.', technologies: ['WordPress'], status: 'In Development', visual: 'wordpress', projectType: 'professional', company: 'Fusion Solution Co., Ltd.', role: 'WordPress Developer', imageAlt: 'Placeholder visual for the FusionSol WordPress project', liveUrl: 'https://www.fusionsol.com/', caseStudy: professionalCaseStudy },
  { slug: 'thetys-myanmar', shortTitle: 'Thetys', title: 'Thetys Myanmar', category: 'WordPress', description: 'A professional WordPress project associated with Fusion Solution Co., Ltd. Verified project details, contributions and screenshots can be added when available.', technologies: ['WordPress'], status: 'In Development', visual: 'wordpress', projectType: 'professional', company: 'Fusion Solution Co., Ltd.', role: 'WordPress Developer', imageAlt: 'Placeholder visual for the Thetys Myanmar WordPress project', liveUrl: 'https://www.thetysmyanmar.com/', caseStudy: professionalCaseStudy },
  { slug: 'jarviz', shortTitle: 'Jarviz', title: 'Jarviz', category: 'WordPress', description: 'A professional WordPress project associated with Fusion Solution Co., Ltd. Verified project details, contributions and screenshots can be added when available.', technologies: ['WordPress'], status: 'In Development', visual: 'wordpress', projectType: 'professional', company: 'Fusion Solution Co., Ltd.', role: 'WordPress Developer', imageAlt: 'Placeholder visual for the Jarviz WordPress project', liveUrl: 'https://www.jarvizapp.com/', caseStudy: professionalCaseStudy },
  { slug: 'f-tech', shortTitle: 'F-Tech Solution', title: 'F-Tech Solution', category: 'WordPress', description: 'A professional WordPress project associated with Fusion Solution Co., Ltd. Verified project details, contributions and screenshots can be added when available.', technologies: ['WordPress'], status: 'In Development', visual: 'wordpress', projectType: 'professional', company: 'Fusion Solution Co., Ltd.', role: 'WordPress Developer', imageAlt: 'Placeholder visual for the F-Tech Solution WordPress project', liveUrl: 'https://f-techsolution.com/', caseStudy: professionalCaseStudy },
  { slug: 'attendent', shortTitle: 'Attendent', title: 'Attendent', category: 'WordPress', description: 'A professional WordPress project associated with Fusion Solution Co., Ltd. Verified project details, contributions and screenshots can be added when available.', technologies: ['WordPress'], status: 'In Development', visual: 'wordpress', projectType: 'professional', company: 'Fusion Solution Co., Ltd.', role: 'WordPress Developer', imageAlt: 'Placeholder visual for the Attendent WordPress project', caseStudy: professionalCaseStudy },
]

export const allProjects = [...professionalProjects, ...projects] satisfies PortfolioProject[]
export const projectRegistry = Object.fromEntries(allProjects.map((project) => [project.slug, project])) as Record<string, PortfolioProject>

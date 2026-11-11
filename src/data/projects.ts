import type { PortfolioProject } from '../types/project'

export const projects = [
  {
    slug: 'erp-system', shortTitle: 'ERP', title: 'Enterprise Resource Planning System', category: 'Enterprise',
    description: 'An enterprise resource planning platform for organizational operations, procurement, inventory, sales and accounting.',
    technologies: ['React', 'TypeScript', 'Laravel', 'PHP', 'PostgreSQL'], status: 'In Development', visual: 'erp',
    imageAlt: 'Abstract interface placeholder for the ERP project',
    plannedModules: ['Dashboard', 'Organization', 'Suppliers', 'Purchasing', 'Inventory', 'Sales', 'Accounting', 'Reports', 'Platform Administration'],
    caseStudy: { context: 'A portfolio project exploring how core organizational operations could be represented in one connected platform.', objectives: ['Model common enterprise workflows', 'Explore relational data across operations', 'Keep administrative areas organized and understandable'], solution: 'A planned full-stack web application using a React and TypeScript interface, a Laravel and PHP backend, and PostgreSQL for relational data.', developmentApproach: 'The project is currently represented as an in-development portfolio system. Modules listed on this page are planned areas, not claims of completed functionality.', technicalArchitecture: 'Planned architecture: React and TypeScript frontend → Laravel and PHP API layer → PostgreSQL relational database.' },
  },
  {
    slug: 'pos-system', shortTitle: 'POS', title: 'Point of Sale System', category: 'Retail',
    description: 'A point-of-sale and retail management platform supporting checkout workflows, products, stock, business administration and reporting.',
    technologies: ['React', 'TypeScript', 'Laravel', 'PostgreSQL'], status: 'In Development', visual: 'pos',
    imageAlt: 'Abstract interface placeholder for the POS project',
    plannedModules: ['POS Checkout', 'Product Catalog', 'Inventory', 'Branches', 'Sales History', 'Returns', 'Barcode', 'Reports'],
    caseStudy: { context: 'A portfolio project exploring how retail operations can be organized around products, stock and sales workflows.', objectives: ['Represent a clear checkout journey', 'Connect catalog and inventory concepts', 'Keep business administration and reporting discoverable'], solution: 'A planned retail management platform with a React and TypeScript frontend, Laravel backend and PostgreSQL data layer.', developmentApproach: 'The project remains in development. The potential modules shown here describe intended scope rather than completed features or a production deployment.', technicalArchitecture: 'Planned architecture: React and TypeScript frontend → Laravel API layer → PostgreSQL relational data model.' },
  },
  {
    slug: 'social-discovery', shortTitle: 'Social', title: 'Social Discovery Platform', category: 'Social',
    description: 'A social discovery application for profiles, people discovery, content and user connections.',
    technologies: ['React', 'TypeScript', 'Laravel', 'PostgreSQL'], status: 'In Development', visual: 'social',
    imageAlt: 'Abstract interface placeholder for the social discovery project',
    plannedModules: ['Discover', 'People', 'Profiles', 'Follow', 'Connections', 'Content'],
    caseStudy: { context: 'A portfolio project exploring discovery and social connection through profiles, people and content.', objectives: ['Create clear paths to discover people and content', 'Represent profiles and connections in a structured way', 'Consider authentication and authorization as part of the system design'], solution: 'A planned social web application using React and TypeScript, Laravel and PostgreSQL.', developmentApproach: 'The project is in development. Planned modules are documented as areas for exploration and are not presented as completed functionality.', technicalArchitecture: 'Planned architecture: React and TypeScript frontend → Laravel and PHP service layer → PostgreSQL relational database.' },
  },
  {
    slug: 'digital-wallet', shortTitle: 'Wallet', title: 'Digital Wallet Platform', category: 'Fintech',
    description: 'A digital wallet platform project focused on international multi-currency architecture, wallet transactions, authentication and financial security.',
    technologies: ['React', 'TypeScript', 'Laravel', 'PostgreSQL'], status: 'In Development', visual: 'wallet',
    imageAlt: 'Abstract interface placeholder for the digital wallet project',
    plannedModules: ['Wallets', 'Transactions', 'Currency Balances', 'Authentication', 'KYC', 'Compliance', 'Audit Logs'],
    caseStudy: { context: 'A portfolio project focused on thinking through multi-currency wallet architecture and security-oriented transaction concepts.', objectives: ['Explore wallet and currency balance relationships', 'Represent transaction history clearly', 'Keep authentication, auditability and security concerns visible in the design'], solution: 'A planned wallet application with a React and TypeScript frontend, Laravel backend and PostgreSQL data layer.', developmentApproach: 'The project is in development. No real-money payment integration, compliance certification or production security audit is claimed.', technicalArchitecture: 'Planned architecture: React and TypeScript frontend → Laravel API and authentication layer → PostgreSQL relational database.' },
  },
] satisfies PortfolioProject[]

export const projectRegistry = Object.fromEntries(projects.map((project) => [project.slug, project])) as Record<string, PortfolioProject>

import type { SkillDocumentation, SkillGroup, SkillLesson, SkillModule } from '../types/portfolio'
import { skillGroups } from './skills'

export function skillSlug(name: string) {
  if (name.trim().toLowerCase() === 'c++') return 'c-plus-plus'
  return name.toLowerCase().replace(/\+/g, 'plus').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

const metadata: Record<string, Pick<SkillDocumentation, 'difficulty' | 'duration' | 'prerequisites' | 'objectives' | 'technologyInfo'>> = {
  html5: { difficulty: 'Beginner', duration: '8–10 weeks', prerequisites: ['Basic computer literacy'], objectives: ['Build valid semantic documents from the HTML Living Standard', 'Create accessible forms, media and landmarks', 'Organize production-ready markup for SEO, performance and security'], technologyInfo: 'HTML describes the structure and meaning of web content. Browser APIs, CSS and JavaScript add behavior and presentation around that document.' },
  css3: { difficulty: 'Beginner', duration: '8–10 weeks', prerequisites: ['HTML fundamentals'], objectives: ['Write maintainable CSS with correct selectors, properties and values', 'Build responsive layouts with Flexbox, Grid and container queries', 'Create accessible, performant and progressively enhanced visual systems'], technologyInfo: 'CSS controls presentation, layout and responsive behavior. The browser applies CSS through the cascade, inheritance, specificity and layout algorithms.' },
  javascript: { difficulty: 'Intermediate', duration: '12–16 weeks', prerequisites: ['HTML and CSS fundamentals'], objectives: ['Explain ECMAScript language rules and browser runtime behavior', 'Build accessible, asynchronous browser features with safe API usage', 'Design, test and optimize maintainable production JavaScript'], technologyInfo: 'JavaScript is the ECMAScript language plus a host environment. This path separates language features such as objects, promises and modules from browser APIs such as the DOM, Fetch and Web Storage.' },
  typescript: { difficulty: 'Intermediate', duration: '10–14 weeks', prerequisites: ['JavaScript fundamentals'], objectives: ['Model data with precise compile-time types', 'Use generics and type transformations safely', 'Design maintainable TypeScript APIs and compiler configurations'], technologyInfo: 'TypeScript extends JavaScript with static analysis. Types and annotations are erased from emitted JavaScript, so runtime validation remains necessary at untrusted boundaries.' },
  react: { difficulty: 'Intermediate', duration: '12–16 weeks', prerequisites: ['JavaScript fundamentals', 'HTML and CSS fundamentals'], objectives: ['Build reusable components and accessible UI flows', 'Manage local, shared and asynchronous state with stable React APIs', 'Profile, test and ship maintainable production React applications'], technologyInfo: 'React 19.3.1 is a UI library. React core APIs are separate from React DOM, framework features such as Server Components, and third-party libraries such as React Router and TanStack Query.' },
  'tailwind-css': { difficulty: 'Beginner', duration: '10–14 weeks', prerequisites: ['HTML and CSS fundamentals'], objectives: ['Compose responsive interfaces with verified Tailwind utility families', 'Build accessible component systems with variants and design tokens', 'Configure, optimize and maintain Tailwind v4 production styles'], technologyInfo: 'Tailwind CSS 4.3.5 is installed in this project. The primary setup is CSS-first with @import "tailwindcss" and @theme; the existing tailwind.config.ts is retained through v4 @config compatibility. Tailwind v3 configuration syntax is documented separately.' },
  php: { difficulty: 'Beginner', duration: '16–22 weeks', prerequisites: ['Programming fundamentals', 'HTML and HTTP basics'], objectives: ['Write safe, typed PHP 8.5 applications from syntax to architecture', 'Use OOP, exceptions, files, sessions, JSON and PDO correctly', 'Design secure, tested and maintainable production PHP services'], technologyInfo: 'PHP 8.5.6 is available in the current environment. This path separates core PHP and standard extensions from optional extensions, Composer packages, Laravel, Symfony and server behavior. Version-specific examples are labeled.' },
  python: { difficulty: 'Beginner', duration: '5–7 weeks', prerequisites: ['Basic programming concepts'], objectives: ['Write clear Python programs', 'Work with collections and modules', 'Handle files and errors'], technologyInfo: 'Python is a readable general-purpose language used for automation, APIs and backend development.' },
  laravel: { difficulty: 'Intermediate', duration: '6–8 weeks', prerequisites: ['PHP, HTTP and SQL fundamentals'], objectives: ['Structure a Laravel application', 'Build validated routes and controllers', 'Work with models and authentication'], technologyInfo: 'Laravel is a PHP framework for routing, persistence, validation and secure application structure.' },
}

const curriculum: Record<string, Record<'Beginner' | 'Intermediate' | 'Advanced' | 'Professional', string[]>> = {
  html5: {
    Beginner: [
      'What HTML is and how browsers parse a document', 'DOCTYPE, character encoding and document structure', 'Tags, elements, attributes, nesting and comments', 'Entities, whitespace and text semantics',
      'Document metadata: html, head, title, meta, link, style and base', 'Text content: h1–h6, p, br, hr, div, span and inline semantics', 'Emphasis and code: strong, em, b, i, u, small, mark, sub, sup, pre and code',
      'Links: a, href, target, rel and download', 'Images: img, src, alt, width and height', 'Lists: ul, ol, li, dl, dt and dd', 'Global attributes: id, class, lang, dir, title, style and hidden'
    ],
    Intermediate: [
      'Semantic page landmarks: header, nav, main, section, article, aside and footer', 'Supporting semantic elements: address, figure, figcaption, hgroup, search, details and summary',
      'Tables: caption, colgroup, col, thead, tbody, tfoot, tr, th, td, scope, colspan and rowspan', 'Forms: form, label, input, button, select, option, optgroup and textarea',
      'Form groups and output: fieldset, legend, datalist, output, progress and meter', 'Input types: text, password, email, number, tel, url, search, date, time, datetime-local, month, week, color, range, checkbox, radio, file, hidden, submit, reset, button and image',
      'Form attributes: name, value, placeholder, required, disabled, readonly, checked, selected, multiple, min, max, step, pattern and autocomplete', 'Submission attributes: action, method, enctype, novalidate, accept and form',
      'Media: audio, video, source, track, picture, iframe, embed, object, map and area', 'Responsive images with srcset, sizes, loading, decoding and fetchpriority'
    ],
    Advanced: [
      'Advanced text semantics: blockquote, q, cite, abbr, dfn, time, data, del, ins, s, kbd, samp, var, bdi, bdo, ruby, rt, rp and wbr',
      'Native interaction: dialog, details, summary, popover, popovertarget, popovertargetaction and inert', 'Constraint validation and native form submission behavior', 'GET and POST forms, autofill and form-associated elements',
      'Responsive media art direction and accessible alternative sources', 'Metadata for viewport, description, robots, canonical URLs, favicons and social sharing',
      'Semantic accessibility: headings, accessible names, labels, alt text, landmarks and keyboard focus', 'ARIA roles, states and properties: when native HTML is not enough', 'Accessible tables and error messages'
    ],
    Professional: [
      'Semantic document architecture and landmark boundaries', 'Reusable, component-friendly markup and content organization', 'template, slot and custom elements integration',
      'Web Components fundamentals and Declarative Shadow DOM', 'HTML parsing, DOM trees and native browser interactions', 'Complex accessible forms and server-side validation requirements',
      'SEO architecture: titles, descriptions, headings, canonical metadata and structured data', 'Performance: preload, preconnect, lazy loading, dimensions and script loading strategies',
      'Security: safe HTML rendering, iframe sandbox, rel=noopener, CSP and safe embeds', 'Validation, browser compatibility, accessibility audits and standards-based code review'
    ]
  },
  css3: {
    Beginner: [
      'What CSS is and how the cascade works', 'Rulesets, declarations, properties, values and comments', 'Inline, internal and external stylesheets', 'Universal, element, class, ID and group selectors',
      'Descendant and child combinators', 'Colors: names, hexadecimal, rgb(), rgba(), hsl(), hsla() and opacity', 'Typography: font family, size, weight, style, variant and line height',
      'Text styling: alignment, decoration, transform, indentation, shadows, spacing and wrapping', 'Box model: width, height, margin, padding, borders, radius and box-sizing',
      'Backgrounds: images, repeat, position, size and attachment', 'Display, visibility, overflow and CSS units'
    ],
    Intermediate: [
      'Attribute selectors and sibling combinators', 'Interactive pseudo-classes: hover, focus, active, visited, checked, disabled and enabled', 'Structural pseudo-classes: first-child, last-child, nth-child() and not()',
      'Pseudo-elements: before, after, first-letter, first-line, placeholder and selection', 'Positioning: static, relative, absolute, fixed, sticky, inset and z-index', 'Flexbox containers and axes',
      'Flexbox sizing, ordering, alignment, wrapping and gaps', 'Grid tracks, areas, placement, auto-flow and minmax()', 'Responsive media queries, breakpoints, mobile-first and fluid layouts',
      'Transforms and transform-origin', 'Transitions and timing functions'
    ],
    Advanced: [
      'CSS functions: calc(), min(), max(), clamp(), var(), env(), attr() and color-mix()', 'Custom properties, fallbacks, inheritance and theming', 'Modern selectors: is(), where(), has(), focus-visible, focus-within, nth-of-type(), empty and target',
      'Advanced Grid: subgrid, auto-fit, auto-fill, implicit tracks, explicit tracks and named lines', 'Animations: keyframes, timing, direction, fill mode, iteration and play state', 'Filters, drop-shadow, clipping, masks and blending',
      'Scroll behavior, snap points, padding, margin and overscroll', 'Container queries, container types, names and query units', 'Advanced typography, intrinsic sizing and visual effects'
    ],
    Professional: [
      'Cascade, specificity, inheritance, origins, layers and @layer', 'Scoped styles with @scope, CSS nesting and @property registration', 'Logical properties, writing modes and international layouts',
      'Modern color spaces: lab(), lch(), oklab(), oklch(), color() and relative colors', 'Intrinsic layouts with subgrid, aspect-ratio, object-fit, min-content, max-content and fit-content',
      'Fluid typography, container-based components and responsive design systems', 'Scroll-driven animations, view timelines, motion paths and animation composition', 'Performance: containment, content-visibility, will-change, layout and paint',
      'Accessibility: reduced motion, color scheme, contrast, forced colors and focus indicators', 'Architecture: design tokens, BEM, CSS Modules, progressive enhancement, @supports and cross-browser testing'
    ]
  },
  javascript: {
    Beginner: [
      'What JavaScript is, engines and runtime environments', 'Script loading with script, defer and async', 'Comments, statements, expressions and automatic semicolon insertion', 'Strict mode and the browser console',
      'var, let and const declarations', 'Scope and hoisting fundamentals', 'Primitive values and reference values', 'string, number, bigint, boolean, undefined, null, symbol and object',
      'typeof, type conversion, coercion, truthy and falsy values', 'Arithmetic, assignment, comparison and logical operators', 'Nullish coalescing, optional chaining and conditional expressions',
      'String literals, template literals and string methods', 'Number, parseInt, parseFloat and Math methods', 'if, else, switch and conditional logic', 'for, while, do while, break and continue',
      'Function declarations, expressions, parameters, arguments and return', 'Arrow functions and default parameters', 'Array literals, indexing, length and basic mutation', 'Object literals, properties, methods and property access',
      'DOM selection, textContent and safe HTML boundaries', 'classList, addEventListener and click events', 'Beginner projects: counter, calculator, clock and form validation'
    ],
    Intermediate: [
      'Callbacks, higher-order functions and lexical scope', 'Closures, this, call, apply and bind', 'Rest parameters, spread syntax, recursion and IIFEs',
      'forEach, map, filter, reduce, find, some and every', 'sort, toSorted, reverse, toReversed, toSpliced, flat and flatMap', 'slice, splice, concat, join and array iterators',
      'Object and array destructuring', 'Shorthand properties and computed property names', 'Object.assign, entries, fromEntries, freeze, seal and descriptors',
      'Regular expressions and advanced string methods', 'Date, formatting and JSON serialization', 'DOM creation, insertion, attributes and traversal',
      'Event objects, bubbling, capturing, delegation and cleanup', 'localStorage, sessionStorage, cookies and storage events', 'Timers, promises, then, catch and finally',
      'async, await, fetch and response handling', 'try, catch, finally, throw and built-in error types', 'ES modules, named exports, default exports and dynamic import',
      'Intermediate projects: to-do, weather, quiz, expense and search applications'
    ],
    Advanced: [
      'Execution contexts, call stack and lexical environments', 'Scope chains, closures in depth, hoisting and the temporal dead zone', 'Event loop, task queues, microtasks and promise scheduling',
      'Garbage collection fundamentals and memory ownership', 'Prototypes, prototype chains and Object.create', 'Constructor functions and class syntax',
      'extends, super, static members, private fields, getters and setters', 'Inheritance, polymorphism and encapsulation', 'Property descriptors, defineProperty and prototype control',
      'Reflect and Proxy', 'Symbol, BigInt, Map, Set, WeakMap and WeakSet', 'WeakRef, FinalizationRegistry, ArrayBuffer, DataView and typed arrays',
      'Iterables, iterators, Symbol.iterator and generators', 'Async iterators, async generators and for await of', 'Promise combinators and Promise.withResolvers',
      'AbortController, cancellation, concurrency, retry and timeout patterns', 'Fetch, Request, Response, Headers, URL, FormData, Blob and File', 'Streams, WebSocket, Workers and observer APIs',
      'Regular expression groups, lookarounds, flags and Unicode matching', 'Pure functions, immutability, composition, currying and memoization',
      'Advanced projects: chat client, data dashboard and custom state manager'
    ],
    Professional: [
      'Modular architecture and separation of concerns', 'Factory, module, observer and strategy patterns', 'Dependency injection and practical SOLID principles',
      'Maintainable code organization and API boundaries', 'Profiling, memory leaks, efficient DOM updates and main-thread responsiveness', 'Debouncing, throttling, lazy loading and code splitting',
      'Dynamic imports, rendering performance and Web Workers', 'XSS prevention, safe DOM APIs and HTML sanitization', 'Content Security Policy, prototype pollution and input validation',
      'Secure API requests, CORS, token handling and dependency security', 'Unit, integration and end-to-end testing', 'Mocks, test doubles, async tests, DOM tests and coverage',
      'npm, package.json, bundlers, Vite, ESLint, Prettier and source maps', 'Environment configuration, dependency management and build optimization', 'REST API integration and authentication flow concepts',
      'Error recovery, state management, accessibility and internationalization', 'Performance budgets, progressive enhancement and browser compatibility',
      'Production projects: e-commerce frontend, modular SPA and analytics dashboard'
    ]
  },
  typescript: {
    Beginner: [
      'What TypeScript adds to JavaScript', 'Static checking, compilation, type erasure and runtime behavior', 'Installing TypeScript, tsc and tsconfig.json', 'Type annotations and inference',
      'string, number, boolean, bigint, symbol, null and undefined', 'any, unknown, void, never and object', 'let, const, var, literal types and widening',
      'string arrays, number arrays, Array<T> and readonly arrays', 'Tuple types, optional elements, labels, rest elements and readonly tuples', 'Required, optional and readonly object properties',
      'Union types and simple narrowing', 'Function parameters, returns, callbacks and arrow functions', 'Optional, default and rest parameters', 'Arithmetic, comparison, logical and nullish operators',
      'Control flow, typeof expressions and for-of loops', 'Type aliases for primitives, objects and unions', 'Basic interfaces and property declarations', 'Beginner projects: typed calculator, student records and typed to-do list'
    ],
    Intermediate: [
      'Structural typing, assignability and compatibility', 'Literal, union and intersection types', 'Type assertions and non-null assertions', 'typeof, instanceof, in and equality narrowing',
      'Truthiness narrowing, control-flow analysis and discriminated unions', 'Custom type predicates and assertion functions', 'Extending, merging and composing interfaces',
      'Method, call, construct and index signatures', 'Interface versus type alias decisions', 'Generic functions, interfaces, aliases and classes', 'Generic constraints, keyof constraints, defaults and inference',
      'Classes, visibility, readonly, static, abstract, extends and implements', 'Constructors, parameter properties, getters, setters and overrides', 'Numeric, string and const enums with runtime tradeoffs',
      'ES modules, import type, export type and module resolution', 'CommonJS interoperability and dynamic imports', 'Promise<T>, typed fetch responses and Result types',
      'Partial, Required, Readonly, Pick, Omit and Record', 'Exclude, Extract, NonNullable, ReturnType, Parameters, ConstructorParameters, InstanceType and Awaited',
      'Intermediate projects: typed API client, inventory system and typed form'
    ],
    Advanced: [
      'Multiple generic parameters, defaults and inference patterns', 'Variance and generic API design', 'keyof, typeof, indexed access and satisfies', 'as assertions, const assertions and non-null assertions',
      'Conditional types, extends tests and infer', 'Distributive, non-distributive and recursive conditional types', 'Mapped types with modifiers and key remapping',
      'Filtering and composing mapped properties', 'Template literal types and string transformation utilities', 'Variadic, labeled, optional and readonly tuple inference',
      'Function overloads, implementation signatures and generic callbacks', 'this parameters, callable objects and constructor signatures', 'Exhaustiveness checks and never-based validation',
      'Recursive object types, PropertyKey and symbol keys', 'declare, ambient declarations and .d.ts files', 'Module declarations, augmentation and declaration merging',
      'allowJs, checkJs, JSDoc and @types packages', 'Advanced projects: generic data table, typed event system and validation library'
    ],
    Professional: [
      'Type-safe API architecture and domain modeling', 'Discriminated, branded and opaque type patterns', 'Public type contracts and type-safe state machines',
      'Large project structure, module boundaries and shared type packages', 'Project references, composite projects and incremental builds', 'strict, strictNullChecks, noImplicitAny and strictFunctionTypes',
      'noUncheckedIndexedAccess, exactOptionalPropertyTypes, noImplicitOverride and noFallthroughCasesInSwitch', 'target, module, moduleResolution, lib, types and typeRoots',
      'paths, rootDir, outDir, declaration, declarationMap and sourceMap', 'isolatedModules, verbatimModuleSyntax, skipLibCheck and incremental', 'Publishing declarations and package exports',
      'React props, state, events, children, hooks, context, refs and reducers', 'Next.js route types and server/client boundaries', 'Node.js, Express middleware and database model types',
      'Runtime validation at JSON and external API boundaries', 'Avoiding any, preferring unknown and safe assertions', 'Unit, integration, type-level and runtime validation tests',
      'Type-check performance, complex-type costs and production builds', 'Professional projects: full-stack app, SDK and enterprise dashboard'
    ]
  },
  python: { Beginner: ['Basic syntax', 'Variables and types', 'Operators', 'Conditionals', 'Loops', 'Functions'], Intermediate: ['Lists and dictionaries', 'Comprehensions', 'Modules and packages', 'Exceptions', 'File handling'], Advanced: ['Classes and inheritance', 'Iterators and generators', 'Recursion', 'Async programming', 'Testing'], Professional: ['API development', 'Data access', 'Performance', 'Security and deployment'] },
  c: { Beginner: ['Program structure', 'Variables and types', 'Operators', 'Conditions', 'Loops', 'Functions'], Intermediate: ['Arrays and strings', 'Pointers', 'Structs', 'File handling', 'Headers'], Advanced: ['Dynamic memory', 'Function pointers', 'Data structures', 'Algorithms', 'Debugging'], Professional: ['Build systems', 'Memory safety', 'Performance', 'Secure systems programming'] },
  'c-plus-plus': { Beginner: ['Program structure', 'Types and operators', 'Conditions', 'Loops', 'Functions'], Intermediate: ['Classes and objects', 'Constructors', 'Inheritance', 'STL containers', 'Exceptions'], Advanced: ['Templates', 'Smart pointers', 'RAII', 'Algorithms', 'Concurrency'], Professional: ['Performance design', 'Testing', 'Build systems', 'Secure native applications'] },
  java: { Beginner: ['Program structure', 'Variables and types', 'Operators', 'Conditions', 'Loops', 'Methods'], Intermediate: ['Arrays and collections', 'Classes and objects', 'Inheritance', 'Interfaces', 'Exceptions'], Advanced: ['Generics', 'Streams', 'Concurrency', 'JVM memory', 'Testing'], Professional: ['API development', 'Application architecture', 'Performance', 'Security'] },
  'advanced-java-programming': { Beginner: ['Classes and methods', 'Object references', 'Packages', 'Exceptions'], Intermediate: ['Collections', 'Generics', 'Interfaces', 'Streams'], Advanced: ['Concurrency', 'JVM memory', 'Reflection', 'Testing'], Professional: ['API architecture', 'Performance', 'Observability', 'Security'] },
  php: {
    Beginner: ['PHP execution and CLI', 'PHP tags and statements', 'Variables and interpolation', 'Scalar, compound and special types', 'Constants and magic constants', 'Operators and precedence', 'Conditions and match', 'Loops and iteration', 'Functions, parameters and return types', 'Strings and common string functions', 'Indexed and associative arrays', 'PHP with HTML and form basics', 'Beginner projects: calculator, contact form and profile page'],
    Intermediate: ['Array transformations and sorting', 'Closures, callbacks and higher-order functions', 'Variadic functions, named arguments and references', 'Classes, objects, properties and methods', 'Visibility, inheritance, abstraction and polymorphism', 'Interfaces and multiple contracts', 'Traits, aliases and conflict resolution', 'Namespaces and imports', 'Exceptions, Throwable and error logging', 'File and directory handling', 'Forms, uploads and server-side validation', 'Sessions and secure cookies', 'JSON APIs and error handling', 'PDO, prepared statements and transactions', 'Intermediate projects: CRUD, login and blog'],
    Advanced: ['strict_types and the advanced type system', 'Union, intersection, DNF, never and variance', 'Readonly classes and constructor property promotion', 'Enums and backed values', 'Attributes and Reflection', 'Magic methods and object lifecycle', 'Closures, generators and Fibers', 'SPL iterators and data structures', 'Composer and PSR-4 autoloading', 'Database repositories and transaction boundaries', 'REST API design and HTTP status codes', 'Regular expressions and validation', 'Advanced projects: API, CMS and booking system'],
    Professional: ['PHP 8.5 version-specific features', 'MVC, layered and clean architecture', 'SOLID, dependency injection and service containers', 'Repository, service, factory, strategy and observer patterns', 'PHP-FIG PSR interoperability', 'Authentication, authorization and session security', 'SQL injection, XSS, CSRF and secure uploads', 'Testing with PHPUnit and Pest', 'Static analysis with PHPStan and Psalm', 'OPcache, PHP-FPM, caching and profiling', 'Production configuration, Nginx, Apache and Docker', 'Framework integration: Laravel and Symfony', 'Queues, background jobs, monitoring and deployment', 'Professional projects: REST API, SaaS backend and e-commerce'],
  },
  sql: { Beginner: ['SELECT basics', 'Filtering with WHERE', 'Sorting and limiting', 'Expressions', 'INSERT and UPDATE'], Intermediate: ['Joins', 'Grouping and aggregates', 'Subqueries', 'Transactions', 'Constraints'], Advanced: ['Indexes', 'Common table expressions', 'Window functions', 'Query plans', 'Normalization'], Professional: ['Schema design', 'Performance tuning', 'Permissions', 'Safe migrations'] },
  react: {
    Beginner: ['React fundamentals', 'JSX syntax', 'Function components', 'Props and children', 'Conditional rendering', 'Lists and keys', 'Events', 'useState', 'Controlled forms', 'Basic styling', 'Beginner projects'],
    Intermediate: ['State design and lifting state', 'useEffect and external systems', 'useRef', 'useContext', 'useReducer', 'Custom Hooks', 'Advanced forms', 'Data fetching', 'Request cancellation', 'Routing with React Router', 'Intermediate projects'],
    Advanced: ['Render and commit', 'State preservation and identity', 'StrictMode', 'React.memo and memoization', 'useLayoutEffect and useInsertionEffect', 'useImperativeHandle and useId', 'Transitions and deferred values', 'Actions and optimistic UI', 'Compound and headless components', 'Portals', 'lazy and Suspense', 'Error boundaries', 'SSR and hydration', 'Server Components boundaries', 'Performance profiling', 'Advanced projects'],
    Professional: ['Feature-based architecture', 'State ownership and external stores', 'Zustand and Redux Toolkit integration', 'TanStack Query server state', 'React with TypeScript', 'Next.js App Router', 'Testing with React Testing Library', 'Accessibility engineering', 'Security and safe rendering', 'Production performance', 'Deployment and monitoring', 'Professional projects'],
  },
  'tailwind-css': {
    Beginner: ['What Tailwind CSS is', 'Utility-first CSS and class composition', 'Tailwind v4 installation with Vite', 'HTML class and React className usage', 'Utility naming patterns and modifiers', 'Display utilities', 'Color families and shade scales', 'Text sizes and font weights', 'Text alignment and typography', 'Margin and padding scales', 'Width, height and sizing', 'Borders and border radius', 'Shadows and visual hierarchy', 'Beginner projects: cards, forms and navigation'],
    Intermediate: ['Flexbox utilities', 'Grid utilities', 'Positioning and z-index', 'Overflow and object fit', 'Responsive mobile-first variants', 'Responsive spacing and typography', 'Hover, focus and form states', 'Group and peer variants', 'Dark mode architecture', 'Form control styling', 'Named groups and peers', 'Intermediate projects: navbar, product grid and dashboard'],
    Advanced: ['Advanced typography and text wrapping', 'Background images and gradients', 'Border, divide, outline and ring utilities', 'Opacity, blend modes and filters', 'Transforms and transform origin', 'Transitions and motion-safe variants', 'Built-in and custom animations', 'ARIA, data, has and supports variants', 'Arbitrary values and arbitrary properties', 'Container queries and named containers', 'Aspect ratio, columns and subgrid', 'Scroll snap, scroll margin and overscroll', 'Advanced projects: admin dashboard and component gallery'],
    Professional: ['Tailwind v4 CSS-first architecture', '@theme and theme variable namespaces', '@theme inline and static variables', '@utility and custom utilities', '@variant and @custom-variant', '@apply and @reference', '@source and automatic source detection', 'v3 compatibility with tailwind.config.js and @tailwind directives', 'Design tokens and multi-theme systems', 'Component variants and class composition', 'Tailwind with React and TypeScript', 'Tailwind with Next.js App Router', 'Headless UI, Radix UI, shadcn/ui and clsx ecosystem', 'Accessibility and reduced motion', 'Source detection and production CSS size', 'Dynamic class pitfalls and safe patterns', 'Testing, documentation, deployment and governance', 'Professional projects: SaaS dashboard and design system'],
  },
  'node-js': { Beginner: ['Runtime and modules', 'Variables and types', 'Functions', 'Packages', 'CLI input'], Intermediate: ['Async programming', 'HTTP servers', 'File handling', 'Errors', 'Streams'], Advanced: ['Event loop', 'Workers', 'Testing', 'Performance', 'Observability'], Professional: ['API architecture', 'Authentication', 'Secure deployment', 'Scaling'] },
  laravel: { Beginner: ['Application structure', 'Routes', 'Controllers', 'Blade views'], Intermediate: ['Requests and validation', 'Eloquent models', 'Migrations', 'Authentication'], Advanced: ['Queues and jobs', 'Events and listeners', 'Policies and gates', 'Testing'], Professional: ['API architecture', 'Caching', 'Deployment', 'Security'] },
  'rest-api-development': { Beginner: ['Resources and URLs', 'HTTP methods', 'Status codes', 'JSON responses'], Intermediate: ['Validation', 'Pagination', 'Filtering', 'Authentication'], Advanced: ['Idempotency', 'Versioning', 'Rate limiting', 'Caching'], Professional: ['API governance', 'Observability', 'Threat modeling', 'Backward compatibility'] },
  'linux-system': { Beginner: ['Shell navigation', 'Files and directories', 'Permissions', 'Processes'], Intermediate: ['Pipes and redirection', 'Shell scripts', 'Package management', 'Environment variables'], Advanced: ['Services and logs', 'Networking', 'Storage', 'Performance'], Professional: ['Hardening', 'Backups', 'Automation', 'Incident response'] },
  mysql: { Beginner: ['Tables and columns', 'SELECT queries', 'Filtering', 'INSERT and UPDATE'], Intermediate: ['Joins', 'Aggregates', 'Constraints', 'Transactions'], Advanced: ['Indexes', 'Views', 'Subqueries', 'Query plans'], Professional: ['Schema design', 'Replication concepts', 'Backup strategy', 'Access control'] },
  postgresql: { Beginner: ['Schemas and tables', 'SELECT queries', 'Data types', 'Constraints'], Intermediate: ['Joins', 'Transactions', 'Indexes', 'JSONB'], Advanced: ['CTEs', 'Window functions', 'Query planning', 'Full-text search'], Professional: ['Partitioning', 'Roles and privileges', 'Backup and recovery', 'Production migrations'] },
  wordpress: { Beginner: ['Content model', 'Dashboard and editor', 'Themes and plugins', 'Template hierarchy'], Intermediate: ['Hooks', 'Custom post types', 'Taxonomies', 'Media and menus'], Advanced: ['REST API', 'Queries', 'Custom blocks', 'Caching'], Professional: ['Deployment', 'Performance', 'Accessibility', 'Security'] },
  'custom-wordpress-theme-development': { Beginner: ['Theme files', 'Template tags', 'The loop', 'Styles and scripts'], Intermediate: ['Template hierarchy', 'Hooks and filters', 'Menus and sidebars', 'Customizer'], Advanced: ['Block themes', 'Custom blocks', 'Theme performance', 'Internationalization'], Professional: ['Theme architecture', 'Accessibility audits', 'Security', 'Deployment workflow'] },
  'responsive-web-design': { Beginner: ['Viewport and flow', 'Responsive units', 'Media queries', 'Mobile-first layout'], Intermediate: ['Flexible images', 'Flexbox', 'Grid', 'Typography scaling'], Advanced: ['Container queries', 'Art direction', 'Interaction states', 'Performance'], Professional: ['Design systems', 'Accessibility', 'Cross-device testing', 'Performance budgets'] },
  'web-application-security': { Beginner: ['Threats and trust boundaries', 'Input validation', 'Authentication basics', 'Secure errors'], Intermediate: ['Authorization', 'Sessions', 'CSRF', 'Output encoding'], Advanced: ['Injection defense', 'Security headers', 'Secrets', 'Logging'], Professional: ['Threat modeling', 'Dependency risk', 'Incident response', 'Secure SDLC'] },
  'database-security': { Beginner: ['Accounts and privileges', 'Passwords', 'Least privilege', 'Input safety'], Intermediate: ['Roles', 'Transactions', 'Audit logs', 'Backups'], Advanced: ['Encryption', 'Row-level access', 'Injection defense', 'Data masking'], Professional: ['Compliance controls', 'Rotation', 'Recovery testing', 'Security monitoring'] },
}

const examples: Record<string, { language: string; code: string; explanation: string }> = {
  html5: { language: 'HTML', code: '<main>\n  <h1>Learning plan</h1>\n  <p>Build one small feature at a time.</p>\n</main>', explanation: 'main identifies the primary content. The heading gives the page a clear title.' },
  css3: { language: 'CSS', code: '.card {\n  display: grid;\n  gap: 1rem;\n  padding: 1rem;\n}', explanation: 'The rule creates a reusable card layout. gap and padding keep content readable.' },
  javascript: { language: 'JavaScript', code: 'function greet(name) {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greet("Ada"));', explanation: 'The function receives a parameter and returns a value. The caller decides how to use that value.' },
  typescript: { language: 'TypeScript', code: 'function total(values: number[]): number {\n  return values.reduce((sum, value) => sum + value, 0);\n}', explanation: 'The parameter and return type make the function contract explicit.' },
  python: { language: 'Python', code: 'def greet(name: str) -> str:\n    return f"Hello, {name}!"\n\nprint(greet("Ada"))', explanation: 'Python uses indentation to define the function body. The annotation documents expected types.' },
  php: { language: 'PHP', code: '<?php\nfunction greet(string $name): string {\n    return "Hello, {$name}!";\n}', explanation: 'The parameter and return type make the function contract clear.' },
  java: { language: 'Java', code: 'class Greeting {\n  static String greet(String name) {\n    return "Hello, " + name + "!";\n  }\n}', explanation: 'The method is grouped inside a class. static allows it to be called without an object instance.' },
  c: { language: 'C', code: '#include <stdio.h>\n\nint main(void) {\n  printf("Hello, Ada!\\n");\n  return 0;\n}', explanation: 'main is the program entry point. printf writes text to standard output.' },
  'c-plus-plus': { language: 'C++', code: '#include <iostream>\n\nint main() {\n  std::cout << "Hello, Ada!\\n";\n}', explanation: 'iostream provides stream output. std::cout writes the message to standard output.' },
  sql: { language: 'SQL', code: 'SELECT name, email\nFROM learners\nWHERE active = TRUE\nORDER BY name;', explanation: 'The query filters active learners and sorts the result by name.' },
  'rest-api-development': { language: 'HTTP', code: 'GET /api/v1/learners?active=true&page=1\nAccept: application/json', explanation: 'The client requests a filtered resource collection and states that it expects JSON.' },
  'linux-system': { language: 'Shell', code: 'mkdir -p app/logs\ncd app\nprintf "ready\\n" > logs/status.txt', explanation: 'The commands create a directory, move into it, and write a small status file.' },
  mysql: { language: 'MySQL', code: 'SELECT name\nFROM learners\nWHERE active = 1\nORDER BY name;', explanation: 'The query returns active learners in alphabetical order.' },
  postgresql: { language: 'PostgreSQL', code: 'SELECT name\nFROM learners\nWHERE active IS TRUE\nORDER BY name;', explanation: 'PostgreSQL supports boolean values directly. The query returns active learners.' },
  wordpress: { language: 'PHP', code: "<?php\nadd_action('init', function () {\n    register_post_type('course');\n});", explanation: 'The init hook runs during WordPress setup. The callback registers a custom content type.' },
  'custom-wordpress-theme-development': { language: 'PHP', code: '<?php\nif (have_posts()) :\n    while (have_posts()) : the_post();\n        the_title(\'<h2>\', \'</h2>\');\n    endwhile;\nendif;', explanation: 'The loop checks for posts, moves through each result, and prints its title.' },
  'responsive-web-design': { language: 'CSS', code: '.layout {\n  display: grid;\n  grid-template-columns: 1fr;\n}\n\n@media (min-width: 48rem) {\n  .layout { grid-template-columns: 2fr 1fr; }\n}', explanation: 'The base layout is mobile-first. The media query adds two columns on wider screens.' },
}

function lessonFor(slug: string, name: string, level: NonNullable<SkillModule['level']>, topic: string, index: number): SkillLesson {
  const example = examples[slug]
  return { id: `${slug}-${level.toLowerCase()}-${index + 1}`, level, title: topic, summary: `Learn ${topic.toLowerCase()} with a small, focused example.`, overview: `${topic} is a core part of ${name}. Start with the rule, then apply it in a small program.`, objectives: [`Explain ${topic.toLowerCase()} in simple terms`, `Use ${topic.toLowerCase()} in a controlled example`, 'Recognize one common mistake'], theory: 'A good solution makes the data flow visible. Break the task into inputs, decisions, operations and outputs.', syntax: `Use the ${name} syntax for ${topic.toLowerCase()}. Keep the first example small and readable.`, concepts: [topic, 'Inputs and outputs', 'Readable structure'], sections: [{ heading: 'Concept explanation', body: `${topic} helps a program solve a specific problem. Learn the smallest rule first, then combine it with earlier ideas.` }, { heading: 'Programming logic', body: 'First identify the input. Next apply the rule. Finally inspect the output and test one edge case.' }], codeExamples: example ? [example] : undefined, practicalUseCases: ['Small learning exercises', 'Features inside real applications', 'Reusable project patterns'], commonMistakes: ['Changing too many things at once', 'Ignoring the error message', 'Skipping an edge case'], bestPractices: ['Use meaningful names', 'Keep one responsibility per example', 'Test the happy path and one failure path'], keyTakeaways: [`${topic} is a tool for expressing program behavior.`, 'Small examples make logic easier to verify.'], summaryText: `You can now explain and apply ${topic.toLowerCase()} at the ${level.toLowerCase()} level.`, relatedLessonIds: [], readingTime: '6 min' }
}

function buildDocs(group: SkillGroup, skill: SkillDocumentation['skill']): SkillDocumentation {
  const slug = skillSlug(skill.name)
  const meta = metadata[slug] ?? { difficulty: 'Beginner' as const, duration: '3–4 weeks', prerequisites: ['Curiosity and consistent practice'], objectives: [`Understand the fundamentals of ${skill.name}`, 'Apply the skill in a small project', 'Review your work carefully'], technologyInfo: skill.description }
  const levels: NonNullable<SkillModule['level']>[] = ['Beginner', 'Intermediate', 'Advanced', 'Professional']
  const topics = curriculum[slug] ?? { Beginner: ['Core concepts', 'Basic syntax'], Intermediate: ['Common patterns'], Advanced: ['Problem solving'], Professional: ['Production practices'] }
  const modules = levels.map((level) => ({ id: `${slug}-${level.toLowerCase()}`, level, title: `${level} curriculum`, lessons: (topics[level] ?? []).map((topic, index) => lessonFor(slug, skill.name, level, topic, index)) }))
  modules.forEach((module, moduleIndex) => module.lessons.forEach((lesson, index, lessons) => { lesson.relatedLessonIds = [lessons[index + 1]?.id || modules[moduleIndex + 1]?.lessons[0]?.id].filter(Boolean) as string[] }))
  return { slug, category: group.name, skill, ...meta, modules }
}

export const skillDocumentation = skillGroups.flatMap((group) => group.skills.map((skill) => buildDocs(group, skill))).filter((doc, index, docs) => docs.findIndex((candidate) => candidate.slug === doc.slug) === index)
export function getSkillDocumentation(slug: string) {
  const normalizedSlug = slug === 'html' ? 'html5' : slug === 'css' ? 'css3' : slug
  return skillDocumentation.find((doc) => doc.slug === normalizedSlug)
}

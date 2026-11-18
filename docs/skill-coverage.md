# Skill documentation coverage

This report describes the current structured curriculum in `src/data/skillDocs.ts`.
It is intentionally honest: a topic appearing in the curriculum means it has an ordered lesson outline and a safe representative example where one is appropriate. It does not claim to replace the full official specification for a language or framework.

| Skill | Levels | Topic coverage | Example coverage | Status |
| --- | --- | ---: | --- | --- |
| HTML5 | Beginner → Professional | 18 | HTML | Outline complete; element and attribute reference expansion remains |
| CSS3 | Beginner → Professional | 19 | CSS | Outline complete; full property/value reference remains |
| JavaScript | Beginner → Professional | 20 | JavaScript | Core curriculum complete; browser API reference remains |
| TypeScript | Beginner → Professional | 19 | TypeScript | Core curriculum complete; version-specific utility types remain |
| React | Beginner → Professional | 19 | — | Core curriculum complete; API reference remains |
| Tailwind CSS | Beginner → Professional | 19 | — | Core curriculum complete; utility inventory remains |
| Python | Beginner → Professional | 20 | Python | Core curriculum complete; standard-library inventory remains |
| C | Beginner → Professional | 20 | C | Core curriculum complete; C11/C17/C23 comparison remains |
| C++ | Beginner → Professional | 19 | C++ | Core curriculum complete; standard-library inventory remains |
| Java | Beginner → Professional | 20 | Java | Core curriculum complete; JDK API inventory remains |
| Advanced Java Programming | Beginner → Professional | 16 | — | Independent outline added; API reference remains |
| PHP | Beginner → Professional | 20 | PHP | Core curriculum complete; PHP extension inventory remains |
| Laravel | Beginner → Professional | 16 | — | Framework outline added; version-specific API reference remains |
| Node.js | Beginner → Professional | 19 | — | Runtime outline added; Node API inventory remains |
| REST API Development | Beginner → Professional | 16 | HTTP | API design outline added; backend reference remains |
| Linux System | Beginner → Professional | 16 | Shell | Operations outline added; distribution-specific commands remain |
| MySQL | Beginner → Professional | 16 | MySQL | Database outline added; version-specific reference remains |
| PostgreSQL | Beginner → Professional | 16 | PostgreSQL | Database outline added; extension reference remains |
| SQL | Beginner → Professional | 20 | SQL | SQL curriculum complete; vendor differences remain |
| WordPress | Beginner → Professional | 16 | PHP | CMS outline added; hook/function reference remains |
| Custom WordPress Theme Development | Beginner → Professional | 16 | PHP | Theme outline added; template-tag reference remains |
| Responsive Web Design | Beginner → Professional | 16 | CSS | Responsive outline added; browser compatibility matrix remains |
| Web Application Security | Beginner → Professional | 16 | — | Security outline added; standards mapping remains |
| Database Security | Beginner → Professional | 16 | — | Security outline added; vendor-specific controls remain |

## Validation status

- All existing skill groups resolve to an independent curriculum map or a documented fallback.
- Duplicate JavaScript and PHP records are deduplicated by slug for detail-page routing.
- Code examples are rendered as text and tokenized safely in React. No raw HTML injection is used.
- The current repository is Vite React + Laravel, not Next.js + FastAPI. Lesson content is therefore still frontend-structured rather than FastAPI/PostgreSQL-managed.
- Admin lesson authoring and complete database-backed curriculum management remain unfinished.

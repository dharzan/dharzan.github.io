# Data Model

All portfolio content lives in TypeScript data files under `src/data/`. These are the single source of truth. Never hardcode content in components.

---

## Project

File: `src/data/projects.ts`

```typescript
export type ProjectCategory =
  | "backend"
  | "frontend"
  | "fullstack"
  | "ai"
  | "testing"
  | "devtools";

export type Project = {
  // Required
  slug: string;            // URL-safe, unique. Route: /projects/[slug]
  title: string;
  subtitle: string;        // One-line description shown on cards
  problem: string;
  solution: string;
  architecture: string;
  testingStrategy: string;
  cicd: string;
  learned: string;
  future: string[];        // Planned next steps (empty array is valid)
  impact: string[];        // Engineering signals demonstrated
  stack: string[];         // Technologies used
  category: ProjectCategory;
  featured: boolean;       // true = appears on homepage project grid

  // Optional
  githubUrl?: string;
  liveUrl?: string;        // Only add if the project is actually deployed
};
```

### Helper functions (same file)

```typescript
getFeaturedProjects(): Project[]
// Returns all projects where featured === true.
// Used by the homepage Projects section.

getProjectBySlug(slug: string): Project | undefined
// Used by the [slug] detail page to look up a project.
```

---

## Experience

File: `src/data/experience.ts`

```typescript
export type ExperienceItem = {
  company: string;       // Required
  role: string;          // Required
  period: string;        // Required. Free-form, e.g. "2022–2024" or "Recent work"
  summary: string;       // Required. One or two sentence overview
  highlights: string[];  // Required. Bullet points of key contributions
  stack?: string[];      // Optional. Technologies used
};
```

---

## Skills

File: `src/data/skills.ts`

```typescript
export type SkillGroup = {
  title: string;    // Required. Group heading, e.g. "Languages"
  skills: string[]; // Required. Individual skill labels within the group
};
```

Valid group titles currently in use: `"Languages"`, `"Frontend"`, `"Backend / Systems"`, `"Cloud / DevOps"`, `"Testing / Automation"`, `"Quality Gate Engineering"`, `"AI Engineering"`.

---

## Links

File: `src/data/links.ts`

```typescript
export const links: {
  email: string;    // mailto: URI
  github: string;   // GitHub profile URL
  linkedIn: string; // LinkedIn profile URL
  resume: string;   // Resume URL (or LinkedIn fallback if PDF not yet hosted)
};
```

---

## Site Config

File: `src/lib/constants.ts`

```typescript
export const siteConfig: {
  name: string;        // "Dharsan Guruparan"
  role: string;        // "Software Engineer"
  description: string; // Used in page metadata / SEO
};
```

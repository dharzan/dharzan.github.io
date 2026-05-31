# Codebase Cleanup, ADR Documentation & Reusable Skills — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove dead 3D-era files, fix and expand ADR documentation, and create four AI-agnostic reusable skills so any agent working in this repo stays consistent.

**Architecture:** All changes are documentation and file-system cleanup — no production code is written. The dead component deletions are pre-existing unstaged `git rm` changes; this plan commits them. ADR additions append to the existing `docs/ADR.md`. Skills are self-contained markdown files placed at `.superpowers/skills/`.

**Tech Stack:** Git, Markdown, TypeScript (types referenced in skill content only, not changed)

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Stage + commit deletions | `src/app/components/*.jsx` (7 files) | 3D-era HeroOrbitScene, HeroSection, ProjectCard, ProjectScenePreview, ProjectSection, ProjectTag, ThreeBackground |
| Stage + commit deletions | `src/app/components/scenes/*.jsx` (2 files) | TripStreamScene, VaultDropScene |
| Edit | `docs/ADR.md` | Fix ADR-006/007 order; add ADR-008, ADR-009, ADR-010 |
| Create | `.superpowers/skills/portfolio-conventions/index.md` | Theme, hard constraints, safe change zones, commands |
| Create | `.superpowers/skills/add-project/index.md` | Step-by-step guide for new project entries |
| Create | `.superpowers/skills/adr-author/index.md` | How to number, write, and commit new ADRs |
| Create | `.superpowers/skills/data-model/index.md` | TypeScript types for all `src/data/` files |

---

## Task 1: Commit staged 3D component deletions

**Files:**
- Delete (stage): `src/app/components/HeroOrbitScene.jsx`
- Delete (stage): `src/app/components/HeroSection.jsx`
- Delete (stage): `src/app/components/ProjectCard.jsx`
- Delete (stage): `src/app/components/ProjectScenePreview.jsx`
- Delete (stage): `src/app/components/ProjectSection.jsx`
- Delete (stage): `src/app/components/ProjectTag.jsx`
- Delete (stage): `src/app/components/ThreeBackground.jsx`
- Delete (stage): `src/app/components/scenes/TripStreamScene.jsx`
- Delete (stage): `src/app/components/scenes/VaultDropScene.jsx`

> These files were deleted locally in a previous session but never committed. `git status` shows them as unstaged deletions. They are 3D-portfolio-era JSX files not referenced by anything in `src/`.

- [ ] **Step 1: Stage the deletions**

```bash
git rm src/app/components/HeroOrbitScene.jsx \
       src/app/components/HeroSection.jsx \
       src/app/components/ProjectCard.jsx \
       src/app/components/ProjectScenePreview.jsx \
       src/app/components/ProjectSection.jsx \
       src/app/components/ProjectTag.jsx \
       src/app/components/ThreeBackground.jsx \
       src/app/components/scenes/TripStreamScene.jsx \
       src/app/components/scenes/VaultDropScene.jsx
```

Expected: each line shows `rm 'src/app/components/...'`

- [ ] **Step 2: Remove the remaining empty directories**

After `git rm` removes the files, `scenes/` and `hooks/` remain as empty local directories (git doesn't track empty dirs). Remove them:

```bash
rmdir src/app/components/scenes
rmdir src/app/components/hooks
rmdir src/app/components
```

Expected: all three exit 0. If any fails with "Directory not empty", a file was missed in Step 1.

- [ ] **Step 3: Verify lint and build still pass**

```bash
yarn lint && yarn build
```

Expected: both exit 0. No errors or warnings about the removed files.

- [ ] **Step 4: Commit**

```bash
git commit -m "chore: remove dead 3D-era components from src/app/components

HeroOrbitScene, HeroSection, ProjectCard, ProjectScenePreview,
ProjectSection, ProjectTag, ThreeBackground, TripStreamScene,
VaultDropScene — all leftover from the abandoned 3D portfolio
branch. Not imported anywhere in the active codebase.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
```

---

## Task 2: Fix ADR-006 / ADR-007 ordering and add ADR-008–010

**Files:**
- Modify: `docs/ADR.md`

> Currently ADR-007 appears before ADR-006 in the file. The fix moves the ADR-006 block above ADR-007. Then ADR-008, ADR-009, ADR-010 are appended.

- [ ] **Step 1: Reorder ADR-006 and ADR-007**

Replace the end of `docs/ADR.md` — the section from ADR-007 onwards — with the correctly ordered content:

Replace this block:
```markdown
## ADR-007: CI Control Room Presentation

Status: Accepted

The active portfolio UI uses a CI control-room metaphor: build cards, quality gates, deploy-readiness labels, log-style dividers, and compact proof metrics. Status labels are static presentation data from the portfolio content, not fetched runtime state.

## ADR-006: Vercel as Host

Status: Accepted

Vercel remains the production host for `dharzan-github-io`, with production expected from `new_new_bitmoji`.
```

With this block (006 before 007):
```markdown
## ADR-006: Vercel as Host

Status: Accepted

Vercel remains the production host for `dharzan-github-io`, with production expected from `new_new_bitmoji`.

## ADR-007: CI Control Room Presentation

Status: Accepted

The active portfolio UI uses a CI control-room metaphor: build cards, quality gates, deploy-readiness labels, log-style dividers, and compact proof metrics. Status labels are static presentation data from the portfolio content, not fetched runtime state.
```

- [ ] **Step 2: Append ADR-008, ADR-009, ADR-010 to the end of `docs/ADR.md`**

Append exactly this content (add a blank line after the last existing ADR before appending):

```markdown

## ADR-008: Playwright E2E Testing

Status: Accepted

Playwright smoke tests live in `tests/e2e/` and run via `yarn test:e2e`. Coverage targets: homepage render, navbar links, section visibility after GSAP hydration, project card count and links to detail routes, contact link hrefs, and reduced-motion behavior. Tests validate static output only — no network requests, no live data, no mocked API responses. A failing test blocks merge.

## ADR-009: Folder Structure

Status: Accepted

`src/app/` contains only Next.js routes and layouts (`layout.tsx`, `page.tsx`, `projects/[slug]/page.tsx`). All reusable UI lives in `src/components/` grouped by domain: `home/`, `layout/`, `projects/`, `ui/`, `animation/`. Static content lives in `src/data/` as TypeScript files. Utilities and helpers live in `src/lib/`. No component logic, data fetching, or business logic belongs in `src/app/`. Do not add files to `src/app/components/` — any new components go in `src/components/`.

## ADR-010: AI Workflow Conventions

Status: Accepted

`AI_CONTEXT.md` is the single AI entry point: purpose, hard rules, source-of-truth pointers, testing commands, deployment target. `AI_TASKS.md` tracks open and completed work items; update it as tasks are finished. `docs/ARCHITECTURE.md` describes folder structure, data flow, and constraints. `docs/ADR.md` records architectural decisions in sequential numeric order. `.superpowers/skills/` holds portfolio-specific skills for any AI agent — each skill is self-contained markdown. Hard rules enforced across all agents: no backend, no database, no CMS, no auth, no contact form, no heavy animation, no new npm dependencies without explicit approval, grayscale theme only.
```

- [ ] **Step 3: Verify the file looks correct**

```bash
grep "^## ADR-" docs/ADR.md
```

Expected output (in this exact order):
```
## ADR-001: Next.js App Router
## ADR-002: Static Content
## ADR-003: Tailwind CSS
## ADR-004: Data-Driven Projects
## ADR-005: GSAP Section Choreography
## ADR-006: Vercel as Host
## ADR-007: CI Control Room Presentation
## ADR-008: Playwright E2E Testing
## ADR-009: Folder Structure
## ADR-010: AI Workflow Conventions
```

- [ ] **Step 4: Commit**

```bash
git add docs/ADR.md
git commit -m "docs: fix ADR-006/007 ordering; add ADR-008 through ADR-010

- Reorder so ADR-006 (Vercel) comes before ADR-007 (CI metaphor)
- ADR-008: Playwright E2E Testing strategy
- ADR-009: Folder structure conventions
- ADR-010: AI workflow conventions and agent rules

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
```

---

## Task 3: Create portfolio-conventions skill

**Files:**
- Create: `.superpowers/skills/portfolio-conventions/index.md`

- [ ] **Step 1: Create the directory and file**

```bash
mkdir -p .superpowers/skills/portfolio-conventions
```

Create `.superpowers/skills/portfolio-conventions/index.md` with this exact content:

```markdown
# Portfolio Conventions

This portfolio is Dharsan Guruparan's engineer-first static site. These rules apply to every AI agent working in this repository.

## Theme

Strictly grayscale. No exceptions.

| Token | Usage |
|-------|-------|
| `bg-black` | Page background |
| `bg-neutral-950` | Section backgrounds |
| `border-neutral-800` | Panel/card borders |
| `text-neutral-400` | Body / secondary text |
| `text-white` | Primary text, headings |
| `bg-white text-black` | Primary button |
| `border border-neutral-700 text-white` | Secondary button |

**Prohibited:** cyan, blue, purple, red, green accents — any color not in the grayscale scale above. Amber exists only for status/alert accents already in the design; do not add new amber usage.

## Hard Constraints

Do NOT add any of the following:
- Backend (API routes, server actions, server-side data fetching)
- Database (Prisma, Drizzle, Supabase, or any ORM/client)
- CMS (Contentful, Sanity, Strapi, or similar)
- Auth (NextAuth, Clerk, or similar)
- Contact form with real submission
- Heavy animation (Framer Motion, Three.js, R3F, particles, cursor effects, full-page scroll locks)
- New npm dependencies without explicit user approval

## Safe Changes

- Edit content in `src/data/*.ts` (projects, skills, experience, links)
- Edit Tailwind classes on existing components (stay grayscale)
- Add new reusable components to `src/components/`
- Add or update Playwright tests in `tests/e2e/`
- Edit documentation in `docs/`, `AI_CONTEXT.md`, `AI_TASKS.md`
- Add new ADRs to `docs/ADR.md` (see `adr-author` skill)

## Content Source of Truth

All content lives in TypeScript data files. Never hardcode content in components.

| Content | File |
|---------|------|
| Projects | `src/data/projects.ts` |
| Skills | `src/data/skills.ts` |
| Experience | `src/data/experience.ts` |
| Contact links | `src/data/links.ts` |
| Site name / role | `src/lib/constants.ts` |

## Package Manager

This project uses **yarn**. Do not use `npm install` or `pnpm`. Always use `yarn add` or `yarn remove`.

## Commands

```bash
yarn dev        # local dev server at http://localhost:3000
yarn lint       # ESLint — must pass before any commit
yarn build      # production build — must pass before any PR
yarn test:e2e   # Playwright E2E tests (requires installed browsers)
```

## AI Entry Points

| File | Purpose |
|------|---------|
| `AI_CONTEXT.md` | Purpose, rules, source-of-truth, testing, deployment |
| `AI_TASKS.md` | Open and completed work items |
| `docs/ARCHITECTURE.md` | Folder structure, data flow, constraints |
| `docs/ADR.md` | Architectural decisions |
| `.superpowers/skills/` | Workflow skills for AI agents |
```

- [ ] **Step 2: Commit**

```bash
git add .superpowers/skills/portfolio-conventions/index.md
git commit -m "docs: add portfolio-conventions skill

Covers grayscale theme rules, hard constraints (no backend/CMS/auth),
safe change zones, content source-of-truth, yarn commands, and AI
entry point index.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
```

---

## Task 4: Create add-project skill

**Files:**
- Create: `.superpowers/skills/add-project/index.md`

- [ ] **Step 1: Create the directory and file**

```bash
mkdir -p .superpowers/skills/add-project
```

Create `.superpowers/skills/add-project/index.md` with this exact content:

```markdown
# Add a Project

Follow these steps to add a new project to the portfolio.

## Step 1: Open the data file

File: `src/data/projects.ts`

## Step 2: Add a new entry to the `projects` array

Copy this template and fill in every required field:

```typescript
{
  slug: "your-project-slug",           // URL-safe, lowercase, hyphenated. Must be unique.
  title: "Project Title",
  subtitle: "One-line description of what it does.",
  problem: "What problem does this solve? One or two sentences.",
  solution: "How did you solve it? One or two sentences.",
  architecture: "What is the system structure? Key technical decisions.",
  testingStrategy: "How is it tested? Coverage focus.",
  cicd: "How does it build and deploy?",
  learned: "What did you learn building this?",
  future: ["Next thing to add.", "Another future direction."],
  impact: ["Engineering signal this demonstrates.", "Another signal."],
  stack: ["TypeScript", "Next.js", "Tailwind"],   // real technologies used
  category: "fullstack",   // one of: "backend" | "frontend" | "fullstack" | "ai" | "testing" | "devtools"
  featured: true,          // true = appears on homepage project grid
  githubUrl: "https://github.com/dharzan/your-repo",   // optional
  liveUrl: "https://your-live-url.com",                // optional — only add if actually deployed
},
```

## Step 3: Verify slug uniqueness

Confirm no existing entry in `projects` uses the same `slug` value. Duplicate slugs cause `generateStaticParams` to produce duplicate routes.

## Step 4: Update the E2E test card count (if featured: true)

File: `tests/e2e/home.spec.ts`

Find the line:
```typescript
await expect(cards).toHaveCount(6);
```
Increment by 1 for each new featured project added. This assertion appears twice — update both occurrences.

## Step 5: Verify lint and build

```bash
yarn lint
yarn build
```

Both must exit 0.

## Step 6: Verify routes render (if Playwright browsers installed)

```bash
yarn test:e2e
```

Confirms project cards render on the homepage and the detail route `/projects/[slug]` loads.

## Step 7: Commit

```bash
git add src/data/projects.ts tests/e2e/home.spec.ts
git commit -m "content: add [Project Title] project"
```
```

- [ ] **Step 2: Commit**

```bash
git add .superpowers/skills/add-project/index.md
git commit -m "docs: add add-project skill

Step-by-step guide for adding a new project entry: data file template,
slug uniqueness check, E2E card-count update, lint/build verification.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
```

---

## Task 5: Create adr-author skill

**Files:**
- Create: `.superpowers/skills/adr-author/index.md`

- [ ] **Step 1: Create the directory and file**

```bash
mkdir -p .superpowers/skills/adr-author
```

Create `.superpowers/skills/adr-author/index.md` with this exact content:

```markdown
# Writing an ADR

Follow these steps to add a new Architecture Decision Record to this repository.

## Step 1: Find the next number

Open `docs/ADR.md`. Find the highest ADR number already present (e.g. `## ADR-010`). Your new ADR is that number + 1, zero-padded to three digits (e.g. ADR-011).

```bash
grep "^## ADR-" docs/ADR.md | tail -1
```

## Step 2: Write the ADR block

Append to the end of `docs/ADR.md`:

```markdown
## ADR-NNN: Short Decision Title

Status: Accepted

One paragraph describing what was decided, why, and any key constraints it implies.
Be specific enough that someone reading it six months later understands both the
decision and the reasoning — not just that a decision was made.
```

**Status values:**
- `Accepted` — in effect; use this for almost all new ADRs
- `Proposed` — under discussion, not yet in effect
- `Deprecated` — was accepted, no longer applies; note why in the body

## Step 3: Commit

```bash
git add docs/ADR.md
git commit -m "docs: add ADR-NNN <short topic name>"
```

Replace `NNN` with the actual number and `<short topic name>` with 2–4 lowercase words (e.g. `docs: add ADR-011 resume-pdf-hosting`).

## What Makes a Good ADR

- **One decision per ADR.** Don't combine unrelated decisions in a single entry.
- **Explain the why.** "We chose X" is not useful. "We chose X because Y constraint ruled out Z" is.
- **Keep it short.** One paragraph is usually enough. Two is the maximum.
- **Accepted means in effect.** To reverse a decision: deprecate the old ADR and write a new one.
- **Never renumber.** ADR numbers are permanent. Don't reorder or reuse numbers.
```

- [ ] **Step 2: Commit**

```bash
git add .superpowers/skills/adr-author/index.md
git commit -m "docs: add adr-author skill

How to find the next ADR number, write the entry, and commit.
Includes status values and quality guidelines.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
```

---

## Task 6: Create data-model skill

**Files:**
- Create: `.superpowers/skills/data-model/index.md`

- [ ] **Step 1: Create the directory and file**

```bash
mkdir -p .superpowers/skills/data-model
```

Create `.superpowers/skills/data-model/index.md` with this exact content:

```markdown
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
```

- [ ] **Step 2: Commit**

```bash
git add .superpowers/skills/data-model/index.md
git commit -m "docs: add data-model skill

Documents TypeScript types for Project, ExperienceItem, SkillGroup,
links, and siteConfig. Covers required vs optional fields, valid
ProjectCategory values, and helper function signatures.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
```

---

## Task 7: Final verification

- [ ] **Step 1: Run lint and build**

```bash
yarn lint && yarn build
```

Expected: both exit 0. No warnings.

- [ ] **Step 2: Verify git log shows all commits**

```bash
git --no-pager log --oneline -8
```

Expected (most recent first):
```
<hash> docs: add data-model skill
<hash> docs: add adr-author skill
<hash> docs: add add-project skill
<hash> docs: add portfolio-conventions skill
<hash> docs: fix ADR-006/007 ordering; add ADR-008 through ADR-010
<hash> chore: remove dead 3D-era components from src/app/components
<hash> docs: add design spec for codebase cleanup, ADR expansion, and skills
```

- [ ] **Step 3: Verify skill directory structure**

```bash
find .superpowers -type f | sort
```

Expected:
```
.superpowers/skills/add-project/index.md
.superpowers/skills/adr-author/index.md
.superpowers/skills/data-model/index.md
.superpowers/skills/portfolio-conventions/index.md
```

- [ ] **Step 4: Verify ADR numbering is sequential**

```bash
grep "^## ADR-" docs/ADR.md
```

Expected:
```
## ADR-001: Next.js App Router
## ADR-002: Static Content
## ADR-003: Tailwind CSS
## ADR-004: Data-Driven Projects
## ADR-005: GSAP Section Choreography
## ADR-006: Vercel as Host
## ADR-007: CI Control Room Presentation
## ADR-008: Playwright E2E Testing
## ADR-009: Folder Structure
## ADR-010: AI Workflow Conventions
```

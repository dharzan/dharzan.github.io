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

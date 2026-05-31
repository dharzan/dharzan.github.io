# Architecture Decision Record

## ADR-001: Next.js App Router

Status: Accepted

Use Next.js App Router for a static-first portfolio that deploys cleanly to Vercel, supports metadata, and keeps routing simple.

## ADR-002: Static Content

Status: Accepted

Content lives in TypeScript data files under `src/data`. No CMS, database, backend, admin panel, or contact form in V1.

## ADR-003: Tailwind CSS

Status: Accepted

Use Tailwind for fast UI iteration with a dark technical-lab theme, amber alert accents, and restrained status colors. Repeated panel, badge, and action patterns should be extracted into components.

## ADR-004: Data-Driven Projects

Status: Accepted

Project cards and detail pages use `src/data/projects.ts` as the source of truth. Detail pages are generated at `/projects/[slug]`.

## ADR-005: GSAP Section Choreography

Status: Accepted

Use GSAP for noticeable but controlled section choreography: heading reveals, staggered panel/log reveals, project-card depth, pointer-based project-card tilt, and timeline directionality. Respect `prefers-reduced-motion` by keeping content visible, disabling interactive card transforms, and disabling scroll snap. Avoid particles, cursor effects, full-page scroll locks, and 3D showcase dependencies in active routes.

## ADR-006: Vercel as Host

Status: Accepted

Vercel remains the production host for `dharzan-github-io`, with production expected from `new_new_bitmoji`.

## ADR-007: CI Control Room Presentation

Status: Accepted

The active portfolio UI uses a CI control-room metaphor: build cards, quality gates, deploy-readiness labels, log-style dividers, and compact proof metrics. Status labels are static presentation data from the portfolio content, not fetched runtime state.

## ADR-008: Playwright E2E Testing

Status: Accepted

Playwright smoke tests live in `tests/e2e/` and run via `yarn test:e2e`. Coverage targets: homepage render, navbar links, section visibility after GSAP hydration, project card count and links to detail routes, contact link hrefs, and reduced-motion behavior. Tests validate static output only — no network requests, no live data, no mocked API responses. A failing test blocks merge.

## ADR-009: Folder Structure

Status: Accepted

`src/app/` contains only Next.js routes and layouts (`layout.tsx`, `page.tsx`, `projects/[slug]/page.tsx`). All reusable UI lives in `src/components/` grouped by domain: `home/`, `layout/`, `projects/`, `ui/`, `animation/`. Static content lives in `src/data/` as TypeScript files. Utilities and helpers live in `src/lib/`. No component logic, data fetching, or business logic belongs in `src/app/`. Do not add files to `src/app/components/` — any new components go in `src/components/`.

## ADR-010: AI Workflow Conventions

Status: Accepted

`AI_CONTEXT.md` is the single AI entry point: purpose, hard rules, source-of-truth pointers, testing commands, deployment target. `AI_TASKS.md` tracks open and completed work items; update it as tasks are finished. `docs/ARCHITECTURE.md` describes folder structure, data flow, and constraints. `docs/ADR.md` records architectural decisions in sequential numeric order. `.superpowers/skills/` holds portfolio-specific skills for any AI agent — each skill is self-contained markdown. Hard rules enforced across all agents: no backend, no database, no CMS, no auth, no contact form, no heavy animation, no new npm dependencies without explicit approval, grayscale theme only.

# Codebase Cleanup, ADR Documentation & Reusable Skills

**Date:** 2026-05-31  
**Status:** Approved

---

## 1. Problem

Three related issues affect the maintainability and AI-safety of this repository:

1. **Dead code** — empty directories from an abandoned 3D portfolio experiment remain in `src/app/components/`.
2. **Incomplete ADR coverage** — `docs/ADR.md` has a numbering gap (ADR-007 appears before ADR-006), and decisions about testing strategy, folder structure, and AI workflow conventions are undocumented.
3. **No reusable skills** — any AI agent working on this repo must re-derive conventions from scratch each session, increasing the risk of inconsistent edits.

---

## 2. Scope

### In scope
- Delete empty `src/app/components/hooks/` and `src/app/components/scenes/` directories.
- Fix ADR-006/ADR-007 ordering in `docs/ADR.md`.
- Add ADR-008 (Playwright E2E Testing), ADR-009 (Folder Structure), ADR-010 (AI Workflow Conventions).
- Create 4 portfolio-specific skills at `.superpowers/skills/`.

### Out of scope
- Public image cleanup (deferred — images kept for now).
- Splitting `docs/ADR.md` into per-file ADRs (not needed at current scale).
- Any changes to the GitHub Pages workflow (dual deploy is intentional).
- Any code changes outside of documentation and the empty directories.

---

## 3. Dead Code Cleanup

**Target:** `src/app/components/` — contains only two empty subdirectories.

```
src/app/components/
  hooks/    ← empty, 3D portfolio era remnant
  scenes/   ← empty, 3D portfolio era remnant
```

**Action:** Delete all three (both subdirs + parent `src/app/components/` if it becomes empty after removal).

**Verification:** `yarn lint` and `yarn build` must pass after deletion to confirm no source file references these paths.

---

## 4. ADR Documentation

**File:** `docs/ADR.md`

### 4.1 Fix ordering
ADR-007 currently appears before ADR-006 in the file. Reorder to be numerically sequential: 001–007.

### 4.2 New ADRs

**ADR-008: Playwright E2E Testing**
- **Status:** Accepted
- Smoke tests live in `tests/e2e/`. Run via `yarn test:e2e`.
- Coverage: homepage render, navbar links, project cards, project detail routes, contact links.
- Tests must not depend on network requests or live data. They validate static output only.
- Failing tests block merge on CI.

**ADR-009: Folder Structure**
- **Status:** Accepted
- `src/app/` — Next.js routes and layouts only (`layout.tsx`, `page.tsx`, `projects/[slug]/page.tsx`).
- `src/components/` — all reusable UI, grouped by domain: `home/`, `layout/`, `projects/`, `ui/`, `animation/`.
- `src/data/` — TypeScript data files as the source of truth for all content.
- `src/lib/` — utilities and helpers (`constants.ts`, `seo.ts`).
- No component logic in `src/app/`. No data fetching. No business logic outside `src/data/` and `src/lib/`.

**ADR-010: AI Workflow Conventions**
- **Status:** Accepted
- `AI_CONTEXT.md` — single AI entry point. Describes purpose, rules, source-of-truth, testing, deployment.
- `AI_TASKS.md` — tracks open/completed work. Update as tasks are completed.
- `docs/ARCHITECTURE.md` — describes structure, data flow, constraints.
- `docs/ADR.md` — records architectural decisions. New decisions get the next sequential ADR number.
- `.superpowers/skills/` — portfolio-specific skills for any AI agent. Each skill is self-contained markdown.
- Hard rules for all AI agents: no backend, no database, no CMS, no auth, no contact form, no heavy animation, grayscale theme only.

---

## 5. Reusable Skills

**Location:** `.superpowers/skills/` (checked in to the repository)

Each skill is a self-contained `index.md` — pure markdown, AI-agnostic, readable by any agent without tool calls.

### 5.1 `portfolio-conventions/index.md`
Documents the hard rules of this portfolio: grayscale-only theme, no-backend constraints, content-update process, and what kinds of changes are safe vs. prohibited. The single most important skill for preventing bad AI edits.

### 5.2 `add-project/index.md`
Step-by-step guide for adding a new project: create a `Project` entry in `src/data/projects.ts`, set required fields, verify the slug is unique, ensure `featured: true` if it should appear on homepage, run `yarn lint` and `yarn build`, run `yarn test:e2e` to confirm project card and detail page render.

### 5.3 `adr-author/index.md`
How to write a new ADR: pick the next sequential number from `docs/ADR.md`, use the template (Title, Status, Decision), append to `docs/ADR.md`, commit with a message like `docs: add ADR-011 <topic>`.

### 5.4 `data-model/index.md`
Documents the TypeScript types from `src/data/`: `Project`, `ProjectCategory`, `Experience`, `Skill`, and the links structure. Includes which fields are required vs. optional and what values are valid for enum-like fields like `category`.

---

## 6. Verification

After all changes:

```bash
yarn lint
yarn build
```

Both must pass. `yarn test:e2e` should also pass if Playwright browsers are installed.

---

## 7. Files Changed

| Action | Path |
|--------|------|
| Delete | `src/app/components/hooks/` |
| Delete | `src/app/components/scenes/` |
| Edit | `docs/ADR.md` |
| Create | `.superpowers/skills/portfolio-conventions/index.md` |
| Create | `.superpowers/skills/add-project/index.md` |
| Create | `.superpowers/skills/adr-author/index.md` |
| Create | `.superpowers/skills/data-model/index.md` |

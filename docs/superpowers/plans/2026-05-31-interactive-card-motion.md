# Interactive Card Motion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add creative but controlled interactive scroll/card motion to the CI Control Room portfolio while proving the site is clean, buildable, and testable.

**Architecture:** Extend the existing `ScrollAnimationProvider` GSAP layer instead of adding a new animation library or reintroducing legacy 3D components. Project cards opt into motion with a `data-interactive-card` attribute, GSAP handles scroll entrance plus subtle idle drift, pointer movement adds tilt, and reduced-motion users get static cards.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, GSAP ScrollTrigger, Playwright.

---

### Task 1: Test Motion Contract

**Files:**
- Modify: `tests/e2e/home.spec.ts`

- [ ] **Step 1: Add Playwright assertions**

Add tests that verify six project cards opt into interactive motion, GSAP marks them ready after hydration, hover/pointer movement produces a transform, and reduced motion does not enable interactive card motion.

- [ ] **Step 2: Run tests to verify failure**

Run: `PATH="$HOME/.nvm/versions/node/v20.19.6/bin:$PATH" CI=1 npm run test:e2e -- --project=chromium`

Expected: FAIL because `data-interactive-card` and `data-motion-ready` do not exist yet.

### Task 2: Implement Card Motion

**Files:**
- Modify: `src/components/projects/ProjectCard.tsx`
- Modify: `src/components/animation/ScrollAnimationProvider.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Mark project cards**

Add `data-interactive-card` to the active project-card `Card`.

- [ ] **Step 2: Extend GSAP provider**

Inside the existing non-reduced-motion GSAP context, find `[data-interactive-card]`, set 3D transform hints, add subtle idle yoyo drift, and attach pointer listeners using `gsap.quickTo()` for `rotateX`, `rotateY`, `x`, and `y`. Clean listeners and timelines in the existing effect cleanup.

- [ ] **Step 3: Add CSS support**

Add perspective and transform-style rules for interactive cards, with reduced-motion reset styles.

### Task 3: Clean Hidden Dev Surfaces

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `yarn.lock` if dependency command changes it
- Remove unused untracked legacy 3D assets if still unreferenced: `public/model`

- [ ] **Step 1: Confirm references**

Run `rg` to verify no active source imports `three`, `@react-three/*`, `framer-motion`, `react-type-animation`, FontAwesome packages, or `public/model`.

- [ ] **Step 2: Remove unused dependencies**

Use npm uninstall for unreferenced legacy packages so package files stay coherent.

- [ ] **Step 3: Remove generated verification artifacts**

Remove `.next` and `test-results` after verification runs. Do not edit or revert unrelated tracked `out/` changes without explicit user approval.

### Task 4: Verify End-to-End

**Files:**
- No direct source edits expected.

- [ ] **Step 1: Run full commands**

Run:

```bash
PATH="$HOME/.nvm/versions/node/v20.19.6/bin:$PATH" npm run lint
PATH="$HOME/.nvm/versions/node/v20.19.6/bin:$PATH" npm run build
rm -rf .next
PATH="$HOME/.nvm/versions/node/v20.19.6/bin:$PATH" CI=1 npm run test:e2e
```

- [ ] **Step 2: Browser sanity check**

Start the dev server on `127.0.0.1:3000`, load desktop and mobile through Playwright, check console warnings/errors, and verify the cards animate without overlap.

- [ ] **Step 3: Report residual worktree state**

Report exact verification evidence and any remaining tracked or untracked generated files, especially existing `out/` churn.

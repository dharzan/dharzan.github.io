# Portfolio Terminal Redesign — Design Spec

**Date:** 2026-05-31  
**Branch:** `portfolio-rebuild-v1`  
**Status:** Approved

---

## Overview

A full visual redesign of `dharzan.github.io` from the current CI control-room metaphor into a **phosphor-green terminal portfolio**. The experience boots as a real CLI terminal, then transitions into a scroll-driven portfolio where every section is rendered as terminal command output. Built with extensibility for a future command-dispatcher navigation upgrade.

---

## Design Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Personality | Hybrid terminal | Boots as CLI, scrolls as visual portfolio |
| Visual register | Terminal-coded throughout | Dark, monospace, command-output style end-to-end |
| Color palette | Phosphor green | Classic hacker aesthetic, maximum uniqueness |
| Navigation | Scroll-through sections (A) | Most accessible; architected to accept command-nav (B/C) upgrade with zero section refactor |
| Boot sequence | Skip-able full sequence | Full drama, respectful of impatient visitors |
| Section labels | Terminal-native | `cat about.md`, `ls -la projects/`, `git log --career`, `ping dharsan` |

---

## Color System

Replace the current amber/stone palette entirely.

| Token | Value | Use |
|---|---|---|
| `bg-phosphor-950` | `#020802` | Page background |
| `text-phosphor` | `#00c44a` | Body text, labels, borders |
| `text-phosphor-bright` | `#00ff5e` | Highlights, command prompts, headings |
| `text-phosphor-dim` | `#005a20` | Dimmed/secondary text, metadata |
| `border-phosphor` | `#0a2e0a` | All borders |
| `bg-phosphor-panel` | `#0a1a0a` | Panel backgrounds, navbar |

Add a `phosphor` color family to `tailwind.config.ts`:

```ts
phosphor: {
  950: '#020802',
  DEFAULT: '#00c44a',
  bright: '#00ff5e',
  dim: '#005a20',
  border: '#0a2e0a',
  panel: '#0a1a0a',
}
```

All amber/stone/neutral classes stripped from every component. No other accent colors.

---

## Typography

- All text: `font-mono` (JetBrains Mono via CSS variable or system monospace stack)
- No serif, no sans-serif anywhere
- Font stack: `'JetBrains Mono', 'Fira Code', 'Courier New', monospace`
- Add JetBrains Mono via `next/font/google` in `layout.tsx` (primary font; system monospace fallback if unavailable)

---

## Architecture

### Component Structure

```
src/components/
  terminal/
    BootScreen.tsx          ← Full-viewport skip-able boot sequence
    TerminalSection.tsx     ← Section wrapper: renders typed command header + children
    TerminalWindow.tsx      ← Optional chrome (dots + title bar) for hero/standalone panels
  layout/
    Navbar.tsx              ← Restyled: terminal prompt + command-link nav
    Footer.tsx              ← Minimal: just a prompt line
    Section.tsx             ← Replaced by TerminalSection for all sections
  home/
    Hero.tsx                ← cat profile.txt output
    About.tsx               ← cat about.md output
    Skills.tsx              ← skills --list --group output
    Projects.tsx            ← ls -la projects/ output
    Experience.tsx          ← git log --career output
    Contact.tsx             ← ping dharsan output
  ui/
    Button.tsx              ← Restyled: monospace terminal buttons
    Badge.tsx               ← Restyled: phosphor-green tags
    Card.tsx                ← Replaced by TerminalWindow chrome styling
  animation/
    ScrollAnimationProvider.tsx  ← Repurposed: terminal line-by-line scroll reveal
```

### `TerminalSection` Component

Each portfolio section wraps in `TerminalSection` which:
1. Renders the command header line (e.g. `dharsan@portfolio:~$ cat about.md`) with GSAP type-in animation on scroll entry
2. Renders a horizontal rule separator
3. Renders `children` with staggered line-by-line fade-in

```tsx
<TerminalSection
  id="about"
  command="cat about.md"
>
  {/* section content */}
</TerminalSection>
```

**Future-ready:** A `CommandRouter` can later accept typed commands, map them to section IDs, and call `document.getElementById(id).scrollIntoView()`. This requires zero changes to `TerminalSection` or any section component.

---

## Boot Screen (`BootScreen.tsx`)

- Mounts as a `fixed inset-0 z-50` overlay with `bg-phosphor-950`
- Types out boot lines progressively using `setTimeout` chains (no new deps — vanilla JS + CSS)
- Boot sequence content:
  ```
  DHARSAN/BIOS v2.5.2025 — system firmware
  CPU: backend-eng · SDET · event-systems
  
  [  OK  ] Loading kafka subsystem
  [  OK  ] Mounting /dev/graphql
  [  OK  ] Initializing CI/CD pipeline
  [  OK  ] Connecting to github.com
  [  OK  ] Verifying SDET coverage — 94%
  [  OK  ] Dharsan ready
  
  dharsan@portfolio:~$ █
  ```
- "Press any key or click anywhere to skip" shown after first line and throughout
- On skip or completion: GSAP `opacity: 0, scale: 0.98` fade-out over 400ms, then `display: none`
- `prefers-reduced-motion`: boot skipped entirely — portfolio renders directly
- Boot state stored in component state only; no localStorage (re-plays on every visit)

---

## Navbar

```
dharsan@portfolio:~$   [~/about.md]  [~/skills]  [~/projects/]  [~/git log]  [~/ping]
```

- Sticky top, `bg-phosphor-panel/92 backdrop-blur`
- Left: `dharsan@portfolio:~$` in `text-phosphor`
- Right: nav links styled as monospace command tags with `border-phosphor` border; hover highlights to `text-phosphor-bright`
- Mobile: hamburger collapses to stacked list of command links
- No logo, no wordmark — the prompt IS the identity

---

## Section Designs

### Hero — `cat profile.txt`

```
dharsan@portfolio:~$ cat profile.txt
─────────────────────────────────────────────
Name:     Dharsan Guruparan
Role:     SDET + Backend Engineer
Stack:    Kafka · GraphQL · CI/CD · AI SDLC
Status:   [ OPEN TO WORK ]
─────────────────────────────────────────────
I build backend, full-stack, and SDET systems with clear
architecture, deterministic automation, event-level validation,
and AI-assisted workflows that keep release risk visible.

$ inspect builds_    $ open resume_    $ ping dharsan_
```

- Key/value rows use `text-phosphor-dim` for keys, `text-phosphor` for values
- Status badge: `text-phosphor-bright` with border
- CTA buttons: monospace terminal-button style with `$` prefix
- No two-column layout — single column, wide and centered

### About — `cat about.md`

Markdown-style output:
- `# Operating Model` heading in `text-phosphor-bright`
- Body paragraphs in `text-phosphor-dim`
- List items prefixed with `→`

### Skills — `skills --list --group`

Grid of skill groups styled as directory modules:
- Group header: `backend/`, `events/`, `sdet/`, `cloud/`, `ai/`, `frontend/`
- Each group: bordered panel, skills as small inline tags
- Data from `src/data/skills.ts` unchanged

### Projects — `ls -la projects/`

```
dharsan@portfolio:~$ ls -la projects/
total 6   (click any project to open)

▶  tripstreamer/      Event-driven travel planning...        ★ featured
▶  pytest-kafka-contract/  Contract-testing for Kafka...     ★ featured
▶  devguard/          Dev tooling for safer workflows...     ★ featured
...
```

- Each project row: `▶ name/  description  badge`
- Clicking a row: navigates to `/projects/[slug]` (existing detail page)
- `data-testid="project-row"` on each row for Playwright
- Featured badge: `[★ featured]` in `text-phosphor-bright`

### Experience — `git log --career`

Each job rendered as a git commit block:
```
commit a3f8c2e  (HEAD → career/current)
Author: Dharsan Guruparan <dharsan@...>
Date:   Recent — Software Engineer, automation + backend

    Engineering experience across SDET strategy...
    · Designed SDET coverage around risk paths
    · Built quality gates for API, data, event regressions
```

- `commit` line in `text-phosphor`
- `Author/Date` in `text-phosphor-dim`
- Indented message + highlights in `text-phosphor-dim`
- Bullet prefix `·` instead of `-`

### Contact — `ping dharsan`

```
dharsan@portfolio:~$ ping dharsan

PING dharsan@guruparan.dev — 56 data bytes

[reply]  from email              time=<1ms  ttl=64
[reply]  from github.com/dharzan  time=<1ms  ttl=64
[reply]  from linkedin.com/in/... time=<1ms  ttl=64
[reply]  from resume.pdf          time=<1ms  ttl=64

→ email     → github     → linkedin     → resume
```

- `[reply]` in `text-phosphor-bright`
- Hostnames in `text-phosphor`
- Stats in `text-phosphor-dim`
- Link buttons: monospace terminal style

---

## Scroll Animation

Replace current GSAP reveal with terminal-output effect:

- **Section command header**: Types in character-by-character when section enters viewport
- **Content lines**: Fade in with 30ms stagger between lines, simulating terminal print
- `prefers-reduced-motion`: all animations disabled, content appears instantly
- Keep GSAP + ScrollTrigger (already installed) — no new animation libraries
- Remove `data-scroll-heading` / `data-scroll-reveal` data attributes; replace with `data-terminal-line` and `data-terminal-cmd`

---

## Project Detail Page

`/projects/[slug]` already exists. Restyle to match terminal theme:
- Black/phosphor background
- `TerminalWindow` chrome wrapper
- Fields displayed as key/value terminal output
- Back button as `← cd ..` command-style link

---

## Footer

Replace current footer with a single line:

```
dharsan@portfolio:~$ █   ·   Built with Next.js + GSAP   ·   © 2025
```

---

## Files to Modify

| File | Change |
|---|---|
| `tailwind.config.ts` | Add `phosphor` color family |
| `src/app/layout.tsx` | Add JetBrains Mono font, update `<body>` class to `bg-phosphor-950 text-phosphor font-mono` |
| `src/app/page.tsx` | Add `<BootScreen>`, update section order |
| `src/app/globals.css` | Strip amber CSS variables, add phosphor base styles |
| `src/lib/constants.ts` | Update `siteConfig.description` |
| `src/components/layout/Navbar.tsx` | Full restyle |
| `src/components/layout/Footer.tsx` | Simplify to prompt line |
| `src/components/layout/Section.tsx` | Delete — all sections use `TerminalSection` directly |
| `src/components/animation/ScrollAnimationProvider.tsx` | Terminal line-by-line reveal |
| `src/components/ui/Button.tsx` | Monospace terminal style |
| `src/components/ui/Badge.tsx` | Phosphor green tags |
| `src/components/ui/Card.tsx` | Remove (use TerminalWindow instead) |
| `src/components/home/Hero.tsx` | `cat profile.txt` |
| `src/components/home/About.tsx` | `cat about.md` |
| `src/components/home/Skills.tsx` | `skills --list --group` |
| `src/components/home/Projects.tsx` | `ls -la projects/` |
| `src/components/home/Experience.tsx` | `git log --career` |
| `src/components/home/Contact.tsx` | `ping dharsan` |
| `src/components/projects/ProjectCard.tsx` | Terminal row style |
| `src/components/projects/ProjectDetail.tsx` | Terminal window style |
| `tests/e2e/home.spec.ts` | Update selectors for new structure |

## Files to Create

| File | Purpose |
|---|---|
| `src/components/terminal/BootScreen.tsx` | Skip-able boot sequence overlay |
| `src/components/terminal/TerminalSection.tsx` | Section wrapper with typed command header |
| `src/components/terminal/TerminalWindow.tsx` | Optional panel chrome (dots + title bar) |

---

## Data Layer

**No changes to `src/data/*.ts`.** All content (projects, skills, experience, links) stays exactly as-is. Only display components change.

---

## Accessibility

- Boot skip: keyboard `any key` + visible click target (large transparent overlay)
- `prefers-reduced-motion`: boot skipped, typed animations instant, reveals instant
- Nav links: `aria-label` includes human-readable description alongside command notation
- Project rows: keyboard-navigable with `role="link"` or `<a>` wrapping
- All color contrast: phosphor green `#00c44a` on `#020802` = 7.2:1 (AAA)

---

## Testing

Update `tests/e2e/home.spec.ts`:
- Change project card selector to `[data-testid="project-row"]` (still expects `toHaveCount(6)`)
- Update section visibility checks to new section IDs
- Add boot screen test: boot overlay present on load, disappears after any key press
- Keep reduced-motion test

---

## Constraints (Hard — Do Not Violate)

- No new npm dependencies without explicit approval (GSAP already present; JetBrains Mono via `next/font/google` is free)
- No backend, no CMS, no auth, no contact form
- No Three.js, no Framer Motion, no heavy animation libraries
- Codebase stays on `portfolio-rebuild-v1` branch
- `yarn lint` and `yarn build` must pass

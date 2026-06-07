# Architecture

This portfolio is a static-first Next.js App Router site for software engineering, SDET / quality engineering, backend systems, and AI-assisted engineering workflow positioning. The active UI presents that work as a CI control room: dark technical panels, amber alert accents, build cards, quality gates, and deploy-readiness proof points.

## Structure

```txt
src/app
  layout.tsx
  page.tsx
  projects/[slug]/page.tsx
src/components
  home
  layout
  projects
  ui
src/data
  experience.ts
  links.ts
  projects.ts
  skills.ts
src/lib
  constants.ts
  seo.ts
```

## Data Flow

Homepage sections import static data from `src/data`. Project detail routes use `generateStaticParams` from `projects.ts`, then render `ProjectDetail`.

Status labels, build-card language, and quality-gate labels are static presentation content. The site does not fetch live CI, deploy, or monitoring state.

## Constraints

- No backend.
- No database.
- No CMS.
- No auth.
- No contact form.
- Keep content updates in TypeScript data files.
- Keep UI components small and reusable.
- Respect reduced-motion users: content must stay visible without GSAP inline hiding, and scroll snap must be disabled.
- Project-card motion is opt-in through `data-interactive-card`: scroll can introduce subtle depth, pointer movement can tilt cards, and links must remain stable/clickable.
- Avoid particles, cursor effects, full-page scroll locks, and active 3D showcase components.

## Testing

Use:

```bash
npm run lint
npm run build
npm run test:e2e
```

Playwright smoke tests live in `tests/e2e`.

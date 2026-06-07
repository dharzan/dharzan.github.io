# Dharsan Guruparan Portfolio

CI control-room portfolio for backend, full-stack, SDET / quality engineering, distributed systems testing, cloud, CI/CD, and AI-assisted engineering workflows.

## Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Static TypeScript data files
- Vercel static deployment
- Playwright smoke tests
- GSAP section choreography with reduced-motion bypass

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run lint
npm run build
```

## Tests

```bash
npm run test:e2e
```

Install Playwright browsers first if needed:

```bash
npx playwright install
```

## Project Structure

```txt
src/app                 App Router pages and metadata
src/components/home     Homepage sections
src/components/layout   Navbar, footer, section wrapper
src/components/projects Project cards and detail rendering
src/components/ui       Small reusable UI primitives
src/data                Projects, skills, experience, and links
src/lib                 Shared constants and SEO helpers
docs                    Architecture and ADR docs
tests/e2e               Playwright smoke tests
```

## Adding a Project

Edit `src/data/projects.ts` and add a `Project` object with:

- `slug`
- `title`
- `subtitle`
- `problem`
- `solution`
- `architecture`
- `testingStrategy`
- `cicd`
- `learned`
- `future`
- `impact`
- `stack`
- `category`
- `featured`
- `githubUrl`
- `liveUrl` when available

The homepage and `/projects/[slug]` detail page update from the same data.

## Deployment

Production target is the Vercel project `dharzan-github-io`.

Expected production branch: `new_new_bitmoji`.

## Constraints

No backend, database, CMS, auth, contact form, fake skill percentages, runtime CI status fetching, particles, cursor effects, full-page scroll locks, or active 3D showcase components in V1.

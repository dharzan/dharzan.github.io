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
Increment by 1 for each new featured project added. This assertion appears twice in the file — update both occurrences.

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

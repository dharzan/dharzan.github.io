export type ProjectCategory = "backend" | "frontend" | "fullstack" | "ai" | "testing" | "devtools";

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  problem: string;
  solution: string;
  architecture: string;
  testingStrategy: string;
  cicd: string;
  learned: string;
  future: string[];
  impact: string[];
  stack: string[];
  category: ProjectCategory;
  featured: boolean;
  githubUrl?: string;
  liveUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "tripstreamer",
    title: "TripStreamer",
    subtitle: "Event-driven travel planning built around streaming trip updates.",
    problem: "Travel workflows scatter state across bookings, reminders, and status changes, making it hard to reason about the current trip timeline.",
    solution: "Built a full-stack product concept that models trip activity as structured events and renders a clear traveler-facing workflow.",
    architecture: "Static-first Next.js UI with a backend-ready event model for itinerary state, notifications, and stream processing boundaries.",
    testingStrategy: "Focused smoke coverage for core routes, project rendering, and detail-page navigation, with room for contract tests as the backend matures.",
    cicd: "Designed for Vercel preview deployments and GitHub Actions build checks.",
    learned: "Keeping travel state event-shaped makes later Kafka, SQS, or notification work easier to add without rewriting the UI.",
    future: ["Add real stream ingestion.", "Model notification fanout.", "Add persistence once user workflows prove the need."],
    impact: ["Shows product thinking around event-driven architecture.", "Demonstrates full-stack planning without overbuilding V1."],
    stack: ["Next.js", "TypeScript", "React", "Kafka-ready design", "Tailwind"],
    category: "fullstack",
    featured: true,
    githubUrl: "https://github.com/dharzan/trip-streamer",
  },
  {
    slug: "pytest-kafka-contract",
    title: "pytest-kafka-contract",
    subtitle: "Contract-testing harness for Kafka event payloads.",
    problem: "Distributed systems often fail when producers and consumers drift on event shape, required fields, or business invariants.",
    solution: "Created a Pytest-oriented contract-testing approach for validating Kafka event payloads before downstream services depend on them.",
    architecture: "Python test package with fixtures for event loading, schema validation, and readable failure output for CI runs.",
    testingStrategy: "Contract cases validate required fields, payload types, and domain invariants using representative event samples.",
    cicd: "Fits into GitHub Actions or scheduled CI jobs so event regressions are caught before release.",
    learned: "Event tests are most useful when failure messages point directly to the broken contract, not just a schema mismatch.",
    future: ["Add fixture generators.", "Support Avro or JSON Schema adapters.", "Publish reusable examples."],
    impact: ["Frames QA work as distributed systems reliability.", "Turns Kafka validation into repeatable engineering infrastructure."],
    stack: ["Python", "Pytest", "Kafka", "Contract Testing", "CI/CD"],
    category: "testing",
    featured: true,
    githubUrl: "https://github.com/dharzan/pytest-kafka-contract",
  },
  {
    slug: "devguard",
    title: "DevGuard CLI / VS Code Extension",
    subtitle: "Developer tooling for safer local engineering workflows.",
    problem: "Local development can miss repository rules, risky edits, and context that should be visible before code reaches review.",
    solution: "Built a devtool concept that surfaces project guardrails through a CLI and editor workflow.",
    architecture: "CLI-first architecture with editor integration boundaries, static rule configuration, and actionable local feedback.",
    testingStrategy: "Command-level tests validate rule parsing, output shape, and failure behavior before editor integration.",
    cicd: "Designed for package build checks and release validation through GitHub Actions.",
    learned: "A useful devtool should explain the next action clearly and avoid becoming another noisy linter.",
    future: ["Add repository-specific rule packs.", "Improve VS Code diagnostics.", "Add autofix only for safe mechanical changes."],
    impact: ["Shows devtools thinking.", "Connects AI-assisted engineering with explicit repository rules."],
    stack: ["TypeScript", "Node.js", "VS Code", "CLI", "Static analysis"],
    category: "devtools",
    featured: true,
    githubUrl: "https://github.com/dharzan/devguard-cli",
  },
  {
    slug: "readyping-foodtrucktime",
    title: "ReadyPing / FoodTruckTime",
    subtitle: "Practical notification and availability workflows for local operations.",
    problem: "Small operational workflows need fast status updates without heavy back-office software.",
    solution: "Designed lightweight product flows for status visibility, reminders, and simple customer-facing updates.",
    architecture: "Full-stack-ready app structure with clean UI state, notification boundaries, and cloud deployment paths.",
    testingStrategy: "Smoke tests cover core user journeys first, then API and notification tests can be added around real integrations.",
    cicd: "Vercel previews and build checks keep UI changes reviewable before production.",
    learned: "Operational software wins when the workflow is obvious and the system avoids unnecessary admin complexity.",
    future: ["Add real notification provider.", "Add owner dashboard only after workflow validation.", "Track delivery reliability."],
    impact: ["Shows product sense for practical business workflows.", "Demonstrates restrained architecture for early-stage apps."],
    stack: ["React", "Next.js", "AWS", "SQS", "TypeScript", "Tailwind"],
    category: "fullstack",
    featured: true,
    githubUrl: "https://github.com/dharzan/foodtruck",
  },
  {
    slug: "scrollwise",
    title: "ScrollWise",
    subtitle: "Mobile-first reading and content workflow exploration.",
    problem: "Content-heavy mobile experiences can become hard to navigate when structure, progress, and context are unclear.",
    solution: "Built a mobile-oriented app concept focused on clearer content flow and better reading interactions.",
    architecture: "React Native application structure with componentized screens and reusable interaction patterns.",
    testingStrategy: "Component and journey smoke coverage can validate primary reading flows across mobile breakpoints.",
    cicd: "Designed for repeatable app checks before release builds.",
    learned: "Mobile UI needs tighter information hierarchy than desktop because every extra control competes with the main task.",
    future: ["Add saved reading state.", "Improve offline behavior.", "Add analytics only after core flows stabilize."],
    impact: ["Shows React Native experience.", "Demonstrates attention to mobile interaction design."],
    stack: ["React Native", "TypeScript", "Mobile UI", "Automation"],
    category: "frontend",
    featured: true,
    githubUrl: "https://github.com/dharzan/scrollwise",
  },
  {
    slug: "portfolio-rebuild-ai-workflow",
    title: "Portfolio Rebuild / AI Engineering Workflow",
    subtitle: "Agent-friendly portfolio architecture with static data and clear docs.",
    problem: "The previous portfolio was visually clean but did not explain engineering identity, project depth, or how AI should safely edit the repo.",
    solution: "Rebuilt the site around static data, reusable sections, project detail pages, and concise AI handoff documentation.",
    architecture: "Next.js App Router with TypeScript data files, reusable UI components, static export, and documentation-driven constraints.",
    testingStrategy: "Playwright smoke tests verify the homepage story, nav links, project cards, detail routes, and contact links.",
    cicd: "Vercel handles preview and production deploys; local `npm run lint` and `npm run build` gate changes.",
    learned: "AI works better when architecture, constraints, and source-of-truth data are explicit in the repository.",
    future: ["Add a real resume PDF.", "Add Open Graph image.", "Prune unused legacy assets after deployment is verified."],
    impact: ["Creates a stronger engineer-first hiring signal.", "Makes future AI edits safer and easier to review."],
    stack: ["Next.js", "TypeScript", "Tailwind", "Playwright", "Vercel"],
    category: "ai",
    featured: true,
    githubUrl: "https://github.com/dharzan/dharzan.github.io",
  },
];

export function getFeaturedProjects() {
  return projects.filter((project) => project.featured);
}

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

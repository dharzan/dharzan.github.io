export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  summary: string;
  highlights: string[];
  stack?: string[];
};

export const experience: ExperienceItem[] = [
  {
    company: "Enterprise engineering teams",
    role: "Software Engineer, automation and backend validation",
    period: "Recent work",
    summary:
      "Engineering experience across SDET strategy, backend validation, automation infrastructure, distributed event testing, and full-stack product development.",
    highlights: [
      "Designed SDET coverage around risk paths, service contracts, and release confidence.",
      "Built quality gates that made API, data, and event regressions visible before release.",
      "Built backend automation suites for API, GraphQL, SQL, and event-driven workflows.",
      "Added CI/CD daily runs with Slack alerts for fast failure visibility.",
      "Expanded Kafka CDC automation coverage with data-level validation.",
      "Migrated API checks from Postman/Newman toward Cypress-based automation.",
      "Validated GraphQL responses with SQL cross-checks against source systems.",
      "Built React Native and AWS-backed product features across full-stack workflows.",
    ],
    stack: ["SDET", "Cypress", "Playwright", "Kafka", "GraphQL", "SQL", "AWS", "React Native"],
  },
];

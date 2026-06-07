export type SkillGroup = {
  title: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    skills: ["TypeScript", "JavaScript", "Python", "Java", "C#", "Rust", "Go", "SQL"],
  },
  {
    title: "Frontend",
    skills: ["React", "Next.js", "Tailwind", "React Native"],
  },
  {
    title: "Backend / Systems",
    skills: ["Node.js", "REST", "GraphQL", "Kafka", "SQS", "AMQ", "PostgreSQL", "Oracle", "DynamoDB"],
  },
  {
    title: "Cloud / DevOps",
    skills: ["AWS Lambda", "API Gateway", "S3", "CloudWatch", "GitHub Actions", "Docker", "Vercel"],
  },
  {
    title: "Testing / Automation",
    skills: ["Cypress", "Playwright", "Jest", "Pytest", "Contract Testing", "CI/CD automation", "Kafka event validation"],
  },
  {
    title: "Quality Gate Engineering",
    skills: [
      "Shift-left testing strategy",
      "Test architecture",
      "API automation",
      "GraphQL validation",
      "SQL cross-checks",
      "CDC event testing",
      "Quality gates",
      "Flake triage",
      "Failure observability",
    ],
  },
  {
    title: "AI Engineering",
    skills: ["AI-assisted SDLC", "Prompt harnesses", "AI repo context systems", "Agent-ready documentation", "Automated test generation workflows"],
  },
];

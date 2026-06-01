import Link from "next/link";
import TerminalWindow from "@/components/terminal/TerminalWindow";
import type { Project } from "@/data/projects";

const detailSections = [
  { key: "problem", label: "Problem" },
  { key: "solution", label: "Solution" },
  { key: "architecture", label: "Architecture" },
  { key: "testingStrategy", label: "Testing Strategy" },
  { key: "cicd", label: "CI/CD" },
  { key: "learned", label: "What I Learned" },
] as const;

function pseudoHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(16).slice(0, 7).padStart(7, "0");
}

export default function ProjectDetail({ project }: { project: Project }) {
  return (
    <main className="bg-phosphor-950 px-5 py-12 sm:px-8 lg:py-16">
      <article className="mx-auto max-w-4xl">
        <Link
          href="/#projects"
          className="font-mono text-xs text-phosphor-dim transition hover:text-phosphor"
        >
          ← cd ..
        </Link>
        <TerminalWindow
          title={`cat projects/${project.slug}/readme.md`}
          className="mt-8"
        >
          <div className="p-6">
            <div className="mb-6">
              <p className="font-mono text-xs text-phosphor-dim">
                commit {pseudoHash(project.slug)} &nbsp;·&nbsp;{" "}
                {project.category}
              </p>
              <h1 className="mt-3 font-mono text-3xl font-semibold text-phosphor-bright sm:text-4xl">
                {project.slug}/
              </h1>
              <p className="mt-1 font-mono text-lg text-phosphor">
                {project.title}
              </p>
              <p className="mt-3 font-mono text-sm leading-7 text-phosphor-dim">
                {project.subtitle}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded border border-phosphor-border px-2 py-0.5 font-mono text-xs text-phosphor-dim"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-6 border-t border-phosphor-border pt-6">
              {detailSections.map(({ key, label }) => (
                <div key={key}>
                  <p className="font-mono text-xs text-phosphor-bright">
                    ## {label}
                  </p>
                  <p className="mt-2 font-mono text-sm leading-7 text-phosphor-dim">
                    {project[key]}
                  </p>
                </div>
              ))}

              <div>
                <p className="font-mono text-xs text-phosphor-bright">
                  ## Future
                </p>
                <ul className="mt-2 space-y-1">
                  {project.future.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2 font-mono text-sm text-phosphor-dim"
                    >
                      <span className="text-phosphor-border">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-mono text-xs text-phosphor-bright">
                  ## Impact
                </p>
                <ul className="mt-2 space-y-1">
                  {project.impact.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2 font-mono text-sm text-phosphor-dim"
                    >
                      <span className="text-phosphor-border">·</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {project.githubUrl || project.liveUrl ? (
                <div>
                  <p className="font-mono text-xs text-phosphor-bright">
                    ## Links
                  </p>
                  <div className="mt-2 flex gap-4 font-mono text-sm">
                    {project.githubUrl ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-phosphor transition hover:text-phosphor-bright"
                      >
                        → github
                      </a>
                    ) : null}
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-phosphor transition hover:text-phosphor-bright"
                      >
                        → live
                      </a>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </TerminalWindow>
      </article>
    </main>
  );
}

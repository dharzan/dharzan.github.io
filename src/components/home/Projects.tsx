import Link from "next/link";
import TerminalSection from "@/components/terminal/TerminalSection";
import { getFeaturedProjects } from "@/data/projects";

export default function Projects() {
  const projects = getFeaturedProjects();

  return (
    <TerminalSection id="projects" command="ls -la projects/">
      <div className="overflow-hidden rounded border border-phosphor-border">
        <div className="border-b border-phosphor-border px-4 py-3 font-mono text-[11px] leading-5 text-phosphor-dim sm:px-5 sm:text-xs">
          total {projects.length} &nbsp;·&nbsp; click any project to open
        </div>
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            data-terminal-line
            data-testid="project-row"
            aria-label={`Open ${project.title}`}
            className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-2 border-b border-phosphor-border px-4 py-4 font-mono transition last:border-0 hover:bg-phosphor-panel sm:grid-cols-[auto_13rem_minmax(0,1fr)_auto] sm:items-center sm:gap-4 sm:px-5 sm:py-3.5"
          >
            <span className="pt-0.5 text-xs text-phosphor-dim sm:pt-0">▶</span>
            <span className="min-w-0 break-all text-sm leading-6 text-phosphor-bright sm:truncate sm:leading-normal">
              {project.slug}/
            </span>
            <span className="col-start-2 min-w-0 text-xs leading-5 text-phosphor-dim sm:col-auto sm:truncate sm:leading-normal">
              {project.subtitle}
            </span>
            {project.featured ? (
              <span className="col-start-2 w-fit rounded border border-phosphor-dim px-2 py-0.5 text-xs text-phosphor sm:col-auto">
                ★ featured
              </span>
            ) : null}
          </Link>
        ))}
      </div>
    </TerminalSection>
  );
}

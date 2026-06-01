import Link from "next/link";
import TerminalSection from "@/components/terminal/TerminalSection";
import { getFeaturedProjects } from "@/data/projects";

export default function Projects() {
  const projects = getFeaturedProjects();

  return (
    <TerminalSection id="projects" command="ls -la projects/">
      <div className="overflow-hidden rounded border border-phosphor-border">
        <div className="border-b border-phosphor-border px-5 py-3 font-mono text-xs text-phosphor-dim">
          total {projects.length} &nbsp;·&nbsp; click any project to open
        </div>
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            data-terminal-line
            data-testid="project-row"
            aria-label={`Open ${project.title}`}
            className="flex items-center gap-4 border-b border-phosphor-border px-5 py-3.5 font-mono transition last:border-0 hover:bg-phosphor-panel"
          >
            <span className="shrink-0 text-xs text-phosphor-dim">▶</span>
            <span className="w-52 shrink-0 truncate text-sm text-phosphor-bright">
              {project.slug}/
            </span>
            <span className="min-w-0 flex-1 truncate text-xs text-phosphor-dim">
              {project.subtitle}
            </span>
            {project.featured ? (
              <span className="shrink-0 rounded border border-phosphor-dim px-2 py-0.5 text-xs text-phosphor">
                ★ featured
              </span>
            ) : null}
          </Link>
        ))}
      </div>
    </TerminalSection>
  );
}

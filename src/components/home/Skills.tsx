import TerminalSection from "@/components/terminal/TerminalSection";
import { skillGroups } from "@/data/skills";

function toSlug(title: string): string {
  return title.toLowerCase().replace(/\s*\/\s*/g, "-").replace(/\s+/g, "-");
}

export default function Skills() {
  return (
    <TerminalSection id="skills" command="skills --list --group">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => (
          <div
            key={group.title}
            data-terminal-line
            className="rounded border border-phosphor-border p-5"
          >
            <h3
              className="font-mono text-xs text-phosphor-bright"
              aria-label={group.title}
            >
              {toSlug(group.title)}/
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded border border-phosphor-border px-2 py-0.5 font-mono text-xs text-phosphor-dim"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </TerminalSection>
  );
}

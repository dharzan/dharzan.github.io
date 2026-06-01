import TerminalSection from "@/components/terminal/TerminalSection";
import { experience } from "@/data/experience";

function pseudoHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(16).slice(0, 7).padStart(7, "0");
}

export default function Experience() {
  return (
    <TerminalSection id="experience" command="git log --career --oneline=false">
      <div className="space-y-10">
        {experience.map((item, index) => (
          <div
            key={`${item.company}-${item.role}`}
            data-terminal-line
            className="font-mono"
          >
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="text-sm text-phosphor">
                commit {pseudoHash(item.company + item.role)}
              </span>
              {index === 0 ? (
                <span className="rounded border border-phosphor-dim px-1.5 py-0.5 text-xs text-phosphor-dim">
                  HEAD → career/current
                </span>
              ) : null}
            </div>
            <p className="mt-0.5 text-xs text-phosphor-dim">
              Author: Dharsan Guruparan &lt;dharsan@guruparan.dev&gt;
            </p>
            <p className="text-xs text-phosphor-dim">
              Date: &nbsp; {item.period} · {item.role} @ {item.company}
            </p>
            <p className="mt-3 pl-6 text-sm leading-7 text-phosphor-dim">
              {item.summary}
            </p>
            <ul className="mt-2 pl-6 space-y-0.5">
              {item.highlights.map((h) => (
                <li key={h} className="text-xs leading-7 text-phosphor-dim">
                  <span className="text-phosphor-border">· </span>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </TerminalSection>
  );
}

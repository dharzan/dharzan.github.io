import TerminalSection from "@/components/terminal/TerminalSection";

const points = [
  "Trace system behavior before changing it, then document the path so the next engineer can reason quickly.",
  "Turn release risk into explicit checks: API contracts, data validation, event payloads, and CI feedback.",
  "Use AI to accelerate implementation while keeping architecture, tests, and review signals human-readable.",
];

export default function About() {
  return (
    <TerminalSection id="about" command="cat about.md">
      <div className="max-w-3xl space-y-6">
        <div data-terminal-line>
          <p className="font-mono text-sm text-phosphor-bright">
            # Operating Model
          </p>
          <p className="mt-2 font-mono text-sm leading-7 text-phosphor-dim">
            A technical-lab portfolio for backend validation, automation
            infrastructure, full-stack product work, and AI-assisted
            development.
          </p>
        </div>
        <div data-terminal-line>
          <p className="font-mono text-sm text-phosphor-bright">## Principles</p>
          <ul className="mt-3 space-y-2">
            {points.map((point) => (
              <li
                key={point}
                className="flex gap-3 font-mono text-sm text-phosphor-dim"
              >
                <span className="shrink-0 text-phosphor-border">→</span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </TerminalSection>
  );
}

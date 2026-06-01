import type { ReactNode } from "react";

type TerminalSectionProps = {
  id: string;
  command: string;
  children: ReactNode;
  className?: string;
};

export default function TerminalSection({
  id,
  command,
  children,
  className = "",
}: TerminalSectionProps) {
  return (
    <section
      id={id}
      data-terminal-section
      className={`border-t border-phosphor-border px-5 py-16 sm:px-8 lg:py-24 ${className}`}
    >
      <div className="mx-auto max-w-6xl">
        <div data-terminal-cmd className="mb-10">
          <p
            className="font-mono text-sm"
            aria-label={`Section: ${command}`}
          >
            <span className="text-phosphor-dim">dharsan@portfolio:~$ </span>
            <span className="text-phosphor-bright">{command}</span>
          </p>
          <div className="mt-3 h-px bg-phosphor-border" role="separator" />
        </div>
        {children}
      </div>
    </section>
  );
}

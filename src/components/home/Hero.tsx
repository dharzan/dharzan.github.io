import Button from "@/components/ui/Button";
import { links } from "@/data/links";

export default function Hero() {
  return (
    <section
      id="home"
      data-terminal-section
      className="px-5 py-16 sm:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div data-terminal-cmd className="mb-8">
          <p className="font-mono text-sm">
            <span className="text-phosphor-dim">dharsan@portfolio:~$ </span>
            <span className="text-phosphor-bright">cat profile.txt</span>
          </p>
          <div className="mt-3 h-px bg-phosphor-border" role="separator" />
        </div>

        <div className="space-y-2">
          <h1 data-terminal-line className="flex flex-wrap gap-4 font-mono">
            <span className="w-20 shrink-0 text-sm text-phosphor-dim">
              Name:
            </span>
            <span className="text-xl font-semibold text-phosphor-bright sm:text-2xl">
              Dharsan Guruparan
            </span>
          </h1>

          <div data-terminal-line className="flex flex-wrap gap-4 font-mono text-sm">
            <span className="w-20 shrink-0 text-phosphor-dim">Role:</span>
            <span className="text-phosphor">SDET + Backend Engineer</span>
          </div>

          <div data-terminal-line className="flex flex-wrap gap-4 font-mono text-sm">
            <span className="w-20 shrink-0 text-phosphor-dim">Stack:</span>
            <span className="text-phosphor">Kafka · GraphQL · CI/CD · AI SDLC</span>
          </div>

          <div data-terminal-line className="flex flex-wrap items-center gap-4 font-mono text-sm">
            <span className="w-20 shrink-0 text-phosphor-dim">Status:</span>
            <span className="rounded border border-phosphor px-2 py-0.5 font-mono text-xs text-phosphor-bright">
              OPEN TO WORK
            </span>
          </div>
        </div>

        <div
          data-terminal-line
          className="mt-6 h-px bg-phosphor-border"
          role="separator"
        />

        <p
          data-terminal-line
          className="mt-6 max-w-2xl font-mono text-sm leading-7 text-phosphor-dim"
        >
          I build backend, full-stack, and SDET systems with clear architecture,
          deterministic automation, event-level validation, and AI-assisted
          workflows that keep release risk visible.
        </p>

        <div data-terminal-line className="mt-8 flex flex-wrap gap-3">
          <Button href="#projects">$ inspect builds</Button>
          <Button href={links.resume} variant="secondary">
            $ open resume
          </Button>
          <Button href="#contact" variant="ghost">
            $ ping dharsan
          </Button>
        </div>
      </div>
    </section>
  );
}

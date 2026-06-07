import Button from "@/components/ui/Button";
import TerminalSection from "@/components/terminal/TerminalSection";
import { links } from "@/data/links";

const replies = [
  { host: "email", href: links.email, label: "→ email" },
  { host: "github.com/dharzan", href: links.github, label: "→ github" },
  {
    host: "linkedin.com/in/dharsan-guruparan",
    href: links.linkedIn,
    label: "→ linkedin",
  },
  { host: "resume.pdf", href: links.resume, label: "→ resume" },
];

export default function Contact() {
  return (
    <TerminalSection id="contact" command="ping dharsan">
      <div className="max-w-2xl space-y-4 font-mono">
        <p data-terminal-line className="text-xs text-phosphor-dim">
          PING dharsan@guruparan.dev — 56 data bytes
        </p>
        <div className="space-y-2">
          {replies.map((reply) => (
            <div
              key={reply.host}
              data-terminal-line
              className="flex flex-wrap items-center gap-3 text-xs"
            >
              <span className="text-phosphor-bright">[reply]</span>
              <span className="text-phosphor">from {reply.host}</span>
              <span className="text-phosphor-dim">time=&lt;1ms ttl=64</span>
            </div>
          ))}
        </div>
        <div data-terminal-line className="flex flex-wrap gap-3 pt-2">
          {replies.map((reply) => (
            <Button key={reply.host} href={reply.href} variant="secondary">
              {reply.label}
            </Button>
          ))}
        </div>
      </div>
    </TerminalSection>
  );
}

import { links } from "@/data/links";

export default function Footer() {
  return (
    <footer className="border-t border-phosphor-border px-5 py-8 sm:px-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <p className="font-mono text-xs text-phosphor-dim">
          dharsan@portfolio:~${" "}
          <span className="inline-block h-3 w-1.5 bg-phosphor-dim align-middle" />
        </p>
        <div className="flex gap-5 font-mono text-xs text-phosphor-dim">
          <a
            className="transition hover:text-phosphor"
            href={links.github}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            className="transition hover:text-phosphor"
            href={links.linkedIn}
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a className="transition hover:text-phosphor" href={links.email}>
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}

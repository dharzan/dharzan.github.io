"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { href: "/#about", label: "~/about.md" },
  { href: "/#skills", label: "~/skills" },
  { href: "/#projects", label: "~/projects/" },
  { href: "/#experience", label: "~/git log" },
  { href: "/#contact", label: "~/ping" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-phosphor-border bg-phosphor-panel/95 backdrop-blur">
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8"
        aria-label="Primary navigation"
      >
        <Link
          href="/#home"
          className="font-mono text-sm text-phosphor-bright"
          aria-label="Home"
        >
          dharsan@portfolio:~$
        </Link>
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded border border-transparent px-3 py-1.5 font-mono text-xs text-phosphor-dim transition hover:border-phosphor-border hover:text-phosphor"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded border border-phosphor-border font-mono text-phosphor md:hidden"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">
            {open ? "Close navigation menu" : "Open navigation menu"}
          </span>
          <span className="flex flex-col gap-1.5" aria-hidden="true">
            <span
              className={`h-0.5 w-5 bg-current transition ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`h-0.5 w-5 bg-current transition ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`h-0.5 w-5 bg-current transition ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </span>
        </button>
      </nav>
      {open ? (
        <div className="border-t border-phosphor-border px-5 py-3 md:hidden">
          <div className="mx-auto grid max-w-6xl gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded px-3 py-2.5 font-mono text-sm text-phosphor-dim hover:text-phosphor"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}

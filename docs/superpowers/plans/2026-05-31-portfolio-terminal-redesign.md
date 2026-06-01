# Terminal Portfolio Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign `dharzan.github.io` as a phosphor-green terminal portfolio — skip-able boot sequence, then scroll-driven sections rendered as terminal command output.

**Architecture:** New `src/components/terminal/` layer (BootScreen, BootWrapper, TerminalSection, TerminalWindow) provides the terminal chrome. All home sections (`Hero`, `About`, `Skills`, `Projects`, `Experience`, `Contact`) are rewritten to use these primitives. Data layer (`src/data/*.ts`) is unchanged. GSAP ScrollTrigger is repurposed for terminal line-by-line scroll reveals.

**Tech Stack:** Next.js 16 App Router, React 18, TypeScript, Tailwind CSS 3, GSAP 3, next/font/google (JetBrains Mono), Playwright.

---

## File Map

**Create:**
- `src/components/terminal/BootScreen.tsx` — full-viewport skip-able boot overlay
- `src/components/terminal/BootWrapper.tsx` — thin client wrapper so `page.tsx` stays a server component
- `src/components/terminal/TerminalSection.tsx` — section wrapper: `data-terminal-section`, typed command header, separator
- `src/components/terminal/TerminalWindow.tsx` — panel chrome (traffic-light dots + title bar)

**Modify:**
- `tailwind.config.js` — add `phosphor` color family + `mono` fontFamily
- `src/app/globals.css` — strip amber CSS vars, add phosphor base, keep scroll rules
- `src/app/layout.tsx` — add JetBrains Mono via `next/font`, update `<body>` classes
- `src/app/page.tsx` — add `BootWrapper`, remove `scroll-snap-container` class
- `src/lib/constants.ts` — update `siteConfig.description`
- `src/components/layout/Navbar.tsx` — terminal prompt + command-style links
- `src/components/layout/Footer.tsx` — single prompt-line footer
- `src/components/animation/ScrollAnimationProvider.tsx` — terminal line-by-line reveal with `data-terminal-cmd` / `data-terminal-line`
- `src/components/ui/Button.tsx` — monospace terminal button variants
- `src/components/ui/Badge.tsx` — phosphor tag style
- `src/components/home/Hero.tsx` — `cat profile.txt` key/value output with `<h1>`
- `src/components/home/About.tsx` — `cat about.md` markdown-output style
- `src/components/home/Skills.tsx` — `skills --list --group` grid
- `src/components/home/Projects.tsx` — `ls -la projects/` directory listing
- `src/components/home/Experience.tsx` — `git log --career` commit blocks
- `src/components/home/Contact.tsx` — `ping dharsan` reply format
- `src/components/projects/ProjectDetail.tsx` — terminal window chrome
- `tests/e2e/home.spec.ts` — update all selectors for new structure

**Delete:**
- `src/components/layout/Section.tsx` — replaced by `TerminalSection`
- `src/components/ui/Card.tsx` — replaced by `TerminalWindow`
- `src/components/projects/ProjectCard.tsx` — replaced by inline rows in `Projects.tsx`
- `src/components/projects/ProjectTag.tsx` — only used by deleted `ProjectCard`

---

### Task 1: Color System — Tailwind + CSS

**Files:**
- Modify: `tailwind.config.js`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Add phosphor colors and font to tailwind config**

Replace the entire contents of `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        phosphor: {
          950: "#020802",
          DEFAULT: "#00c44a",
          bright: "#00ff5e",
          dim: "#005a20",
          border: "#0a2e0a",
          panel: "#0a1a0a",
        },
      },
      fontFamily: {
        mono: ["var(--font-mono)", "JetBrains Mono", "Fira Code", "Courier New", "monospace"],
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 2: Replace globals.css with phosphor base styles**

Replace the entire contents of `src/app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color-scheme: dark;
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: 80px;
}

body {
  min-height: 100vh;
  background: #020802;
}

[data-terminal-section] {
  scroll-margin-top: 80px;
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
```

- [ ] **Step 3: Verify build still compiles**

```bash
yarn build 2>&1 | tail -20
```

Expected: build completes (will have missing class warnings from old amber classes until later tasks, but no TypeScript errors).

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.js src/app/globals.css
git commit -m "feat: add phosphor color system and JetBrains Mono font family"
```

---

### Task 2: Font + Layout Base

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/lib/constants.ts`

- [ ] **Step 1: Add JetBrains Mono and update layout**

Replace the entire contents of `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dharzan-github-io.vercel.app"),
  title: {
    default: "Dharsan Guruparan | Software Engineer",
    template: "%s | Dharsan Guruparan",
  },
  description:
    "Terminal portfolio for backend, SDET, and AI-assisted engineering — built to show work, not impress bots.",
  openGraph: {
    title: "Dharsan Guruparan | Software Engineer",
    description:
      "Terminal portfolio for backend, SDET, and AI-assisted engineering.",
    type: "website",
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body className="min-h-screen bg-phosphor-950 font-mono text-phosphor antialiased">
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Update siteConfig description**

Replace the entire contents of `src/lib/constants.ts`:

```ts
export const siteConfig = {
  name: "Dharsan Guruparan",
  role: "Software Engineer",
  description:
    "Terminal portfolio for backend, SDET, and AI-assisted engineering.",
};
```

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx src/lib/constants.ts
git commit -m "feat: add JetBrains Mono font and update layout base classes"
```

---

### Task 3: TerminalWindow Component

**Files:**
- Create: `src/components/terminal/TerminalWindow.tsx`

- [ ] **Step 1: Create TerminalWindow**

```tsx
import type { HTMLAttributes, ReactNode } from "react";

type TerminalWindowProps = HTMLAttributes<HTMLDivElement> & {
  title?: string;
  children: ReactNode;
};

export default function TerminalWindow({
  title,
  children,
  className = "",
  ...props
}: TerminalWindowProps) {
  return (
    <div
      className={`overflow-hidden rounded border border-phosphor-border bg-phosphor-panel ${className}`}
      {...props}
    >
      <div className="flex items-center gap-2 border-b border-phosphor-border px-4 py-3">
        <span className="h-2 w-2 rounded-full bg-phosphor-border" />
        <span className="h-2 w-2 rounded-full bg-phosphor-border" />
        <span className="h-2 w-2 rounded-full bg-phosphor-border" />
        {title ? (
          <span className="ml-2 font-mono text-xs text-phosphor-dim">{title}</span>
        ) : null}
      </div>
      <div>{children}</div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/terminal/TerminalWindow.tsx
git commit -m "feat: add TerminalWindow chrome component"
```

---

### Task 4: TerminalSection Component

**Files:**
- Create: `src/components/terminal/TerminalSection.tsx`

- [ ] **Step 1: Create TerminalSection**

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/terminal/TerminalSection.tsx
git commit -m "feat: add TerminalSection wrapper with typed command header"
```

---

### Task 5: BootScreen + BootWrapper Components

**Files:**
- Create: `src/components/terminal/BootScreen.tsx`
- Create: `src/components/terminal/BootWrapper.tsx`

- [ ] **Step 1: Create BootScreen**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type BootLine = {
  text: string;
  delay: number;
  dim?: boolean;
  isOk?: boolean;
  isCursor?: boolean;
};

const BOOT_LINES: BootLine[] = [
  { text: "DHARSAN/BIOS v2.5.2025 — system firmware", delay: 0, dim: true },
  { text: "CPU: backend-eng · SDET · event-systems", delay: 150, dim: true },
  { text: "", delay: 300 },
  { text: "[  OK  ] Loading kafka subsystem", delay: 450, isOk: true },
  { text: "[  OK  ] Mounting /dev/graphql", delay: 620, isOk: true },
  { text: "[  OK  ] Initializing CI/CD pipeline", delay: 790, isOk: true },
  { text: "[  OK  ] Connecting to github.com", delay: 960, isOk: true },
  { text: "[  OK  ] Verifying SDET coverage — 94%", delay: 1130, isOk: true },
  { text: "[  OK  ] Dharsan ready", delay: 1300, isOk: true },
  { text: "", delay: 1450 },
  { text: "dharsan@portfolio:~$", delay: 1550, isCursor: true },
];

type BootScreenProps = {
  onComplete: () => void;
};

export default function BootScreen({ onComplete }: BootScreenProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef(false);

  function dismiss() {
    if (doneRef.current) return;
    doneRef.current = true;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !overlayRef.current) {
      onComplete();
      return;
    }

    gsap.to(overlayRef.current, {
      opacity: 0,
      scale: 0.98,
      duration: 0.4,
      ease: "power2.in",
      onComplete,
    });
  }

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];

    BOOT_LINES.forEach((_, i) => {
      timers.push(
        setTimeout(() => setVisibleCount((n) => n + 1), BOOT_LINES[i].delay)
      );
    });

    const lastDelay = BOOT_LINES[BOOT_LINES.length - 1].delay;
    timers.push(setTimeout(dismiss, lastDelay + 700));

    const handleKey = () => dismiss();
    window.addEventListener("keydown", handleKey);

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("keydown", handleKey);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={overlayRef}
      data-testid="boot-overlay"
      className="fixed inset-0 z-50 flex cursor-pointer flex-col bg-phosphor-950 p-8 sm:p-16"
      onClick={dismiss}
      role="dialog"
      aria-label="Boot sequence — click or press any key to skip"
      aria-modal="true"
    >
      <div className="my-auto max-w-2xl">
        {BOOT_LINES.slice(0, visibleCount).map((line, i) => (
          <div
            key={i}
            className="font-mono text-sm leading-7"
          >
            {line.text === "" ? (
              <>&nbsp;</>
            ) : line.isOk ? (
              <span>
                <span className="text-phosphor-bright">[  OK  ]</span>
                <span className="text-phosphor">{line.text.slice(8)}</span>
              </span>
            ) : line.isCursor ? (
              <span className="text-phosphor">
                {line.text}{" "}
                <span className="inline-block h-[0.85em] w-[0.5em] animate-pulse bg-phosphor-bright align-text-bottom" />
              </span>
            ) : (
              <span className={line.dim ? "text-phosphor-dim" : "text-phosphor"}>
                {line.text}
              </span>
            )}
          </div>
        ))}
      </div>
      <p className="mt-auto font-mono text-xs text-phosphor-dim">
        press any key or click anywhere to skip →
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Create BootWrapper**

```tsx
"use client";

import { useState, type ReactNode } from "react";
import BootScreen from "./BootScreen";

export default function BootWrapper({ children }: { children: ReactNode }) {
  const [booted, setBooted] = useState(false);

  return (
    <>
      {!booted ? <BootScreen onComplete={() => setBooted(true)} /> : null}
      {children}
    </>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/terminal/BootScreen.tsx src/components/terminal/BootWrapper.tsx
git commit -m "feat: add skip-able BootScreen and BootWrapper components"
```

---

### Task 6: Update Navbar

**Files:**
- Modify: `src/components/layout/Navbar.tsx`

- [ ] **Step 1: Rewrite Navbar with terminal prompt style**

Replace the entire contents of `src/components/layout/Navbar.tsx`:

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/Navbar.tsx
git commit -m "feat: restyle Navbar as terminal prompt with command-link nav"
```

---

### Task 7: Update Footer

**Files:**
- Modify: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Rewrite Footer as prompt line**

Replace the entire contents of `src/components/layout/Footer.tsx`:

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "feat: restyle Footer as terminal prompt line"
```

---

### Task 8: Update ScrollAnimationProvider

**Files:**
- Modify: `src/components/animation/ScrollAnimationProvider.tsx`

- [ ] **Step 1: Replace amber reveal with terminal line-by-line reveal**

Replace the entire contents of `src/components/animation/ScrollAnimationProvider.tsx`:

```tsx
"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ScrollAnimationProviderProps = {
  children: ReactNode;
};

export default function ScrollAnimationProvider({
  children,
}: ScrollAnimationProviderProps) {
  const scopeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    if (prefersReducedMotion.matches) return;

    const context = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>(
        "[data-terminal-section]"
      );

      sections.forEach((section) => {
        const cmdHeaders = gsap.utils.toArray<HTMLElement>(
          section.querySelectorAll("[data-terminal-cmd]")
        );
        const lines = gsap.utils.toArray<HTMLElement>(
          section.querySelectorAll("[data-terminal-line]")
        );

        const timeline = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        });

        if (cmdHeaders.length > 0) {
          gsap.set(cmdHeaders, { autoAlpha: 0, y: 12 });
          timeline.to(cmdHeaders, { autoAlpha: 1, y: 0, duration: 0.5 });
        }

        if (lines.length > 0) {
          gsap.set(lines, { autoAlpha: 0, y: 8 });
          timeline.to(
            lines,
            { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.06 },
            cmdHeaders.length > 0 ? "-=0.2" : 0
          );
        }
      });

      ScrollTrigger.refresh();
    }, scopeRef);

    return () => context.revert();
  }, []);

  return <div ref={scopeRef}>{children}</div>;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/animation/ScrollAnimationProvider.tsx
git commit -m "feat: replace amber scroll reveal with terminal line-by-line GSAP reveal"
```

---

### Task 9: Update UI Primitives — Button + Badge

**Files:**
- Modify: `src/components/ui/Button.tsx`
- Modify: `src/components/ui/Badge.tsx`

- [ ] **Step 1: Restyle Button as monospace terminal button**

Replace the entire contents of `src/components/ui/Button.tsx`:

```tsx
import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
};

const variants = {
  primary:
    "border-phosphor bg-phosphor text-phosphor-950 hover:bg-phosphor-bright hover:border-phosphor-bright",
  secondary:
    "border-phosphor-border text-phosphor hover:border-phosphor hover:text-phosphor-bright",
  ghost: "border-transparent text-phosphor-dim hover:text-phosphor",
};

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const classes = `inline-flex min-h-10 items-center justify-center rounded border px-4 font-mono text-xs tracking-wide transition ${variants[variant]} ${className}`;

  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (href.startsWith("mailto:")) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} className={classes} target="_blank" rel="noreferrer" {...props}>
      {children}
    </a>
  );
}
```

- [ ] **Step 2: Restyle Badge as phosphor tag**

Replace the entire contents of `src/components/ui/Badge.tsx`:

```tsx
import type { ReactNode } from "react";

type BadgeTone = "neutral" | "success" | "warning" | "danger" | "info";

type BadgeProps = {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
};

const tones: Record<BadgeTone, string> = {
  neutral: "border-phosphor-border text-phosphor-dim",
  success: "border-phosphor text-phosphor",
  warning: "border-phosphor-dim text-phosphor",
  danger: "border-phosphor-border text-phosphor-dim",
  info: "border-phosphor-border text-phosphor-dim",
};

export default function Badge({
  children,
  tone = "neutral",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded border px-2 py-0.5 font-mono text-xs ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/Button.tsx src/components/ui/Badge.tsx
git commit -m "feat: restyle Button and Badge as phosphor-green terminal primitives"
```

---

### Task 10: Hero Section — `cat profile.txt`

**Files:**
- Modify: `src/components/home/Hero.tsx`

- [ ] **Step 1: Rewrite Hero as cat profile.txt output**

Replace the entire contents of `src/components/home/Hero.tsx`:

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/home/Hero.tsx
git commit -m "feat: rewrite Hero as cat profile.txt terminal output"
```

---

### Task 11: About Section — `cat about.md`

**Files:**
- Modify: `src/components/home/About.tsx`

- [ ] **Step 1: Rewrite About as cat about.md output**

Replace the entire contents of `src/components/home/About.tsx`:

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/home/About.tsx
git commit -m "feat: rewrite About as cat about.md terminal output"
```

---

### Task 12: Skills Section — `skills --list --group`

**Files:**
- Modify: `src/components/home/Skills.tsx`

- [ ] **Step 1: Define slug helper and rewrite Skills**

Replace the entire contents of `src/components/home/Skills.tsx`:

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/home/Skills.tsx
git commit -m "feat: rewrite Skills as skills --list --group directory modules"
```

---

### Task 13: Projects Section — `ls -la projects/`

**Files:**
- Modify: `src/components/home/Projects.tsx`

- [ ] **Step 1: Rewrite Projects as directory listing**

Replace the entire contents of `src/components/home/Projects.tsx`:

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/home/Projects.tsx
git commit -m "feat: rewrite Projects as ls -la directory listing with project-row links"
```

---

### Task 14: Experience Section — `git log --career`

**Files:**
- Modify: `src/components/home/Experience.tsx`

- [ ] **Step 1: Add pseudoHash helper and rewrite Experience as git log**

Replace the entire contents of `src/components/home/Experience.tsx`:

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/home/Experience.tsx
git commit -m "feat: rewrite Experience as git log --career commit blocks"
```

---

### Task 15: Contact Section — `ping dharsan`

**Files:**
- Modify: `src/components/home/Contact.tsx`

- [ ] **Step 1: Rewrite Contact as ping reply output**

Replace the entire contents of `src/components/home/Contact.tsx`:

```tsx
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
            <Button key={reply.href} href={reply.href} variant="secondary">
              {reply.label}
            </Button>
          ))}
        </div>
      </div>
    </TerminalSection>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/home/Contact.tsx
git commit -m "feat: rewrite Contact as ping dharsan reply output"
```

---

### Task 16: Wire Up page.tsx + Delete Dead Files

**Files:**
- Modify: `src/app/page.tsx`
- Delete: `src/components/layout/Section.tsx`
- Delete: `src/components/ui/Card.tsx`
- Delete: `src/components/projects/ProjectCard.tsx`
- Delete: `src/components/projects/ProjectTag.tsx`

- [ ] **Step 1: Update page.tsx to use BootWrapper**

Replace the entire contents of `src/app/page.tsx`:

```tsx
import About from "@/components/home/About";
import Contact from "@/components/home/Contact";
import Experience from "@/components/home/Experience";
import Hero from "@/components/home/Hero";
import Projects from "@/components/home/Projects";
import ScrollAnimationProvider from "@/components/animation/ScrollAnimationProvider";
import Skills from "@/components/home/Skills";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import BootWrapper from "@/components/terminal/BootWrapper";

export default function Home() {
  return (
    <BootWrapper>
      <Navbar />
      <ScrollAnimationProvider>
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>
      </ScrollAnimationProvider>
      <Footer />
    </BootWrapper>
  );
}
```

- [ ] **Step 2: Delete dead files**

```bash
git rm src/components/layout/Section.tsx
git rm src/components/ui/Card.tsx
git rm src/components/projects/ProjectCard.tsx
git rm src/components/projects/ProjectTag.tsx
```

- [ ] **Step 3: Verify build passes**

```bash
yarn build 2>&1 | tail -30
```

Expected: Build succeeds with no TypeScript errors. (ProjectDetail still imports `Badge` — that's fine since we kept Badge.)

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: wire BootWrapper into page.tsx, delete Section/Card/ProjectCard/ProjectTag"
```

---

### Task 17: Project Detail Page

**Files:**
- Modify: `src/components/projects/ProjectDetail.tsx`

- [ ] **Step 1: Rewrite ProjectDetail as terminal window**

Replace the entire contents of `src/components/projects/ProjectDetail.tsx`:

```tsx
import Link from "next/link";
import TerminalWindow from "@/components/terminal/TerminalWindow";
import type { Project } from "@/data/projects";

const detailSections = [
  { key: "problem", label: "Problem" },
  { key: "solution", label: "Solution" },
  { key: "architecture", label: "Architecture" },
  { key: "testingStrategy", label: "Testing Strategy" },
  { key: "cicd", label: "CI/CD" },
  { key: "learned", label: "What I Learned" },
] as const;

function pseudoHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(16).slice(0, 7).padStart(7, "0");
}

export default function ProjectDetail({ project }: { project: Project }) {
  return (
    <main className="bg-phosphor-950 px-5 py-12 sm:px-8 lg:py-16">
      <article className="mx-auto max-w-4xl">
        <Link
          href="/#projects"
          className="font-mono text-xs text-phosphor-dim transition hover:text-phosphor"
        >
          ← cd ..
        </Link>
        <TerminalWindow
          title={`cat projects/${project.slug}/readme.md`}
          className="mt-8"
        >
          <div className="p-6">
            <div className="mb-6">
              <p className="font-mono text-xs text-phosphor-dim">
                commit {pseudoHash(project.slug)} &nbsp;·&nbsp;{" "}
                {project.category}
              </p>
              <h1 className="mt-3 font-mono text-3xl font-semibold text-phosphor-bright sm:text-4xl">
                {project.slug}/
              </h1>
              <p className="mt-1 font-mono text-lg text-phosphor">
                {project.title}
              </p>
              <p className="mt-3 font-mono text-sm leading-7 text-phosphor-dim">
                {project.subtitle}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded border border-phosphor-border px-2 py-0.5 font-mono text-xs text-phosphor-dim"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-6 border-t border-phosphor-border pt-6">
              {detailSections.map(({ key, label }) => (
                <div key={key}>
                  <p className="font-mono text-xs text-phosphor-bright">
                    ## {label}
                  </p>
                  <p className="mt-2 font-mono text-sm leading-7 text-phosphor-dim">
                    {project[key]}
                  </p>
                </div>
              ))}

              <div>
                <p className="font-mono text-xs text-phosphor-bright">
                  ## Future
                </p>
                <ul className="mt-2 space-y-1">
                  {project.future.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2 font-mono text-sm text-phosphor-dim"
                    >
                      <span className="text-phosphor-border">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-mono text-xs text-phosphor-bright">
                  ## Impact
                </p>
                <ul className="mt-2 space-y-1">
                  {project.impact.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2 font-mono text-sm text-phosphor-dim"
                    >
                      <span className="text-phosphor-border">·</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {project.githubUrl || project.liveUrl ? (
                <div>
                  <p className="font-mono text-xs text-phosphor-bright">
                    ## Links
                  </p>
                  <div className="mt-2 flex gap-4 font-mono text-sm">
                    {project.githubUrl ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-phosphor transition hover:text-phosphor-bright"
                      >
                        → github
                      </a>
                    ) : null}
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-phosphor transition hover:text-phosphor-bright"
                      >
                        → live
                      </a>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </TerminalWindow>
      </article>
    </main>
  );
}
```

- [ ] **Step 2: Verify build passes**

```bash
yarn build 2>&1 | tail -20
```

Expected: Build succeeds, no TypeScript errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/projects/ProjectDetail.tsx
git commit -m "feat: rewrite ProjectDetail as TerminalWindow cat readme output"
```

---

### Task 18: Update E2E Tests

**Files:**
- Modify: `tests/e2e/home.spec.ts`

- [ ] **Step 1: Rewrite tests for new terminal design**

Replace the entire contents of `tests/e2e/home.spec.ts`:

```ts
import { expect, test, type Page } from "@playwright/test";

async function scrollSection(page: Page, selector: string) {
  const section = page.locator(selector);
  await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(900);
  return section;
}

async function dismissBoot(page: Page) {
  const overlay = page.locator("[data-testid='boot-overlay']");
  const isVisible = await overlay.isVisible().catch(() => false);
  if (isVisible) {
    await overlay.click();
    await page.waitForTimeout(600);
  }
}

test("homepage renders the core portfolio story", async ({ page }) => {
  await page.goto("/");
  await dismissBoot(page);

  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Dharsan Guruparan"
  );
  await expect(page.getByText("SDET + Backend Engineer")).toBeVisible();
  await expect(page.getByText("OPEN TO WORK")).toBeVisible();
  await expect(page.getByRole("link", { name: "$ inspect builds" })).toBeVisible();
  await expect(page.getByRole("link", { name: "$ open resume" })).toBeVisible();
  await expect(page.getByRole("link", { name: "$ ping dharsan" })).toBeVisible();
});

test("boot screen is shown and dismissible", async ({ page }) => {
  await page.goto("/");

  const overlay = page.locator("[data-testid='boot-overlay']");
  await expect(overlay).toBeVisible();

  await overlay.click();
  await page.waitForTimeout(600);
  await expect(overlay).not.toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Dharsan Guruparan"
  );
});

test("all terminal sections are present and readable after hydration", async ({
  page,
}) => {
  await page.goto("/");
  await dismissBoot(page);

  await expect(page.locator("[data-terminal-section]")).toHaveCount(6);

  await expect(
    (await scrollSection(page, "#about")).getByText("# Operating Model")
  ).toBeVisible();

  await expect(
    (await scrollSection(page, "#skills")).getByText(/languages\//i)
  ).toBeVisible();

  await expect(
    (await scrollSection(page, "#projects")).getByText(/total 6/)
  ).toBeVisible();

  await expect(
    (await scrollSection(page, "#experience")).getByText(/commit/)
  ).toBeVisible();

  await expect(
    (await scrollSection(page, "#contact")).getByText(
      "PING dharsan@guruparan.dev"
    )
  ).toBeVisible();
});

test("reduced-motion users see content immediately without boot", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  await expect(
    page.locator("[data-testid='boot-overlay']")
  ).not.toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Dharsan Guruparan"
  );
  await expect(page.locator("#projects")).toBeVisible();

  const firstLine = page.locator("[data-terminal-line]").first();
  const style = await firstLine.getAttribute("style");
  expect(style ?? "").not.toContain("opacity");
  expect(style ?? "").not.toContain("visibility");
});

test("project rows exist, show 6 featured projects, and navigate to detail", async ({
  page,
}) => {
  await page.goto("/");
  await dismissBoot(page);
  await scrollSection(page, "#projects");

  const rows = page.locator("[data-testid='project-row']");
  await expect(rows).toHaveCount(6);

  await rows.first().click();
  await expect(page).toHaveURL(/\/projects\//);
  await expect(page.getByText("← cd ..")).toBeVisible();
});

test("skills section shows all skill groups including Quality Gate Engineering", async ({
  page,
}) => {
  await page.goto("/");
  await dismissBoot(page);
  const skills = await scrollSection(page, "#skills");

  await expect(
    skills.getByRole("heading", { name: "Quality Gate Engineering" })
  ).toBeVisible();
  await expect(skills.getByText("Quality gates")).toBeVisible();
  await expect(skills.getByText("Shift-left testing strategy")).toBeVisible();
});

test("navbar exposes scroll targets and mobile menu", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  await dismissBoot(page);
  const header = page.locator("header");

  if (isMobile) {
    await page.getByRole("button", { name: "Open navigation menu" }).click();
    await expect(
      header.getByRole("link", { name: "~/projects/" })
    ).toBeVisible();
    await page.getByRole("button", { name: "Close navigation menu" }).click();
  } else {
    for (const name of [
      "~/about.md",
      "~/skills",
      "~/projects/",
      "~/git log",
      "~/ping",
    ]) {
      await expect(
        header.getByRole("link", { name, exact: true })
      ).toBeVisible();
    }
  }
});

test("contact section has working direct links", async ({ page }) => {
  await page.goto("/");
  await dismissBoot(page);
  const contact = await scrollSection(page, "#contact");

  await expect(
    contact.getByRole("link", { name: "→ email" })
  ).toHaveAttribute("href", /^mailto:/);
  await expect(
    contact.getByRole("link", { name: "→ github" })
  ).toHaveAttribute("href", /github\.com/);
  await expect(
    contact.getByRole("link", { name: "→ linkedin" })
  ).toHaveAttribute("href", /linkedin\.com/);
});
```

- [ ] **Step 2: Run tests to confirm they pass**

First start the dev server in one terminal, then run:

```bash
yarn test:e2e 2>&1 | tail -40
```

Expected output: All tests pass. (Run `yarn dev` first if not already running.)

- [ ] **Step 3: Commit**

```bash
git add tests/e2e/home.spec.ts
git commit -m "test: rewrite E2E tests for terminal portfolio design"
```

---

### Task 19: Final Lint + Build Verification

**Files:** None — verification only.

- [ ] **Step 1: Run lint**

```bash
yarn lint 2>&1 | tail -20
```

Expected: No errors. Fix any unused import warnings by removing them.

- [ ] **Step 2: Run build**

```bash
yarn build 2>&1 | tail -30
```

Expected: Build succeeds with no TypeScript errors. Output should end with `✓ Compiled successfully` or equivalent.

- [ ] **Step 3: Commit any lint fixes, then final commit**

```bash
git add -A
git commit -m "chore: fix lint issues post-terminal-redesign"
```

If no fixes needed, skip this step.

- [ ] **Step 4: Final summary commit tag**

```bash
git log --oneline -15
```

Verify all 19 task commits are in the log on `portfolio-rebuild-v1`.

---

## Self-Review

**Spec coverage check:**
- ✅ Phosphor color system → Task 1
- ✅ JetBrains Mono font → Task 2
- ✅ TerminalWindow chrome → Task 3
- ✅ TerminalSection wrapper → Task 4
- ✅ Skip-able boot sequence → Task 5
- ✅ Navbar terminal prompt → Task 6
- ✅ Footer prompt line → Task 7
- ✅ GSAP terminal line-by-line reveal → Task 8
- ✅ Button + Badge phosphor restyled → Task 9
- ✅ Hero cat profile.txt → Task 10
- ✅ About cat about.md → Task 11
- ✅ Skills --list --group → Task 12
- ✅ Projects ls -la → Task 13
- ✅ Experience git log → Task 14
- ✅ Contact ping dharsan → Task 15
- ✅ page.tsx wiring + dead file deletion → Task 16
- ✅ ProjectDetail terminal window → Task 17
- ✅ E2E tests updated → Task 18
- ✅ Future-ready architecture: `data-terminal-section` + isolated output blocks (CommandRouter can be dropped in later with no section changes)
- ✅ Accessibility: `<h1>` in Hero, `aria-label` on skill group `<h3>`, boot `role="dialog"` + `aria-modal`, nav `aria-label`

**Placeholder check:** No TBDs found. All code blocks are complete.

**Type consistency:** `pseudoHash` defined identically in `Experience.tsx` and `ProjectDetail.tsx` (both standalone — no shared util needed per YAGNI). `data-terminal-section`, `data-terminal-cmd`, `data-terminal-line` used consistently across `TerminalSection`, `Hero`, and `ScrollAnimationProvider`.

"use client";

import { useEffect, useRef, useState } from "react";

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
  const [dismissed, setDismissed] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef(false);

  function dismiss() {
    if (doneRef.current) return;
    doneRef.current = true;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !overlayRef.current) {
      setDismissed(true);
      onComplete();
      return;
    }

    const el = overlayRef.current;
    // opacity fades over 0.4s; visibility becomes hidden at exactly 0.4s so
    // both Playwright and screen readers treat it as gone after the animation
    el.style.transition =
      "opacity 0.4s ease-in, transform 0.4s ease-in, visibility 0s linear 0.4s";
    el.style.opacity = "0";
    el.style.transform = "scale(0.98)";
    el.style.visibility = "hidden";
    el.style.pointerEvents = "none";

    // Remove from DOM after CSS transition completes
    setTimeout(() => {
      setDismissed(true);
      onComplete();
    }, 420);
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

  if (dismissed) return null;

  return (
    <div
      ref={overlayRef}
      data-testid="boot-overlay"
      className="motion-reduce:hidden fixed inset-0 z-[100] flex cursor-pointer flex-col bg-phosphor-950 p-8 sm:p-16"
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

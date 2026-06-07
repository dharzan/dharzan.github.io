"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

type ScrollAnimationProviderProps = {
  children: ReactNode;
};

export default function ScrollAnimationProvider({
  children,
}: ScrollAnimationProviderProps) {
  const scopeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    async function runAnimations() {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      );

      if (prefersReducedMotion.matches) return;

      const gsapModule = await import("gsap");
      const scrollTriggerModule = await import("gsap/ScrollTrigger");

      const gsap = gsapModule.default;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger;

      gsap.registerPlugin(ScrollTrigger);

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
              toggleActions: "play none none none",
            },
          });

          if (cmdHeaders.length > 0) {
            gsap.set(cmdHeaders, { y: 12 });
            timeline.to(cmdHeaders, { y: 0, duration: 0.5 });
          }

          if (lines.length > 0) {
            gsap.set(lines, { y: 8 });
            timeline.to(
              lines,
              { y: 0, duration: 0.4, stagger: 0.06 },
              cmdHeaders.length > 0 ? "-=0.2" : 0
            );
          }
        });

        ScrollTrigger.refresh();
      }, scopeRef);

      cleanup = () => context.revert();
    }

    runAnimations();

    return () => {
      cleanup?.();
    };
  }, []);

  return <div ref={scopeRef}>{children}</div>;
}
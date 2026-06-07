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

    return () => context.revert();
  }, []);

  return <div ref={scopeRef}>{children}</div>;
}

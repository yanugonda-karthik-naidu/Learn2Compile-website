"use client";

import { useEffect } from "react";

import { initDataAttributeAnimations } from "@/lib/gsap/runner";

import { prefersReducedMotion } from "@/lib/gsap/reducedMotion";



export function CinematicMotionProvider() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    // First pass: keep GSAP ScrollTrigger-driven reveals.
    initDataAttributeAnimations(document);


    // Prevent duplicate/extra ScrollTrigger creation.
    // The reveal system should be initialized once and made idempotent in runner.ts.
    // A follow-up ScrollTrigger refresh is handled inside initDataAttributeAnimations.
    const t = window.setTimeout(() => {
      try {
        if (typeof window !== "undefined") {
          const st = (window as unknown as { ScrollTrigger?: { refresh?: (force?: boolean) => void } }).ScrollTrigger;
          st?.refresh?.(true);
        }
      } catch {
        // no-op
      }
    }, 250);


    return () => {
      window.clearTimeout(t);
    };
  }, []);

  return null;
}


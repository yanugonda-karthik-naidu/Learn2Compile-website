"use client";

import { useEffect } from "react";
import type Lenis from "@studio-freight/lenis";
import { initDataAttributeAnimations } from "@/lib/gsap/runner";
import { registerLenisScrollTrigger } from "@/lib/gsap/lenisScrollTrigger";
import { prefersReducedMotion } from "@/lib/gsap/reducedMotion";

function getLenis(): Lenis | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { __lenis?: Lenis };
  return w.__lenis ?? null;
}

export function CinematicMotionProvider() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = getLenis();

    if (lenis) {
      registerLenisScrollTrigger(lenis);
    }

    // First pass.
    initDataAttributeAnimations(document);

    // Re-run on route-level hydration changes (cheap, no state updates).
    const t = window.setTimeout(() => {
      initDataAttributeAnimations(document);
      // Best-effort refresh: if ScrollTrigger is available.
      try {
        if (typeof window !== "undefined") {
          // Best-effort: ScrollTrigger may exist on window if already loaded.
          const st = (window as unknown as { ScrollTrigger?: { refresh?: (force?: boolean) => void } }).ScrollTrigger;
          if (st?.refresh) st.refresh(true);
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


"use client";

import { ReactNode, useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

export function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const mql = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const reduced = Boolean(mql?.matches);

    // Accessibility: if user prefers reduced motion, keep native scrolling.
    if (reduced) return;

    const lenis = new Lenis({
      // Cinematic + premium, but not floaty.
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,

      // Safer defaults for future GSAP ScrollTrigger sync.
      gestureOrientation: "vertical",
    });

    lenisRef.current = lenis;

    // Future GSAP readiness hook (read-only contract).
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };
    rafId = window.requestAnimationFrame(raf);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      (window as unknown as { __lenis?: Lenis }).__lenis = undefined;
      lenisRef.current?.destroy();

      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}


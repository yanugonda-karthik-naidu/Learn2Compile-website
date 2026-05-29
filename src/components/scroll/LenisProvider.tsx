"use client";

import { ReactNode, useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

export function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);

  useEffect(() => {
    const mql = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const reduced = Boolean(mql?.matches);

    // Accessibility: if user prefers reduced motion, keep native scrolling.
    if (reduced) return;

    const lenis = new Lenis({
      lerp: 0.095,
      smoothWheel: true,
      wheelMultiplier: 1,
      gestureOrientation: "vertical",
    });

    lenisRef.current = lenis;

    // Future GSAP readiness hook (read-only contract).
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    // Visibility-based RAF loop control
    const handleVisibilityChange = () => {
      isVisibleRef.current = !document.hidden;
      if (!document.hidden && !rafIdRef.current) {
        rafIdRef.current = window.requestAnimationFrame(raf);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // RAF loop with visibility awareness and ~60fps throttling
    let lastTime = 0;
    const raf = (time: number) => {
      // Only render if visible
      if (!isVisibleRef.current) {
        rafIdRef.current = null;
        return;
      }

      // Throttle to ~60fps (16.67ms minimum between frames)
      if (time - lastTime >= 16) {
        lenis.raf(time);
        lastTime = time;
      }

      rafIdRef.current = window.requestAnimationFrame(raf);
    };
    rafIdRef.current = window.requestAnimationFrame(raf);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (rafIdRef.current) window.cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
      (window as unknown as { __lenis?: Lenis }).__lenis = undefined;
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}


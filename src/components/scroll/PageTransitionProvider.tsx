"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

import { prefersReducedMotion } from "@/lib/gsap/reducedMotion";

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const overlay = useMemo(() => {
    // Lightweight cinematic overlay (no heavy blur, GPU-safe opacity).
    return {
      className:
        "pointer-events-none fixed inset-0 z-[9999] bg-[#050816] opacity-0 transition-opacity duration-300",
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    // Avoid synchronous state change during the same render cycle.
    const raf = window.requestAnimationFrame(() => {
      setIsTransitioning(true);

      timeoutId = setTimeout(() => {
        setIsTransitioning(false);
      }, 220);
    });

    return () => {
      window.cancelAnimationFrame(raf);
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    };
  }, [pathname]);

  return (
    <>
      <div
        aria-hidden="true"
        className={overlay.className}
        style={{ opacity: isTransitioning ? 1 : 0 }}
      />
      {children}
    </>
  );
}


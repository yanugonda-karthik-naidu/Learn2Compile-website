"use client";
import { useEffect, useState, useCallback } from "react";

/**
 * Centralized reduced motion detection hook.
 * Use this instead of per-component matchMedia useEffect hooks.
 *
 * Usage:
 *   const { reduced, motionVars } = useMotion();
 *   useEffect(() => {
 *     if (reduced) return;
 *     // animations here
 *   }, [reduced]);
 */
export function useMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mql) return;
    const apply = () => setReduced(mql.matches);
    apply();
    mql.addEventListener?.("change", apply);
    return () => mql.removeEventListener?.("change", apply);
  }, []);

  /**
   * Returns motion-safe vars — returns empty object when reduced motion is
   * active, allowing GSAP to skip animations without errors.
   *
   * Usage:
   *   const vars = motionVars({ y: 30, opacity: 0 });
   *   if (Object.keys(vars).length === 0) return;
   *   gsap.to(el, vars);
   */
  const motionVars = useCallback(<T extends Record<string, unknown>>(vars: T): T | Record<string, never> => {
    if (reduced) return {} as Record<string, never>;
    return vars;
  }, [reduced]);

  return { reduced, motionVars };
}
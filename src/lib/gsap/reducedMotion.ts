export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  const mql = window.matchMedia?.("(prefers-reduced-motion: reduce)");
  return Boolean(mql?.matches);
}


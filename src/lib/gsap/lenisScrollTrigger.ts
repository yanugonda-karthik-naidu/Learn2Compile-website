import { ScrollTrigger } from "gsap/ScrollTrigger";
import type Lenis from "@studio-freight/lenis";
import { prefersReducedMotion } from "./reducedMotion";

export function registerLenisScrollTrigger(lenis: Lenis) {
  if (prefersReducedMotion()) return;

  // Avoid double-registration.
  const marker = "_l2cRegistered";
  const anyST = ScrollTrigger as unknown as Record<string, unknown>;
  if (anyST[marker]) return;
  anyST[marker] = true;

  // Attempt to use Lenis root element if available; otherwise fall back to window.
  const scroller = (lenis as unknown as { rootElement?: HTMLElement }).rootElement;


  ScrollTrigger.scrollerProxy(scroller ?? window, {
    scrollTop(value?: number) {
      if (typeof value === "number") {
        lenis.scrollTo(value, { immediate: true });
        return;
      }
      // Read-only fallback (safe under TS).
      return window.scrollY;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: scroller ? "transform" : "fixed",
  });

  lenis.on("scroll", () => {
    ScrollTrigger.update();
  });

  ScrollTrigger.refresh(true);
}



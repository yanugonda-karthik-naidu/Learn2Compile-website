import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "./reducedMotion";
import { easing, revealDefaults, stagger } from "./config";

export type AnimateType =
  | "fade-up"
  | "fade-in"
  | "scale-in"
  | "stagger"
  | "blur-reveal";

export function initDataAttributeAnimations(root: ParentNode = document) {

  if (typeof window === "undefined") return;
  if (prefersReducedMotion()) return;

  // Ensure plugin registered.
  gsap.registerPlugin(ScrollTrigger);

  const animateEls = Array.from(root.querySelectorAll<HTMLElement>("[data-animate]"));

  for (const el of animateEls) {
    const raw = el.getAttribute("data-animate")?.trim() || "";
    if (!raw) continue;

    const type = raw as AnimateType;

    const durationVal = el.getAttribute("data-duration");
    const delayVal = el.getAttribute("data-delay");

    const durationNum = durationVal ? Number(durationVal) : revealDefaults.duration;
    const delayNum = delayVal ? Number(delayVal) : 0;

    // Stagger mode: animate children with a single trigger.
    if (type === "stagger") {
      const children = Array.from(
        el.querySelectorAll<HTMLElement>("[data-stagger-item]")
      );

      if (children.length === 0) {
        // Fallback: stagger direct children.
        const direct = Array.from(el.children).filter((c): c is HTMLElement => c instanceof HTMLElement);
        if (direct.length === 0) continue;
        // We'll treat direct as items.
        const items = direct;

        gsap.set(items, { opacity: 0, y: 14, scale: 0.985 });
        gsap.to(items, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: durationNum,
          ease: easing.outExpo,
          delay: delayNum,
          stagger: stagger.cards,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
            // Keep it simple: reveals only.
            once: true,
          },
        });
      } else {
        gsap.set(children, { opacity: 0, y: 14, scale: 0.985 });
        gsap.to(children, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: durationNum,
          ease: easing.outExpo,
          delay: delayNum,
          stagger: stagger.cards,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        });
      }

      continue;
    }

    // Single element reveals.
    const baseFrom = {
      opacity: revealDefaults.opacity.from,
      y: revealDefaults.y.from,
      scale: revealDefaults.scale.from,
    };



    if (type === "fade-in") {
      baseFrom.y = 0;
      baseFrom.scale = 1;
    } else if (type === "scale-in") {
      baseFrom.y = 0;
      baseFrom.opacity = 0;
    } else if (type === "blur-reveal") {
      // Restraint: tiny blur only.
      (baseFrom as { opacity: number; y: number; scale: number; filter?: string }).filter = "blur(6px)";
    } else {

      // fade-up default
    }

    // If element opts out, ignore.
    if (el.getAttribute("data-animate") === "none") continue;

    // Apply starting state.
    gsap.set(el, baseFrom);

    const toVars = {
      opacity: revealDefaults.opacity.to,
      y: 0,
      scale: 1,
      duration: durationNum,
      ease: easing.outExpo,
      delay: delayNum,
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
        once: true,
      },
    };


    gsap.to(el, toVars);

  }
}


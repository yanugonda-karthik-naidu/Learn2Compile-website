import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "./reducedMotion";
import { easing, motion } from "./config";

export type AnimateType =
  | "fade-up"
  | "fade-up-subtle"
  | "fade-in"
  | "scale-in"
  | "stagger"
  | "stagger-fade"
  | "stagger-fade-subtle"
  | "blur-reveal";

export function initDataAttributeAnimations(root: ParentNode = document) {

  if (typeof window === "undefined") return;
  if (prefersReducedMotion()) return;

  gsap.registerPlugin(ScrollTrigger);

  const animateEls = Array.from(root.querySelectorAll<HTMLElement>("[data-animate]"));

  for (const el of animateEls) {
    const raw = el.getAttribute("data-animate")?.trim() || "";
    if (!raw) continue;

    const type = raw as AnimateType;

    const durationVal = el.getAttribute("data-duration");
    const delayVal = el.getAttribute("data-delay");

    const durationNum = durationVal ? Number(durationVal) : motion.reveal.duration.normal;
    const delayNum = delayVal ? Number(delayVal) : 0;

    // Stagger modes: animate children with a single trigger.
    if (type === "stagger" || type === "stagger-fade" || type === "stagger-fade-subtle") {
      const children = Array.from(
        el.querySelectorAll<HTMLElement>("[data-stagger-item]")
      );

      const items = children.length > 0 ? children : Array.from(el.children).filter((c): c is HTMLElement => c instanceof HTMLElement);
      if (items.length === 0) continue;

      const isSubtle = type === "stagger-fade-subtle";
      const yFrom = isSubtle ? motion.reveal.y.subtle : motion.reveal.y.normal;
      const staggerVal = (isSubtle ? motion.reveal.stagger.fast : motion.reveal.stagger.normal) + 0.02; // Cinematic breathing room

      gsap.set(items, { opacity: 0, y: yFrom, scale: 0.985 });
      gsap.to(items, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: durationNum,
        ease: easing.outExpo,
        delay: delayNum,
        stagger: { each: staggerVal, ease: "power2.out" }, // Cinematic stagger with eased rhythm
        scrollTrigger: {
          trigger: el,
          start: motion.reveal.start,
          toggleActions: "play none none none",
          once: true,
        },
      });

      continue;
    }

    // Single element reveals.
    const baseFrom: Record<string, unknown> = {
      opacity: 0,
      y: motion.reveal.y.normal,
      scale: 0.98,
    };

    if (type === "fade-in") {
      baseFrom.y = 0;
      baseFrom.scale = 1;
    } else if (type === "fade-up-subtle") {
      baseFrom.y = motion.reveal.y.subtle;
      baseFrom.scale = 1;
    } else if (type === "scale-in") {
      baseFrom.y = 0;
      baseFrom.opacity = 0;
    } else if (type === "blur-reveal") {
      baseFrom.filter = "blur(6px)";
    } else {
      // fade-up default
    }

    if (el.getAttribute("data-animate") === "none") continue;

    gsap.set(el, baseFrom);

    const toVars = {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "none",
      duration: durationNum,
      ease: easing.outExpo,
      delay: delayNum,
      scrollTrigger: {
        trigger: el,
        start: motion.reveal.start,
        toggleActions: "play none none none",
        once: true,
      },
    };

    gsap.to(el, toVars);

  }
}

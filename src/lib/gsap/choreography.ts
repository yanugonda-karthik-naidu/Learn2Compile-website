import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "./config";
import { prefersReducedMotion } from "./reducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ============================================================================
// CINEMATIC REVEAL CHOREOGRAPHY SYSTEM
// Signature Learn2Compile motion identity - emotionally resonant reveals
// ============================================================================

/**
 * Cinematic staggered reveal with breathing rhythm
 * Elements reveal in waves with anticipation and organic pacing
 */
export function cinematicReveal(
  elements: HTMLElement[],
  options?: {
    duration?: number;
    staggerEach?: number;
    y?: number;
    scale?: number;
    ease?: string;
    start?: string;
    anticipation?: boolean;
  }
) {
  if (typeof window === "undefined") return;
  if (prefersReducedMotion()) {
    gsap.set(elements, { opacity: 1, y: 0, scale: 1 });
    return;
  }
  if (elements.length === 0) return;

  const opts = options ?? {};
  const {
    duration = motion.reveal.duration.normal,
    staggerEach = motion.cinematic.stagger.each,
    y = motion.reveal.y.normal,
    scale = 0.98,
    ease = motion.section.hero.ease,
    start = motion.reveal.start,
    anticipation = true,
  } = opts;

  // Set initial state with anticipation if enabled
  if (anticipation) {
    gsap.set(elements, {
      opacity: 0,
      y,
      scale,
      filter: "blur(4px)",
    });
  } else {
    gsap.set(elements, {
      opacity: 0,
      y,
      scale,
    });
  }

  // Create cinematic timeline with breathing stagger
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: elements[0],
      start,
      toggleActions: "play none none none",
    },
  });

  // First wave: subtle anticipation pulse
  if (anticipation) {
    tl.to(elements, {
      scale: scale + 0.01,
      duration: motion.anticipation.duration,
      ease: motion.anticipation.ease,
      stagger: staggerEach / 3,
    });
  }

  // Main reveal wave with breathing rhythm
  tl.to(
    elements,
    {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      duration,
      ease,
      stagger: staggerEach,
    }
  );

  return tl;
}

/**
 * Single element cinematic reveal with anticipation
 */
export function cinematicRevealSingle(
  element: HTMLElement,
  options?: {
    duration?: number;
    delay?: number;
    y?: number;
    scale?: number;
    ease?: string;
    start?: string;
    anticipation?: boolean;
  }
) {
  if (typeof window === "undefined") return;
  if (prefersReducedMotion()) {
    gsap.set(element, { opacity: 1, y: 0, scale: 1, filter: "none" });
    return;
  }

  const opts = options ?? {};
  const {
    duration = motion.reveal.duration.normal,
    delay = 0,
    y = motion.reveal.y.normal,
    scale = 0.98,
    ease = "power3.out",
    start = motion.reveal.start,
    anticipation = true,
  } = opts;

  const fromVars: gsap.TweenVars = {
    opacity: 0,
    y,
    scale,
    filter: anticipation ? "blur(4px)" : "none",
  };

  const toVars: gsap.TweenVars = {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "none",
    duration,
    ease,
    delay,
    scrollTrigger: {
      trigger: element,
      start,
      toggleActions: "play none none none",
    },
  };

  gsap.set(element, fromVars);
  return gsap.to(element, toVars);
}

/**
 * Breathing reveal - subtle pulse effect during reveal
 * Creates organic, alive feeling rather than mechanical entrance
 */
export function breathingReveal(
  element: HTMLElement,
  options?: {
    duration?: number;
    breatheDuration?: number;
    y?: number;
    ease?: string;
  }
) {
  if (typeof window === "undefined") return;
  if (prefersReducedMotion()) {
    gsap.set(element, { opacity: 1, y: 0 });
    return;
  }

  const opts = options ?? {};
  const {
    duration = 0.8,
    breatheDuration = motion.cinematic.breathe.duration,
    y = motion.reveal.y.subtle,
    ease = motion.cinematic.breathe.ease,
  } = opts;

  gsap.set(element, { opacity: 0, y });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: element,
      start: motion.reveal.start,
      toggleActions: "play none none none",
    },
  });

  // Subtle pre-pulse before reveal
  tl.to(element, {
    opacity: 0.4,
    y: y * 0.8,
    duration: breatheDuration / 3,
    ease,
  })
    .to(
      element,
      {
        opacity: 1,
        y: 0,
        duration,
        ease,
      }
    )
    .to(
      element,
      {
        scale: 1.01,
        duration: breatheDuration / 4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: 1,
      }
    );

  return tl;
}

/**
 * Hero section reveal sequence with layered entrance
 * Badge → Title → Subtitle → CTA hierarchy
 */
export function heroEntrance(
  refs: {
    badge?: HTMLElement | null;
    title?: HTMLElement | null;
    subtitle?: HTMLElement | null;
    cta?: HTMLElement | null;
  },
  options?: {
    baseDelay?: number;
  }
) {
  if (typeof window === "undefined") return;
  if (prefersReducedMotion()) {
    Object.values(refs).forEach((el) => {
      if (el) gsap.set(el, { opacity: 1, y: 0 });
    });
    return;
  }

  const opts = options ?? {};
  const { baseDelay = motion.hero.delay } = opts;

  const tl = gsap.timeline({ delay: baseDelay });

  if (refs.badge) {
    tl.fromTo(
      refs.badge,
      { y: motion.hero.badge.y, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: motion.hero.badge.duration,
        ease: motion.hero.badge.ease,
      }
    );
  }

  if (refs.title) {
    tl.fromTo(
      refs.title,
      { y: motion.hero.title.y, opacity: 0, filter: "blur(6px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: motion.hero.title.duration,
        ease: motion.hero.title.ease,
      },
      motion.hero.title.overlap
    );
  }

  if (refs.subtitle) {
    tl.fromTo(
      refs.subtitle,
      { y: motion.hero.subtitle.y, opacity: 0, scale: 0.98, filter: "blur(3px)" },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: motion.hero.subtitle.duration,
        ease: motion.hero.subtitle.ease,
      },
      motion.hero.subtitle.overlap
    );
  }

  if (refs.cta) {
    tl.fromTo(
      refs.cta,
      { y: motion.hero.cta.y, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: motion.hero.cta.duration,
        ease: motion.hero.cta.ease,
      },
      motion.hero.cta.overlap
    );
  }

  return tl;
}

/**
 * CTA button cinematic hover choreography
 * Anticipation → Response → Release pattern
 */
export function ctaHoverChoreography(element: HTMLElement, options?: {
  scaleStrength?: number;
  glowColor?: string;
}) {
  if (typeof window === "undefined") return;
  if (prefersReducedMotion()) return;

  const opts = options ?? {};
  const { scaleStrength = 1.04, glowColor = "rgba(56,189,248,0.4)" } = opts;

  const tl = gsap.timeline({ paused: true });

  // Anticipation - subtle pre-shift
  tl.to(element, {
    scale: scaleStrength - 0.02,
    duration: 0.08,
    ease: "power2.in",
  });

  // Main response
  tl.to(
    element,
    {
      scale: scaleStrength,
      duration: 0.25,
      ease: "back.out(1.2)",
    },
    0.08
  );

  // Glow emphasis
  tl.to(
    element,
    {
      boxShadow: `0 0 30px ${glowColor}`,
      duration: 0.3,
      ease: "power2.out",
    },
    0.1
  );

  return tl;
}

/**
 * Magnetic cursor pull effect calculation
 * Returns offset values to lerp cursor toward element center
 */
export function calculateMagneticOffset(
  cursorX: number,
  cursorY: number,
  element: HTMLElement,
  strength: number = motion.cursor.magneticStrength
): { x: number; y: number; shouldPull: boolean } {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const distance = Math.sqrt(
    Math.pow(cursorX - centerX, 2) + Math.pow(cursorY - centerY, 2)
  );

  const threshold = motion.cursor.magneticRadius;

  if (distance > threshold) {
    return { x: 0, y: 0, shouldPull: false };
  }

  // Calculate pull based on proximity (stronger when closer)
  const pullFactor = 1 - distance / threshold;
  const offsetX = (centerX - cursorX) * pullFactor * strength;
  const offsetY = (centerY - cursorY) * pullFactor * strength;

  return { x: offsetX, y: offsetY, shouldPull: true };
}

/**
 * Section-aware stagger with personality variation
 */
export function sectionReveal(
  elements: HTMLElement[],
  sectionType: keyof typeof motion.section = "hero",
  options?: {
    duration?: number;
    y?: number;
    anticipation?: boolean;
  }
) {
  if (typeof window === "undefined") return;
  if (prefersReducedMotion()) {
    gsap.set(elements, { opacity: 1, y: 0, scale: 1 });
    return;
  }
  if (elements.length === 0) return;

  const sectionConfig = motion.section[sectionType];
  const opts = options ?? {};
  const {
    duration = sectionConfig.duration.base,
    y = motion.reveal.y.normal,
    anticipation = true,
  } = opts;

  gsap.set(elements, {
    opacity: 0,
    y,
    scale: anticipation ? 0.97 : 0.98,
    filter: anticipation ? "blur(3px)" : "none",
  });

  return gsap.to(elements, {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "none",
    duration,
    ease: sectionConfig.ease,
    stagger: { each: sectionConfig.staggerEach + 0.02, ease: "power2.out" },
    scrollTrigger: {
      trigger: elements[0],
      start: motion.reveal.start,
      toggleActions: "play none none none",
    },
  });
}


export type GsapEase = string;

export const easing = {
  // Premium but restrained.
  outExpo: "power3.out" as GsapEase,
  outQuint: "power4.out" as GsapEase,
  outCubic: "power3.out" as GsapEase,
  inOut: "power2.inOut" as GsapEase,
  smooth: "power2.out" as GsapEase,
  // Cinematic easing variants
  cinematicIn: "power4.out" as GsapEase,
  cinematicOut: "power2.in" as GsapEase,
  emotional: "elastic.out(1, 0.75)" as GsapEase,
  atmospheric: "sine.inOut" as GsapEase,
  dramatic: "expo.out" as GsapEase,
};

export const duration = {
  fast: 0.45,
  normal: 0.7,
  slow: 1.0,
  cinematic: 1.0,
  dramatic: 1.2,
};

export const stagger = {
  // Keep stagger elegant.
  cards: {
    each: 0.06,
    from: "start" as const,
  },
  cinematic: {
    each: 0.08,
    from: "start" as const,
  },
};

export const revealDefaults = {
  // Use opacity + transform only (GPU friendly, low-cost).
  opacity: { from: 0, to: 1 },
  y: { from: 18, to: 0 },
  scale: { from: 0.98, to: 1 },

  // Keep transitions subtle.
  duration: duration.normal,
  ease: easing.outExpo,
};

// ============================================================================
// UNIFIED MOTION CONSTANTS — One source of truth for all animations
// ============================================================================
export const motion = {
  // -------------------------------------------------------------------------
  // Hero entrance timeline: badge → title → subtitle → cta → scroll hint
  // Cinematic refinement: slower, more emotionally resonant reveals
  // -------------------------------------------------------------------------
  hero: {
    delay: 0.4,
    badge: { duration: 0.6, ease: "power3.out", y: 12, fromOpacity: 0 },
    title: { duration: 1.0, ease: "expo.out", y: 55, fromOpacity: 0, overlap: -0.45 },
    subtitle: { duration: 0.8, ease: "power2.out", y: 25, fromOpacity: 0, overlap: -0.55 },
    cta: { duration: 0.6, ease: "back.out(1.2)", y: 15, fromOpacity: 0, overlap: -0.4 },
    scrollHint: { duration: 0.45, ease: "power3.out", y: 8, fromOpacity: 0, overlap: -0.2 },
  },

  // -------------------------------------------------------------------------
  // Scroll-triggered section reveals
  // -------------------------------------------------------------------------
  reveal: {
    duration: { fast: 0.4, normal: 0.65, slow: 0.9 },
    y: { subtle: 12, normal: 17, large: 35 },
    stagger: { fast: 0.05, normal: 0.08, slow: 0.12 },
    start: "top 85%",
  },

  // -------------------------------------------------------------------------
  // Hover interactions
  // -------------------------------------------------------------------------
  hover: {
    duration: { fast: 0.2, normal: 0.3, slow: 0.45 },
    ease: "power3.out",
    scale: { subtle: 1.02, normal: 1.04, strong: 1.06 },
    glow: { duration: 0.3, ease: "power2.out" },
  },

  // -------------------------------------------------------------------------
  // Page/menu transitions
  // -------------------------------------------------------------------------
  transition: {
    pageOverlay: { duration: 280, ease: "power2.inOut" },
    menuOverlay: { duration: 250, ease: "power2.out" },
    menuSlide: { duration: 0.45, ease: "power3.out" },
    menuStagger: { each: 0.05, from: "end", ease: "power3.out" },
  },

  // -------------------------------------------------------------------------
  // Accordion/expand animations
  // -------------------------------------------------------------------------
  expand: {
    duration: 0.32,
    ease: "power3.inOut",
    contentFade: { duration: 0.25, delay: 0.04 },
  },

  // -------------------------------------------------------------------------
  // Lenis smooth scroll
  // -------------------------------------------------------------------------
  lenis: {
    lerp: 0.095,
    wheelMultiplier: 1,
  },

  // -------------------------------------------------------------------------
  // Parallax depth movement
  // -------------------------------------------------------------------------
  parallax: {
    grid: { strength: { x: 5, y: 3 } },
    env: { strength: { x: 0.25, y: 0.15 } },
  },

  // -------------------------------------------------------------------------
  // Atmospheric transitions (subtle ambient animations)
  // -------------------------------------------------------------------------
  atmospheric: {
    fogDrift: { duration: 12, ease: "sine.inOut" },
    lightShift: { duration: 8, ease: "sine.inOut" },
    gridPulse: { duration: 4, ease: "sine.inOut" },
    gradientShift: { duration: 10, ease: "sine.inOut" },
  },

  // -------------------------------------------------------------------------
  // LEARN2COMPILE SIGNATURE CINEMATIC MOTION IDENTITY
  // Refined timing with emotional pacing and anticipation
  // -------------------------------------------------------------------------

  // Cinematic anticipation - subtle pre-shift before main motion
  anticipation: {
    scale: 0.97,
    y: 6,
    duration: 0.12,
    ease: "power2.in" as GsapEase,
  },

  // Breathing stagger - signature Learn2Compile reveal rhythm
  cinematic: {
    stagger: {
      each: 0.12,
      from: "start" as const,
      overlap: -0.25,
    },
    breathe: {
      duration: 0.8,
      ease: "sine.inOut" as GsapEase,
      delay: 0.05,
    },
  },

  // Section-specific personality profiles
  section: {
    hero: {
      staggerEach: 0.15,
      duration: { base: 0.9, overlap: -0.5 },
      ease: "power4.out" as GsapEase,
    },
    portfolio: {
      staggerEach: 0.1,
      duration: { base: 0.6, overlap: -0.35 },
      ease: "power3.out" as GsapEase,
    },
    pricing: {
      staggerEach: 0.08,
      duration: { base: 0.55, overlap: -0.3 },
      ease: "power3.out" as GsapEase,
    },
    faq: {
      staggerEach: 0.06,
      duration: { base: 0.4, overlap: -0.25 },
      ease: "power2.out" as GsapEase,
    },
    cta: {
      staggerEach: 0.12,
      duration: { base: 0.6, overlap: -0.3 },
      ease: "back.out(1.3)" as GsapEase,
    },
  },

  // Cursor magnetic behavior constants
  cursor: {
    magneticRadius: 120,
    magneticStrength: 0.25,
    proximityThreshold: 80,
    depthReactionStrength: 0.15,
  },

  // Mascot contextual states
  mascot: {
    idlePulse: { duration: 4.0, y: -2, rotation: 1 },
    trackingOffset: 0.08,
    ctaAttention: { scale: 1.06, glowIntensity: 0.35 },
    sectionAwareness: {
      hero: { curiosity: 0.3 },
      portfolio: { curiosity: 0.5 },
      pricing: { curiosity: 0.2 },
      faq: { curiosity: 0.15 },
      cta: { curiosity: 0.4 },
    },
  },

  // Environmental breathing - organic non-repetitive motion
  environment: {
    driftVariation: { min: 8, max: 15 },
    glowBreath: { minDuration: 14, maxDuration: 22 },
    particleFloat: { y: 12, x: 6 },
  },
};

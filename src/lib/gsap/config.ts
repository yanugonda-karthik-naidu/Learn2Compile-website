
export type GsapEase = string;

export const easing = {
  // Premium but restrained.
  outExpo: "power3.out" as GsapEase,
  outQuint: "power4.out" as GsapEase,
  outCubic: "power3.out" as GsapEase,
  inOut: "power2.inOut" as GsapEase,
};


export const duration = {
  fast: 0.45,
  normal: 0.7,
  slow: 1.0,
};

export const stagger = {
  // Keep stagger elegant.
  cards: {
    each: 0.06,
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


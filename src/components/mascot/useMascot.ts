"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "@/lib/gsap/config";

interface UseMascotReturn {
  position: { x: number; y: number };
  state: "idle" | "tracking" | "cta-active" | "curious" | "attentive";
  isTouch: boolean;
  reduced: boolean;
  sectionContext: "hero" | "portfolio" | "pricing" | "faq" | "cta" | "default";
}

type MascotState = UseMascotReturn["state"];
type SectionContext = UseMascotReturn["sectionContext"];

function initIsTouch(): boolean {
  if (typeof window === "undefined") return false;
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

function initReduced(): boolean {
  if (typeof window === "undefined") return false;
  const mql = window.matchMedia?.("(prefers-reduced-motion: reduce)");
  return Boolean(mql?.matches);
}

// Section identification by data attribute or path patterns
function detectSection(): SectionContext {
  if (typeof document === "undefined") return "default";

  // Check for explicit section markers
  const heroSection = document.querySelector("[data-section='hero']");
  if (heroSection) return "hero";

  const portfolioSection = document.querySelector("[data-section='portfolio']");
  if (portfolioSection) return "portfolio";

  const pricingSection = document.querySelector("[data-section='pricing']");
  if (pricingSection) return "pricing";

  const faqSection = document.querySelector("[data-section='faq']");
  if (faqSection) return "faq";

  const ctaSection = document.querySelector("[data-section='cta']");
  if (ctaSection) return "cta";

  // Fallback: infer from URL
  const path = window.location.pathname;
  if (path.includes("/portfolio")) return "portfolio";
  if (path.includes("/pricing")) return "pricing";
  if (path.includes("/faq")) return "faq";
  if (path === "/" || path.includes("/home")) return "hero";

  return "default";
}

export function useMascot(): UseMascotReturn {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [state, setState] = useState<MascotState>("idle");
  const [isTouch] = useState(initIsTouch);
  const [reduced, setReduced] = useState(initReduced);
  const [sectionContext, setSectionContext] = useState<SectionContext>("default");

  const mousePos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number | null>(null);
  const ctaElementsRef = useRef<Element[]>([]);
  const stateRef = useRef(state);
  const isVisibleRef = useRef(true);
  const lastUpdateRef = useRef<number>(0);
  const activeRef = useRef(true);

  // Curiosity offset - subtle lean toward interesting elements
  const curiosityOffsetRef = useRef({ x: 0, y: 0 });
  const interestingElementRef = useRef<Element | null>(null);

  // Keep stateRef in sync
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  // Detect reduced motion preference changes
  useEffect(() => {
    const mql = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mql) return;
    const apply = () => setReduced(mql.matches);
    mql.addEventListener?.("change", apply);
    return () => mql.removeEventListener?.("change", apply);
  }, []);

  // Scan for CTA elements
  const scanCtas = useCallback(() => {
    if (typeof document === "undefined") return;
    const ctas = document.querySelectorAll("a, button, [role='button']");
    ctaElementsRef.current = Array.from(ctas);
  }, []);

  // Check proximity to CTAs
  const checkCtaProximity = useCallback((x: number, y: number): boolean => {
    for (const cta of ctaElementsRef.current) {
      const rect = cta.getBoundingClientRect();
      const ctaCenterX = rect.left + rect.width / 2;
      const ctaCenterY = rect.top + rect.height / 2;
      const distance = Math.sqrt(
        Math.pow(x - ctaCenterX, 2) + Math.pow(y - ctaCenterY, 2)
      );
      if (distance < motion.cursor.proximityThreshold) return true;
    }
    return false;
  }, []);

  // Find interesting element for curiosity offset
  const findInterestingElement = useCallback((x: number, y: number): Element | null => {
    const threshold = 150;
    let closestEl: Element | null = null;
    let closestDistance = Infinity;

    for (const el of ctaElementsRef.current) {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.sqrt(
        Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
      );

      if (distance < threshold && distance < closestDistance) {
        closestDistance = distance;
        closestEl = el;
      }
    }

    return closestEl;
  }, []);

  // Calculate curiosity offset for subtle lean
  const updateCuriosityOffset = useCallback((x: number, y: number) => {
    const interestingEl = findInterestingElement(x, y);

    if (interestingEl && interestingEl !== interestingElementRef.current) {
      interestingElementRef.current = interestingEl;
    }

    if (interestingEl) {
      const rect = interestingEl.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.sqrt(
        Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
      );

      if (distance < 150) {
        const pullFactor = (1 - distance / 150) * motion.mascot.trackingOffset;
        curiosityOffsetRef.current = {
          x: (centerX - x) * pullFactor,
          y: (centerY - y) * pullFactor * 0.5, // Less vertical lean
        };
      } else {
        // Decay curiosity
        curiosityOffsetRef.current = {
          x: curiosityOffsetRef.current.x * 0.95,
          y: curiosityOffsetRef.current.y * 0.95,
        };
      }
    } else {
      interestingElementRef.current = null;
      curiosityOffsetRef.current = {
        x: curiosityOffsetRef.current.x * 0.9,
        y: curiosityOffsetRef.current.y * 0.9,
      };
    }
  }, [findInterestingElement]);

  // Section awareness via IntersectionObserver
  useEffect(() => {
    if (typeof window === "undefined" || isTouch || reduced) return;

    const sections = document.querySelectorAll("[data-section]");
    if (sections.length === 0) {
      // Fallback: detect section from page
      // Defer state update to avoid synchronous setState inside effect body.
      queueMicrotask(() => setSectionContext(detectSection()));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const section = entry.target.getAttribute("data-section") as SectionContext;
            if (section) {
              setSectionContext(section);
            }
          }
        }
      },
      { threshold: 0.3 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [isTouch, reduced]);

  // Trailing cursor tracking with curiosity offset
  useEffect(() => {
    if (isTouch || reduced) return;

    const handleMouseMove = (e: PointerEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("pointermove", handleMouseMove, { passive: true });

    // Animation loop - lerped trailing movement with throttling
    activeRef.current = true;

    const animate = () => {
      if (!activeRef.current) return;
      if (!isVisibleRef.current) {
        rafRef.current = null;
        return;
      }

      const now = performance.now();

      // Throttle to ~60fps (16.67ms minimum between frames)
      if (now - lastUpdateRef.current < 16) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }
      lastUpdateRef.current = now;

      const target = mousePos.current;
      const current = currentPos.current;

      // Skip micro-updates when position delta is < 1px
      const dx = Math.abs(target.x - current.x);
      const dy = Math.abs(target.y - current.y);
      if (dx < 1 && dy < 1) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      // Section-aware lerp factor - more curious near portfolio/pricing
      const baseLerpFactor = 0.22;
      const sectionAwareness = motion.mascot.sectionAwareness as Record<string, { curiosity: number }>;
      const sectionConfig = sectionAwareness[sectionContext] ?? { curiosity: 0.2 };
      const lerpFactor = baseLerpFactor + sectionConfig.curiosity * 0.08;

      const newX = current.x + (target.x - current.x) * lerpFactor;
      const newY = current.y + (target.y - current.y) * lerpFactor;

      // Apply curiosity offset
      const curiosityX = curiosityOffsetRef.current.x;
      const curiosityY = curiosityOffsetRef.current.y;

      currentPos.current = { x: newX + curiosityX, y: newY + curiosityY };
      setPosition({ x: newX + curiosityX, y: newY + curiosityY });

      // Update curiosity offset
      updateCuriosityOffset(target.x, target.y);

      // Determine mascot state based on context
      const nearCta = checkCtaProximity(target.x, target.y);

      let newState: MascotState;
      if (nearCta) {
        newState = "cta-active";
      } else if (interestingElementRef.current && sectionContext === "portfolio") {
        newState = "curious";
      } else if (sectionContext === "pricing" || sectionContext === "faq") {
        newState = "attentive";
      } else {
        newState = "tracking";
      }

      if (stateRef.current !== newState) {
        setState(newState);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    // Initial CTA scan
    scanCtas();

    // Rescan CTAs on navigation
    const handleRouteChange = () => {
      setTimeout(() => {
        scanCtas();
        setSectionContext(detectSection());
      }, 500);
    };
    window.addEventListener("popstate", handleRouteChange);

    return () => {
      activeRef.current = false;
      window.removeEventListener("pointermove", handleMouseMove);
      window.removeEventListener("popstate", handleRouteChange);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [isTouch, reduced, checkCtaProximity, scanCtas, sectionContext, updateCuriosityOffset]);

  // Visibility-based pause for mascot animation
  useEffect(() => {
    const handleVisibilityChange = () => {
      isVisibleRef.current = !document.hidden;
      if (!document.hidden && !rafRef.current && !isTouch && !reduced) {
        rafRef.current = requestAnimationFrame(() => {
          activeRef.current = true;
        });
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [isTouch, reduced]);

  return {
    position,
    state,
    isTouch,
    reduced,
    sectionContext,
  };
}
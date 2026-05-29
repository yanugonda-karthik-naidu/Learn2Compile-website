"use client";

import { useCallback, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { motion } from "@/lib/gsap/config";
import { prefersReducedMotion } from "@/lib/gsap/reducedMotion";

interface UseCinematicButtonOptions {
  scaleStrength?: number;
  glowStrength?: number;
  glowColor?: string;
  anticipationDelay?: number;
}

interface UseCinematicButtonReturn {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onMouseDown: () => void;
  onMouseUp: () => void;
  onMouseMove: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  containerRef: React.RefObject<HTMLElement | null>;
}

/**
 * Cinematic CTA button choreography hook
 * Implements anticipation → response → release pattern with cursor-following glow
 */
export function useCinematicButton(
  options: UseCinematicButtonOptions = {}
): UseCinematicButtonReturn {
  const {
    scaleStrength = 1.04,
    glowStrength = 0.4,
    glowColor = "rgba(56,189,248,0.35)",
    anticipationDelay = 0.06,
  } = options;

  const containerRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const isActiveRef = useRef(false);

  const initGlowElement = useCallback(() => {
    if (!containerRef.current) return;
    if (glowRef.current) return;

    const existing = containerRef.current.querySelector(".cinematic-glow");
    if (existing) {
      glowRef.current = existing as HTMLDivElement;
      return;
    }

    const glow = document.createElement("div");
    glow.className = "cinematic-glow pointer-events-none absolute inset-0 overflow-hidden rounded-2xl";
    glow.innerHTML = `<div class="glow-gradient" style="position:absolute;inset:0;opacity:0;transition:opacity 0.3s;"></div>`;
    glow.style.cssText = "position:absolute;inset:0;overflow:hidden;border-radius:inherit;pointer-events:none;";

    const gradient = glow.querySelector(".glow-gradient") as HTMLDivElement;
    if (gradient) {
      gradient.style.cssText = `
        position: absolute;
        inset: 0;
        opacity: 0;
        background: radial-gradient(circle at var(--x, 50%) var(--y, 50%), ${glowColor}, transparent 60%);
        transition: opacity 0.3s ease;
      `;
    }

    containerRef.current.style.position = "relative";
    containerRef.current.style.overflow = "hidden";
    containerRef.current.appendChild(glow);
    glowRef.current = glow;
  }, [glowColor]);

  const killTimeline = useCallback(() => {
    if (tlRef.current) {
      tlRef.current.kill();
      tlRef.current = null;
    }
  }, []);

  const onMouseEnter = useCallback(() => {
    if (!containerRef.current || prefersReducedMotion()) return;
    if (isActiveRef.current) return;
    isActiveRef.current = true;

    killTimeline();

    initGlowElement();
    const el = containerRef.current;

    // Create anticipation → response timeline
    tlRef.current = gsap.timeline();

    // Anticipation - subtle pre-shift
    tlRef.current.to(el, {
      scale: scaleStrength - 0.015,
      duration: anticipationDelay,
      ease: "power2.in",
    });

    // Main response with cinematic easing
    tlRef.current.to(
      el,
      {
        scale: scaleStrength,
        duration: 0.22,
        ease: "back.out(1.3)",
      },
      anticipationDelay
    );

    // Show glow
    if (glowRef.current) {
      const gradient = glowRef.current.querySelector(".glow-gradient") as HTMLDivElement;
      if (gradient) {
        gsap.to(gradient, {
          opacity: 1,
          duration: 0.25,
          delay: anticipationDelay + 0.05,
          ease: "power2.out",
        });
      }
    }
  }, [anticipationDelay, scaleStrength, initGlowElement, killTimeline]);

  const onMouseLeave = useCallback(() => {
    if (!containerRef.current) return;
    isActiveRef.current = false;

    killTimeline();

    const el = containerRef.current;

    tlRef.current = gsap.timeline();

    // Cinematic release - elastic return
    tlRef.current.to(el, {
      scale: 1,
      duration: 0.35,
      ease: "elastic.out(0.8, 0.5)",
    });

    // Fade glow
    if (glowRef.current) {
      const gradient = glowRef.current.querySelector(".glow-gradient") as HTMLDivElement;
      if (gradient) {
        gsap.to(gradient, {
          opacity: 0,
          duration: 0.2,
          ease: "power2.in",
        });
      }
    }
  }, [killTimeline]);

  const onMouseDown = useCallback(() => {
    if (!containerRef.current || prefersReducedMotion()) return;
    killTimeline();

    const el = containerRef.current;

    // Cinematic press
    gsap.to(el, {
      scale: scaleStrength - 0.03,
      duration: 0.12,
      ease: "power2.in",
    });
  }, [scaleStrength, killTimeline]);

  const onMouseUp = useCallback(() => {
    if (!containerRef.current || prefersReducedMotion()) return;

    const el = containerRef.current;

    gsap.to(el, {
      scale: scaleStrength,
      duration: 0.25,
      ease: "elastic.out(1, 0.6)",
    });
  }, [scaleStrength]);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    if (!containerRef.current || prefersReducedMotion()) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    if (glowRef.current) {
      const gradient = glowRef.current.querySelector(".glow-gradient") as HTMLDivElement;
      if (gradient) {
        gradient.style.setProperty("--x", `${x}%`);
        gradient.style.setProperty("--y", `${y}%`);
      }
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      killTimeline();
      if (glowRef.current?.parentNode) {
        glowRef.current.parentNode.removeChild(glowRef.current);
      }
    };
  }, [killTimeline]);

  return {
    onMouseEnter,
    onMouseLeave,
    onMouseDown,
    onMouseUp,
    onMouseMove,
    containerRef,
  };
}
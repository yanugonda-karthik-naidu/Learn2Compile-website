"use client";

import { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { motion } from "@/lib/gsap/config";

interface MascotProps {
  position: { x: number; y: number };
  state: "idle" | "tracking" | "cta-active" | "curious" | "attentive";
  reduced?: boolean;
  sectionContext?: "hero" | "portfolio" | "pricing" | "faq" | "cta" | "default";
}

export function Mascot({
  position,
  state,
  reduced = false,
  sectionContext = "default",
}: MascotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const idleTlRef = useRef<gsap.core.Tween | null>(null);
  const innerRef = useRef<SVGCircleElement>(null);

  // Section-aware idle animation timing
  useEffect(() => {
    if (reduced || !containerRef.current) return;

    // Kill existing animation
    if (idleTlRef.current) {
      idleTlRef.current.kill();
    }

    const el = containerRef.current;

    // Cinematic idle floating - timing varies by section personality
    const idleConfig = motion.mascot.idlePulse;
    const baseDuration = idleConfig.y / 5; // Normalize

    idleTlRef.current = gsap.to(el, {
      y: -idleConfig.y,
      rotation: idleConfig.rotation,
      duration: baseDuration,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
  }, [reduced, sectionContext]);

  // Inner core pulsing effect
  useEffect(() => {
    if (reduced || !innerRef.current) return;

    gsap.to(innerRef.current, {
      scale: 1.1,
      duration: 0.4,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
  }, [reduced]);

  // State-based scaling with section awareness
  const getScale = () => {
    if (state === "cta-active") return motion.mascot.ctaAttention.scale;
    if (state === "curious") return 1.04;
    if (state === "attentive") return 1.03;
    if (state === "tracking") return 1.02;
    return 1;
  };

  // Glow intensity based on state and section
  const getGlowIntensity = () => {
    if (state === "cta-active") return motion.mascot.ctaAttention.glowIntensity;
    if (state === "curious") return 0.32;
    if (state === "attentive") return 0.28;
    if (state === "tracking") return 0.25;

    // Section-based ambient glow (cinematic restraint)
    const sectionGlow: Record<string, number> = {
      hero: 0.15,
      portfolio: 0.18,
      pricing: 0.16,
      faq: 0.12,
      cta: 0.22,
      default: 0.15,
    };
    return sectionGlow[sectionContext] || 0.15;
  };

  const scale = getScale();
  const glowIntensity = getGlowIntensity();

  const containerStyle = useMemo(
    () => ({
      position: "fixed" as const,
      left: `${position.x}px`,
      top: `${position.y}px`,
      width: "36px",
      height: "36px",
      transform: `translate3d(-50%, -50%, 0px) scale(${scale})`,
      zIndex: "9997",
      willChange: "transform",
      filter: "drop-shadow(0 2px 8px rgba(56,189,248,0.15))",
    }),
    [position.x, position.y, scale]
  );

  const glowStyle = useMemo(
    () => ({
      position: "absolute" as const,
      inset: -8,
      borderRadius: "50%" as const,
      background: `radial-gradient(circle, rgba(56,189,248,${
        glowIntensity * 0.25
      }) 0%, rgba(56,189,248,0) 70%)`,
      filter: "blur(6px)",
      transition: "opacity 0.4s ease",
    }),
    [glowIntensity]
  );

  const outerGlowStyle = useMemo(
    () => ({
      position: "absolute" as const,
      inset: 0,
      borderRadius: "50%" as const,
      boxShadow: `0 0 ${6 + glowIntensity * 4}px rgba(56,189,248,${
        glowIntensity * 0.18
      })`,
      transition: "box-shadow 0.4s ease",
    }),
    [glowIntensity]
  );

  const innerGlowStyle = useMemo(
    () => ({
      position: "absolute" as const,
      inset: 6,
      borderRadius: "50%" as const,
      background: `radial-gradient(circle, rgba(139,92,246,${
        glowIntensity * 0.3
      }) 0%, rgba(139,92,246,0) 70%)`,
      filter: "blur(4px)",
      transition: "opacity 0.4s ease",
    }),
    [glowIntensity]
  );

  return (
    <div
      ref={containerRef}
      className="pointer-events-none select-none"
      style={containerStyle}
      aria-hidden="true"
      suppressHydrationWarning
    >
      {/* Outer glow aura */}
      <div style={glowStyle} />

      {/* Holographic AI Assistant SVG - premium geometric form */}
      <svg
        viewBox="0 0 52 52"
        width="36"
        height="36"
        style={{ overflow: "visible" }}
      >
        <defs>
          <filter id="mascot-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="inner-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer orbital ring */}
        <circle
          cx="26"
          cy="26"
          r="18"
          fill="none"
          stroke="#38BDF8"
          strokeWidth="0.8"
          opacity="0.2"
          strokeDasharray="3 4"
        />

        {/* Middle orbital ring */}
        <circle
          cx="26"
          cy="26"
          r="14"
          fill="none"
          stroke="#8B5CF6"
          strokeWidth="0.6"
          opacity="0.25"
          strokeDasharray="2 5"
        />

        {/* Core orb - main body */}
        <circle
          cx="26"
          cy="26"
          r="10"
          fill="#0a1628"
          stroke="#38BDF8"
          strokeWidth="1"
          filter="url(#mascot-glow)"
        />

        {/* Inner core glow */}
        <circle
          cx="26"
          cy="26"
          r="7"
          fill="#1a2744"
          stroke="#38BDF8"
          strokeWidth="0.5"
          opacity="0.8"
        />

        {/* Core highlight */}
        <circle
          ref={innerRef as React.RefObject<SVGCircleElement>}
          cx="26"
          cy="26"
          r="4"
          fill="#38BDF8"
          opacity="0.6"
          filter="url(#inner-glow)"
        >
          <animate
            attributeName="opacity"
            values="0.6;0.9;0.6"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Inner bright spot */}
        <circle
          cx="26"
          cy="26"
          r="2"
          fill="#ffffff"
          opacity="0.5"
        />

        {/* Orbital particles */}
        <circle cx="12" cy="26" r="1.2" fill="#38BDF8" opacity="0.4">
          <animateMotion
            dur="8s"
            repeatCount="indefinite"
            path="M14 0 A14 14 0 1 1 40 26"
          />
        </circle>

        <circle cx="38" cy="26" r="1" fill="#8B5CF6" opacity="0.35">
          <animateMotion
            dur="10s"
            repeatCount="indefinite"
            path="M38 26 A14 14 0 1 1 12 26"
          />
        </circle>

        <circle cx="26" cy="10" r="0.8" fill="#06B6D4" opacity="0.3">
          <animateMotion
            dur="12s"
            repeatCount="indefinite"
            path="M26 12 A14 14 0 1 1 26 40"
          />
        </circle>

        {/* Subtle circuit traces */}
        <line
          x1="20"
          y1="20"
          x2="18"
          y2="18"
          stroke="#38BDF8"
          strokeWidth="0.5"
          opacity="0.3"
        />
        <line
          x1="32"
          y1="20"
          x2="34"
          y2="18"
          stroke="#38BDF8"
          strokeWidth="0.5"
          opacity="0.3"
        />
        <line
          x1="20"
          y1="32"
          x2="18"
          y2="34"
          stroke="#8B5CF6"
          strokeWidth="0.5"
          opacity="0.25"
        />
        <line
          x1="32"
          y1="32"
          x2="34"
          y2="34"
          stroke="#8B5CF6"
          strokeWidth="0.5"
          opacity="0.25"
        />
      </svg>

      {/* Inner violet glow */}
      <div style={innerGlowStyle} />

      {/* Extra glow layer */}
      <div style={outerGlowStyle} />
    </div>
  );
}
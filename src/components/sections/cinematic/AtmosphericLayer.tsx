"use client";

import { useMemo, useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { motion } from "@/lib/gsap/config";

interface AtmosphericLayerProps {
  variant?: "dense" | "subtle" | "minimal";
  mouseParallax?: boolean;
  mousePosition?: { x: number; y: number };
  reducedMotion?: boolean;
}

export function AtmosphericLayer({
  variant = "subtle",
  mouseParallax = true,
  mousePosition = { x: 0, y: 0 },
  reducedMotion = false,
}: AtmosphericLayerProps) {
  // Viewport-aware scaling for responsive atmospheric composition
  const [viewportScale, setViewportScale] = useState(1);
  const ambientRef = useRef<HTMLDivElement>(null);
  // Removed glowRefs to keep render-phase linting strict and compile-safe.

  useEffect(() => {

    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1920) setViewportScale(1.25);
      else if (width >= 1536) setViewportScale(1.15);
      else if (width >= 1280) setViewportScale(1);
      else if (width >= 1024) setViewportScale(0.9);
      else if (width >= 768) setViewportScale(0.75);
      else setViewportScale(0.4);
    };
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // GSAP ambient animation with randomized organic motion
  useEffect(() => {
    if (reducedMotion || !ambientRef.current) return;

    const el = ambientRef.current;
    const envConfig = motion.environment;

    // Create varied duration for non-repetitive feel
    const randomDuration = () =>
      envConfig.glowBreath.minDuration +
      Math.random() * (envConfig.glowBreath.maxDuration - envConfig.glowBreath.minDuration);

    // Breathing ambient shift - organic, non-repeating (subtle scale/opacity only)
    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    tl.to(el, {
      opacity: 0.85,
      scale: 1.015,
      duration: randomDuration(),
      ease: "sine.inOut",
    });

    // Add glow breathing to individual glow elements (DOM query; no ref arrays)
    const root = ambientRef.current?.parentElement;
    const glowEls = root ? Array.from(root.querySelectorAll("[data-glow-element='1'], [data-glow-element='2'], [data-glow-element='3']")) : [];

    glowEls.forEach((glow, index) => {
      const el = glow as HTMLDivElement;
      if (!el) return;

      const baseDuration = randomDuration();
      gsap.to(el, {
        scale: 1 + Math.random() * 0.04,
        opacity: 0.85 + Math.random() * 0.1,
        duration: baseDuration + index * 0.5, // Offset timing for each glow
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    });

    return () => {
      tl.kill();
      glowEls.forEach((glow) => {
        gsap.killTweensOf(glow as Element);
      });
    };
  }, [reducedMotion]);


  // Multi-layer atmospheric gradients with viewport-scaled values
  const atmosphereStyle = useMemo(() => {
    const configs = {
      dense: {
        glow1: { baseSize: 900, x: "10%", y: "5%", color: "rgba(56,189,248,0.16)" },
        glow2: { baseSize: 800, x: "75%", y: "55%", color: "rgba(139,92,246,0.12)" },
        glow3: { baseSize: 600, x: "50%", y: "85%", color: "rgba(6,182,212,0.08)" },
        overlay: "linear-gradient(180deg, rgba(5,8,22,0.3) 0%, transparent 40%, rgba(5,8,22,0.2) 100%)",
      },
      subtle: {
        glow1: { baseSize: 700, x: "15%", y: "8%", color: "rgba(56,189,248,0.10)" },
        glow2: { baseSize: 650, x: "80%", y: "60%", color: "rgba(139,92,246,0.08)" },
        glow3: { baseSize: 500, x: "45%", y: "90%", color: "rgba(6,182,212,0.05)" },
        overlay: "linear-gradient(180deg, rgba(5,8,22,0.25) 0%, transparent 50%, rgba(5,8,22,0.15) 100%)",
      },
      minimal: {
        glow1: { baseSize: 500, x: "20%", y: "10%", color: "rgba(56,189,248,0.06)" },
        glow2: { baseSize: 450, x: "75%", y: "65%", color: "rgba(139,92,246,0.05)" },
        glow3: { baseSize: 350, x: "50%", y: "85%", color: "rgba(6,182,212,0.03)" },
        overlay: "linear-gradient(180deg, rgba(5,8,22,0.15) 0%, transparent 60%, rgba(5,8,22,0.1) 100%)",
      },
    };

    const config = configs[variant];
    const scale = viewportScale;

    return {
      glow1: { size: `${config.glow1.baseSize * scale}px`, x: config.glow1.x, y: config.glow1.y, color: config.glow1.color },
      glow2: { size: `${config.glow2.baseSize * scale}px`, x: config.glow2.x, y: config.glow2.y, color: config.glow2.color },
      glow3: { size: `${config.glow3.baseSize * scale}px`, x: config.glow3.x, y: config.glow3.y, color: config.glow3.color },
      overlay: config.overlay,
    };
  }, [variant, viewportScale]);

  // Parallax grid transformation for environmental perspective effect
  const gridTransform = useMemo(() => {
    if (!mouseParallax) return "translate3d(0px, 0px, 0px)";
    const strength = motion.parallax.grid.strength;
    return `translate3d(${mousePosition.x * strength.x}px, ${mousePosition.y * strength.y}px, 0px)`;
  }, [mouseParallax, mousePosition]);

  // Responsive grid size based on viewport scale (sparser for cinematic calm)
  const gridSize = useMemo(() => {
    const baseSize = variant === "minimal" ? 80 : variant === "subtle" ? 72 : 56;
    // Ensure minimum 40px at mobile for calmer, less dense grid
    const scaled = Math.max(40, baseSize * viewportScale);
    return `${scaled}px`;
  }, [variant, viewportScale]);




  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Layer 1: Primary environmental glow - top left cyan */}
      <div
        data-glow-element='1'
        className="absolute transition-opacity duration-700"

        style={{
          left: atmosphereStyle.glow1.x,
          top: atmosphereStyle.glow1.y,
          width: atmosphereStyle.glow1.size,
          height: atmosphereStyle.glow1.size,
          background: `radial-gradient(circle, ${atmosphereStyle.glow1.color}, transparent 70%)`,
          transform: "translate(-50%, -50%)",
          opacity: 1,
        }}
      />

      {/* Layer 2: Secondary environmental glow - bottom right purple */}
      <div
        data-glow-element='2'
        className="absolute transition-opacity duration-700"

        style={{
          left: atmosphereStyle.glow2.x,
          top: atmosphereStyle.glow2.y,
          width: atmosphereStyle.glow2.size,
          height: atmosphereStyle.glow2.size,
          background: `radial-gradient(circle, ${atmosphereStyle.glow2.color}, transparent 70%)`,
          transform: "translate(-50%, -50%)",
          opacity: 1,
        }}
      />

      {/* Layer 3: Tertiary atmospheric glow - bottom center teal */}
      <div
        data-glow-element='3'
        className="absolute transition-opacity duration-700"

        style={{
          left: atmosphereStyle.glow3.x,
          top: atmosphereStyle.glow3.y,
          width: atmosphereStyle.glow3.size,
          height: atmosphereStyle.glow3.size,
          background: `radial-gradient(circle, ${atmosphereStyle.glow3.color}, transparent 70%)`,
          transform: "translate(-50%, -50%)",
          opacity: 1,
        }}
      />

      {/* Layer 4: Depth vignette overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: atmosphereStyle.overlay,
        }}
      />

      {/* Layer 5: Atmospheric fog at edges */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 120% 80% at 50% 100%, rgba(5,8,22,0.4) 0%, transparent 50%),
            radial-gradient(ellipse 80% 120% at 0% 50%, rgba(5,8,22,0.25) 0%, transparent 50%),
            radial-gradient(ellipse 80% 120% at 100% 50%, rgba(5,8,22,0.25) 0%, transparent 50%)
          `,
        }}
      />

      {/* Layer 6: Perspective grid with parallax */}
      <div
        className="absolute left-1/2 top-0 h-[130%] w-[130%] -translate-x-1/2 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(56,189,248,0.35) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(56,189,248,0.18) 1px, transparent 1px)
          `,
          backgroundSize: gridSize,
          transform: gridTransform,
          transition: reducedMotion ? "transform 200ms ease" : "transform 200ms ease",
        }}
      />

      {/* Layer 7: Subtle animated ambient shift - GSAP animated for organic feel */}
      <div
        ref={ambientRef}
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 100% 100% at 30% 20%, rgba(56,189,248,0.03) 0%, transparent 50%),
            radial-gradient(ellipse 100% 100% at 70% 80%, rgba(139,92,246,0.02) 0%, transparent 50%)
          `,
        }}
      />

      {/* Layer 8: Cinematic top edge darkening */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(5,8,22,0.35) 0%, transparent 25%)",
        }}
      />
    </div>
  );
}

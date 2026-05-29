"use client";

import { useEffect, useRef, useState } from "react";
import { StudioEnvironment } from "@/components/3d/environments/StudioEnvironment";
import { AtmosphericLayer } from "@/components/sections/cinematic/AtmosphericLayer";
import { gsap } from "gsap";
import { motion } from "@/lib/gsap/config";
import { useMotion } from "@/hooks/useMotion";
import { useCinematicButton } from "@/hooks/useCinematicButton";

function CinematicCTA({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}) {
  const { onMouseEnter, onMouseLeave, onMouseDown, onMouseUp, onMouseMove, containerRef } =
    useCinematicButton({
      scaleStrength: variant === "primary" ? 1.04 : 1.03,
      glowStrength: variant === "primary" ? 0.35 : 0.25,
      glowColor:
        variant === "primary"
          ? "rgba(56,189,248,0.35)"
          : "rgba(139,92,246,0.25)",
      anticipationDelay: 0.06,
    });

  const handleEnter = () => {
    document.documentElement.dataset.bbCtaHover = "1";
    onMouseEnter();
  };

  const handleLeave = () => {
    document.documentElement.dataset.bbCtaHover = "0";
    onMouseLeave();
  };

  return (
    <a
      ref={containerRef as React.RefObject<HTMLAnchorElement>}
      href={href}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      className={className}
    >
      {children}
    </a>
  );
}

export function HeroSection() {
  const { reduced } = useMotion();
  const heroRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      setMouse({ x: nx, y: ny });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  // Enhanced cinematic entrance with breathing rhythm
  useEffect(() => {
    if (reduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: motion.hero.delay });

      // Badge - subtle anticipation then reveal
      if (badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          { y: motion.hero.badge.y, opacity: 0, scale: 0.95, filter: "blur(4px)" },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: motion.hero.badge.duration,
            ease: motion.hero.badge.ease,
          }
        );
      }

      // Title - dramatic reveal with layered depth
      if (titleRef.current) {
        tl.fromTo(
          titleRef.current,
          {
            y: motion.hero.title.y,
            opacity: 0,
            scale: 0.97,
            filter: "blur(8px)",
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: motion.hero.title.duration,
            ease: motion.hero.title.ease,
          },
          motion.hero.title.overlap
        );
      }

      // Subtitle - measured reveal with breathing rhythm
      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          {
            y: motion.hero.subtitle.y,
            opacity: 0,
            scale: 0.98,
            filter: "blur(4px)",
          },
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

      // CTA buttons - entrance with anticipation
      if (ctaRef.current) {
        const ctaButtons = ctaRef.current.querySelectorAll("a");

        // Set initial state for all CTAs
        gsap.set(ctaButtons, {
          opacity: 0,
          y: motion.hero.cta.y,
          scale: 0.95,
        });

        // Staggered reveal with breathing
        tl.to(
          ctaButtons,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: motion.hero.cta.duration,
            ease: motion.hero.cta.ease,
            stagger: 0.12,
          },
          motion.hero.cta.overlap
        );
      }

      // Scroll hint - subtle entrance
      if (scrollHintRef.current) {
        tl.fromTo(
          scrollHintRef.current,
          { y: motion.hero.scrollHint.y, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: motion.hero.scrollHint.duration,
            ease: motion.hero.scrollHint.ease,
          },
          motion.hero.scrollHint.overlap
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={heroRef} className="relative min-h-screen overflow-hidden" data-section="hero">
      {/* Full-width 3D scene as background */}
      <div className="absolute inset-0 z-0">
        <StudioEnvironment
          reduced={reduced}
          className="!h-full !w-full"
          cameraPosition={[0, 1.5, 5.5]}
          cameraFov={50}
        />
      </div>

      {/* Atmospheric overlay */}
      <AtmosphericLayer
        variant="subtle"
        mouseParallax={true}
        mousePosition={mouse}
        reducedMotion={reduced}
      />

      {/* Content overlay */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl py-20">
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 opacity-0"
          >
            <span className="h-2 w-2 rounded-full bg-[#38BDF8] shadow-[0_0_18px_rgba(56,189,248,0.6)]" />
            AI-powered digital studio
          </div>

          <h1
            ref={titleRef}
            className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl opacity-0"
          >
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-[#8B5CF6] to-[#06B6D4]">
              We Build Future-Ready
            </span>
            <span className="block">Digital Experiences</span>
          </h1>

          <p
            ref={subtitleRef}
            className="mt-5 max-w-xl text-pretty text-base leading-7 text-white/70 opacity-0"
          >
            Premium web development engineered with cinematic motion, immersive
            3D, and conversion-first performance—crafted for teams that move fast
            and look unforgettable.
          </p>

          <div ref={ctaRef} className="mt-8 flex flex-wrap gap-3 opacity-0">
            <CinematicCTA
              href="/custom-quote"
              variant="primary"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white shadow-[0_0_0_1px_rgba(255,255,255,0.06)] transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:shadow-[0_0_25px_rgba(56,189,248,0.18)] active:scale-[0.98]"
            >
              <span className="relative z-10">Start Your Project</span>
              <span className="ml-2 relative z-10 transition group-hover:translate-x-1">→</span>
            </CinematicCTA>

            <CinematicCTA
              href="/portfolio"
              variant="secondary"
              className="group inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#38BDF8]/20 via-[#8B5CF6]/20 to-[#06B6D4]/20 px-5 py-3 text-sm font-medium text-white shadow-[0_0_25px_rgba(56,189,248,0.15)] transition-all duration-300 hover:from-[#38BDF8]/30 hover:via-[#8B5CF6]/30 hover:to-[#06B6D4]/30 hover:shadow-[0_0_35px_rgba(56,189,248,0.25)] active:scale-[0.98]"
            >
              View Our Work
            </CinematicCTA>
          </div>

          {/* Scroll hint indicator */}
          <div
            ref={scrollHintRef}
            className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0"
          >
            <div className="flex flex-col items-center gap-2">
              <div className="h-12 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
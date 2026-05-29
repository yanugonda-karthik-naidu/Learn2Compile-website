"use client";

import { useEffect, useRef, useState } from "react";
import { StudioEnvironment } from "@/components/3d/environments/StudioEnvironment";
import { AtmosphericLayer } from "@/components/sections/cinematic/AtmosphericLayer";
import { gsap } from "gsap";
import { motion } from "@/lib/gsap/config";
import { useMotion } from "@/hooks/useMotion";

export function AboutHeroSection() {
  const { reduced } = useMotion();
  const heroRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: motion.hero.delay });
      tl.fromTo(badgeRef.current, { y: motion.hero.badge.y, opacity: 0 }, { y: 0, opacity: 1, duration: motion.hero.badge.duration, ease: motion.hero.badge.ease })
        .fromTo(titleRef.current, { y: motion.hero.title.y, opacity: 0 }, { y: 0, opacity: 1, duration: motion.hero.title.duration, ease: motion.hero.title.ease }, motion.hero.title.overlap)
        .fromTo(subtitleRef.current, { y: motion.hero.subtitle.y, opacity: 0 }, { y: 0, opacity: 1, duration: motion.hero.subtitle.duration, ease: motion.hero.subtitle.ease }, motion.hero.subtitle.overlap)
        .fromTo(ctaRef.current, { y: motion.hero.cta.y, opacity: 0 }, { y: 0, opacity: 1, duration: motion.hero.cta.duration, ease: motion.hero.cta.ease }, motion.hero.cta.overlap)
        .fromTo(scrollRef.current, { y: motion.hero.scrollHint.y, opacity: 0 }, { y: 0, opacity: 1, duration: motion.hero.scrollHint.duration, ease: motion.hero.scrollHint.ease }, motion.hero.scrollHint.overlap);
    }, heroRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={heroRef} className="relative min-h-screen overflow-hidden bg-[#050816]">
      <div className="absolute inset-0">
        {/* Cinematic atmospheric layer */}
        <AtmosphericLayer
          variant="subtle"
          mouseParallax={true}
          mousePosition={mouse}
          reducedMotion={reduced}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid min-h-screen items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col justify-center py-16 sm:py-20 lg:py-24">
            <div ref={badgeRef} className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 opacity-0">
              <span className="h-2 w-2 rounded-full bg-[#38BDF8] shadow-[0_0_18px_rgba(56,189,248,0.6)]" />
              Premium Indian Digital Studio
            </div>

            <h1 ref={titleRef} className="mt-6 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl opacity-0">
              <span className="block text-white">Where Engineering</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-[#8B5CF6] to-[#06B6D4]">Meets Artistry</span>
            </h1>

            <p ref={subtitleRef} className="mt-6 max-w-xl text-base leading-7 text-white/70 sm:text-lg opacity-0">
              We craft cinematic digital experiences for modern Indian businesses — blending immersive 3D, premium motion design, and conversion-focused engineering that transforms visitors into believers.
            </p>

            <div ref={ctaRef} className="mt-8 flex flex-wrap gap-4 opacity-0">
              <a
                href="/custom-quote"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white shadow-[0_0_0_1px_rgba(255,255,255,0.06)] transition-all duration-300 hover:border-[#38BDF8]/30 hover:bg-white/10 hover:shadow-[0_0_25px_rgba(56,189,248,0.18)] hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_var(--x)_50%,rgba(56,189,248,0.35),transparent_55%)]" />
                </span>
                <span className="relative">Start Your Project</span>
                <span className="ml-2 relative transition group-hover:translate-x-1">→</span>
              </a>
              <a
                href="#story"
                className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#38BDF8]/20 via-[#8B5CF6]/20 to-[#06B6D4]/20 px-6 py-3 text-sm font-medium text-white shadow-[0_0_25px_rgba(56,189,248,0.15)] transition-all duration-300 hover:from-[#38BDF8]/30 hover:via-[#8B5CF6]/30 hover:to-[#06B6D4]/30 hover:shadow-[0_0_35px_rgba(56,189,248,0.25)] hover:scale-[1.02] active:scale-[0.98]"
              >
                Our Story
              </a>
            </div>
          </div>

          <div className="relative hidden lg:block env-height">
            <div className="absolute inset-0 rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent" />
            <div className="absolute inset-0 rounded-3xl">
              <StudioEnvironment
                reduced={reduced}
                className="!h-full !w-full rounded-3xl"
                cameraPosition={[0, 0.8, 5]}
                cameraFov={42}
              />
            </div>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0">
        <div className="flex flex-col items-center gap-2 text-white/40">
          <span className="text-xs uppercase tracking-[0.2em]">Scroll to explore</span>
          <div className="h-8 w-5 rounded-full border border-white/20 p-1">
            <div className="h-1.5 w-1.5 rounded-full bg-white/60 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}

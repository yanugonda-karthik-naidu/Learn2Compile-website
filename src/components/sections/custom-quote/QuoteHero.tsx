"use client";

import { useEffect, useRef } from "react";
import { StudioEnvironment } from "@/components/3d/environments/StudioEnvironment";
import { AtmosphericLayer } from "@/components/sections/cinematic/AtmosphericLayer";
import { gsap } from "gsap";
import { motion } from "@/lib/gsap/config";
import { useMotion } from "@/hooks/useMotion";

export function QuoteHero() {
  const { reduced } = useMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: motion.hero.delay });
      tl.fromTo(eyebrowRef.current, { y: motion.hero.badge.y, opacity: 0 }, { y: 0, opacity: 1, duration: motion.hero.badge.duration, ease: motion.hero.badge.ease })
        .fromTo(titleRef.current, { y: motion.hero.title.y, opacity: 0 }, { y: 0, opacity: 1, duration: motion.hero.title.duration, ease: motion.hero.title.ease }, motion.hero.title.overlap)
        .fromTo(subtitleRef.current, { y: motion.hero.subtitle.y, opacity: 0 }, { y: 0, opacity: 1, duration: motion.hero.subtitle.duration, ease: motion.hero.subtitle.ease }, motion.hero.subtitle.overlap)
        .fromTo(ctaRef.current, { y: motion.hero.cta.y, opacity: 0 }, { y: 0, opacity: 1, duration: motion.hero.cta.duration, ease: motion.hero.cta.ease }, motion.hero.cta.overlap);
    }, heroRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen overflow-hidden bg-[#050816]"
    >
      <div className="absolute inset-0">
        {/* Cinematic atmospheric layer */}
        <AtmosphericLayer variant="subtle" reducedMotion={reduced} />
        {!reduced && (
          <div className="absolute inset-0">
            <StudioEnvironment
              reduced={reduced}
              className="!absolute !inset-0"
              cameraPosition={[0, 0.5, 5]}
              cameraFov={45}
            />
          </div>
        )}
      </div>

      <div className="relative z-10 flex min-h-screen items-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div
              ref={eyebrowRef}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 opacity-0"
            >
              <span className="h-2 w-2 rounded-full bg-[#38BDF8] shadow-[0_0_18px_rgba(56,189,248,0.6)]" />
              Premium consultation
            </div>

            <h1
              ref={titleRef}
              className="mt-6 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl opacity-0"
            >
              <span className="text-white">Transmit your vision.</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-[#8B5CF6] to-[#06B6D4]">
                Receive a cinematic execution plan.
              </span>
            </h1>

            <p
              ref={subtitleRef}
              className="mt-6 max-w-xl text-base leading-7 text-white/70 sm:text-lg opacity-0"
            >
              Guided onboarding for Indian businesses—fast, business-first,
              and conversion-ready. Tell us about your project and receive a
              clear scope and timeline within 24 hours.
            </p>

            <div
              ref={ctaRef}
              className="mt-8 flex flex-wrap gap-4 opacity-0"
            >
              <a
                href="#quote-form"
                className="group inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white shadow-[0_0_0_1px_rgba(255,255,255,0.06)] transition-all duration-200 hover:border-[#38BDF8]/30 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(56,189,248,0.2)]"
              >
                <span>Start Your Project</span>
                <svg
                  className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
              <a
                href="/pricing"
                className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#38BDF8]/20 via-[#8B5CF6]/20 to-[#06B6D4]/20 px-6 py-3 text-sm font-medium text-white shadow-[0_0_30px_rgba(56,189,248,0.15)] transition-all duration-200 hover:from-[#38BDF8]/30 hover:via-[#8B5CF6]/30 hover:to-[#06B6D4]/30"
              >
                View Pricing Packages
              </a>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs uppercase tracking-[0.18em] text-white/50">
                  Response time
                </div>
                <div className="mt-2 text-sm font-semibold text-white">
                  Within 24 hours
                </div>
                <div className="mt-1 text-xs text-white/60">
                  Clear next steps, premium planning.
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs uppercase tracking-[0.18em] text-white/50">
                  Output format
                </div>
                <div className="mt-2 text-sm font-semibold text-white">
                  Timeline + scope document
                </div>
                <div className="mt-1 text-xs text-white/60">
                  Engineering-ready deliverables.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 text-white/40">
          <span className="text-xs uppercase tracking-[0.2em]">
            Scroll to begin
          </span>
          <div className="h-8 w-5 rounded-full border border-white/20 p-1">
            <div className="h-1.5 w-1.5 rounded-full bg-white/60 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
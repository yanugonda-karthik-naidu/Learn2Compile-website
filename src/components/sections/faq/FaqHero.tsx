"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { FaqEnvironment } from "@/components/3d/environments/FaqEnvironment";
import { AtmosphericLayer } from "@/components/sections/cinematic/AtmosphericLayer";
import { motion } from "@/lib/gsap/config";
import { useMotion } from "@/hooks/useMotion";

interface FaqHeroProps {
  onSearch?: (query: string) => void;
  searchValue?: string;
}

export function FaqHero({ onSearch, searchValue = "" }: FaqHeroProps) {
  const { reduced } = useMotion();
  const heroRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
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
        .fromTo(searchRef.current, { y: motion.hero.cta.y, opacity: 0 }, { y: 0, opacity: 1, duration: motion.hero.cta.duration, ease: motion.hero.cta.ease }, motion.hero.cta.overlap)
        .fromTo(ctaRef.current, { y: motion.hero.scrollHint.y, opacity: 0 }, { y: 0, opacity: 1, duration: motion.hero.scrollHint.duration, ease: motion.hero.scrollHint.ease }, motion.hero.scrollHint.overlap);
    }, heroRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={heroRef} className="relative min-h-screen overflow-hidden bg-[#050816]">
      <div className="absolute inset-0">
        {/* Cinematic atmospheric layer with parallax */}
        <AtmosphericLayer
          variant="subtle"
          mouseParallax={true}
          mousePosition={mouse}
          reducedMotion={reduced}
        />
      </div>

      <div className="relative z-10 flex min-h-screen items-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center py-12 sm:py-16 lg:py-0">
            <div>
              <div
                ref={badgeRef}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 opacity-0"
              >
                <span className="h-2 w-2 rounded-full bg-[#38BDF8] shadow-[0_0_18px_rgba(56,189,248,0.6)]" />
                Answers that matter
              </div>

              <h1
                ref={titleRef}
                className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl opacity-0"
              >
                <span className="block text-white">Questions about</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-[#8B5CF6] to-[#06B6D4]">
                  building together
                </span>
              </h1>

              <p
                ref={subtitleRef}
                className="mt-5 max-w-xl text-pretty text-base leading-7 text-white/70 opacity-0"
              >
                From timelines to technology, pricing to post-launch support—everything you need to know before starting your premium digital project.
              </p>

              <div ref={searchRef} className="mt-8 opacity-0">
                <div className="relative max-w-lg">
                  <div className="absolute inset-0 rounded-2xl border border-[#38BDF8]/20 bg-gradient-to-r from-[#38BDF8]/5 via-[#8B5CF6]/5 to-[#06B6D4]/5" />
                  <div className="absolute inset-0 rounded-2xl border border-[#38BDF8]/30 shadow-[0_0_40px_rgba(56,189,248,0.1)]" />
                  <div className="relative flex items-center gap-3 rounded-2xl border border-white/10 bg-[#050816]/60 backdrop-blur-xl px-4 py-3">
                    <svg
                      className="h-5 w-5 shrink-0 text-white/40"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search answers..."
                      value={searchValue}
                      onChange={(e) => onSearch?.(e.target.value)}
                      className="flex-1 bg-transparent text-sm text-white placeholder-white/30 outline-none"
                    />
                    {searchValue && (
                      <button
                        onClick={() => onSearch?.("")}
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-white/60 transition hover:bg-white/20 hover:text-white"
                        aria-label="Clear search"
                      >
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div ref={ctaRef} className="mt-8 flex flex-wrap gap-3 opacity-0">
                <a
                  href="/custom-quote"
                  className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white shadow-[0_0_0_1px_rgba(255,255,255,0.06)] transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:shadow-[0_0_25px_rgba(56,189,248,0.18)] hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_var(--x)_50%,rgba(56,189,248,0.35),transparent_55%)]" />
                  </span>
                  <span className="relative">Start Your Project</span>
                  <span className="ml-2 relative transition group-hover:translate-x-1">→</span>
                </a>
                <a
                  href="/contact"
                  className="group inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#38BDF8]/20 via-[#8B5CF6]/20 to-[#06B6D4]/20 px-5 py-3 text-sm font-medium text-white shadow-[0_0_25px_rgba(56,189,248,0.15)] transition-all duration-300 hover:from-[#38BDF8]/30 hover:via-[#8B5CF6]/30 hover:to-[#06B6D4]/30 hover:shadow-[0_0_35px_rgba(56,189,248,0.25)] hover:scale-[1.02] active:scale-[0.98]"
                >
                  <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  WhatsApp Inquiry
                </a>
              </div>
            </div>

            <div className="relative h-[280px] sm:h-[360px] lg:h-[480px]">
              <div className="absolute inset-0 rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-3" />
              <div className="absolute inset-0 rounded-3xl overflow-hidden">
                {!reduced && (
                  <FaqEnvironment reduced={reduced} className="!h-full !w-full rounded-3xl" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

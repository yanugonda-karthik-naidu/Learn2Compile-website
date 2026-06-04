"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { motion } from "@/lib/gsap/config";
import { useMotion } from "@/hooks/useMotion";

const showcaseCards = [
  {
    title: "Premium UI/UX",
    description: "Modern interfaces designed for trust and conversion.",
  },
  {
    title: "Performance First",
    description: "Fast loading experiences optimized for every device.",
  },
  {
    title: "Business Focused",
    description: "Built to generate leads, bookings, and growth.",
  },
  {
    title: "Future Ready",
    description: "Scalable architecture that grows with your business.",
  },
];

const trustMetrics = [
  { value: "10+", label: "Projects Delivered" },
  { value: "10+", label: "Happy Clients" },
  { value: "98%", label: "Client Satisfaction" },
];

export function AboutHeroSection() {
  const { reduced } = useMotion();
  const heroRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const floatingStatsRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: motion.hero.delay });
      tl.fromTo(badgeRef.current, { y: motion.hero.badge.y, opacity: 0 }, { y: 0, opacity: 1, duration: motion.hero.badge.duration, ease: motion.hero.badge.ease })
        .fromTo(titleRef.current, { y: motion.hero.title.y, opacity: 0 }, { y: 0, opacity: 1, duration: motion.hero.title.duration, ease: motion.hero.title.ease }, motion.hero.title.overlap)
        .fromTo(subtitleRef.current, { y: motion.hero.subtitle.y, opacity: 0 }, { y: 0, opacity: 1, duration: motion.hero.subtitle.duration, ease: motion.hero.subtitle.ease }, motion.hero.subtitle.overlap)
        .fromTo(metricsRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.3")
        .fromTo(ctaRef.current, { y: motion.hero.cta.y, opacity: 0 }, { y: 0, opacity: 1, duration: motion.hero.cta.duration, ease: motion.hero.cta.ease }, "-=0.2")
        .fromTo(showcaseRef.current, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 1.0, ease: "power3.out" }, "-=0.8")
        .fromTo(cardRefs.current.filter(Boolean), { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" }, "-=0.4")
        .fromTo(floatingStatsRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.3");

      // Floating animation for stat cards
      gsap.to(".floating-stat-top", {
        y: -8,
        duration: 2.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(".floating-stat-bottom", {
        y: 8,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 0.5,
      });
    }, heroRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={heroRef} className="relative min-h-screen overflow-hidden bg-[#050816]">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-[#38BDF8]/10 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 h-[400px] w-[400px] rounded-full bg-[#8B5CF6]/10 blur-[100px]" />
        <div className="absolute top-1/3 left-1/2 h-[350px] w-[350px] rounded-full bg-[#EC4899]/8 blur-[90px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid min-h-screen items-center gap-12 lg:grid-cols-[2fr_3fr] lg:gap-16">
          {/* LEFT CONTENT */}
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
              Learn2Compile is a modern digital studio focused on creating high-performance websites that blend cinematic design, advanced engineering, and business-driven strategy.
              <br className="hidden sm:block" />
              We help brands build trust, attract customers, and grow through digital experiences that look premium and perform even better.
            </p>

            {/* Trust Metrics */}
            <div ref={metricsRef} className="mt-8 grid grid-cols-3 gap-3 opacity-0">
              {trustMetrics.map((metric, index) => (
                <div key={index} className="group relative rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all duration-500 hover:border-[#38BDF8]/30 hover:bg-white/[0.06]">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/[0.03] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative">
                    <p className="text-2xl font-semibold text-white sm:text-3xl">{metric.value}</p>
                    <p className="mt-1 text-xs text-white/50 sm:text-sm">{metric.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="mt-8 flex flex-wrap gap-4 opacity-0">
              <a
                href="/custom-quote"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white shadow-[0_0_0_1px_rgba(255,255,255,0.06)] transition-all duration-300 hover:border-[#38BDF8]/30 hover:bg-white/10 hover:shadow-[0_0_35px_rgba(56,189,248,0.25)] hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Start Your Project</span>
                <span className="ml-2 relative transition group-hover:translate-x-1">→</span>
              </a>
              <a
                href="#story"
                className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#38BDF8]/20 via-[#8B5CF6]/20 to-[#06B6D4]/20 px-6 py-3 text-sm font-medium text-white shadow-[0_0_25px_rgba(56,189,248,0.15)] transition-all duration-300 hover:from-[#38BDF8]/30 hover:via-[#8B5CF6]/30 hover:to-[#06B6D4]/30 hover:shadow-[0_0_35px_rgba(56,189,248,0.25)] hover:scale-[1.02] active:scale-[0.98]"
              >
                Explore Our Journey
              </a>
            </div>
          </div>

          {/* RIGHT SHOWCASE */}
          <div ref={showcaseRef} className="relative hidden lg:block opacity-0">
            <div className="relative rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              {/* Floating background orbs inside showcase */}
              <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-[#38BDF8]/15 blur-[60px]" />
              <div className="absolute -bottom-20 -left-20 h-36 w-36 rounded-full bg-[#8B5CF6]/15 blur-[50px]" />

              {/* Label */}
              <p className="mb-4 text-center text-xs font-medium uppercase tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-[#8B5CF6] to-[#EC4899]">
                Why Clients Choose Learn2Compile
              </p>

              {/* 2x2 Grid */}
              <div className="relative grid grid-cols-2 gap-4">
                {showcaseCards.map((card, index) => (
                  <div
                    key={index}
                    ref={(el) => { cardRefs.current[index] = el; }}
                    className="group relative rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#38BDF8]/30 hover:bg-white/[0.06] hover:shadow-[0_0_45px_rgba(56,189,248,0.08)]"
                  >
                    {/* Animated top glow line */}
                    <div className="absolute top-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#38BDF8] via-[#8B5CF6] to-[#EC4899] transition-all duration-500 group-hover:w-full" />

                    <h3 className="text-base font-semibold text-white">{card.title}</h3>
                    <p className="mt-2 text-sm text-white/60">{card.description}</p>
                  </div>
                ))}
              </div>

              {/* Micro trust statement */}
              <p className="mt-5 text-center text-xs text-white/40">
                Premium design. Reliable engineering. Long-term partnership.
              </p>
            </div>

            {/* Floating Stats */}
            <div ref={floatingStatsRef} className="absolute -top-4 -right-4 -bottom-4 pointer-events-none">
              <div className="floating-stat-top absolute -top-6 right-8 rounded-xl border border-white/10 bg-[#050816]/80 px-4 py-3 backdrop-blur-md">
                <p className="text-2xl font-semibold text-white">10+</p>
                <p className="text-xs text-white/60">Projects</p>
              </div>
              <div className="floating-stat-bottom absolute -bottom-6 right-16 rounded-xl border border-white/10 bg-[#050816]/80 px-4 py-3 backdrop-blur-md">
                <p className="text-2xl font-semibold text-white">24/7</p>
                <p className="text-xs text-white/60">Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

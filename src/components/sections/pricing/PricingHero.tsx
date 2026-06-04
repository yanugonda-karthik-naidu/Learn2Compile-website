"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { motion } from "@/lib/gsap/config";
import { useMotion } from "@/hooks/useMotion";

const trustIndicators = [
  { text: "Fixed Scope Pricing" },
  { text: "SEO Foundation Included" },
  { text: "Mobile Responsive Included" },
  { text: "Performance Optimized" },
  { text: "Post Launch Support" },
  { text: "Conversion Focused Structure" },
];

const philosophyFeatures = [
  "Premium Design Systems",
  "Conversion Focused UX",
  "Performance First Development",
  "SEO Ready Architecture",
  "Mobile First Engineering",
  "Ongoing Support Options",
];

const metrics = [
  { value: "10+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "24/7", label: "Support Availability" },
];

export function PricingHero() {
  const { reduced } = useMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const microLabelRef = useRef<HTMLDivElement>(null);
  const titleLine1Ref = useRef<HTMLSpanElement>(null);
  const titleLine2Ref = useRef<HTMLSpanElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const credibilityRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const cardFeaturesRef = useRef<(HTMLLIElement | null)[]>([]);
  const metricsRef = useRef<HTMLDivElement>(null);
  const floatingOrbRef = useRef<HTMLDivElement>(null);
  const rupeeIconRef = useRef<HTMLDivElement>(null);
  const starIconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: motion.hero.delay });

      // Badge and micro label
      tl.fromTo(badgeRef.current, { y: motion.hero.badge.y, opacity: 0 }, { y: 0, opacity: 1, duration: motion.hero.badge.duration, ease: motion.hero.badge.ease })
        .fromTo(microLabelRef.current, { y: 8, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, "-=0.3")
        // Title lines reveal
        .fromTo(titleLine1Ref.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "expo.out" }, "-=0.2")
        .fromTo(titleLine2Ref.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "expo.out" }, "-=0.5")
        // Description and trust
        .fromTo(descriptionRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" }, "-=0.4")
        .fromTo(trustRef.current, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.3")
        // CTA and credibility
        .fromTo(ctaRef.current, { y: motion.hero.cta.y, opacity: 0 }, { y: 0, opacity: 1, duration: motion.hero.cta.duration, ease: motion.hero.cta.ease }, "-=0.2")
        .fromTo(credibilityRef.current, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, "-=0.2")
        // Right side card
        .fromTo(cardRef.current, { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 1.0, ease: "power3.out" }, "-=0.8")
        .fromTo(cardFeaturesRef.current.filter(Boolean), { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.06, ease: "power2.out" }, "-=0.4")
        .fromTo(metricsRef.current, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, "-=0.2");

      // Floating orb animation
      gsap.to(floatingOrbRef.current, {
        y: -20,
        x: 10,
        duration: 6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Badge glow pulse
      gsap.to(".badge-glow", {
        boxShadow: "0 0 25px rgba(56,189,248,0.8)",
        duration: 1.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Floating rupee icon animation
      gsap.to(rupeeIconRef.current, {
        y: -6,
        duration: 4.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Floating star icon animation
      gsap.to(starIconRef.current, {
        y: 6,
        duration: 5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Card hover effect
      const cardEl = cardRef.current;
      if (cardEl) {
        cardEl.addEventListener("mouseenter", () => {
          gsap.to(cardEl, { y: -6, duration: 0.3, ease: "power2.out" });
        });
        cardEl.addEventListener("mouseleave", () => {
          gsap.to(cardEl, { y: 0, duration: 0.3, ease: "power2.out" });
        });
      }
    }, heroRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-[#050816] pt-24 sm:pt-28 lg:pt-36"
    >
      {/* Subtle background orbs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute left-0 top-1/4 h-[500px] w-[500px] rounded-full bg-[rgba(56,189,248,0.08)] blur-[120px]" />
        <div className="absolute left-1/3 top-1/2 h-[300px] w-[300px] rounded-full bg-[rgba(99,102,241,0.06)] blur-[100px]" />
        <div className="absolute right-0 bottom-1/4 h-[400px] w-[400px] rounded-full bg-[rgba(139,92,246,0.08)] blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-[60px]">
          {/* LEFT SIDE - 55% */}
          <div className="flex flex-col justify-center">
            {/* Badge */}
            <div
              ref={badgeRef}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/80 opacity-0 mb-6"
            >
              <span className="badge-glow h-2 w-2 rounded-full bg-[#38BDF8] shadow-[0_0_18px_rgba(56,189,248,0.6)]" />
              Premium Digital Investment
            </div>

            {/* Micro Label */}
            <div
              ref={microLabelRef}
              className="mt-3 text-xs font-medium uppercase tracking-[0.25em] text-white/50 opacity-0"
            >
              Transparent Pricing Framework
            </div>

            {/* Headline */}
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
              <span ref={titleLine1Ref} className="block opacity-0">
                Premium Websites.
              </span>
              <span ref={titleLine2Ref} className="block bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 opacity-0">
                Built For Growth.
              </span>
            </h1>

            {/* Description */}
            <p
              ref={descriptionRef}
              className="mt-6 max-w-[600px] text-base leading-[1.8] text-white/80 opacity-0 sm:text-lg"
            >
              Every package is engineered around business outcomes—not just pages and features. We combine premium design, conversion-focused strategy, and scalable engineering to help businesses grow with confidence.
            </p>

            {/* Trust Indicators - compact 2-column wrapping */}
            <div
              ref={trustRef}
              className="mt-6 grid max-w-lg grid-cols-2 gap-2 opacity-0"
            >
              {trustIndicators.map((indicator, index) => (
                <div
                  key={index}
                  className="group flex w-fit items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-1.5 transition-all duration-300 hover:border-[#38BDF8]/30 hover:bg-white/[0.04] hover:shadow-[0_0_12px_rgba(56,189,248,0.08)]"
                >
                  <span className="text-sm text-[#38BDF8]">✓</span>
                  <span className="whitespace-nowrap text-sm text-white/70">{indicator.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div
              ref={ctaRef}
              className="mt-6 flex flex-wrap gap-3 opacity-0"
            >
              <a
                href="/custom-quote"
                className="group relative inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#38BDF8] via-[#6366F1] to-[#8B5CF6] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(56,189,248,0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_45px_rgba(56,189,248,0.4)] active:scale-[0.98]"
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
                href="#pricing-cards"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white shadow-[0_0_0_1px_rgba(255,255,255,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#38BDF8]/30 hover:bg-white/10 active:scale-[0.98]"
              >
                <span className="relative z-10">Explore Packages</span>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </a>
            </div>

            {/* Client Credibility Strip */}
            <div
              ref={credibilityRef}
              className="mt-4 opacity-0"
            >
              <p className="text-xs text-white/40">
                Trusted by: <span className="text-white/50">Startups</span> • <span className="text-white/50">Local Businesses</span> • <span className="text-white/50">Wedding Planners</span> • <span className="text-white/50">Coaching Institutes</span> • <span className="text-white/50">Personal Brands</span>
              </p>
            </div>
          </div>

          {/* RIGHT SIDE - Premium Glass Card - 45% */}
          <div className="relative hidden lg:block mt-8 lg:mt-12">
            <div
              ref={cardRef}
              className="group relative rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-[#38BDF8]/20 hover:bg-white/[0.05] hover:shadow-[0_0_60px_rgba(56,189,248,0.1)] opacity-0"
              style={{
                background: "linear-gradient(135deg, rgba(56,189,248,0.08) 0%, rgba(139,92,246,0.08) 100%), rgba(255,255,255,0.02)",
              }}
            >
              <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-[#38BDF8]/10 blur-[80px]" />
              <div className="absolute -bottom-24 -left-24 h-44 w-44 rounded-full bg-[#8B5CF6]/10 blur-[70px]" />

              <div className="relative p-8">
                {/* Card Header */}
                <div className="mb-6">
                  <h3 className="text-3xl font-semibold text-white">
                    Investment Philosophy
                  </h3>
                  <div className="mt-2 h-0.5 w-16 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500" />
                  <p className="mt-4 text-sm leading-relaxed text-white/60">
                    We build pricing packages around business outcomes, performance, and long-term growth rather than unnecessary features.
                  </p>
                </div>

                {/* Features List */}
                <ul className="space-y-4">
                  {philosophyFeatures.map((feature, index) => (
                    <li
                      key={index}
                      ref={(el) => { cardFeaturesRef.current[index] = el; }}
                      className="flex items-center gap-3 text-sm text-white/70 transition-all duration-300 hover:text-white/90"
                    >
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-[#38BDF8]/20 to-[#8B5CF6]/20 text-xs text-[#38BDF8]">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Divider */}
                <div className="my-6 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                {/* Metrics Row */}
                <div ref={metricsRef} className="grid grid-cols-3 gap-4">
                  {metrics.map((metric, index) => (
                    <div key={index} className="text-center">
                      <p className="text-2xl font-semibold text-white">{metric.value}</p>
                      <p className="mt-1 text-xs text-white/50">{metric.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating rupee icon - top right corner */}
              <div
                ref={rupeeIconRef}
                className="absolute h-16 w-16 rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-[20px]"
                style={{
                  top: "-22px",
                  right: "-22px",
                  opacity: 0.9,
                }}
              >
                <div className="flex h-full items-center justify-center">
                  <span className="text-2xl font-bold text-white/30">₹</span>
                </div>
              </div>

              {/* Floating star icon - bottom left corner */}
              <div
                ref={starIconRef}
                className="absolute h-[52px] w-[52px] rounded-xl border border-white/10 bg-white/[0.05] backdrop-blur-[20px]"
                style={{
                  bottom: "24px",
                  left: "-22px",
                  opacity: 0.75,
                }}
              >
                <div className="flex h-full items-center justify-center">
                  <span className="text-lg font-bold text-white/20">★</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { motion } from "@/lib/gsap/config";
import { useMotion } from "@/hooks/useMotion";

const FAQ_PREVIEW_QUESTIONS = [
  "How long does a website take to build?",
  "Do you provide hosting and domain setup?",
  "Can I request revisions during development?",
  "Will my website be mobile responsive?",
  "Do you provide support after launch?",
];

const TRUST_STRIP = [
  "10+ Projects Delivered",
  "98% Client Satisfaction",
  "24/7 Support",
];

export function FaqHero() {
  const { reduced } = useMotion();
  const heroRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const questionsRef = useRef<HTMLDivElement>(null);
  const trustStripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: motion.hero.delay });
      tl.fromTo(badgeRef.current, { y: motion.hero.badge.y, opacity: 0 }, { y: 0, opacity: 1, duration: motion.hero.badge.duration, ease: motion.hero.badge.ease })
        .fromTo(titleRef.current, { y: motion.hero.title.y, opacity: 0 }, { y: 0, opacity: 1, duration: motion.hero.title.duration, ease: motion.hero.title.ease }, motion.hero.title.overlap)
        .fromTo(subtitleRef.current, { y: motion.hero.subtitle.y, opacity: 0 }, { y: 0, opacity: 1, duration: motion.hero.subtitle.duration, ease: motion.hero.subtitle.ease }, motion.hero.subtitle.overlap)
        .fromTo(ctaRef.current, { y: motion.hero.cta.y, opacity: 0 }, { y: 0, opacity: 1, duration: motion.hero.cta.duration, ease: motion.hero.cta.ease }, motion.hero.cta.overlap)
        .fromTo(cardRef.current, { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.5");
    }, heroRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={heroRef} className="relative min-h-screen overflow-hidden bg-[#050816]">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(56,189,248,0.12),transparent_50%),radial-gradient(ellipse_at_80%_70%,rgba(139,92,246,0.10),transparent_50%)]" />

      <div className="relative z-10 flex min-h-screen items-center py-12 sm:py-16 lg:py-0">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[55fr_45fr] lg:items-center">
            {/* LEFT SIDE - 55% */}
            <div>
              <div
                ref={badgeRef}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white/80 opacity-0"
              >
                <span className="h-2 w-2 rounded-full bg-[#38BDF8] shadow-[0_0_18px_rgba(56,189,248,0.6)]" />
                Answers That Matter
              </div>

              <h1
                ref={titleRef}
                className="mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] font-semibold leading-[1.1] tracking-tight opacity-0"
              >
                <span className="block text-white">Everything You Need</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-[#8B5CF6] to-[#06B6D4]">
                  To Know Before We Build Together
                </span>
              </h1>

              <p
                ref={subtitleRef}
                className="mt-5 max-w-xl text-pretty text-base leading-7 text-white/70 opacity-0"
              >
                Common questions about pricing, timelines, technology, support, SEO, and project delivery—answered upfront so you can make informed decisions before reaching out.
              </p>

              {/* CTA BUTTONS */}
              <div ref={ctaRef} className="mt-8 flex flex-wrap gap-3 opacity-0">
                <a
                  href="/custom-quote"
                  className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white shadow-[0_0_0_1px_rgba(255,255,255,0.06)] transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:shadow-[0_0_25px_rgba(56,189,248,0.18)] hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Start Your Project</span>
                  <span className="ml-2 transition group-hover:translate-x-1">→</span>
                </a>
                <a
                  href="/contact"
                  className="group inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#38BDF8]/20 via-[#8B5CF6]/20 to-[#06B6D4]/20 px-6 py-3 text-sm font-medium text-white shadow-[0_0_25px_rgba(56,189,248,0.15)] transition-all duration-300 hover:from-[#38BDF8]/30 hover:via-[#8B5CF6]/30 hover:to-[#06B6D4]/30 hover:shadow-[0_0_35px_rgba(56,189,248,0.25)] hover:scale-[1.02] active:scale-[0.98]"
                >
                  <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  WhatsApp Inquiry
                </a>
              </div>
            </div>

            {/* RIGHT SIDE - 45% FREQUENTLYLY ASKED CARD */}
            <div ref={cardRef} className="relative opacity-0">
              <div className="relative rounded-[32px] border border-white/8 bg-white/3 p-8 backdrop-blur-[20px] shadow-[0_0_80px_rgba(56,189,248,0.05)]">
                {/* Header */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-white">Frequently Asked</h3>
                  <p className="mt-1 text-sm text-white/50">
                    The most common questions clients ask before starting a project.
                  </p>
                </div>

                {/* Questions List */}
                <div ref={questionsRef} className="space-y-3">
                  {FAQ_PREVIEW_QUESTIONS.map((question, i) => (
                    <div
                      key={i}
                      className="group flex items-start gap-4 rounded-2xl border border-white/8 bg-white/5 p-4 transition-all duration-300 hover:border-white/15 hover:bg-white/8 hover:shadow-[0_0_30px_rgba(56,189,248,0.08)] hover:-translate-y-0.5"
                    >
                      <span className="mt-0.5 text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#8B5CF6]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm text-white/80 leading-relaxed">{question}</span>
                    </div>
                  ))}
                </div>

                {/* Trust Strip */}
                <div ref={trustStripRef} className="mt-6 flex items-center justify-between gap-4 rounded-xl border border-white/8 bg-white/5 px-4 py-3">
                  {TRUST_STRIP.map((item, i) => (
                    <span key={i} className="text-xs text-white/60">{item}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
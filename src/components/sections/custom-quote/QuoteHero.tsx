"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useMotion } from "@/hooks/useMotion";

const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

function TrustPill({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70">
      <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#38BDF8]/20">
        <CheckIcon className="h-2.5 w-2.5 text-[#38BDF8]" />
      </span>
      <span>{label}</span>
    </div>
  );
}

function ConsultationCard() {
  return (
    <div className="relative rounded-[24px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl shadow-[inset_0_0_40px_rgba(56,189,248,0.06),0_8px_40px_rgba(0,0,0,0.4)]">
      <div className="absolute inset-0 rounded-[24px] bg-gradient-to-br from-white/[0.04] via-transparent to-[#38BDF8]/[0.06]" />
      <div className="absolute inset-[1px] rounded-[23px] border border-white/[0.06]" />

      <div className="relative">
        <div className="text-xs uppercase tracking-[0.18em] text-white/50">
          What You&apos;ll Receive
        </div>

        <div className="mt-6 space-y-3">
          {[
            "Budget Estimate",
            "Feature Roadmap",
            "Development Timeline",
            "Technical Recommendations",
            "SEO Suggestions",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <span className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#38BDF8]/15">
                <CheckIcon className="h-3 w-3 text-[#38BDF8]" />
              </span>
              <span className="text-sm text-white/80">{item}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 h-px bg-white/10" />

        <div className="mt-6">
          <div className="text-xs uppercase tracking-[0.18em] text-white/50">
            Response Time
          </div>
          <div className="mt-2 text-sm font-semibold text-white">
            Within 24 Hours
          </div>
        </div>

        <div className="mt-6 h-px bg-white/10" />

        <div className="mt-6">
          <div className="text-xs uppercase tracking-[0.18em] text-white/50">
            Planning Includes
          </div>
          <div className="mt-3 space-y-2">
            {["Business Analysis", "Feature Mapping", "Execution Strategy"].map(
              (item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="inline-flex h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8B5CF6]" />
                  <span className="text-sm text-white/70">{item}</span>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function BenefitCard({ title }: { title: string }) {
  return (
    <div className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08]">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.03] via-transparent to-[#38BDF8]/[0.05] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative">
        <div className="text-sm font-medium text-white">{title}</div>
        <div className="mt-1 text-xs text-white/50">Detailed breakdown included</div>
      </div>
    </div>
  );
}

export function QuoteHero() {
  const { reduced } = useMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.4 });

      tl.fromTo(
        eyebrowRef.current,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      )
        .fromTo(
          titleRef.current,
          { y: 55, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.0, ease: "expo.out" },
          -0.45
        )
        .fromTo(
          subtitleRef.current,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
          -0.55
        )
        .fromTo(
          ctaRef.current,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "back.out(1.2)" },
          -0.4
        );

      if (pillsRef.current) {
        const pills = pillsRef.current.children;
        gsap.set(pills, { opacity: 0, y: 8, scale: 0.98 });
        tl.to(
          pills,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.35,
            ease: "power2.out",
            stagger: 0.08,
          },
          -0.2
        );
      }

      if (cardRef.current) {
        tl.fromTo(
          cardRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          -0.3
        );
      }

      if (benefitsRef.current) {
        const cards = benefitsRef.current.children;
        gsap.set(cards, { opacity: 0, y: 20 });
        tl.to(
          cards,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.1,
          },
          -0.3
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, [reduced]);

  const benefits = [
    "Budget Estimate",
    "Timeline Roadmap",
    "Feature Planning",
    "Technical Guidance",
  ];

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen overflow-hidden bg-[#050816]"
    >
      {/* Background gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute left-1/4 top-0 h-[400px] w-[400px] rounded-full bg-[#38BDF8]/10 blur-[120px]" />
        <div className="absolute right-1/4 bottom-0 h-[360px] w-[360px] rounded-full bg-[#8B5CF6]/10 blur-[110px]" />
        <div className="absolute left-1/2 bottom-1/4 h-[300px] w-[300px] rounded-full bg-[#06B6D4]/7 blur-[90px]" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Two-column: 55% left / 45% right */}
        <div className="flex min-h-screen items-center py-16 sm:py-20 lg:py-24">
          {/* LEFT SIDE - 55% */}
          <div className="w-full lg:w-[55%] pr-0 lg:pr-12">
            {/* Badge */}
            <div
              ref={eyebrowRef}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80 opacity-0"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#38BDF8] opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#38BDF8]" />
              </span>
              Premium Consultation Studio
            </div>

            {/* Headline */}
            <h1
              ref={titleRef}
              className="mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight opacity-0"
            >
              <span className="text-white">Custom Website Consultation</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-[#8B5CF6] to-[#06B6D4]">
                &amp; Project Estimation
              </span>
            </h1>

            {/* Description */}
            <p
              ref={subtitleRef}
              className="mt-6 max-w-xl text-base leading-7 text-white/70 sm:text-lg opacity-0"
            >
              Tell us about your business, requirements, and goals.
              <br />
              Receive a tailored website strategy, estimated budget, feature
              roadmap, and project timeline.
            </p>

            {/* CTAs */}
            <div
              ref={ctaRef}
              className="mt-8 flex flex-wrap gap-4 opacity-0"
            >
              <a
                href="#quote-form"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#38BDF8] via-[#8B5CF6] to-[#06B6D4] px-7 py-4 text-sm font-semibold text-white shadow-[0_0_28px_rgba(56,189,248,0.25)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(56,189,248,0.35)] active:scale-[0.98]"
              >
                Get Free Consultation
                {/* <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" /> */}
              </a>
              <a
                href="/pricing"
                className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-7 py-4 text-sm font-semibold text-white/90 backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98]"
              >
                View Pricing
              </a>
            </div>

            {/* Trust Pills */}
            <div ref={pillsRef} className="mt-8 flex flex-wrap gap-3">
              <TrustPill label="Free Consultation" />
              <TrustPill label="Transparent Pricing" />
              <TrustPill label="Timeline Included" />
              <TrustPill label="24 Hour Response" />
            </div>
          </div>

          {/* RIGHT SIDE - 45% */}
          <div className="hidden lg:flex lg:w-[45%] items-center justify-center">
            <div ref={cardRef} className="w-full max-w-[420px] opacity-0">
              <ConsultationCard />
            </div>
          </div>
        </div>

        {/* BOTTOM BENEFITS */}
        <div className="pb-16 sm:pb-20 lg:pb-24">
          <div
            ref={benefitsRef}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {benefits.map((title) => (
              <BenefitCard key={title} title={title} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

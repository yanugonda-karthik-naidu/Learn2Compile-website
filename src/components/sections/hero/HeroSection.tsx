"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useMotion } from "@/hooks/useMotion";

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
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
  );
}

export function HeroSection() {
  const { reduced } = useMotion();

  const heroRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const capabilityRef = useRef<HTMLDivElement>(null);
  const capabilityItemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      // Badge
      if (badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        );
      }

      // Headline
      if (headlineRef.current) {
        tl.fromTo(
          headlineRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.35",
        );
      }

      // Description
      if (descriptionRef.current) {
        tl.fromTo(
          descriptionRef.current,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "+=0.2",
        );
      }

      // CTA Buttons
      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "+=0.1",
        );
      }

      // Trust Strip
      if (trustRef.current) {
        tl.fromTo(
          trustRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
          "-=0.2",
        );
      }

      // Capability Panel
      if (capabilityRef.current) {
        tl.fromTo(
          capabilityRef.current,
          { x: 40, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.5",
        );
      }

      // Capability Items stagger
      const itemEls = capabilityItemsRef.current?.querySelectorAll<HTMLElement>(
        '[data-capability-item="true"]',
      );
      if (itemEls && itemEls.length > 0) {
        tl.fromTo(
          itemEls,
          { y: 15, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power3.out",
            stagger: 0.08,
          },
          "-=0.3",
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[90vh] w-full bg-[#050816] overflow-hidden pt-32 pb-24 md:pt-28 md:pb-20"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-[#050816]"
        style={{
          backgroundImage: `radial-gradient(ellipse at center, rgba(56,189,248,0.08) 0%, rgba(139,92,246,0.08) 50%, rgba(5,8,22,1) 100%)`,
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
          {/* LEFT COLUMN - Primary Content */}
          <div className="w-full lg:w-[60%]">
            {/* Badge */}
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-2 text-sm text-white/80 opacity-0"
            >
              <span className="h-2 w-2 rounded-full bg-[#38BDF8]" />
              <span className="font-medium">L2C Web Studio</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Build For Growth</span>
            </div>

            {/* Headline */}
            <h1
              ref={headlineRef}
              className="mt-6 text-4xl font-extrabold leading-[0.95] tracking-tight text-white opacity-0 md:text-5xl lg:text-6xl xl:text-7xl"
            >
              <span className="block">Build Trust.</span>
              <span className="block">Win Customers.</span>
              <span className="block">
                <span className="bg-gradient-to-r from-[#38BDF8] to-[#8B5CF6] bg-clip-text text-transparent">
                  Grow Online.
                </span>
              </span>
            </h1>

            {/* Description */}
            <p
              ref={descriptionRef}
              className="mt-5 max-w-[650px] text-lg leading-relaxed text-white/70 opacity-0 md:text-xl"
            >
              Professional websites designed for startups, local businesses, wedding
              planners, restaurants, coaching institutes and creators who want a
              stronger online presence and more customer inquiries.
            </p>

            {/* CTA Section */}
            <div ref={ctaRef} className="mt-8 flex flex-col gap-4 sm:flex-row opacity-0">
              <a
                href="/custom-quote"
                className="group flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#38BDF8] to-[#8B5CF6] px-6 py-4 text-base font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 active:translate-y-0"
              >
                Start Your Project
                <ArrowIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="/portfolio"
                className="group flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-4 text-base font-semibold text-white/90 backdrop-blur-sm transition-colors duration-300 hover:border-white/30 hover:bg-white/10"
              >
                View Portfolio
              </a>
            </div>

            {/* Trust Strip */}
            <div
              ref={trustRef}
              className="mt-8 flex flex-wrap gap-3 opacity-0"
              aria-label="Trust indicators"
            >
              {[
                { text: "10+ Projects Delivered", check: true },
                { text: "98% Client Satisfaction", check: true },
                { text: "24-Hour Response", check: true },
                { text: "Source Code Ownership", check: true },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80"
                >
                  <CheckIcon className="h-3.5 w-3.5 text-[#38BDF8]" />
                  {item.text}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN - Capability Panel */}
          <div ref={capabilityRef} className="w-full lg:w-[40%] opacity-0">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md md:p-8">
              {/* Top Label */}
              <div className="text-sm font-medium uppercase tracking-wider text-white/50">
                Studio Capabilities
              </div>

              {/* Title */}
              <h2 className="mt-2 text-2xl font-bold leading-tight text-white md:text-3xl">
                Built For Business Growth
              </h2>

              {/* Divider */}
              <div className="mt-6 border-t border-white/10" />

              {/* Capability Items */}
              <div
                ref={capabilityItemsRef}
                className="mt-6 flex flex-col gap-4"
              >
                {[
                  "Mobile First Development",
                  "SEO Ready Structure",
                  "Fast Performance",
                  "Premium UI Design",
                  "Conversion Focused",
                  "Secure Deployment",
                ].map((item) => (
                  <div
                    key={item}
                    data-capability-item="true"
                    className="flex items-center gap-3"
                  >
                    <CheckIcon className="h-4 w-4 flex-shrink-0 text-[#38BDF8]" />
                    <span className="text-base text-white/80">{item}</span>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="mt-6 border-t border-white/10" />

              {/* Response Section */}
              <div className="mt-6">
                <div className="text-sm text-white/50">Typical Response Time</div>
                <div className="mt-1 text-lg font-semibold text-white">
                  Within 24 Hours
                </div>
                <p className="mt-2 text-sm text-white/60">
                  Every project begins with a detailed consultation and clear scope
                  planning.
                </p>
              </div>

              {/* Trusted By */}
              <div className="mt-6 border-t border-white/10 pt-6">
                <div className="mb-3 text-sm text-white/50">Trusted by:</div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Startups",
                    "Wedding Planners",
                    "Restaurants",
                    "Coaching Institutes",
                    "Creators",
                    "Local Businesses",
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70"
                    >
                      {item}
                    </span>
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
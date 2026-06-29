"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useMotion } from "@/hooks/useMotion";

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

const industryPills = [
  "Wedding Planners",
  "Restaurants",
  "Coaching Institutes",
  "Startups",
  "Creators",
  "Local Businesses",
];

const showcasePanelItems = [
  {
    title: "Mobile First",
    description: "Designed for every screen size.",
  },
  {
    title: "SEO Optimized",
    description: "Built for visibility and discoverability.",
  },
  {
    title: "Fast Performance",
    description: "Optimized for speed and user experience.",
  },
  {
    title: "Conversion Focused",
    description: "Designed to generate inquiries and leads.",
  },
  {
    title: "Premium UI",
    description: "Modern interfaces that build trust.",
  },
  {
    title: "Custom Built",
    description: "Every project tailored to business goals.",
  },
];

const trustItems = [
  { text: "10+ Projects Delivered" },
  { text: "98% Satisfaction" },
  { text: "24h Response" },
  { text: "Source Ownership" },
];

export function PortfolioHeroSection() {
  const { reduced } = useMotion();
  const heroRef = useRef<HTMLElement>(null);

  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const industryLabelRef = useRef<HTMLParagraphElement>(null);
  const industryPillsRef = useRef<HTMLDivElement>(null);
  const showcasePanelRef = useRef<HTMLDivElement>(null);
  const showcaseItemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      // Badge
      if (badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
        );
      }

      // Headline
      if (headlineRef.current) {
        tl.fromTo(
          headlineRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.35"
        );
      }

      // Description
      if (descriptionRef.current) {
        tl.fromTo(
          descriptionRef.current,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "+=0.15"
        );
      }

      // CTA Buttons
      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "+=0.25"
        );
      }

      // Trust Indicators - stagger animation
      const trustPills = trustRef.current?.querySelectorAll<HTMLElement>(
        '[data-trust-pill="true"]'
      );
      if (trustPills && trustPills.length > 0) {
        tl.fromTo(
          trustPills,
          { y: 15, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power3.out",
            stagger: 0.08,
          },
          "+=0.1"
        );
      }

      // Industry Label and Pills
      if (industryLabelRef.current) {
        tl.fromTo(
          industryLabelRef.current,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
          "+=0.1"
        );
      }

      const pills = industryPillsRef.current?.querySelectorAll<HTMLElement>(
        '[data-industry-pill="true"]'
      );
      if (pills && pills.length > 0) {
        tl.fromTo(
          pills,
          { y: 15, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power3.out",
            stagger: 0.05,
          },
          "+=0.05"
        );
      }

      // Showcase Panel
      if (showcasePanelRef.current) {
        tl.fromTo(
          showcasePanelRef.current,
          { x: 40, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.6"
        );
      }

      // Showcase items stagger
      const showcaseItems = showcaseItemsRef.current?.querySelectorAll<HTMLElement>(
        '[data-showcase-item="true"]'
      );
      if (showcaseItems && showcaseItems.length > 0) {
        tl.fromTo(
          showcaseItems,
          { y: 15, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power3.out",
            stagger: 0.06,
          },
          "-=0.3"
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[calc(100vh-80px)] w-full overflow-hidden bg-[#050816] pt-24 pb-16 md:pt-28 md:pb-20"
    >
      {/* Background - subtle gradients only */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute left-1/4 top-1/3 h-[400px] w-[400px] rounded-full bg-[rgba(56,189,248,0.08)] blur-[100px]"
        />
        <div
          className="absolute right-1/4 bottom-1/3 h-[350px] w-[350px] rounded-full bg-[rgba(139,92,246,0.08)] blur-[100px]"
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
          {/* LEFT COLUMN - Primary Content (60%) */}
          <div className="w-full lg:w-[60%]">
            {/* Badge */}
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-2 text-sm text-white/80 opacity-0"
            >
              <span className="h-2 w-2 rounded-full bg-[#38BDF8]" />
              <span className="font-medium">Project Showcase</span>
            </div>

            {/* Headline */}
            <h1
              ref={headlineRef}
              className="mt-6 text-4xl font-extrabold leading-[0.95] tracking-tight text-white opacity-0 md:text-5xl lg:text-6xl xl:text-7xl max-w-4xl"
            >
              <span className="block">Projects Built</span>
              <span className="block">
                <span className="bg-gradient-to-r from-[#38BDF8] via-[#8B5CF6] to-[#06B6D4] bg-clip-text text-transparent">
                  For Real Businesses
                </span>
              </span>
            </h1>

            {/* Description */}
            <p
              ref={descriptionRef}
              className="mt-5 max-w-[700px] text-lg leading-relaxed text-white/70 opacity-0 md:text-xl"
            >
              Explore websites crafted for startups, local businesses, wedding planners, restaurants, coaching institutes, and creators across different industries.
            </p>

            {/* CTA Section */}
            <div
              ref={ctaRef}
              className="mt-8 flex flex-col gap-4 sm:flex-row opacity-0"
            >
              <a
                href="/contact"
                className="group flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#38BDF8] to-[#8B5CF6] px-6 py-4 text-base font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 active:translate-y-0"
              >
                Start Your Project
                <ArrowIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="/pricing"
                className="group flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-4 text-base font-semibold text-white/90 backdrop-blur-sm transition-colors duration-300 hover:border-white/30 hover:bg-white/10"
              >
                View Pricing
              </a>
            </div>

            {/* Trust Indicators - 2x2 Grid */}
            <div
              ref={trustRef}
              className="mt-6 grid grid-cols-2 gap-2 opacity-0 md:grid-cols-4"
            >
              {trustItems.map((item) => (
                <div
                  key={item.text}
                  data-trust-pill="true"
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80"
                >
                  <CheckIcon className="h-3.5 w-3.5 text-[#38BDF8] flex-shrink-0" />
                  <span className="truncate">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Industry Proof Section */}
            <div className="mt-8">
              <p
                ref={industryLabelRef}
                className="text-sm text-white/50 opacity-0"
              >
                Industries we&apos;ve worked with
              </p>
              <div
                ref={industryPillsRef}
                className="mt-3 flex flex-wrap gap-2 opacity-0"
              >
                {industryPills.map((pill) => (
                  <span
                    key={pill}
                    data-industry-pill="true"
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 transition-all duration-300 hover:border-white/20 hover:bg-white/10"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Showcase Panel (40%) */}
          <div ref={showcasePanelRef} className="w-full lg:w-[40%] opacity-0">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md md:p-8">
              {/* Panel Title */}
              <h2 className="text-2xl font-bold leading-tight text-white md:text-3xl">
                Project Highlights
              </h2>

              {/* Divider */}
              <div className="mt-6 border-t border-white/10" />

              {/* Showcase Items */}
              <div
                ref={showcaseItemsRef}
                className="mt-6 flex flex-col gap-4"
              >
                {showcasePanelItems.map((item) => (
                  <div
                    key={item.title}
                    data-showcase-item="true"
                    className="flex items-start gap-3"
                  >
                    <CheckIcon className="h-4 w-4 mt-1 flex-shrink-0 text-[#38BDF8]" />
                    <div>
                      <h3 className="text-base font-semibold text-white">
                        {item.title}
                      </h3>
                      <p className="mt-0.5 text-sm text-white/70">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="mt-6 border-t border-white/10" />

              {/* Note */}
              <div className="mt-6">
                <p className="text-sm text-white/60">
                  Every project is designed around business objectives, audience needs, and long-term growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
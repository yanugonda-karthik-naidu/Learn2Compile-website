"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useMotion } from "@/hooks/useMotion";

interface MetricCardProps {
  value: string;
  label: string;
}

function MetricCard({ value, label }: MetricCardProps) {
  return (
    <div className="group relative flex flex-col items-center justify-center rounded-[18px] border border-white/08 bg-white/04 backdrop-blur-md px-4 py-4 transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-white/06 hover:shadow-[0_0_30px_rgba(56,189,248,0.08)] sm:min-w-[140px]">
      <span className="text-xl sm:text-2xl font-bold text-white">{value}</span>
      <span className="mt-1 text-[10px] sm:text-xs text-white/60">{label}</span>
    </div>
  );
}

export function HeroSection() {
  const { reduced } = useMotion();

  const heroRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const socialProofRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (reduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      if (badgeRef.current) {
        tl.fromTo(badgeRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: "power3.out" });
      }

      if (headlineRef.current) {
        tl.fromTo(headlineRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.5");
      }

      if (descriptionRef.current) {
        tl.fromTo(descriptionRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.5");
      }

      if (ctaRef.current) {
        tl.fromTo(ctaRef.current, { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.5");
      }

      if (metricsRef.current) {
        tl.fromTo(metricsRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.5");
      }

      if (socialProofRef.current) {
        tl.fromTo(socialProofRef.current, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.5");
      }
    }, heroRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden bg-[#050816] flex items-center"
      data-section="hero"
    >
      {/* Background Layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050816] via-[#0a1628] to-[#050816]" />

      {/* Cyan glow behind content */}
      <div className="absolute left-1/2 top-[25%] -translate-x-1/2 w-[700px] h-[450px] bg-[rgba(56,189,248,0.12)] blur-[150px] rounded-full pointer-events-none" />

      {/* Purple glow */}
      <div className="absolute left-1/2 top-[60%] -translate-x-1/2 w-[600px] h-[400px] bg-[rgba(139,92,246,0.08)] blur-[160px] rounded-full pointer-events-none" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "70px 70px",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Centered content container */}
        <div className="flex flex-col items-center text-center max-w-[850px] mx-auto pt-[120px] pb-[90px] md:pt-[100px] md:pb-[75px] sm:pt-[80px] sm:pb-[60px]">

          {/* Premium Badge */}
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 rounded-full border border-white/08 bg-white/04 backdrop-blur-md px-4 py-2 text-sm text-white/80 opacity-0"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#38BDF8] opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#38BDF8]" />
            </span>
            Premium Web Development Studio
          </div>

          {/* Main Headline */}
          <h1
            ref={headlineRef}
            className="mt-10 text-[32px] sm:text-[42px] md:text-[52px] lg:text-[58px] font-extrabold leading-[0.95] tracking-tight text-white opacity-0"
          >
            Premium Websites
            <br />
            That Turn Visitors
            <br />
            <span className="bg-gradient-to-r from-[#38BDF8] via-[#8B5CF6] to-[#06B6D4] bg-clip-text text-transparent">
              Into Customers
            </span>
          </h1>

          {/* Description */}
          <p
            ref={descriptionRef}
            className="mt-10 max-w-[700px] text-lg text-white/72 leading-relaxed opacity-0 px-2"
          >
            We design and develop premium websites for startups, local businesses, wedding planners, restaurants, coaching institutes, and creators. Built to increase trust, visibility, and customer conversions.
          </p>

          {/* CTA Buttons */}
          <div
            ref={ctaRef}
            className="mt-10 flex flex-col sm:flex-row gap-5 opacity-0"
          >
            <a
              href="/custom-quote"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#38BDF8] via-[#8B5CF6] to-[#06B6D4] px-8 py-4 text-base font-semibold text-white shadow-[0_0_30px_rgba(56,189,248,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_45px_rgba(56,189,248,0.4)] hover:scale-[1.03] active:scale-[0.98]"
            >
              Start Your Project
              <svg
                className="h-5 w-5 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>

            <a
              href="/portfolio"
              className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/04 backdrop-blur-md px-8 py-4 text-base font-semibold text-white/90 transition-all duration-300 hover:border-white/25 hover:bg-white/08 hover:-translate-y-0.5 hover:scale-[1.03] active:scale-[0.98]"
            >
              View Portfolio
              <svg
                className="h-5 w-5 transition-transform group-hover:translate-y-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>

          {/* Trust Metrics Row */}
          <div
            ref={metricsRef}
            className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-[700px] opacity-0"
          >
            <MetricCard value="10+" label="Projects Delivered" />
            <MetricCard value="98%" label="Client Satisfaction" />
            <MetricCard value="24h" label="Response Time" />
            <MetricCard value="100%" label="Source Code Ownership" />
          </div>

          {/* Social Proof Text */}
          <p
            ref={socialProofRef}
            className="mt-10 text-sm text-white/45 opacity-0"
          >
            Trusted by startups, wedding planners, restaurants, coaching institutes, and local businesses across India.
          </p>

        </div>
      </div>
    </section>
  );
}

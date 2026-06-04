"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/gsap/reducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const reasons = [
  {
    title: "Mobile Responsive",
    description: "Every website works perfectly on phones, tablets, and desktops. Your customers browse everywhere.",
    icon: "📱",
    accent: "#38BDF8",
  },
  {
    title: "Fast Loading",
    description: "Optimized for speed. Fast websites rank better and keep visitors engaged.",
    icon: "⚡",
    accent: "#F59E0B",
  },
  {
    title: "SEO Optimized",
    description: "Built with search engines in mind. Get found by customers searching for your services.",
    icon: "🔍",
    accent: "#10B981",
  },
  {
    title: "Modern Design",
    description: "Premium aesthetics that establish trust and make your business look professional.",
    icon: "✨",
    accent: "#8B5CF6",
  },
  {
    title: "Ongoing Support",
    description: "We're your long-term partner. Updates, changes, and guidance included.",
    icon: "🤝",
    accent: "#EC4899",
  },
  {
    title: "Conversion Focused",
    description: "Every element is designed to turn visitors into paying customers.",
    icon: "🎯",
    accent: "#06B6D4",
  },
];

function ReasonCard({ reason, index }: { reason: typeof reasons[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current || prefersReducedMotion()) return;

    gsap.fromTo(
      cardRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        delay: index * 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
        },
      }
    );
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="group relative rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04]"
    >
      <div
        className="mb-4 flex h-12 sm:h-14 w-12 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 text-2xl sm:text-3xl"
        style={{ backgroundColor: `${reason.accent}15` }}
      >
        {reason.icon}
      </div>
      <h3 className="text-base sm:text-lg font-semibold text-white">{reason.title}</h3>
      <p className="mt-2 text-sm text-white/60 leading-relaxed">{reason.description}</p>
      <div
        className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-transparent to-white/20 transition-all duration-300 group-hover:w-full"
        style={{ backgroundColor: reason.accent }}
      />
    </div>
  );
}

export function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef.current || prefersReducedMotion()) return;

    gsap.fromTo(
      headerRef.current.children,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#050816] py-16 sm:py-20 md:py-24">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#06B6D4]/5 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="mb-10 sm:mb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs sm:text-sm text-white/80">
            <span className="h-2 w-2 rounded-full bg-[#06B6D4] shadow-[0_0_18px_rgba(6,182,212,0.6)]" />
            Why Learn2Compile
          </div>
          <h2 className="mt-4 sm:mt-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
            <span className="text-white">What You </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#06B6D4]">Get With Us</span>
          </h2>
          <p className="mt-3 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base text-white/60">
            Premium websites built with purpose. Every feature is chosen to help your business grow.
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => (
            <ReasonCard key={reason.title} reason={reason} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
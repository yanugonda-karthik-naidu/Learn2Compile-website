"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

type ValueProp = {
  icon: React.ReactNode;
  title: string;
  description: string;
  stat?: string;
  statLabel?: string;
};

const valueProps: ValueProp[] = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
      </svg>
    ),
    title: "Premium brand perception",
    description:
      "Your website is often the first touchpoint potential clients encounter. A premium design signals quality, builds trust, and positions your business as a category leader.",
    stat: "85%",
    statLabel: "of first impressions are design-related",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "Customer trust amplification",
    description:
      "Every element—from typography to micro-interactions—reinforces your credibility. Premium design isn't vanity; it's a trust signal that converts visitors into clients.",
    stat: "75%",
    statLabel: "of users judge credibility by design",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: "Mobile-first importance",
    description:
      "With over 60% of web traffic coming from mobile devices, responsive design isn't optional—it's essential. Every project is engineered for flawless mobile experiences.",
    stat: "60%+",
    statLabel: "traffic from mobile devices",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    title: "SEO & discoverability",
    description:
      "Technical SEO is built into every project from the ground up. Semantic markup, performance optimization, and structured data ensure you get found by your ideal clients.",
    stat: "53%",
    statLabel: "of all traffic starts with organic search",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: "Conversion-focused design",
    description:
      "Every visual element serves a purpose. From strategic CTA placement to optimized user flows, premium design is engineered to convert visitors into measurable business outcomes.",
    stat: "2x",
    statLabel: "conversion rate with professional design",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Performance engineering",
    description:
      "Sub-second load times aren't a feature—they're a requirement. Every project is optimized for Core Web Vitals, ensuring your visitors never wait.",
    stat: "<1s",
    statLabel: "load time target for all projects",
  },
];

function AnimatedCounter({
  value,
  suffix = "",
  isVisible,
}: {
  value: string;
  suffix?: string;
  isVisible: boolean;
}) {
  const [display, setDisplay] = useState("0");
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ""));
  const isPercent = value.includes("%");
  const prefix = isPercent ? "%" : "";

  useEffect(() => {
    if (!isVisible) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: numericValue,
      duration: 1.5,
      ease: "power2.out",
      onUpdate: () => {
        const rounded = Math.round(obj.val);
        setDisplay(rounded.toString());
      },
    });
  }, [isVisible, numericValue]);

  return (
    <span className="font-semibold text-[#38BDF8]">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

function ValueCard({ prop }: { prop: ValueProp; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-500 hover:border-white/20 hover:bg-white/[0.07]"
      data-stagger-item
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition-colors duration-300 group-hover:border-[#38BDF8]/30 group-hover:text-[#38BDF8]">
          {prop.icon}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white">{prop.title}</h3>
          <p className="mt-2 text-sm leading-6 text-white/70">{prop.description}</p>
        </div>
      </div>
      {prop.stat && (
        <div className="mt-4 flex items-baseline gap-2">
          <AnimatedCounter value={prop.stat} isVisible={isVisible} />
          <span className="text-xs text-white/50">{prop.statLabel}</span>
        </div>
      )}
    </div>
  );
}

export function PricingValue() {
  return (
    <section className="relative bg-[#050816] py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
              <span className="h-2 w-2 rounded-full bg-[#38BDF8] shadow-[0_0_18px_rgba(56,189,248,0.6)]" />
              Why premium matters
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Your investment, quantified.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-white/70">
            Every dollar in premium design delivers measurable returns through
            trust amplification, conversion optimization, and brand equity.
          </p>
        </div>

        {/* Value props grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3" data-animate="stagger">
          {valueProps.map((prop, index) => (
            <ValueCard key={prop.title} prop={prop} index={index} />
          ))}
        </div>

        {/* Trust section */}
        <div className="mt-16 rounded-3xl border border-white/10 bg-white/5 p-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="text-4xl font-semibold text-white">50+</div>
              <div className="mt-2 text-sm text-white/60">Projects delivered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-semibold text-white">98%</div>
              <div className="mt-2 text-sm text-white/60">Client satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-semibold text-white">3.2x</div>
              <div className="mt-2 text-sm text-white/60">Average ROI</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

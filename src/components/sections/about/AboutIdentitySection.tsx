"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const values = [
  {
    title: "Quality Over Quantity",
    description:
      "We intentionally take on a limited number of projects so every client receives focused attention, strategic thinking, and exceptional execution.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 12c0 6.627 5.373 12 12 12s12-5.373 12-12c0-2.954-.886-5.667-2.382-7.936z" />
      </svg>
    ),
    color: "#38BDF8",
  },
  {
    title: "Built For Growth",
    description:
      "Our websites are built with scalability in mind, allowing your digital presence to evolve alongside your business without costly rebuilds.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    color: "#8B5CF6",
  },
  {
    title: "Partnership Mindset",
    description:
      "We work closely with our clients throughout the journey, transforming ideas into meaningful digital experiences through collaboration.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    color: "#06B6D4",
  },
  {
    title: "Transparent Communication",
    description:
      "Clear timelines, transparent pricing, and consistent communication ensure you always know exactly where your project stands.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    color: "#EC4899",
  },
];

const trustMetrics = [
  {
    title: "10+",
    subtitle: "Projects Delivered",
  },
  {
    title: "98%",
    subtitle: "Client Satisfaction",
  },
  {
    title: "24 Hours",
    subtitle: "Average Response Time",
  },
  {
    title: "Ongoing",
    subtitle: "Support & Maintenance",
  },
];

function ValueCard({
  value,
  index,
}: {
  value: (typeof values)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mql) return;
    const handler = () => setReduced(mql.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reduced) return;
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        delay: index * 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  }, [reduced, index]);

  return (
    <div
      ref={cardRef}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 transition-all duration-500 hover:-translate-y-2 hover:border-[#38BDF8]/30 hover:bg-white/[0.06] hover:shadow-[0_0_45px_rgba(56,189,248,0.08)]"
    >
      {/* Top glow strip */}
      <div className="absolute top-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#38BDF8] via-[#8B5CF6] to-[#EC4899] transition-all duration-500 group-hover:w-full" />

      {/* Ambient hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.08),transparent_60%)]" />

      <div
        className="relative z-10 mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-[#38BDF8]/10 to-[#8B5CF6]/10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
        style={{
          color: value.color,
        }}
      >
        {value.icon}
      </div>

      <h3 className="relative z-10 text-lg font-semibold text-white">{value.title}</h3>
      <p className="relative z-10 mt-2 text-sm leading-relaxed text-white/70">{value.description}</p>
    </div>
  );
}

function TrustMetricCard({
  metric,
  index,
}: {
  metric: (typeof trustMetrics)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mql) return;
    const handler = () => setReduced(mql.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reduced) return;
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        delay: 0.4 + index * 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      }
    );
  }, [reduced, index]);

  return (
    <div
      ref={cardRef}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 text-center transition-all duration-500 hover:-translate-y-1 hover:border-[#38BDF8]/30 hover:bg-white/[0.06] hover:shadow-[0_0_35px_rgba(56,189,248,0.06)]"
    >
      <div className="text-2xl font-bold text-white">{metric.title}</div>
      <div className="mt-1 text-sm text-white/60">{metric.subtitle}</div>
    </div>
  );
}

export function AboutIdentitySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mql) return;
    const handler = () => setReduced(mql.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reduced) return;
    if (!headerRef.current) return;

    gsap.fromTo(
      headerRef.current.children,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  }, [reduced]);

  return (
    <section ref={sectionRef} className="relative bg-[#050816] py-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_70%,rgba(139,92,246,0.06),transparent_50%)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div ref={headerRef} className="mb-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
            <span className="h-2 w-2 rounded-full bg-[#EC4899] shadow-[0_0_18px_rgba(236,72,153,0.6)]" />
            What Defines Learn2Compile
          </div>

          <h2 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
            <span className="text-white">What We Actually </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#EC4899]">Care About</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-white/70 leading-relaxed">
            Every project we take on is guided by clear principles — quality, transparency, long-term thinking, and a commitment to helping businesses grow through exceptional digital experiences.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {values.map((value, index) => (
            <ValueCard key={value.title} value={value} index={index} />
          ))}
        </div>

        {/* Trust Metrics */}
        <div className="mt-16">
          <h3 className="mb-6 text-center text-xl font-semibold text-white">
            Why Businesses Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#8B5CF6]">Learn2Compile</span>
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trustMetrics.map((metric, index) => (
              <TrustMetricCard key={metric.title} metric={metric} index={index} />
            ))}
          </div>
        </div>

        {/* Closing Brand Statement */}
        <div className="mt-16 text-center">
          <p className="mx-auto max-w-3xl italic text-white/60 leading-relaxed">
            We don&apos;t aim to build the most websites.
            <br />
            We aim to build the right websites.
          </p>
        </div>
      </div>
    </section>
  );
}
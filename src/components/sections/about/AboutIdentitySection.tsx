"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const values = [
  {
    title: "Quality Over Quantity",
    description:
      "We deliberately take on fewer projects — so every one gets the attention it deserves. Your build isn't one of fifty; it's the one that matters.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 12c0 6.627 5.373 12 12 12s12-5.373 12-12c0-2.954-.886-5.667-2.382-7.936z" />
      </svg>
    ),
    color: "#38BDF8",
  },
  {
    title: "Built to Last",
    description:
      "We write clean, maintainable code with scalable architecture. Your website grows with your business — no rewrite needed when you scale.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    color: "#8B5CF6",
  },
  {
    title: "Collaborative Spirit",
    description:
      "You bring the vision; we bring the engineering excellence. Your ideas deserve to be executed with precision, not lost in translation.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    color: "#06B6D4",
  },
  {
    title: "Transparent Process",
    description:
      "No hidden timelines. No surprise bills. Just clear communication at every milestone — so you're never wondering where your project stands.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    color: "#EC4899",
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
      className="group relative rounded-3xl border border-white/10 bg-white/5 p-6 transition-all hover:border-white/20 hover:bg-white/[0.07]"
    >
      <div
        className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10"
        style={{
          background: `linear-gradient(135deg, ${value.color}20, transparent)`,
          color: value.color,
        }}
      >
        {value.icon}
      </div>

      <h3 className="text-lg font-semibold text-white">{value.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/70">{value.description}</p>

      <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
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
    <section ref={sectionRef} className="relative bg-[#050816] py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_70%,rgba(139,92,246,0.06),transparent_50%)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div ref={headerRef} className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
            <span className="h-2 w-2 rounded-full bg-[#EC4899] shadow-[0_0_18px_rgba(236,72,153,0.6)]" />
            The Human Behind The Code
          </div>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            <span className="text-white">What We Actually </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#EC4899]">Care About</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-white/70">
            It&apos;s not just about pixels and code — it&apos;s about the pride we take in craft, the relationships we build, and the standards we refuse to compromise.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {values.map((value, index) => (
            <ValueCard key={value.title} value={value} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
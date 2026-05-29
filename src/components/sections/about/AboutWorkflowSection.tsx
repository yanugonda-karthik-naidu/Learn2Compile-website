"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const steps = [
  {
    n: "01",
    t: "Discovery",
    d: "We clarify goals, audience, and success metrics — understanding what makes your business tick.",
  },
  {
    n: "02",
    t: "Strategy",
    d: "Architecture, timelines, milestones, and risk control. Every decision serves your objectives.",
  },
  {
    n: "03",
    t: "Design",
    d: "Luxury interface systems with motion-ready layouts. Premium aesthetics meet conversion logic.",
  },
  {
    n: "04",
    t: "Develop",
    d: "Performance-first engineering with clean, maintainable components. Built for scale from day one.",
  },
  {
    n: "05",
    t: "Deploy",
    d: "SEO-ready metadata, monitoring setup, and smooth launch. Your site goes live with confidence.",
  },
  {
    n: "06",
    t: "Support",
    d: "Ongoing improvements, security updates, and fast response. We're invested in your long-term success.",
  },
];

function WorkflowStep({
  step,
  index,
}: {
  step: (typeof steps)[0];
  index: number;
}) {
  const stepRef = useRef<HTMLDivElement>(null);
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
    if (!stepRef.current) return;

    gsap.fromTo(
      stepRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        delay: index * 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: stepRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  }, [reduced, index]);

  return (
    <article
      ref={stepRef}
      className="relative rounded-3xl border border-white/10 bg-white/5 p-6 transition-all hover:border-white/20 hover:bg-white/[0.07]"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-white/60">{step.n}</div>
          <h3 className="mt-2 text-lg font-semibold text-white">{step.t}</h3>
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-sm font-semibold text-white/80">
          {index + 1}
        </div>
      </div>
      <p className="mt-3 text-sm leading-6 text-white/70">{step.d}</p>

      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity hover:opacity-100" />
    </article>
  );
}

export function AboutWorkflowSection() {
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
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(139,92,246,0.08),transparent_50%)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div ref={headerRef} className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
              <span className="h-2 w-2 rounded-full bg-[#8B5CF6] shadow-[0_0_18px_rgba(139,92,246,0.6)]" />
              How we work
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              <span className="text-white">A Process That Feels </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#8B5CF6]">Cinematic</span>
            </h2>
          </div>

          <p className="max-w-xl text-sm leading-6 text-white/70">
            Clear steps, luminous progress, and purposeful motion — so you always know what&apos;s next in your project journey.
          </p>
        </div>

        <div className="relative grid gap-8 md:grid-cols-2">
          <div className="pointer-events-none absolute left-4 top-2 bottom-2 hidden w-px bg-gradient-to-b from-[#38BDF8]/70 via-white/10 to-transparent md:block" />

          {steps.map((step, index) => (
            <WorkflowStep key={step.n} step={step} index={index} />
          ))}
        </div>

        <div className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </section>
  );
}
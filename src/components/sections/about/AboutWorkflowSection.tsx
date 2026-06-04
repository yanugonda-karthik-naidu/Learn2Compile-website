"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const steps = [
  {
    n: "01",
    t: "Requirement Discussion",
    d: "We understand your business goals, target audience, services, and website requirements through a focused consultation.",
  },
  {
    n: "02",
    t: "Planning & Structure",
    d: "We create the website structure, page hierarchy, user journey, and feature roadmap before development begins.",
  },
  {
    n: "03",
    t: "UI Design & Review",
    d: "A modern premium interface is designed and shared with you for feedback and approval.",
  },
  {
    n: "04",
    t: "Development",
    d: "We build the website using modern technologies with performance, responsiveness, SEO, and scalability in mind.",
  },
  {
    n: "05",
    t: "Testing & Launch",
    d: "Every page is tested across devices, optimized, and deployed with proper quality assurance.",
  },
  {
    n: "06",
    t: "Support & Growth",
    d: "After launch, we continue supporting updates, improvements, maintenance, and future business growth.",
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
      className="group relative rounded-3xl border border-white/10 bg-white/5 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#38BDF8]/30 hover:bg-white/[0.07] hover:shadow-[0_0_40px_rgba(56,189,248,0.08)]"
    >
      <div className="absolute inset-0 rounded-3xl bg-[#38BDF8]/5 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-white/60">{step.n}</div>
          <h3 className="mt-2 text-lg font-semibold text-white">{step.t}</h3>
        </div>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#38BDF8] text-sm font-bold text-white shadow-[0_0_20px_rgba(56,189,248,0.3)] transition-transform duration-300 group-hover:scale-110">
          {index + 1}
        </div>
      </div>
      <p className="relative mt-3 text-sm leading-6 text-white/70">{step.d}</p>

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
    <section ref={sectionRef} className="relative bg-[#050816] py-16 sm:py-20 md:py-24 overflow-x-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(139,92,246,0.08),transparent_50%)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div ref={headerRef} className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
              <span className="h-2 w-2 rounded-full bg-[#8B5CF6] shadow-[0_0_18px_rgba(139,92,246,0.6)]" />
              How we work
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              <span className="text-white">A Simple Process</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#8B5CF6]">Built Around Your Business</span>
            </h2>
          </div>

          <p className="max-w-xl text-sm leading-6 text-white/70">
            From the first consultation to the final launch, every step is transparent, collaborative, and focused on delivering measurable business results.
          </p>
        </div>

        <div className="relative grid gap-8 md:grid-cols-2">
          {steps.map((step, index) => (
            <WorkflowStep key={step.n} step={step} index={index} />
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
          <h3 className="text-lg font-semibold text-white">Average Project Timeline</h3>
          <p className="mt-2 text-sm text-white/70">
            Most Learn2Compile projects are completed within 7–14 days depending on requirements, integrations, and project complexity.
          </p>
        </div>

        <div className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </section>
  );
}
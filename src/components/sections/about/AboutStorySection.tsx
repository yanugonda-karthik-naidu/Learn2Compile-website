"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugin only on client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const milestones = [
  {
    year: "2022",
    title: "The Vision",
    description:
      "Born from a simple belief: Indian businesses deserve world-class digital experiences without the enterprise price tag. We started by bridging the gap between premium design and accessible engineering.",
    icon: "01",
  },
  {
    year: "2023",
    title: "The Craft",
    description:
      "We invested heavily in mastering cinematic UI — blending GSAP motion systems, immersive 3D environments, and performance-first architecture. Every pixel started earning its place.",
    icon: "02",
  },
  {
    year: "2024",
    title: "The Scale",
    description:
      "From wedding planners to restaurants, coaching institutes to startups — 120+ projects later, we've learned what makes digital experiences actually convert for Indian audiences.",
    icon: "03",
  },
  {
    year: "2025+",
    title: "The Future",
    description:
      "AI-integrated workflows, expanded creative capabilities, and an ever-deepening commitment to crafting digital experiences that don't just look premium — they perform premium.",
    icon: "04",
  },
];

function MilestoneCard({
  milestone,
  index,
}: {
  milestone: (typeof milestones)[0];
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
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  }, [reduced]);

  return (
    <div ref={cardRef} className="relative pl-12 md:grid md:grid-cols-2 md:gap-8 md:pl-0">
      <div
        className={`rounded-3xl border border-white/10 bg-white/5 p-6 transition-all hover:border-[#38BDF8]/30 hover:bg-white/[0.07] ${
          index % 2 === 1 ? "md:text-right md:col-start-2" : ""
        }`}
      >
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-[#38BDF8]/20 to-[#8B5CF6]/20">
          <span className="text-lg font-semibold text-[#38BDF8]">{milestone.icon}</span>
        </div>

        <div className="text-sm font-semibold text-[#38BDF8]">{milestone.year}</div>
        <h3 className="mt-2 text-xl font-semibold text-white">{milestone.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-white/70">{milestone.description}</p>
      </div>

      <div className="absolute left-4 top-6 md:static md:flex md:items-center md:justify-center">
        <div className="h-4 w-4 rounded-full border-2 border-[#38BDF8] bg-[#050816] shadow-[0_0_20px_rgba(56,189,248,0.4)]" />
      </div>
    </div>
  );
}

export function AboutStorySection() {
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
    <section ref={sectionRef} id="story" className="relative bg-[#050816] py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(139,92,246,0.08),transparent_50%)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div ref={headerRef} className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
            <span className="h-2 w-2 rounded-full bg-[#8B5CF6] shadow-[0_0_18px_rgba(139,92,246,0.6)]" />
            Our Journey
          </div>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            <span className="text-white">From Vision to </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#8B5CF6]">Premium Studio</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-white/70">
            A story of craft, scale, and relentless commitment to digital excellence.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-[#38BDF8] via-[#8B5CF6] to-[#06B6D4] opacity-30 md:left-1/2 md:-translate-x-px" />

          <div className="space-y-12 md:space-y-0">
            {milestones.map((milestone, idx) => (
              <div
                key={milestone.year}
                className={idx % 2 === 0 ? "" : "md:col-start-2"}
              >
                <MilestoneCard milestone={milestone} index={idx} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const milestones = [
  {
    badge: "01",
    title: "Why We Started",
    content:
      "We noticed many small businesses, startups, and local brands struggling with outdated websites, poor online visibility, or no website at all.\n\nLearn2Compile was created to help businesses establish a professional digital presence without the complexity and high costs often associated with custom web development.",
    points: ["Professional Design", "Affordable Solutions", "Business-Focused Approach"],
  },
  {
    badge: "02",
    title: "What We Build",
    content:
      "We design and develop modern websites for businesses, wedding planners, restaurants, coaching institutes, startups, and personal brands.\n\nEvery website is built with a focus on performance, mobile responsiveness, user experience, and business growth.",
    points: ["Mobile Responsive", "SEO Ready", "Fast Loading", "Conversion Focused"],
  },
  {
    badge: "03",
    title: "How We Work",
    content:
      "Our process is simple, transparent, and focused on results.\n\nWe begin by understanding your business, planning the website structure, designing the experience, developing the solution, and supporting you after launch.",
    points: ["Discovery Call", "Planning & Strategy", "Development", "Launch Support"],
  },
  {
    badge: "04",
    title: "Our Commitment",
    content:
      "We believe a website should do more than look attractive.\n\nIt should build trust, generate inquiries, convert visitors into customers, and support long-term business growth.\n\nEvery project is treated as a partnership, not just another website.",
    points: [
      "Transparent Communication",
      "Reliable Support",
      "Long-Term Partnership",
      "Growth-Oriented Solutions",
    ],
  },
];

const coreValues = [
  "Transparency",
  "Quality",
  "Performance",
  "Support",
  "Partnership",
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
    <div ref={cardRef} className="relative flex justify-center">
      <div className="mx-auto max-w-3xl w-full rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 lg:p-10 transition-all hover:border-[#38BDF8]/20">
        {/* Badge */}
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-[#38BDF8]/20 bg-gradient-to-br from-[#38BDF8]/20 to-[#8B5CF6]/20">
          <span className="text-2xl font-bold text-[#38BDF8]">{milestone.badge}</span>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-semibold text-white mb-4">{milestone.title}</h3>

        {/* Content */}
        <p className="text-base leading-relaxed text-white/70 whitespace-pre-line">
          {milestone.content}
        </p>

        {/* Supporting Points */}
        <div className="mt-6 flex flex-wrap gap-3">
          {milestone.points.map((point) => (
            <div
              key={point}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80"
            >
              <span className="text-[#38BDF8]">✓</span>
              {point}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CoreValuesSection() {
  const valuesRef = useRef<HTMLDivElement>(null);
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
    if (!valuesRef.current) return;

    gsap.fromTo(
      valuesRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: valuesRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  }, [reduced]);

  return (
    <div ref={valuesRef} className="mt-16 text-center">
      <h3 className="text-xl font-semibold text-white mb-6">Our Core Values</h3>
      <div className="flex flex-wrap justify-center gap-3">
        {coreValues.map((value) => (
          <div
            key={value}
            className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 text-sm text-white/80"
          >
            {value}
          </div>
        ))}
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
    <section ref={sectionRef} id="story" className="relative bg-[#050816] py-16 sm:py-20 md:py-24 overflow-x-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(139,92,246,0.08),transparent_50%)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div ref={headerRef} className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
            <span className="h-2 w-2 rounded-full bg-[#8B5CF6] shadow-[0_0_18px_rgba(139,92,246,0.6)]" />
            Our Story
          </div>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            <span className="text-white">The Learn2Compile Journey</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-white/70">
            How a passion for building modern websites evolved into helping businesses grow online through design, strategy, and development.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-[#38BDF8] via-[#8B5CF6] to-transparent opacity-20" />

          {/* Cards Container */}
          <div className="flex flex-col items-center gap-8">
            {milestones.map((milestone, idx) => (
              <div key={milestone.badge} className="relative w-full">
                {/* Timeline Dot */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:block">
                  <div className="h-4 w-4 rounded-full bg-[#38BDF8] shadow-[0_0_20px_rgba(56,189,248,0.6)]" />
                </div>

                <MilestoneCard milestone={milestone} index={idx} />
              </div>
            ))}
          </div>
        </div>

        {/* Core Values */}
        <CoreValuesSection />
      </div>
    </section>
  );
}

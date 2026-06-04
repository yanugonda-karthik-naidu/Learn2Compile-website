"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/gsap/reducedMotion";

// Register plugin only on client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const processSteps = [
  {
    number: "01",
    title: "Discovery",
    description: "We listen. Every great project starts with understanding your business, your customers, and your goals.",
    duration: "1-2 days",
    icon: "🎯",
    color: "#38BDF8",
  },
  {
    number: "02",
    title: "Planning",
    description: "We create a roadmap with clear milestones, timelines, and deliverables. No surprises, just transparency.",
    duration: "2-3 days",
    icon: "📋",
    color: "#8B5CF6",
  },
  {
    number: "03",
    title: "Design",
    description: "Stunning mockups that capture your brand and focus on conversion. You see it before we build it.",
    duration: "3-5 days",
    icon: "🎨",
    color: "#EC4899",
  },
  {
    number: "04",
    title: "Development",
    description: "Premium code, fast loading, mobile-first. Built to perform and scale with your business.",
    duration: "1-3 weeks",
    icon: "⚡",
    color: "#F59E0B",
  },
  {
    number: "05",
    title: "Launch",
    description: "Rigorous testing, optimization, and seamless deployment. Your website goes live with confidence.",
    duration: "2-3 days",
    icon: "🚀",
    color: "#10B981",
  },
  {
    number: "06",
    title: "Support",
    description: "Ongoing updates, analytics, and optimization. We're your long-term digital partner.",
    duration: "Ongoing",
    icon: "🤝",
    color: "#06B6D4",
  },
];

function ProcessStep({ step, index, isLast }: { step: typeof processSteps[0]; index: number; isLast: boolean }) {
  const stepRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!stepRef.current || prefersReducedMotion()) return;

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
        },
      }
    );
  }, [index]);

  return (
    <div ref={stepRef} className="relative">
      <div className="flex gap-4 sm:gap-6">
        {/* Timeline dot */}
        <div className="flex flex-col items-center">
          <div
            className="flex h-10 sm:h-12 w-10 sm:w-12 items-center justify-center rounded-full border-2 border-white/20 bg-[#050816] text-lg sm:text-xl"
            style={{ borderColor: `${step.color}60`, boxShadow: `0 0 20px ${step.color}30` }}
          >
            {step.icon}
          </div>
          {!isLast && (
            <div
              className="mt-3 sm:mt-4 h-12 sm:h-16 w-px bg-gradient-to-b from-white/20 to-transparent"
              style={{ backgroundColor: `${step.color}40` }}
            />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 pb-6 sm:pb-8">
          <div className="flex items-center gap-3">
            <span
              className="text-xs sm:text-sm font-bold"
              style={{ color: step.color }}
            >
              {step.number}
            </span>
            <h3 className="text-lg sm:text-xl font-semibold text-white">{step.title}</h3>
          </div>
          <p className="mt-2 text-sm sm:text-base text-white/60 leading-relaxed">{step.description}</p>
          <div className="mt-3 flex items-center gap-2">
            <svg className="h-4 sm:h-4 w-4 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs sm:text-sm text-white/40">{step.duration}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ServicesProcess() {
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
        <div className="absolute left-1/4 top-0 h-[400px] w-[400px] rounded-full bg-[#38BDF8]/5 blur-[120px]" />
        <div className="absolute right-1/4 bottom-0 h-[400px] w-[400px] rounded-full bg-[#8B5CF6]/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="mb-10 sm:mb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs sm:text-sm text-white/80">
            <span className="h-2 w-2 rounded-full bg-[#8B5CF6] shadow-[0_0_18px_rgba(139,92,246,0.6)]" />
            How We Work
          </div>
          <h2 className="mt-4 sm:mt-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
            <span className="text-white">Simple Process, </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4]">Premium Results</span>
          </h2>
          <p className="mt-3 sm:mt-4 max-w-xl mx-auto text-sm sm:text-base text-white/60">
            From first conversation to ongoing support, we make every step smooth and transparent.
          </p>
        </div>

        {/* Process Steps */}
        <div className="space-y-0">
          {processSteps.map((step, index) => (
            <ProcessStep
              key={step.number}
              step={step}
              index={index}
              isLast={index === processSteps.length - 1}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 sm:mt-12 text-center">
          <a
            href="/custom-quote"
            className="group inline-flex items-center gap-2 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#38BDF8]/20 via-[#8B5CF6]/20 to-[#06B6D4]/20 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-medium text-white shadow-[0_0_30px_rgba(56,189,248,0.15)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Start Your Project</span>
            <svg className="h-4 sm:h-5 w-4 sm:w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
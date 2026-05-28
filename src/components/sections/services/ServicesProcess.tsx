"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Discovery",
    description: "We dive deep into understanding your business, goals, and target audience. Every great project starts with listening.",
    duration: "1-2 days",
  },
  {
    number: "02",
    title: "Strategy",
    description: "We craft a tailored digital strategy that aligns with your objectives, ensuring maximum impact and ROI.",
    duration: "2-3 days",
  },
  {
    number: "03",
    title: "Design",
    description: "Our designers create stunning, conversion-focused mockups that capture your brand essence and vision.",
    duration: "3-5 days",
  },
  {
    number: "04",
    title: "Development",
    description: "Premium code meets cutting-edge technology. We build fast, secure, and scalable digital experiences.",
    duration: "1-3 weeks",
  },
  {
    number: "05",
    title: "Launch",
    description: "Rigorous testing, optimization, and seamless deployment. Your digital presence goes live with confidence.",
    duration: "2-3 days",
  },
  {
    number: "06",
    title: "Growth",
    description: "Ongoing support, analytics, and optimization. We ensure your digital presence continues to evolve and succeed.",
    duration: "Ongoing",
  },
];

export function ServicesProcess() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (!timelineRef.current) return;
    const steps = timelineRef.current.querySelectorAll(".timeline-step");
    gsap.fromTo(steps, { y: 50, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: "power3.out",
      scrollTrigger: { trigger: timelineRef.current, start: "top 75%", toggleActions: "play none none reverse" },
    });
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#050816] py-20">
      <div className="absolute inset-0 bg-[radial-gradient(500px_circle_at_20%_50%,rgba(56,189,248,0.06),transparent_50%)]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
            <span className="h-2 w-2 rounded-full bg-[#38BDF8] shadow-[0_0_18px_rgba(56,189,248,0.6)]" />
            Our process
          </div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            <span className="text-white">From Vision to </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4]">Reality</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base text-white/60">
            A streamlined, transparent process that transforms your ideas into premium digital experiences.
          </p>
        </div>
        <div ref={timelineRef} className="relative">
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          <div className="grid gap-8 md:grid-cols-2 md:gap-x-16 md:gap-y-12">
            {steps.map((step, index) => (
              <div key={step.number} className={`timeline-step relative ${index % 2 === 0 ? "md:text-right" : "md:ml-auto"}`}>
                <div className={`relative ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                  <div className="absolute top-0 h-4 w-4 rounded-full border-2 border-[#38BDF8] bg-[#050816]" style={{ [index % 2 === 0 ? "right" : "left"]: "-2.125rem" }} />
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                    <span className="text-lg font-bold text-[#38BDF8]">{step.number}</span>
                  </div>
                  <h3 className="mt-3 text-xl font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm text-white/60">{step.description}</p>
                  <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/50">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {step.duration}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
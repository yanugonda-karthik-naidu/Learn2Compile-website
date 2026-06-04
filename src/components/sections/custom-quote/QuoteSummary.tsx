"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    title: "Detailed Scope Document",
    desc: "Receive a clear breakdown of deliverables, timeline, and investment. No vague proposals.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: "Direct Founder Communication",
    desc: "Speak directly with our team throughout planning and execution.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    title: "Flexible Project Planning",
    desc: "We adapt the roadmap based on your goals, timeline, and priorities.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  },
  {
    title: "Launch & Support",
    desc: "Every project includes post-launch guidance and ongoing support.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
];

const stats = [
  { value: 10, suffix: "+", label: "Projects Delivered" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 24, suffix: "h", label: "Response Time" },
  { value: 100, suffix: "%", label: "Custom Built" },
];

const industries = [
  "Wedding Planners",
  "Restaurants",
  "Coaching Institutes",
  "Startups",
  "E-Commerce",
  "Local Businesses",
  "Personal Brands",
  "Creators",
];

const timelineSteps = [
  "Submit your requirements",
  "Requirements reviewed manually",
  "Proposal & estimate prepared",
  "WhatsApp consultation",
  "Project kickoff",
];

export function QuoteSummary() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const benefitCardsRef = useRef<HTMLDivElement[]>([]);
  const statCardsRef = useRef<HTMLDivElement[]>([]);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section entrance animation
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 40, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" }
      );

      // Benefit cards stagger animation
      benefitCardsRef.current.forEach((card, i) => {
        if (card) {
          gsap.fromTo(
            card,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power3.out",
              delay: 0.08 * i,
            }
          );
        }
      });

      // Stat counter animation
      statCardsRef.current.forEach((card, i) => {
        if (card) {
          const valueEl = card.querySelector(".stat-value");
          if (valueEl) {
            const targetValue = stats[i].value;
            gsap.fromTo(
              valueEl,
              { innerText: 0 },
              {
                innerText: targetValue,
                duration: 1.5,
                ease: "power2.out",
                snap: { innerText: 1 },
                scrollTrigger: {
                  trigger: card,
                  start: "top 85%",
                  once: true,
                },
              }
            );
          }
        }
      });

      // Timeline fade-up animation
      if (timelineRef.current) {
        const steps = timelineRef.current.querySelectorAll(".timeline-step");
        steps.forEach((step, i) => {
          gsap.fromTo(
            step,
            { opacity: 0, y: 15 },
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              ease: "power3.out",
              delay: i * 0.1,
              scrollTrigger: {
                trigger: timelineRef.current,
                start: "top 80%",
                once: true,
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToBenefitRefs = (el: HTMLDivElement | null, index: number) => {
    if (el) benefitCardsRef.current[index] = el;
  };

  const addToStatRefs = (el: HTMLDivElement | null, index: number) => {
    if (el) statCardsRef.current[index] = el;
  };

  return (
    <section className="relative overflow-hidden bg-[#050816] py-16 sm:py-20 md:py-24 overflow-x-hidden">
      {/* Floating glow orbs */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-[#38BDF8]/10 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-[#8B5CF6]/10 blur-[100px]" />

      {/* Radial gradients */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(800px circle at 50% -20%, rgba(56,189,248,0.12), transparent 55%), radial-gradient(600px circle at 80% 80%, rgba(139,92,246,0.10), transparent 50%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div
          ref={sectionRef}
          className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl"
        >
          <div className="relative p-6 sm:p-8 md:p-12">
            <div className="grid gap-12 md:grid-cols-2">
              {/* Left: What you receive */}
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
                  <span className="h-2 w-2 rounded-full bg-[#38BDF8] shadow-[0_0_18px_rgba(56,189,248,0.6)]" />
                  After submission
                </div>

                <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  WHAT YOU RECEIVE
                  <br />
                  <span className="text-[#38BDF8]">AFTER SUBMISSION</span>
                </h2>

                <p className="mt-4 text-sm text-white/60 sm:text-base">
                  Clear planning.
                  <br />
                  Accurate estimation.
                  <br />
                  Direct communication.
                </p>

                <div className="mt-6 space-y-4">
                  {benefits.map((item, i) => (
                    <div
                      key={item.title}
                      ref={(el) => addToBenefitRefs(el, i)}
                      className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#38BDF8]/20 hover:bg-white/[0.07] hover:shadow-[0_0_30px_rgba(56,189,248,0.1)]"
                    >
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-all duration-300 group-hover:border-[#38BDF8]/30 group-hover:bg-[#38BDF8]/10">
                        <div className="text-[#38BDF8]">{item.icon}</div>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">
                          {item.title}
                        </div>
                        <div className="mt-1 text-xs text-white/60">{item.desc}</div>
                      </div>
                    </div>
                  ))}

                  {/* Trust statement - tight spacing */}
                  <div className="rounded-2xl border border-[#38BDF8]/20 bg-[#38BDF8]/5 p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-[#38BDF8]/10">
                        <svg className="h-4 w-4 text-[#38BDF8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-xs font-semibold text-white/90">
                          Every estimate is reviewed manually.
                        </p>
                        <p className="text-xs text-white/60">
                          No automated quotations. No hidden charges. No copy-paste proposals.
                        </p>
                        <p className="text-xs text-white/60">
                          Each project is planned according to your business goals.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Trust stats */}
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
                  <span className="h-2 w-2 rounded-full bg-[#8B5CF6] shadow-[0_0_18px_rgba(139,92,246,0.6)]" />
                  Studio track record
                </div>

                <h3 className="mt-6 text-xl font-semibold text-white sm:text-2xl">
                  BUILT FOR MODERN
                  <br />
                  <span className="text-[#8B5CF6]">INDIAN BUSINESSES</span>
                </h3>

                <p className="mt-3 text-sm text-white/60">
                  Helping startups, local businesses, creators, and service brands establish a stronger digital presence.
                </p>

                {/* Stats grid */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                  {stats.map((stat, i) => (
                    <div
                      key={stat.label}
                      ref={(el) => addToStatRefs(el, i)}
                      className="group rounded-2xl border border-white/10 bg-white/5 p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#8B5CF6]/30 hover:shadow-[0_0_20px_rgba(139,92,246,0.1)]"
                    >
                      <div className="stat-value text-3xl font-semibold text-[#38BDF8]">
                        {stat.value}{stat.suffix}
                      </div>
                      <div className="mt-1 text-xs text-white/60">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Industries */}
                <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="text-sm font-semibold text-white">
                    Industries we serve
                  </div>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {industries.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* What happens next timeline */}
                <div
                  ref={timelineRef}
                  className="mt-6 rounded-2xl border border-[#38BDF8]/20 bg-[#38BDF8]/5 p-5"
                >
                  <div className="mb-4 text-sm font-semibold text-white">
                    WHAT HAPPENS NEXT?
                  </div>
                  <div className="relative space-y-4">
                    {timelineSteps.map((step, i) => (
                      <div key={i} className="timeline-step relative flex items-center gap-3 pl-1">
                        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#38BDF8]/20 text-xs font-semibold text-[#38BDF8] ring-2 ring-[#38BDF8]/20">
                          {i + 1}
                        </div>
                        <div className="text-sm text-white/80">{step}</div>
                        {i < timelineSteps.length - 1 && (
                          <div className="absolute left-[0.875rem] top-7 h-4 w-px border-l border-dashed border-[#38BDF8]/40" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                </div>
            </div>
          </div>
        </div>

        <div className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </section>
  );
}
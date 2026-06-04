"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

type Metric = {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
};

function formatMetricValue(n: number, opts?: { suffix?: string; prefix?: string }) {
  const { suffix = "", prefix = "" } = opts ?? {};
  const formatted = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(Math.round(n));
  return `${prefix}${formatted}${suffix}`;
}

function MetricCard({
  metric,
  index,
  renderedValue,
}: {
  metric: Metric;
  index: number;
  renderedValue: number;
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
        delay: index * 0.08,
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
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 transition-all duration-500 hover:-translate-y-2 hover:border-[#38BDF8]/30 hover:bg-white/[0.06] hover:shadow-[0_0_50px_rgba(56,189,248,0.08)]"
    >
      <div className="absolute top-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#38BDF8] via-[#8B5CF6] to-[#EC4899] transition-all duration-500 group-hover:w-full" />
      <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#8B5CF6]" aria-label={metric.label}>
        {formatMetricValue(renderedValue, {
          prefix: metric.prefix,
          suffix: metric.suffix,
        })}
      </div>
      <div className="mt-2 text-sm text-white/70">{metric.label}</div>
    </div>
  );
}

const whyChoose = [
  {
    title: "Premium UI/UX",
    desc: "Cinematic design direction with conversion-ready structure.",
  },
  {
    title: "Mobile Responsive",
    desc: "Touch-friendly layouts built for Android & quick journeys.",
  },
  {
    title: "SEO Optimized",
    desc: "Clean content, metadata & accessibility for discovery.",
  },
  {
    title: "Fast Loading",
    desc: "Performance-first builds with smooth, reliable interactions.",
  },
  {
    title: "Business Focused",
    desc: "We design for leads — calls, bookings, and enquiries.",
  },
  {
    title: "Modern Technologies",
    desc: "Next.js, GSAP motion system, and scalable architecture.",
  },
];

const industries = [
  "Wedding Planners",
  "Restaurants",
  "Coaching Institutes",
  "Startups",
  "Local Businesses",
  "Creators",
  "Personal Brands",
  "Beauty & Fashion",
  "Health & Wellness",
  "Education",
  "Custome Solutions",
];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(Boolean(mql?.matches));
    update();
    if (!mql) return;
    mql.addEventListener?.("change", update);
    return () => mql.removeEventListener?.("change", update);
  }, []);

  return reduced;
}

export function AboutMetricsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const hasStartedRef = useRef(false);

  const metrics: Metric[] = useMemo(
    () => [
      { label: "Projects Delivered", value: 10, suffix: "+" },
      { label: "Happy Clients", value: 10, suffix: "+" },
      { label: "Client Satisfaction", value: 98, suffix: "%" },
      { label: "Mobile Responsive", value: 100, suffix: "%" },
      { label: "Support Availability", value: 24, suffix: "/7" },
    ],
    []
  );

  const [renderedValues, setRenderedValues] = useState<number[]>(() =>
    metrics.map(() => 0)
  );

  useEffect(() => {
    if (reduced) {
      queueMicrotask(() => {
        setRenderedValues(metrics.map((m) => m.value));
      });
      return;
    }

    const el = sectionRef.current;
    if (!el) return;
    if (hasStartedRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const durationMs = 1050;

    const animateNumbers = () => {
      if (hasStartedRef.current) return;
      hasStartedRef.current = true;

      const start = performance.now();

      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / durationMs);
        const eased = 1 - Math.pow(1 - t, 3);

        const next = metrics.map((m) => m.value * eased);
        setRenderedValues(next);

        if (t < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    };

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      once: true,
      onEnter: animateNumbers,
    });

    return () => {
      st.kill();
    };
  }, [metrics, reduced]);

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
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,rgba(56,189,248,0.06),transparent_50%)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div ref={headerRef} className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
              <span className="h-2 w-2 rounded-full bg-[#38BDF8] shadow-[0_0_18px_rgba(56,189,248,0.6)]" />
              Results & Impact
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              <span className="text-white">Built For Businesses </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#8B5CF6]">That Want Results</span>
            </h2>
          </div>

          <p className="max-w-xl text-sm leading-6 text-white/70">
            From local businesses and coaching institutes to startups and service brands, we create websites that combine premium design, modern technology, and measurable business outcomes.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {metrics.map((metric, index) => (
            <MetricCard
              key={metric.label}
              metric={metric}
              index={index}
              renderedValue={renderedValues[index] ?? 0}
            />
          ))}
        </div>

        <div className="mt-16 rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-sm font-semibold text-white">Industries We Specialize In</div>
              <div className="mt-1 text-xs text-white/70">
                Purpose-built solutions designed around how each industry attracts, converts, and retains customers.
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {industries.map((name, index) => (
              <div
                key={name}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/80 transition-all duration-300 hover:border-[#38BDF8]/40 hover:bg-[#38BDF8]/10 hover:text-white hover:-translate-y-1"
                ref={(el) => {
                  if (!el || reduced) return;
                  gsap.fromTo(
                    el,
                    { scale: 0.8, opacity: 0 },
                    {
                      scale: 1,
                      opacity: 1,
                      duration: 0.4,
                      delay: index * 0.05,
                      ease: "back.out(1.5)",
                      scrollTrigger: {
                        trigger: el,
                        start: "top 90%",
                        toggleActions: "play none none none",
                      },
                    }
                  );
                }}
              >
                {name}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-sm font-semibold text-white">Why Learn2Compile</div>
              <div className="mt-1 text-xs text-white/70">
                Premium craft with restrained, cinematic motion.
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {whyChoose.map((x, index) => (
              <div
                key={x.title}
                className="group relative rounded-2xl border border-white/10 bg-white/5 p-5 transition-all duration-500 hover:-translate-y-2 hover:border-[#8B5CF6]/25 hover:bg-white/[0.05] hover:shadow-[0_0_45px_rgba(139,92,246,0.08)]"
                ref={(el) => {
                  if (!el || reduced) return;
                  gsap.fromTo(
                    el,
                    { y: 20, opacity: 0 },
                    {
                      y: 0,
                      opacity: 1,
                      duration: 0.5,
                      delay: index * 0.06,
                      ease: "power3.out",
                      scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        toggleActions: "play none none none",
                      },
                    }
                  );
                }}
              >
                <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: 'radial-gradient(circle at top right, rgba(56,189,248,0.08), transparent 60%)' }} />
                <div className="relative z-10 flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold text-white">{x.title}</div>
                    <div className="mt-2 text-xs leading-relaxed text-white/70">{x.desc}</div>
                  </div>

                  <div className="mt-0.5 h-8 w-8 shrink-0 rounded-xl border border-white/10 bg-gradient-to-br from-[#38BDF8]/20 to-[#8B5CF6]/20 p-2 shadow-[0_0_20px_rgba(56,189,248,0.15)] transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                    <span className="block h-full w-full rounded-lg bg-[#38BDF8]/20 shadow-[0_0_18px_rgba(56,189,248,0.35)]" />
                  </div>
                </div>

                <div className="relative z-10 mt-4 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
          <div className="mx-auto max-w-2xl">
            <h3 className="text-xl font-semibold text-white">Trusted By Growing Businesses Across India</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Every project is built with a balance of premium design, technical excellence, and business-focused strategy to ensure long-term success.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
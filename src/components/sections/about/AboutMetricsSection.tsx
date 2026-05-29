"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";

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
      className="rounded-2xl border border-white/10 bg-white/5 p-5"
    >
      <div className="text-2xl font-semibold text-white" aria-label={metric.label}>
        {formatMetricValue(renderedValue, {
          prefix: metric.prefix,
          suffix: metric.suffix,
        })}
      </div>
      <div className="mt-1 text-sm text-white/70">{metric.label}</div>
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
      { label: "Projects Completed", value: 120, suffix: "+" },
      { label: "Happy Clients", value: 180, suffix: "+" },
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

    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.some((e) => e.isIntersecting);
        if (!hit) return;

        hasStartedRef.current = true;
        io.disconnect();

        const start = performance.now();
        const durationMs = 1050;

        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / durationMs);
          const eased = 1 - Math.pow(1 - t, 3);

          const next = metrics.map((m) => m.value * eased);
          setRenderedValues(next);

          if (t < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
      },
      {
        root: null,
        threshold: 0.35,
      }
    );

    io.observe(el);
    return () => io.disconnect();
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
    <section ref={sectionRef} className="relative bg-[#050816] py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,rgba(56,189,248,0.06),transparent_50%)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div ref={headerRef} className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
              <span className="h-2 w-2 rounded-full bg-[#38BDF8] shadow-[0_0_18px_rgba(56,189,248,0.6)]" />
              Proof of delivery
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              <span className="text-white">Crafted for </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#8B5CF6]">Indian Businesses</span>
            </h2>
          </div>

          <p className="max-w-xl text-sm leading-6 text-white/70">
            Learn2Compile helps wedding planners, local businesses, restaurants, and coaching brands launch premium websites that look cinematic — and convert.
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

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-sm font-semibold text-white">Industries we serve</div>
              <div className="mt-1 text-xs text-white/70">
                Built with business context — so clients feel understood.
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {industries.map((name, index) => (
              <div
                key={name}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/80"
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

        <div className="mt-10">
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
                className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:border-white/20"
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
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold text-white">{x.title}</div>
                    <div className="mt-2 text-xs leading-relaxed text-white/70">{x.desc}</div>
                  </div>

                  <div className="mt-0.5 h-8 w-8 shrink-0 rounded-xl border border-white/10 bg-white/5 p-2 transition-transform group-hover:scale-[1.03]">
                    <span className="block h-full w-full rounded-lg bg-[#38BDF8]/20 shadow-[0_0_18px_rgba(56,189,248,0.35)]" />
                  </div>
                </div>

                <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
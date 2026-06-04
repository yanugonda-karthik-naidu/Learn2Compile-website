"use client";

import { useEffect, useMemo, useRef, useState } from "react";

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

type Metric = {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
};

function formatMetricValue(n: number, opts?: { suffix?: string; prefix?: string }) {
  const { suffix = "", prefix = "" } = opts ?? {};
  // Keep Indian business-friendly readability.
  // We avoid too many decimals; counters in this section are whole numbers.
  const formatted = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(Math.round(n));
  return `${prefix}${formatted}${suffix}`;
}

export function TrustSection() {
  const prefersReducedMotion = usePrefersReducedMotion();

  const sectionRef = useRef<HTMLElement | null>(null);
  const hasStartedRef = useRef(false);

  const metrics: Metric[] = useMemo(
    () => [
      { label: "Next.js Projects", value: 10, suffix: "+" },
      { label: "React Components", value: 200, suffix: "+" },
      { label: "Mobile-First Sites", value: 100, suffix: "%" },
      { label: "GSAP Animations", value: 30, suffix: "+" },
      { label: "5-Star Reviews", value: 50, suffix: "+" },
    ],
    []
  );

  const [renderedValues, setRenderedValues] = useState<number[]>(() =>
    metrics.map(() => 0)
  );

  useEffect(() => {
    if (prefersReducedMotion) {
      // In reduced motion mode, render final values without running animations.
      // Defer to next microtask to avoid sync cascading-render warnings.
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
        const durationMs = 1050; // restrained, premium tempo

        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / durationMs);
          // Ease-out (cosmetic only)
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
  }, [metrics, prefersReducedMotion]);

  const industries = useMemo(
    () => [
      "Wedding Planners",
      "Restaurants",
      "Coaching Institutes",
      "Startups",
      "Local Businesses",
      "Creators",
      "Personal Brands",
    ],
    []
  );

  const whyChoose = useMemo(
    () => [
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
        desc: "We design for leads—calls, bookings, and enquiries.",
      },
      {
        title: "Modern Technologies",
        desc: "Next.js, GSAP motion system, and scalable architecture.",
      },
    ],
    []
  );

  return (
    <section ref={sectionRef} className="relative bg-[#050816] py-16 sm:py-20 md:py-24 overflow-x-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
              <span className="h-2 w-2 rounded-full bg-[#38BDF8] shadow-[0_0_18px_rgba(56,189,248,0.6)]" />
              Business credibility, built into your website
            </div>
            <h2
              className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl"
              data-animate="fade-up"
              data-duration="0.7"
            >
              Proof of delivery—crafted for Indian businesses
            </h2>
          </div>

          <p
            className="max-w-xl text-sm text-white/70"
            data-animate="fade-up"
            data-delay="0.05"
          >
            Learn2Compile helps wedding planners, local businesses, restaurants, and
            coaching brands launch premium websites that look cinematic—and convert.
          </p>
        </div>

        {/* Animated Metrics */}
        <div className="mt-10" data-animate="fade-up">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {metrics.map((m, idx) => (
              <div
                key={m.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <div className="text-2xl font-semibold text-white" aria-label={m.label}>
                  {formatMetricValue(renderedValues[idx] ?? 0, {
                    prefix: m.prefix,
                    suffix: m.suffix,
                  })}
                </div>
                <div className="mt-1 text-sm text-white/70">{m.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Industries served */}
        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div
                className="text-sm font-semibold text-white"
                data-animate="fade-up"
              >
                Industries we serve
              </div>
              <div className="mt-1 text-xs text-white/70" data-animate="fade-up" data-delay="0.04">
                Built with business context—so clients feel understood.
              </div>
            </div>
          </div>

          <div
            className="mt-5 flex flex-wrap gap-2"
            data-animate="stagger"
            data-duration="0.55"
          >
            {industries.map((name) => (
              <div
                key={name}
                data-stagger-item
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/80"
              >
                {name}
              </div>
            ))}
          </div>
        </div>

        {/* Why choose us */}
        <div className="mt-10">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-sm font-semibold text-white">Why choose Learn2Compile</div>
              <div className="mt-1 text-xs text-white/70">
                Premium craft with restrained, cinematic motion.
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {whyChoose.map((x) => (
              <div
                key={x.title}
                className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors"
                data-animate="fade-up"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold text-white">{x.title}</div>
                    <div className="mt-2 text-xs leading-relaxed text-white/70">
                      {x.desc}
                    </div>
                  </div>

                  <div className="mt-0.5 h-8 w-8 shrink-0 rounded-xl border border-white/10 bg-white/5 p-2 transition-transform group-hover:scale-[1.03]">
                    <span className="block h-full w-full rounded-lg bg-[#38BDF8]/20 shadow-[0_0_18px_rgba(56,189,248,0.35)]" />
                  </div>
                </div>

                <div
                  className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom assurance strip */}
        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-3">
            {["Reliable timelines", "Performance-first builds", "Conversion-focused execution"].map((t) => (
              <div
                key={t}
                className="rounded-2xl bg-white/5 p-4"
                data-animate="fade-up"
              >
                <div className="text-xs font-semibold text-white/90">{t}</div>
                <div className="mt-2 text-xs text-white/65">
                  Cinematic visuals, business logic, and a clean delivery process.
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


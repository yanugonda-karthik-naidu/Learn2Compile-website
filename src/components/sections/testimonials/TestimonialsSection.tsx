"use client";

import { useEffect, useMemo, useState } from "react";

type Testimonial = {
  name: string;
  role: string;
  rating: number;
  project: string;
  review: string;
};

export function TestimonialsSection() {
  const testimonials: Testimonial[] = useMemo(
    () => [
      {
        name: "Aisha Morgan",
        role: "Product Lead",
        rating: 5,
        project: "E-Commerce Website",
        review:
          "Cinematic UI, lightning performance, and a conversion lift we could measure immediately. The experience feels premium end-to-end.",
      },
      {
        name: "Noah Patel",
        role: "Founder",
        rating: 5,
        project: "Portfolio + Motion System",
        review:
          "Our brand finally looks futuristic and trustworthy. The micro-interactions and 3D moments are exactly the vibe we wanted.",
      },
      {
        name: "Sophia Chen",
        role: "Marketing Director",
        rating: 5,
        project: "SEO Optimization",
        review:
          "Structured metadata, performance-first implementation, and clear reporting. Google visibility improved quickly after launch.",
      },
    ],
    []
  );

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 3200);
    return () => window.clearInterval(id);
  }, [testimonials.length]);

  return (
    <section className="relative bg-[#050816] py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
              <span className="h-2 w-2 rounded-full bg-[#38BDF8] shadow-[0_0_18px_rgba(56,189,248,0.6)]" />
              Client results
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Premium delivery. Real outcomes.
            </h2>
          </div>

          <p className="max-w-xl text-sm leading-6 text-white/70">
            Floating reviews with an elegant marquee feel—so trust is instant.
          </p>
        </div>

        {/* marquee-ish track (simple, avoids complex animation libs for now) */}
        <div className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4">
          <div className="flex gap-4">
            {Array.from({ length: 6 }).map((_, i) => {
              const t = testimonials[(index + i) % testimonials.length];
              return (
                <article
                  key={`${t.name}-${i}`}
                  className="w-full min-w-[320px] rounded-3xl border border-white/10 bg-[#050816]/30 p-6 shadow-[0_0_60px_rgba(56,189,248,0.05)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold text-white">{t.name}</div>
                      <div className="mt-1 text-xs text-white/60">{t.role}</div>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((__, s) => (
                        <span
                          key={s}
                          className={s < t.rating ? "text-[#38BDF8]" : "text-white/20"}
                          aria-hidden="true"
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 text-xs uppercase tracking-[0.25em] text-white/50">
                    {t.project}
                  </div>

                  <p className="mt-4 text-sm leading-6 text-white/70">“{t.review}”</p>

                  <div className="mt-6 flex items-center justify-between">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

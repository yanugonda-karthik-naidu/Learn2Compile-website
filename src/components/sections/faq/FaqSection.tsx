"use client";

import { useMemo, useState } from "react";

type FaqItem = { q: string; a: string };

export function FaqSection() {
  const items: FaqItem[] = useMemo(
    () => [
      { q: "What timeline should I expect?", a: "Most projects ship in 2–6 weeks depending on scope, animations, and integrations." },
      { q: "How does pricing work?", a: "We offer packages plus a live estimate. Final scope is confirmed after a quick discovery call." },
      { q: "Do you include revisions?", a: "Yes. Each plan includes a defined number of revisions with clear milestones." },
      { q: "Do you provide hosting?", a: "We can help with hosting setup and deployment workflows (and include guidance or managed options)." },
      { q: "Will you maintain the website after launch?", a: "Yes. Support guarantees include security updates, performance monitoring, and fast response times." },
      { q: "Is the website SEO-ready?", a: "Every build includes semantic HTML, metadata, structured content, and performance-first implementation." },
      { q: "Is it mobile optimized?", a: "Absolutely. We design touch-first layouts, simplify 3D where needed, and ensure responsive typography." },
      { q: "Can you handle custom features?", a: "Yes. We can build bespoke functionality—forms, dashboards, integrations, and advanced UI systems." },
    ],
    []
  );

  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative bg-[#050816] py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
              <span className="h-2 w-2 rounded-full bg-[#38BDF8] shadow-[0_0_18px_rgba(56,189,248,0.6)]" />
              Futuristic answers
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">FAQ designed for speed.</h2>
          </div>

          <p className="max-w-xl text-sm leading-6 text-white/70">
            Clear, direct answers—so decision-making feels effortless.
          </p>
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-2">
          <div className="space-y-2">
            {items.map((it, idx) => {
              const isOpen = open === idx;
              return (
                <div key={it.q} className="overflow-hidden rounded-2xl border border-white/10 bg-[#050816]/30">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left"
                  >
                    <span className="text-sm font-semibold text-white">{it.q}</span>
                    <span className="text-white/60">{isOpen ? "—" : "+"}</span>
                  </button>

                  <div
                    className={`px-5 pb-5 transition-all duration-300 ${isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    <p className="text-sm leading-6 text-white/70">{it.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

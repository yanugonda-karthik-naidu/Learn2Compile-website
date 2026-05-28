"use client";

const steps = [
  { n: "01", t: "Discovery", d: "We clarify goals, audience, and success metrics." },
  { n: "02", t: "Planning", d: "Architecture, timelines, milestones, and risk control." },
  { n: "03", t: "UI/UX Design", d: "Luxury interface systems with motion-ready layouts." },
  { n: "04", t: "Development", d: "Performance-first engineering with clean components." },
  { n: "05", t: "Testing", d: "QA, accessibility checks, and device compatibility." },
  { n: "06", t: "Launch", d: "Deployment + SEO-ready metadata + monitoring." },
  { n: "07", t: "Support", d: "Ongoing improvements, security updates, fast response." },
];

export function ProcessSection() {
  return (
    <section className="relative bg-[#050816] py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
              <span className="h-2 w-2 rounded-full bg-[#38BDF8] shadow-[0_0_18px_rgba(56,189,248,0.6)]" />
              Scroll storytelling
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">A process that feels cinematic.</h2>
          </div>

          <p className="max-w-xl text-sm leading-6 text-white/70">
            Clear steps, luminous progress, and purposeful motion—so you always know what’s next.
          </p>
        </div>

        <div className="mt-10 relative grid gap-8 md:grid-cols-2">
          <div className="pointer-events-none absolute left-4 top-2 bottom-2 hidden w-px bg-gradient-to-b from-[#38BDF8]/70 via-white/10 to-transparent md:block" />

          {steps.map((s, idx) => (
            <article
              key={s.n}
              className="relative rounded-3xl border border-white/10 bg-white/5 p-6 md:pr-10"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-[0.25em] text-white/60">{s.n}</div>
                  <h3 className="mt-2 text-lg font-semibold text-white">{s.t}</h3>
                </div>
                <div className="h-10 w-10 rounded-2xl border border-white/10 bg-white/5 grid place-items-center text-white/80">
                  {idx + 1}
                </div>
              </div>
              <p className="mt-3 text-sm leading-6 text-white/70">{s.d}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </section>
  );
}

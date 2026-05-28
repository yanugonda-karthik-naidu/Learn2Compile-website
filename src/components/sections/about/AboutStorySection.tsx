"use client";

const milestones = [
  { year: "2025+", title: "Future Ready", icon: "04" },
];

export function AboutStorySection() {
  return (
    <section id="story" className="relative bg-[#050816] py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(139,92,246,0.08),transparent_50%)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-16 text-center" data-animate="fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
            <span className="h-2 w-2 rounded-full bg-[#8B5CF6] shadow-[0_0_18px_rgba(139,92,246,0.6)]" />
            Our Journey
          </div>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            <span className="text-white">From Vision to </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#8B5CF6]">Premium Studio</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-white/70">
            Every project teaches us something new.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-[#38BDF8] via-[#8B5CF6] to-[#06B6D4] opacity-30 md:left-1/2 md:-translate-x-px" />

          <div className="space-y-12 md:space-y-0">
            {milestones.map((m, idx) => (
              <div
                key={m.year}
                className={idx % 2 === 0 ? "md:pr-12 md:text-right" : "md:col-start-2 md:pl-12"}
              >
                <div
                  className="relative pl-12 md:grid md:grid-cols-2 md:gap-8 md:pl-0"
                  data-animate="fade-up"
                >
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:border-[#38BDF8]/30">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-[#38BDF8]/20 to-[#8B5CF6]/20">
                      <span className="text-lg font-semibold text-[#38BDF8]">{m.icon}</span>
                    </div>

                    <div className="text-sm font-semibold text-[#38BDF8]">{m.year}</div>
                    <h3 className="mt-2 text-xl font-semibold text-white">{m.title}</h3>
                  </div>

                  <div className="absolute left-4 top-6 md:static md:flex md:items-center md:justify-center">
                    <div className="h-4 w-4 rounded-full border-2 border-[#38BDF8] bg-[#050816] shadow-[0_0_20px_rgba(56,189,248,0.4)]" />
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


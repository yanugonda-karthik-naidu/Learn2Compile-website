"use client";

import { useMemo } from "react";

const principles = [
  {
    title: "Performance-First Engineering",
    description:
      "Lightning-fast loading, smooth interactions, and optimized for search engines from day one.",
    icon: "02",
  },
  {
    title: "Premium Visual Experience",
    description:
      "Cinematic motion, immersive 3D, and elegant interactions that leave lasting impressions.",
    icon: "03",
  },
  {
    title: "Transparent Communication",
    description:
      "Clear timelines, honest pricing, and consistent updates throughout your project journey.",
    icon: "05",
  },
  {
    title: "Mobile-First Development",
    description:
      "Touch-friendly layouts built for Indian audiences browsing on Android and diverse devices.",
    icon: "04",
  },
];

export function AboutPhilosophySection() {
  // Keep stable render reference (helps any data-animate bindings)
  const items = useMemo(() => principles, []);

  return (
    <section className="relative bg-[#050816] py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(56,189,248,0.08),transparent_50%)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-16 text-center" data-animate="fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
            Our Philosophy
            <span className="h-2 w-2 rounded-full bg-[#38BDF8] shadow-[0_0_18px_rgba(56,189,248,0.6)]" />
          </div>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            <span className="text-white">What Drives </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#06B6D4]">Everything We Do</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-white/70">
            We believe great digital experiences are born at the intersection of
            business strategy and creative engineering.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" data-animate="stagger">
          {items.map((p) => (
            <div
              key={p.title}
              data-stagger-item
              className="group rounded-3xl border border-white/10 bg-white/5 p-6 transition-all hover:border-[#38BDF8]/30 hover:bg-white/[0.07]"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-[#38BDF8]/20 to-[#06B6D4]/20">
                <span className="text-lg font-semibold text-[#38BDF8]">{p.icon}</span>
              </div>

              <p className="mt-2 text-sm text-white/70">{p.description}</p>
              <h3 className="text-lg font-semibold text-white">{p.title}</h3>

              <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


"use client";

import { useMemo } from "react";
import { Navbar } from "@/components/layout/Navbar";

export function StudioLanding() {
  const lines = useMemo(() => ["We Build Future-Ready", "Digital Experiences"], []);
  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#050816] text-white">
      <Navbar />
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
              <span className="h-2 w-2 rounded-full bg-[#38BDF8] shadow-[0_0_18px_rgba(56,189,248,0.6)]" />
              AI-powered digital studio
            </div>
            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
              {lines[0]}<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-[#8B5CF6] to-[#06B6D4]">{lines[1]}</span>
            </h1>
            <p className="mt-5 max-w-xl text-pretty text-base leading-7 text-white/70">
              Premium web development with cinematic motion, immersive 3D, and performance-first engineering—built to increase conversion and instantly build trust.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/custom-quote" className="group inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white shadow-[0_0_0_1px_rgba(255,255,255,0.06)] transition hover:border-white/30 hover:bg-white/10">
                <span className="relative">Start Your Project</span>
                <span className="ml-2 transition group-hover:translate-x-1">→</span>
              </a>
              <a href="/portfolio" className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#38BDF8]/20 via-[#8B5CF6]/20 to-[#06B6D4]/20 px-5 py-3 text-sm font-medium text-white shadow-[0_0_30px_rgba(56,189,248,0.15)] transition hover:from-[#38BDF8]/30 hover:via-[#8B5CF6]/30 hover:to-[#06B6D4]/30">
                View Our Work
              </a>
            </div>
          </div>
          <div className="relative h-[340px] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-4 lg:h-[420px]">
            <div className="absolute inset-0 bg-[radial-gradient(600px_circle_at_20%_20%,rgba(56,189,248,0.18),transparent_55%),radial-gradient(500px_circle_at_80%_70%,rgba(139,92,246,0.16),transparent_50%)]" />
            <div className="absolute left-6 top-6 h-3 w-3 rounded-full bg-[#38BDF8] shadow-[0_0_24px_rgba(56,189,248,0.6)]" />
            <div className="absolute right-8 bottom-10 h-3 w-3 rounded-full bg-[#8B5CF6] shadow-[0_0_24px_rgba(139,92,246,0.55)]" />
            <div className="relative flex h-full w-full items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="text-xs uppercase tracking-[0.25em] text-white/60">Interactive 3D</div>
                <div className="mt-3 h-[200px] w-[220px] rounded-3xl border border-white/10 bg-white/5 shadow-[0_0_60px_rgba(56,189,248,0.10)]" />
                <div className="mt-4 text-center text-sm text-white/70">Hero 3D scene will be mounted here (GPU-friendly + mobile fallback).</div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {[{ k: "60 FPS", v: "Motion-optimized" }, { k: "SEO READY", v: "Structured metadata" }, { k: "FAST", v: "Performance-first builds" }].map((item) => (
            <div key={item.k} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm font-semibold text-white">{item.k}</div>
              <div className="mt-1 text-xs text-white/65">{item.v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
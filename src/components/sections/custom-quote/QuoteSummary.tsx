"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export function QuoteSummary() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative bg-[#050816] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div
          ref={sectionRef}
          className="overflow-hidden rounded-3xl border border-white/10 bg-white/5"
        >
          {/* Gradient background */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(800px circle at 50% -20%, rgba(56,189,248,0.12), transparent 55%), radial-gradient(600px circle at 80% 80%, rgba(139,92,246,0.10), transparent 50%)",
            }}
          />

          <div className="relative p-8 md:p-12">
            <div className="grid gap-12 md:grid-cols-2">
              {/* Left: Why choose us */}
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
                  <span className="h-2 w-2 rounded-full bg-[#38BDF8] shadow-[0_0_18px_rgba(56,189,248,0.6)]" />
                  What you get
                </div>

                <h2 className="mt-6 text-2xl font-semibold tracking-tight text-white">
                  Premium consultation, not generic forms.
                </h2>

                <div className="mt-6 space-y-4">
                  {[
                    {
                      title: "Clear scope document",
                      desc: "Receive a detailed breakdown of deliverables, timeline, and investment — no vague proposals.",
                    },
                    {
                      title: "Direct communication",
                      desc: "Connect directly with our team. No HR-filtered emails or generic auto-replies.",
                    },
                    {
                      title: "Flexible sequencing",
                      desc: "We adapt to your timeline. Express delivery available for urgent projects.",
                    },
                    {
                      title: "Ongoing support",
                      desc: "Every project includes post-launch support. Your digital presence is never abandoned.",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
                    >
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                        <svg
                          className="h-5 w-5 text-[#38BDF8]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">
                          {item.title}
                        </div>
                        <div className="mt-1 text-xs text-white/60">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Trust stats */}
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
                  <span className="h-2 w-2 rounded-full bg-[#8B5CF6] shadow-[0_0_18px_rgba(139,92,246,0.6)]" />
                  Studio track record
                </div>

                <h3 className="mt-6 text-xl font-semibold text-white">
                  Trusted by businesses across India
                </h3>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  {[
                    { value: "50+", label: "Projects delivered" },
                    { value: "98%", label: "Client satisfaction" },
                    { value: "3.2x", label: "Average ROI" },
                    { value: "24h", label: "Response time" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center"
                    >
                      <div className="text-3xl font-semibold text-[#38BDF8]">
                        {stat.value}
                      </div>
                      <div className="mt-1 text-xs text-white/60">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="text-sm font-semibold text-white">
                    Industries we serve
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {[
                      "Startups",
                      "Wedding planners",
                      "Restaurants",
                      "Coaching institutes",
                      "Personal brands",
                      "E-commerce",
                      "Local businesses",
                      "Creators",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-[#38BDF8]/20 bg-[#38BDF8]/5 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#38BDF8]/20">
                      <svg
                        className="h-5 w-5 text-[#38BDF8]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">
                        24-hour response guarantee
                      </div>
                      <div className="mt-1 text-xs text-white/60">
                        Receive a clear scope document within 24 hours of your
                        inquiry.
                      </div>
                    </div>
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
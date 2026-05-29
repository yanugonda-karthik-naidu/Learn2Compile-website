"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugin only on client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const featuredProject = {
  name: "Aurora Wedding Planner",
  type: "Wedding Planner Website",
  tagline: "Where Romance Meets Premium Digital Experience",
  description: "A stunning wedding planner website that captures the elegance and emotion of special moments. Built with cinematic visuals, smooth animations, and conversion-focused design.",
  features: [
    "Cinematic hero with parallax storytelling",
    "Elegant gallery with lightbox functionality",
    "Booking-ready inquiry forms",
    "Mobile-optimized for Instagram traffic",
    "SEO-structured for local wedding searches",
  ],
  outcomes: [
    { label: "Conversion Increase", value: "38%" },
    { label: "Mobile Performance", value: "95+" },
    { label: "SEO Score", value: "A+" },
  ],
  color: "#EC4899",
};

export function FeaturedProject() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    gsap.fromTo(contentRef.current.children, { y: 50, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out",
      scrollTrigger: { trigger: contentRef.current, start: "top 80%", toggleActions: "play none none reverse" },
    });
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#050816] py-20">
      <div className="absolute inset-0 bg-[radial-gradient(600px_circle_at_20%_30%,rgba(236,72,153,0.08),transparent_50%)]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={contentRef} className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-pink-500/10 to-purple-500/10 blur-xl" />
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent">
              <div className="absolute inset-0 bg-[radial-gradient(400px_circle_at_30%_30%,rgba(236,72,153,0.2),transparent_50%)]" />
              <div className="aspect-video bg-gradient-to-br from-pink-900/30 via-purple-900/20 to-pink-900/30 p-6">
                <div className="flex h-full items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white/80">Aurora</div>
                    <div className="mt-2 text-sm text-white/50">Wedding Planner</div>
                    <div className="mt-4 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10">
                      <svg className="h-5 w-5 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: featuredProject.color }} />
              Featured Project
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              <span className="text-white">{featuredProject.name}</span>
            </h2>
            <p className="mt-3 text-lg text-white/60">{featuredProject.tagline}</p>
            <p className="mt-4 text-base text-white/70">{featuredProject.description}</p>


            <div className="mt-6 space-y-3">
              {featuredProject.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full border border-white/20 bg-white/5">
                    <svg className="h-3.5 w-3.5 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span className="text-sm text-white/70">{feature}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
              {featuredProject.outcomes.map((outcome) => (
                <div key={outcome.label} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                  <div className="text-2xl font-bold text-white" style={{ color: featuredProject.color }}>{outcome.value}</div>
                  <div className="mt-1 text-xs text-white/50">{outcome.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex gap-4">
              <a href="/custom-quote" className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-pink-500/20 px-5 py-2.5 text-sm font-medium text-white shadow-[0_0_30px_rgba(236,72,153,0.15)] transition-all duration-200 hover:from-pink-500/30 hover:via-purple-500/30 hover:to-pink-500/30">
                Similar Project
                <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
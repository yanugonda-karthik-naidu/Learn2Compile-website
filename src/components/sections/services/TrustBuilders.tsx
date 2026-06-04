"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/gsap/reducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  { label: "Industries Served", value: "3+", icon: "🏭", description: "Business types we specialize in" },
  { label: "Projects Delivered", value: "10+", icon: "🎯", description: "Websites built and launched" },
  { label: "Response Time", value: "<24h", icon: "⚡", description: "Average reply time during business hours" },
  { label: "Support Available", value: "7 Days", icon: "📅", description: "Weekdays and weekend coverage" },
];

const industries = [
  "Wedding Planning",
  "Restaurants & Cafes",
  "Coaching & Education",
  "Local Businesses",
  "Startups & SaaS",
  "Creative Professionals",
  "Medical & Wellness",
  "Beauty & Fashion",
  "Stores & E-commerce",
  "Custom Niches (Ask Us!)",
];

export function TrustBuilders() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const elements = contentRef.current!.querySelectorAll(".trust-animate");
      gsap.fromTo(
        elements,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#050816] py-16 sm:py-20 md:py-24">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute left-0 bottom-0 h-[400px] w-[400px] rounded-full bg-[#38BDF8]/5 blur-[120px]" />
        <div className="absolute right-0 top-0 h-[300px] w-[300px] rounded-full bg-[#8B5CF6]/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div ref={contentRef}>
          {/* Stats Grid */}
          <div className="mb-12 sm:mb-16 grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="trust-animate rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 text-center"
              >
                <div className="mx-auto flex h-12 sm:h-14 w-12 sm:w-14 items-center justify-center rounded-full bg-white/5 text-2xl sm:text-3xl">
                  {stat.icon}
                </div>
                <div className="mt-3 text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
                <div className="mt-1 text-sm font-medium text-white/80">{stat.label}</div>
                <div className="mt-1 text-xs text-white/50">{stat.description}</div>
              </div>
            ))}
          </div>

          {/* Industries We Serve */}
          <div className="trust-animate rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 md:p-10">
            <div className="text-center">
              <h3 className="text-xl sm:text-2xl font-semibold text-white">Industries We Serve</h3>
              <p className="mt-2 text-sm sm:text-base text-white/60">
                We understand the unique needs of different businesses
              </p>
            </div>
            <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-3 sm:gap-4">
              {industries.map((industry) => (
                <div
                  key={industry}
                  className="trust-animate rounded-full border border-white/10 bg-white/5 px-4 sm:px-5 py-2 sm:py-2.5 text-sm text-white/70"
                >
                  <span className="mr-1.5 text-white/40">✓</span>
                  {industry}
                </div>
              ))}
            </div>
          </div>

          {/* Trust Statement */}
          <div className="trust-animate mt-8 sm:mt-10 text-center">
            <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
              We don&apos;t just build websites. We build partnerships. When you work with Learn2Compile, you get a team that
              understands your business goals and works tirelessly to achieve them.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
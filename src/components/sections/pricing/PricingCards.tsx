"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/gsap/reducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Package = {
  key: string;
  title: string;
  tagline: string;
  valueCallout: string;
  badge?: string;
  bestFor: string[];
  priceRange: string;
  timeline: string;
  includes: string[];
  highlight?: boolean;
  gradient: string;
  accent: string;
  glowColor: string;
  buttonGradient: string;
};

const packages: Package[] = [
  {
    key: "starter",
    title: "Starter Website",
    tagline: "Perfect for establishing your online presence",
    valueCallout: "Perfect for getting online quickly.",
    bestFor: ["Small Businesses", "Local Shops", "Freelancers", "Personal Brands"],
    priceRange: "Starting at ₹3,999",
    timeline: "2–3 Days",
    includes: [
      "Up to 3 Pages",
      "Mobile Responsive Design",
      "Contact Form",
      "WhatsApp Integration",
      "Google Maps Integration",
      "Basic SEO Setup",
      "Fast Loading Website",
      "Social Media Integration",
    ],
    gradient: "from-[#38BDF8]/10 to-[#38BDF8]/5",
    accent: "#38BDF8",
    glowColor: "rgba(56,189,248,0.18)",
    buttonGradient: "linear-gradient(to right, #38BDF8, #06B6D4)",
  },
  {
    key: "business",
    title: "Business Website",
    tagline: "Most popular for growing businesses",
    valueCallout: "Most selected by growing businesses.",
    badge: "MOST POPULAR",
    bestFor: ["Wedding Planners", "Restaurants", "Coaching Institutes", "Service Businesses"],
    priceRange: "Starting at ₹8,999",
    timeline: "5–6 Days",
    includes: [
      "Everything in Starter",
      "Up to 8 Pages",
      "Premium UI Design",
      "Lead Generation Forms",
      "Advanced SEO Setup",
      "Gallery Section",
      "Performance Optimization",
      "Conversion-Focused Layout",
      "Enhanced User Experience",
    ],
    highlight: true,
    gradient: "from-[#8B5CF6]/15 to-[#8B5CF6]/5",
    accent: "#8B5CF6",
    glowColor: "rgba(139,92,246,0.22)",
    buttonGradient: "linear-gradient(to right, #8B5CF6, #6366F1)",
  },
  {
    key: "premium",
    title: "Premium Business Solution",
    tagline: "For unique requirements and startups",
    valueCallout: "Built for brands that need custom experiences.",
    bestFor: ["Growing Businesses", "Startups", "Custom Requirements"],
    priceRange: "Starting at ₹14,999",
    timeline: "14–21 Days",
    includes: [
      "Everything in Business Package",
      "Custom Design",
      "Unlimited Sections",
      "Booking/Appointment Forms",
      "Advanced Integrations",
      "Blog System",
      "Priority Support",
      "Custom Features",
      "Scalability Planning",
    ],
    gradient: "from-[#6366F1]/15 to-[#8B5CF6]/5",
    accent: "#6366F1",
    glowColor: "rgba(99,102,241,0.20)",
    buttonGradient: "linear-gradient(to right, #6366F1, #8B5CF6)",
  },
];

const trustItems = [
  "Transparent Pricing",
  "No Hidden Charges",
  "Mobile Responsive Included",
  "SEO Foundation Included",
  "Post Launch Support",
];

function GlowCheckIcon({ color }: { color: string }) {
  return (
    <svg
      className="h-4 sm:h-5 w-4 sm:w-5 flex-shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke={color}
      strokeWidth={2}
      style={{
        filter: `drop-shadow(0 0 6px ${color})`,
      }}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function PricingCard({ pkg, index }: { pkg: Package; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          delay: index * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 88%",
          },
        }
      );

      const featureItems = cardRef.current?.querySelectorAll(".feature-item");
      if (featureItems) {
        gsap.fromTo(
          featureItems,
          { opacity: 0, x: -10 },
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 85%",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, [index]);

  useEffect(() => {
    if (!glowRef.current) return;
    if (hovered) {
      gsap.to(glowRef.current, {
        opacity: 1,
        scale: 1.2,
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      gsap.to(glowRef.current, {
        opacity: 0,
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  }, [hovered]);

  return (
    <article
      ref={cardRef}
      className={`group relative flex flex-col overflow-hidden rounded-2xl sm:rounded-3xl border transition-all duration-500 ${
        pkg.highlight
          ? "scale-[1.02] border-[#8B5CF6]/40 bg-[#8B5CF6]/5"
          : "border-white/[0.08] bg-white/[0.03]"
      } hover:border-white/[0.15] hover:translate-y-[-8px] hover:scale-[1.01]`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        ref={glowRef}
        className="absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${pkg.glowColor}, transparent 70%)`,
        }}
      />

      {pkg.highlight && (
        <div className="absolute -top-0 left-1/2 -translate-x-1/2 z-10">
          <div className="relative rounded-b-xl sm:rounded-b-2xl border border-[#8B5CF6]/50 bg-gradient-to-r from-[#8B5CF6] via-[#6366F1] to-[#8B5CF6] px-4 sm:px-5 py-1.5 sm:py-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_30px_rgba(139,92,246,0.4)]">
            <span className="relative">Most Popular</span>
            <span className="absolute inset-0 rounded-b-xl sm:rounded-b-2xl animate-pulse bg-gradient-to-r from-[#8B5CF6] via-[#6366F1] to-[#8B5CF6]" />
          </div>
        </div>
      )}

      <div className="relative flex flex-col justify-between p-5 sm:p-6 lg:p-7 pt-10 sm:pt-12 flex-1 min-h-[480px] sm:min-h-[520px] lg:min-h-[560px]">
        <div>
          <div
            className="text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors duration-300"
            style={{ color: pkg.accent }}
          >
            {pkg.title}
          </div>
          <p className="mt-2 text-sm sm:text-base text-white/60 leading-relaxed">{pkg.tagline}</p>
        </div>

        <div className="mt-5 sm:mt-6">
          <div className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-white tracking-tight">
            {pkg.priceRange}
          </div>
          <div className="mt-2 text-xs sm:text-sm text-white/50 font-medium">
            One-time Investment
          </div>
          <div className="mt-3 sm:mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 sm:px-4 py-1.5 sm:py-2">
            <svg className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs sm:text-sm text-white/70 font-medium">Delivery Timeline: {pkg.timeline}</span>
          </div>
        </div>

        <div className="mt-5 sm:mt-6">
          <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white/40 mb-2 sm:mb-3">Best For</div>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {pkg.bestFor.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs text-white/60 font-medium backdrop-blur-sm transition-all duration-300 hover:border-white/15 hover:bg-white/[0.08]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-5 sm:mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="mt-5 sm:mt-6 flex-1">
          <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white/40 mb-2 sm:mb-3">What&apos;s Included</div>
          <ul className="space-y-2 sm:space-y-2.5">
            {(expanded ? pkg.includes : pkg.includes.slice(0, 4)).map((item) => (
              <li
                key={item}
                className="feature-item flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-white/70"
              >
                <GlowCheckIcon color={pkg.accent} />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>

          {pkg.includes.length > 4 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-3 sm:mt-4 flex items-center gap-1.5 text-xs sm:text-sm text-white/50 transition-all duration-300 hover:text-white/80"
            >
              <span>{expanded ? "Show less" : `+${pkg.includes.length - 4} more`}</span>
              <svg
                className={`h-3.5 sm:h-4 w-3.5 sm:w-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}
        </div>

        <div className="mt-4 sm:mt-5 text-[11px] sm:text-xs text-white/50 italic leading-relaxed">
          {pkg.valueCallout}
        </div>

        <div className="mt-4 sm:mt-5 flex flex-col gap-2.5 sm:gap-3">
          <a
            href="/custom-quote"
            className="group/btn flex w-full items-center justify-center gap-2 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-3.5 text-sm sm:text-base font-semibold text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: pkg.buttonGradient,
              boxShadow: hovered ? `0 0 35px ${pkg.accent}50` : `0 0 20px ${pkg.accent}25`,
            }}
          >
            <span>{pkg.key === "starter" ? "Start Your Project" : pkg.key === "business" ? "Get Started" : "Request Consultation"}</span>
            <svg className="h-4 sm:h-5 w-4 sm:w-5 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <Link
            href="/custom-quote#quote-configurator"
            className="flex w-full items-center justify-center gap-2 rounded-xl sm:rounded-2xl border border-white/15 bg-white/[0.04] backdrop-blur-sm px-4 sm:px-6 py-3 sm:py-3.5 text-sm sm:text-base font-medium text-white/80 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.08]"
          >
            <span>Request Custom Quote</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

function TrustStrip() {
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!stripRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const trustItems = stripRef.current?.querySelectorAll(".trust-item");
      if (!trustItems || trustItems.length === 0) return;

      gsap.fromTo(
        trustItems,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: stripRef.current,
            start: "top 90%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={stripRef}
      className="flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6 mb-10 sm:mb-12 lg:mb-14 px-2"
    >
      {trustItems.map((item) => (
        <div
          key={item}
          className="trust-item group inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm text-white/70 font-medium transition-all duration-300 hover:border-[#38BDF8]/30 hover:bg-white/[0.08] hover:shadow-[0_0_20px_rgba(56,189,248,0.15)] cursor-default"
        >
          <span className="text-[#38BDF8]">✓</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}

export function PricingCards() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="pricing-cards"
      className="relative overflow-hidden bg-[#050816] py-16 sm:py-20 md:py-24 lg:py-28"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -left-32 sm:-left-48 top-1/4 w-96 sm:w-[500px] h-96 sm:h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(56,189,248,0.10) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute left-1/2 -translate-x-1/2 top-1/3 w-80 sm:w-96 h-80 sm:h-96 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute -right-32 sm:-right-48 top-1/4 w-96 sm:w-[500px] h-96 sm:h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(99,102,241,0.10) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="section-header mb-10 sm:mb-12 lg:mb-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-white/80">
            <span className="h-2 w-2 rounded-full bg-[#38BDF8] shadow-[0_0_18px_rgba(56,189,248,0.6)]" />
            Investment Options
          </div>

          <h2 className="mt-5 sm:mt-6 lg:mt-8 text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.1]">
            <span className="text-white">Choose Your </span>
            <span
              className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-[#8B5CF6] to-[#6366F1] animate-gradient-shift"
            >
              Website Package
            </span>
          </h2>

          <p className="mt-4 sm:mt-5 lg:mt-6 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg text-white/60 leading-relaxed px-2 sm:px-0">
            Transparent pricing designed for businesses that value quality, performance, and long-term growth.
          </p>
        </div>

        <TrustStrip />

        <div className="grid gap-5 sm:gap-6 lg:gap-8 md:grid-cols-2 lg:grid-cols-3 lg:items-stretch">
          {packages.map((pkg, index) => (
            <PricingCard key={pkg.key} pkg={pkg} index={index} />
          ))}
        </div>

        <div className="mt-16 sm:mt-20 lg:mt-24">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-[#38BDF8]/5 via-transparent to-[#8B5CF6]/5 pointer-events-none" />

            <div className="relative grid gap-6 sm:gap-8 lg:grid-cols-[1fr_auto] items-center p-6 sm:p-8 lg:p-10">

              <div className="space-y-4 sm:space-y-5">

                <div className="inline-flex items-center rounded-full border border-[#38BDF8]/20 bg-[#38BDF8]/10 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-[#38BDF8]">
                  Need Help Choosing?
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight tracking-tight">
                  Not Sure Which Package Fits Your Business?
                </h3>

                <p className="max-w-2xl text-sm sm:text-base text-white/60 leading-relaxed">
                  Every business has different goals and requirements. Tell us about
                  your project and we&apos;ll recommend the most suitable solution based on
                  your budget, timeline, and business objectives.
                </p>

                <div className="flex flex-wrap gap-2 sm:gap-3 pt-2">
                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-white/60">
                    Free Consultation
                  </span>

                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-white/60">
                    Custom Recommendations
                  </span>

                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-white/60">
                    Transparent Pricing
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3 min-w-[260px] sm:min-w-[300px]">

                <a
                  href="/custom-quote"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#38BDF8] to-[#8B5CF6] px-6 sm:px-8 py-4 text-sm sm:text-base font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(56,189,248,0.25)]"
                >
                  Get Personalized Recommendation
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>

                <a
                  href="https://wa.me/917793922519"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-6 sm:px-8 py-4 text-sm sm:text-base font-medium text-white/80 transition-all duration-300 hover:bg-white/[0.06]"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Talk on WhatsApp
                </a>

              </div>

            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-shift {
          background-size: 200% 100%;
          animation: gradient-shift 4s ease infinite;
        }
      `}</style>
    </section>
  );
}

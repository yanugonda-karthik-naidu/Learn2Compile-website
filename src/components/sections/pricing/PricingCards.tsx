"use client";

import { useState } from "react";

type Package = {
  key: string;
  title: string;
  priceRange: string;
  timeline: string;
  revisions: string;
  support: string;
  features: string[];
  gradient: string;
  accent: string;
};

const packages: Package[] = [
  {
    key: "starter",
    title: "Starter",
    priceRange: "$1,200–$2,000",
    timeline: "1–2 weeks",
    revisions: "2 included",
    support: "7 days support",
    features: [
      "Core pages (up to 5)",
      "Basic motion & animations",
      "SEO foundation structure",
      "Performance optimization",
      "Mobile responsive",
      "Contact form setup",
      "Basic analytics",
    ],
    gradient: "from-[#38BDF8]/10 to-[#38BDF8]/5",
    accent: "#38BDF8",
  },
  {
    key: "growth",
    title: "Growth",
    priceRange: "$2,500–$4,200",
    timeline: "3–4 weeks",
    revisions: "4 included",
    support: "30 days support",
    features: [
      "All Starter features",
      "Premium UI/UX design",
      "Advanced motion systems",
      "Conversion-optimized layout",
      "Glassy section effects",
      "Analytics integration",
      "CMS-ready structure",
      "Priority configuration",
    ],
    gradient: "from-[#8B5CF6]/15 to-[#8B5CF6]/5",
    accent: "#8B5CF6",
  },
  {
    key: "premium",
    title: "Premium",
    priceRange: "$4,500–$8,000",
    timeline: "5–7 weeks",
    revisions: "6 included",
    support: "60 days support",
    features: [
      "All Growth features",
      "Cinematic 3D environments",
      "Immersive animations",
      "Advanced SEO optimization",
      "Custom integrations",
      "E-commerce capability",
      "Multi-language support",
      "White-glove support",
    ],
    gradient: "from-[#06B6D4]/15 to-[#06B6D4]/5",
    accent: "#06B6D4",
  },
];

function PricingCard({ pkg, index }: { pkg: Package; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition-all duration-500 hover:border-white/20 hover:bg-white/[0.07]"
      style={{
        transform: hovered ? "scale(1.02)" : "scale(1)",
        boxShadow: hovered
          ? `0 0 80px ${pkg.accent}20, 0 0 40px ${pkg.accent}10`
          : "0 0 40px rgba(56,189,248,0.03)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-stagger-item
    >
      {/* Gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at 50% 0%, ${pkg.accent}25, transparent 60%)`,
        }}
      />

      {/* Accent line */}
      <div
        className="absolute left-0 top-0 h-px w-full"
        style={{
          background: `linear-gradient(90deg, transparent, ${pkg.accent}, transparent)`,
        }}
      />

      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <div
              className="text-xs uppercase tracking-[0.25em] transition-colors duration-300"
              style={{ color: pkg.accent }}
            >
              {pkg.title}
            </div>
            <div className="mt-3 text-3xl font-semibold text-white">
              {pkg.priceRange}
            </div>
            <div className="mt-1 text-sm text-white/60">
              Timeline: {pkg.timeline}
            </div>
          </div>
          <div
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-sm font-medium text-white"
            style={{ color: pkg.accent }}
          >
            {index + 1}
          </div>
        </div>

        {/* Features */}
        <ul className="mt-6 space-y-3">
          {pkg.features.slice(0, expanded ? undefined : 4).map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <svg
                className="mt-1 h-4 w-4 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke={pkg.accent}
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-sm text-white/80">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Expand toggle */}
        {pkg.features.length > 4 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-4 flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white/80"
          >
            <span>{expanded ? "Show less" : `${pkg.features.length - 4} more features`}</span>
            <svg
              className={`h-4 w-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}

        {/* Meta info */}
        <div className="mt-6 grid grid-cols-2 gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
          <div>
            <div className="text-xs text-white/50">Revisions</div>
            <div className="mt-1 text-sm font-semibold text-white">{pkg.revisions}</div>
          </div>
          <div>
            <div className="text-xs text-white/50">Support</div>
            <div className="mt-1 text-sm font-semibold text-white">{pkg.support}</div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-6">
          <a
            href="/custom-quote"
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition-all duration-300 hover:border-white/20 hover:bg-white/10"
            style={{
              background: hovered ? `${pkg.accent}15` : undefined,
              borderColor: hovered ? `${pkg.accent}40` : undefined,
            }}
          >
            Start with {pkg.title}
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}

export function PricingCards() {
  return (
    <section id="pricing-cards" className="relative bg-[#050816] py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
              <span className="h-2 w-2 rounded-full bg-[#38BDF8] shadow-[0_0_18px_rgba(56,189,248,0.6)]" />
              Transparent packages
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Choose your investment level.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-white/70">
            Each package is engineered for specific business needs. All plans
            include our premium design system and conversion-focused approach.
          </p>
        </div>

        {/* Pricing cards grid */}
        <div className="mt-12 grid gap-6 lg:grid-cols-3" data-animate="stagger">
          {packages.map((pkg, index) => (
            <PricingCard key={pkg.key} pkg={pkg} index={index} />
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <p className="text-sm text-white/50">
            All packages include source code ownership and lifetime technical guidance.
            <br />
            Need a custom scope?{" "}
            <a href="/custom-quote" className="text-[#38BDF8] hover:underline">
              Get a personalized quote
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

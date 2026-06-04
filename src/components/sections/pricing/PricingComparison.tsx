"use client";

import { useCallback, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const trustIndicators = [
  "Transparent Pricing",
  "No Hidden Charges",
  "Mobile Responsive Included",
  "SEO Foundation Included",
  "Post Launch Support",
];

type FeatureRow = {
  name: string;
  starter: boolean | string;
  business: boolean | string;
  premium: boolean | string;
  icon?: string;
};

type FeatureCategory = {
  title: string;
  icon: string;
  features: FeatureRow[];
};

const featureGroups: FeatureCategory[] = [
  {
    title: "Website Structure",
    icon: "🌐",
    features: [
      { name: "Pages", starter: "Up to 3", business: "Up to 8", premium: "Unlimited", icon: "📄" },
      { name: "Sections", starter: "Up to 5", business: "Up to 15", premium: "Unlimited", icon: "📑" },
      { name: "Blog System", starter: false, business: false, premium: true, icon: "✍️" },
      { name: "Gallery Section", starter: false, business: true, premium: true, icon: "🖼️" },
    ],
  },
  {
    title: "Design & Experience",
    icon: "🎨",
    features: [
      { name: "Premium UI Design", starter: false, business: true, premium: true, icon: "✨" },
      { name: "Custom Design", starter: false, business: false, premium: true, icon: "🎯" },
      { name: "Responsive Design", starter: true, business: true, premium: true, icon: "📱" },
      { name: "UX Enhancements", starter: false, business: true, premium: true, icon: "🚀" },
    ],
  },
  {
    title: "Marketing & SEO",
    icon: "📈",
    features: [
      { name: "SEO Setup", starter: "Basic", business: "Advanced", premium: "Advanced +", icon: "🔍" },
      { name: "Performance", starter: false, business: true, premium: true, icon: "⚡" },
      { name: "Conversion Layout", starter: false, business: true, premium: true, icon: "💎" },
      { name: "Lead Generation Forms", starter: false, business: true, premium: true, icon: "📧" },
    ],
  },
  {
    title: "Integrations",
    icon: "🔗",
    features: [
      { name: "WhatsApp Integration", starter: true, business: true, premium: true, icon: "💬" },
      { name: "Google Maps", starter: true, business: true, premium: true, icon: "📍" },
      { name: "Social Media", starter: true, business: true, premium: true, icon: "📲" },
      { name: "Advanced Integrations", starter: false, business: false, premium: true, icon: "⚙️" },
    ],
  },
  {
    title: "Support & Growth",
    icon: "🛡️",
    features: [
      { name: "Priority Support", starter: false, business: false, premium: true, icon: "🎧" },
      { name: "Custom Features", starter: false, business: false, premium: true, icon: "🧩" },
      { name: "Scalability Planning", starter: false, business: false, premium: true, icon: "📐" },
    ],
  },
];

function CheckIcon({ color }: { color: "cyan" | "purple" | "blue" }) {
  const colorMap = {
    cyan: "#38BDF8",
    purple: "#8B5CF6",
    blue: "#06B6D4",
  };
  const glowMap = {
    cyan: "rgba(56, 189, 248, 0.6)",
    purple: "rgba(139, 92, 246, 0.6)",
    blue: "rgba(6, 182, 212, 0.6)",
  };

  return (
    <div className="relative flex items-center justify-center">
      <div
        className="absolute inset-0 blur-md opacity-40"
        style={{ backgroundColor: glowMap[color] }}
      />
      <svg
        className="h-5 w-5 relative"
        style={{ color: colorMap[color], filter: `drop-shadow(0 0 8px ${glowMap[color]})` }}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </div>
  );
}

function DashIcon() {
  return (
    <svg
      className="h-5 w-5 text-white/25"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
    </svg>
  );
}

function TextCell({ text, color }: { text: string; color: "cyan" | "purple" | "blue" | "white" }) {
  const colorMap = {
    cyan: "text-[#38BDF8]",
    purple: "text-[#8B5CF6]",
    blue: "text-[#06B6D4]",
    white: "text-white/90",
  };

  return (
    <div className={`flex justify-center font-medium text-xs sm:text-sm ${colorMap[color]}`}>
      {text}
    </div>
  );
}

function TrustBadge({ text }: { text: string }) {
  return (
    <div className="group relative inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/80 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(139,92,246,0.2)] cursor-default">
      <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#38BDF8] to-[#8B5CF6]" />
      {text}
    </div>
  );
}

function PackageHeaderCard({
  name,
  price,
  glowColor,
  isPopular,
}: {
  name: string;
  price: string;
  glowColor: "cyan" | "purple" | "blue";
  isPopular?: boolean;
}) {
  const glowMap = {
    cyan: "shadow-[0_0_40px_rgba(56,189,248,0.3)] border-[#38BDF8]/30 bg-[#38BDF8]/10",
    purple: "shadow-[0_0_40px_rgba(139,92,246,0.4)] border-[#8B5CF6]/40 bg-[#8B5CF6]/15",
    blue: "shadow-[0_0_40px_rgba(6,182,212,0.3)] border-[#06B6D4]/30 bg-[#06B6D4]/10",
  };

  const textMap = {
    cyan: "text-[#38BDF8]",
    purple: "text-[#8B5CF6]",
    blue: "text-[#06B6D4]",
  };

  return (
    <div
      className={`relative rounded-2xl border p-4 transition-all duration-300 hover:scale-[1.02] ${glowMap[glowColor]} ${
        isPopular ? "scale-[1.03] z-10" : ""
      }`}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <div className="inline-flex items-center gap-1 rounded-full border border-[#8B5CF6]/30 bg-gradient-to-r from-[#8B5CF6]/20 to-[#A855F7]/20 px-3 py-1 text-[10px] font-semibold text-white backdrop-blur-sm shadow-[0_0_20px_rgba(139,92,246,0.3)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#8B5CF6] animate-pulse" />
            Most Popular
          </div>
        </div>
      )}
      <div className={`text-base font-bold ${textMap[glowColor]}`}>{name}</div>
      <div className="mt-1 text-lg font-bold text-white">{price}</div>
      <div className="mt-1 text-[10px] text-white/50 uppercase tracking-wider">Starting Price</div>
    </div>
  );
}

function CategoryDivider({ title, icon }: { title: string; icon: string }) {
  return (
    <div className="group flex items-center gap-3 py-3 my-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-sm backdrop-blur-sm transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/10">
        {icon}
      </div>
      <div className="text-sm font-semibold text-white/90 tracking-wide">{title}</div>
      <div className="flex-1 border-t border-white/10" />
    </div>
  );
}

export function PricingComparison() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const categoryRefs = useRef<(HTMLDivElement | null)[]>([]);
  const trustRef = useRef<HTMLDivElement>(null);
  const headerCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current || typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Trust badges staggered animation
      if (trustRef.current) {
        gsap.fromTo(
          Array.from(trustRef.current.children),
          { y: 20, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: trustRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // Header cards animation
      gsap.fromTo(
        headerCardRefs.current.filter(Boolean),
        { y: 30, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: tableRef.current,
            start: "top 85%",
          },
        }
      );

      // Category dividers animation
      gsap.fromTo(
        categoryRefs.current.filter(Boolean),
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: tableRef.current,
            start: "top 80%",
          },
        }
      );

      // Row animations with stagger
      gsap.fromTo(
        rowRefs.current.filter(Boolean),
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power3.out",
          stagger: 0.03,
          scrollTrigger: {
            trigger: tableRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const setRowRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    rowRefs.current[index] = el;
  }, [rowRefs]);

  const setCategoryRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    categoryRefs.current[index] = el;
  }, [categoryRefs]);

  const setHeaderCardRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    headerCardRefs.current[index] = el;
  }, [headerCardRefs]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#050816] py-16 sm:py-20 md:py-24">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-1/4 h-96 w-96 rounded-full bg-[#38BDF8]/8 blur-[128px]" />
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[#8B5CF6]/8 blur-[128px]" />
        <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-[#6366F1]/8 blur-[128px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div ref={headerRef} className="mb-12 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white/70 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-gradient-to-r from-[#38BDF8] to-[#8B5CF6] shadow-[0_0_12px_rgba(56,189,248,0.6)]" />
            Compare Packages
          </div>

          {/* Heading */}
          <h2 className="mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="text-white">What&apos;s </span>
            <span className="bg-gradient-to-r from-[#38BDF8] via-[#818CF8] to-[#A855F7] bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              Included
            </span>
          </h2>

          {/* Subtitle */}
          <p className="mx-auto mt-4 max-w-[700px] text-base sm:text-lg text-white/80 leading-relaxed">
            Compare every package side-by-side and choose the investment that best matches your
            business goals.
          </p>
        </div>

        {/* Trust indicators */}
        <div ref={trustRef} className="mb-8 flex flex-wrap justify-center gap-3">
          {trustIndicators.map((indicator) => (
            <TrustBadge key={indicator} text={indicator} />
          ))}
        </div>

        {/* Glass table container */}
        <div
          ref={tableRef}
          className="relative rounded-[32px] border border-white/[0.08] bg-white/[0.02] p-4 sm:p-6 md:p-8 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
        >
          {/* Desktop Table */}
          <div className="hidden md:block">
            {/* Sticky package headers */}
            <div className="sticky top-0 z-20 mb-6 grid grid-cols-4 gap-4 bg-[#050816]/90 backdrop-blur-xl py-4">
              <div className="flex items-center text-sm font-medium text-white/60">
                <span className="mr-2 text-lg">📋</span> Feature
              </div>
              <div ref={setHeaderCardRef(0)}>
                <PackageHeaderCard name="Starter" price="₹3,999" glowColor="cyan" />
              </div>
              <div ref={setHeaderCardRef(1)}>
                <PackageHeaderCard name="Business" price="₹8,999" glowColor="purple" isPopular />
              </div>
              <div ref={setHeaderCardRef(2)}>
                <PackageHeaderCard name="Premium" price="₹14,999" glowColor="blue" />
              </div>
            </div>

            {/* Feature groups with categories */}
            {featureGroups.map((group, groupIndex) => (
              <div key={group.title}>
                <div ref={setCategoryRef(groupIndex)}>
                  <CategoryDivider title={group.title} icon={group.icon} />
                </div>

                <div className="space-y-1">
                  {group.features.map((feature, featureIndex) => {
                    const rowIndex = groupIndex * 10 + featureIndex;
                    return (
                      <div
                        key={feature.name}
                        ref={setRowRef(rowIndex)}
                        className="group grid grid-cols-4 gap-4 rounded-xl border border-white/[0.05] bg-white/[0.02] px-4 py-4 transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.05] hover:shadow-[0_0_30px_rgba(139,92,246,0.1)]"
                      >
                        <div className="flex items-center gap-2 text-sm font-medium text-white/90">
                          {feature.icon && <span className="text-base">{feature.icon}</span>}
                          {feature.name}
                        </div>

                        {/* Starter */}
                        <div className="flex justify-center">
                          {typeof feature.starter === "boolean" ? (
                            feature.starter ? (
                              <CheckIcon color="cyan" />
                            ) : (
                              <DashIcon />
                            )
                          ) : (
                            <TextCell text={feature.starter} color="cyan" />
                          )}
                        </div>

                        {/* Business */}
                        <div className="flex justify-center">
                          {typeof feature.business === "boolean" ? (
                            feature.business ? (
                              <CheckIcon color="purple" />
                            ) : (
                              <DashIcon />
                            )
                          ) : (
                            <TextCell text={feature.business} color="purple" />
                          )}
                        </div>

                        {/* Premium */}
                        <div className="flex justify-center">
                          {typeof feature.premium === "boolean" ? (
                            feature.premium ? (
                              <CheckIcon color="blue" />
                            ) : (
                              <DashIcon />
                            )
                          ) : (
                            <TextCell text={feature.premium} color="blue" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-6">
            {/* Mobile package headers */}
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-[#38BDF8]/20 bg-[#38BDF8]/5 p-3 text-center">
                <div className="text-sm font-semibold text-[#38BDF8]">Starter</div>
                <div className="text-lg font-bold text-white">₹3,999</div>
              </div>
              <div className="relative rounded-xl border border-[#8B5CF6]/40 bg-[#8B5CF6]/10 p-3 text-center ring-2 ring-[#8B5CF6]/20">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="inline-flex items-center gap-1 rounded-full border border-[#8B5CF6]/30 bg-gradient-to-r from-[#8B5CF6]/20 to-[#A855F7]/20 px-2 py-0.5 text-[8px] font-semibold text-white">
                    Popular
                  </div>
                </div>
                <div className="text-sm font-semibold text-[#8B5CF6]">Business</div>
                <div className="text-lg font-bold text-white">₹8,999</div>
              </div>
              <div className="rounded-xl border border-[#06B6D4]/20 bg-[#06B6D4]/5 p-3 text-center">
                <div className="text-sm font-semibold text-[#06B6D4]">Premium</div>
                <div className="text-lg font-bold text-white">₹14,999</div>
              </div>
            </div>

            {/* Mobile feature cards */}
            {featureGroups.map((group) => (
              <div key={group.title}>
                <div className="flex items-center gap-2 py-2">
                  <span className="text-lg">{group.icon}</span>
                  <span className="text-sm font-semibold text-white/90">{group.title}</span>
                </div>
                <div className="space-y-2">
                  {group.features.map((feature) => (
                    <div
                      key={feature.name}
                      className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {feature.icon && <span className="text-sm">{feature.icon}</span>}
                          <span className="text-xs font-medium text-white/90">{feature.name}</span>
                        </div>
                        <div className="flex gap-4">
                          {/* Starter */}
                          <div className="flex w-12 justify-center">
                            {typeof feature.starter === "boolean" ? (
                              feature.starter ? (
                                <CheckIcon color="cyan" />
                              ) : (
                                <DashIcon />
                              )
                            ) : (
                              <span className="text-[10px] font-medium text-[#38BDF8]">
                                {feature.starter}
                              </span>
                            )}
                          </div>
                          {/* Business */}
                          <div className="flex w-12 justify-center">
                            {typeof feature.business === "boolean" ? (
                              feature.business ? (
                                <CheckIcon color="purple" />
                              ) : (
                                <DashIcon />
                              )
                            ) : (
                              <span className="text-[10px] font-medium text-[#8B5CF6]">
                                {feature.business}
                              </span>
                            )}
                          </div>
                          {/* Premium */}
                          <div className="flex w-12 justify-center">
                            {typeof feature.premium === "boolean" ? (
                              feature.premium ? (
                                <CheckIcon color="blue" />
                              ) : (
                                <DashIcon />
                              )
                            ) : (
                              <span className="text-[10px] font-medium text-[#06B6D4]">
                                {feature.premium}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-shift {
          0%,
          100% {
            background-position: 0% center;
          }
          50% {
            background-position: 100% center;
          }
        }
        .animate-gradient {
          animation: gradient-shift 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}

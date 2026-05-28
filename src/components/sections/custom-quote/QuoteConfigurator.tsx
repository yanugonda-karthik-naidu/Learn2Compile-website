"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

type BusinessType = "Landing" | "Business" | "E-Commerce" | "Custom";
type AnimationTier = "Basic" | "Premium" | "Cinematic";
type Timeline = "Express" | "Standard" | "Flexible";

const businessTypeCosts: Record<BusinessType, number> = {
  Landing: 650,
  Business: 850,
  "E-Commerce": 1400,
  Custom: 1200,
};

const animationTierCosts: Record<AnimationTier, number> = {
  Basic: 0,
  Premium: 450,
  Cinematic: 850,
};

const featureOptions = [
  { key: "seo", label: "SEO optimization", cost: 210 },
  { key: "forms", label: "Interactive forms", cost: 150 },
  { key: "cms", label: "CMS-ready structure", cost: 240 },
  { key: "analytics", label: "Analytics integration", cost: 120 },
  { key: "perf", label: "Performance tuning", cost: 190 },
] as const;

const timelineMultipliers: Record<Timeline, number> = {
  Express: 1.15,
  Standard: 1.0,
  Flexible: 0.9,
};

export function QuoteConfigurator() {
  const [selectedType, setSelectedType] = useState<BusinessType>("Business");
  const [selectedTier, setSelectedTier] = useState<AnimationTier>("Premium");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(["seo"]);
  const [pages, setPages] = useState(4);
  const [selectedTimeline, setSelectedTimeline] = useState<Timeline>("Standard");

  const priceRef = useRef<HTMLDivElement>(null);
  const prevPrice = useRef<number>(0);

  const calculator = useMemo(() => {
    const baseCost = businessTypeCosts[selectedType];
    const animationCost = animationTierCosts[selectedTier];
    const featuresCost = selectedFeatures.reduce((sum, f) => {
      const option = featureOptions.find((o) => o.key === f);
      return sum + (option?.cost ?? 0);
    }, 0);
    const pagesCost = (pages - 1) * 180;
    const timelineMultiplier = timelineMultipliers[selectedTimeline];

    const rawTotal = baseCost + animationCost + featuresCost + pagesCost;
    const total = Math.round(rawTotal * timelineMultiplier * 1.12);

    const deliveryWeeks =
      total < 2000
        ? 2
        : total < 3500
          ? 3
          : total < 5500
            ? 5
            : total < 8000
              ? 7
              : 9;

    const recommended =
      total < 2000
        ? "Starter"
        : total < 5000
          ? "Growth"
          : "Premium";

    return { total, deliveryWeeks, recommended };
  }, [selectedType, selectedTier, selectedFeatures, pages, selectedTimeline]);

  useEffect(() => {
    if (!priceRef.current) return;
    const obj = { val: prevPrice.current };
    gsap.to(obj, {
      val: calculator.total,
      duration: 0.6,
      ease: "power2.out",
      onUpdate: () => {
        if (priceRef.current) {
          priceRef.current.textContent = `$${Math.round(obj.val).toLocaleString()}`;
        }
      },
    });
    prevPrice.current = calculator.total;
  }, [calculator.total]);

  const toggleFeature = (key: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(key) ? prev.filter((f) => f !== key) : [...prev, key]
    );
  };

  return (
    <section className="relative bg-[#050816] py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
              <span className="h-2 w-2 rounded-full bg-[#38BDF8] shadow-[0_0_18px_rgba(56,189,248,0.6)]" />
              Website configurator
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Plan your project scope.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-white/70">
            Configure your website requirements to see an estimated scope. This
            helps us understand your needs before the consultation.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Left: Configuration options */}
          <div className="space-y-6">
            {/* Business type */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-sm font-semibold text-white">Business type</div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {(Object.keys(businessTypeCosts) as BusinessType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`rounded-xl border px-4 py-3 text-sm transition-all duration-200 ${
                      selectedType === type
                        ? "border-[#38BDF8]/50 bg-[#38BDF8]/10 text-white"
                        : "border-white/10 bg-white/5 text-white/70 hover:border-white/20"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Animation tier */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-sm font-semibold text-white">Animation tier</div>
              <div className="mt-4 flex gap-2">
                {(Object.keys(animationTierCosts) as AnimationTier[]).map((tier) => (
                  <button
                    key={tier}
                    onClick={() => setSelectedTier(tier)}
                    className={`flex-1 rounded-xl border px-4 py-3 text-sm transition-all duration-200 ${
                      selectedTier === tier
                        ? "border-[#8B5CF6]/50 bg-[#8B5CF6]/10 text-white"
                        : "border-white/10 bg-white/5 text-white/70 hover:border-white/20"
                    }`}
                  >
                    {tier}
                  </button>
                ))}
              </div>
            </div>

            {/* Pages slider */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-white">Pages / modules</div>
                <div className="text-2xl font-semibold text-[#06B6D4]">{pages}</div>
              </div>
              <input
                type="range"
                min={1}
                max={15}
                value={pages}
                onChange={(e) => setPages(Number(e.target.value))}
                className="mt-4 w-full appearance-none cursor-pointer rounded-lg bg-white/10 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#38BDF8] [&::-webkit-slider-thumb]:shadow-[0_0_20px_rgba(56,189,248,0.5)]"
              />
              <div className="mt-2 flex justify-between text-xs text-white/50">
                <span>1 page</span>
                <span>15+ pages</span>
              </div>
            </div>

            {/* Features */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-sm font-semibold text-white">Premium features</div>
              <div className="mt-4 space-y-2">
                {featureOptions.map((feature) => {
                  const checked = selectedFeatures.includes(feature.key);
                  return (
                    <button
                      key={feature.key}
                      onClick={() => toggleFeature(feature.key)}
                      className={`flex w-full items-center justify-between gap-4 rounded-xl border px-4 py-3 text-sm transition-all duration-200 ${
                        checked
                          ? "border-[#38BDF8]/40 bg-[#38BDF8]/10"
                          : "border-white/10 bg-white/5 hover:border-white/20"
                      }`}
                    >
                      <span className={checked ? "text-white" : "text-white/70"}>
                        {feature.label}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-white/50">+${feature.cost}</span>
                        <div
                          className={`flex h-5 w-5 items-center justify-center rounded-md border transition-all duration-200 ${
                            checked
                              ? "border-[#38BDF8] bg-[#38BDF8]/20"
                              : "border-white/20"
                          }`}
                        >
                          {checked && (
                            <svg
                              className="h-3 w-3 text-[#38BDF8]"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={3}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Timeline */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-sm font-semibold text-white">Timeline priority</div>
              <div className="mt-4 flex gap-2">
                {(Object.keys(timelineMultipliers) as Timeline[]).map((tl) => (
                  <button
                    key={tl}
                    onClick={() => setSelectedTimeline(tl)}
                    className={`flex-1 rounded-xl border px-4 py-3 text-sm transition-all duration-200 ${
                      selectedTimeline === tl
                        ? "border-[#06B6D4]/50 bg-[#06B6D4]/10 text-white"
                        : "border-white/10 bg-white/5 text-white/70 hover:border-white/20"
                    }`}
                  >
                    {tl}
                    {tl === "Express" && (
                      <span className="ml-1 text-xs text-[#06B6D4]">+15%</span>
                    )}
                    {tl === "Flexible" && (
                      <span className="ml-1 text-xs text-white/50">-10%</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Live estimate */}
          <div className="sticky top-24 h-fit">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div
                className="pointer-events-none absolute inset-0 rounded-3xl opacity-70"
                style={{
                  background:
                    "radial-gradient(600px circle at 50% 0%, rgba(56,189,248,0.15), transparent 55%), radial-gradient(500px circle at 80% 70%, rgba(139,92,246,0.12), transparent 55%)",
                }}
              />

              <div className="relative">
                <div className="text-xs uppercase tracking-[0.25em] text-white/60">
                  Estimated scope
                </div>
                <div
                  ref={priceRef}
                  className="mt-2 text-5xl font-semibold text-white"
                >
                  ${calculator.total.toLocaleString()}
                </div>
                <div className="mt-2 text-sm text-white/70">
                  Estimated delivery:{" "}
                  <span className="font-semibold text-white">
                    {calculator.deliveryWeeks} weeks
                  </span>
                </div>

                <div className="mt-4 rounded-2xl border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 px-4 py-2">
                  <div className="text-xs text-white/50">
                    Recommended package
                  </div>
                  <div className="mt-1 text-lg font-semibold text-[#8B5CF6]">
                    {calculator.recommended}
                  </div>
                </div>

                <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                {/* Selected summary */}
                <div className="mt-6 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Base ({selectedType})</span>
                    <span className="text-white">
                      ${businessTypeCosts[selectedType].toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Animation ({selectedTier})</span>
                    <span className="text-white">
                      ${animationTierCosts[selectedTier].toLocaleString()}
                    </span>
                  </div>
                  {selectedFeatures.length > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Features ({selectedFeatures.length})</span>
                      <span className="text-white">
                        ${featureOptions
                          .filter((f) => selectedFeatures.includes(f.key))
                          .reduce((sum, f) => sum + f.cost, 0)
                          .toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                <p className="mt-4 text-xs text-white/50">
                  This estimate is for planning purposes. Final scope is confirmed
                  during our discovery call.
                </p>

                <div className="mt-6 flex flex-col gap-3">
                  <a
                    href="#quote-form"
                    className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#38BDF8]/30 via-[#8B5CF6]/30 to-[#06B6D4]/30 px-6 py-3 text-sm font-medium text-white shadow-[0_0_30px_rgba(56,189,248,0.15)] transition-all duration-300 hover:from-[#38BDF8]/45 hover:via-[#8B5CF6]/45 hover:to-[#06B6D4]/45"
                  >
                    Start Consultation with This Scope
                    <svg
                      className="h-4 w-4"
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
                  <a
                    href="/pricing"
                    className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:border-white/20 hover:bg-white/10"
                  >
                    View All Packages
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
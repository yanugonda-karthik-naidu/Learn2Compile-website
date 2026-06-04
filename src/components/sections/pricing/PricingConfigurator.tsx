"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";

type BusinessType = "Starter" | "Business" | "Premium";
// Keep animation/tier UI for consistency with other pricing components.
type AnimationTier = "Basic" | "Premium" | "Cinematic";

const businessTypeCosts: Record<BusinessType, number> = {
  Starter: 3999,
  Business: 8999,
  Premium: 14999,
};

const includedPages: Record<BusinessType, number> = {
  Starter: 3,
  Business: 8,
  Premium: 15,
};

const deliveryTimes: Record<BusinessType, string> = {
  Starter: "2-3 Days",
  Business: "5-6 Days",
  Premium: "14–21 Days",
};

const animationTierCosts: Record<AnimationTier, number> = {
  Basic: 0,
  Premium: 0,
  Cinematic: 0,
};


const featureOptions = [
  {
    key: "seo",
    label: "Advanced SEO Optimization",
    cost: 1000,
  },
  {
    key: "booking",
    label: "Booking / Appointment System",
    cost: 1500,
  },
  {
    key: "blog",
    label: "Blog Management System",
    cost: 1500,
  },
  {
    key: "multilang",
    label: "Multi Language Support",
    cost: 2000,
  },
  {
    key: "dashboard",
    label: "Custom Admin Dashboard",
    cost: 3000,
  },
];

export function PricingConfigurator() {
  const [selectedType, setSelectedType] =useState<BusinessType>("Business");  const [selectedTier, setSelectedTier] = useState<AnimationTier>("Premium");
  const [selectedFeatures, setSelectedFeatures] =useState<string[]>([]);  
  const [pages, setPages] = useState(8);

  const priceRef = useRef<HTMLDivElement>(null);
  const prevPrice = useRef<number>(0);

  const calculator = useMemo(() => {
    const baseCost = businessTypeCosts[selectedType];

    const featuresCost = selectedFeatures.reduce((sum, f) => {
      const option = featureOptions.find((o) => o.key === f);
      return sum + (option?.cost ?? 0);
    }, 0);

    const extraPages =
      pages > includedPages[selectedType]
        ? (pages - includedPages[selectedType]) * 500
        : 0;

    const total = baseCost + featuresCost + extraPages;

    return {
      total,
      baseCost,
      featuresCost,
      extraPages,
      delivery: deliveryTimes[selectedType],
    };
  }, [selectedType, selectedFeatures, pages]);


  useEffect(() => {
    if (!priceRef.current) return;
    const obj = { val: prevPrice.current };
    gsap.to(obj, {
      val: calculator.total,
      duration: 0.6,
      ease: "power2.out",
      onUpdate: () => {
        if (priceRef.current) {
          priceRef.current.textContent =`₹${Math.round(obj.val).toLocaleString("en-IN")}`;        }
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
    <section className="relative bg-[#050816] py-16 sm:py-20 md:py-24 overflow-x-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
              <span className="h-2 w-2 rounded-full bg-[#38BDF8] shadow-[0_0_18px_rgba(56,189,248,0.6)]" />
              Smart calculator
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Configure your estimate.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-white/70">
            Adjust the options below to generate a live cost estimate. Final
            pricing is confirmed after a discovery call.
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
                <div className="text-sm font-semibold text-white">Included Pages</div>
                <div className="text-2xl font-semibold text-[#06B6D4]">{pages}</div>
                <div className="mt-3 rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white/60">
                  Additional pages beyond your package are charged at ₹500/page.
                </div>
              </div>
              <input
                type="range"
                min={1}
                max={15}
                value={pages}
                onChange={(e) => setPages(Number(e.target.value))}
                title="Select number of included pages"
                className="mt-4 w-full appearance-none cursor-pointer rounded-lg bg-white/10 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#38BDF8] [&::-webkit-slider-thumb]:shadow-[0_0_20px_rgba(56,189,248,0.5)]"
              />
              <div className="mt-2 flex justify-between text-xs text-white/50">
                <span>1 page</span>
                <span>15+ pages</span>
              </div>
            </div>

            {/* Features */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-sm font-semibold text-white">Optional Add-ons</div>
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
                        <span className="text-xs text-white/50">
                          +₹{feature.cost.toLocaleString("en-IN")}
                        </span>
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
                  Estimated Project Cost
                </div>
                <div
                  ref={priceRef}
                  className="mt-2 text-5xl font-semibold text-white"
                >
                  ₹{calculator.total.toLocaleString("en-IN")}
                </div>
                <div className="mt-2 text-sm text-white/70">
                  Estimated delivery:{" "}
                  <span className="font-semibold text-white">
                   {calculator.delivery} 
                  </span>
                </div>
                <div className="mt-6 rounded-2xl border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 p-4">
                  <div className="text-xs text-white/60">
                    Recommended Package
                  </div>

                  <div className="mt-2 text-2xl font-semibold text-[#A78BFA]">
                    {selectedType}
                  </div>
                </div>

                <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                {/* Cost breakdown */}
                <div className="mt-6 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-white/60">
                      Package ({selectedType})
                    </span>
                    <span className="text-white">
                      ₹{calculator.baseCost.toLocaleString("en-IN")}
                    </span>
                  </div>

                  {calculator.featuresCost > 0 && (
                    <div className="flex justify-between">
                      <span className="text-white/60">
                        Optional Add-ons
                      </span>
                      <span className="text-white">
                        ₹{calculator.featuresCost.toLocaleString("en-IN")}
                      </span>
                    </div>
                  )}

                  {calculator.extraPages > 0 && (
                    <div className="flex justify-between">
                      <span className="text-white/60">
                        Additional Pages
                      </span>
                      <span className="text-white">
                        ₹{calculator.extraPages.toLocaleString("en-IN")}
                      </span>
                    </div>
                  )}
                </div>
                <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                  <div className="font-medium text-white">
                    Included In Every Package
                  </div>

                  <ul className="mt-3 space-y-2 text-sm text-white/70">
                    <li>✓ Mobile Responsive Design</li>
                    <li>✓ WhatsApp Integration</li>
                    <li>✓ Contact Form</li>
                    <li>✓ Basic SEO Setup</li>
                    <li>✓ Fast Loading Website</li>
                    <li>✓ Launch Support</li>
                  </ul>
                </div>

                <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                <p className="mt-5 text-xs leading-6 text-white/50">
                  Final pricing may vary based on project requirements,
                  custom features, third-party integrations, and scope.
                  All prices are negotiable.
                </p>

                <div className="mt-6 flex flex-col gap-3">
                  <a
                    href="/custom-quote"
                    className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#38BDF8]/30 via-[#8B5CF6]/30 to-[#06B6D4]/30 px-6 py-3 text-sm font-medium text-white shadow-[0_0_30px_rgba(56,189,248,0.15)] transition-all duration-300 hover:from-[#38BDF8]/45 hover:via-[#8B5CF6]/45 hover:to-[#06B6D4]/45"
                  >
                    Start Consultation With This Scope
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
                    href="/contact"
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

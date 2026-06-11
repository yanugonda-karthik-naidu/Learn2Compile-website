"use client";

import { useMemo, useState, useEffect, useRef } from "react";

// ============================================
// TYPES
// ============================================

type WebsiteType =
  | "Business Website"
  | "Portfolio Website"
  | "Restaurant Website"
  | "Wedding Planner Website"
  | "Coaching Institute Website"
  | "Startup Website"
  | "E-Commerce Store"
  | "Custom Solution";

type PageKey =
  | "Home"
  | "About"
  | "Services"
  | "Portfolio"
  | "Gallery"
  | "Pricing"
  | "Blog"
  | "Contact"
  | "Custom Page";

type DesignExperience = "Professional" | "Premium" | "Signature";

type Timeline = "Flexible" | "Standard" | "Priority";

type Feature = {
  key: string;
  label: string;
  description: string;
  cost: number;
  included?: boolean;
};

// ============================================
// DATA CONSTANTS
// ============================================

const websiteTypes: { type: WebsiteType; base: number; icon: string }[] = [
  { type: "Business Website", base: 6000, icon: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM20 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" },
  { type: "Portfolio Website", base: 5000, icon: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2m8-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" },
  { type: "Restaurant Website", base: 7000, icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93m6.79-3c.13 1.5.21 2.88.21 4.07 0 5.18-3.95 9.45-9 9.93" },
  { type: "Wedding Planner Website", base: 8000, icon: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" },
  { type: "Coaching Institute Website", base: 8000, icon: "M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" },
  { type: "Startup Website", base: 10000, icon: "M13 10V3L4 14h7v7l9-11h-7z" },
  { type: "E-Commerce Store", base: 18000, icon: "M3 3h18l-2 13H5L3 3zm0 4h16v2H3V7zm4 6h2v4H7v-4zm4 0h2v4h-2v-4zm4 0h2v4h-2v-4z" },
  { type: "Custom Solution", base: 12000, icon: "M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18" },
];

const pageOptions: PageKey[] = [
  "Home",
  "About",
  "Services",
  "Portfolio",
  "Gallery",
  "Pricing",
  "Blog",
  "Contact",
  "Custom Page",
];

const features: Feature[] = [
  { key: "whatsapp", label: "WhatsApp Integration", description: "Direct messaging from your website", cost: 0, included: true },
  { key: "contact", label: "Contact Form", description: "Let visitors send you messages", cost: 0, included: true },
  { key: "maps", label: "Google Maps", description: "Show your location to visitors", cost: 0, included: true },
  { key: "gallery", label: "Image Gallery", description: "Beautiful photo galleries", cost: 500 },
  { key: "reviews", label: "Customer Reviews", description: "Show client testimonials", cost: 500 },
  { key: "booking", label: "Booking System", description: "Appointment scheduling", cost: 1500 },
  { key: "blog", label: "Blog System", description: "Share news and articles", cost: 1500 },
  { key: "seo", label: "SEO Setup", description: "Rank higher on Google", cost: 1000 },
  { key: "analytics", label: "Analytics Setup", description: "Track visitor behavior", cost: 500 },
  { key: "payment", label: "Payment Gateway", description: "Accept payments online", cost: 2500 },
  { key: "admin", label: "Admin Dashboard", description: "Manage your own content", cost: 3000 },
  { key: "login", label: "User Login System", description: "Member accounts area", cost: 2500 },
  { key: "language", label: "Multi-Language Support", description: "Reach international audiences", cost: 2000 },
];

const designExperienceOptions: { level: DesignExperience; subtitle: string; multiplier: number }[] = [
  { level: "Professional", subtitle: "Clean, fast, business-focused", multiplier: 1 },
  { level: "Premium", subtitle: "Advanced interactions, modern UI", multiplier: 1.15 },
  { level: "Signature", subtitle: "Luxury presentation, cinematic feel", multiplier: 1.25 },
];

const timelineOptions: { level: Timeline; subtitle: string; delivery: string; multiplier: number }[] = [
  { level: "Flexible", subtitle: "Take your time", delivery: "2-3 Weeks", multiplier: 1 },
  { level: "Standard", subtitle: "Balanced pace", delivery: "1-2 Weeks", multiplier: 1.05 },
  { level: "Priority", subtitle: "Fast-track delivery", delivery: "Express", multiplier: 1.1 },
];

// ============================================
// HELPERS
// ============================================

const formatINR = (amount: number) =>
  `₹${Math.round(amount).toLocaleString("en-IN")}`;

const generateRange = (min: number, max: number) => {
  return { min, max };
};

// ============================================
// MAIN COMPONENT
// ============================================

export function QuoteConfigurator() {
  const [selectedType, setSelectedType] = useState<WebsiteType>("Business Website");
  const [selectedPages, setSelectedPages] = useState<PageKey[]>(["Home", "About", "Services", "Contact"]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(["whatsapp", "contact", "maps"]);
  const [selectedDesign, setSelectedDesign] = useState<DesignExperience>("Premium");
  const [selectedTimeline, setSelectedTimeline] = useState<Timeline>("Standard");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const pricing = useMemo(() => {
    const typeData = websiteTypes.find((t) => t.type === selectedType)!;
    const baseCost = typeData.base;

    const pagesCost = Math.max(0, selectedPages.length - 5) * 500;

    const featuresCost = selectedFeatures.reduce((sum, key) => {
      const feature = features.find((f) => f.key === key);
      return sum + (feature?.cost ?? 0);
    }, 0);

    const designOption = designExperienceOptions.find((d) => d.level === selectedDesign)!;
    const timelineOption = timelineOptions.find((t) => t.level === selectedTimeline)!;

    const subtotal = baseCost + pagesCost + featuresCost;
    const multiplier = designOption.multiplier * timelineOption.multiplier;

    const calculated = Math.round(subtotal * multiplier);
    const variance = Math.round(calculated * 0.12);

    return generateRange(calculated - variance, calculated + variance);
  }, [selectedType, selectedPages, selectedFeatures, selectedDesign, selectedTimeline]);

  const selectedTypeData = websiteTypes.find((t) => t.type === selectedType)!;

  const togglePage = (page: PageKey) => {
    setSelectedPages((prev) =>
      prev.includes(page) ? prev.filter((p) => p !== page) : [...prev, page]
    );
  };

  const toggleFeature = (key: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(key) ? prev.filter((f) => f !== key) : [...prev, key]
    );
  };

  const handleWhatsApp = () => {
    const pagesList = selectedPages.join(", ");
    const featuresList = selectedFeatures
      .map((key) => features.find((f) => f.key === key)?.label)
      .filter(Boolean)
      .join(", ");

    const message = `Hello Learn2Compile,

I would like a website consultation.

Website Type: ${selectedType}
Pages: ${pagesList}
Features: ${featuresList}
Design Experience: ${selectedDesign}
Timeline: ${selectedTimeline}
Estimated Range: ${formatINR(pricing.min)} - ${formatINR(pricing.max)}

Please send me a detailed proposal and consultation.

Thank you.`;

    const whatsappUrl = `https://wa.me/917793922519?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section ref={sectionRef} id="quote-configurator" className="relative bg-[#050816] py-16 sm:py-20 md:py-24 overflow-x-hidden">
      {/* Background glow effects */}
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2"
          style={{
            background:
              "radial-gradient(ellipse 800px at 50% 0%, rgba(56,189,248,0.12), transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 right-0"
          style={{
            background:
              "radial-gradient(ellipse 500px at 100% 100%, rgba(139,92,246,0.10), transparent 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* ============================================ */}
        {/* SECTION HEADER */}
        {/* ============================================ */}
        <div
          className={`mx-auto max-w-[700px] text-center transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white/80">
            <span className="h-2 w-2 rounded-full bg-[#38BDF8] shadow-[0_0_18px_rgba(56,189,248,0.6)]" />
            Website Planning Assistant
          </div>

          <h2 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Plan Your{" "}
            <span className="bg-gradient-to-r from-[#38BDF8] via-[#8B5CF6] to-[#06B6D4] bg-clip-text text-transparent">
              Website Project
            </span>
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-white/60 sm:text-base">
            Answer a few simple questions and receive a realistic project estimate,
            recommended website scope, and consultation summary.
          </p>
        </div>

        {/* ============================================ */}
        {/* MAIN LAYOUT */}
        {/* ============================================ */}
        <div className="mt-16 grid gap-8 lg:grid-cols-5">
          {/* ============================================ */}
          {/* LEFT: QUESTION FLOW (60%) */}
          {/* ============================================ */}
          <div className="space-y-6 lg:col-span-3">
            {/* ============================================ */}
            {/* STEP 1: WEBSITE TYPE */}
            {/* ============================================ */}
            <div
              className={`rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "100ms" }}
            >
              <div className="mb-5">
                <div className="mb-1 text-xs font-medium uppercase tracking-wider text-white/40">
                  Step 1 of 5
                </div>
                <h3 className="text-lg font-semibold text-white">
                  What type of website do you need?
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {websiteTypes.map((item) => (
                  <button
                    key={item.type}
                    onClick={() => setSelectedType(item.type)}
                    className={`group relative min-h-[100px] rounded-xl border p-3 text-left transition-all duration-300 ${
                      selectedType === item.type
                        ? "border-[#38BDF8]/50 bg-[#38BDF8]/10 shadow-[0_0_30px_rgba(56,189,248,0.15)]"
                        : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/[0.07]"
                    }`}
                  >
                    <div
                      className={`mb-2 flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                        selectedType === item.type
                          ? "bg-[#38BDF8]/20"
                          : "bg-white/5"
                      }`}
                    >
                      <svg
                        className={`h-4 w-4 ${
                          selectedType === item.type ? "text-[#38BDF8]" : "text-white/50"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                      </svg>
                    </div>

                    <div
                      className={`text-[11px] font-medium leading-tight ${
                        selectedType === item.type ? "text-white" : "text-white/70"
                      }`}
                    >
                      {item.type}
                    </div>

                    {selectedType === item.type && (
                      <div className="absolute inset-0 rounded-xl border border-[#38BDF8]/30" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* ============================================ */}
            {/* STEP 2: PAGES REQUIRED */}
            {/* ============================================ */}
            <div
              className={`rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <div className="mb-5">
                <div className="mb-1 text-xs font-medium uppercase tracking-wider text-white/40">
                  Step 2 of 5
                </div>
                <h3 className="text-lg font-semibold text-white">Pages required</h3>
              </div>

              <div className="mb-4 flex flex-wrap gap-2">
                {pageOptions.map((page) => {
                  const isSelected = selectedPages.includes(page);
                  return (
                    <button
                      key={page}
                      onClick={() => togglePage(page)}
                      className={`rounded-lg px-3 py-2 text-sm transition-all duration-200 min-h-[44px] ${
                        isSelected
                          ? "border border-[#38BDF8]/50 bg-[#38BDF8]/15 text-white"
                          : "border border-white/10 bg-white/5 text-white/60 hover:border-white/20"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <span className="text-sm text-white/60">Selected Pages</span>
                <span className="text-lg font-semibold text-[#38BDF8]">
                  {selectedPages.length}
                </span>
              </div>

              {selectedPages.length > 5 && (
                <p className="mt-2 text-xs text-white/40">
                  +₹500 for each page beyond 5 included
                </p>
              )}
            </div>

            {/* ============================================ */}
            {/* STEP 3: FEATURES REQUIRED */}
            {/* ============================================ */}
            <div
              className={`rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              <div className="mb-5">
                <div className="mb-1 text-xs font-medium uppercase tracking-wider text-white/40">
                  Step 3 of 5
                </div>
                <h3 className="text-lg font-semibold text-white">Features required</h3>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                {features.map((feature) => {
                  const isSelected = selectedFeatures.includes(feature.key);
                  const isIncluded = feature.included;

                  return (
                    <button
                      key={feature.key}
                      onClick={() => !isIncluded && toggleFeature(feature.key)}
                      disabled={isIncluded}
                      className={`group relative flex items-center justify-between rounded-xl border p-4 text-left transition-all duration-200 min-h-[72px] ${
                        isSelected && !isIncluded
                          ? "border-[#38BDF8]/40 bg-[#38BDF8]/10"
                          : isIncluded
                          ? "border-[#22D3EE]/20 bg-[#22D3EE]/5 cursor-default"
                          : "border-white/10 bg-white/5 hover:border-white/20"
                      }`}
                    >
                      <div>
                        <div
                          className={`text-sm font-medium ${
                            isSelected || isIncluded ? "text-white" : "text-white/70"
                          }`}
                        >
                          {feature.label}
                        </div>
                        <div className="text-xs text-white/40">{feature.description}</div>
                      </div>

                      <div className="ml-3 flex flex-shrink-0 items-center gap-2">
                        {isIncluded ? (
                          <span className="rounded-full bg-[#22D3EE]/15 px-2.5 py-1 text-xs font-medium text-[#22D3EE]">
                            Included
                          </span>
                        ) : (
                          <span className="text-sm font-medium text-white/50">
                            {formatINR(feature.cost)}
                          </span>
                        )}

                        {!isIncluded && (
                          <div
                            className={`flex h-5 w-5 items-center justify-center rounded-md border transition-all ${
                              isSelected
                                ? "border-[#38BDF8] bg-[#38BDF8]/20"
                                : "border-white/20"
                            }`}
                          >
                            {isSelected && (
                              <svg
                                className="h-3 w-3 text-[#38BDF8]"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={3}
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ============================================ */}
            {/* STEP 4: DESIGN EXPERIENCE */}
            {/* ============================================ */}
            <div
              className={`rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <div className="mb-5">
                <div className="mb-1 text-xs font-medium uppercase tracking-wider text-white/40">
                  Step 4 of 5
                </div>
                <h3 className="text-lg font-semibold text-white">
                  How premium should your website feel?
                </h3>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {designExperienceOptions.map((option) => (
                  <button
                    key={option.level}
                    onClick={() => setSelectedDesign(option.level)}
                    className={`relative rounded-xl border p-4 text-left transition-all duration-300 min-h-[90px] ${
                      selectedDesign === option.level
                        ? "border-[#8B5CF6]/50 bg-[#8B5CF6]/10 shadow-[0_0_30px_rgba(139,92,246,0.15)]"
                        : "border-white/10 bg-white/5 hover:border-white/20"
                    }`}
                  >
                    <div className={`mb-2 text-sm font-semibold ${
                      selectedDesign === option.level ? "text-white" : "text-white/70"
                    }`}>
                      {option.level}
                    </div>
                    <div className="text-xs text-white/50">{option.subtitle}</div>

                    {option.multiplier > 1 && (
                      <div className="mt-2 inline-block rounded-full bg-[#8B5CF6]/15 px-2 py-1 text-xs font-medium text-[#8B5CF6]">
                        +{Math.round((option.multiplier - 1) * 100)}%
                      </div>
                    )}

                    {option.multiplier === 1 && (
                      <div className="mt-2 inline-block rounded-full bg-white/10 px-2 py-1 text-xs font-medium text-white/60">
                        Included
                      </div>
                    )}

                    {selectedDesign === option.level && (
                      <div className="absolute inset-0 rounded-xl border border-[#8B5CF6]/30" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* ============================================ */}
            {/* STEP 5: DELIVERY TIMELINE */}
            {/* ============================================ */}
            <div
              className={`rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "500ms" }}
            >
              <div className="mb-5">
                <div className="mb-1 text-xs font-medium uppercase tracking-wider text-white/40">
                  Step 5 of 5
                </div>
                <h3 className="text-lg font-semibold text-white">Delivery timeline</h3>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {timelineOptions.map((option) => (
                  <button
                    key={option.level}
                    onClick={() => setSelectedTimeline(option.level)}
                    className={`relative rounded-xl border p-4 text-left transition-all duration-300 min-h-[90px] ${
                      selectedTimeline === option.level
                        ? "border-[#06B6D4]/50 bg-[#06B6D4]/10 shadow-[0_0_30px_rgba(6,182,212,0.15)]"
                        : "border-white/10 bg-white/5 hover:border-white/20"
                    }`}
                  >
                    <div
                      className={`mb-2 text-sm font-semibold ${
                        selectedTimeline === option.level ? "text-white" : "text-white/70"
                      }`}
                    >
                      {option.level}
                    </div>
                    <div className="text-xs text-white/50">{option.subtitle}</div>
                    <div className="mt-2 text-sm font-medium text-white/70">
                      {option.delivery}
                    </div>

                    {option.multiplier > 1 && (
                      <div className="mt-2 inline-block rounded-full bg-[#06B6D4]/15 px-2 py-1 text-xs font-medium text-[#06B6D4]">
                        +{Math.round((option.multiplier - 1) * 100)}%
                      </div>
                    )}

                    {option.multiplier === 1 && (
                      <div className="mt-2 inline-block rounded-full bg-white/10 px-2 py-1 text-xs font-medium text-white/60">
                        Included
                      </div>
                    )}

                    {selectedTimeline === option.level && (
                      <div className="absolute inset-0 rounded-xl border border-[#06B6D4]/30" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* ============================================ */}
            {/* WHAT HAPPENS NEXT - TRUST CARD */}
            {/* ============================================ */}
            <div
              className={`rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-6 transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "600ms" }}
            >
              <h4 className="mb-4 text-sm font-semibold text-white">What happens next?</h4>

              <div className="space-y-3">
                {[
                  { num: "1", text: "We review your requirements." },
                  { num: "2", text: "We prepare a personalized recommendation." },
                  { num: "3", text: "We contact you within 24 hours." },
                  { num: "4", text: "Final pricing is confirmed after discussion." },
                ].map((item) => (
                  <div key={item.num} className="flex items-center gap-3">
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-medium text-white/70">
                      {item.num}
                    </div>
                    <span className="text-sm text-white/60">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ============================================ */}
          {/* RIGHT: LIVE PROJECT SUMMARY (40%) */}
          {/* ============================================ */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-24">
              <div
                className={`rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-700 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                <h4 className="text-sm font-semibold uppercase tracking-wider text-white/60">
                  Project Summary
                </h4>

                {/* Summary items */}
                <div className="mt-5 space-y-4">
                  <div className="flex items-start justify-between">
                    <span className="text-sm text-white/50">Website Type</span>
                    <span className="text-sm text-right font-medium text-white">
                      {selectedType}
                    </span>
                  </div>

                  <div className="flex items-start justify-between">
                    <span className="text-sm text-white/50">Pages Selected</span>
                    <span className="text-sm font-medium text-white">
                      {selectedPages.length}
                    </span>
                  </div>

                  <div className="flex items-start justify-between">
                    <span className="text-sm text-white/50">Features Selected</span>
                    <span className="text-sm font-medium text-white">
                      {selectedFeatures.length}
                    </span>
                  </div>

                  <div className="flex items-start justify-between">
                    <span className="text-sm text-white/50">Design Experience</span>
                    <span className="text-sm font-medium text-white">{selectedDesign}</span>
                  </div>

                  <div className="flex items-start justify-between">
                    <span className="text-sm text-white/50">Timeline</span>
                    <span className="text-sm font-medium text-white">
                      {timelineOptions.find((t) => t.level === selectedTimeline)?.delivery}
                    </span>
                  </div>
                </div>

                <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                {/* Estimated investment */}
                <div className="mt-5">
                  <span className="text-xs font-medium uppercase tracking-wider text-white/40">
                    Estimated Investment
                  </span>

                  <div className="mt-2 text-3xl font-semibold text-white sm:text-4xl">
                    {formatINR(pricing.min)}{" "}
                    <span className="text-lg text-white/30">–</span>{" "}
                    {formatINR(pricing.max)}
                  </div>
                </div>

                {/* Trust message */}
                <div className="mt-5 rounded-xl border border-[#38BDF8]/20 bg-[#38BDF8]/5 p-4">
                  <p className="text-xs leading-relaxed text-white/60">
                    <span className="font-medium text-[#38BDF8]">Planning estimates only.</span>{" "}
                    Final scope, features, and pricing will be confirmed during consultation.
                    Most projects are customized based on business goals and requirements.
                  </p>
                </div>

                {/* CTA Button */}
                <button
                  onClick={handleWhatsApp}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#38BDF8]/30 via-[#8B5CF6]/30 to-[#06B6D4]/30 px-6 py-4 text-sm font-medium text-white shadow-[0_0_30px_rgba(56,189,248,0.15)] transition-all duration-300 hover:from-[#38BDF8]/45 hover:via-[#8B5CF6]/45 hover:to-[#06B6D4]/45"
                >
                  Get Detailed Proposal
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
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </button>

                {/* Secondary CTA */}
                <a
                  href="/pricing"
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:border-white/20 hover:bg-white/10"
                >
                  View All Packages
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

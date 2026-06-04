"use client";

import { ServicesHeroSection } from "./ServicesHeroSection";
import { ServiceShowcase } from "./ServiceShowcase";
import { WhyChooseUs } from "./WhyChooseUs";
import { ServicesProcess } from "./ServicesProcess";
import { TrustBuilders } from "./TrustBuilders";
import { ServicesTech } from "./ServicesTech";
import { ServicesCTASection } from "./ServicesCTASection";

export function ServicesSection() {
  return (
    <div className="relative min-h-screen bg-[#050816] text-white">
      <ServicesHeroSection />
      <ServiceShowcase />
      <WhyChooseUs />
      <ServicesProcess />
      <TrustBuilders />
      <ServicesTech />
      <ServicesCTASection />
    </div>
  );
}
"use client";

import { ServicesHeroSection } from "./ServicesHeroSection";
import { ServiceShowcase } from "./ServiceShowcase";
import { ServicesProcess } from "./ServicesProcess";
import { ServicesTech } from "./ServicesTech";
import { ServicesCTASection } from "./ServicesCTASection";

export function ServicesSection() {
  return (
    <div className="relative min-h-screen bg-[#050816] text-white">
      <ServicesHeroSection />
      <ServiceShowcase />
      <ServicesProcess />
      <ServicesTech />
      <ServicesCTASection />
    </div>
  );
}
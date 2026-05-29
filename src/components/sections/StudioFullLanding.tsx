"use client";

import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "./hero/HeroSection";
import { TrustSection } from "./trust/TrustSection";
import { ServicesSection } from "./services/ServicesSection";
import { Showcase3DSection } from "./showcase/Showcase3DSection";
import { PortfolioSection } from "./portfolio/PortfolioSection";
import { ProcessSection } from "./process/ProcessSection";
import { PricingSection } from "./pricing/PricingSection";
import { TestimonialsSection } from "./testimonials/TestimonialsSection";
import { FaqSection } from "./faq/FaqSection";
import { ContactSection } from "./contact/ContactSection";
import { FooterSection } from "./footer/FooterSection";
import { CustomCursor } from "./cursor/CustomCursor";
import { MascotProvider } from "@/components/mascot";

export function StudioFullLanding() {
  return (
    <div className="relative min-h-screen bg-[#050816] text-white">
      <Navbar />
      <CustomCursor />
      <MascotProvider />
      <HeroSection />
      <TrustSection />
      <ServicesSection />
      <Showcase3DSection />
      <PortfolioSection />
      <ProcessSection />
      <PricingSection />
      <TestimonialsSection />
      <FaqSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
}
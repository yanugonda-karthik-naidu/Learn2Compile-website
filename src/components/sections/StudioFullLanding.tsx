"use client";

import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "./hero/HeroSection";
import { AboutMetricsSection } from "./about/AboutMetricsSection";
import { ServicesSection } from "./services/ServicesSection";
import { PortfolioSection } from "./portfolio/PortfolioSection";
import { AboutWorkflowSection } from "./about/AboutWorkflowSection";
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
      <AboutMetricsSection />
      <ServicesSection />
      <PortfolioSection />
      <AboutWorkflowSection />
      <PricingSection />
      <TestimonialsSection />
      <FaqSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
}
"use client";

import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "./hero/HeroSection";
import { AboutMetricsSection } from "./about/AboutMetricsSection";
import { ServiceShowcase } from "./services/ServiceShowcase";
import { WhyChooseUs } from "./services/WhyChooseUs";
import { ServicesProcess } from "./services/ServicesProcess";
import { ServicesTech } from "./services/ServicesTech";
import { PortfolioExplorer } from "./portfolio/PortfolioExplorer";
import { PortfolioCTASection } from "./portfolio/PortfolioCTASection";
import { PricingCards } from "./pricing/PricingCards";
import { PricingValue } from "./pricing/PricingValue";
import { PricingFAQ } from "./pricing/PricingFAQ";
import { TestimonialsSection } from "./testimonials/TestimonialsSection";

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
      <ServiceShowcase />
      <WhyChooseUs />
      <ServicesProcess />
      <ServicesTech />
      <PortfolioExplorer />
      <PortfolioCTASection />
      <PricingCards />
      <PricingValue />
      <TestimonialsSection />
      <PricingFAQ />
      {/* <FaqSection /> */}
      <ContactSection />
      <FooterSection />
    </div>
  );
}
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { FooterSection } from "@/components/sections/footer/FooterSection";
import { CustomCursor } from "@/components/sections/cursor/CustomCursor";
import { PricingHero } from "@/components/sections/pricing/PricingHero";
import { PricingCards } from "@/components/sections/pricing/PricingCards";
import { PricingConfigurator } from "@/components/sections/pricing/PricingConfigurator";
import { PricingValue } from "@/components/sections/pricing/PricingValue";
import { PricingCTA } from "@/components/sections/pricing/PricingCTA";

export const metadata: Metadata = {
  title: "Pricing | Premium Packages | Learn2Compile",
  description:
    "Transparent pricing packages for premium web development. Choose from Starter, Growth, or Premium plans. Interactive calculator available.",
};

export default function PricingPage() {
  return (
    <div className="relative min-h-screen bg-[#050816] text-white">
      <Navbar />
      <CustomCursor />

      <main>
        <PricingHero />
        <PricingCards />
        <PricingConfigurator />
        <PricingValue />
        <PricingCTA />
      </main>

      <FooterSection />
    </div>
  );
}

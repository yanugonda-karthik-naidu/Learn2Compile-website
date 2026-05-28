import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { FooterSection } from "@/components/sections/footer/FooterSection";
import { CustomCursor } from "@/components/sections/cursor/CustomCursor";
import { QuoteHero } from "@/components/sections/custom-quote/QuoteHero";
import { QuoteSteps } from "@/components/sections/custom-quote/QuoteSteps";
import { QuoteConfigurator } from "@/components/sections/custom-quote/QuoteConfigurator";
import { QuoteSummary } from "@/components/sections/custom-quote/QuoteSummary";
import { QuoteCTA } from "@/components/sections/custom-quote/QuoteCTA";

export const metadata: Metadata = {
  title: "Custom Quote | Premium Consultation | Learn2Compile",
  description:
    "Start your premium digital project with Learn2Compile. Guided onboarding, transparent scope, and cinematic execution. Get a consultation within 24 hours.",
};

export default function CustomQuotePage() {
  return (
    <div className="relative min-h-screen bg-[#050816] text-white">
      <Navbar />
      <CustomCursor />

      <main>
        <QuoteHero />
        <QuoteSteps />
        <QuoteConfigurator />
        <QuoteSummary />
        <QuoteCTA />
      </main>

      <FooterSection />
    </div>
  );
}

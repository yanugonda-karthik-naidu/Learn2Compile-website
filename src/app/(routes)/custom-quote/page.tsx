import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { FooterSection } from "@/components/sections/footer/FooterSection";
import { CustomCursor } from "@/components/sections/cursor/CustomCursor";
import { QuoteHero } from "@/components/sections/custom-quote/QuoteHero";
import { QuoteSteps } from "@/components/sections/custom-quote/QuoteSteps";
import { QuoteConfigurator } from "@/components/sections/custom-quote/QuoteConfigurator";
import { QuoteSummary } from "@/components/sections/custom-quote/QuoteSummary";
import { QuoteCTA } from "@/components/sections/custom-quote/QuoteCTA";

// Force dynamic rendering to prevent SSR issues with client components
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Get Your Custom Quote",
  description:
    "Start your premium digital project with Learn2Compile. Guided onboarding, transparent scope, and cinematic execution. Get a detailed quote within 24 hours.",
  keywords: [
    "custom quote",
    "web development estimate",
    "project quote",
    "premium web development cost",
    "website pricing calculator",
  ],
  openGraph: {
    title: "Get Your Custom Quote | Learn2Compile",
    description:
      "Start your premium digital project with Learn2Compile. Get a detailed quote within 24 hours.",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "Learn2Compile Custom Quote",
      },
    ],
  },
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

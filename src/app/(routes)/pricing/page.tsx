import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { FooterSection } from "@/components/sections/footer/FooterSection";
import { CustomCursor } from "@/components/sections/cursor/CustomCursor";
import { PricingHero } from "@/components/sections/pricing/PricingHero";
import { PricingCards } from "@/components/sections/pricing/PricingCards";
import { PricingComparison } from "@/components/sections/pricing/PricingComparison";
import { PricingValue } from "@/components/sections/pricing/PricingValue";
import { PricingFAQ } from "@/components/sections/pricing/PricingFAQ";
import { PricingCTA } from "@/components/sections/pricing/PricingCTA";

// Force dynamic rendering to prevent SSR issues with client components
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Transparent Pricing Packages",
  description:
    "Clear, honest pricing for premium web development. Choose from Starter, Growth, or Enterprise plans. Interactive calculator and custom quotes available.",
  keywords: [
    "web development pricing",
    "website cost India",
    "transparent pricing",
    "web design packages",
    "affordable web development",
  ],
  openGraph: {
    title: "Transparent Pricing Packages | Learn2Compile",
    description:
      "Clear, honest pricing for premium web development. Choose from Starter, Growth, or Enterprise plans.",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "Learn2Compile Pricing",
      },
    ],
  },
};

export default function PricingPage() {
  return (
    <div className="relative min-h-screen bg-[#050816] text-white">
      <Navbar />
      <CustomCursor />

      <main>
        <PricingHero />
        <PricingCards />
        <PricingComparison />
        <PricingValue />
        <PricingFAQ />
        <PricingCTA />
      </main>

      <FooterSection />
    </div>
  );
}

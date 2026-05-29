import type { Metadata } from "next";
import { PortfolioSection } from "@/components/sections/portfolio/PortfolioSection";
import { Navbar } from "@/components/layout/Navbar";
import { CustomCursor } from "@/components/sections/cursor/CustomCursor";

// Force dynamic rendering to prevent SSR issues with client components
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Premium Website Portfolio",
  description:
    "Explore our curated collection of cinematic websites and digital experiences. From wedding planners to startups, discover what's possible with premium design.",
  keywords: [
    "website portfolio",
    "web design examples",
    "premium websites",
    "cinematic design",
    "website showcase",
    "digital portfolio India",
  ],
  openGraph: {
    title: "Premium Website Portfolio | Learn2Compile",
    description:
      "Explore our curated collection of cinematic websites and digital experiences.",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "Learn2Compile Portfolio",
      },
    ],
  },
};

export default function PortfolioPage() {
  return (
    <div className="relative min-h-screen bg-[#050816] text-white">
      <Navbar />
      <CustomCursor />
      <PortfolioSection />
    </div>
  );
}
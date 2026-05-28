"use client";

import { PortfolioHeroSection } from "./PortfolioHeroSection";
import { FeaturedProject } from "./FeaturedProject";
import { PortfolioExplorer } from "./PortfolioExplorer";
import { PortfolioCTASection } from "./PortfolioCTASection";

export function PortfolioSection() {
  return (
    <div className="relative min-h-screen bg-[#050816] text-white">
      <PortfolioHeroSection />
      <FeaturedProject />
      <PortfolioExplorer />
      <PortfolioCTASection />
    </div>
  );
}
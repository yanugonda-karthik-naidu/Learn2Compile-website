import type { Metadata } from "next";
import { PortfolioSection } from "@/components/sections/portfolio/PortfolioSection";

export const metadata: Metadata = {
  title: "Portfolio | Premium Digital Experiences | Learn2Compile",
  description: "Explore our curated collection of premium websites and digital experiences. Business websites, wedding planners, restaurants, startups - all built with modern design and conversion focus.",
};

export default function PortfolioPage() {
  return <PortfolioSection />;
}
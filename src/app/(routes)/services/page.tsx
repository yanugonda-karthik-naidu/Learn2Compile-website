import type { Metadata } from "next";
import { ServicesSection } from "@/components/sections/services/ServicesSection";
import { Navbar } from "@/components/layout/Navbar";
import { CustomCursor } from "@/components/sections/cursor/CustomCursor";

// Force dynamic rendering to prevent SSR issues with client components
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Web Development Services India",
  description:
    "Premium web development services for startups, wedding planners, restaurants, and businesses. Stunning UI, fast performance, and SEO-optimized solutions.",
  keywords: [
    "web development services India",
    "business websites",
    "wedding planner websites",
    "restaurant websites",
    "startup websites",
    "e-commerce development",
    "custom website design",
  ],
  openGraph: {
    title: "Web Development Services India | Learn2Compile",
    description:
      "Premium web development services for startups, wedding planners, restaurants, and businesses.",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "Learn2Compile Services",
      },
    ],
  },
};

export default function ServicesPage() {
  return (
    <div className="relative min-h-screen bg-[#050816] text-white">
      <Navbar />
      <CustomCursor />
      <ServicesSection />
    </div>
  );
}
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { CustomCursor } from "@/components/sections/cursor/CustomCursor";
import { ContactSection } from "@/components/sections/contact/ContactSection";
import { FooterSection } from "@/components/sections/footer/FooterSection";

// Force dynamic rendering to prevent SSR issues with client components
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact Learn2Compile",
  description:
    "Get in touch with Learn2Compile. We help Wedding Planners, Restaurants, Coaching Institutes, and Small Businesses build professional websites. Response within 24 hours.",
  keywords: [
    "contact Learn2Compile",
    "website inquiry",
    "web development contact",
    "get a website quote",
    "business website India",
  ],
  openGraph: {
    title: "Contact Learn2Compile | Get Your Website Quote",
    description:
      "Ready to start your website project? Contact Learn2Compile for a free consultation. We respond within 24 hours.",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "Learn2Compile Contact",
      },
    ],
  },
};

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-[#050816] text-white">
      <Navbar />
      <CustomCursor />
      <ContactSection />
      <FooterSection />
    </div>
  );
}

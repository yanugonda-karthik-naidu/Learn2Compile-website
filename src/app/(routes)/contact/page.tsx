import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { CustomCursor } from "@/components/sections/cursor/CustomCursor";
import { ContactSection } from "@/components/sections/contact/ContactSection";
import { FooterSection } from "@/components/sections/footer/FooterSection";

// Force dynamic rendering to prevent SSR issues with client components
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Start Your Project",
  description:
    "Begin your premium digital consultation. Tell us what you're building — we respond with a cinematic, engineering-ready plan within 24 hours.",
  keywords: [
    "contact Learn2Compile",
    "start web project",
    "web development consultation",
    "India digital studio",
    "get quote website",
  ],
  openGraph: {
    title: "Start Your Project | Learn2Compile",
    description:
      "Begin your premium digital consultation. We respond with a cinematic, engineering-ready plan.",
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

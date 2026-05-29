import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { CustomCursor } from "@/components/sections/cursor/CustomCursor";
import { FaqPageContent } from "@/components/sections/faq/FaqPageContent";
import { TrustSection } from "@/components/sections/trust/TrustSection";
import { ContactSection } from "@/components/sections/contact/ContactSection";
import { FooterSection } from "@/components/sections/footer/FooterSection";
import { PageTransitionProvider } from "@/components/scroll/PageTransitionProvider";
import { LenisProvider } from "@/components/scroll/LenisProvider";

// Force dynamic rendering to prevent SSR issues with client components
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to everything about timelines, pricing, technology, SEO, support, hosting, and custom features for your premium digital project.",
  keywords: [
    "FAQ",
    "web development questions",
    "website FAQs",
    "pricing questions",
    "timelines",
    "web development help",
  ],
  openGraph: {
    title: "Frequently Asked Questions | Learn2Compile",
    description:
      "Answers to everything about timelines, pricing, technology, SEO, support, and hosting.",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "Learn2Compile FAQ",
      },
    ],
  },
};

export default function FaqPage() {
  return (
    <LenisProvider>
      <PageTransitionProvider>
        <div className="relative min-h-screen bg-[#050816] text-white">
          <Navbar />
          <CustomCursor />

          <main>
            <FaqPageContent />
            <TrustSection />
            <ContactSection />
          </main>

          <FooterSection />
        </div>
      </PageTransitionProvider>
    </LenisProvider>
  );
}
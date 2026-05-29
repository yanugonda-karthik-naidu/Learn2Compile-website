import type { Metadata } from 'next';
import { AboutHeroSection } from '@/components/sections/about/AboutHeroSection';
import { AboutStorySection } from '@/components/sections/about/AboutStorySection';
import { AboutPhilosophySection } from '@/components/sections/about/AboutPhilosophySection';
import { AboutWorkflowSection } from '@/components/sections/about/AboutWorkflowSection';
import { AboutMetricsSection } from '@/components/sections/about/AboutMetricsSection';
import { AboutIdentitySection } from '@/components/sections/about/AboutIdentitySection';
import { AboutCTASection } from '@/components/sections/about/AboutCTASection';
import { ContactSection } from '@/components/sections/contact/ContactSection';
import { FooterSection } from '@/components/sections/footer/FooterSection';
import { Navbar } from '@/components/layout/Navbar';
import { CustomCursor } from '@/components/sections/cursor/CustomCursor';

// Force dynamic rendering to prevent SSR issues with client components
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About Learn2Compile",
  description:
    "Discover Learn2Compile, a premium Indian digital studio crafting cinematic websites for modern businesses. Learn about our craft, philosophy, and commitment to excellence.",
  keywords: [
    "about Learn2Compile",
    "digital studio India",
    "web development team",
    "premium design studio",
    "Indian digital agency",
  ],
  openGraph: {
    title: "About Learn2Compile | Premium Digital Studio India",
    description:
      "Discover Learn2Compile, a premium Indian digital studio crafting cinematic websites.",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "Learn2Compile About",
      },
    ],
  },
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-[#050816] text-white">
      <Navbar />
      <CustomCursor />
      <AboutHeroSection />
      <AboutStorySection />
      <AboutPhilosophySection />
      <AboutWorkflowSection />
      <AboutMetricsSection />
      <AboutIdentitySection />
      <AboutCTASection />
      <ContactSection />
      <FooterSection />
    </div>
  );
}
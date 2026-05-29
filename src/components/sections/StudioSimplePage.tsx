import type { ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { TrustSection } from "./trust/TrustSection";
import { ServicesSection } from "./services/ServicesSection";
import { PricingSection } from "./pricing/PricingSection";
import { PortfolioSection } from "./portfolio/PortfolioSection";
import { ContactSection } from "./contact/ContactSection";
import { FaqSection } from "./faq/FaqSection";
import { FooterSection } from "./footer/FooterSection";
import { CustomCursor } from "./cursor/CustomCursor";
import { MascotProvider } from "@/components/mascot";

export function StudioSimplePage({
  eyebrow,
  title,
  body,
  right,
}: {
  eyebrow?: string;
  title: string;
  body: string | ReactNode;
  right?: ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-[#050816] text-white">
      <Navbar />
      <CustomCursor />
      <MascotProvider />

      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_10%_0%,rgba(56,189,248,0.18),transparent_55%),radial-gradient(700px_circle_at_85%_20%,rgba(139,92,246,0.14),transparent_50%)]" />
        <div className="relative mx-auto max-w-6xl px-6 py-14">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              {eyebrow ? (
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
                  <span className="h-2 w-2 rounded-full bg-[#38BDF8] shadow-[0_0_18px_rgba(56,189,248,0.6)]" />
                  {eyebrow}
                </div>
              ) : null}
              <h1 className="mt-6 text-balance text-3xl font-semibold leading-[1.08] tracking-tight sm:text-4xl">
                {title}
              </h1>
              <div className="mt-5 whitespace-pre-line text-pretty text-base leading-7 text-white/70">{body}</div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="/custom-quote" className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/10">
                  Start Your Project
                </a>
                <a href="/portfolio" className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#38BDF8]/20 via-[#8B5CF6]/20 to-[#06B6D4]/20 px-5 py-3 text-sm font-medium text-white shadow-[0_0_30px_rgba(56,189,248,0.15)] transition hover:from-[#38BDF8]/30 hover:via-[#8B5CF6]/30 hover:to-[#06B6D4]/30">
                  View Our Work
                </a>
              </div>
            </div>
            {right ? <div className="lg:col-span-1">{right}</div> : null}
          </div>
          <div className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
      </div>
      <TrustSection />
      <ServicesSection />
      <PortfolioSection />
      <PricingSection />
      <FaqSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
}
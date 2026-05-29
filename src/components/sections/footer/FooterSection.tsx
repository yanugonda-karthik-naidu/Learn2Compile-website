"use client";

import Link from "next/link";
import { SOCIAL_LINKS, CONTACT_INFO } from "@/lib/seo/config";

export function FooterSection() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? CONTACT_INFO.whatsapp.replace(/^\+/, "");

  return (
    <footer className="relative bg-[#050816]">
      {/* Subtle top gradient line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#38BDF8]/20 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-3">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
              <span className="h-2 w-2 rounded-full bg-[#38BDF8] shadow-[0_0_18px_rgba(56,189,248,0.6)]" />
              Premium digital studio
            </div>

            <div className="mt-4 text-2xl font-semibold tracking-tight text-white">
              Learn2Compile
            </div>
            <p className="mt-3 max-w-sm text-sm leading-6 text-white/70">
              Premium web development with cinematic motion, immersive 3D, and performance-first engineering.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Follow us on Instagram"
                className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:border-white/20"
              >
                Instagram
              </a>
              <a
                href={SOCIAL_LINKS.twitter}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Follow us on X"
                className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:border-white/20"
              >
                X / Twitter
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Connect on LinkedIn"
                className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:border-white/20"
              >
                LinkedIn
              </a>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Contact us on WhatsApp"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#25D366]/15 border border-[#25D366]/30 px-4 py-2 text-sm text-[#25D366] transition hover:bg-[#25D366]/25"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.296-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-3">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-white/60">Navigation</div>
              <div className="mt-4 space-y-3">
                <Link href="/" className="block text-sm text-white/75 hover:text-white">
                  Home
                </Link>
                <Link href="/services" className="block text-sm text-white/75 hover:text-white">
                  Services
                </Link>
                <Link href="/portfolio" className="block text-sm text-white/75 hover:text-white">
                  Portfolio
                </Link>
                <Link href="/pricing" className="block text-sm text-white/75 hover:text-white">
                  Pricing
                </Link>
              </div>
            </div>

            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-white/60">Company</div>
              <div className="mt-4 space-y-3">
                <Link href="/about" className="block text-sm text-white/75 hover:text-white">
                  About
                </Link>
                <Link href="/faq" className="block text-sm text-white/75 hover:text-white">
                  FAQ
                </Link>
                <Link href="/contact" className="block text-sm text-white/75 hover:text-white">
                  Contact
                </Link>
              </div>
            </div>

            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-white/60">Quick CTA</div>
              <div className="mt-4 space-y-3">
                <Link
                  href="/custom-quote"
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#38BDF8]/20 via-[#8B5CF6]/20 to-[#06B6D4]/20 px-4 py-3 text-sm font-medium text-white shadow-[0_0_25px_rgba(56,189,248,0.15)] transition-all duration-300 hover:from-[#38BDF8]/30 hover:via-[#8B5CF6]/30 hover:to-[#06B6D4]/30 hover:shadow-[0_0_35px_rgba(56,189,248,0.25)] hover:scale-[1.02] active:scale-[0.98]"
                >
                  Start Your Project
                </Link>
                <div className="text-xs text-white/60">Premium delivery • Fast response • SEO-ready</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs text-white/55">
            © {new Date().getFullYear()} Learn2Compile. All rights reserved.
          </div>
          <div className="text-xs text-white/55">Built with cinematic UI & performance-first engineering.</div>
        </div>
      </div>
    </footer>
  );
}
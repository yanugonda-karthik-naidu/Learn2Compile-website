"use client";

import Link from "next/link";

export function FooterSection() {
  return (
    <footer className="relative bg-[#050816] py-14">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-3">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
              <span className="h-2 w-2 rounded-full bg-[#38BDF8] shadow-[0_0_18px_rgba(56,189,248,0.6)]" />
              Future-ready studio
            </div>

            <div className="mt-4 text-2xl font-semibold tracking-tight text-white">
              Aurora Digital
            </div>
            <p className="mt-3 max-w-sm text-sm leading-6 text-white/70">
              Premium web development with cinematic motion, immersive 3D, and performance-first engineering.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10"
              >
                Instagram
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10"
              >
                X / Twitter
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10"
              >
                LinkedIn
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
                <a
                  href="/custom-quote"
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#38BDF8]/20 via-[#8B5CF6]/20 to-[#06B6D4]/20 px-4 py-3 text-sm font-medium text-white shadow-[0_0_30px_rgba(56,189,248,0.15)] transition hover:from-[#38BDF8]/30 hover:via-[#8B5CF6]/30 hover:to-[#06B6D4]/30"
                >
                  Start Your Project
                </a>
                <div className="text-xs text-white/60">Premium delivery • Fast response • SEO-ready</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs text-white/55">
            © {new Date().getFullYear()} Aurora Digital. All rights reserved.
          </div>
          <div className="text-xs text-white/55">Built with cinematic UI & performance-first engineering.</div>
        </div>
      </div>
    </footer>
  );
}


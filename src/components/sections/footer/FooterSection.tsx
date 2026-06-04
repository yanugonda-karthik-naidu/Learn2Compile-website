"use client";

import Link from "next/link";

const SOCIAL_ICONS = {
  instagram: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.285c-.804 0-1.455.651-1.455 1.455s.651 1.455 1.455 1.455 1.455-.651 1.455-1.455-.651-1.455-1.455-1.455z"/>
    </svg>
  ),
  whatsapp: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.296-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  ),
  linkedin: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  github: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  ),
};

const NAVIGATION_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

const SERVICES_LINKS = [
  { href: "/services", label: "Web Design" },
  { href: "/services", label: "Web Development" },
  { href: "/services", label: "Landing Pages" },
  { href: "/services", label: "SEO Optimization" },
  { href: "/services", label: "Website Maintenance" },
];

const SOCIAL_LINKS = [
  { href: "https://www.instagram.com/learn2compile?igsh=MTR4MzRwOHBiOWd3dQ==", icon: "instagram", label: "Instagram" },
  { href: "https://wa.me/7793922519", icon: "whatsapp", label: "WhatsApp" },
  { href: "https://www.linkedin.com/company/learn2compile", icon: "linkedin", label: "LinkedIn" },
  { href: "https://github.com/learn2compile", icon: "github", label: "GitHub" },
];

interface SocialIconButtonProps {
  href: string;
  icon: keyof typeof SOCIAL_ICONS;
  label: string;
}

function SocialIconButton({ href, icon, label }: SocialIconButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={label}
      className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-110 hover:shadow-[0_0_20px_rgba(56,189,248,0.2)]"
    >
      <span className="transition-transform duration-300 group-hover:rotate-6 group-hover:text-[#38BDF8]">
        {SOCIAL_ICONS[icon]}
      </span>
    </a>
  );
}

export function FooterSection() {
  return (
    <footer className="relative bg-[#050816]">
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/4 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#38BDF8]/8 via-[#8B5CF6]/4 to-transparent" />
        <div className="absolute right-1/4 top-1/2 h-[400px] w-[600px] translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#8B5CF6]/8 via-transparent to-transparent" />
      </div>

      {/* Top gradient line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#38BDF8]/20 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Desktop: 3-column | Tablet: 2-column | Mobile: single column */}
        <div className="grid grid-cols-1 gap-8 py-10 sm:grid-cols-2 sm:py-12 lg:grid-cols-5">
          {/* Column 1: Brand - 40% */}
          <div className="flex flex-col items-center text-center sm:items-start sm:text-left lg:col-span-2">
            <div className="text-xl font-semibold tracking-tight text-white">
              Learn2Compile
            </div>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/60">
              Premium web experiences with cinematic motion, immersive 3D, and performance-first engineering.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => (
                <SocialIconButton
                  key={social.icon}
                  href={social.href}
                  icon={social.icon as keyof typeof SOCIAL_ICONS}
                  label={social.label}
                />
              ))}
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="flex flex-col items-center sm:items-start">
            <div className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
              Navigation
            </div>
            <div className="mt-4 flex flex-col gap-4">
              {NAVIGATION_LINKS.map((link) => (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  className="group relative inline-flex items-center min-h-[44px] text-sm text-white/70 transition-all duration-300 hover:text-white"
                >
                  <span className="relative">
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      {link.label}
                    </span>
                    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-r from-[#38BDF8] to-[#8B5CF6] transition-all duration-300 group-hover:w-full" />
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Services */}
          <div className="flex flex-col items-center sm:items-start">
            <div className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
              Services
            </div>
            <div className="mt-4 flex flex-col gap-4">
              {SERVICES_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="group relative inline-flex items-center min-h-[44px] text-sm text-white/70 transition-all duration-300 hover:text-white"
                >
                  <span className="relative">
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      {link.label}
                    </span>
                    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-r from-[#38BDF8] to-[#8B5CF6] transition-all duration-300 group-hover:w-full" />
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Column 4: CTA Card */}
          <div className="flex items-center justify-center lg:justify-end">
            <div className="relative w-[220px] rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-5 shadow-[0_0_30px_rgba(56,189,248,0.06)]">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#38BDF8]/5 via-[#8B5CF6]/5 to-transparent" />
              <div className="relative z-10 text-center">
                <div className="text-sm font-medium text-white/90">Ready To Start?</div>
                <p className="mt-2 text-xs text-white/50">
                  Let&apos;s build a website that converts visitors into customers.
                </p>
                <Link
                  href="/custom-quote"
                  className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#38BDF8] via-[#8B5CF6] to-[#06B6D4] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(56,189,248,0.2)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(56,189,248,0.3)]"
                >
                  Start Project
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <div className="mt-3 flex flex-col items-center gap-1 text-[10px] text-white/40">
                  <span className="flex items-center gap-1">
                    <svg className="h-3 w-3 text-[#38BDF8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Fast Response
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="h-3 w-3 text-[#38BDF8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Mobile First
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="h-3 w-3 text-[#38BDF8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    SEO Ready
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-center gap-1 border-t border-white/5 px-4 py-6 text-xs text-white/40 sm:flex-row sm:gap-4 sm:px-6">
          <div>© 2026 Learn2Compile. All rights reserved.</div>
          <div className="flex items-center gap-1.5">
            Built with
            <svg className="h-3 w-3 text-[#38BDF8]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            cinematic UI & performance-first engineering.
          </div>
        </div>
      </div>
    </footer>
  );
}

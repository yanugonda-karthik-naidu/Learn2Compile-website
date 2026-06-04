"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export function PricingCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.fromTo(
        contentRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative bg-[#050816] py-16 sm:py-20 md:py-24 overflow-x-hidden">
      <div className="mx-auto max-w-4xl px-6">
        <div
          ref={sectionRef}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5"
        >
          {/* Gradient background - centered for PricingCTA */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(800px circle at 50% 50%, rgba(56,189,248,0.12), transparent 55%), radial-gradient(600px circle at 50% 50%, rgba(139,92,246,0.08), transparent 50%)",
            }}
          />

          <div ref={contentRef} className="relative p-8 text-center sm:p-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
              <span className="h-2 w-2 rounded-full bg-[#38BDF8] shadow-[0_0_18px_rgba(56,189,248,0.6)]" />
              Ready to start?
            </div>

            <h2 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
              <span className="text-white">Need Something</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-[#8B5CF6] to-[#06B6D4]">
                Custom?
              </span>
            </h2>

            <p className="mt-4 max-w-xl mx-auto text-base leading-7 text-white/70">
              Every business has unique requirements. If your project requires additional functionality, custom integrations, or special features, we can create a solution tailored specifically for your business.
            </p>

            {/* CTA buttons */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
              <a
                href="/custom-quote"
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#38BDF8]/25 via-[#8B5CF6]/25 to-[#06B6D4]/25 px-6 py-3.5 text-base font-medium text-white shadow-[0_0_18px_rgba(56,189,248,0.15)] transition-all duration-300 hover:from-[#38BDF8]/40 hover:via-[#8B5CF6]/40 hover:to-[#06B6D4]/40 hover:shadow-[0_0_30px_rgba(56,189,248,0.25)] active:scale-[0.98]"
              >
                <span>Request Custom Quote</span>
                <svg
                  className="h-5 w-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>

              <a
                href="https://wa.me/917793922519"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-3.5 text-base font-medium text-white shadow-[0_0_0_1px_rgba(255,255,255,0.06)] transition-all duration-300 hover:border-green-500/30 hover:bg-green-500/10 hover:shadow-[0_0_25px_rgba(34,197,94,0.18)] active:scale-[0.98]"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.296-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Talk On WhatsApp
              </a>
            </div>

            {/* WhatsApp option */}
            {/* <div className="mt-6">
              <a
                href="https://wa.me/917793922519"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-white/70 transition-all duration-200 hover:border-green-500/30 hover:bg-green-500/10 hover:text-green-400"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.296-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Quick WhatsApp inquiry
              </a>
            </div> */}

            {/* Trust text */}
            <p className="mt-8 text-xs text-white/40">
              No commitment required. Free initial consultation. Source code ownership with every project.
            </p>

            {/* Important note */}
            <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs text-white/60">
                <span className="font-medium text-white/80">Note: </span>
                Prices may vary depending on project scope, design requirements, features, and functionality. Final pricing will be confirmed after discussing your requirements. Custom features may involve additional charges. Pricing is flexible and can be discussed based on project needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
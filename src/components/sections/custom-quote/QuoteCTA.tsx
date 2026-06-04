"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export function QuoteCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      // Container animation
      tl.fromTo(
        sectionRef.current,
        { opacity: 0, y: 40, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power3.out" }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

  const whatsappMessage = encodeURIComponent(
    `Hello Learn2Compile,\n\nI completed the custom quote form and would like to discuss my project requirements.\n\nPlease share the next steps.`
  );

  return (
    <section className="relative bg-[#050816] py-14 md:py-16">
      <div className="mx-auto max-w-5xl px-6">
        <div
          ref={sectionRef}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5"
        >
          {/* Layer 1: Top-left radial glow */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(800px circle at 10% 0%, rgba(56,189,248,0.14), transparent 55%)",
            }}
          />

          {/* Layer 2: Top-right radial glow */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(600px circle at 85% 20%, rgba(139,92,246,0.12), transparent 50%)",
            }}
          />

          {/* Layer 3: Bottom-center subtle cyan glow */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(500px circle at 50% 100%, rgba(6,182,212,0.08), transparent 50%)",
            }}
          />

          {/* Decorative grid - barely visible */}
          <div
            className="pointer-events-none absolute inset-0 opacity-8"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(56,189,248,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(56,189,248,0.05) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          <div className="relative p-8 text-center sm:p-12 md:p-14">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80"
              data-animate
            >
              <span className="h-2 w-2 rounded-full bg-[#38BDF8] shadow-[0_0_18px_rgba(56,189,248,0.6)]" />
              Custom consultation ready
            </div>

            {/* Heading */}
            <h2
              className="mx-auto mt-6 max-w-[700px] text-3xl font-semibold tracking-tight text-[#38BDF8] sm:text-4xl md:text-5xl"
              data-animate
            >
              <span className="block text-white">Ready to discuss your</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-[#8B5CF6] to-[#06B6D4]">
                custom website plan?
              </span>
            </h2>

            {/* Description */}
            <p
              className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70"
              data-animate
            >
              You&apos;ve already completed the planning stage. Let&apos;s review
              your requirements, finalize the scope, and prepare the right
              solution for your business.
            </p>

            {/* CTA buttons */}
            <div
              className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center"
              data-animate
            >
              <a
                href="#quote-form"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#38BDF8]/30 via-[#8B5CF6]/30 to-[#06B6D4]/30 px-6 py-3.5 text-base font-medium text-white shadow-[0_0_40px_rgba(56,189,248,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:from-[#38BDF8]/45 hover:via-[#8B5CF6]/45 hover:to-[#06B6D4]/45 hover:shadow-[0_0_50px_rgba(56,189,248,0.3)] active:scale-[0.98] sm:w-auto"
              >
                <span>Send Project Details</span>
                <svg
                  className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
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
                href="/contact"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-6 py-3.5 text-base font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/15 hover:shadow-[0_0_30px_rgba(56,189,248,0.15)] active:scale-[0.98] sm:w-auto"
              >
                Book Discovery Call
              </a>
            </div>

            {/* WhatsApp CTA */}
            <div className="mt-6" data-animate>
              <a
                href={`https://wa.me/${whatsappNumber || "917793922519"}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-white/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#25D366] hover:bg-[rgba(37,211,102,0.08)] hover:text-green-400 hover:shadow-[0_0_25px_rgba(37,211,102,0.25)]"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.296-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Discuss on WhatsApp
              </a>
            </div>

            {/* Trust Strip */}
            <div
              className="mt-8 flex flex-wrap items-center justify-center gap-3"
              data-animate
            >
              {[
                "Free consultation",
                "Scope clarity",
                "Direct communication",
                "No hidden charges",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white/70"
                >
                  ✓ {item}
                </span>
              ))}
            </div>

            {/* Micro Stats Row */}
            <div
              className="mt-8 grid grid-cols-3 gap-4"
              data-animate
            >
              {[
                { value: "24h", label: "Response Time" },
                { value: "10+", label: "Projects Delivered" },
                { value: "98%", label: "Client Satisfaction" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="text-xl font-semibold text-white">{stat.value}</div>
                  <div className="mt-1 text-xs text-white/50">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Bottom Trust Text */}
            <p className="mt-8 text-xs text-white/45" data-animate>
              Every consultation is reviewed manually. No automated quotations. No
              copy-paste proposals.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

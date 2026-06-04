"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { useMotion } from "@/hooks/useMotion";

function CTAButton({
  href,
  children,
  variant,
  index,
}: {
  href: string;
  children: React.ReactNode;
  variant: "primary" | "secondary" | "outline" | "whatsapp";
  index: number;
}) {
  const { reduced } = useMotion();
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (reduced) return;
    if (!buttonRef.current) return;

    gsap.fromTo(
      buttonRef.current,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        delay: 0.2 + index * 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: buttonRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      }
    );
  }, [reduced, index]);

  const baseClasses =
    "group relative inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-medium transition-all duration-300";

  const variantClasses = {
    primary: "bg-gradient-to-r from-[#38BDF8]/20 via-[#8B5CF6]/20 to-[#06B6D4]/20 text-white shadow-[0_0_25px_rgba(56,189,248,0.15)] hover:from-[#38BDF8]/30 hover:via-[#8B5CF6]/30 hover:to-[#06B6D4]/30 hover:shadow-[0_0_35px_rgba(56,189,248,0.25)] hover:scale-[1.02] active:scale-[0.98]",
    secondary:
      "border border-white/15 bg-white/5 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.06)] hover:border-[#38BDF8]/30 hover:bg-white/10 hover:shadow-[0_0_25px_rgba(56,189,248,0.18)] hover:scale-[1.02] active:scale-[0.98]",
    outline:
      "border border-white/10 bg-white/5 text-white/80 hover:border-white/20 hover:bg-white/10 hover:text-white",
    whatsapp:
      "bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/25",
  };

  return (
    <a ref={buttonRef} href={href} className={`${baseClasses} ${variantClasses[variant]}`}>
      {variant === "primary" && (
        <span className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_var(--x,50%)_50%,rgba(56,189,248,0.35),transparent_55%)]" />
        </span>
      )}
      <span className="relative">{children}</span>
    </a>
  );
}

export function AboutCTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mql = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mql) return;
    const handler = () => setReduced(mql.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      setMouse({ x: nx, y: ny });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useEffect(() => {
    if (reduced) return;
    if (!contentRef.current) return;

    gsap.fromTo(
      contentRef.current.children,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  }, [reduced]);

  const whatsappNumber =process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "917793922519";
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hi Learn2Compile, I would like to discuss a website project."
  )}`;

  return (
    <section ref={sectionRef} className="relative bg-[#050816] py-16 sm:py-20 md:py-24 overflow-x-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(600px_circle_at_50%_50%, rgba(56,189,248,0.12), transparent 55%), radial-gradient(400px_circle_at_30%_30%, rgba(139,92,246,0.08), transparent 45%)`,
            transform: `translate3d(${mouse.x * 8}px, ${mouse.y * 8}px, 0)`,
            transition: "transform 300ms ease",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6">
        <div
          ref={contentRef}
          className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12"
        >
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
              <span className="h-2 w-2 rounded-full bg-[#38BDF8] shadow-[0_0_18px_rgba(56,189,248,0.6)]" />
              Ready to begin
            </div>

            <h2 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
              <span className="text-white">Let&apos;s Build Something </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-[#8B5CF6] to-[#06B6D4]">Extraordinary</span>
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-white/70">
              Your vision deserves a team that cares as much about the craft as you do. Let&apos;s talk about your project.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <CTAButton href="/custom-quote" variant="primary" index={0}>
              <span className="relative flex items-center gap-2">
                Start Your Project
                <span className="transition group-hover:translate-x-1">→</span>
              </span>
            </CTAButton>

            <CTAButton href="/custom-quote" variant="secondary" index={1}>
              <span className="relative">Get Custom Quote</span>
            </CTAButton>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <CTAButton href={whatsappHref} variant="whatsapp" index={2}>
              <span className="relative flex items-center gap-2">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.296-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Inquiry
              </span>
            </CTAButton>

            <CTAButton href="/contact" variant="outline" index={3}>
              <span className="relative">Book Consultation</span>
            </CTAButton>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-[#050816]/30 p-4">
              <div className="text-xs uppercase tracking-[0.18em] text-white/50">
                Response time
              </div>
              <div className="mt-2 text-sm font-semibold text-white">Within 24 hours</div>
              <div className="mt-1 text-xs text-white/60">
                Clear next steps, premium planning.
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#050816]/30 p-4">
              <div className="text-xs uppercase tracking-[0.18em] text-white/50">
                Project start
              </div>
              <div className="mt-2 text-sm font-semibold text-white">ASAP to 2 weeks</div>
              <div className="mt-1 text-xs text-white/60">
                Flexible timelines based on your needs.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCinematicButton } from "@/hooks/useCinematicButton";

// Register plugin only on client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function CinematicCTA({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}) {
  const { onMouseEnter, onMouseLeave, onMouseDown, onMouseUp, onMouseMove, containerRef } =
    useCinematicButton({
      scaleStrength: variant === "primary" ? 1.03 : 1.02,
      glowStrength: variant === "primary" ? 0.3 : 0.2,
      glowColor:
        variant === "primary"
          ? "rgba(56,189,248,0.3)"
          : "rgba(139,92,246,0.2)",
      anticipationDelay: 0.08,
    });

  return (
    <a
      ref={containerRef as React.RefObject<HTMLAnchorElement>}
      href={href}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      className={className}
    >
      {children}
    </a>
  );
}

export function ServicesCTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    gsap.fromTo(contentRef.current.children, { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out",
      scrollTrigger: { trigger: contentRef.current, start: "top 80%", toggleActions: "play none none reverse" },
    });
  }, []);


  return (
    <section ref={sectionRef} className="relative bg-[#050816] py-24">
      {/* Floating glow positioning for ServicesCTA variety */}
      <div className="absolute inset-0 bg-[radial-gradient(800px_circle_at_40%_60%,rgba(56,189,248,0.12),transparent_50%),radial-gradient(600px_circle_at_70%_40%,rgba(139,92,246,0.08),transparent_50%)]" />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div ref={contentRef} className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
            <span className="h-2 w-2 rounded-full bg-[#38BDF8] shadow-[0_0_18px_rgba(56,189,248,0.6)]" />
            Start your project
          </div>
          <h2 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            <span className="text-white">Ready to Build Something </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-[#8B5CF6] to-[#06B6D4]">Premium?</span>
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-white/70">
            Let&apos;s transform your vision into a stunning digital reality. From concept to launch, we craft experiences that captivate and convert.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <CinematicCTA
              href="/custom-quote"
              variant="primary"
              className="group inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#38BDF8] via-[#8B5CF6] to-[#06B6D4] px-6 py-3.5 text-base font-medium text-white shadow-[0_0_35px_rgba(56,189,248,0.25)] transition-all duration-300 hover:shadow-[0_0_50px_rgba(56,189,248,0.35)] active:scale-[0.98]"
            >
              <span>Start Your Project</span>
              <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </CinematicCTA>
            <CinematicCTA
              href="/contact"
              variant="secondary"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-3.5 text-base font-medium text-white transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:shadow-[0_0_25px_rgba(56,189,248,0.18)] active:scale-[0.98]"
            >
              Get in Touch
            </CinematicCTA>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-white">50+</div>
              <div className="text-sm text-white/50">Projects Delivered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">100%</div>
              <div className="text-sm text-white/50">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">24/7</div>
              <div className="text-sm text-white/50">Support Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
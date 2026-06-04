"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const pricingFaqs = [
  {
    q: "How long does development take?",
    a: "Delivery timelines vary by package: Starter (5-7 days), Business (7-14 days), Premium (14-21 days). Complex custom features may require additional time. We'll provide a clear timeline during our initial discussion.",
  },
  {
    q: "Do you help with hosting and domain setup?",
    a: "Yes! We help set up your hosting and guide you through domain configuration. For most projects, we recommend Vercel or Netlify for their excellent CDN performance and seamless Next.js integration.",
  },
  {
    q: "Can I request revisions?",
    a: "Absolutely. We include revision rounds in every package to ensure you're satisfied with the result. The number of revisions varies by package— Starter includes 2 revisions, Business includes 4 revisions, and Premium includes unlimited revisions.",
  },
  {
    q: "Will my website work on mobile devices?",
    a: "Yes! Every website we build is fully mobile responsive by default. We design touch-first with optimized tap targets, responsive typography, and layouts that adapt beautifully from mobile to desktop.",
  },
  {
    q: "Do you provide support after launch?",
    a: "Yes. Post-launch support is included with every package. Business and Premium packages include priority support. We also offer extended maintenance plans for ongoing needs like content updates and security monitoring.",
  },
  {
    q: "Can additional features be added later?",
    a: "Yes! Additional features can be added to any package. We'll provide transparent pricing for any enhancements you need. Contact us to discuss your requirements and we'll give you a clear quote.",
  },
  {
    q: "How do payments work?",
    a: "Standard payment structure is 50% upfront to begin work, and 50% upon completion. For larger projects, we can split into milestone payments. All payment terms are discussed and agreed before work begins.",
  },
];

function FaqItem({
  item,
  isOpen,
  onToggle,
}: {
  item: { q: string; a: string };
  isOpen: boolean;
  onToggle: () => void;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const answerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!contentRef.current || !answerRef.current) return;

    if (isOpen) {
      const h = answerRef.current.scrollHeight;
      gsap.to(contentRef.current, {
        height: h,
        duration: 0.35,
        ease: "power3.out",
      });
    } else {
      gsap.to(contentRef.current, {
        height: 0,
        duration: 0.25,
        ease: "power3.in",
      });
    }
  }, [isOpen]);

  return (
    <div
      ref={itemRef}
      className="group relative overflow-hidden rounded-[24px] border border-white/8 bg-white/[0.03] backdrop-blur-[20px] p-6 transition-all duration-[400ms] hover:-translate-y-1"
      style={{
        borderColor: hovered ? "rgba(59,130,246,0.25)" : "rgba(255,255,255,0.08)",
        boxShadow: hovered
          ? "0 20px 40px rgba(0,0,0,0.3), 0 0 30px rgba(59,130,246,0.12), 0 0 30px rgba(139,92,246,0.12)"
          : "0 4px 20px rgba(0,0,0,0.2)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Gradient overlay on hover */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-[400ms] group-hover:opacity-100 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(139,92,246,0.08) 100%)",
        }}
      />

      <button
        type="button"
        onClick={onToggle}
        className="relative flex w-full items-center justify-between gap-4 text-left"
        aria-expanded={isOpen}
      >
        <span
          className="text-lg font-semibold text-white transition-all duration-300 pr-2"
          style={{
            background: hovered
              ? "linear-gradient(135deg, #38BDF8 0%, #8B5CF6 100%)"
              : "none",
            WebkitBackgroundClip: hovered ? "text" : "unset",
            WebkitTextFillColor: hovered ? "transparent" : "unset",
          }}
        >
          {item.q}
        </span>

        {/* Circular glass icon container */}
        <span
          className="relative shrink-0 rounded-full transition-all duration-[400ms]"
          style={{
            width: "40px",
            height: "40px",
            background: hovered
              ? "rgba(59,130,246,0.15)"
              : "rgba(255,255,255,0.04)",
            border: hovered
              ? "1px solid rgba(59,130,246,0.3)"
              : "1px solid rgba(255,255,255,0.08)",
            boxShadow: hovered
              ? "0 0 20px rgba(59,130,246,0.2)"
              : "none",
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          <svg
            className="absolute inset-0 m-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            style={{ width: "18px", height: "18px", color: "white" }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </button>

      <div ref={contentRef} className="overflow-hidden" style={{ height: 0 }}>
        <div ref={answerRef} className="pt-4">
          <p
            className="text-gray-400 leading-[1.8] max-w-[95%]"
            style={{ fontSize: "15px" }}
          >
            {item.a}
          </p>
        </div>
      </div>
    </div>
  );
}

export function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      if (gridRef.current) {
        const items = gridRef.current.querySelectorAll("[data-faq-item]");
        gsap.fromTo(
          items,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#050816] py-20 md:py-24 lg:py-28 overflow-hidden">
      {/* Ambient glows */}
      <div
        className="absolute top-0 left-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)",
          transform: "translate(50%, 50%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div ref={headerRef} className="mb-12 sm:mb-14 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/80">
            <span className="h-2 w-2 rounded-full bg-[#38BDF8] shadow-[0_0_18px_rgba(56,189,248,0.6)]" />
            Pricing FAQs
          </div>
          <h2 className="mt-6 sm:mt-8 text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-semibold tracking-tight">
            <span className="text-white">Common </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#8B5CF6]">Questions</span>
          </h2>
          <p className="mt-4 sm:mt-5 max-w-xl mx-auto text-base sm:text-lg text-white/60 px-2 sm:px-0">
            Quick answers to help you make an informed decision.
          </p>
        </div>

        {/* FAQ grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {pricingFaqs.map((item, idx) => (
            <div key={idx} data-faq-item>
              <FaqItem
                item={item}
                isOpen={openIndex === idx}
                onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
              />
            </div>
          ))}
        </div>

        {/* Trust strip */}
        <div
          className="mt-10 text-center rounded-[24px] border border-white/8 bg-white/[0.03] backdrop-blur-[20px] p-6 sm:p-8"
          style={{
            background: "linear-gradient(135deg, rgba(59,130,246,0.05) 0%, rgba(139,92,246,0.05) 100%)",
          }}
        >
          <p className="text-white/80 text-base sm:text-lg font-medium mb-4">
            Still have questions?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <a
              href="/contact"
              className="flex items-center gap-2 text-sm sm:text-base text-[#38BDF8] hover:text-white transition-colors duration-300"
            >
              <span>📞</span>
              <span>Book a free consultation</span>
            </a>
            <a
              href="https://wa.me/917793922519"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm sm:text-base text-[#38BDF8] hover:text-white transition-colors duration-300"
            >
              <span>💬</span>
              <span>WhatsApp support available</span>
            </a>
            <span className="flex items-center gap-2 text-sm sm:text-base text-white/60">
              <span>⚡</span>
              <span>Average response time: Under 1 hour</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

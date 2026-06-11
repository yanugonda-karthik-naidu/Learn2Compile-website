"use client";

import { useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { motion } from "@/lib/gsap/config";

interface NavLink {
  href: string;
  label: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: NavLink[];
}

export function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  const pathname = usePathname();

  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const firstActionRef = useRef<HTMLAnchorElement | null>(null);

  const items = useMemo(() => links, [links]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (typeof document === "undefined") return;

    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const overlay = overlayRef.current;
    const card = cardRef.current;
    if (!overlay || !card) return;

    if (isOpen) {
      gsap.set(overlay, { display: "block" });
      gsap.set(card, { opacity: 0, y: 16, scale: 0.98, visibility: "visible" });

      gsap.to(overlay, {
        opacity: 1,
        duration: 0.18,
        ease: motion.transition.menuOverlay.ease,
      });

      gsap.to(card, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.26,
        ease: motion.transition.menuSlide.ease,
        onComplete: () => {
          firstActionRef.current?.focus?.();
        },
      });
    } else {
      gsap.to(card, {
        opacity: 0,
        y: 16,
        scale: 0.98,
        duration: 0.18,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(card, { visibility: "hidden" });
          gsap.set(overlay, { display: "none" });
        },
      });

      gsap.to(overlay, {
        opacity: 0,
        duration: 0.16,
        ease: "power2.in",
      });
    }
  }, [isOpen]);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] hidden md:hidden"
      style={{ opacity: 0 }}
      onMouseDown={(e) => {
        // Click outside closes
        if (e.target === overlayRef.current) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      <div
        ref={cardRef}
        className="relative mx-auto w-[calc(100vw-32px)] max-w-[520px] rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_50px_rgba(56,189,248,0.18)] p-4 sm:p-5 visibility-hidden"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-2 pt-1">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-2 rounded-2xl px-2 py-2 outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8]/60"
            ref={firstActionRef}
          >
            <Image src="/logo.png" alt="L2C Web Studio" width={44} height={44} className="h-10 w-auto" />
          </Link>

          <button
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10 active:scale-95"
            aria-label="Close menu"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Menu */}
        <div className="mt-4 flex flex-col gap-2">
          {items.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={`relative flex items-center justify-center rounded-2xl px-4 py-3 text-center text-base font-medium transition active:scale-[0.99] outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8]/60 ${
                  active ? "text-white" : "text-white/75 hover:text-white"
                }`}
              >
                {active && (
                  <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#38BDF8]/20 via-[#8B5CF6]/20 to-[#06B6D4]/20 border border-white/10" />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}

          {/* CTA */}
          <Link
            href="/custom-quote"
            onClick={onClose}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#38BDF8]/20 via-[#8B5CF6]/20 to-[#06B6D4]/20 px-4 py-3 text-base font-medium text-white shadow-[0_0_25px_rgba(56,189,248,0.15)] ring-1 ring-white/10 transition hover:from-[#38BDF8]/30 hover:via-[#8B5CF6]/30 hover:to-[#06B6D4]/30 hover:shadow-[0_0_35px_rgba(56,189,248,0.25)] active:scale-[0.99]"
          >
            Start Your Project
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>

          <a
            href="https://wa.me/917793922519"
            onClick={(e) => {
              // keep behavior consistent with existing menu; still close
              onClose();
            }}
            className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-base font-medium text-white/90 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] transition hover:border-[#38BDF8]/30 hover:bg-white/10 hover:text-white active:scale-[0.99]"
          >
            WhatsApp Inquiry
          </a>
        </div>
      </div>
    </div>
  );
}


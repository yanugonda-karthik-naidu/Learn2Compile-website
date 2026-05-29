"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { usePathname } from "next/navigation";
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
  const menuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!menuRef.current || !overlayRef.current || !linksRef.current) return;
    const menu = menuRef.current;
    const overlay = overlayRef.current;
    const linkElements = linksRef.current.querySelectorAll(".menu-link");

    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.set(menu, { display: "flex" });
      gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: motion.transition.menuOverlay.duration, ease: motion.transition.menuOverlay.ease });
      gsap.fromTo(menu, { x: "100%" }, { x: "0%", duration: motion.transition.menuSlide.duration, ease: motion.transition.menuSlide.ease });
      gsap.fromTo(linkElements, { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, stagger: motion.transition.menuStagger.each, ease: motion.transition.menuStagger.ease, delay: 0.2 });
    } else {
      gsap.to(linkElements, { x: 50, opacity: 0, duration: 0.2, stagger: 0.03, ease: "power2.in" });
      gsap.to(menu, { x: "100%", duration: motion.transition.menuSlide.duration, ease: "power3.in", delay: 0.1 });
      gsap.to(overlay, { opacity: 0, duration: motion.transition.menuOverlay.duration, ease: "power2.in", delay: 0.3, onComplete: () => {
        gsap.set(menu, { display: "none" });
        document.body.style.overflow = "";
      }});
    }
  }, [isOpen]);

  return (
    <div ref={overlayRef} className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md md:hidden" style={{ display: "none" }} onClick={onClose}>
      <div ref={menuRef} className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col justify-center bg-[#050816]/95 backdrop-blur-xl border-l border-white/10" style={{ display: "none" }}>
        <div className="absolute right-4 top-4">
          <button onClick={onClose} className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-all duration-200 hover:bg-white/10 active:scale-95">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div ref={linksRef} className="flex flex-col gap-1 px-6">
          {links.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link key={link.href} href={link.href} onClick={onClose} className={`menu-link group relative px-4 py-4 text-2xl font-medium transition-all duration-200 rounded-2xl min-h-[56px] flex items-center ${isActive ? "text-white" : "text-white/70 hover:text-white"}`}>
                <span className="relative z-10">{link.label}</span>
                {isActive && <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#38BDF8]/20 via-[#8B5CF6]/20 to-[#06B6D4]/20 border border-white/10" />}
                <span className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-200 group-hover:opacity-100 bg-gradient-to-r from-[#38BDF8]/10 via-[#8B5CF6]/10 to-[#06B6D4]/10" />
              </Link>
            );
          })}

          <div className="mt-6 menu-link">
            <Link href="/custom-quote" onClick={onClose} className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#38BDF8]/20 via-[#8B5CF6]/20 to-[#06B6D4]/20 px-6 py-4 text-base font-medium text-white shadow-[0_0_25px_rgba(56,189,248,0.15)] transition-all duration-300 hover:from-[#38BDF8]/30 hover:via-[#8B5CF6]/30 hover:to-[#06B6D4]/30 hover:shadow-[0_0_35px_rgba(56,189,248,0.25)] hover:scale-[1.02] active:scale-[0.98]">
              Start Project
              <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-0 right-0 px-6 menu-link">
          <div className="flex items-center justify-center gap-2 text-xs text-white/40">
            <span>Learn2Compile Studio</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#38BDF8]" />
          </div>
        </div>
      </div>
    </div>
  );
}
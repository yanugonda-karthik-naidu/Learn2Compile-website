"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { gsap } from "gsap";
import { MobileMenu } from "./MobileMenu";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navbarRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);
  const pathname = usePathname();

  const handleScroll = useCallback(() => {
    if (typeof window === "undefined") return;
    const currentScrollY = window.scrollY;
    setIsScrolled(currentScrollY > 20);
    if (currentScrollY > 100) {
      if (currentScrollY > lastScrollY.current + 5) {
        setIsHidden(true);
      } else if (currentScrollY < lastScrollY.current - 5) {
        setIsHidden(false);
      }
    } else {
      setIsHidden(false);
    }
    lastScrollY.current = currentScrollY;
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (!navbarRef.current) return;
    gsap.fromTo(navbarRef.current, { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 });
  }, []);

  useEffect(() => {
    if (!navbarRef.current) return;
    gsap.to(navbarRef.current, { y: isHidden ? -100 : 0, duration: 0.4, ease: "power3.inOut" });
  }, [isHidden]);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  return (
    <>
      <nav ref={navbarRef} className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${isScrolled ? "bg-[#050816]/80 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.3)]" : "bg-transparent"} ${isHidden ? "-translate-y-full" : "translate-y-0"}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className={`flex h-16 items-center justify-between transition-all duration-300 ${isScrolled ? "h-14" : "h-16"}`}>
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#38BDF8] via-[#8B5CF6] to-[#06B6D4] shadow-[0_0_20px_rgba(56,189,248,0.3)]">
                <span className="text-sm font-bold text-white">L2C</span>
              </div>
              <span className="text-sm font-semibold tracking-tight text-white transition-opacity group-hover:opacity-80">Learn2Compile</span>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link key={link.href} href={link.href} className={`relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-xl group ${isActive ? "text-white" : "text-white/70 hover:text-white"}`}>
                    <span className="relative z-10">{link.label}</span>
                    {isActive && <span className="absolute inset-0 rounded-xl bg-white/5 border border-white/10" />}
                    <span className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-200 group-hover:opacity-100 bg-gradient-to-r from-[#38BDF8]/10 via-[#8B5CF6]/10 to-[#06B6D4]/10" />
                    {isActive && <span className="absolute -bottom-0.5 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#38BDF8] via-[#8B5CF6] to-[#06B6D4]" />}
                  </Link>
                );
              })}
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <Link href="/custom-quote" className="relative inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white shadow-[0_0_0_1px_rgba(255,255,255,0.06)] transition-all duration-200 hover:border-[#38BDF8]/30 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(56,189,248,0.15)]">
                <span className="relative z-10">Start Project</span>
                <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>

            <button onClick={() => setIsMobileOpen(true)} className="relative lg:hidden flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-all duration-200 hover:bg-white/10 hover:border-white/20" aria-label="Open menu">
              <div className="flex flex-col gap-1.5">
                <span className={`h-0.5 w-5 rounded-full bg-white/80 transition-all duration-300 ${isMobileOpen ? "translate-y-2 rotate-45" : ""}`} />
                <span className={`h-0.5 w-3.5 rounded-full bg-white/80 transition-all duration-300 ${isMobileOpen ? "opacity-0 w-0" : ""}`} />
                <span className={`h-0.5 w-5 rounded-full bg-white/80 transition-all duration-300 ${isMobileOpen ? "-translate-y-2 -rotate-45" : ""}`} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu isOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)} links={navLinks} />
    </>
  );
}
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";

const principles = [
  {
    title: "Business-First Design",
    description:
      "Every interface decision is tied to conversion — calls, bookings, enquiries. We design for business outcomes, not just visual appeal.",
    icon: "01",
    color: "#38BDF8",
  },
  {
    title: "Performance Engineering",
    description:
      "Lightning-fast loading, smooth 60fps interactions, and SEO-ready from day one. Performance isn't an afterthought — it's the foundation.",
    icon: "02",
    color: "#8B5CF6",
  },
  {
    title: "Mobile-First Engineering",
    description:
      "Touch-friendly layouts built for Android audiences and diverse devices across India. Your site works beautifully everywhere.",
    icon: "03",
    color: "#06B6D4",
  },
  {
    title: "Premium Visual Craft",
    description:
      "Cinematic motion, immersive 3D, and elegant micro-interactions that leave lasting impressions and separate you from competitors.",
    icon: "04",
    color: "#EC4899",
  },
  {
    title: "Transparent Process",
    description:
      "Clear timelines, honest pricing, and consistent updates throughout. No hidden scope, no surprise bills — just premium delivery.",
    icon: "05",
    color: "#F59E0B",
  },
  {
    title: "Long-term Partnership",
    description:
      "We don't disappear after launch. Ongoing improvements, security updates, and fast response — we're invested in your long-term success.",
    icon: "06",
    color: "#10B981",
  },
];

function PrincipleCard({
  principle,
  index,
}: {
  principle: (typeof principles)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mql) return;
    const handler = () => setReduced(mql.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reduced) return;
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        delay: index * 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  }, [reduced, index]);

  return (
    <div
      ref={cardRef}
      className="group relative rounded-3xl border border-white/10 bg-white/5 p-6 transition-all hover:border-white/20 hover:bg-white/[0.07]"
    >
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: `radial-gradient(400px_circle_at_50%_50%, ${principle.color}15, transparent 60%)` }} />

      <div className="relative z-10">
        <div
          className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10"
          style={{ background: `linear-gradient(135deg, ${principle.color}20, ${principle.color}10)` }}
        >
          <span className="text-lg font-semibold" style={{ color: principle.color }}>
            {principle.icon}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-white">{principle.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/70">{principle.description}</p>

        <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
    </div>
  );
}

export function AboutPhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mql) return;
    const handler = () => setReduced(mql.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reduced) return;
    if (!headerRef.current) return;

    gsap.fromTo(
      headerRef.current.children,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  }, [reduced]);

  const items = useMemo(() => principles, []);

  return (
    <section ref={sectionRef} className="relative bg-[#050816] py-16 sm:py-20 md:py-24 overflow-x-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(56,189,248,0.08),transparent_50%)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div ref={headerRef} className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
            <span className="h-2 w-2 rounded-full bg-[#38BDF8] shadow-[0_0_18px_rgba(56,189,248,0.6)]" />
            Our Philosophy
          </div>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            <span className="text-white">What Drives </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#06B6D4]">Everything We Do</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-white/70">
            Great digital experiences are born at the intersection of business strategy and creative engineering.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((principle, index) => (
            <PrincipleCard key={principle.title} principle={principle} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
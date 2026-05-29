"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugin only on client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  color: string;
}


const services: Service[] = [
  {
    title: "Business Websites",
    description: "Premium websites that establish authority, build trust, and convert visitors into paying customers.",
    icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
    features: ["Conversion-focused design", "SEO-optimized structure", "Mobile-first approach", "Fast loading speeds"],
    color: "#38BDF8",
  },
  {
    title: "Wedding Websites",
    description: "Romantic, elegant digital experiences that showcase your services and captivate couples.",
    icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
    features: ["Romantic aesthetics", "Gallery showcases", "Booking systems", "Instagram-ready visuals"],
    color: "#EC4899",
  },
  {
    title: "Startup Websites",
    description: "Modern, high-impact websites that communicate your vision, attract investors, and acquire early adopters.",
    icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    features: ["Investor-ready presentations", "Feature showcases", "CTA optimization", "Analytics integration"],
    color: "#8B5CF6",
  },
  {
    title: "Restaurant Websites",
    description: "Appetizing digital storefronts with online ordering, reservations, and menus.",
    icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
    features: ["Online ordering", "Reservation systems", "Dynamic menus", "Location integration"],
    color: "#F59E0B",
  },
  {
    title: "Portfolio Websites",
    description: "Stunning personal portfolios that highlight your work, attract clients, and establish your unique identity.",
    icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>,
    features: ["Project showcases", "Case studies", "Contact integrations", "Performance-focused"],
    color: "#06B6D4",
  },
  {
    title: "Landing Pages",
    description: "High-converting landing pages designed for product launches, campaigns, and lead generation.",
    icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>,
    features: ["A/B testing ready", "Lead capture forms", "Analytics tracking", "Rapid deployment"],
    color: "#10B981",
  },
  {
    title: "UI/UX Design",
    description: "Premium interface design systems that create intuitive, delightful user experiences.",
    icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>,
    features: ["Design systems", "User research", "Wireframing", "Prototyping"],
    color: "#6366F1",
  },
  {
    title: "Performance Optimization",
    description: "Speed optimization that improves Core Web Vitals, reduces bounce rates, and boosts rankings.",
    icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    features: ["Core Web Vitals optimization", "Lazy loading", "CDN setup", "Caching strategies"],
    color: "#EF4444",
  },
];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(cardRef.current, { y: 60, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.7, delay: index * 0.1, ease: "power3.out",
      scrollTrigger: { trigger: cardRef.current, start: "top 85%", toggleActions: "play none none reverse" },
    });
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-500 ${isHovered ? "bg-white/[0.06] border-white/20" : ""}`}>
        <div className="absolute inset-0 opacity-0 transition-opacity duration-500" style={{ background: `radial-gradient(400px_circle_at_50%_50%, ${service.color}15, transparent 60%)` }} />
        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5" style={{ color: service.color }}>
              {service.icon}
            </div>
            <div className="h-2 w-2 rounded-full opacity-40 transition-all duration-300 group-hover:opacity-100" style={{ backgroundColor: service.color, boxShadow: `0 0 20px ${service.color}60` }} />
          </div>
          <h3 className="mt-4 text-xl font-semibold text-white">{service.title}</h3>
          <p className="mt-2 text-sm leading-6 text-white/60">{service.description}</p>
          <div className="mt-5 space-y-2">
            {service.features.map((feature, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-white/50">
                <svg className="h-4 w-4" style={{ color: service.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                {feature}
              </div>
            ))}
          </div>
          <a href="/custom-quote" className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 transition-all duration-200 hover:border-white/20 hover:bg-white/10 hover:text-white">
            Get Quote
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
        </div>
        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>
    </div>
  );
}

export function ServiceShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;
    gsap.fromTo(headerRef.current.children, { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out",
      scrollTrigger: { trigger: headerRef.current, start: "top 80%", toggleActions: "play none none reverse" },
    });
  }, []);

  return (
    <section id="services" ref={sectionRef} className="relative bg-[#050816] py-20">
      <div className="absolute inset-0 bg-[radial-gradient(600px_circle_at_80%_20%,rgba(139,92,246,0.08),transparent_50%)]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
            <span className="h-2 w-2 rounded-full bg-[#38BDF8] shadow-[0_0_18px_rgba(56,189,248,0.6)]" />
            Our services
          </div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            <span className="text-white">Crafting Digital </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#8B5CF6]">Excellence</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base text-white/60">
            Premium web solutions tailored for modern businesses. Each project combines stunning design, cutting-edge technology, and conversion-focused strategy.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
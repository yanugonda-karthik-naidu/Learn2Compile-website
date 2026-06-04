"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/gsap/reducedMotion";

// Register plugin only on client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServiceCategory {
  id: string;
  title: string;
  businessBenefit: string;
  features: string[];
  outcomes: string[];
  gradient: string;
  accent: string;
  icon: string;
}

const serviceCategories: ServiceCategory[] = [

  {
    id: "custom",
    title: "Custom Web Solutions",
    businessBenefit: "Get a Custome digital solution that solves your unique business challenges and requirements.",
    features: [
      "Bespoke design and functionality",
      "Custom integrations and workflows",
      "Scalable architecture",
      "Dedicated support and guidance",
    ],
    outcomes: ["Perfect Fit", "Unique Solution", "Long-term Partner"],
    gradient: "from-[#6366F1]/20 to-[#818CF8]/20",
    accent: "#6366F1",
    icon: "✨",
  },

  {
    id: "business",
    title: "Business Websites",
    businessBenefit: "Establish credibility and convert visitors into paying customers with a premium online presence.",
    features: [
      "Professional design that builds trust",
      "Mobile-first for on-the-go customers",
      "Fast loading to keep visitors engaged",
      "Clear contact actions (call, WhatsApp, email)",
    ],
    outcomes: ["More Enquiries", "Better Credibility", "24/7 Online Presence"],
    gradient: "from-[#38BDF8]/20 to-[#06B6D4]/20",
    accent: "#38BDF8",
    icon: "🏢",
  },
  {
    id: "wedding",
    title: "Wedding Planner Websites",
    businessBenefit: "Capture leads from Instagram and convert couples into bookings without feeling salesy.",
    features: [
      "Romantic, elegant visual storytelling",
      "Booking-ready inquiry forms",
      "Gallery showcases with lightbox",
      "Mobile-optimized for Instagram traffic",
    ],
    outcomes: ["More Bookings", "Lead Capture", "Instagram Growth"],
    gradient: "from-[#EC4899]/20 to-[#F9A8D4]/20",
    accent: "#EC4899",
    icon: "💒",
  },
  {
    id: "restaurant",
    title: "Restaurant Websites",
    businessBenefit: "Turn your website into a 24/7 salesperson that handles reservations and drives foot traffic.",
    features: [
      "One-tap WhatsApp reservations",
      "Beautiful menu presentation",
      "Google Business integration",
      "Food photography showcase",
    ],
    outcomes: ["More Reservations", "Reduced Phone Load", "Better Reviews"],
    gradient: "from-[#F59E0B]/20 to-[#FCD34D]/20",
    accent: "#F59E0B",
    icon: "🍽️",
  },
  {
    id: "coaching",
    title: "Coaching Institute Websites",
    businessBenefit: "Attract serious students and convert website visitors into enrolled course members.",
    features: [
      "Mentor credibility showcases",
      "Course catalog with enrollment",
      "Lead capture for free strategy sessions",
      "Student testimonials and results",
    ],
    outcomes: ["More Enrollments", "Qualified Leads", "Higher Trust"],
    gradient: "from-[#10B981]/20 to-[#6EE7B7]/20",
    accent: "#10B981",
    icon: "🎓",
  },
  {
    id: "startup",
    title: "Startup Landing Pages",
    businessBenefit: "Communicate your vision, acquire early adopters, and attract investors with a high-converting page.",
    features: [
      "Investor-ready presentations",
      "Feature showcases with benefits focus",
      "Social proof and testimonials",
      "Demo request and waitlist CTAs",
    ],
    outcomes: ["More Demos", "Investor Interest", "Early Adopters"],
    gradient: "from-[#8B5CF6]/20 to-[#A78BFA]/20",
    accent: "#8B5CF6",
    icon: "🚀",
  },
  
];

function ServiceCard({ service, index }: { service: ServiceCategory; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (!cardRef.current || prefersReducedMotion()) return;

    gsap.fromTo(
      cardRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        delay: index * 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.02] transition-all duration-500 hover:border-white/20 hover:bg-white/[0.04]"
    >
      {/* Gradient overlay */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px_circle_at_50%_0%, ${service.accent}12, transparent 60%)`,
        }}
      />

      <div className="relative z-10 p-5 sm:p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div
            className="flex h-12 sm:h-14 w-12 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 text-2xl sm:text-3xl"
            style={{ backgroundColor: `${service.accent}15` }}
          >
            {service.icon}
          </div>
          <div
            className="h-2.5 w-2.5 rounded-full opacity-40 transition-all duration-300 group-hover:opacity-100"
            style={{
              backgroundColor: service.accent,
              boxShadow: `0 0 16px ${service.accent}80`,
            }}
          />
        </div>

        {/* Title */}
        <h3 className="mt-4 sm:mt-5 text-lg sm:text-xl font-semibold text-white">{service.title}</h3>

        {/* Business Benefit */}
        <p className="mt-2 text-sm sm:text-base text-white/60 leading-relaxed">{service.businessBenefit}</p>

        {/* Key Features - collapsible on mobile */}
        <div className={`mt-4 sm:mt-5 space-y-2 ${isExpanded ? "" : "hidden sm:block"}`}>
          <h4 className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-white/40">What&apos;s Included</h4>
          <ul className="space-y-1.5 sm:space-y-2">
            {service.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-white/70">
                <svg
                  className="mt-0.5 h-4 sm:h-4 w-4 flex-shrink-0"
                  style={{ color: service.accent }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile expand toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-3 flex w-full items-center justify-center gap-1 text-xs text-white/40 sm:hidden"
        >
          <span>{isExpanded ? "Show less" : "View features"}</span>
          <svg
            className={`h-3 w-3 transition-transform ${isExpanded ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Expected Outcomes */}
        <div className="mt-5 sm:mt-6">
          <h4 className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-white/40">You Get</h4>
          <div className="mt-2 flex flex-wrap gap-2">
            {service.outcomes.map((outcome) => (
              <span
                key={outcome}
                className="rounded-full border border-white/10 bg-white/5 px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs text-white/70"
              >
                {outcome}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-5 sm:mt-6">
          <a
            href="/custom-quote"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 sm:px-5 sm:py-3 text-sm font-medium text-white transition-all duration-200 hover:border-white/20 hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Start This Type</span>
            <svg className="h-4 sm:h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}

export function ServiceShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef.current || prefersReducedMotion()) return;

    gsap.fromTo(
      headerRef.current.children,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section id="services" ref={sectionRef} className="relative bg-[#050816] py-16 sm:py-20 md:py-24 overflow-x-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute left-0 top-1/4 h-[400px] w-[400px] rounded-full bg-[#8B5CF6]/5 blur-[120px]" />
        <div className="absolute right-0 bottom-1/4 h-[300px] w-[300px] rounded-full bg-[#38BDF8]/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="mb-10 sm:mb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs sm:text-sm text-white/80">
            <span className="h-2 w-2 rounded-full bg-[#38BDF8] shadow-[0_0_18px_rgba(56,189,248,0.6)]" />
            What We Build
          </div>
          <h2 className="mt-4 sm:mt-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
            <span className="text-white">Premium Websites </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#8B5CF6]">Built for Results</span>
          </h2>
          <p className="mt-3 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base text-white/60 px-2 sm:px-0">
            Every project is designed with one goal: helping your business grow. No technical jargon, just clear outcomes.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {serviceCategories.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
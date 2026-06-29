"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

type ValueProp = {
  icon: React.ReactNode;
  title: string;
  description: string;
  stat?: string;
  statLabel?: string;
  accentColor: string;
};

const valueProps: ValueProp[] = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Build Trust",
    description:
      "A professional website signals quality and legitimacy. When potential customers see a polished online presence, they're more likely to trust your business and make contact.",
    stat: "75%",
    statLabel: "of customers research businesses online first",
    accentColor: "#38BDF8",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "Generate More Leads",
    description:
      "Every feature on your website—from contact forms to WhatsApp integration—is designed to make it easy for interested customers to reach out and start a conversation.",
    stat: "2x",
    statLabel: "leads generated with a professional website",
    accentColor: "#A855F7",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
    title: "Improve Brand Credibility",
    description:
      "Your website is a direct reflection of your brand. A well-designed site with cohesive branding helps you stand out from competitors who haven't invested in their online presence.",
    accentColor: "#6366F1",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Reach More Customers",
    description:
      "With local SEO and Google Maps integration, your business gets discovered by customers actively searching for services like yours. More visibility means more opportunities.",
    accentColor: "#3B82F6",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: "Increase Business Growth",
    description:
      "A website works 24/7 for your business—even while you sleep. It's a powerful growth tool that compounds your efforts and expands your reach beyond local word-of-mouth.",
    accentColor: "#8B5CF6",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Create Better First Impressions",
    description:
      "Studies show it takes only seconds for someone to form an opinion about your business from your website. Make those seconds count with a design that delights and converts.",
    stat: "94%",
    statLabel: "of first impressions are design-related",
    accentColor: "#38BDF8",
  },
];

function AnimatedCounter({
  value,
  suffix = "",
  isVisible,
}: {
  value: string;
  suffix?: string;
  isVisible: boolean;
}) {
  const [display, setDisplay] = useState("0");
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ""));
  const isPercent = value.includes("%");
  const prefix = isPercent ? "%" : "";

  useEffect(() => {
    if (!isVisible) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: numericValue,
      duration: 1.5,
      ease: "power2.out",
      onUpdate: () => {
        const rounded = Math.round(obj.val);
        setDisplay(rounded.toString());
      },
    });
  }, [isVisible, numericValue]);

  return (
    <span className="font-bold">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

function ValueCard({ prop }: { prop: ValueProp }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className="group relative rounded-[28px] border border-white/8 bg-white/2 p-6 transition-all duration-300 ease-out hover:-translate-y-2 hover:border-white/12 hover:bg-white/[0.04] hover:shadow-xl hover:shadow-black/20"
      data-stagger-item
      style={{
        background: `linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.01) 100%)`,
      }}
    >
      {/* Glow effect on hover */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${prop.accentColor}15 0%, transparent 60%)`,
        }}
      />

      <div className="relative flex items-start gap-5">
        {/* Icon container with glow */}
        <div
          className="relative flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/70 backdrop-blur-sm transition-all duration-300 group-hover:border-white/20"
          style={{
            boxShadow: `0 0 0 0 ${prop.accentColor} transparent`,
            transition: 'box-shadow 0.3s ease-out',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px 4px ${prop.accentColor}40`;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 0 transparent`;
          }}
        >
          <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
            {prop.icon}
          </div>
          {/* Soft inner glow */}
          <div
            className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${prop.accentColor}20 0%, transparent 70%)`,
            }}
          />
        </div>

        <div className="flex-1">
          <h3 className="text-xl font-semibold leading-tight text-white">{prop.title}</h3>
          <p className="mt-2.5 text-base leading-relaxed text-white/85">{prop.description}</p>
        </div>
      </div>

      {prop.stat && (
        <div className="mt-5 flex items-baseline gap-2.5">
          <AnimatedCounter value={prop.stat} isVisible={isVisible} />
          <span className="text-xs text-white/50">{prop.statLabel}</span>
        </div>
      )}
    </div>
  );
}

function MetricCard({
  value,
  label,
  sublabel,
  gradient,
  isVisible,
}: {
  value: string;
  label: string;
  sublabel: string;
  gradient: string;
  isVisible: boolean;
}) {
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ""));
  const suffix = value.replace(/[^a-zA-Z]/g, "");
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isVisible) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: numericValue,
      duration: 1.5,
      ease: "power2.out",
      onUpdate: () => {
        setDisplay(Math.round(obj.val).toString());
      },
    });
  }, [isVisible, numericValue]);

  return (
    <div className="relative text-center">
      <div className={`text-5xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
        {display}{suffix}
      </div>
      <div className="mt-2 text-sm font-medium uppercase tracking-wider text-white/80">
        {label}
      </div>
      <div className="mt-1 text-xs text-white/50">
        {sublabel}
      </div>
    </div>
  );
}

export function PricingValue() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isMetricsVisible, setIsMetricsVisible] = useState(false);
  const metricsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsMetricsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (metricsRef.current) {
      observer.observe(metricsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Cards fade-up reveal with stagger
      gsap.fromTo(
        "[data-stagger-item]",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
          delay: 0.2,
        }
      );

      // Metrics scale-in reveal
      gsap.fromTo(
        "[data-metric-item]",
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.15,
        }
      );
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#050816] py-16 sm:py-20 md:py-24 overflow-x-hidden">
      {/* Background glows */}
      <div className="absolute left-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[#38BDF8] opacity-5 blur-[120px]" />
      <div className="absolute left-1/3 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-[#A855F7] opacity-5 blur-[120px]" />
      <div className="absolute right-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[#6366F1] opacity-5 blur-[120px]" />
      {/* Centered radial glow behind heading */}
      <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-r from-[#38BDF8] to-[#A855F7] opacity-[0.07] blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section header - centered layout */}
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white/80 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-[#38BDF8] shadow-[0_0_18px_rgba(56,189,248,0.6)]" />
            Why invest in a professional website
          </div>

          {/* Headline */}
          <h2 className="mt-8 max-w-[900px] text-4xl font-bold leading-[1.05] text-white md:text-5xl lg:text-6xl">
            Your Website Should{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
              Work Harder
            </span>{" "}
            Than You Do.
          </h2>

          {/* Description */}
          <p className="mt-6 max-w-[700px] text-lg leading-relaxed text-white/80">
            A professional website is more than an online brochure. It becomes your sales engine, credibility builder, lead generator, and growth platform — working 24/7 to support your business.
          </p>
        </div>

        {/* Value props grid */}
        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3" data-animate="stagger">
{valueProps.map((prop) => (
            <ValueCard key={prop.title} prop={prop} />
          ))}
        </div>

        {/* Trust metrics panel */}
        <div
          ref={metricsRef}
          className="relative mt-16 rounded-[32px] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-sm"
          style={{
            background: `linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 50%, rgba(168,85,247,0.02) 100%)`,
            boxShadow: `inset 0 1px 0 0 rgba(255,255,255,0.05), 0 0 60px -20px rgba(168,85,247,0.15)`,
          }}
        >
          {/* Inner glow */}
          <div className="absolute inset-0 rounded-[32px] bg-gradient-to-b from-white/[0.02] to-transparent" />

          <div className="relative grid gap-8 md:grid-cols-3" data-metrics>
            <div data-metric-item>
              <MetricCard
                value="10+"
                label="Projects Delivered"
                sublabel="Across multiple industries"
                gradient="from-[#38BDF8] to-[#818CF8]"
                isVisible={isMetricsVisible}
              />
            </div>
            <div data-metric-item>
              <MetricCard
                value="98%"
                label="Client Satisfaction"
                sublabel="Focused on long-term relationships"
                gradient="from-[#818CF8] to-[#A855F7]"
                isVisible={isMetricsVisible}
              />
            </div>
            <div data-metric-item>
              <MetricCard
                value="3.2x"
                label="Average ROI"
                sublabel="Designed for conversion"
                gradient="from-[#A855F7] to-[#6366F1]"
                isVisible={isMetricsVisible}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
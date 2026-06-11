"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/gsap/reducedMotion";
import Image from "next/image";

// Register plugin only on client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const rankhanceUrl = "https://rankhance.in";

const featuredCaseStudy = {
  id: "rankhance-website",
  name: "RankHance",
  industry: "EdTech Platform",

  tagline:
    "A Modern EAMCET Preparation Platform Built For Student Success",

  challenge:
    "The goal was to create a professional educational platform that helps students prepare for EAMCET examinations through structured learning resources, performance tracking, and an engaging digital experience while maintaining accessibility across all devices.",

  solution: [
    "Conversion-focused educational website architecture",
    "Student-friendly learning experience with clear navigation",
    "Responsive design optimized for mobile learners",
    "Performance-driven UI with fast loading speeds",
    "SEO-ready structure to improve online visibility",
    "Integrated inquiry and student enrollment workflows",
  ],

  outcomes: [
    {
      label: "Performance Score",
      value: "95+",
    },
    {
      label: "Mobile Responsive",
      value: "100%",
    },
    {
      label: "SEO Ready",
      value: "A+",
    },
  ],

  gradient: "from-sky-500/20 via-cyan-500/10 to-blue-500/20",
  accent: "#38BDF8",

  desktopExperience: {
    badge: "Desktop Experience",
    title: "Complete Learning Dashboard",
    description:
      "Students can access structured learning resources, performance analytics, mock tests, progress tracking, and preparation tools through a focused desktop experience designed for long study sessions.",
    features: [
      "Dashboard Overview",
      "Performance Tracking",
      "Mock Test Access",
      "Study Resources",
      "Student Progress Monitoring",
    ],
  },

  tabletExperience: {
    badge: "Tablet Experience",
    title: "Optimized For Focused Learning",
    description:
      "Designed for larger touch interfaces, allowing students to comfortably consume content, attempt tests, and review progress while maintaining a distraction-free learning environment.",
    features: [
      "Touch Friendly Navigation",
      "Optimized Reading Experience",
      "Interactive Learning",
      "Seamless Content Access",
    ],
  },

  mobileExperience: {
    badge: "Mobile Experience",
    title: "Learn Anywhere",
    description:
      "Students can access courses, notes, tests, and performance insights from any device with a fully responsive mobile-first experience.",
    features: [
      "Mobile First Design",
      "Fast Loading",
      "Responsive Layout",
      "Easy Navigation",
    ],
  },
};

// Desktop Browser Frame - 100% scale, largest showcase
function DesktopFrame({ imageSrc, imageAlt }: { imageSrc: string; imageAlt: string }) {
  return (
    <div className="w-full h-[520px] lg:h-[560px] rounded-2xl lg:rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-2xl shadow-black/20">
      {/* Browser Chrome */}
      <div className="h-10 lg:h-12 bg-white/[0.02] border-b border-white/10 flex items-center gap-3 px-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <div className="flex-1 mx-4 h-7 rounded-lg bg-white/5 flex items-center px-3">
          <span className="text-xs text-white/30 truncate">{rankhanceUrl}</span>
        </div>
      </div>
      {/* Screen Content */}
      <div className="h-[calc(100%-2.5rem)] lg:h-[calc(100%-3rem)] p-1.5 lg:p-2">
        <div className="relative h-full w-full rounded-lg lg:rounded-xl overflow-hidden group">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      </div>
      {/* Glow accent */}
      <div
        className="absolute bottom-0 right-0 h-20 w-20 rounded-full blur-2xl opacity-15"
        style={{ backgroundColor: featuredCaseStudy.accent }}
      />
    </div>
  );
}

// Tablet Frame - 75% scale
function TabletFrame({ imageSrc, imageAlt }: { imageSrc: string; imageAlt: string }) {
  return (
    <div className="w-[85%] ml-auto h-[400px] lg:h-[440px] rounded-2xl lg:rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-2xl shadow-black/20">
      {/* Tablet Chrome */}
      <div className="h-6 lg:h-8 bg-white/[0.02] border-b border-white/10 flex items-center justify-center px-4">
        <div className="w-16 h-4 rounded-full bg-white/10" />
      </div>
      {/* Screen Content */}
      <div className="h-[calc(100%-2rem)] lg:h-[calc(100%-2.5rem)] p-1.5 lg:p-2">
        <div className="relative h-full w-full rounded-lg lg:rounded-xl overflow-hidden group">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      </div>
      {/* Glow accent */}
      <div
        className="absolute bottom-0 right-0 h-16 w-16 rounded-full blur-2xl opacity-15"
        style={{ backgroundColor: featuredCaseStudy.accent }}
      />
    </div>
  );
}

// Mobile Frame - 40% scale, portrait phone
function MobileFrame({ imageSrc, imageAlt }: { imageSrc: string; imageAlt: string }) {
  return (
    <div className="w-[180px] lg:w-[200px] mx-auto h-[380px] lg:h-[420px] rounded-[32px] lg:rounded-[36px] overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-2xl shadow-black/20 relative">
      {/* Phone Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60px] h-[24px] lg:w-[70px] lg:h-[28px] bg-black/40 rounded-b-2xl z-10" />
      {/* Status Bar Elements */}
      <div className="absolute top-6 lg:top-8 left-0 right-0 flex items-center justify-between px-4 z-10">
        <span className="text-[8px] text-white/40">9:41</span>
        <div className="flex items-center gap-0.5">
          <div className="w-4 h-2 rounded-sm bg-white/20" />
          <div className="w-4 h-2 rounded-sm bg-white/20" />
        </div>
      </div>
      {/* Screen Content */}
      <div className="h-full pt-8 lg:pt-10 pb-2 px-1.5">
        <div className="relative h-full w-full rounded-2xl overflow-hidden group">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      </div>
      {/* Home Indicator */}
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-[100px] h-1 rounded-full bg-white/20" />
      {/* Glow accent */}
      <div
        className="absolute bottom-0 right-0 h-12 w-12 rounded-full blur-2xl opacity-15"
        style={{ backgroundColor: featuredCaseStudy.accent }}
      />
    </div>
  );
}

function ExperienceCard({
  badge,
  title,
  description,
  features,
}: {
  badge: string;
  title: string;
  description: string;
  features: string[];
}) {
  return (
    <div className="space-y-4 sm:space-y-5">
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs sm:text-sm text-white/80">
        <span
          className="h-2 w-2 rounded-full animate-pulse"
          style={{
            backgroundColor: featuredCaseStudy.accent,
            boxShadow: `0 0 12px ${featuredCaseStudy.accent}`,
          }}
        />
        {badge}
      </div>

      <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white tracking-tight">
        {title}
      </h3>

      <p className="text-sm sm:text-base text-white/60 leading-relaxed">
        {description}
      </p>

      <ul className="space-y-2 sm:space-y-3">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <div
              className="mt-0.5 flex h-5 sm:h-6 w-5 sm:w-6 flex-shrink-0 items-center justify-center rounded-full border"
              style={{
                borderColor: `${featuredCaseStudy.accent}40`,
                backgroundColor: `${featuredCaseStudy.accent}10`,
              }}
            >
              <svg
                className="h-3 sm:h-3.5 w-3 sm:w-3.5"
                style={{ color: featuredCaseStudy.accent }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <span className="text-sm sm:text-base text-white/70">
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Desktop Section - 100% scale
function DesktopSection() {
  return (
    <div className="grid gap-8 lg:gap-12 lg:grid-cols-2 lg:items-center animate-in">
      {/* Screenshot - Left */}
      <DesktopFrame
        imageSrc="/rankhance-desktop.png"
        imageAlt="RankHance Desktop Experience"
      />
      {/* Content - Right */}
      <ExperienceCard
        badge={featuredCaseStudy.desktopExperience.badge}
        title={featuredCaseStudy.desktopExperience.title}
        description={featuredCaseStudy.desktopExperience.description}
        features={featuredCaseStudy.desktopExperience.features}
      />
    </div>
  );
}

// Tablet Section - 75% scale
function TabletSection() {
  return (
    <div className="grid gap-8 lg:gap-12 lg:grid-cols-2 lg:items-center animate-in">
      {/* Content - Left */}
      <ExperienceCard
        badge={featuredCaseStudy.tabletExperience.badge}
        title={featuredCaseStudy.tabletExperience.title}
        description={featuredCaseStudy.tabletExperience.description}
        features={featuredCaseStudy.tabletExperience.features}
      />
      {/* Screenshot - Right */}
      <TabletFrame
        imageSrc="/rankhance-tablet.png"
        imageAlt="RankHance Tablet Experience"
      />
    </div>
  );
}

// Mobile Section - 40% scale
function MobileSection() {
  return (
    <div className="grid gap-8 lg:gap-12 lg:grid-cols-2 lg:items-center animate-in">
      {/* Screenshot - Left */}
      <MobileFrame
        imageSrc="/rankhance-mobile.png"
        imageAlt="RankHance Mobile Experience"
      />
      {/* Content - Right */}
      <ExperienceCard
        badge={featuredCaseStudy.mobileExperience.badge}
        title={featuredCaseStudy.mobileExperience.title}
        description={featuredCaseStudy.mobileExperience.description}
        features={featuredCaseStudy.mobileExperience.features}
      />
    </div>
  );
}

export function FeaturedProject() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = contentRef.current;
    if (!element || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      const animatedElements = element.querySelectorAll(".animate-in");
      if (animatedElements.length === 0) return;

      tl.fromTo(
        animatedElements,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: "power3.out" }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#050816] py-16 sm:py-20 md:py-24">
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute left-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[#EC4899]/5 blur-[120px]" />
        <div className="absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-[#8B5CF6]/5 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={contentRef} className="mb-12 sm:mb-16 md:mb-20">
          <div className="animate-in inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs sm:text-sm text-white/80">
            <span
              className="h-2 w-2 rounded-full"
              style={{
                backgroundColor: featuredCaseStudy.accent,
                boxShadow: `0 0 12px ${featuredCaseStudy.accent}`,
              }}
            />
            Featured Case Study
          </div>

          <h2 className="mt-4 sm:mt-5 text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
            <span className="text-white">{featuredCaseStudy.name}</span>
          </h2>
          <p className="mt-2 sm:mt-3 text-base sm:text-lg text-white/60">
            {featuredCaseStudy.tagline}
          </p>

          <div className="mt-6 sm:mt-8">
            <h3 className="text-xs sm:text-sm font-medium uppercase tracking-wider text-white/40">
              The Challenge
            </h3>
            <p className="mt-2 text-sm sm:text-base text-white/70 leading-relaxed">
              {featuredCaseStudy.challenge}
            </p>
          </div>

          <div className="mt-5 sm:mt-6">
            <h3 className="text-xs sm:text-sm font-medium uppercase tracking-wider text-white/40">
              What We Built
            </h3>
            <ul className="mt-3 space-y-2 sm:space-y-3">
              {featuredCaseStudy.solution.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div
                    className="mt-0.5 flex h-5 sm:h-6 w-5 sm:w-6 flex-shrink-0 items-center justify-center rounded-full border"
                    style={{
                      borderColor: `${featuredCaseStudy.accent}40`,
                      backgroundColor: `${featuredCaseStudy.accent}10`,
                    }}
                  >
                    <svg
                      className="h-3 sm:h-3.5 w-3 sm:w-3.5"
                      style={{ color: featuredCaseStudy.accent }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base text-white/70">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Device Experience Sections */}
        <div className="space-y-12 sm:space-y-16 md:space-y-20">
          {/* Desktop Experience - 100% scale */}
          <DesktopSection />

          {/* Tablet Experience - 75% scale */}
          <TabletSection />

          {/* Mobile Experience - 40% scale */}
          <MobileSection />
        </div>

        {/* Outcomes */}
        <div className="mt-12 sm:mt-16 md:mt-20">
          <h3 className="text-xs sm:text-sm font-medium uppercase tracking-wider text-white/40 text-center mb-6 sm:mb-8">
            Project Outcomes
          </h3>
          <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto">
            {featuredCaseStudy.outcomes.map((outcome) => (
              <div
                key={outcome.label}
                className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6 text-center backdrop-blur-xl"
              >
                <div
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-white"
                  style={{ color: featuredCaseStudy.accent }}
                >
                  {outcome.value}
                </div>
                <div className="mt-2 text-xs sm:text-sm text-white/50">
                  {outcome.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-10 sm:mt-12 md:mt-14 flex flex-col sm:flex-row gap-3 sm:gap-4 sm:justify-center">
          <a
            href={rankhanceUrl}
            aria-label="Visit RankHance Website"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#EC4899]/20 via-[#8B5CF6]/20 to-[#EC4899]/20 px-5 sm:px-6 py-3 sm:py-3.5 text-sm sm:text-base font-medium text-white shadow-[0_0_30px_rgba(236,72,153,0.15)] transition-all duration-300 hover:from-[#EC4899]/30 hover:via-[#8B5CF6]/30 hover:to-[#EC4899]/30 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Visit RankHance Website</span>
            <svg
              className="h-4 sm:h-5 w-4 sm:w-5 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
          <a
            href="/portfolio#projects"
            className="group inline-flex items-center justify-center gap-2 rounded-xl sm:rounded-2xl border border-white/15 bg-white/5 px-5 sm:px-6 py-3 sm:py-3.5 text-sm sm:text-base font-medium text-white transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>View All Projects</span>
            <svg
              className="h-4 sm:h-5 w-4 sm:w-5 transition-transform group-hover:translate-y-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

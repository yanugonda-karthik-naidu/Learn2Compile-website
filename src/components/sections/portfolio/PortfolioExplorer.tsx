"use client";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/gsap/reducedMotion";

// Register plugin only on client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type CategoryKey = "all" | "business" | "wedding" | "restaurant" | "education" | "startup";

interface CaseStudyProject {
  id: string;
  name: string;
  industry: string;
  category: Exclude<CategoryKey, "all">;
  tagline: string;
  features: string[];
  websiteUrl: string;
  results: {
    label: string;
    value: string;
    icon: string;
  }[];
  gradient: string;
  accent: string;
  mockupColors: {
    primary: string;
    secondary: string;
  };
}

const projects: CaseStudyProject[] = [
  {
    id: "rankhance",
    name: "RankHance",
    industry: "EAMCET Preparation",
    category: "education",
    tagline: "Helping Students Crack EAMCET with Confidence and Clarity",
    features: [
      "Chapter-wise mock tests ",
      "AP & TS College Predictor",
      "Performance tracking dashboard with leaderboard",
    ],
    websiteUrl: "https://rankhance.in",
    results: [
      { label: "Student Retention", value: "+40%", icon: "🎓" },
      { label: "Performance Score", value: "95+", icon: "📱" },
      { label: "SEO Ready", value: "A+", icon: "🚀" },
    ],
    gradient: "from-orange-500/20 to-amber-500/20",
    accent: "#F97316",
    mockupColors: {
      primary: "#F97316",
      secondary: "#FDBA74",
    },
  },
  
  {
    id: "sarvam-venue",
    name: "Sarvam – The Venue",
    industry: "Photography & Creative Venue",
    category: "business",
    tagline: "Luxury Website For A Premier Shoot Destination",
    features: [
      "Premium brand-focused UI/UX",
      "Creative destination showcase",
      "Mobile-first responsive design",
    ],
    websiteUrl: " https://sarvam-pre-wedding.vercel.app/",
    results: [
      { label: "Responsive", value: "100%", icon: "📱" },
      { label: "Performance", value: "A+", icon: "⚡" },
      { label: "User Experience", value: "Premium", icon: "✨" },
    ],
    gradient: "from-amber-500/20 to-yellow-500/20",
    accent: "#D4AF37",
    mockupColors: {
      primary: "#D4AF37",
      secondary: "#FBBF24",
    },
  },
  {
    id: "tirumala-events",
    name: "Tirumala Events",
    industry: "Wedding Planning & Event Management",
    category: "business",
    tagline: "Premium Wedding Planning & Event Management Services",
    features: [
      "Fully responsive mobile-first design",
      "SEO optimization with Local Business Schema",
      "Custom domain, SSL & Vercel deployment",
    ],
    websiteUrl: "https://tirumalaevents.in",
    results: [
      { label: "Pages Developed", value: "5", icon: "📄" },
      { label: "Mobile Responsive", value: "100%", icon: "📱" },
      { label: "Custom Domain", value: "Live", icon: "🌐" },
    ],
    gradient: "from-amber-500/20 to-yellow-500/20",
    accent: "#D4AF37",
    mockupColors: {
      primary: "#D4AF37",
      secondary: "#F4E4BC",
    },
  },

  {
    id: "green-grow rural awareness",
    name: "GreenGrow Rural Awareness",
    industry: "Agriculture NGO",
    category: "business",
    tagline: "Where plants meet pixels: Cultivating growth for rural communities",
    features: [
      "Impact-driven design with compelling storytelling",
      "AI chatbot for instant visitor engagement",
      "Community forum for farmers",
    ],
    websiteUrl: "https://green-grow-rural-awareness.vercel.app",
    results: [
      { label: "Conversions", value: "+38%", icon: "📈" },
      { label: "Mobile Score", value: "95+", icon: "📱" },
      { label: "SEO Rank", value: "A+", icon: "🔍" },
    ],
    gradient: "from-rose-500/20 to-pink-500/20",
    accent: "#EC4899",
    mockupColors: { primary: "#EC4899", secondary: "#F9A8D4" },
  },
  {
    id: "urban-issue-reporting-app",
    name: "Urban Issue Reporting",
    industry: "Civic Tech",
    category: "startup",
    tagline: "Empowering Citizens, Transforming Cities Through Technology",
    features: [
      "Real-time issue tracking reporting and dashboard",
      "Interactive resolution map",
      "admin portal with analytics",
    ],
    websiteUrl: "https://urban-issue-solver.vercel.app",
    results: [
      { label: "Reservations", value: "+52%", icon: "📅" },
      { label: "Load Time", value: "-42%", icon: "⚡" },
      { label: "Reviews", value: "4.9★", icon: "⭐" },
    ],
    gradient: "from-amber-500/20 to-orange-500/20",
    accent: "#F59E0B",
    mockupColors: { primary: "#F59E0B", secondary: "#FCD34D" },
  },
  {
    id: "krishna-timber-depot",
    name: "Krishna Timber Depot",
    industry: "Timber & Wood Manufacturing",
    category: "business",
    tagline: "Premium Timber, Doors & Custom Wood Solutions Since 2001",
    features: [
      "Premium timber showcase with 7 wood categories",
      "Interactive product catalogs and design collections",
      "Custom doors, frames, furniture",
    ],
    websiteUrl: "",
    results: [
      { label: "Years Experience", value: "24+", icon: "🌳" },
      { label: "Timber Types", value: "7", icon: "🪵" },
      { label: "Custom Solutions", value: "100%", icon: "🚪" },
    ],
    gradient: "from-amber-500/20 to-yellow-500/20",
    accent: "#B88A44",
    mockupColors: {
    primary: "#B88A44",
    secondary: "#D6A85E",
    },
  }

];

const categories = [
  { key: "all" as const, label: "All Projects" },
  { key: "business" as const, label: "Business" },
  { key: "wedding" as const, label: "Wedding" },
  { key: "restaurant" as const, label: "Restaurant" },
  { key: "education" as const, label: "Education" },
  { key: "startup" as const, label: "Startup" },
];

function DeviceMockup({ project }: { project: CaseStudyProject }) {
  return (
    <div className="w-full h-[140px] rounded-xl sm:rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/5 p-2 sm:p-3 backdrop-blur-sm">
      <div className="h-full w-full rounded-lg sm:rounded-xl border border-white/5 bg-white/10 overflow-hidden relative">
        {/* Browser bar */}
        <div className="h-4 sm:h-5 bg-white/5 border-b border-white/5 flex items-center gap-1 px-1.5 sm:px-2">
          <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-red-500/60" />
          <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-yellow-500/60" />
          <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-green-500/60" />
        </div>
        {/* Content */}
        <div className="p-1.5 sm:p-2">
          <div className="h-2 sm:h-3 w-1/2 rounded bg-white/20" />
          <div className="mt-1 sm:mt-1.5 h-6 sm:h-8 w-full rounded bg-white/10" />
          <div className="mt-1 sm:mt-1.5 grid grid-cols-3 gap-0.5 sm:gap-1">
            <div className="h-3 sm:h-4 rounded bg-white/10" />
            <div className="h-3 sm:h-4 rounded bg-white/10" />
            <div className="h-3 sm:h-4 rounded bg-white/10" />
          </div>
        </div>
        {/* Accent glow */}
        <div
          className="absolute bottom-0 right-0 h-8 sm:h-12 w-8 sm:w-12 rounded-full blur-xl opacity-30"
          style={{ backgroundColor: project.mockupColors.primary }}
        />
      </div>
    </div>
  );
}

function CaseStudyCard({ project, index }: { project: CaseStudyProject; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current || prefersReducedMotion()) return;

    gsap.fromTo(
      cardRef.current,
      { y: 40, opacity: 0 },
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
      {/* Gradient overlay on hover */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(600px_circle_at_50%_30%, ${project.accent}10, transparent 60%)` }}
      />

      <div className="relative z-10 p-3 sm:p-4">
        {/* Device Mockup */}
        <div className="mb-4">
          <DeviceMockup project={project} />
        </div>

        {/* Industry Badge */}
        <div className="mb-2 flex items-center gap-2">
          <div
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: project.accent, boxShadow: `0 0 12px ${project.accent}` }}
          />
          <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-white/60">
            {project.industry}
          </span>
        </div>

        {/* Project Name & Tagline */}
        <h3 className="text-base sm:text-lg font-semibold text-white">{project.name}</h3>
        <p className="mt-0.5 text-xs text-white/50">{project.tagline}</p>

        {/* 3 Key Features */}
        <ul className="mt-3 space-y-1.5">
          {project.features.slice(0, 3).map((feature, i) => (
            <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-white/70">
              <svg className="mt-0.5 h-3.5 sm:h-4 w-3.5 sm:w-4 flex-shrink-0" style={{ color: project.accent }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>

        {/* Results Metrics */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          {project.results.map((result) => (
            <div
              key={result.label}
              className="rounded-xl border border-white/10 bg-white/5 p-2 sm:p-3 text-center"
            >
              <div className="text-lg sm:text-xl font-bold" style={{ color: project.accent }}>
                {result.value}
              </div>
              <div className="mt-0.5 text-[10px] sm:text-xs text-white/50 truncate">
                {result.label}
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-4 flex gap-2">
          {project.websiteUrl ? (
            <a
              href={project.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#38BDF8] to-[#8B5CF6] px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Visit Website</span>
              <svg className="h-3.5 sm:h-4 w-3.5 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          ) : (
            <div className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white/40 text-center">
              Website Coming Soon
            </div>
          )}
          <a
            href="/custom-quote"
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white transition-all duration-200 hover:border-white/20 hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Start Similar</span>
            <svg className="h-3.5 sm:h-4 w-3.5 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        {/* Trust Text */}
        {project.websiteUrl && (
          <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-white/40">
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            <span>Live Project Available</span>
          </div>
        )}
      </div>
    </div>
  );
}

export function PortfolioExplorer() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  // Animate filter change
  useEffect(() => {
    if (!gridRef.current || prefersReducedMotion()) return;

    const cards = gridRef.current.querySelectorAll(".case-study-card");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power2.out" }
    );
  }, [activeCategory]);

  // Section entrance animation
  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) return;

    gsap.fromTo(
      sectionRef.current.querySelector(".section-header"),
      { y: 40, opacity: 0 },
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
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="relative bg-[#050816] py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="section-header mb-10 sm:mb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs sm:text-sm text-white/80">
            <span className="h-2 w-2 rounded-full bg-[#38BDF8] shadow-[0_0_18px_rgba(56,189,248,0.6)]" />
            Case Studies
          </div>
          <h2 className="mt-4 sm:mt-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
            <span className="text-white">Results That </span>
            <span className="bg-gradient-to-r from-[#38BDF8] to-[#8B5CF6] bg-clip-text text-transparent">
              Speak for Themselves
            </span>
          </h2>
          <p className="mt-3 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base text-white/60 px-4">
            Premium websites built to solve real business problems. Every project starts with understanding your goals.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-8 sm:mb-10 flex flex-wrap justify-center gap-2 sm:gap-3">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`rounded-lg sm:rounded-xl border px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-all duration-200 ${
                activeCategory === cat.key
                  ? "border-[#38BDF8]/30 bg-[#38BDF8]/10 text-white shadow-[0_0_20px_rgba(56,189,248,0.1)]"
                  : "border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:text-white/80"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Case Study Grid */}
        <div
          ref={gridRef}
          className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {filteredProjects.map((project, index) => (
            <div key={project.id} className="case-study-card">
              <CaseStudyCard project={project} index={index} />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="py-16 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
              <svg className="h-8 w-8 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <p className="text-white/40">No projects in this category yet.</p>
            <button
              onClick={() => setActiveCategory("all")}
              className="mt-4 text-sm text-[#38BDF8] hover:underline"
            >
              View all projects
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
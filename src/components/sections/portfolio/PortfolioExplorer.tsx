"use client";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

type CategoryKey = "all" | "business" | "wedding" | "restaurant" | "startup" | "personal";


interface Project {
  id: string;
  name: string;
  type: string;
  category: Exclude<CategoryKey, "all">;
  description: string;
  metrics: { label: string; value: string }[];
  color: string;
}

const projects: Project[] = [
  { id: "vanta", name: "Vanta Restaurant", type: "Restaurant", category: "restaurant", description: "Premium dining experience with elegant menu presentation and seamless reservations.", metrics: [{ label: "Load Time", value: "-42%" }], color: "#F59E0B" },
  { id: "nebula", name: "Nebula Startup", type: "Startup", category: "startup", description: "High-converting launch platform with investor-ready presentations.", metrics: [{ label: "Core Vitals", value: "A+" }], color: "#8B5CF6" },
  { id: "nova", name: "Nova Personal", type: "Personal Brand", category: "personal", description: "Creator-focused portfolio with trust-first storytelling and lead capture.", metrics: [{ label: "Enquiry Rate", value: "+31%" }], color: "#10B981" },
  { id: "skyline", name: "Skyline Business", type: "Business", category: "business", description: "Premium local business website built for calls and WhatsApp enquiries.", metrics: [{ label: "Call Rate", value: "+27%" }], color: "#38BDF8" },
  { id: "elegance", name: "Elegance Weddings", type: "Wedding", category: "wedding", description: "Romantic digital experience with gallery showcases and booking systems.", metrics: [{ label: "Bookings", value: "+45%" }], color: "#EC4899" },
  { id: "techflow", name: "TechFlow SaaS", type: "Startup", category: "startup", description: "Modern SaaS landing page with feature showcases and pricing tables.", metrics: [{ label: "Conversions", value: "+52%" }], color: "#6366F1" },
];

const categories = [
  { key: "all" as const, label: "All" },
  { key: "business" as const, label: "Business" },
  { key: "wedding" as const, label: "Wedding" },
  { key: "restaurant" as const, label: "Restaurant" },
  { key: "startup" as const, label: "Startup" },
  { key: "personal" as const, label: "Personal" },
];

export function PortfolioExplorer() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredProjects = activeCategory === "all" ? projects : projects.filter((p) => p.category === activeCategory);


  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".project-card");
    gsap.fromTo(cards, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" });
  }, [activeCategory]);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(sectionRef.current.querySelector(".section-header"), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } });
  }, []);


  return (
    <section id="projects" ref={sectionRef} className="relative bg-[#050816] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="section-header mb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
            <span className="h-2 w-2 rounded-full bg-[#38BDF8] shadow-[0_0_18px_rgba(56,189,248,0.6)]" />
            Our projects
          </div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            <span className="text-white">Explore Our </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#8B5CF6]">Digital Craft</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base text-white/60">
            Each project is a story of premium design, modern engineering, and measurable business results.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`rounded-xl border px-4 py-2 text-sm font-medium transition-all duration-200 ${activeCategory === cat.key ? "border-[#38BDF8]/30 bg-[#38BDF8]/10 text-white" : "border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:text-white/80"}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div ref={gridRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <div key={project.id} className="project-card group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]">
              <div className="absolute inset-0 opacity-0 transition-opacity duration-300" style={{ background: `radial-gradient(400px_circle_at_50%_50%, ${project.color}15, transparent 60%)` }} />
              <div className="relative z-10">
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                    <span className="text-lg font-bold" style={{ color: project.color }}>{project.name[0]}</span>
                  </div>
                  <div className="h-2.5 w-2.5 rounded-full opacity-40 transition-all duration-300 group-hover:opacity-100" style={{ backgroundColor: project.color, boxShadow: `0 0 12px ${project.color}80` }} />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{project.name}</h3>
                <div className="mt-1 text-xs text-white/50">{project.type}</div>
                <p className="mt-3 text-sm text-white/60">{project.description}</p>
                <div className="mt-4 flex gap-3">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                      <div className="text-sm font-semibold" style={{ color: project.color }}>{m.value}</div>
                      <div className="text-xs text-white/40">{m.label}</div>
                    </div>
                  ))}
                </div>
                <a href="/custom-quote" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-white/60 transition-colors group-hover:text-white">
                  View similar
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
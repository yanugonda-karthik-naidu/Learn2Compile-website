"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugin only on client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const technologies = [
  { name: "Next.js", category: "Framework", color: "#38BDF8" },
  { name: "React", category: "UI Library", color: "#61DAFB" },
  { name: "TypeScript", category: "Language", color: "#3178C6" },
  { name: "TailwindCSS", category: "Styling", color: "#06B6D4" },
  { name: "Three.js", category: "3D Graphics", color: "#049EF4" },
  { name: "GSAP", category: "Animation", color: "#88CE02" },
  { name: "Node.js", category: "Backend", color: "#339933" },
  { name: "PostgreSQL", category: "Database", color: "#336791" },
  { name: "Vercel", category: "Deployment", color: "#000000" },
  { name: "Supabase", category: "Backend", color: "#3ECF8E" },
  { name: "Figma", category: "Design", color: "#F24E1E" },
  { name: "Prisma", category: "ORM", color: "#2D3748" },
];

export function ServicesTech() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (!techRef.current) return;
    const items = techRef.current.querySelectorAll(".tech-item");
    gsap.fromTo(items, { scale: 0.8, opacity: 0 }, {
      scale: 1, opacity: 1, duration: 0.5, stagger: 0.05, ease: "back.out(1.5)",
      scrollTrigger: { trigger: techRef.current, start: "top 80%", toggleActions: "play none none reverse" },
    });
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#050816] py-20">
      <div className="absolute inset-0 bg-[radial-gradient(600px_circle_at_80%_80%,rgba(139,92,246,0.08),transparent_50%)]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
            <span className="h-2 w-2 rounded-full bg-[#38BDF8] shadow-[0_0_18px_rgba(56,189,248,0.6)]" />
            Technology stack
          </div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            <span className="text-white">Premium </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#8B5CF6]">Tech Stack</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base text-white/60">
            We leverage cutting-edge technologies to build fast, scalable, and visually stunning digital experiences.
          </p>
        </div>
        <div ref={techRef} className="flex flex-wrap justify-center gap-4">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="tech-item group relative rounded-2xl border border-white/10 bg-white/5 px-5 py-3 transition-all duration-300 hover:border-white/20 hover:bg-white/10"
            >
              <div className="flex items-center gap-3">
                <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: tech.color, boxShadow: `0 0 12px ${tech.color}80` }} />
                <span className="text-sm font-medium text-white">{tech.name}</span>
                <span className="text-xs text-white/40">{tech.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
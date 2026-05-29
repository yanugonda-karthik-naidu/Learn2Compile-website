"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "@/lib/gsap/config";

// Register plugin only on client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type FaqItem = { q: string; a: string };
type Category = {
  id: string;
  label: string;
  icon: React.ReactNode;
  items: FaqItem[];
};

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  process: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  ),
  pricing: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  technology: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  seo: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  mobile: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
  support: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  maintenance: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  hosting: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
    </svg>
  ),
  custom: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
    </svg>
  ),
};

const FAQ_DATA: Category[] = [
  {
    id: "process",
    label: "Process",
    icon: CATEGORY_ICONS["process"],
    items: [
      { q: "What timeline should I expect for my project?", a: "Most projects ship in 2–6 weeks depending on scope, animations, and integrations. A typical business website lands around 3–4 weeks, while a full cinematic platform may extend to 5–6 weeks." },
      { q: "What happens during the discovery call?", a: "We start with a 30-minute call to understand your brand, goals, and technical needs. From there we scope the project, confirm milestones, and lock in the timeline before any work begins." },
      { q: "How do milestones and revisions work?", a: "Each project is split into defined phases—design, development, testing, launch. Within each phase you receive a set number of revisions at designated checkpoints, so feedback stays structured and efficient." },
      { q: "What is the typical project flow?", a: "Discovery → Proposal → Design System → Development → Testing → Launch. Every phase has clear deliverables and sign-offs, so nothing moves forward without your approval." },
    ],
  },
  {
    id: "pricing",
    label: "Pricing",
    icon: CATEGORY_ICONS["pricing"],
    items: [
      { q: "How does your pricing work?", a: "We offer fixed packages for standard builds, plus a live estimate tool for custom scope. Final pricing is confirmed after the discovery call, ensuring you only pay for what you actually need." },
      { q: "Are there payment terms?", a: "Standard structure is 50% upfront, 50% on launch. For larger projects we can split into three milestone payments. All terms are discussed and agreed before work begins." },
      { q: "Do you offer custom quotes beyond packages?", a: "Yes. Our configurator gives a live estimate for custom features. If your project has unique requirements, we scope it individually during the discovery call and provide a transparent fixed-price proposal." },
      { q: "What's included in every package?", a: "Premium design, responsive build, semantic HTML, SEO foundations, performance optimization, and post-launch support. No hidden fees—everything explicitly listed before you commit." },
    ],
  },
  {
    id: "technology",
    label: "Technology",
    icon: CATEGORY_ICONS["technology"],
    items: [
      { q: "What technology stack do you use?", a: "Next.js for the framework, GSAP for motion choreography, React Three Fiber for 3D elements, and Tailwind CSS for styling. We choose the best tool per project, never the trendiest one." },
      { q: "Why Next.js over other frameworks?", a: "Next.js gives us server-side rendering for SEO, file-based routing, image optimization, and a production-grade developer experience. It aligns with how modern digital studios build scalable, fast websites." },
      { q: "Can you work with existing codebases?", a: "Yes. We can extend, refactor, or rebuild existing Next.js projects. If you have an older codebase that needs modernizing, we can assess and advise on the best path forward." },
    ],
  },
  {
    id: "seo",
    label: "SEO",
    icon: CATEGORY_ICONS["seo"],
    items: [
      { q: "Is every build SEO-ready?", a: "Every project includes semantic HTML, structured metadata, Open Graph tags, clean URLs, and performance-first implementation. We build for discovery from day one, not as an afterthought." },
      { q: "How do you handle content and metadata?", a: "We implement per-page metadata, descriptive alt tags, structured heading hierarchy, and JSON-LD schema where relevant. Content itself is your domain—but we provide the architecture." },
      { q: "Do you guarantee PageSpeed scores?", a: "We engineer for performance—lazy loading, image optimization, minimal JS, CSS containment. While exact scores depend on content volume and third-party scripts, our builds consistently hit 85+ on Lighthouse." },
      { q: "What about accessibility?", a: "All builds follow WCAG 2.1 guidelines with proper contrast ratios, keyboard navigability, screen reader labels, and semantic landmarks. Accessibility is baked in, not patched on." },
    ],
  },
  {
    id: "mobile",
    label: "Mobile",
    icon: CATEGORY_ICONS["mobile"],
    items: [
      { q: "Is mobile optimization included?", a: "Absolutely. Every build is touch-first by design—simplified 3D on mobile, responsive typography, optimized tap targets, and layouts that adapt cleanly from 375px to 4K." },
      { q: "How do you handle Android performance?", a: "We test across Android devices throughout development. 3D elements degrade gracefully on mobile, animations are reduced, and touch interactions are tuned for real-world Android browsers." },
      { q: "What about mobile-first SEO?", a: "Google's indexing is mobile-first. We ensure responsive layouts, viewport configuration, and fast mobile load times so your mobile experience directly supports your search ranking." },
    ],
  },
  {
    id: "support",
    label: "Support",
    icon: CATEGORY_ICONS["support"],
    items: [
      { q: "What support do you provide after launch?", a: "Post-launch support includes security updates, performance monitoring, bug fixes, and fast response times. We treat post-launch as part of the process, not an afterthought." },
      { q: "What are your response times?", a: "For critical issues: within 4 hours. For general queries: within 24 hours. Our support availability is 24/7 for active projects, ensuring your digital presence stays protected." },
      { q: "Do you offer dedicated support plans?", a: "Yes. We offer monthly retainers for ongoing needs—feature additions, redesigns, content updates, and priority support. These are scoped based on your expected monthly volume." },
    ],
  },
  {
    id: "maintenance",
    label: "Maintenance",
    icon: CATEGORY_ICONS["maintenance"],
    items: [
      { q: "What ongoing maintenance is needed?", a: "Domains need annual renewals, hosting needs occasional tuning, and CMS platforms need updates. We handle all of this through our maintenance plans so you never touch a server." },
      { q: "Are security updates included?", a: "Yes. We monitor for vulnerabilities, apply patches, and ensure your build stays hardened. Security isn't a one-time setup—it's an ongoing practice we maintain for all active sites." },
      { q: "Can I make content changes myself?", a: "Depending on the build, we can integrate a CMS or leave the codebase structured for your team to edit. We always document what needs developer access versus what you can manage independently." },
    ],
  },
  {
    id: "hosting",
    label: "Hosting",
    icon: CATEGORY_ICONS["hosting"],
    items: [
      { q: "Do you provide hosting?", a: "We offer full hosting setup and deployment pipelines. For most projects we recommend Vercel or Netlify for their CDN performance and seamless Next.js integration. Managed hosting is available for enterprise needs." },
      { q: "What does deployment guidance include?", a: "We set up your hosting account, configure CI/CD pipelines, connect your domain, and ensure everything runs autonomously after launch. You get a clean, repeatable deployment process." },
      { q: "Can you manage my existing hosting?", a: "Yes. If you already have hosting infrastructure, we can assess it and either work within your existing setup or migrate you to a better-performing configuration." },
    ],
  },
  {
    id: "custom",
    label: "Custom Features",
    icon: CATEGORY_ICONS["custom"],
    items: [
      { q: "Can you build custom features?", a: "Yes. Forms, dashboards, booking systems, member areas, API integrations—we handle bespoke functionality scoped to your exact requirements during the discovery phase." },
      { q: "What integrations do you support?", a: "Resend for email, Supabase for databases, Stripe for payments, WhatsApp API for messaging, Google Maps for location, and custom REST or GraphQL APIs. If it has an API, we can connect it." },
      { q: "Can you build a full web app, not just a website?", a: "Absolutely. We've built dashboards, admin panels, client portals, and booking systems. Full web applications with authentication, database-driven content, and role-based access are well within scope." },
      { q: "Do you build e-commerce functionality?", a: "Yes. Product catalogs, shopping carts, Stripe/checkout integration, order management, and custom e-commerce flows. We can build anything from a simple store to a full multi-product experience." },
    ],
  },
];

function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;
  const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="rounded-sm bg-[#38BDF8]/30 text-white">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}

function FaqCategoryTabs({
  categories,
  activeCategory,
  onSelect,
}: {
  categories: Category[];
  activeCategory: string;
  onSelect: (id: string) => void;
}) {
  const indicatorRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!tabsRef.current || !indicatorRef.current) return;
    const activeTab = tabsRef.current.querySelector<HTMLButtonElement>(`[data-category="${activeCategory}"]`);
    if (!activeTab) return;
    gsap.to(indicatorRef.current, {
      x: activeTab.offsetLeft,
      width: activeTab.offsetWidth,
      duration: motion.hover.duration.normal,
      ease: motion.hover.ease,
    });
  }, [activeCategory]);

  return (
    <div ref={tabsRef} className="relative flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-white/5 p-1.5">
      {categories.map((cat) => (
        <button
          key={cat.id}
          data-category={cat.id}
          onClick={() => onSelect(cat.id)}
          className={`relative flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium transition-all duration-200 ${
            activeCategory === cat.id
              ? "bg-white/10 text-white"
              : "text-white/60 hover:text-white"
          }`}
        >
          <span className={`${activeCategory === cat.id ? "text-[#38BDF8]" : "text-white/40"}`}>
            {cat.icon}
          </span>
          {cat.label}
        </button>
      ))}
      <div
        ref={indicatorRef}
        className="pointer-events-none absolute bottom-1 left-0 top-1 rounded-xl bg-white/10"
        style={{ height: "calc(100% - 8px)" }}
      />
    </div>
  );
}

function FaqItem({
  item,
  isOpen,
  onToggle,
  query,
  index,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
  query: string;
  index: number;
}) {
  const answerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);

  // Cinematic accordion animation with personality
  useEffect(() => {
    if (!answerRef.current || !contentRef.current) return;

    if (isOpen) {
      const h = answerRef.current.scrollHeight;
      const tl = gsap.timeline();

      // Anticipation - subtle scale
      tl.to(itemRef.current, {
        scale: 1.005,
        duration: 0.08,
        ease: "power2.in",
      })
        .to(
          contentRef.current,
          {
            height: h,
            duration: motion.expand.duration,
            ease: motion.expand.ease,
          },
          0.04
        )
        .to(
          contentRef.current.querySelector("p"),
          {
            opacity: 1,
            y: 0,
            duration: motion.expand.contentFade.duration,
            ease: "power2.out",
          },
          0.15
        );
    } else {
      const tl = gsap.timeline();

      // Smooth collapse with content fade first
      tl.to(contentRef.current.querySelector("p"), {
        opacity: 0,
        y: 6,
        duration: 0.18,
        ease: "power2.in",
      })
        .to(
          contentRef.current,
          {
            height: 0,
            duration: motion.expand.duration * 0.85,
            ease: motion.expand.ease,
          },
          0.08
        )
        .to(
          itemRef.current,
          {
            scale: 1,
            duration: 0.15,
            ease: "power2.out",
          },
          0.05
        );
    }
  }, [isOpen]);

  return (
    <div
      ref={itemRef}
      className="overflow-hidden rounded-2xl border border-white/10 bg-[#050816]/40 transition-all duration-300 hover:border-white/20"
      data-stagger-item
      style={{ transformOrigin: "top center" }}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 p-5 text-left transition-all duration-200"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-medium text-white leading-snug pr-2">
          {highlightMatch(item.q, query)}
        </span>
        <span
          className={`relative h-5 w-5 shrink-0 text-white/50 transition-all duration-300 ${
            isOpen ? "rotate-45 scale-110" : "rotate-0"
          }`}
        >
          <svg
            className="absolute inset-0 h-full w-full"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </span>
      </button>

      <div ref={contentRef} className="overflow-hidden" style={{ height: 0 }}>
        <div ref={answerRef} className="px-5 pb-5">
          <p className="text-sm leading-relaxed text-white/70">{highlightMatch(item.a, query)}</p>
        </div>
      </div>
    </div>
  );
}

interface FaqSectionProps {
  searchQuery?: string;
}

export function FaqSection({ searchQuery = "" }: FaqSectionProps) {
  const [activeCategory, setActiveCategory] = useState(FAQ_DATA[0].id);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return FAQ_DATA;
    const q = searchQuery.toLowerCase();
    return FAQ_DATA.map((cat) => ({
      ...cat,
      items: cat.items.filter(
        (it) =>
          it.q.toLowerCase().includes(q) || it.a.toLowerCase().includes(q)
      ),
    })).filter((cat) => cat.items.length > 0);
  }, [searchQuery]);

  const activeData = useMemo(
    () => filteredData.find((c) => c.id === activeCategory) ?? filteredData[0],
    [filteredData, activeCategory]
  );

  const handleCategorySelect = useCallback((id: string) => {
    setActiveCategory(id);
    setOpenIndex(null);
  }, []);

  useEffect(() => {
    if (!listRef.current || filteredData.length === 0) return;
    const items = listRef.current.querySelectorAll<HTMLElement>("[data-stagger-item]");
    if (items.length === 0) return;
    gsap.fromTo(
      items,
      { opacity: 0, y: motion.reveal.y.subtle, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: motion.reveal.duration.fast,
        ease: "power3.out",
        stagger: motion.reveal.stagger.fast,
      }
    );
  }, [activeCategory, searchQuery]);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          const tabs = sectionRef.current?.querySelector("[data-faq-header]");
          if (tabs) {
            gsap.fromTo(tabs, { opacity: 0, y: motion.reveal.y.normal }, { opacity: 1, y: 0, duration: motion.reveal.duration.normal, ease: "power3.out" });
          }
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const hasResults = filteredData.length > 0;

  return (
    <section ref={sectionRef} className="relative bg-[#050816] py-20" data-section="faq">
      <div className="mx-auto max-w-6xl px-6">
        <div data-faq-header className="mb-10 opacity-0">
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
                <span className="h-2 w-2 rounded-full bg-[#38BDF8] shadow-[0_0_18px_rgba(56,189,248,0.6)]" />
                Browse by topic
              </div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Find your answer
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-white/70">
              Structured answers across every dimension of your project—from first enquiry to post-launch support.
            </p>
          </div>
        </div>

        <FaqCategoryTabs
          categories={FAQ_DATA}
          activeCategory={activeCategory}
          onSelect={handleCategorySelect}
        />

        <div ref={listRef} className="mt-8 space-y-2">
          {!hasResults ? (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-12 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/5">
                <svg className="h-6 w-6 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-sm font-medium text-white/80">No results found</p>
              <p className="mt-1 text-xs text-white/50">
                Contact us directly and we will answer personally.
              </p>
              <a
                href="/contact"
                className="mt-4 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70 transition hover:border-white/20 hover:text-white"
              >
                Get in touch
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          ) : (
            activeData.items.map((item, idx) => (
              <FaqItem
                key={item.q}
                item={item}
                isOpen={openIndex === idx}
                onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
                query={searchQuery}
                index={idx}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
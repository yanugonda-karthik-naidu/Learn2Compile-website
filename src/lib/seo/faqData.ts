/**
 * Learn2Compile FAQ Data
 * Centralized FAQ content for both UI and JSON-LD schema
 */

export type FaqItem = { q: string; a: string };
export type Category = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  items: FaqItem[];
};

export const FAQ_CATEGORIES: Category[] = [
  {
    id: "process",
    label: "Process",
    items: [
      {
        q: "What timeline should I expect for my project?",
        a: "Most projects ship in 2–6 weeks depending on scope, animations, and integrations. A typical business website lands around 3–4 weeks, while a full cinematic platform may extend to 5–6 weeks.",
      },
      {
        q: "What happens during the discovery call?",
        a: "We start with a 30-minute call to understand your brand, goals, and technical needs. From there we scope the project, confirm milestones, and lock in the timeline before any work begins.",
      },
      {
        q: "How do milestones and revisions work?",
        a: "Each project is split into defined phases—design, development, testing, launch. Within each phase you receive a set number of revisions at designated checkpoints, so feedback stays structured and efficient.",
      },
      {
        q: "What is the typical project flow?",
        a: "Discovery → Proposal → Design System → Development → Testing → Launch. Every phase has clear deliverables and sign-offs, so nothing moves forward without your approval.",
      },
    ],
  },
  {
    id: "pricing",
    label: "Pricing",
    items: [
      {
        q: "How does your pricing work?",
        a: "We offer fixed packages for standard builds, plus a live estimate tool for custom scope. Final pricing is confirmed after the discovery call, ensuring you only pay for what you actually need.",
      },
      {
        q: "Are there payment terms?",
        a: "Standard structure is 50% upfront, 50% on launch. For larger projects we can split into three milestone payments. All terms are discussed and agreed before work begins.",
      },
      {
        q: "Do you offer custom quotes beyond packages?",
        a: "Yes. Our configurator gives a live estimate for custom features. If your project has unique requirements, we scope it individually during the discovery call and provide a transparent fixed-price proposal.",
      },
      {
        q: "What's included in every package?",
        a: "Premium design, responsive build, semantic HTML, SEO foundations, performance optimization, and post-launch support. No hidden fees—everything explicitly listed before you commit.",
      },
    ],
  },
  {
    id: "technology",
    label: "Technology",
    items: [
      {
        q: "What technology stack do you use?",
        a: "Next.js for the framework, GSAP for motion choreography, React Three Fiber for 3D elements, and Tailwind CSS for styling. We choose the best tool per project, never the trendiest one.",
      },
      {
        q: "Why Next.js over other frameworks?",
        a: "Next.js gives us server-side rendering for SEO, file-based routing, image optimization, and a production-grade developer experience. It aligns with how modern digital studios build scalable, fast websites.",
      },
      {
        q: "Can you work with existing codebases?",
        a: "Yes. We can extend, refactor, or rebuild existing Next.js projects. If you have an older codebase that needs modernizing, we can assess and advise on the best path forward.",
      },
    ],
  },
  {
    id: "seo",
    label: "SEO",
    items: [
      {
        q: "Is every build SEO-ready?",
        a: "Every project includes semantic HTML, structured metadata, Open Graph tags, clean URLs, and performance-first implementation. We build for discovery from day one, not as an afterthought.",
      },
      {
        q: "How do you handle content and metadata?",
        a: "We implement per-page metadata, descriptive alt tags, structured heading hierarchy, and JSON-LD schema where relevant. Content itself is your domain—but we provide the architecture.",
      },
      {
        q: "Do you guarantee PageSpeed scores?",
        a: "We engineer for performance—lazy loading, image optimization, minimal JS, CSS containment. While exact scores depend on content volume and third-party scripts, our builds consistently hit 85+ on Lighthouse.",
      },
      {
        q: "What about accessibility?",
        a: "All builds follow WCAG 2.1 guidelines with proper contrast ratios, keyboard navigability, screen reader labels, and semantic landmarks. Accessibility is baked in, not patched on.",
      },
    ],
  },
  {
    id: "mobile",
    label: "Mobile",
    items: [
      {
        q: "Is mobile optimization included?",
        a: "Absolutely. Every build is touch-first by design—simplified 3D on mobile, responsive typography, optimized tap targets, and layouts that adapt cleanly from 375px to 4K.",
      },
      {
        q: "How do you handle Android performance?",
        a: "We test across Android devices throughout development. 3D elements degrade gracefully on mobile, animations are reduced, and touch interactions are tuned for real-world Android browsers.",
      },
      {
        q: "What about mobile-first SEO?",
        a: "Google's indexing is mobile-first. We ensure responsive layouts, viewport configuration, and fast mobile load times so your mobile experience directly supports your search ranking.",
      },
    ],
  },
  {
    id: "support",
    label: "Support",
    items: [
      {
        q: "What support do you provide after launch?",
        a: "Post-launch support includes security updates, performance monitoring, bug fixes, and fast response times. We treat post-launch as part of the process, not an afterthought.",
      },
      {
        q: "What are your response times?",
        a: "For critical issues: within 4 hours. For general queries: within 24 hours. Our support availability is 24/7 for active projects, ensuring your digital presence stays protected.",
      },
      {
        q: "Do you offer dedicated support plans?",
        a: "Yes. We offer monthly retainers for ongoing needs—feature additions, redesigns, content updates, and priority support. These are scoped based on your expected monthly volume.",
      },
    ],
  },
  {
    id: "maintenance",
    label: "Maintenance",
    items: [
      {
        q: "What ongoing maintenance is needed?",
        a: "Domains need annual renewals, hosting needs occasional tuning, and CMS platforms need updates. We handle all of this through our maintenance plans so you never touch a server.",
      },
      {
        q: "Are security updates included?",
        a: "Yes. We monitor for vulnerabilities, apply patches, and ensure your build stays hardened. Security isn't a one-time setup—it's an ongoing practice we maintain for all active sites.",
      },
      {
        q: "Can I make content changes myself?",
        a: "Depending on the build, we can integrate a CMS or leave the codebase structured for your team to edit. We always document what needs developer access versus what you can manage independently.",
      },
    ],
  },
  {
    id: "hosting",
    label: "Hosting",
    items: [
      {
        q: "Do you provide hosting?",
        a: "We offer full hosting setup and deployment pipelines. For most projects we recommend Vercel or Netlify for their CDN performance and seamless Next.js integration. Managed hosting is available for enterprise needs.",
      },
      {
        q: "What does deployment guidance include?",
        a: "We set up your hosting account, configure CI/CD pipelines, connect your domain, and ensure everything runs autonomously after launch. You get a clean, repeatable deployment process.",
      },
      {
        q: "Can you manage my existing hosting?",
        a: "Yes. If you already have hosting infrastructure, we can assess it and either work within your existing setup or migrate you to a better-performing configuration.",
      },
    ],
  },
  {
    id: "custom",
    label: "Custom Features",
    items: [
      {
        q: "Can you build custom features?",
        a: "Yes. Forms, dashboards, booking systems, member areas, API integrations—we handle bespoke functionality scoped to your exact requirements during the discovery phase.",
      },
      {
        q: "What integrations do you support?",
        a: "Resend for email, Supabase for databases, Stripe for payments, WhatsApp API for messaging, Google Maps for location, and custom REST or GraphQL APIs. If it has an API, we can connect it.",
      },
      {
        q: "Can you build a full web app, not just a website?",
        a: "Absolutely. We've built dashboards, admin panels, client portals, and booking systems. Full web applications with authentication, database-driven content, and role-based access are well within scope.",
      },
      {
        q: "Do you build e-commerce functionality?",
        a: "Yes. Product catalogs, shopping carts, Stripe/checkout integration, order management, and custom e-commerce flows. We can build anything from a simple store to a full multi-product experience.",
      },
    ],
  },
];

/**
 * Flatten all FAQ items for schema generation
 */
export function getAllFaqItems(): { question: string; answer: string }[] {
  return FAQ_CATEGORIES.flatMap((category) =>
    category.items.map((item) => ({ question: item.q, answer: item.a }))
  );
}

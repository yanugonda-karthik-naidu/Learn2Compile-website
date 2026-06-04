"use client";

import { useMemo } from "react";

// Seeded random for consistent particle positions (rounded to avoid hydration mismatches)
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return Number((x - Math.floor(x)).toFixed(4));
}

type Testimonial = {
  name: string;
  role: string;
  category: string;
  categoryBadge: string;
  review: string;
  metrics: string[];
};

const testimonials: Testimonial[] = [
  {
    name: "Rahul Sharma",
    role: "Wedding Planner",
    category: "Wedding Planner Website",
    categoryBadge: "Wedding",
    review:
      "Our wedding planning business went digital beautifully. The website attracts more couples every month and our bookings have doubled since launch.",
    metrics: ["+40% Leads", "SEO Ready", "Mobile Optimized"],
  },
  {
    name: "Priya Reddy",
    role: "Restaurant Owner",
    category: "Restaurant Website",
    categoryBadge: "Restaurant",
    review:
      "The food delivery integration and elegant menu showcase increased our online orders significantly. Perfect for our modern dining experience.",
    metrics: ["+60% Orders", "Fast Loading", "GPS Enabled"],
  },
  {
    name: "Arjun Verma",
    role: "Coaching Institute",
    category: "Coaching Institute Website",
    categoryBadge: "Education",
    review:
      "Students can now enroll online and access resources easily. The professional design has helped us attract better-quality inquiries.",
    metrics: ["+85% Enrollments", "Secure Portal", "Multi-Page"],
  },
  {
    name: "Sneha Nair",
    role: "Startup Founder",
    category: "Startup Launch Website",
    categoryBadge: "Startup",
    review:
      "Launched my fintech startup with a website that investors actually love. The modern design and smooth animations conveyed credibility instantly.",
    metrics: ["Investor Ready", "Lead Gen", "Analytics"],
  },
  {
    name: "Karthik Rao",
    role: "Photography Studio",
    category: "Photography Studio Website",
    categoryBadge: "Portfolio",
    review:
      "My portfolio finally looks as good as my photos. The gallery performance is incredible even with high-res images. Client inquiries tripled.",
    metrics: ["4K Gallery", "SEO Ready", "Social Links"],
  },
  {
    name: "Meera Patel",
    role: "Fashion Boutique",
    category: "Fashion Store Website",
    categoryBadge: "E-Commerce",
    review:
      "The website brought my boutique online without losing the premium feel. Mobile customers love the smooth browsing experience.",
    metrics: ["+50% Sales", "Cart System", "Inventory Sync"],
  },
  {
    name: "Vikram Singh",
    role: "Real Estate Agency",
    category: "Real Estate Website",
    categoryBadge: "Real Estate",
    review:
      "Property listings with virtual tours changed how clients view homes. Lead quality improved dramatically with our new digital presence.",
    metrics: ["Virtual Tours", "Map Search", "Inquiry Forms"],
  },
  {
    name: "Ananya Gupta",
    role: "Fitness Coach",
    category: "Fitness Coaching Website",
    categoryBadge: "Health",
    review:
      "Online trial requests and class bookings work seamlessly. The energetic design matches our brand perfectly and attracts serious clients.",
    metrics: ["Booking System", "+70% Trials", "Video Background"],
  },
];

function StarRating() {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <span key={i} className="text-lg text-[#38BDF8]">
          ★
        </span>
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article
      className="group relative flex h-[260px] w-[320px] sm:w-[350px] md:w-[380px] shrink-0 flex-col rounded-[24px] sm:rounded-[28px] md:rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-5 sm:p-5 md:p-6 shadow-[0_0_60px_rgba(56,189,248,0.08)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-white/20 hover:shadow-[0_0_80px_rgba(139,92,246,0.15),0_0_120px_rgba(56,189,248,0.1)]"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <StarRating />
          <h3 className="mt-3 text-base font-semibold text-white">{testimonial.name}</h3>
          <p className="text-sm text-white/60">{testimonial.role}</p>
        </div>
        <span className="inline-flex items-center rounded-full border border-[#A855F7]/30 bg-[#A855F7]/10 px-3 py-1 text-xs font-medium text-[#A855F7] backdrop-blur-sm">
          {testimonial.categoryBadge}
        </span>
      </div>

      {/* Category */}
      <p className="mt-3 text-xs uppercase tracking-[0.2em] text-white/40">
        {testimonial.category}
      </p>

      {/* Review */}
      <p className="mt-3 flex-1 text-sm sm:text-sm leading-5 text-white/70 line-clamp-3 sm:line-clamp-4">
        &quot;{testimonial.review}&quot;
      </p>

      {/* Metrics */}
      <div className="mt-4 flex items-center gap-2">
        {testimonial.metrics.map((metric, i) => (
          <span
            key={i}
            className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/60 backdrop-blur-sm"
          >
            {metric}
          </span>
        ))}
      </div>
    </article>
  );
}

function Marquee({
  children,
  direction = "left",
  duration = 40,
}: {
  children: React.ReactNode;
  direction?: "left" | "right";
  duration?: number;
}) {
  return (
    <div className="relative overflow-hidden">
      <div
        className="flex"
        style={{
          animation: `marquee-${direction} ${duration}s linear infinite`,
        }}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0">{children}</div>
      </div>
    </div>
  );
}

function TrustBar() {
  const items = [
    { label: "5.0 Average Rating", icon: "★" },
    { label: "10+ Projects Delivered", icon: "✓" },
    { label: "98% Client Satisfaction", icon: "♡" },
    { label: "24/7 Support", icon: "◈" },
  ];

  return (
    <div className="mt-16 flex flex-wrap items-center justify-center gap-4">
      {items.map((item, i) => (
        <div
          key={i}
          className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] px-5 py-3 backdrop-blur-xl"
        >
          <span className="text-lg text-[#38BDF8]">{item.icon}</span>
          <span className="text-sm font-medium text-white/80">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  // Pre-generate particle positions to avoid Math.random during render
  const particlePositions = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      left: `${seededRandom(i * 4 + 1) * 100}%`,
      top: `${seededRandom(i * 4 + 2) * 100}%`,
      animation: `float ${5 + seededRandom(i * 4 + 3) * 10}s ease-in-out infinite`,
      animationDelay: `${seededRandom(i * 4 + 4) * 5}s`,
    }));
  }, []);

  return (
    <section className="relative overflow-x-hidden bg-[#050816] py-16 sm:py-20 md:py-24">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        {/* Blue glow */}
        <div className="absolute left-1/4 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#38BDF8]/10 blur-[120px]" />
        {/* Purple glow */}
        <div className="absolute right-1/4 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#A855F7]/10 blur-[120px]" />
        {/* Subtle particles */}
        <div className="absolute inset-0 opacity-30">
          {particlePositions.map((pos, i) => (
            <div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-white/20"
              style={pos}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/80 backdrop-blur-xl">
            <span className="h-2 w-2 rounded-full bg-[#38BDF8] shadow-[0_0_18px_rgba(56,189,248,0.6)]" />
            Client Success Stories
          </div>
          <h2 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
            <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
              Trusted By Businesses
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#38BDF8] to-[#A855F7] bg-clip-text text-transparent">
              That Wanted To Stand Out
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/60">
            From wedding planners and restaurants to startups and coaching institutes, our
            websites help businesses build trust, generate leads, and grow online.
          </p>
        </div>

        {/* Marquee Row 1 - Left */}
        <div className="relative -mx-4 sm:-mx-6 mb-4 overflow-x-hidden">
          <div className="absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-[#050816] to-transparent" />
          <div className="absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-[#050816] to-transparent" />
          <Marquee direction="left" duration={40}>
            {testimonials.map((t, i) => (
              <div key={`row1-${i}`} className="px-3">
                <TestimonialCard testimonial={t} />
              </div>
            ))}
          </Marquee>
        </div>

        {/* Marquee Row 2 - Right */}
        <div className="relative -mx-4 sm:-mx-6 overflow-x-hidden">
          <div className="absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-[#050816] to-transparent" />
          <div className="absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-[#050816] to-transparent" />
          <Marquee direction="right" duration={40}>
            {[...testimonials].reverse().map((t, i) => (
              <div key={`row2-${i}`} className="px-3">
                <TestimonialCard testimonial={t} />
              </div>
            ))}
          </Marquee>
        </div>

        {/* Trust Bar */}
        <TrustBar />
      </div>
    </section>
  );
}

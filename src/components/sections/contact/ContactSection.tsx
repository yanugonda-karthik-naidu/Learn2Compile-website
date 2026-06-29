"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactInquirySchema,
  type ContactInquiryInput,
} from "@/lib/validation/contactSchema";
import { prefersReducedMotion } from "@/lib/gsap/reducedMotion";

function useIsClientReducedMotion() {
  const [reduced] = useState(() => prefersReducedMotion());
  return reduced;
}

const projectTypes = [
  { value: "business-website", label: "Business Website" },
  { value: "wedding-planner", label: "Wedding Planner Website" },
  { value: "restaurant", label: "Restaurant Website" },
  { value: "coaching-institute", label: "Coaching Institute Website" },
  { value: "startup-landing", label: "Startup Landing Page" },
  { value: "custom", label: "Custom Website" },
];

const budgetRanges = [
  { value: "3999-8999", label: "₹3,999 – ₹8,999" },
  { value: "8999-14999", label: "₹8,999 – ₹14,999" },
  { value: "14999-25000", label: "₹14,999 – ₹25,000" },
  { value: "25000+", label: "₹25,000+" },
  { value: "not-sure", label: "Not Sure Yet" },
];

const leadSources = [
  { value: "instagram", label: "Instagram" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "referral", label: "Referral" },
  { value: "google", label: "Google Search" },
  { value: "friend", label: "Friend" },
  { value: "other", label: "Other" },
];

const contactMethods = [
  {
    id: "whatsapp",
    icon: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.296-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    label: "Chat on WhatsApp",
    description: "Quickest way to discuss your project.",
    supportText: "Usually replies within minutes.",
    href: "https://wa.me/917793922519",
    primary: true,
  },
  {
    id: "phone",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: "Call Us",
    description: "Speak directly about your requirements.",
    supportText: "Available during business hours.",
    href: "tel:+917793922519",
    primary: false,
  },
  {
    id: "email",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: "Email Us",
    description: "Send project details and questions.",
    supportText: "Response within 24 hours.",
    href: "mailto:learn2compile@gmail.com",
    primary: false,
  },
];

const processSteps = [
  {
    step: "01",
    title: "Submit Inquiry",
    description: "Fill out the form or reach us via WhatsApp.",
  },
  {
    step: "02",
    title: "Requirement Discussion",
    description: "We discuss your needs and answer questions.",
  },
  {
    step: "03",
    title: "Proposal & Pricing",
    description: "Receive a clear proposal with transparent pricing.",
  },
  {
    step: "04",
    title: "Development Begins",
    description: "Once approved, we start building your website.",
  },
];

const trustItems = [
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Fast Response",
    description: "Quick turnaround on all inquiries.",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    title: "Transparent Communication",
    description: "No hidden fees or surprises.",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: "Mobile Responsive",
    description: "Perfect on every screen size.",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Ongoing Support",
    description: "Long-term partnership beyond launch.",
  },
];

export function ContactSection() {
  const reduced = useIsClientReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const [submitState, setSubmitState] = useState<
    | { status: "idle" }
    | { status: "loading" }
    | { status: "success" }
    | { status: "error"; message: string }
  >({ status: "idle" });

  const {
    register,
    handleSubmit,
    setValue,

    formState: { errors },
    reset,
  } = useForm<ContactInquiryInput>({
    resolver: zodResolver(contactInquirySchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      businessType: "",
      projectType: "",
      budget: "",
      leadSource: "",
      description: "",
    },
    mode: "onBlur",
  });

  // Format phone with +91 prefix for Indian numbers
  const formatPhoneNumber = (value: string): string => {
    const digits = value.replace(/\D/g, "");

    // If starts with 91 and has 12+ digits, extract last 10
    if (digits.startsWith("91") && digits.length > 10) {
      const last10 = digits.slice(-10);
      return `+91 ${last10}`;
    }

    // If starts with 6-9 and is 10 digits, add +91
    if (digits.length >= 10) {
      const last10 = digits.slice(-10);
      return `+91 ${last10}`;
    }

    // Otherwise just return cleaned value
    return digits;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setValue("phone", formatted, { shouldValidate: true });
  };

  const onSubmit = async (values: ContactInquiryInput) => {
    // Required-field guard (keeps Zod + react-hook-form validation, but ensures WhatsApp URL is never opened with blanks)
    const required = [
      { key: "name" as const, label: "Name" },
      { key: "businessType" as const, label: "Business Name" },
      { key: "phone" as const, label: "Phone" },
      { key: "email" as const, label: "Email" },
      { key: "projectType" as const, label: "Website Type" },
      { key: "budget" as const, label: "Budget Range" },
      { key: "description" as const, label: "Project Description" },
    ];

    const missing = required
      .filter(({ key }) => {
        const v = values[key];
        return v === undefined || v === null || String(v).trim().length === 0;
      })
      .map(({ label }) => label);

    if (missing.length > 0) {
      setSubmitState({
        status: "error",
        message: `Please fill in: ${missing.join(", ")}.`,
      });
      return;
    }

    setSubmitState({ status: "loading" });

    const whatsappNumber = "917793922519";
    const message = `Hello Learn2Compile,\n\nName:\n${values.name}\n\nBusiness:\n${values.businessType}\n\nPhone:\n${values.phone}\n\nEmail:\n${values.email ?? ""}\n\nWebsite Type:\n${values.projectType}\n\nBudget:\n${values.budget}\n\nProject Description:\n${values.description}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Success toast before redirecting
    setSubmitState({ status: "success" });

    window.open(whatsappUrl, "_blank");
    reset();
  };

  useEffect(() => {
    if (!sectionRef.current || reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-hero-content",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );
      gsap.fromTo(
        ".contact-method",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out", stagger: 0.1 }
      );
      gsap.fromTo(
        ".contact-form-section",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.2 }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={sectionRef} className="relative bg-[#050816] py-16 sm:py-20 md:py-24 overflow-x-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(56,189,248,0.12),transparent_50%),radial-gradient(ellipse_at_80%_70%,rgba(139,92,246,0.10),transparent_50%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div ref={heroRef} className="contact-hero-content text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs sm:text-sm text-white/80">
            <span className="h-2 w-2 rounded-full bg-[#38BDF8] shadow-[0_0_18px_rgba(56,189,248,0.6)]" />
            Get in Touch
          </div>

          <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
            <span className="text-white">Let&apos;s Build </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-[#8B5CF6] to-[#06B6D4]">
              Your Website
            </span>
          </h1>

          <p className="mt-4 max-w-xl mx-auto text-base sm:text-lg text-white/70">
            Ready to start your project? We usually respond within 24 hours.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="contact-method mb-12 sm:mb-16">
          <div className="grid gap-4 sm:grid-cols-3">
            {contactMethods.map((method) => (
              <a
                key={method.id}
                href={method.href}
                target={method.id === "whatsapp" || method.id === "email" ? "_blank" : undefined}
                rel="noopener noreferrer"
                className={`group relative flex flex-col items-center rounded-2xl border p-5 sm:p-6 text-center transition-all duration-300 ${
                  method.primary
                    ? "border-green-500/30 bg-green-500/10 hover:border-green-500/50 hover:bg-green-500/15 hover:shadow-[0_0_30px_rgba(34,197,94,0.15)]"
                    : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                }`}
              >
                <div className={`mb-3 ${method.primary ? "text-green-400" : "text-white/70 group-hover:text-white"}`}>
                  {method.icon}
                </div>
                <div className={`text-sm font-semibold ${method.primary ? "text-green-400" : "text-white"}`}>
                  {method.label}
                </div>
                <div className="mt-1 text-xs text-white/60">
                  {method.description}
                </div>
                <div className="mt-1.5 text-xs text-white/40">
                  {method.supportText}
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
          {/* Left: Form */}
          <div className="contact-form-section">
            <form
              className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="text-lg font-semibold text-white mb-6">Send Us a Message</div>

              <div className="space-y-5">
                {/* Name */}
                <label className="block">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white/80">Name</span>
                    <span className="text-xs text-[#38BDF8]">Required</span>
                  </div>
                  <input
                    {...register("name")}
                    placeholder="Your name"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white placeholder-white/40 outline-none transition focus:border-[#38BDF8]/40 focus:bg-white/[0.07] min-h-[48px]"
                  />
                  {errors.name && (
                    <div className="mt-1 text-xs text-red-400">{errors.name.message}</div>
                  )}
                </label>

                {/* Business Name */}
                <label className="block">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white/80">Business Name</span>
                    <span className="text-xs text-[#38BDF8]">Required</span>
                  </div>
                  <input
                    {...register("businessType")}
                    placeholder="Your business name"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white placeholder-white/40 outline-none transition focus:border-[#38BDF8]/40 focus:bg-white/[0.07] min-h-[48px]"
                  />
                  {errors.businessType && (
                    <div className="mt-1 text-xs text-red-400">{errors.businessType.message}</div>
                  )}
                </label>

                {/* Phone & Email Row */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-white/80">Phone</span>
                      <span className="text-xs text-[#38BDF8]">Required</span>
                    </div>
                    <input
                      {...register("phone")}
                      type="tel"
                      placeholder="+91 98xxxxxx10"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white placeholder-white/40 outline-none transition focus:border-[#38BDF8]/40 focus:bg-white/[0.07] min-h-[48px]"
                      onChange={handlePhoneChange}
                    />
                    {errors.phone && (
                      <div className="mt-1 text-xs text-red-400">{errors.phone.message}</div>
                    )}
                  </label>

                  <label className="block">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-white/80">Email</span>
                      <span className="text-xs text-[#38BDF8]">Required</span>
                    </div>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="you@company.com"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white placeholder-white/40 outline-none transition focus:border-[#38BDF8]/40 focus:bg-white/[0.07] min-h-[48px]"
                    />
                    {errors.email && (
                      <div className="mt-1 text-xs text-red-400">{errors.email.message}</div>
                    )}
                  </label>
                </div>

                {/* Project Type */}
                <label className="block">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white/80">Website Type Needed</span>
                    <span className="text-xs text-[#38BDF8]">Required</span>
                  </div>
                  <select
                    {...register("projectType")}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white outline-none transition focus:border-[#38BDF8]/40 focus:bg-white/[0.07] min-h-[48px] [&>option]:bg-[#050816]"
                  >
                    <option value="">Select website type...</option>
                    {projectTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                  {errors.projectType && (
                    <div className="mt-1 text-xs text-red-400">{errors.projectType.message}</div>
                  )}
                </label>

                {/* Budget Range */}
                <label className="block">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white/80">Budget Range</span>
                    <span className="text-xs text-[#38BDF8]">Required</span>
                  </div>
                  <select
                    {...register("budget")}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white outline-none transition focus:border-[#38BDF8]/40 focus:bg-white/[0.07] min-h-[48px] [&>option]:bg-[#050816]"
                  >
                    <option value="">Select budget range...</option>
                    {budgetRanges.map((range) => (
                      <option key={range.value} value={range.value}>
                        {range.label}
                      </option>
                    ))}
                  </select>
                  {errors.budget && (
                    <div className="mt-1 text-xs text-red-400">{errors.budget.message}</div>
                  )}
                </label>

                {/* Lead Source */}
                <label className="block">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white/80">How did you hear about us?</span>
                    <span className="text-xs text-white/40">Optional</span>
                  </div>
                  <select
                    {...register("leadSource")}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white outline-none transition focus:border-[#38BDF8]/40 focus:bg-white/[0.07] min-h-[48px] [&>option]:bg-[#050816]"
                  >
                    <option value="">Select an option...</option>
                    {leadSources.map((source) => (
                      <option key={source.value} value={source.value}>
                        {source.label}
                      </option>
                    ))}
                  </select>
                </label>

                {/* Project Description */}
                <label className="block">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white/80">Project Description</span>
                    <span className="text-xs text-[#38BDF8]">Required</span>
                  </div>
                  <textarea
                    {...register("description")}
                    placeholder="Tell us about your project, goals, and any specific requirements..."
                    rows={4}
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white placeholder-white/40 outline-none transition focus:border-[#38BDF8]/40 focus:bg-white/[0.07] min-h-[48px]"
                  />
                  {errors.description && (
                    <div className="mt-1 text-xs text-red-400">{errors.description.message}</div>
                  )}
                </label>
              </div>

              {/* Error Message */}
              {submitState.status === "error" && (
                <div className="mt-4 rounded-xl border border-red-400/20 bg-red-500/10 p-3 text-sm text-red-200">
                  {submitState.message}
                </div>
              )}

              {/* Success Message */}
              {submitState.status === "success" && (
                <div className="mt-4 rounded-xl border border-green-400/20 bg-green-500/10 p-3 text-sm text-green-200 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Preparing your project inquiry...
                  </div>
                  <div className="text-green-300/70">Opening WhatsApp securely...</div>
                </div>
              )}

              {/* Submit Button */}
              <div className="mt-6">
                <button
                  type="submit"
                  disabled={submitState.status === "loading"}
                  className="w-full rounded-xl bg-gradient-to-r from-[#38BDF8]/30 via-[#8B5CF6]/30 to-[#06B6D4]/30 px-6 py-3.5 text-sm font-medium text-white shadow-[0_0_30px_rgba(56,189,248,0.15)] transition-all duration-300 hover:from-[#38BDF8]/45 hover:via-[#8B5CF6]/45 hover:to-[#06B6D4]/45 disabled:opacity-60"
                >
                  {submitState.status === "loading" ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>

          {/* Right: What Happens Next + Trust Section */}
          <div className="space-y-8">
            {/* What Happens Next */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
              <div className="text-lg font-semibold text-white mb-6">What Happens Next</div>

              <div className="space-y-4">
                {processSteps.map((item, index) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#38BDF8]/30 bg-[#38BDF8]/10 text-sm font-semibold text-[#38BDF8]">
                        {item.step}
                      </div>
                      {index < processSteps.length - 1 && (
                        <div className="mt-2 h-8 w-px bg-gradient-to-b from-[#38BDF8]/30 to-transparent" />
                      )}
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="text-sm font-semibold text-white">{item.title}</div>
                      <div className="mt-0.5 text-xs text-white/60">{item.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Section */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
              <div className="text-lg font-semibold text-white mb-6">Why Choose Us</div>

              <div className="grid gap-4 sm:grid-cols-2">
                {trustItems.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4"
                  >
                    <div className="text-[#38BDF8]">{item.icon}</div>
                    <div>
                      <div className="text-sm font-semibold text-white">{item.title}</div>
                      <div className="mt-0.5 text-xs text-white/60">{item.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
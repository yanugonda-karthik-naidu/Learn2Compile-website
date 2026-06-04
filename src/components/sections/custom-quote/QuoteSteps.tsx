"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactInquirySchema,
  type ContactInquiryInput,
} from "@/lib/validation/contactSchema";

type InquiryStep = "contact" | "project" | "budget" | "submit";

const STEPS = [
  { id: "contact" as const, number: "01", title: "Contact", subtitle: "Who should we reach?" },
  { id: "project" as const, number: "02", title: "Project", subtitle: "Tell us about your website" },
  { id: "budget" as const, number: "03", title: "Budget", subtitle: "Timeline & investment" },
  { id: "submit" as const, number: "04", title: "Submit", subtitle: "Review & send inquiry" },
];

function buildWhatsAppMessage(values: Partial<ContactInquiryInput>) {
  const lines = [
    "Hi Learn2Compile 👋",
    "I'd like a premium digital consultation.",
    "",
    "--- Contact Information ---",
    values.name ? `Name: ${values.name}` : null,
    values.phone ? `Phone: ${values.phone}` : null,
    values.email ? `Email: ${values.email}` : null,
    values.businessName ? `Business Name: ${values.businessName}` : null,
    "",
    "--- Project Information ---",
    values.businessType ? `Business Type: ${values.businessType}` : null,
    values.projectType ? `Website Type: ${values.projectType}` : null,
    values.requiredFeatures ? `Required Features: ${values.requiredFeatures}` : null,
    values.referenceWebsites ? `Reference Websites: ${values.referenceWebsites}` : null,
    values.description ? `Project Description: ${values.description}` : null,
    "",
    "--- Budget & Timeline ---",
    values.budget ? `Budget: ${values.budget}` : null,
    values.timeline ? `Timeline: ${values.timeline}` : null,
  ].filter(Boolean);
  return lines.join("\n");
}

function StepIndicator({
  active,
  stepNumber,
  title,
  subtitle,
}: {
  active: boolean;
  stepNumber: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div
      className={`rounded-2xl border p-3 transition-all duration-300 ${
        active
          ? "border-[#38BDF8]/40 bg-[#38BDF8]/10 shadow-[0_0_20px_rgba(56,189,248,0.15)]"
          : "border-white/10 bg-white/5"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`h-8 w-8 rounded-xl text-center leading-8 text-xs font-semibold transition-all duration-300 ${
            active
              ? "bg-[#38BDF8]/20 text-[#38BDF8]"
              : "bg-white/5 text-white/70"
          }`}
        >
          {stepNumber}
        </div>
        <div>
          <div className={`text-sm font-semibold transition-all duration-300 ${active ? "text-white" : "text-white/70"}`}>
            {title}
          </div>
          <div className="text-xs text-white/50">{subtitle}</div>
        </div>
      </div>
    </div>
  );
}

export function QuoteSteps() {
  const [step, setStep] = useState<InquiryStep>("contact");
  const formRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useForm<ContactInquiryInput>({
    resolver: zodResolver(contactInquirySchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      businessName: "",
      businessType: "",
      projectType: "",
      requiredFeatures: "",
      referenceWebsites: "",
      budget: "",
      timeline: "",
      description: "",
    },
    mode: "onBlur",
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const formValues = watch();

  const WHATSAPP_NUMBER = "917793922519";

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWhatsAppMessage(formValues))}`;

  const currentStepIndex = STEPS.findIndex((s) => s.id === step);

  const next = async () => {
    const ok = await (async () => {
      if (step === "contact") return trigger(["name", "phone", "email", "businessName"]);
      if (step === "project") return trigger(["businessType", "projectType", "description"]);
      if (step === "budget") return trigger(["budget", "timeline"]);
      return true;
    })();
    if (!ok) return;
    setStep((s) =>
      s === "contact" ? "project" : s === "project" ? "budget" : "submit"
    );
  };

  const back = () => {
    setStep((s) =>
      s === "submit" ? "budget" : s === "budget" ? "project" : "contact"
    );
  };

  const onSubmit = () => {
    window.open(whatsappHref, "_blank");
  };

  useEffect(() => {
    if (!formRef.current) return;
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
    );
  }, [step]);

  return (
    <section id="quote-form" className="relative bg-[#050816] py-16 sm:py-20 md:py-24 overflow-x-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Heading */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Custom Project{" "}
            <span className="bg-gradient-to-r from-[#38BDF8] via-[#8B5CF6] to-[#06B6D4] bg-clip-text text-transparent">
              Discovery
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
            Answer a few questions and receive a tailored website strategy, estimated budget, feature roadmap, and delivery timeline.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Left Column - Step indicators */}
          <div className="hidden lg:block lg:col-span-2">
            <div className="sticky top-24 space-y-3">
              {STEPS.map((s) => (
                <StepIndicator
                  key={s.id}
                  active={step === s.id}
                  stepNumber={s.number}
                  title={s.title}
                  subtitle={s.subtitle}
                />
              ))}

              {/* Trust Section */}
              <div className="mt-6 space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-xl bg-[#38BDF8]/20 text-center leading-8 text-xs text-[#38BDF8]">⏱</div>
                  <div>
                    <div className="text-xs font-semibold text-white">Response Time</div>
                    <div className="text-xs text-white/60">Within 24 Hours</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-xl bg-[#38BDF8]/20 text-center leading-8 text-xs text-[#38BDF8]">💬</div>
                  <div>
                    <div className="text-xs font-semibold text-white">Free Consultation</div>
                    <div className="text-xs text-white/60">Project Discussion Included</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-xl bg-[#38BDF8]/20 text-center leading-8 text-xs text-[#38BDF8]">🔒</div>
                  <div>
                    <div className="text-xs font-semibold text-white">100% Confidential</div>
                    <div className="text-xs text-white/60">Your details remain private</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main form area */}
          <div className="lg:col-span-3">
            <div
              ref={formRef}
              className="rounded-[32px] border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.02] backdrop-blur-xl p-6 md:p-8"
            >
              {/* Mobile step indicator */}
              <div className="mb-6 lg:hidden">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/50">
                    Step {currentStepIndex + 1} of {STEPS.length}
                  </span>
                  <span className="text-xs text-[#38BDF8]">
                    {STEPS[currentStepIndex].title}
                  </span>
                </div>
                <div className="mt-2 h-1 rounded-full bg-white/10">
                  <div
                    className="h-1 rounded-full bg-gradient-to-r from-[#38BDF8] to-[#8B5CF6] transition-all duration-300"
                    style={{ width: `${((currentStepIndex + 1) / STEPS.length) * 100}%` }}
                  />
                </div>
              </div>

              <form className="mt-2 space-y-5" onSubmit={handleSubmit(onSubmit)}>
                {/* STEP 1: Contact Information */}
                {step === "contact" && (
                  <div className="space-y-5">
                    <div>
                      <div className="text-xs uppercase tracking-[0.18em] text-white/50">
                        Step 01 — Contact Information
                      </div>
                      <div className="mt-1 text-sm text-white/70">
                        Tell us who you are and how we can reach you.
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="group block sm:col-span-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-white/60">Full Name</span>
                          <span className="text-xs text-[#38BDF8]">Required</span>
                        </div>
                        <input
                          {...register("name")}
                          placeholder="Your full name"
                          className="mt-2 w-full rounded-xl border border-white/10 bg-[#050816]/30 px-4 py-4 text-sm text-white outline-none transition focus:border-[#38BDF8]/40"
                          style={{ height: "56px" }}
                        />
                        {errors.name && (
                          <div className="mt-1 text-xs text-red-400">{errors.name.message}</div>
                        )}
                      </label>

                      <label className="group block">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-white/60">Phone Number</span>
                          <span className="text-xs text-[#38BDF8]">Required</span>
                        </div>
                        <input
                          {...register("phone")}
                          placeholder="+91 98xxxxxx10"
                          inputMode="tel"
                          className="mt-2 w-full rounded-xl border border-white/10 bg-[#050816]/30 px-4 py-4 text-sm text-white outline-none transition focus:border-[#38BDF8]/40"
                          style={{ height: "56px" }}
                        />
                        {errors.phone && (
                          <div className="mt-1 text-xs text-red-400">{errors.phone.message}</div>
                        )}
                      </label>

                      <label className="group block">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-white/60">Email Address</span>
                          <span className="text-xs text-[#38BDF8]">Required</span>
                        </div>
                        <input
                          {...register("email")}
                          placeholder="you@company.com"
                          inputMode="email"
                          className="mt-2 w-full rounded-xl border border-white/10 bg-[#050816]/30 px-4 py-4 text-sm text-white outline-none transition focus:border-[#38BDF8]/40"
                          style={{ height: "56px" }}
                        />
                        {errors.email && (
                          <div className="mt-1 text-xs text-red-400">{errors.email.message}</div>
                        )}
                      </label>

                      <label className="group block sm:col-span-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-white/60">Business Name</span>
                          <span className="text-xs text-white/60">Optional</span>
                        </div>
                        <input
                          {...register("businessName")}
                          placeholder="Your company or brand name"
                          className="mt-2 w-full rounded-xl border border-white/10 bg-[#050816]/30 px-4 py-4 text-sm text-white outline-none transition focus:border-[#38BDF8]/40"
                          style={{ height: "56px" }}
                        />
                      </label>
                    </div>
                  </div>
                )}

                {/* STEP 2: Project Information */}
                {step === "project" && (
                  <div className="space-y-5">
                    <div>
                      <div className="text-xs uppercase tracking-[0.18em] text-white/50">
                        Step 02 — Project Details
                      </div>
                      <div className="mt-1 text-sm text-white/70">
                        Tell us about your website needs.
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="group block sm:col-span-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-white/60">Business Type</span>
                          <span className="text-xs text-[#38BDF8]">Required</span>
                        </div>
                        <input
                          {...register("businessType")}
                          placeholder="Restaurant / Wedding planner / Coaching institute..."
                          className="mt-2 w-full rounded-xl border border-white/10 bg-[#050816]/30 px-4 py-4 text-sm text-white outline-none transition focus:border-[#38BDF8]/40"
                          style={{ height: "56px" }}
                        />
                        {errors.businessType && (
                          <div className="mt-1 text-xs text-red-400">{errors.businessType.message}</div>
                        )}
                      </label>

                      <label className="group block sm:col-span-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-white/60">Website Type</span>
                          <span className="text-xs text-[#38BDF8]">Required</span>
                        </div>
                        <input
                          {...register("projectType")}
                          placeholder="Website / Landing page / E-commerce / Booking system..."
                          className="mt-2 w-full rounded-xl border border-white/10 bg-[#050816]/30 px-4 py-4 text-sm text-white outline-none transition focus:border-[#38BDF8]/40"
                          style={{ height: "56px" }}
                        />
                        {errors.projectType && (
                          <div className="mt-1 text-xs text-red-400">{errors.projectType.message}</div>
                        )}
                      </label>

                      <label className="group block sm:col-span-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-white/60">Required Features</span>
                          <span className="text-xs text-white/60">Optional</span>
                        </div>
                        <input
                          {...register("requiredFeatures")}
                          placeholder="Online ordering / Booking slots / Portfolio gallery..."
                          className="mt-2 w-full rounded-xl border border-white/10 bg-[#050816]/30 px-4 py-4 text-sm text-white outline-none transition focus:border-[#38BDF8]/40"
                          style={{ height: "56px" }}
                        />
                      </label>

                      <label className="group block sm:col-span-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-white/60">Reference Websites</span>
                          <span className="text-xs text-white/60">Optional</span>
                        </div>
                        <input
                          {...register("referenceWebsites")}
                          placeholder="websites you like (urls)"
                          className="mt-2 w-full rounded-xl border border-white/10 bg-[#050816]/30 px-4 py-4 text-sm text-white outline-none transition focus:border-[#38BDF8]/40"
                          style={{ height: "56px" }}
                        />
                      </label>

                      <label className="group block sm:col-span-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-white/60">Project Description</span>
                          <span className="text-xs text-[#38BDF8]">Required</span>
                        </div>
                        <textarea
                          {...register("description")}
                          placeholder="Describe your goals. What should this project achieve?"
                          className="mt-2 min-h-[120px] w-full resize-none rounded-xl border border-white/10 bg-[#050816]/30 px-4 py-4 text-sm text-white outline-none transition focus:border-[#38BDF8]/40"
                        />
                        {errors.description && (
                          <div className="mt-1 text-xs text-red-400">{errors.description.message}</div>
                        )}
                      </label>
                    </div>
                  </div>
                )}

                {/* STEP 3: Budget & Timeline */}
                {step === "budget" && (
                  <div className="space-y-5">
                    <div>
                      <div className="text-xs uppercase tracking-[0.18em] text-white/50">
                        Step 03 — Budget & Timeline
                      </div>
                      <div className="mt-1 text-sm text-white/70">
                        Timeline & investment planning.
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="mb-2 text-xs text-white/60">Budget</div>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                          {["Under ₹5K", "₹5K–10K", "₹10K–20K", "₹20K+"].map((option) => (
                            <label
                              key={option}
                              className="relative flex cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-[#050816]/30 p-4 text-center text-sm transition-all duration-200 hover:border-[#38BDF8]/40"
                            >
                              <input
                                type="radio"
                                value={option}
                                {...register("budget")}
                                className="peer sr-only"
                              />
                              <span className="text-white peer-checked:text-[#38BDF8]">
                                {option}
                              </span>
                              <div className="pointer-events-none absolute inset-0 rounded-xl border-2 border-transparent peer-checked:border-[#38BDF8]/40 peer-checked:bg-[#38BDF8]/10" />
                            </label>
                          ))}
                        </div>
                        {errors.budget && (
                          <div className="mt-1 text-xs text-red-400">{errors.budget.message}</div>
                        )}
                      </div>

                      <div>
                        <div className="mb-2 text-xs text-white/60">Timeline</div>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                          {["ASAP", "1 Week", "2-3 Weeks", "Flexible"].map((option) => (
                            <label
                              key={option}
                              className="relative flex cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-[#050816]/30 p-4 text-center text-sm transition-all duration-200 hover:border-[#38BDF8]/40"
                            >
                              <input
                                type="radio"
                                value={option}
                                {...register("timeline")}
                                className="peer sr-only"
                              />
                              <span className="text-white peer-checked:text-[#38BDF8]">
                                {option}
                              </span>
                              <div className="pointer-events-none absolute inset-0 rounded-xl border-2 border-transparent peer-checked:border-[#38BDF8]/40 peer-checked:bg-[#38BDF8]/10" />
                            </label>
                          ))}
                        </div>
                        {errors.timeline && (
                          <div className="mt-1 text-xs text-red-400">{errors.timeline.message}</div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 4: Review & Submit */}
                {step === "submit" && (
                  <div className="space-y-5">
                    <div>
                      <div className="text-xs uppercase tracking-[0.18em] text-white/50">
                        Step 04 — Review & Submit
                      </div>
                      <div className="mt-1 text-sm text-white/70">
                        Review your inquiry and send.
                      </div>
                    </div>

                    {/* Summary Card */}
                    <div className="rounded-2xl border border-white/10 bg-[#050816]/30 p-5">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-xl border border-white/10 bg-[#050816]/30 p-3">
                          <div className="text-xs text-white/55">Full Name</div>
                          <div className="mt-1 text-sm font-semibold text-white">{formValues.name || "—"}</div>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-[#050816]/30 p-3">
                          <div className="text-xs text-white/55">Phone</div>
                          <div className="mt-1 text-sm font-semibold text-white">{formValues.phone || "—"}</div>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-[#050816]/30 p-3">
                          <div className="text-xs text-white/55">Email</div>
                          <div className="mt-1 text-sm font-semibold text-white">{formValues.email || "—"}</div>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-[#050816]/30 p-3">
                          <div className="text-xs text-white/55">Business Name</div>
                          <div className="mt-1 text-sm font-semibold text-white">{formValues.businessName || "—"}</div>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-[#050816]/30 p-3">
                          <div className="text-xs text-white/55">Business Type</div>
                          <div className="mt-1 text-sm font-semibold text-white">{formValues.businessType || "—"}</div>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-[#050816]/30 p-3">
                          <div className="text-xs text-white/55">Website Type</div>
                          <div className="mt-1 text-sm font-semibold text-white">{formValues.projectType || "—"}</div>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-[#050816]/30 p-3">
                          <div className="text-xs text-white/55">Required Features</div>
                          <div className="mt-1 text-sm font-semibold text-white">{formValues.requiredFeatures || "—"}</div>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-[#050816]/30 p-3">
                          <div className="text-xs text-white/55">Reference Websites</div>
                          <div className="mt-1 text-sm font-semibold text-white">{formValues.referenceWebsites || "—"}</div>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-[#050816]/30 p-3">
                          <div className="text-xs text-white/55">Budget</div>
                          <div className="mt-1 text-sm font-semibold text-white">{formValues.budget || "—"}</div>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-[#050816]/30 p-3">
                          <div className="text-xs text-white/55">Timeline</div>
                          <div className="mt-1 text-sm font-semibold text-white">{formValues.timeline || "—"}</div>
                        </div>
                      </div>

                      <div className="mt-4 rounded-xl border border-white/10 bg-[#050816]/30 p-3">
                        <div className="text-xs text-white/55">Project Description</div>
                        <div className="mt-2 text-sm leading-6 text-white/80">
                          {formValues.description || "—"}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    {step !== "contact" && (
                      <button
                        type="button"
                        onClick={back}
                        className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-[#050816]/30 px-6 py-4 text-sm font-medium text-white/80 transition hover:bg-white/10"
                        style={{ height: "56px" }}
                      >
                        Back
                      </button>
                    )}

                    {step !== "submit" && (
                      <button
                        type="button"
                        onClick={next}
                        className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-6 py-4 text-sm font-medium text-white transition hover:border-[#38BDF8]/30 hover:bg-white/10"
                        style={{ height: "56px" }}
                      >
                        Next Step →
                      </button>
                    )}
                  </div>

                  {step === "submit" && (
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#38BDF8] via-[#8B5CF6] to-[#06B6D4] px-8 py-4 text-sm font-semibold text-white shadow-[0_0_30px_rgba(56,189,248,0.2)] transition hover:shadow-[0_0_40px_rgba(56,189,248,0.3)]"
                      style={{ height: "56px" }}
                    >
                      Send Inquiry via WhatsApp
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </section>
  );
}

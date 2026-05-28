"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Float, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactInquirySchema,
  type ContactInquiryInput,
} from "@/lib/validation/contactSchema";
import { prefersReducedMotion } from "@/lib/gsap/reducedMotion";

type InquiryStep = "basics" | "project" | "details" | "review";

function buildWhatsAppMessage(values: Partial<ContactInquiryInput>) {
  const lines = [
    "Hi Learn2Compile 👋",
    "I’d like a premium digital consultation.",
    values.name ? `Name: ${values.name}` : null,
    values.phone ? `Phone: ${values.phone}` : null,
    values.email ? `Email: ${values.email}` : null,
    values.businessType ? `Business Type: ${values.businessType}` : null,
    values.projectType ? `Project Type: ${values.projectType}` : null,
    values.budget ? `Budget: ${values.budget}` : null,
    values.timeline ? `Timeline: ${values.timeline}` : null,
    values.description
      ? `Goals: ${values.description}`
      : null,
  ].filter(Boolean);

  return lines.join("\n");
}

function useIsClientReducedMotion() {
  // `prefersReducedMotion()` is deterministic for the current browser; keep state initialised without a setter effect.
  const [reduced] = useState(() => prefersReducedMotion());
  return reduced;
}


function Hero3D({ reduced }: { reduced: boolean }) {
  const groupRef = useRef<THREE.Group | null>(null);
  const panelRefs = useRef<Array<THREE.Mesh | null>>([]);



  useEffect(() => {
    if (reduced) return;

    const els = panelRefs.current.filter((m): m is THREE.Mesh => Boolean(m));

    els.forEach((mesh, idx) => {
      gsap.fromTo(
        mesh.scale,
        { x: 0.2, y: 0.2, z: 0.2 },
        {
          x: 1,
          y: 1,
          z: 1,
          duration: 1.0,
          delay: 0.12 + idx * 0.12,
          ease: "power3.out",
        }
      );
    });
  }, [reduced]);

  return (
    <Canvas dpr={[1, 1.4]} camera={{ position: [0, 0.6, 5], fov: 42 }}>
      <PerspectiveCamera makeDefault position={[0, 0.6, 5]} />
      <ambientLight intensity={0.25} />
      <directionalLight position={[3, 4, 2]} intensity={0.95} />
      <pointLight position={[-3, 2, 2]} intensity={0.35} color="#38BDF8" />
      <pointLight position={[3, 2, -2]} intensity={0.25} color="#8B5CF6" />
      <Environment preset="night" />

      <group ref={groupRef}>
        <mesh position={[0, -0.7, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[7, 7]} />
          <meshStandardMaterial color="#07081a" metalness={0.7} roughness={0.5} />
        </mesh>

        <Float speed={1.2} floatIntensity={0.25} rotationIntensity={0.15}>
          <mesh
            ref={(el) => {
              panelRefs.current[0] = el;
            }}
            position={[-1.2, 0.25, 0]}
            rotation={[0, 0.25, 0]}
          >
            <boxGeometry args={[0.85, 1.15, 0.04]} />
            <meshStandardMaterial
              color="#38BDF8"
              metalness={0.9}
              roughness={0.2}
              emissive="#38BDF8"
              emissiveIntensity={reduced ? 0.1 : 0.25}
              transparent
              opacity={0.9}
            />
          </mesh>
        </Float>

        <Float speed={1.6} floatIntensity={0.35} rotationIntensity={0.2}>
          <mesh
            ref={(el) => {
              panelRefs.current[1] = el;
            }}
            position={[0, 0.15, 0.55]}
            rotation={[0, 0, 0]}
          >
            <boxGeometry args={[1.0, 1.4, 0.04]} />
            <meshStandardMaterial
              color="#8B5CF6"
              metalness={0.9}
              roughness={0.2}
              emissive="#8B5CF6"
              emissiveIntensity={reduced ? 0.1 : 0.22}
              transparent
              opacity={0.86}
            />
          </mesh>
        </Float>

        <Float speed={1.0} floatIntensity={0.2} rotationIntensity={0.12}>
          <mesh
            ref={(el) => {
              panelRefs.current[2] = el;
            }}
            position={[1.15, 0.2, 0]}
            rotation={[0, -0.22, 0]}
          >
            <boxGeometry args={[0.75, 0.98, 0.04]} />
            <meshStandardMaterial
              color="#06B6D4"
              metalness={0.9}
              roughness={0.2}
              emissive="#06B6D4"
              emissiveIntensity={reduced ? 0.1 : 0.22}
              transparent
              opacity={0.9}
            />
          </mesh>
        </Float>

        {!reduced ? (
          <mesh position={[0, 0.35, -0.15]}>
            <ringGeometry args={[0.35, 0.52, 40]} />
            <meshBasicMaterial color="#38BDF8" transparent opacity={0.25} />
          </mesh>
        ) : null}
      </group>
    </Canvas>
  );
}

function StepPill({
  active,
  index,
  title,
}: {
  active: boolean;
  index: number;
  title: string;
}) {
  return (
    <div
      className={
        active
          ? "rounded-2xl border border-[#38BDF8]/40 bg-[#38BDF8]/10 p-3"
          : "rounded-2xl border border-white/10 bg-white/5 p-3"
      }
    >
      <div className="flex items-center gap-3">
        <div
          className={
            active
              ? "h-8 w-8 rounded-xl bg-[#38BDF8]/20 text-center leading-8 text-xs font-semibold text-[#38BDF8]"
              : "h-8 w-8 rounded-xl bg-white/5 text-center leading-8 text-xs font-semibold text-white/70"
          }
        >
          {String(index + 1).padStart(2, "0")}
        </div>
        <div>
          <div className="text-sm font-semibold text-white">{title}</div>
          <div className="mt-0.5 text-xs text-white/60">Cinematic intake step</div>
        </div>
      </div>
    </div>
  );
}

export function ContactSection() {
  const reduced = useIsClientReducedMotion();

  const [step, setStep] = useState<InquiryStep>("basics");
  const [submitState, setSubmitState] = useState<
    | { status: "idle" }
    | { status: "loading" }
    | { status: "success"; referenceId: string }
    | { status: "error"; message: string }
  >({ status: "idle" });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    trigger,
    getValues,
  } = useForm<ContactInquiryInput>({
    resolver: zodResolver(contactInquirySchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      businessType: "",
      projectType: "",
      budget: "",
      timeline: "",
      description: "",
    },
    mode: "onBlur",
  });

  const formValues = watch();

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
  const whatsappDefault = useMemo(() => {
    return buildWhatsAppMessage({
      name: formValues.name,
      phone: formValues.phone,
      email: formValues.email,
      businessType: formValues.businessType,
      projectType: formValues.projectType,
      budget: formValues.budget,
      timeline: formValues.timeline,
      description: formValues.description,
    });
  }, [formValues]);

  const whatsappHref = useMemo(() => {
    if (!whatsappNumber) return "#";
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappDefault)}`;
  }, [whatsappDefault, whatsappNumber]);

  const stepTitle =
    step === "basics"
      ? "Your details"
      : step === "project"
        ? "Project context"
        : step === "details"
          ? "Delivery intent"
          : "Ready to transmit";

  const goalsHelper = useMemo(() => {
    const bt = getValues("businessType");
    const tone = bt ? `for ${bt}` : "for your business";
    return `Describe your goals ${tone}. What should this project achieve? (leads, bookings, enquiries, credibility)`;
  }, [formValues.businessType, formValues.projectType, getValues]);

  const next = async () => {
    const ok = await (async () => {
      if (step === "basics")
        return trigger(["name", "phone", "email"]);
      if (step === "project")
        return trigger(["businessType", "projectType"]);
      if (step === "details")
        return trigger(["budget", "timeline", "description"]);

      return true;
    })();
    if (!ok) return;

    setStep((s) => (s === "basics" ? "project" : s === "project" ? "details" : "review"));
  };

  const back = () => {
    setStep((s) => (s === "review" ? "details" : s === "details" ? "project" : "basics"));
  };

  const onSubmit = async (values: ContactInquiryInput) => {
    setSubmitState({ status: "loading" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Unable to submit. Please try again.");
      }

      const referenceId = `${Date.now()}`;
      setSubmitState({ status: "success", referenceId });
      reset();
      setStep("basics");

      setTimeout(() => setSubmitState({ status: "idle" }), 6000);
    } catch (e) {
      setSubmitState({
        status: "error",
        message: e instanceof Error ? e.message : "Something went wrong.",
      });
    }
  };

  const heroRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-hero-title",
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" }
      );
      gsap.fromTo(
        ".contact-hero-sub",
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.1 }
      );
      gsap.fromTo(
        ".contact-hero-cta",
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.2 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section className="relative bg-[#050816] py-10 md:py-16">
      <div ref={heroRef} className="relative mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_10%_0%,rgba(56,189,248,0.18),transparent_55%),radial-gradient(700px_circle_at_85%_20%,rgba(139,92,246,0.14),transparent_50%)]" />
          </div>

          <div className="relative grid gap-6 lg:grid-cols-5 lg:gap-8 p-6 md:p-8">
            <div className="lg:col-span-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
                <span className="h-2 w-2 rounded-full bg-[#38BDF8] shadow-[0_0_18px_rgba(56,189,248,0.6)]" />
                Premium consultation
              </div>

              <h2 className="contact-hero-title mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Transmit your inquiry. Receive a cinematic execution plan.
              </h2>

              <p className="contact-hero-sub mt-4 max-w-xl text-sm leading-6 text-white/70">
                Guided intake for Indian business inquiries—fast, business-first, and
                conversion-ready. Choose your project context, then send.
              </p>

              <div className="contact-hero-cta mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setStep("basics")}
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/10"
                >
                  Start Your Project
                </button>
                <a
                  href="/custom-quote"
                  className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#38BDF8]/20 via-[#8B5CF6]/20 to-[#06B6D4]/20 px-5 py-3 text-sm font-medium text-white shadow-[0_0_30px_rgba(56,189,248,0.15)] transition hover:from-[#38BDF8]/30 hover:via-[#8B5CF6]/30 hover:to-[#06B6D4]/30"
                >
                  Get Custom Quote
                </a>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-[#050816]/30 p-4">
                  <div className="text-xs uppercase tracking-[0.18em] text-white/50">Response</div>
                  <div className="mt-2 text-sm font-semibold text-white">Within 24 hours</div>
                  <div className="mt-1 text-xs text-white/60">Clear next steps, premium planning.</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#050816]/30 p-4">
                  <div className="text-xs uppercase tracking-[0.18em] text-white/50">Format</div>
                  <div className="mt-2 text-sm font-semibold text-white">Timeline + execution scope</div>
                  <div className="mt-1 text-xs text-white/60">Engineering-ready deliverables.</div>
                </div>
              </div>
            </div>

            <div className="relative lg:col-span-2 rounded-3xl border border-white/10 bg-[#050816]/40 overflow-hidden">
              <div className="absolute inset-0">
                <Hero3D reduced={reduced} />
              </div>

              <div className="relative p-5">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-xs uppercase tracking-[0.18em] text-white/55">
                      Inquiry console
                    </div>
                    <div className="text-xs text-[#38BDF8]">
                      Step{" "}
                      {step === "basics"
                        ? "01"
                        : step === "project"
                          ? "02"
                          : step === "details"
                            ? "03"
                            : "04"}
                    </div>
                  </div>
                  <div className="mt-3 text-sm font-semibold text-white">{stepTitle}</div>
                  <div className="mt-2 text-xs leading-5 text-white/65">
                    Tap through the panels—your WhatsApp message updates live.
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <a
                      href={whatsappHref}
                      target={whatsappNumber ? "_blank" : undefined}
                      rel="noreferrer"
                      className="inline-flex flex-1 items-center justify-center rounded-2xl border border-white/10 bg-[#050816]/30 px-3 py-3 text-sm font-medium text-white transition hover:bg-white/10"
                    >
                      <span className="mr-2 text-[#38BDF8]">●</span>
                      WhatsApp
                    </a>
                    <div className="hidden sm:block text-xs text-white/55">
                      {whatsappNumber ? "Prefilled" : "Set env var"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-5">
          <div className="hidden lg:block lg:col-span-2">
            <div className="space-y-3">
              <StepPill active={step === "basics"} index={0} title="Basics" />
              <StepPill active={step === "project"} index={1} title="Project" />
              <StepPill active={step === "details"} index={2} title="Budget & timing" />
              <StepPill active={step === "review"} index={3} title="Transmit" />
            </div>

            <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="text-sm font-semibold text-white">Consultation workflow</div>
              <div className="mt-2 text-xs leading-5 text-white/65">
                We don’t reply with generic forms. You’ll get scope clarity and a communication timeline.
              </div>

              <div className="mt-4 space-y-3">
                {[
                  { t: "Onboarding", d: "Confirm context + success metrics" },
                  { t: "Communication loop", d: "Align milestones & deliverables" },
                  { t: "Execution", d: "Engineering-ready plan for delivery" },
                ].map((x) => (
                  <div key={x.t} className="rounded-2xl border border-white/10 bg-[#050816]/30 p-3">
                    <div className="text-xs font-semibold text-white">{x.t}</div>
                    <div className="mt-1 text-xs text-white/60">{x.d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <form
              className="rounded-3xl border border-white/10 bg-white/5 p-5 md:p-6 backdrop-blur"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-[0.18em] text-white/50">Guided inquiry</div>
                  <div className="mt-2 text-lg font-semibold text-white">{stepTitle}</div>
                  <div className="mt-1 text-xs leading-5 text-white/65">
                    {step === "basics"
                      ? "Tell us who to contact."
                      : step === "project"
                        ? "What are you building?"
                        : step === "details"
                          ? "How soon and how big?"
                          : "Review and transmit."}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-white/55">Conversion mode</div>
                  <div className="mt-2 text-xs text-[#38BDF8]">Cinematic intake</div>
                </div>
              </div>

              <div className="mt-5 space-y-4">
                {step === "basics" ? (
                  <>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="group block">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-white/60">Name</span>
                          <span className="text-xs text-[#38BDF8] transition">Required</span>
                        </div>
                        <input
                          {...register("name")}
                          placeholder="Your name"
                          className="mt-2 w-full rounded-2xl border border-white/10 bg-[#050816]/30 px-4 py-3 text-sm text-white outline-none transition focus:border-white/30"
                        />
                        {errors.name ? (
                          <div className="mt-1 text-xs text-red-400">{errors.name.message}</div>
                        ) : null}
                      </label>

                      <label className="group block">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-white/60">Phone</span>
                          <span className="text-xs text-[#38BDF8] transition">Required</span>
                        </div>
                        <input
                          {...register("phone")}
                          placeholder="+91 98xxxxxx10"
                          inputMode="tel"
                          className="mt-2 w-full rounded-2xl border border-white/10 bg-[#050816]/30 px-4 py-3 text-sm text-white outline-none transition focus:border-white/30"
                        />
                        {errors.phone ? (
                          <div className="mt-1 text-xs text-red-400">{errors.phone.message}</div>
                        ) : null}
                      </label>

                      <label className="group block sm:col-span-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-white/60">Email (optional)</span>
                          <span className="text-xs text-white/60">Optional</span>
                        </div>
                        <input
                          {...register("email")}
                          placeholder="you@company.com"
                          inputMode="email"
                          className="mt-2 w-full rounded-2xl border border-white/10 bg-[#050816]/30 px-4 py-3 text-sm text-white outline-none transition focus:border-white/30"
                        />
                        {errors.email ? (
                          <div className="mt-1 text-xs text-red-400">{errors.email.message}</div>
                        ) : null}
                      </label>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-[#050816]/30 p-4">
                      <div className="text-xs uppercase tracking-[0.18em] text-white/50">
                        Premium communication
                      </div>
                      <div className="mt-2 text-sm font-medium text-white">
                        We respond with clarity, not copy-paste.
                      </div>
                      <div className="mt-1 text-xs leading-5 text-white/65">
                        Your WhatsApp message will include your selections as you go.
                      </div>
                    </div>
                  </>
                ) : null}

                {step === "project" ? (
                  <>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="group block sm:col-span-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-white/60">Business Type</span>
                          <span className="text-xs text-[#38BDF8] transition">Required</span>
                        </div>
                        <input
                          {...register("businessType")}
                          placeholder="Restaurant / Wedding planner / Coaching institute / Personal brand..."
                          className="mt-2 w-full rounded-2xl border border-white/10 bg-[#050816]/30 px-4 py-3 text-sm text-white outline-none transition focus:border-white/30"
                        />
                        {errors.businessType ? (
                          <div className="mt-1 text-xs text-red-400">
                            {errors.businessType.message}
                          </div>
                        ) : null}
                      </label>

                      <label className="group block sm:col-span-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-white/60">Project Type</span>
                          <span className="text-xs text-[#38BDF8] transition">Required</span>
                        </div>
                        <input
                          {...register("projectType")}
                          placeholder="Website / Landing page / E-commerce / Booking system..."
                          className="mt-2 w-full rounded-2xl border border-white/10 bg-[#050816]/30 px-4 py-3 text-sm text-white outline-none transition focus:border-white/30"
                        />
                        {errors.projectType ? (
                          <div className="mt-1 text-xs text-red-400">
                            {errors.projectType.message}
                          </div>
                        ) : null}
                      </label>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-[#050816]/30 p-4">
                      <div className="text-xs uppercase tracking-[0.18em] text-white/50">
                        Holographic workflow
                      </div>
                      <div className="mt-2 text-sm font-medium text-white">
                        We map your context into a delivery-ready scope.
                      </div>
                      <div className="mt-1 text-xs leading-5 text-white/65">
                        Next: budget & timeline so we can propose realistic sequencing.
                      </div>
                    </div>
                  </>
                ) : null}

                {step === "details" ? (
                  <>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="group block">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-white/60">Budget Range</span>
                          <span className="text-xs text-[#38BDF8] transition">Required</span>
                        </div>
                        <input
                          {...register("budget")}
                          placeholder="₹30k–₹1L / ₹1L+ / Let’s discuss"
                          className="mt-2 w-full rounded-2xl border border-white/10 bg-[#050816]/30 px-4 py-3 text-sm text-white outline-none transition focus:border-white/30"
                        />
                        {errors.budget ? (
                          <div className="mt-1 text-xs text-red-400">{errors.budget.message}</div>
                        ) : null}
                      </label>

                      <label className="group block">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-white/60">Timeline</span>
                          <span className="text-xs text-[#38BDF8] transition">Required</span>
                        </div>
                        <input
                          {...register("timeline")}
                          placeholder="ASAP / 2–6 weeks / This quarter"
                          className="mt-2 w-full rounded-2xl border border-white/10 bg-[#050816]/30 px-4 py-3 text-sm text-white outline-none transition focus:border-white/30"
                        />
                        {errors.timeline ? (
                          <div className="mt-1 text-xs text-red-400">{errors.timeline.message}</div>
                        ) : null}
                      </label>
                    </div>

                    <label className="group block">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-white/60">Goals / Description</span>
                        <span className="text-xs text-[#38BDF8] transition">Required</span>
                      </div>
                      <textarea
                        {...register("description")}
                        placeholder={goalsHelper}
                        className="mt-2 min-h-[120px] w-full resize-none rounded-2xl border border-white/10 bg-[#050816]/30 px-4 py-3 text-sm text-white outline-none transition focus:border-white/30"
                      />
                      {errors.description ? (
                        <div className="mt-1 text-xs text-red-400">{errors.description.message}</div>
                      ) : null}
                    </label>
                  </>
                ) : null}

                {step === "review" ? (
                  <>
                    <div className="rounded-2xl border border-white/10 bg-[#050816]/30 p-4">
                      <div className="text-xs uppercase tracking-[0.18em] text-white/50">
                        Transmit preview
                      </div>
                      <div className="mt-2 grid gap-3 sm:grid-cols-2">
                        {[
                          { k: "Name", v: formValues.name },
                          { k: "Phone", v: formValues.phone },
                          { k: "Email", v: formValues.email || "—" },
                          { k: "Business", v: formValues.businessType },
                          { k: "Project", v: formValues.projectType },
                          { k: "Budget", v: formValues.budget },
                          { k: "Timeline", v: formValues.timeline },
                        ].map((x) => (
                          <div
                            key={x.k}
                            className="rounded-2xl border border-white/10 bg-[#050816]/30 p-3"
                          >
                            <div className="text-xs text-white/55">{x.k}</div>
                            <div className="mt-1 text-sm font-semibold text-white">{x.v}</div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 rounded-2xl border border-white/10 bg-[#050816]/30 p-4">
                        <div className="text-xs text-white/55">Goals</div>
                        <div className="mt-2 text-sm leading-6 text-white/80">{formValues.description}</div>
                      </div>
                    </div>

                    <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="text-sm font-semibold text-white">Premium WhatsApp option</div>
                      <div className="mt-1 text-xs leading-5 text-white/65">
                        Use this if you want instant conversation. We prefill your selections.
                      </div>

                      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
                        <a
                          href={whatsappHref}
                          target={whatsappNumber ? "_blank" : undefined}
                          rel="noreferrer"
                          className="inline-flex flex-1 items-center justify-center rounded-2xl border border-white/10 bg-[#050816]/30 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/10"
                        >
                          <span className="mr-2 text-[#38BDF8]">●</span>
                          WhatsApp Inquiry
                          <span className="ml-2 text-[#38BDF8]">→</span>
                        </a>
                        <div className="text-xs text-white/55">
                          {whatsappNumber
                            ? "Message is generated from your workflow."
                            : "Set NEXT_PUBLIC_WHATSAPP_NUMBER to enable."}
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}

                {submitState.status === "error" ? (
                  <div className="rounded-2xl border border-red-400/20 bg-red-500/10 p-3 text-sm text-red-200">
                    {submitState.message}
                  </div>
                ) : null}
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={back}
                    disabled={step === "basics" || submitState.status === "loading"}
                    className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-[#050816]/30 px-4 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10 disabled:opacity-50"
                  >
                    Back
                  </button>

                  {step !== "review" ? (
                    <button
                      type="button"
                      onClick={next}
                      disabled={submitState.status === "loading"}
                      className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition hover:border-[#38BDF8]/30 hover:bg-white/10 disabled:opacity-50"
                    >
                      Next
                    </button>
                  ) : null}
                </div>

                {step === "review" ? (
                  <button
                    type="submit"
                    disabled={submitState.status === "loading"}
                    className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#38BDF8]/30 via-[#8B5CF6]/30 to-[#06B6D4]/30 px-6 py-3 text-sm font-medium text-white shadow-[0_0_30px_rgba(56,189,248,0.15)] transition hover:from-[#38BDF8]/45 hover:via-[#8B5CF6]/45 hover:to-[#06B6D4]/45 disabled:opacity-60"
                  >
                    {submitState.status === "loading"
                      ? "Sending…"
                      : submitState.status === "success"
                        ? "Sent — we’ll reach out shortly"
                        : "Transmit Inquiry"}
                  </button>
                ) : (
                  <div className="text-xs text-white/55">
                    {step === "details" ? "Ready when you are." : "WhatsApp updates live as you type."}
                  </div>
                )}
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <a
                  href="/custom-quote"
                  className="rounded-2xl border border-white/10 bg-[#050816]/30 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Book Consultation
                </a>
                <button
                  type="button"
                  onClick={() => {
                    const msg = buildWhatsAppMessage(getValues());
                    if (!whatsappNumber) return;
                    window.open(
                      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`,
                      "_blank",
                      "noopener,noreferrer"
                    );
                  }}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:border-[#38BDF8]/30 hover:bg-white/10"
                >
                  WhatsApp Instant
                </button>
              </div>

              <div className="mt-3 text-center text-xs text-white/50">
                By transmitting, you agree to receive a reply about your project.
              </div>
            </form>
          </div>
        </div>

        <div className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </section>
  );
}


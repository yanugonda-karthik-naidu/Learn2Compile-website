"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Float, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";

function HeroScene({ mousePos }: { mousePos: { x: number; y: number } }) {
  const groupRef = useRef<THREE.Group | null>(null);
  const panelRef1 = useRef<THREE.Mesh | null>(null);
  const panelRef2 = useRef<THREE.Mesh | null>(null);
  const panelRef3 = useRef<THREE.Mesh | null>(null);
  const panelRef4 = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (!groupRef.current) return;
    const targetRotY = mousePos.x * 0.15;
    const targetRotX = -mousePos.y * 0.1;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotY,
      0.06
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotX,
      0.06
    );
  }, [mousePos]);

  useEffect(() => {
    const animatePanel = (mesh: THREE.Mesh | null, delay: number) => {
      if (!mesh) return;
      gsap.fromTo(
        mesh.scale,
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 1, z: 1, duration: 1.2, delay, ease: "power3.out" }
      );
    };
    animatePanel(panelRef1.current, 0.4);
    animatePanel(panelRef2.current, 0.6);
    animatePanel(panelRef3.current, 0.8);
    animatePanel(panelRef4.current, 1.0);
  }, []);

  return (
    <group ref={groupRef}>
      {/* Main planning dashboard */}
      <Float speed={1.2} floatIntensity={0.3} rotationIntensity={0.15}>
        <mesh ref={panelRef1} position={[0, 0, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[2.0, 1.3, 0.04]} />
          <meshStandardMaterial
            color="#0ea5e9"
            metalness={0.95}
            roughness={0.1}
            emissive="#38BDF8"
            emissiveIntensity={0.2}
            transparent
            opacity={0.85}
          />
        </mesh>
      </Float>

      {/* Left workflow panel */}
      <Float speed={1.5} floatIntensity={0.4} rotationIntensity={0.2}>
        <mesh ref={panelRef2} position={[-1.4, 0.3, 0.3]} rotation={[0, 0.35, 0]}>
          <boxGeometry args={[0.8, 1.1, 0.03]} />
          <meshStandardMaterial
            color="#8B5CF6"
            metalness={0.95}
            roughness={0.1}
            emissive="#8B5CF6"
            emissiveIntensity={0.2}
            transparent
            opacity={0.8}
          />
        </mesh>
      </Float>

      {/* Right metrics panel */}
      <Float speed={1.0} floatIntensity={0.25} rotationIntensity={0.12}>
        <mesh ref={panelRef3} position={[1.3, 0.2, 0.2]} rotation={[0, -0.3, 0]}>
          <boxGeometry args={[0.7, 0.9, 0.03]} />
          <meshStandardMaterial
            color="#06B6D4"
            metalness={0.95}
            roughness={0.1}
            emissive="#06B6D4"
            emissiveIntensity={0.2}
            transparent
            opacity={0.85}
          />
        </mesh>
      </Float>

      {/* Top indicator panel */}
      <Float speed={0.8} floatIntensity={0.2} rotationIntensity={0.1}>
        <mesh ref={panelRef4} position={[0.2, 1.1, 0.1]} rotation={[0, 0.1, 0]}>
          <boxGeometry args={[0.5, 0.35, 0.03]} />
          <meshStandardMaterial
            color="#a78bfa"
            metalness={0.9}
            roughness={0.15}
            emissive="#a78bfa"
            emissiveIntensity={0.25}
            transparent
            opacity={0.9}
          />
        </mesh>
      </Float>

      {/* Ground plane */}
      <mesh position={[0, -1.0, -1]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[7, 7]} />
        <meshStandardMaterial
          color="#0a0a1a"
          metalness={0.8}
          roughness={0.4}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  );
}

export function QuoteHero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [reduced, setReduced] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mql = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mql) return;
    const onChange = () => setReduced(mql.matches);
    onChange();
    if (typeof mql.addEventListener === "function")
      mql.addEventListener("change", onChange);
    else mql.addListener(onChange);
    return () => {
      if (typeof mql.removeEventListener === "function")
        mql.removeEventListener("change", onChange);
      else mql.removeListener(onChange);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x: nx, y: ny });
    };
    window.addEventListener("pointermove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.fromTo(
        eyebrowRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      )
        .fromTo(
          titleRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
          "-=0.3"
        )
        .fromTo(
          subtitleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
          "-=0.5"
        )
        .fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.4"
        );
    }, heroRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen overflow-hidden bg-[#050816]"
    >
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-[radial-gradient(800px_circle_at_30%_20%,rgba(56,189,248,0.15),transparent_50%),radial-gradient(600px_circle_at_70%_60%,rgba(139,92,246,0.12),transparent_50%)]"
        />
        {!reduced && (
          <div className="absolute inset-0">
            <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0.5, 5], fov: 45 }}>
              <PerspectiveCamera makeDefault position={[0, 0.5, 5]} />
              <ambientLight intensity={0.4} />
              <directionalLight position={[3, 4, 3]} intensity={0.8} />
              <pointLight
                position={[-3, 2, 2]}
                intensity={0.5}
                color="#38BDF8"
              />
              <pointLight
                position={[3, 2, -2]}
                intensity={0.4}
                color="#8B5CF6"
              />
              <Environment preset="night" />
              <HeroScene mousePos={mousePos} />
            </Canvas>
          </div>
        )}
      </div>

      <div className="relative z-10 flex min-h-screen items-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div
              ref={eyebrowRef}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 opacity-0"
            >
              <span className="h-2 w-2 rounded-full bg-[#38BDF8] shadow-[0_0_18px_rgba(56,189,248,0.6)]" />
              Premium consultation
            </div>

            <h1
              ref={titleRef}
              className="mt-6 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl opacity-0"
            >
              <span className="text-white">Transmit your vision.</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-[#8B5CF6] to-[#06B6D4]">
                Receive a cinematic execution plan.
              </span>
            </h1>

            <p
              ref={subtitleRef}
              className="mt-6 max-w-xl text-base leading-7 text-white/70 sm:text-lg opacity-0"
            >
              Guided onboarding for Indian businesses—fast, business-first,
              and conversion-ready. Tell us about your project and receive a
              clear scope and timeline within 24 hours.
            </p>

            <div
              ref={ctaRef}
              className="mt-8 flex flex-wrap gap-4 opacity-0"
            >
              <a
                href="#quote-form"
                className="group inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white shadow-[0_0_0_1px_rgba(255,255,255,0.06)] transition-all duration-200 hover:border-[#38BDF8]/30 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(56,189,248,0.2)]"
              >
                <span>Start Your Project</span>
                <svg
                  className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
              <a
                href="/pricing"
                className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#38BDF8]/20 via-[#8B5CF6]/20 to-[#06B6D4]/20 px-6 py-3 text-sm font-medium text-white shadow-[0_0_30px_rgba(56,189,248,0.15)] transition-all duration-200 hover:from-[#38BDF8]/30 hover:via-[#8B5CF6]/30 hover:to-[#06B6D4]/30"
              >
                View Pricing Packages
              </a>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs uppercase tracking-[0.18em] text-white/50">
                  Response time
                </div>
                <div className="mt-2 text-sm font-semibold text-white">
                  Within 24 hours
                </div>
                <div className="mt-1 text-xs text-white/60">
                  Clear next steps, premium planning.
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs uppercase tracking-[0.18em] text-white/50">
                  Output format
                </div>
                <div className="mt-2 text-sm font-semibold text-white">
                  Timeline + scope document
                </div>
                <div className="mt-1 text-xs text-white/60">
                  Engineering-ready deliverables.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 text-white/40">
          <span className="text-xs uppercase tracking-[0.2em]">
            Scroll to begin
          </span>
          <div className="h-8 w-5 rounded-full border border-white/20 p-1">
            <div className="h-1.5 w-1.5 rounded-full bg-white/60 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}

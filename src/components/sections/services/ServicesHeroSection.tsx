"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, PerspectiveCamera, Float } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";

function HeroScene({ mousePos }: { mousePos: { x: number; y: number } }) {
  const groupRef = useRef<THREE.Group | null>(null);
  const panelRef1 = useRef<THREE.Mesh | null>(null);
  const panelRef2 = useRef<THREE.Mesh | null>(null);
  const panelRef3 = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (!groupRef.current) return;
    const targetRotY = mousePos.x * 0.2;
    const targetRotX = -mousePos.y * 0.15;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.08);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.08);
  }, [mousePos]);

  useEffect(() => {
    const animatePanel = (mesh: THREE.Mesh | null, delay: number) => {
      if (!mesh) return;
      gsap.fromTo(mesh.scale, { x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 1, duration: 1.2, delay, ease: "power3.out" });
    };
    animatePanel(panelRef1.current, 0.3);
    animatePanel(panelRef2.current, 0.5);
    animatePanel(panelRef3.current, 0.7);
  }, []);

  return (
    <group ref={groupRef}>
      <Float speed={1.2} floatIntensity={0.3} rotationIntensity={0.2}>
        <mesh ref={panelRef1} position={[-1.2, 0.3, 0]} rotation={[0, 0.3, 0]}>
          <boxGeometry args={[0.8, 1.1, 0.05]} />
          <meshStandardMaterial color="#38BDF8" metalness={0.9} roughness={0.2} emissive="#38BDF8" emissiveIntensity={0.3} transparent opacity={0.9} />
        </mesh>
      </Float>
      <Float speed={1.5} floatIntensity={0.4} rotationIntensity={0.3}>
        <mesh ref={panelRef2} position={[0, 0, 0.5]} rotation={[0, 0, 0]}>
          <boxGeometry args={[1.0, 1.4, 0.05]} />
          <meshStandardMaterial color="#8B5CF6" metalness={0.9} roughness={0.2} emissive="#8B5CF6" emissiveIntensity={0.3} transparent opacity={0.85} />
        </mesh>
      </Float>
      <Float speed={1.0} floatIntensity={0.25} rotationIntensity={0.15}>
        <mesh ref={panelRef3} position={[1.3, 0.2, 0]} rotation={[0, -0.3, 0]}>
          <boxGeometry args={[0.7, 0.9, 0.05]} />
          <meshStandardMaterial color="#06B6D4" metalness={0.9} roughness={0.2} emissive="#06B6D4" emissiveIntensity={0.3} transparent opacity={0.9} />
        </mesh>
      </Float>
      <mesh position={[0, -0.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6, 6]} />
        <meshStandardMaterial color="#0a0a1a" metalness={0.8} roughness={0.4} />
      </mesh>
    </group>
  );
}

function Hero3DCanvas() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x: nx, y: ny });
    };
    window.addEventListener("pointermove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0.5, 5], fov: 45 }}>
        <PerspectiveCamera makeDefault position={[0, 0.5, 5]} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 4, 3]} intensity={0.8} />
        <pointLight position={[-3, 2, 2]} intensity={0.5} color="#38BDF8" />
        <pointLight position={[3, 2, -2]} intensity={0.4} color="#8B5CF6" />
        <Environment preset="night" />
        <HeroScene mousePos={mousePos} />
      </Canvas>
    </div>
  );
}

export function ServicesHeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });
      tl.fromTo(titleRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" })
        .fromTo(subtitleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.5")
        .fromTo(ctaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.4");
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen overflow-hidden bg-[#050816]">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(800px_circle_at_30%_20%,rgba(56,189,248,0.15),transparent_50%),radial-gradient(600px_circle_at_70%_60%,rgba(139,92,246,0.12),transparent_50%)]" />
        <Hero3DCanvas />
      </div>
      <div className="relative z-10 flex min-h-screen items-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
              <span className="h-2 w-2 rounded-full bg-[#38BDF8] shadow-[0_0_18px_rgba(56,189,248,0.6)]" />
              What we build
            </div>
            <h1 ref={titleRef} className="mt-6 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              <span className="text-white">Premium Digital Experiences</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-[#8B5CF6] to-[#06B6D4]">Built for Modern Businesses</span>
            </h1>
            <p ref={subtitleRef} className="mt-6 max-w-xl text-base leading-7 text-white/70 sm:text-lg">
              From stunning business websites to immersive wedding experiences, we craft premium digital solutions that convert visitors into clients and build lasting brand impressions.
            </p>
            <div ref={ctaRef} className="mt-8 flex flex-wrap gap-4">
              <a href="/custom-quote" className="group inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white shadow-[0_0_0_1px_rgba(255,255,255,0.06)] transition-all duration-200 hover:border-[#38BDF8]/30 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(56,189,248,0.2)]">
                <span>Start Your Project</span>
                <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
              <a href="#services" className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#38BDF8]/20 via-[#8B5CF6]/20 to-[#06B6D4]/20 px-6 py-3 text-sm font-medium text-white shadow-[0_0_30px_rgba(56,189,248,0.15)] transition-all duration-200 hover:from-[#38BDF8]/30 hover:via-[#8B5CF6]/30 hover:to-[#06B6D4]/30">
                Explore Services
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 text-white/40">
          <span className="text-xs uppercase tracking-[0.2em]">Scroll to explore</span>
          <div className="h-8 w-5 rounded-full border border-white/20 p-1">
            <div className="h-1.5 w-1.5 rounded-full bg-white/60 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
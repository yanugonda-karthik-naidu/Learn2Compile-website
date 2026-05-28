'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';

function FloatingWorkspace({ reduced }: { reduced: boolean }) {
  const groupRef = useRef<THREE.Group | null>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current || reduced) return;
    groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.3) * 0.1;
  });

  return (
    <group ref={groupRef}>
      <Float speed={reduced ? 0.8 : 1.4} rotationIntensity={reduced ? 0.1 : 0.25} floatIntensity={reduced ? 0.2 : 0.5}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2.2, 0.08, 1.4]} />
          <meshStandardMaterial color='#0ea5e9' metalness={0.9} roughness={0.15} emissive='#22d3ee' emissiveIntensity={0.15} />
        </mesh>
        <mesh position={[0, 0.22, 0]} rotation={[0.02, 0, 0]}>
          <boxGeometry args={[1.8, 0.04, 1.0]} />
          <meshStandardMaterial color='#8b5cf6' metalness={0.95} roughness={0.1} emissive='#8b5cf6' emissiveIntensity={0.2} />
        </mesh>
        {[...Array(6)].map((_, i) => (
          <mesh key={i} position={[-0.6 + i * 0.24, 0.26, 0]}>
            <boxGeometry args={[0.18, 0.01, 0.8]} />
            <meshStandardMaterial color='#06B6D4' emissive='#06B6D4' emissiveIntensity={0.6} transparent opacity={0.7} />
          </mesh>
        ))}
        <mesh position={[0, 0.42, 0.52]}>
          <boxGeometry args={[1.0, 0.35, 0.02]} />
          <meshStandardMaterial color='#38BDF8' metalness={0.9} roughness={0.2} emissive='#38BDF8' emissiveIntensity={0.3} transparent opacity={0.8} />
        </mesh>
      </Float>
    </group>
  );
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points | null>(null);
  const positions = new Float32Array(320 * 3);
  for (let i = 0; i < 320; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 8;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 5;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
  }

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = clock.elapsedTime * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach='attributes-position' args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color='#38BDF8' transparent opacity={0.6} />
    </points>
  );
}

function Hero3D({ reduced }: { reduced: boolean }) {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0.8, 5], fov: 42 }}>
      <PerspectiveCamera makeDefault position={[0, 0.8, 5]} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[3, 4, 2]} intensity={0.9} />
      <pointLight position={[-3, 2, 2]} intensity={0.4} color='#38BDF8' />
      <pointLight position={[3, 2, -2]} intensity={0.3} color='#8B5CF6' />
      <Environment preset='night' />
      <ParticleField />
      <FloatingWorkspace reduced={reduced} />
    </Canvas>
  );
}

export function AboutHeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (mql) setReduced(mql.matches);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.fromTo(badgeRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' })
        .fromTo(titleRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out' }, '-=0.3')
        .fromTo(subtitleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.5')
        .fromTo(ctaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.4');
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className='relative min-h-screen overflow-hidden bg-[#050816]'>
      <div className='absolute inset-0'>
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(56,189,248,0.12),transparent_60%),radial-gradient(ellipse_at_80%_50%,rgba(139,92,246,0.08),transparent_50%)]' />
        <div className='absolute inset-0' style={{ backgroundImage: 'radial-gradient(rgba(56,189,248,0.15)_1px,transparent_1px)', backgroundSize: '48px_48px' }} />
      </div>
      <div className='relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='grid min-h-screen items-center gap-12 lg:grid-cols-2 lg:gap-16'>
          <div className='flex flex-col justify-center py-24'>
            <div ref={badgeRef} className='inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80'>
              <span className='h-2 w-2 rounded-full bg-[#38BDF8] shadow-[0_0_18px_rgba(56,189,248,0.6)]' />
              Learn2Compile Studio
            </div>
            <h1 ref={titleRef} className='mt-6 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl'>
              <span className='block text-white'>We Build Digital</span>
              <span className='block text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-[#8B5CF6] to-[#06B6D4]'>Experiences That</span>
              <span className='block text-white'>Businesses Remember</span>
            </h1>
            <p ref={subtitleRef} className='mt-6 max-w-xl text-base leading-7 text-white/70 sm:text-lg'>
              A premium Indian digital studio crafting cinematic websites for startups, wedding planners, restaurants, and modern brands. We blend creative engineering with business-first design thinking.
            </p>
            <div ref={ctaRef} className='mt-8 flex flex-wrap gap-4'>
              <a href='/custom-quote' className='group inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white shadow-[0_0_0_1px_rgba(255,255,255,0.06)] transition-all hover:border-[#38BDF8]/30 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(56,189,248,0.2)]'>
                <span>Start Your Project</span>
                <svg className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 8l4 4m0 0l-4 4m4-4H3' /></svg>
              </a>
              <a href='#story' className='inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#38BDF8]/20 via-[#8B5CF6]/20 to-[#06B6D4]/20 px-6 py-3 text-sm font-medium text-white shadow-[0_0_30px_rgba(56,189,248,0.15)] transition-all hover:from-[#38BDF8]/30 hover:via-[#8B5CF6]/30 hover:to-[#06B6D4]/30'>
                Our Story
              </a>
            </div>
          </div>
          <div className='relative hidden h-[500px] lg:block'>
            <div className='absolute inset-0 rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent' />
            <div className='absolute inset-0 rounded-3xl'>
              <Hero3D reduced={reduced} />
            </div>
          </div>
        </div>
      </div>
      <div className='absolute bottom-8 left-1/2 -translate-x-1/2'>
        <div className='flex flex-col items-center gap-2 text-white/40'>
          <span className='text-xs uppercase tracking-[0.2em]'>Scroll to explore</span>
          <div className='h-8 w-5 rounded-full border border-white/20 p-1'>
            <div className='h-1.5 w-1.5 rounded-full bg-white/60 animate-bounce' />
          </div>
        </div>
      </div>
    </section>
  );
}
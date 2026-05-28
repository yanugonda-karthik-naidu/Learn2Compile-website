"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Float, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

function mulberry32(seed: number) {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let x = Math.imul(t ^ (t >>> 15), 1 | t);
    x ^= x + Math.imul(x ^ (x >>> 7), 61 | x);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

function Particles() {
  const count = 520;

  const points = useMemo(() => {
    const rand = mulberry32(1337);
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 1.6 + rand() * 5.0;
      const theta = rand() * Math.PI * 2;
      const y = (rand() - 0.5) * 4.0;
      pos[i * 3 + 0] = Math.cos(theta) * r;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(theta) * r;
    }
    return pos;
  }, []);

  const geomRef = useRef<THREE.BufferGeometry | null>(null);
  const matRef = useRef<THREE.PointsMaterial | null>(null);

  useEffect(() => {
    const geom = geomRef.current;
    const mat = matRef.current;
    if (!geom || !mat) return;

    const posAttr = geom.getAttribute("position") as THREE.BufferAttribute;
    const pos = posAttr.array as Float32Array;

    let raf = 0;
    const t0 = performance.now();

    const tick = () => {
      const t = (performance.now() - t0) * 0.001;

      for (let i = 0; i < pos.length; i += 3) {
        const x = pos[i + 0];
        const y = pos[i + 1];
        const z = pos[i + 2];

        pos[i + 1] = y + Math.sin(t * 0.7 + x * 0.8 + z * 0.5) * 0.002;
        pos[i + 0] = x + Math.cos(t * 0.4 + y * 0.6) * 0.001;
        pos[i + 2] = z + Math.sin(t * 0.45 + x * 0.4) * 0.001;
      }

      posAttr.needsUpdate = true;
      mat.opacity = 0.95;

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <points>
      <bufferGeometry ref={geomRef}>
        <bufferAttribute attach="attributes-position" args={[points, 3]} />
      </bufferGeometry>
      <pointsMaterial ref={matRef} size={0.02} color={"#38BDF8"} transparent opacity={0.9} />
    </points>
  );
}

function HoloLaptop({ reduced }: { reduced: boolean }) {
  return (
    <group position={[0, -0.35, 0]}>
      <Float speed={reduced ? 1.0 : 1.6} rotationIntensity={reduced ? 0.25 : 0.55} floatIntensity={reduced ? 0.4 : 0.8}>
        <mesh>
          <boxGeometry args={[1.6, 0.08, 1.0]} />
          <meshStandardMaterial
            color={"#0ea5e9"}
            metalness={0.9}
            roughness={0.15}
            emissive={"#22d3ee"}
            emissiveIntensity={0.9}
          />
        </mesh>
        <mesh position={[0, 0.28, 0]} rotation={[0.02, 0, 0]}>
          <boxGeometry args={[1.3, 0.02, 0.9]} />
          <meshStandardMaterial
            color={"#a78bfa"}
            metalness={0.95}
            roughness={0.08}
            emissive={"#8b5cf6"}
            emissiveIntensity={0.95}
          />
        </mesh>
        <mesh position={[0, 0.14, 0.32]}>
          <sphereGeometry args={[0.12, 24, 24]} />
          <meshStandardMaterial
            color={"#22d3ee"}
            emissive={"#22d3ee"}
            emissiveIntensity={1.4}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
      </Float>
    </group>
  );
}

export function HeroSection() {
  const [reduced, setReduced] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mql = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mql) return;

    const onChange = () => setReduced(mql.matches);
    onChange();

    if (typeof mql.addEventListener === "function") mql.addEventListener("change", onChange);
    else mql.addListener(onChange);

    return () => {
      if (typeof mql.removeEventListener === "function") mql.removeEventListener("change", onChange);
      else mql.removeListener(onChange);
    };
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      setMouse({ x: nx, y: ny });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const gradient = useMemo(
    () =>
      `radial-gradient(700px circle at 15% 10%, rgba(56,189,248,0.22), transparent 55%),
       radial-gradient(600px circle at 85% 65%, rgba(139,92,246,0.18), transparent 55%),
       linear-gradient(180deg, rgba(255,255,255,0.03), transparent 60%)`,
    []
  );

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[#050816]" />
      <div className="absolute inset-0" style={{ backgroundImage: gradient }} />

      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div
          className="absolute left-1/2 top-0 h-[120%] w-[120%] -translate-x-1/2"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(56,189,248,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(56,189,248,0.08) 1px, transparent 1px)",
            backgroundSize: reduced ? "80px 80px" : "48px 48px",
            transform: `translate3d(${mouse.x * 12}px, ${mouse.y * 8}px, 0)`,
            transition: "transform 200ms ease",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
              <span className="h-2 w-2 rounded-full bg-[#38BDF8] shadow-[0_0_18px_rgba(56,189,248,0.6)]" />
              AI-powered digital studio
            </div>

            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-[#8B5CF6] to-[#06B6D4]">
                We Build Future-Ready
              </span>
              <span className="block">Digital Experiences</span>
            </h1>

            <p className="mt-5 max-w-xl text-pretty text-base leading-7 text-white/70">
              Premium web development engineered with cinematic motion, immersive 3D, and conversion-first performance—crafted
              for teams that move fast and look unforgettable.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/custom-quote"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/10"
              >
                <span className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_var(--x)_50%,rgba(56,189,248,0.35),transparent_55%)]" />
                </span>
                <span className="relative">Start Your Project</span>
                <span className="ml-2 relative transition group-hover:translate-x-1">→</span>
              </a>

              <a
                href="/portfolio"
                className="group inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#38BDF8]/20 via-[#8B5CF6]/20 to-[#06B6D4]/20 px-5 py-3 text-sm font-medium text-white shadow-[0_0_30px_rgba(56,189,248,0.15)] transition hover:from-[#38BDF8]/30 hover:via-[#8B5CF6]/30 hover:to-[#06B6D4]/30"
              >
                View Our Work
              </a>
            </div>
          </div>

          <div className="relative h-[360px] lg:h-[460px]">
            <div className="absolute inset-0 rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-3" />
            <div className="absolute inset-0 rounded-3xl">
              <Canvas dpr={[1, 2]} camera={{ position: [0, 1.4, 5], fov: 45 }} className="!h-full !w-full rounded-3xl">
                <PerspectiveCamera makeDefault position={[0, 1.4, 5]} />
                <ambientLight intensity={0.35} />
                <directionalLight position={[3, 4, 2]} intensity={1.1} />
                <color attach="background" args={["#050816"]} />
                {!reduced && <Environment preset="city" />}
                <Particles />
                <HoloLaptop reduced={reduced} />
              </Canvas>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Float, PerspectiveCamera } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

function Scene({ reduced }: { reduced: boolean }) {
  const ref = useRef<THREE.Group | null>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      setMouse({ x: nx, y: ny });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    const targetRotY = mouse.x * 0.35;
    const targetRotX = -mouse.y * 0.25;
    ref.current.rotation.y = targetRotY;
    ref.current.rotation.x = targetRotX;
  }, [mouse]);

  const config = useMemo(() => {
    return reduced
      ? { dpr: [1, 1], float: 0.9 }
      : { dpr: [1, 2], float: 1.5 };
  }, [reduced]);

  return (
    <Canvas dpr={config.dpr as [number, number]} camera={{ position: [0, 0.9, 4.5], fov: 40 }}>
      <PerspectiveCamera makeDefault position={[0, 0.9, 4.5]} />
      <ambientLight intensity={0.45} />
      <directionalLight position={[2, 3, 2]} intensity={1.0} />
      {!reduced && <Environment preset="studio" />}
      <group ref={ref}>
        <Float speed={config.float} floatIntensity={reduced ? 0.2 : 0.55} rotationIntensity={reduced ? 0.15 : 0.5}>
          <mesh rotation={[0.2, 0.4, 0]}>
            <torusKnotGeometry args={[0.8, 0.28, 220, 28]} />
            <meshStandardMaterial color={"#38BDF8"} metalness={0.9} roughness={0.25} emissive={"#8B5CF6"} emissiveIntensity={0.8} />
          </mesh>

          <mesh position={[1.5, -0.3, 0]} rotation={[0, 0.5, 0]}>
            <boxGeometry args={[0.42, 0.12, 0.22]} />
            <meshStandardMaterial color={"#A78BFA"} metalness={0.95} roughness={0.1} emissive={"#22D3EE"} emissiveIntensity={1.0} />
          </mesh>

          <mesh position={[-1.25, 0.2, -0.1]}>
            <sphereGeometry args={[0.26, 32, 32]} />
            <meshStandardMaterial color={"#22D3EE"} metalness={0.95} roughness={0.15} emissive={"#22D3EE"} emissiveIntensity={1.2} />
          </mesh>
        </Float>
      </group>
    </Canvas>
  );
}

export function Showcase3DSection() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mql) return;
    const apply = () => setReduced(mql.matches);
    apply();
    if (typeof mql.addEventListener === "function") mql.addEventListener("change", apply);
    else mql.addListener(apply);
    return () => {
      if (typeof mql.removeEventListener === "function") mql.removeEventListener("change", apply);
      else mql.removeListener(apply);
    };
  }, []);

  return (
    <section className="relative bg-[#050816] py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
              <span className="h-2 w-2 rounded-full bg-[#38BDF8] shadow-[0_0_18px_rgba(56,189,248,0.6)]" />
              Interactive 3D showcase
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Cinematic environments. Mouse-reactive motion.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-white/70">
            React Three Fiber powered visuals with depth layers, floating project displays, and smooth transitions—built to feel premium on every device.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent">
          <div className="h-[420px] md:h-[520px]">
            <Scene reduced={reduced} />
          </div>

          <div className="pointer-events-none relative -mt-20 px-5 md:px-7">
            <div className="max-w-xl rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <div className="text-xs uppercase tracking-[0.25em] text-white/60">Cinematic depth layers</div>
              <div className="mt-2 text-base font-semibold text-white">
                Interactive objects, clean pacing, and GPU-friendly rendering.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

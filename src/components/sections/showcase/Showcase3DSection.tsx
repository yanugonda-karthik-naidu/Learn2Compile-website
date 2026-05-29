"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { gsap } from "gsap";
import dynamic from "next/dynamic";

// Lazy load the 3D environment with SSR disabled
const StudioEnvironment = dynamic(
  () => import("@/components/3d/environments/StudioEnvironment").then((mod) => mod.StudioEnvironment),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full flex items-center justify-center bg-[#050816]/50 animate-pulse">
        <div className="h-8 w-8 rounded-full border-2 border-[#38BDF8] border-t-transparent animate-spin" />
      </div>
    ),
  }
);

function ShowcaseScene({ reduced }: { reduced: boolean }) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduced || !sceneRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(sceneRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8, delay: 0.3 });
    }, sceneRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <div ref={containerRef} className="h-full w-full">
      <div ref={sceneRef} className="h-full w-full">
        {isVisible && (
          <Suspense
            fallback={
              <div className="h-full w-full flex items-center justify-center bg-[#050816]/50 animate-pulse">
                <div className="h-8 w-8 rounded-full border-2 border-[#38BDF8] border-t-transparent animate-spin" />
              </div>
            }
          >
            <StudioEnvironment
              reduced={reduced}
              className="!h-full !w-full"
              cameraPosition={[0, 1.8, 7]}
              cameraFov={45}
            />
          </Suspense>
        )}
      </div>
    </div>
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
            <ShowcaseScene reduced={reduced} />
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
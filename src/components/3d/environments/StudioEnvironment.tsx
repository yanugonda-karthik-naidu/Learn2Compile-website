"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { WorkstationDesk } from "./WorkstationDesk";
import { StudioLighting } from "./Lighting";

interface StudioEnvironmentProps {
  reduced?: boolean;
  className?: string;
  // STEP 4B: Camera positioned 25% closer for "standing at workstation" feel
  cameraPosition?: [number, number, number];
  cameraFov?: number;
}

function Scene({
  reduced,
  mousePos,
  isMobile,
}: {
  reduced: boolean;
  mousePos: { x: number; y: number };
  isMobile: boolean;
}) {
  return (
    <>
      {/* Volumetric fog for cinematic depth */}
      {!reduced && !isMobile && (
        <fog attach="fog" args={["#050816", 6, 18]} />
      )}
      <StudioLighting reduced={reduced} />
      {/* STEP 1: Only desk + keyboard foundation - particles and light rays disabled */}
      <WorkstationDesk reduced={reduced} mousePos={mousePos} isMobile={isMobile} />
    </>
  );
}

export function StudioEnvironment({
  reduced = false,
  className,
  // STEP 4B: Camera 25% closer - user feels "at" workstation not "looking at" it
  cameraPosition = [0, 1.5, 5.5],
  cameraFov = 50,
}: StudioEnvironmentProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const lastMouseUpdateRef = useRef<number>(0);

  // Detect mobile on mount - use RAF to defer synchronous setState
  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      setIsMobile(window.innerWidth < 640);
    });
    const handleResize = () => {
      if (frameId) cancelAnimationFrame(frameId);
      requestAnimationFrame(() => {
        setIsMobile(window.innerWidth < 640);
      });
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Visibility-based pause for canvas
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // Throttled mouse tracking (~60fps max)
  const handleMouseMove = useCallback((e: PointerEvent) => {
    const now = performance.now();
    if (now - lastMouseUpdateRef.current < 16) return; // ~60fps throttle
    lastMouseUpdateRef.current = now;

    const nx = (e.clientX / window.innerWidth) * 2 - 1;
    const ny = (e.clientY / window.innerHeight) * 2 - 1;
    setMousePos({ x: nx, y: ny });
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    window.addEventListener("pointermove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMouseMove);
  }, [handleMouseMove, isVisible]);

  // Device-tier-based DPR for mobile optimization
  const getDpr = useCallback((): [number, number] => {
    if (typeof window === "undefined") return [1, 1];
    if (reduced) return [1, 1];
    const width = window.innerWidth;
    if (width < 640) return [1, 1]; // Mobile: lower DPR
    if (width < 1024) return [1, 1.25]; // Tablet: medium DPR
    return [1, 1.5]; // Desktop: full DPR
  }, [reduced]);

  return (
    <div className={className}>
      <Canvas
        dpr={getDpr()}
        camera={{ position: cameraPosition, fov: cameraFov }}
        frameloop={isVisible ? "always" : "never"}
      >
        <PerspectiveCamera
          makeDefault
          position={cameraPosition}
          fov={cameraFov}
          near={0.1}
          far={100}
        />
        <color attach="background" args={["#050816"]} />
        <Scene reduced={reduced} mousePos={mousePos} isMobile={isMobile} />
      </Canvas>
    </div>
  );
}
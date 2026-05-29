"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";


export function CinematicAIEntity({
  reduced,
  isMobile,
  mousePos,
  ctaHover,
}: {
  reduced: boolean;
  isMobile: boolean;
  mousePos: { x: number; y: number };
  ctaHover: boolean;
}) {
  const groupRef = useRef<THREE.Group | null>(null);

  // Base subtle pulse (18–35s, cinematic & restrained)
  const basePhaseRef = useRef(0);

  // Keep values in refs to avoid re-render churn
  const coreIntensityRef = useRef(0.18);
  const glowIntensityRef = useRef(0.22);

  const materials = useMemo(() => {
    const nodeMat = new THREE.MeshBasicMaterial({
      color: "#38BDF8",
      transparent: true,
      opacity: 0.22,
      depthWrite: false,
    });

    const violetMat = new THREE.MeshBasicMaterial({
      color: "#8B5CF6",
      transparent: true,
      opacity: 0.18,
      depthWrite: false,
    });

    const wireMat = new THREE.MeshBasicMaterial({
      color: "#E8F4FF",
      transparent: true,
      opacity: 0.18,
      depthWrite: false,
    });

    const ringMat = new THREE.MeshBasicMaterial({
      color: "#06B6D4",
      transparent: true,
      opacity: 0.2,
      depthWrite: false,
    });

    return { nodeMat, violetMat, wireMat, ringMat };
  }, []);

  // If the DOM indicates reduced environment, keep it static.
  useEffect(() => {
    basePhaseRef.current = 0;
  }, [reduced, isMobile]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    if (reduced) return;

    const t = clock.elapsedTime;

    // 18–35s preferred: choose around 24s with slight drift.
    const breathPeriod = isMobile ? 26 : 24;


    // CTA hover: no orientation changes; only subtle glow/intensity + slightly slower breathing.
    const hoverBoost = ctaHover ? 0.12 : 0;
    const breathingSlowFactor = ctaHover ? 0.93 : 1.0; // slightly slow

    const effectiveSlowBreath = (Math.sin(t * (Math.PI * 2) / (breathPeriod / breathingSlowFactor)) + 1) / 2;

    const targetCore = 0.12 + effectiveSlowBreath * (0.10 + hoverBoost);
    const targetGlow = 0.16 + effectiveSlowBreath * (0.10 + hoverBoost * 0.6);

    coreIntensityRef.current = THREE.MathUtils.lerp(coreIntensityRef.current, targetCore, 0.03);
    glowIntensityRef.current = THREE.MathUtils.lerp(glowIntensityRef.current, targetGlow, 0.03);

    // Very restrained "integration" motion: micro vertical breathe and faint ring wobble.
    // No cursor chasing.
    groupRef.current.position.y = 0.02 * (effectiveSlowBreath - 0.5);
    groupRef.current.rotation.z = 0.015 * (effectiveSlowBreath - 0.5);

    // Geometry-level sync: adjust ring & wire opacities.
    groupRef.current.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      const mat = mesh.material as THREE.MeshBasicMaterial | THREE.MeshBasicMaterial[] | undefined;
      if (!mat) return;

      const apply = (m: THREE.MeshBasicMaterial) => {
        if (mesh.name === "core") {
          m.opacity = THREE.MathUtils.clamp(coreIntensityRef.current, 0.06, 0.38);
        } else if (mesh.name === "ring") {
          m.opacity = THREE.MathUtils.clamp(glowIntensityRef.current, 0.05, 0.36);
        } else if (mesh.name === "wire") {
          // Keep wire lower so workstation remains dominant.
          m.opacity = THREE.MathUtils.clamp(
            0.09 + effectiveSlowBreath * 0.12 + (ctaHover ? 0.02 : 0),
            0.05,
            0.28
          );
        }
      };

      if (Array.isArray(mat)) mat.forEach(apply);
      else apply(mat);
    });

    // Tiny cursor coupling (emotionally aware but not chasing): slight lateral phase shift.
    // Upper-right region influence: based on cursor position (normalized -1..1).
    const cursorCouple = THREE.MathUtils.clamp(mousePos.x * 0.05 - mousePos.y * 0.02, -0.05, 0.05);
    groupRef.current.position.x = cursorCouple;
  });

  // Static fallback for reduced
  const fallbackOpacity = reduced ? 0.08 : 0.22;

  return (
    <group ref={groupRef} position={[1.55, 0.58, -0.78]}>
      {/* Triangular holographic frame */}
      <group name="frame" position={[0, 0, 0]}>
        <mesh name="wire" position={[0, 0.02, 0]}>
          <cylinderGeometry args={[0.0, 0.34, 0.34, 3, 1]} />
          <meshBasicMaterial
            attach="material"
            color="#8B5CF6"
            transparent
            opacity={fallbackOpacity}
            depthWrite={false}
          />
        </mesh>

        {/* Layered rings */}
        <mesh name="ring" rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <ringGeometry args={[0.18, 0.205, 48]} />
          <primitive object={materials.ringMat} />
        </mesh>

        <mesh name="ring" rotation={[Math.PI / 2, 0, Math.PI / 10]} position={[0, 0, 0]}>
          <ringGeometry args={[0.235, 0.255, 48]} />
          <primitive object={materials.violetMat} />
        </mesh>

        <mesh name="ring" rotation={[Math.PI / 2, 0, -Math.PI / 14]} position={[0, 0.01, 0]}>
          <ringGeometry args={[0.29, 0.31, 48]} />
          <primitive object={materials.nodeMat} />
        </mesh>
      </group>

      {/* Hexagonal node */}
      <mesh name="core" position={[0, 0.03, 0.02]}>
        <cylinderGeometry args={[0.10, 0.10, 0.02, 6]} />
        <meshBasicMaterial
          color="#38BDF8"
          transparent
          opacity={fallbackOpacity}
          depthWrite={false}
        />
      </mesh>

      {/* Subtle energy core bar (geometric, not orb/pet) */}
      <mesh name="wire" position={[0, -0.02, 0.02]} rotation={[0, 0, Math.PI / 6]}>
        <boxGeometry args={[0.14, 0.012, 0.012]} />
        <meshBasicMaterial color="#06B6D4" transparent opacity={fallbackOpacity * 0.85} depthWrite={false} />
      </mesh>
    </group>
  );
}


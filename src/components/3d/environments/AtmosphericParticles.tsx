"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface AtmosphericParticlesProps {
  count?: number;
  reduced?: boolean;
  isMobile?: boolean;
}

function seededRandom(seed: number) {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let x = Math.imul(t ^ (t >>> 15), 1 | t);
    x ^= x + Math.imul(x ^ (x >>> 7), 61 | x);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

// Multi-layer particle system for atmospheric depth
interface ParticleLayer {
  positions: Float32Array;
  count: number;
  size: number;
  opacity: number;
  rotationSpeed: { x: number; y: number };
  driftAmplitude: number;
  color: string;
}

function createParticleLayers(effectiveCount: number, seed: number): ParticleLayer[] {
  const rand = seededRandom(seed);

  // Background layer - tiny, slow, very low opacity (cinematic restraint)
  const bgCount = Math.floor(effectiveCount * 0.4);
  const bgPos = new Float32Array(bgCount * 3);
  for (let i = 0; i < bgCount; i++) {
    bgPos[i * 3 + 0] = (rand() - 0.5) * 12;
    bgPos[i * 3 + 1] = (rand() - 0.5) * 8;
    bgPos[i * 3 + 2] = (rand() - 0.5) * 6;
  }

  // Midground layer - medium size, moderate behavior
  const mgCount = Math.floor(effectiveCount * 0.4);
  const mgPos = new Float32Array(mgCount * 3);
  for (let i = 0; i < mgCount; i++) {
    mgPos[i * 3 + 0] = (rand() - 0.5) * 10;
    mgPos[i * 3 + 1] = (rand() - 0.5) * 6;
    mgPos[i * 3 + 2] = (rand() - 0.5) * 5;
  }

  // Foreground layer - larger, more visible, subtle drift
  const fgCount = Math.floor(effectiveCount * 0.2);
  const fgPos = new Float32Array(fgCount * 3);
  for (let i = 0; i < fgCount; i++) {
    fgPos[i * 3 + 0] = (rand() - 0.5) * 8;
    fgPos[i * 3 + 1] = (rand() - 0.5) * 4;
    fgPos[i * 3 + 2] = (rand() - 0.5) * 3;
  }

  return [
    {
      positions: bgPos,
      count: bgCount,
      size: 0.006,
      opacity: 0.12, // Cinematic restraint: 0.08-0.18
      rotationSpeed: { x: 0.004, y: 0.008 },
      driftAmplitude: 0.012,
      color: "#38BDF8",
    },
    {
      positions: mgPos,
      count: mgCount,
      size: 0.012,
      opacity: 0.15,
      rotationSpeed: { x: 0.006, y: 0.012 },
      driftAmplitude: 0.015,
      color: "#38BDF8",
    },
    {
      positions: fgPos,
      count: fgCount,
      size: 0.025,
      opacity: 0.1,
      rotationSpeed: { x: 0.008, y: 0.015 },
      driftAmplitude: 0.02,
      color: "#8B5CF6",
    },
  ];
}

function ParticleLayerComponent({
  layer,
  reduced,
  layerRef,
}: {
  layer: ParticleLayer;
  reduced: boolean;
  layerRef: React.MutableRefObject<THREE.Points | null>;
}) {
  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(layer.positions.slice(), 3));
    return geom;
  }, [layer.positions]);

  const material = useMemo(() => {
    return new THREE.PointsMaterial({
      size: reduced ? layer.size * 0.7 : layer.size,
      color: layer.color,
      transparent: true,
      opacity: reduced ? layer.opacity * 0.4 : layer.opacity,
      sizeAttenuation: true,
    });
  }, [reduced, layer.size, layer.opacity, layer.color]);

  return <points ref={layerRef} geometry={geometry} material={material} />;
}

export function AtmosphericParticles({
  count = 35, // Reduced from 50 for cinematic restraint
  reduced = false,
  isMobile = false,
}: AtmosphericParticlesProps) {
  const layer1Ref = useRef<THREE.Points | null>(null);
  const layer2Ref = useRef<THREE.Points | null>(null);
  const layer3Ref = useRef<THREE.Points | null>(null);

  // Reduce particle count on mobile for GPU optimization
  // Desktop: 30-40, Mobile: 8-12 (cinematic restraint per spec)
  const effectiveCount = useMemo(() => {
    if (isMobile) return Math.floor(count / 3); // ~8-12 particles on mobile
    return Math.floor(count); // ~30-35 on desktop
  }, [count, isMobile]);

  const layers = useMemo(
    () => createParticleLayers(effectiveCount, 2024),
    [effectiveCount]
  );

  useFrame(({ clock }) => {
    if (reduced) return;
    const t = clock.elapsedTime;

    // Background layer - slowest rotation (12-30 second cycles per spec)
    if (layer1Ref.current) {
      layer1Ref.current.rotation.y = t * layers[0].rotationSpeed.y;
      layer1Ref.current.rotation.x = Math.sin(t * layers[0].rotationSpeed.x) * 0.03;
    }

    // Midground layer
    if (layer2Ref.current) {
      layer2Ref.current.rotation.y = t * layers[1].rotationSpeed.y;
      layer2Ref.current.rotation.x = Math.sin(t * layers[1].rotationSpeed.x) * 0.05;
    }

    // Foreground layer - slightly faster, with subtle drift
    if (layer3Ref.current) {
      layer3Ref.current.rotation.y = t * layers[2].rotationSpeed.y;
      layer3Ref.current.rotation.x = Math.sin(t * layers[2].rotationSpeed.x * 0.5) * 0.08;
      // Subtle position drift for foreground (8-20 second cycles)
      layer3Ref.current.position.y = Math.sin(t * 0.25) * layers[2].driftAmplitude;
    }
  });

  return (
    <>
      <ParticleLayerComponent layer={layers[0]} reduced={reduced} layerRef={layer1Ref} />
      <ParticleLayerComponent layer={layers[1]} reduced={reduced} layerRef={layer2Ref} />
      <ParticleLayerComponent layer={layers[2]} reduced={reduced} layerRef={layer3Ref} />
    </>
  );
}
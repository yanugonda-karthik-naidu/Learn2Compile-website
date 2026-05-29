"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

interface FaqEnvironmentProps {
  reduced?: boolean;
  className?: string;
}

function HolographicPanel({
  position,
  rotation,
  size,
  color,
  delay,
  reduced,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  size: [number, number, number];
  color: string;
  delay: number;
  reduced: boolean;
}) {
  const meshRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (!meshRef.current || reduced) return;
    gsap.fromTo(
      meshRef.current.scale,
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 1, z: 1, duration: 1.0, delay, ease: "power3.out" }
    );
  }, [reduced, delay]);

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={color}
        metalness={0.9}
        roughness={0.1}
        emissive={color}
        emissiveIntensity={reduced ? 0.08 : 0.12}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
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

function FaqParticles({ count, reduced }: { count: number; reduced: boolean }) {
  const pointsRef = useRef<THREE.Points | null>(null);

  const initialPositions = useMemo(() => {
    const rand = seededRandom(2024);
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (rand() - 0.5) * 8;
      pos[i * 3 + 1] = (rand() - 0.5) * 5;
      pos[i * 3 + 2] = (rand() - 0.5) * 4;
    }
    return pos;
  }, [count]);

  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(initialPositions, 3));
    return geom;
  }, [initialPositions]);

  const material = useMemo(() => {
    return new THREE.PointsMaterial({
      size: reduced ? 0.012 : 0.018,
      color: "#38BDF8",
      transparent: true,
      opacity: reduced ? 0.2 : 0.3,
      sizeAttenuation: true,
    });
  }, [reduced]);

  // Use R3F useFrame instead of manual requestAnimationFrame
  useFrame(({ clock }) => {
    if (!pointsRef.current || reduced) return;
    pointsRef.current.rotation.y = clock.elapsedTime * 0.02;
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}

function FaqLighting({ reduced }: { reduced: boolean }) {
  return (
    <>
      <ambientLight intensity={reduced ? 0.2 : 0.3} />
      <directionalLight position={[3, 4, 2]} intensity={reduced ? 0.6 : 0.8} castShadow={false} />
      <pointLight position={[-2, 1.5, 2]} intensity={reduced ? 0.25 : 0.4} color="#38BDF8" distance={7} decay={2} />
      <pointLight position={[2, 1.5, -1]} intensity={reduced ? 0.2 : 0.3} color="#8B5CF6" distance={7} decay={2} />
    </>
  );
}

function Scene({ reduced }: { reduced: boolean }) {
  return (
    <>
      <FaqLighting reduced={reduced} />
      {!reduced && <FaqParticles count={35} reduced={reduced} />}
      <Float speed={0.7} rotationIntensity={0.06} floatIntensity={0.2}>
        <group position={[0, -0.2, 0]}>
          <HolographicPanel
            position={[0, 0.3, 0]}
            rotation={[0, 0, 0]}
            size={[1.4, 0.8, 0.015]}
            color="#38BDF8"
            delay={0.2}
            reduced={reduced}
          />
          <HolographicPanel
            position={[-1.1, 0.1, 0.3]}
            rotation={[0, 0.3, 0]}
            size={[0.7, 0.45, 0.015]}
            color="#8B5CF6"
            delay={0.4}
            reduced={reduced}
          />
          <HolographicPanel
            position={[1.15, 0.15, 0.25]}
            rotation={[0, -0.25, 0]}
            size={[0.6, 0.4, 0.015]}
            color="#06B6D4"
            delay={0.55}
            reduced={reduced}
          />
        </group>
      </Float>
    </>
  );
}

export function FaqEnvironment({ reduced = false, className }: FaqEnvironmentProps) {
  const [isVisible, setIsVisible] = useState(true);

  // Visibility-based pause for canvas
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  return (
    <div className={className}>
      <Canvas
        dpr={[1, 1]}
        camera={{ position: [0, 0.5, 4.5], fov: 45 }}
        frameloop={isVisible ? "always" : "never"}
      >
        <PerspectiveCamera makeDefault position={[0, 0.5, 4.5]} fov={45} />
        <color attach="background" args={["#050816"]} />
        <Scene reduced={reduced} />
      </Canvas>
    </div>
  );
}
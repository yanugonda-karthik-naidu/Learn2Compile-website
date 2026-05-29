"use client";

import { useRef, useEffect, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";
import { HolographicSystems } from "./HolographicSystems";
import { CinematicAIEntity } from "./CinematicAIEntity";

interface WorkstationDeskProps {
  reduced?: boolean;
  mousePos?: { x: number; y: number };
  isMobile?: boolean;
}

// ============================================================================
// PREMIUM MATTE BLACK DESK
// ============================================================================
function PremiumDesk({
  reduced,
  mousePos,
  isMobile,
}: {
  reduced: boolean;
  mousePos: { x: number; y: number };
  isMobile: boolean;
}) {
  const deskRef = useRef<THREE.Group | null>(null);
  const targetPosX = useRef(0);
  const targetPosZ = useRef(0);
  const [underglowIntensity, setUnderglowIntensity] = useState(0.025);
  const breathPhase = useRef(0);

  useEffect(() => {
    if (!deskRef.current || reduced) return;
    gsap.fromTo(
      deskRef.current.scale,
      { y: 0 },
      { y: 1, duration: 1.0, delay: 0.2, ease: "power3.out" }
    );
  }, [reduced]);

  // Premium desk parallax (10-20px range converted to 3D units)
  useFrame(({ clock }) => {
    if (!deskRef.current || reduced) return;

    // Subtle desk parallax - very restrained
    const parallaxX = isMobile ? 0.008 : 0.015;
    const parallaxZ = isMobile ? 0.005 : 0.008;

    targetPosX.current = THREE.MathUtils.lerp(
      targetPosX.current,
      mousePos.x * parallaxX,
      0.025
    );
    targetPosZ.current = THREE.MathUtils.lerp(
      targetPosZ.current,
      mousePos.y * parallaxZ,
      0.025
    );

    deskRef.current.position.x = targetPosX.current;
    deskRef.current.position.z = targetPosZ.current;

    // Ambient breathing - 18-25 second cycles for premium feel
    breathPhase.current = clock.elapsedTime * 0.04;
    const breathValue = Math.sin(breathPhase.current) * 0.008 + 0.025;
    const targetIntensity = THREE.MathUtils.lerp(
      underglowIntensity,
      breathValue,
      0.02
    );
    if (Math.abs(targetIntensity - underglowIntensity) > 0.001) {
      setUnderglowIntensity(targetIntensity);
    }
  });

  return (
    <group ref={deskRef} scale={[1, 0, 1]}>
      {/* Main desk surface - matte black, extends beyond viewport */}
      {/* STEP 4B: Scale upgraded from 7x2.4 to 8x3 for 35-45% visual weight */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[8, 0.1, 3]} />
        <meshStandardMaterial
          color="#0a1020"
          metalness={0.85}
          roughness={0.22}
          envMapIntensity={0.5}
        />
      </mesh>

      {/* STEP 4B: Recessed monitor support zone - engineering panel aesthetic */}
      <mesh position={[0, 0.051, -0.5]}>
        <boxGeometry args={[3.5, 0.01, 0.6]} />
        <meshStandardMaterial
          color="#080c18"
          metalness={0.75}
          roughness={0.35}
        />
      </mesh>

      {/* Desk front edge - beveled appearance */}
      <mesh position={[0, -0.08, 1.45]}>
        <boxGeometry args={[8, 0.06, 0.08]} />
        <meshStandardMaterial
          color="#05070d"
          metalness={0.8}
          roughness={0.28}
        />
      </mesh>

      {/* Desk left edge */}
      <mesh position={[-3.95, -0.08, 0]}>
        <boxGeometry args={[0.08, 0.06, 3]} />
        <meshStandardMaterial
          color="#05070d"
          metalness={0.8}
          roughness={0.28}
        />
      </mesh>

      {/* Desk right edge */}
      <mesh position={[3.95, -0.08, 0]}>
        <boxGeometry args={[0.08, 0.06, 3]} />
        <meshStandardMaterial
          color="#05070d"
          metalness={0.8}
          roughness={0.28}
        />
      </mesh>

      {/* STEP 4B: Premium desk underglow - enhanced for depth */}
      <mesh position={[0, -0.18, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[7.8, 2.8]} />
        <meshBasicMaterial
          color="#06B6D4"
          transparent
          opacity={underglowIntensity}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* STEP 4B: Subtle engineering groove patterns on desk surface */}
      <mesh position={[-2.5, 0.051, 0.8]}>
        <boxGeometry args={[0.008, 0.005, 1.2]} />
        <meshStandardMaterial color="#121a2a" metalness={0.9} roughness={0.15} />
      </mesh>
      <mesh position={[2.5, 0.051, 0.8]}>
        <boxGeometry args={[0.008, 0.005, 1.2]} />
        <meshStandardMaterial color="#121a2a" metalness={0.9} roughness={0.15} />
      </mesh>
    </group>
  );
}

// ============================================================================
// MECHANICAL KEYBOARD (CENTERPIECE - DOMINATES HERO)
// STEP 2: Premium keyboard interaction with reactive lighting
// ============================================================================
function CinematicKeyboard({
  reduced,
  mousePos,
  isMobile,
}: {
  reduced: boolean;
  mousePos: { x: number; y: number };
  isMobile: boolean;
}) {
  const groupRef = useRef<THREE.Group | null>(null);
  const keysGroupRef = useRef<THREE.Group | null>(null);
  const targetRotY = useRef(0);
  const targetRotX = useRef(0);
  const [isKeysRevealed, setIsKeysRevealed] = useState(false);
  const [keyIntensities, setKeyIntensities] = useState<number[]>([]);

  // Keyboard colors - premium dark engineering tones
  const baseColor = "#0b1220";
  const accentCyan = "#38BDF8";
  const accentViolet = "#8B5CF6";
  const accentDeepBlue = "#0ea5e9";

  // Key configuration - STEP 4B: Larger keyboard dominates hero
  const keyRows = 5;
  const keyCols = 14;
  const keyWidth = 0.2;
  const keyHeight = 0.03;
  const keyDepth = 0.12;
  const keyGap = 0.035;

  // Cursor influence tracking - premium and restrained
  const cursorInfluenceX = useRef(0);
  const cursorInfluenceZ = useRef(0);
  const breathPhase = useRef(0);
  const [accentBarIntensity, setAccentBarIntensity] = useState(0.25);

  // Create individual key components with zone data
  const keys = useMemo(() => {
    const keyElements = [];
    const startX = -((keyCols - 1) * (keyWidth + keyGap)) / 2;
    const startZ = -0.22;

    for (let row = 0; row < keyRows; row++) {
      for (let col = 0; col < keyCols; col++) {
        const x = startX + col * (keyWidth + keyGap);
        const z = startZ + row * (keyDepth + keyGap);

        // Zone-based accent pattern
        const isAccent =
          (row === 0 && (col === 0 || col === keyCols - 1)) ||
          (row === 2 && col === keyCols - 1) ||
          (row === 4 && col === Math.floor(keyCols / 2));

        // Different zones react differently
        const zoneType =
          row === 4 ? "spacebar" : row < 2 ? "top" : row >= 3 ? "bottom" : "middle";

        keyElements.push({
          position: [x, 0.06, z] as [number, number, number],
          isAccent,
          accentColor: isAccent ? (col % 2 === 0 ? accentCyan : accentViolet) : null,
          zoneType,
          localX: x,
          localZ: z,
        });
      }
    }
    return keyElements;
  }, [accentCyan, accentViolet]);

  // Initialize key intensities
  useEffect(() => {
    if (!keysGroupRef.current || reduced) return;
    gsap.fromTo(
      keysGroupRef.current.scale,
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 1, z: 1, duration: 0.8, delay: 0.4, ease: "power3.out" }
    );
    setIsKeysRevealed(true);
    // Initialize all intensities to base value
    setKeyIntensities(keys.map(() => 0.02));
  }, [reduced, keys]);

  // Premium keyboard interaction with cursor influence
  useFrame(({ clock }) => {
    if (!groupRef.current || reduced) return;

    // Maximum rotation: 2-4 degrees (0.035-0.07 radians) - premium and calm
    const maxRot = isMobile ? 0.025 : 0.035;
    const lerpFactor = isMobile ? 0.02 : 0.03;

    // Smooth cursor influence tracking
    cursorInfluenceX.current = THREE.MathUtils.lerp(
      cursorInfluenceX.current,
      mousePos.x * 0.5,
      0.04
    );
    cursorInfluenceZ.current = THREE.MathUtils.lerp(
      cursorInfluenceZ.current,
      mousePos.y * 0.3,
      0.04
    );

    // Keyboard micro-rotation - premium hardware feel
    targetRotY.current = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      THREE.MathUtils.clamp(cursorInfluenceX.current * maxRot, -maxRot, maxRot),
      lerpFactor
    );
    targetRotX.current = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      THREE.MathUtils.clamp(-cursorInfluenceZ.current * maxRot * 0.4, -maxRot * 0.3, maxRot * 0.3),
      lerpFactor
    );

    groupRef.current.rotation.y = targetRotY.current;
    groupRef.current.rotation.x = targetRotX.current;

    // Ambient breathing - 20-28 second cycles for premium atmosphere
    breathPhase.current = clock.elapsedTime * 0.035;
    const breathValue = Math.sin(breathPhase.current) * 0.015 + 0.25;

    // Calculate localized key illumination based on cursor position
    setKeyIntensities((prev) => {
      if (prev.length !== keys.length) return prev;
      return keys.map((key, i) => {
        // Distance from cursor influence center
        const dx = key.localX - cursorInfluenceX.current * 2;
        const dz = key.localZ - cursorInfluenceZ.current * 1.5;
        const distance = Math.sqrt(dx * dx + dz * dz);

        // Zone-based response strength
        let zoneMultiplier = 1.0;
        if (key.zoneType === "spacebar") zoneMultiplier = 0.6;
        else if (key.zoneType === "top") zoneMultiplier = 1.2;
        else if (key.zoneType === "bottom") zoneMultiplier = 0.8;

        // Soft cursor influence - nearby keys glow softly
        const cursorGlow = Math.max(0, 1 - distance * 2.5) * 0.15 * zoneMultiplier;

        // Breathing ambient - different zones breathe at slightly different phases
        const zoneBreathPhase = breathPhase.current + (key.zoneType === "middle" ? 0.5 : 0);
        const ambientBreath = Math.sin(zoneBreathPhase) * 0.008 + 0.02;

        // Base + accent keys have stronger response
        const accentBoost = key.isAccent ? 0.05 : 0;

        // Smooth transition to target (0.4-0.6s easing via lerp)
        const targetIntensity = breathValue * 0.1 + cursorGlow + ambientBreath + accentBoost;
        return THREE.MathUtils.lerp(prev[i] || 0, targetIntensity, 0.08);
      });
    });

    // Accent bar breathing with cursor influence
    const accentTarget = 0.25 + Math.abs(cursorInfluenceX.current) * 0.08 + Math.sin(breathPhase.current) * 0.03;
    const newAccentIntensity = THREE.MathUtils.lerp(accentBarIntensity, accentTarget, 0.03);
    if (Math.abs(newAccentIntensity - accentBarIntensity) > 0.002) {
      setAccentBarIntensity(newAccentIntensity);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.14, 0.2]}>
      <group ref={keysGroupRef} scale={isKeysRevealed ? [1, 1, 1] : [0, 0, 0]}>
        {/* Keyboard base - STEP 4B: Larger to dominate hero with premium reflections */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[3.2, 0.06, 0.85]} />
          <meshStandardMaterial
            color={baseColor}
            metalness={0.92}
            roughness={0.12}
            envMapIntensity={0.6}
          />
        </mesh>

        {/* STEP 4B: Premium machining grooves on keyboard base */}
        <mesh position={[0, 0.031, 0.35]}>
          <boxGeometry args={[2.8, 0.003, 0.006]} />
          <meshStandardMaterial color="#151f30" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, 0.031, -0.35]}>
          <boxGeometry args={[2.8, 0.003, 0.006]} />
          <meshStandardMaterial color="#151f30" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Keys - premium mechanical feel with localized illumination */}
        {keys.map((key, i) => (
          <mesh key={i} position={key.position}>
            <boxGeometry args={[keyWidth, keyHeight, keyDepth]} />
            <meshStandardMaterial
              color={key.isAccent ? "#111827" : "#141d2d"}
              metalness={0.88}
              roughness={0.18}
              emissive={key.accentColor || accentDeepBlue}
              emissiveIntensity={keyIntensities[i] || 0.02}
              transparent
              opacity={key.isAccent ? 0.95 : 0.88}
            />
          </mesh>
        ))}

        {/* Premium cyan accent bar with breathing */}
        <mesh position={[0, 0.045, -0.43]}>
          <planeGeometry args={[2.8, 0.014]} />
          <meshBasicMaterial
            color={accentCyan}
            transparent
            opacity={accentBarIntensity}
          />
        </mesh>
      </group>
    </group>
  );
}

// ============================================================================
// STEP 4B: SIGNATURE STUDIO DISPLAY - Premium Ultra-Wide Product Preview
// The signature visual element - communicates "We build products"
// ============================================================================
function SignatureStudioDisplay({
  reduced,
  ctaHover,
}: {
  reduced: boolean;
  ctaHover: boolean;
}) {
  const groupRef = useRef<THREE.Group | null>(null);
  const [displayState, setDisplayState] = useState(0);
  const [opacity, setOpacity] = useState(0.18);
  const [wireframeOpacity, setWireframeOpacity] = useState(0.15);

  // Display states: 0=Wireframe, 1=UI Preview, 2=Dev Interface, 3=Deploy Success
  const stateChangeRef = useRef(0);

  useFrame(({ clock }) => {
    if (!groupRef.current || reduced) return;

    // Slow state cycling - 20 second total cycle
    const newState = Math.floor((clock.elapsedTime * 0.05) % 4);
    if (newState !== stateChangeRef.current) {
      stateChangeRef.current = newState;
      setDisplayState(newState);
    }

    // Breathing opacity - 15-20 second cycle
    const breathValue = Math.sin(clock.elapsedTime * 0.045) * 0.04 + 0.18;
    setOpacity(breathValue);

    // CTA hover response - subtle brightness increase
    const hoverBoost = ctaHover ? 0.05 : 0;
    setWireframeOpacity(breathValue - 0.03 + hoverBoost);
  });

  return (
    <group ref={groupRef} position={[0, 0.65, -0.35]}>
      {/* Premium ultra-wide display frame - Apple Studio Display aesthetic */}
      <mesh position={[0, 0, -0.01]}>
        <boxGeometry args={[2.4, 0.42, 0.04]} />
        <meshStandardMaterial color="#0c1220" metalness={0.88} roughness={0.15} />
      </mesh>

      {/* Display inner bezel */}
      <mesh position={[0, 0, 0.005]}>
        <boxGeometry args={[2.25, 0.32, 0.03]} />
        <meshStandardMaterial color="#060a14" metalness={0.92} roughness={0.08} />
      </mesh>

      {/* Display screen area */}
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[2.15, 0.28]} />
        <meshBasicMaterial color="#030609" transparent opacity={0.95} />
      </mesh>

      {/* State 0: Website Wireframe - cyan grid lines */}
      {displayState === 0 && (
        <group>
          {/* Grid lines - horizontal */}
          <mesh position={[0, 0.1, 0.03]}>
            <planeGeometry args={[1.8, 0.002]} />
            <meshBasicMaterial color="#38BDF8" transparent opacity={wireframeOpacity} />
          </mesh>
          <mesh position={[0, 0.05, 0.03]}>
            <planeGeometry args={[1.8, 0.002]} />
            <meshBasicMaterial color="#38BDF8" transparent opacity={wireframeOpacity} />
          </mesh>
          <mesh position={[0, 0, 0.03]}>
            <planeGeometry args={[1.8, 0.002]} />
            <meshBasicMaterial color="#38BDF8" transparent opacity={wireframeOpacity} />
          </mesh>
          <mesh position={[0, -0.05, 0.03]}>
            <planeGeometry args={[1.8, 0.002]} />
            <meshBasicMaterial color="#38BDF8" transparent opacity={wireframeOpacity} />
          </mesh>
          <mesh position={[0, -0.1, 0.03]}>
            <planeGeometry args={[1.8, 0.002]} />
            <meshBasicMaterial color="#38BDF8" transparent opacity={wireframeOpacity} />
          </mesh>
          {/* Grid lines - vertical */}
          <mesh position={[-0.6, 0, 0.03]}>
            <planeGeometry args={[0.002, 0.24]} />
            <meshBasicMaterial color="#38BDF8" transparent opacity={wireframeOpacity} />
          </mesh>
          <mesh position={[-0.3, 0, 0.03]}>
            <planeGeometry args={[0.002, 0.24]} />
            <meshBasicMaterial color="#38BDF8" transparent opacity={wireframeOpacity} />
          </mesh>
          <mesh position={[0, 0, 0.03]}>
            <planeGeometry args={[0.002, 0.24]} />
            <meshBasicMaterial color="#38BDF8" transparent opacity={wireframeOpacity} />
          </mesh>
          <mesh position={[0.3, 0, 0.03]}>
            <planeGeometry args={[0.002, 0.24]} />
            <meshBasicMaterial color="#38BDF8" transparent opacity={wireframeOpacity} />
          </mesh>
          <mesh position={[0.6, 0, 0.03]}>
            <planeGeometry args={[0.002, 0.24]} />
            <meshBasicMaterial color="#38BDF8" transparent opacity={wireframeOpacity} />
          </mesh>
        </group>
      )}

      {/* State 1: UI Design Preview - violet accent elements */}
      {displayState === 1 && (
        <group>
          {/* Header bar */}
          <mesh position={[-0.5, 0.1, 0.03]}>
            <planeGeometry args={[0.6, 0.025]} />
            <meshBasicMaterial color="#8B5CF6" transparent opacity={wireframeOpacity + 0.1} />
          </mesh>
          {/* Image placeholder */}
          <mesh position={[0.4, 0.02, 0.03]}>
            <planeGeometry args={[0.5, 0.12]} />
            <meshBasicMaterial color="#8B5CF6" transparent opacity={wireframeOpacity} />
          </mesh>
          {/* Content blocks */}
          <mesh position={[-0.6, -0.02, 0.03]}>
            <planeGeometry args={[0.35, 0.015]} />
            <meshBasicMaterial color="#8B5CF6" transparent opacity={wireframeOpacity} />
          </mesh>
          <mesh position={[-0.5, -0.07, 0.03]}>
            <planeGeometry args={[0.45, 0.015]} />
            <meshBasicMaterial color="#8B5CF6" transparent opacity={wireframeOpacity - 0.03} />
          </mesh>
          <mesh position={[-0.55, -0.12, 0.03]}>
            <planeGeometry args={[0.3, 0.015]} />
            <meshBasicMaterial color="#8B5CF6" transparent opacity={wireframeOpacity - 0.05} />
          </mesh>
          {/* Golden ratio frame lines */}
          <mesh position={[0, 0.14, 0.03]}>
            <planeGeometry args={[1.9, 0.003]} />
            <meshBasicMaterial color="#E8F4FF" transparent opacity={0.06} />
          </mesh>
          <mesh position={[0, -0.14, 0.03]}>
            <planeGeometry args={[1.9, 0.003]} />
            <meshBasicMaterial color="#E8F4FF" transparent opacity={0.06} />
          </mesh>
        </group>
      )}

      {/* State 2: Development Interface - code fragment */}
      {displayState === 2 && (
        <group>
          {/* Code lines - varying widths */}
          <mesh position={[-0.55, 0.1, 0.03]}>
            <planeGeometry args={[0.8, 0.012]} />
            <meshBasicMaterial color="#38BDF8" transparent opacity={wireframeOpacity} />
          </mesh>
          <mesh position={[-0.45, 0.07, 0.03]}>
            <planeGeometry args={[0.6, 0.012]} />
            <meshBasicMaterial color="#38BDF8" transparent opacity={wireframeOpacity - 0.03} />
          </mesh>
          <mesh position={[-0.35, 0.04, 0.03]}>
            <planeGeometry args={[0.9, 0.012]} />
            <meshBasicMaterial color="#8B5CF6" transparent opacity={wireframeOpacity} />
          </mesh>
          <mesh position={[-0.5, 0.01, 0.03]}>
            <planeGeometry args={[0.7, 0.012]} />
            <meshBasicMaterial color="#38BDF8" transparent opacity={wireframeOpacity - 0.05} />
          </mesh>
          <mesh position={[-0.4, -0.02, 0.03]}>
            <planeGeometry args={[0.5, 0.012]} />
            <meshBasicMaterial color="#8B5CF6" transparent opacity={wireframeOpacity - 0.02} />
          </mesh>
          <mesh position={[-0.6, -0.05, 0.03]}>
            <planeGeometry args={[0.85, 0.012]} />
            <meshBasicMaterial color="#38BDF8" transparent opacity={wireframeOpacity - 0.04} />
          </mesh>
          <mesh position={[-0.45, -0.08, 0.03]}>
            <planeGeometry args={[0.65, 0.012]} />
            <meshBasicMaterial color="#38BDF8" transparent opacity={wireframeOpacity - 0.06} />
          </mesh>
          <mesh position={[-0.55, -0.11, 0.03]}>
            <planeGeometry args={[0.75, 0.012]} />
            <meshBasicMaterial color="#8B5CF6" transparent opacity={wireframeOpacity - 0.03} />
          </mesh>
        </group>
      )}

      {/* State 3: Deployment Success - checkmark + metrics */}
      {displayState === 3 && (
        <group>
          {/* Success checkmark circle */}
          <mesh position={[0, 0, 0.03]}>
            <ringGeometry args={[0.08, 0.1, 32]} />
            <meshBasicMaterial color="#06B6D4" transparent opacity={wireframeOpacity + 0.15} />
          </mesh>
          {/* Checkmark lines */}
          <mesh position={[-0.03, 0.01, 0.04]}>
            <planeGeometry args={[0.04, 0.015]} />
            <meshBasicMaterial color="#06B6D4" transparent opacity={wireframeOpacity + 0.2} />
          </mesh>
          <mesh position={[0.02, -0.02, 0.04]}>
            <planeGeometry args={[0.06, 0.015]} />
            <meshBasicMaterial color="#06B6D4" transparent opacity={wireframeOpacity + 0.2} />
          </mesh>
          {/* Metrics lines */}
          <mesh position={[-0.6, 0.1, 0.03]}>
            <planeGeometry args={[0.4, 0.015]} />
            <meshBasicMaterial color="#38BDF8" transparent opacity={wireframeOpacity - 0.05} />
          </mesh>
          <mesh position={[-0.55, 0.05, 0.03]}>
            <planeGeometry args={[0.3, 0.015]} />
            <meshBasicMaterial color="#8B5CF6" transparent opacity={wireframeOpacity - 0.08} />
          </mesh>
          <mesh position={[-0.5, -0.05, 0.03]}>
            <planeGeometry args={[0.35, 0.015]} />
            <meshBasicMaterial color="#38BDF8" transparent opacity={wireframeOpacity - 0.1} />
          </mesh>
          <mesh position={[-0.6, -0.1, 0.03]}>
            <planeGeometry args={[0.25, 0.015]} />
            <meshBasicMaterial color="#8B5CF6" transparent opacity={wireframeOpacity - 0.12} />
          </mesh>
        </group>
      )}

      {/* Display stand */}
      <mesh position={[0, -0.25, -0.02]}>
        <boxGeometry args={[0.5, 0.08, 0.15]} />
        <meshStandardMaterial color="#0c1220" metalness={0.85} roughness={0.2} />
      </mesh>

      {/* Stand base */}
      <mesh position={[0, -0.29, 0.05]}>
        <boxGeometry args={[0.8, 0.015, 0.25]} />
        <meshStandardMaterial color="#0c1220" metalness={0.88} roughness={0.15} />
      </mesh>

      {/* Subtle display glow - breathing with CTA */}
      <mesh position={[0, 0, 0.03]}>
        <planeGeometry args={[2.4, 0.42]} />
        <meshBasicMaterial
          color="#38BDF8"
          transparent
          opacity={opacity * 0.25 + (ctaHover ? 0.03 : 0)}
        />
      </mesh>
    </group>
  );
}

// ============================================================================
// HOLOGRAPHIC ENGINEERING SYSTEMS - STEP 3B
// Ambient engineering storytelling layer
// ============================================================================

// ============================================================================
// MAIN WORKSTATION DESK EXPORT
// ============================================================================
export function WorkstationDesk({
  reduced = false,
  mousePos = { x: 0, y: 0 },
  isMobile = false,
}: WorkstationDeskProps) {
  const [ctaHover, setCtaHover] = useState(false);
  const groupRef = useRef<THREE.Group | null>(null);
  const targetRotY = useRef(0);
  const targetRotX = useRef(0);

  // Mobile optimization - very restrained premium motion
  const lerpFactor = isMobile ? 0.02 : 0.025;
  const floatSpeed = isMobile ? 0.9 : reduced ? 1.0 : 1.3;
  const floatIntensity = isMobile ? 0.02 : reduced ? 0.03 : 0.04;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const applyFromDom = () => {
      const v = document.documentElement.dataset.bbCtaHover;
      setCtaHover(v === "1");
    };

    applyFromDom();

    const onChange = () => applyFromDom();
    // Lightweight polling-free approach: listen to attribute changes via MutationObserver.
    const obs = new MutationObserver(onChange);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-bb-cta-hover"] });

    return () => obs.disconnect();
  }, []);

  useFrame(() => {
    if (!groupRef.current || reduced) return;

    // Very restrained group rotation for environmental parallax (2-3 degrees max)
    targetRotY.current = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mousePos.x * 0.015,
      lerpFactor
    );
    targetRotX.current = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -mousePos.y * 0.01,
      lerpFactor
    );

    groupRef.current.rotation.y = targetRotY.current;
    groupRef.current.rotation.x = targetRotX.current;
  });

  return (
    <group ref={groupRef}>
      <Float speed={floatSpeed} rotationIntensity={0.01} floatIntensity={floatIntensity}>
        <PremiumDesk reduced={reduced} mousePos={mousePos} isMobile={isMobile} />
        <CinematicKeyboard reduced={reduced} mousePos={mousePos} isMobile={isMobile} />

        {/* STEP 4B: Signature Studio Display - the hero signature visual */}
        <SignatureStudioDisplay reduced={reduced} ctaHover={ctaHover} />

        {/* STEP 3B: Holographic Engineering Systems - restructured into workflow */}
        <HolographicSystems reduced={reduced} mousePos={mousePos} isMobile={isMobile} />

        {/* Emotional intelligence core - integrated into workstation ecosystem */}
        <CinematicAIEntity reduced={reduced} isMobile={isMobile} mousePos={mousePos} ctaHover={ctaHover} />
      </Float>
    </group>
  );
}
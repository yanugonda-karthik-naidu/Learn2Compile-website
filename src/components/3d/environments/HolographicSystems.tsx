"use client";

import { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ============================================================================
// STEP 4B: HOLOGRAPHIC WORKFLOW SYSTEMS
// Connected workflow: Design → Develop → Deploy
// Replaces disconnected hologram cards with unified product creation narrative
// ============================================================================

interface HolographicSystemsProps {
  reduced?: boolean;
  mousePos?: { x: number; y: number };
  isMobile?: boolean;
}

// ============================================================================
// WORKFLOW CARD: DESIGN - Wireframe grid visualization
// ============================================================================
function DesignCard({ reduced }: { reduced: boolean }) {
  const groupRef = useRef<THREE.Group | null>(null);
  const [opacity, setOpacity] = useState(0.15);

  useFrame(({ clock }) => {
    if (!groupRef.current || reduced) return;

    // Slow breathing - synchronized with workflow rhythm
    const breathValue = Math.sin(clock.elapsedTime * 0.04 * 0.8) * 0.04 + 0.15;
    setOpacity(breathValue);
  });

  return (
    <group ref={groupRef} position={[-1.2, 0.55, 0.2]}>
      {/* Card frame */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[0.55, 0.38]} />
        <meshBasicMaterial color="#38BDF8" transparent opacity={0.08} />
      </mesh>

      {/* Card border */}
      <mesh position={[0, 0, 0.001]}>
        <planeGeometry args={[0.56, 0.39]} />
        <meshBasicMaterial color="#38BDF8" transparent opacity={0.06} side={THREE.DoubleSide} />
      </mesh>

      {/* Wireframe grid - horizontal */}
      <mesh position={[0, 0.08, 0.002]}>
        <planeGeometry args={[0.4, 0.002]} />
        <meshBasicMaterial color="#38BDF8" transparent opacity={opacity + 0.05} />
      </mesh>
      <mesh position={[0, 0, 0.002]}>
        <planeGeometry args={[0.4, 0.002]} />
        <meshBasicMaterial color="#38BDF8" transparent opacity={opacity + 0.05} />
      </mesh>
      <mesh position={[0, -0.08, 0.002]}>
        <planeGeometry args={[0.4, 0.002]} />
        <meshBasicMaterial color="#38BDF8" transparent opacity={opacity + 0.05} />
      </mesh>

      {/* Wireframe grid - vertical */}
      <mesh position={[-0.12, 0, 0.002]}>
        <planeGeometry args={[0.002, 0.18]} />
        <meshBasicMaterial color="#38BDF8" transparent opacity={opacity + 0.05} />
      </mesh>
      <mesh position={[0, 0, 0.002]}>
        <planeGeometry args={[0.002, 0.18]} />
        <meshBasicMaterial color="#38BDF8" transparent opacity={opacity + 0.05} />
      </mesh>
      <mesh position={[0.12, 0, 0.002]}>
        <planeGeometry args={[0.002, 0.18]} />
        <meshBasicMaterial color="#38BDF8" transparent opacity={opacity + 0.05} />
      </mesh>

      {/* Corner accents */}
      <mesh position={[-0.27, 0.18, 0.003]}>
        <planeGeometry args={[0.06, 0.003]} />
        <meshBasicMaterial color="#8B5CF6" transparent opacity={opacity} />
      </mesh>
      <mesh position={[-0.27, 0.18, 0.003]}>
        <planeGeometry args={[0.003, 0.06]} />
        <meshBasicMaterial color="#8B5CF6" transparent opacity={opacity} />
      </mesh>
    </group>
  );
}

// ============================================================================
// WORKFLOW CARD: DEVELOP - Code lines visualization
// ============================================================================
function DevelopCard({ reduced }: { reduced: boolean }) {
  const groupRef = useRef<THREE.Group | null>(null);
  const [yOffset, setYOffset] = useState(0);
  const [opacity, setOpacity] = useState(0.14);

  const codeLines = useMemo(
    () => [
      { y: 0.1, width: 0.35 },
      { y: 0.05, width: 0.25 },
      { y: 0, width: 0.4 },
      { y: -0.05, width: 0.2 },
      { y: -0.1, width: 0.32 },
    ],
    []
  );

  useFrame(({ clock }) => {
    if (!groupRef.current || reduced) return;

    // Slow vertical drift - synchronized with design card
    const drift = Math.sin(clock.elapsedTime * 0.03) * 0.02;
    setYOffset(drift);

    // Opacity breathing - same cycle as design card
    const opacityValue = Math.sin(clock.elapsedTime * 0.04 * 0.8) * 0.03 + 0.14;
    setOpacity(opacityValue);
  });

  return (
    <group ref={groupRef} position={[1.2, 0.55, 0.2]}>
      {/* Card frame */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[0.55, 0.38]} />
        <meshBasicMaterial color="#8B5CF6" transparent opacity={0.08} />
      </mesh>

      {/* Card border */}
      <mesh position={[0, 0, 0.001]}>
        <planeGeometry args={[0.56, 0.39]} />
        <meshBasicMaterial color="#8B5CF6" transparent opacity={0.06} side={THREE.DoubleSide} />
      </mesh>

      {/* Code lines - violet accent */}
      {codeLines.map((line, i) => (
        <mesh key={i} position={[line.width / 2 - 0.25, line.y + yOffset, 0.002]}>
          <planeGeometry args={[line.width, 0.015]} />
          <meshBasicMaterial
            color="#8B5CF6"
            transparent
            opacity={opacity + (0.1 - Math.abs(i - 2) * 0.03)}
          />
        </mesh>
      ))}
    </group>
  );
}

// ============================================================================
// WORKFLOW CARD: DEPLOY - Progress visualization
// ============================================================================
function DeployCard({ reduced }: { reduced: boolean }) {
  const groupRef = useRef<THREE.Group | null>(null);
  const [progress, setProgress] = useState(0);
  const [opacity, setOpacity] = useState(0.16);

  useFrame(({ clock }) => {
    if (!groupRef.current || reduced) return;

    // Very slow progress cycling
    setProgress((clock.elapsedTime * 0.025) % 1);

    // Opacity breathing - same cycle as other cards
    const opacityValue = Math.sin(clock.elapsedTime * 0.04 * 0.8) * 0.03 + 0.16;
    setOpacity(opacityValue);
  });

  return (
    <group ref={groupRef} position={[0, 0.25, 0.15]}>
      {/* Card frame */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[0.65, 0.25]} />
        <meshBasicMaterial color="#06B6D4" transparent opacity={0.08} />
      </mesh>

      {/* Card border */}
      <mesh position={[0, 0, 0.001]}>
        <planeGeometry args={[0.66, 0.26]} />
        <meshBasicMaterial color="#06B6D4" transparent opacity={0.06} side={THREE.DoubleSide} />
      </mesh>

      {/* Progress bar background */}
      <mesh position={[0, 0, 0.002]}>
        <planeGeometry args={[0.5, 0.025]} />
        <meshBasicMaterial color="#06B6D4" transparent opacity={opacity} />
      </mesh>

      {/* Progress bar fill */}
      <mesh position={[-0.25 + 0.25 * progress, 0, 0.003]}>
        <planeGeometry args={[0.5 * progress, 0.02]} />
        <meshBasicMaterial color="#06B6D4" transparent opacity={opacity + 0.15} />
      </mesh>

      {/* Status indicator */}
      <mesh position={[0, -0.09, 0.002]}>
        <planeGeometry args={[0.3, 0.015]} />
        <meshBasicMaterial color="#38BDF8" transparent opacity={opacity - 0.05} />
      </mesh>
    </group>
  );
}

// ============================================================================
// VISUAL CONNECTION LINES - Flow indicators between workflow cards
// ============================================================================
function WorkflowConnections({ reduced }: { reduced: boolean }) {
  const groupRef = useRef<THREE.Group | null>(null);
  const [opacity, setOpacity] = useState(0.06);

  useFrame(({ clock }) => {
    if (!groupRef.current || reduced) return;

    // Very subtle opacity - not attention seeking
    const opacityValue = Math.sin(clock.elapsedTime * 0.04 * 0.6) * 0.02 + 0.06;
    setOpacity(opacityValue);
  });

  return (
    <group ref={groupRef}>
      {/* Design to Develop connection - dashed line */}
      <mesh position={[0, 0.55, 0.2]} rotation={[0, 0, Math.PI / 4]}>
        <planeGeometry args={[0.015, 0.25]} />
        <meshBasicMaterial color="#38BDF8" transparent opacity={opacity} />
      </mesh>

      {/* Develop to Deploy connection - vertical line */}
      <mesh position={[0, 0.4, 0.18]}>
        <planeGeometry args={[0.008, 0.3]} />
        <meshBasicMaterial color="#06B6D4" transparent opacity={opacity} />
      </mesh>
    </group>
  );
}

// ============================================================================
// MAIN HOLOGRAPHIC SYSTEMS EXPORT
// STEP 4B: 3 connected workflow cards replace 5 disconnected holograms
// ============================================================================
export function HolographicSystems({
  reduced = false,
  isMobile = false,
}: HolographicSystemsProps) {
  // Responsive hologram count - fewer on mobile
  const hologramCount = isMobile ? 2 : reduced ? 2 : 3;

  return (
    <group>
      {/* Design Card - wireframe grid */}
      {hologramCount >= 1 && <DesignCard reduced={reduced} />}

      {/* Develop Card - code lines */}
      {hologramCount >= 2 && <DevelopCard reduced={reduced} />}

      {/* Deploy Card - progress bar */}
      {hologramCount >= 3 && <DeployCard reduced={reduced} />}

      {/* Visual workflow connections */}
      {hologramCount >= 3 && <WorkflowConnections reduced={reduced} />}
    </group>
  );
}

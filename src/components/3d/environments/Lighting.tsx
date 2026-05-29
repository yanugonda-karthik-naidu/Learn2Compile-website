"use client";

interface StudioLightingProps {
  reduced?: boolean;
}

export function StudioLighting({ reduced = false }: StudioLightingProps) {
  return (
    <>
      {/* Base ambient - low for cinematic contrast */}
      <ambientLight intensity={reduced ? 0.12 : 0.18} color="#6B7C9C" />

      {/* Primary directional - soft cyan atmosphere */}
      <directionalLight
        position={[4, 5, 3]}
        intensity={reduced ? 0.4 : 0.55}
        color="#E8F4FF"
        castShadow={false}
      />

      {/* Key light - main scene definition with cyan tint */}
      <pointLight
        position={[3, 4, 2]}
        intensity={reduced ? 0.25 : 0.35}
        color="#38BDF8"
        distance={12}
        decay={2}
      />

      {/* Fill light - balances shadows with softer blue */}
      <pointLight
        position={[-3, 1.5, 2]}
        intensity={reduced ? 0.15 : 0.25}
        color="#38BDF8"
        distance={10}
        decay={2}
      />

      {/* Rim light - violet edge separation for cinematic depth */}
      <pointLight
        position={[2.5, 2.5, -3]}
        intensity={reduced ? 0.2 : 0.28}
        color="#8B5CF6"
        distance={8}
        decay={2}
      />

      {/* Underglow - soft desk reflections for premium depth */}
      <pointLight
        position={[0, -1.5, 2]}
        intensity={reduced ? 0.08 : 0.12}
        color="#06B6D4"
        distance={6}
        decay={2}
      />

      {/* Secondary violet accent for object separation */}
      <pointLight
        position={[-2, 3.5, -1]}
        intensity={reduced ? 0.12 : 0.2}
        color="#8B5CF6"
        distance={7}
        decay={2}
      />

      {/* Atmospheric volumetric glow - top center */}
      <spotLight
        position={[0, 4, 1]}
        intensity={reduced ? 0.12 : 0.18}
        color="#38BDF8"
        distance={10}
        decay={2}
        angle={0.6}
        penumbra={0.8}
      />
    </>
  );
}

interface LightingConfig {
  ambient: number;
  directional: number;
  key: number;
  fill: number;
  rim: number;
  underglow: number;
  secondary: number;
  volumetric: number;
}

export function getLightingConfig(reduced: boolean): LightingConfig {
  if (reduced) {
    return {
      ambient: 0.12,
      directional: 0.4,
      key: 0.25,
      fill: 0.15,
      rim: 0.2,
      underglow: 0.08,
      secondary: 0.12,
      volumetric: 0.12,
    };
  }
  return {
    ambient: 0.18,
    directional: 0.55,
    key: 0.35,
    fill: 0.25,
    rim: 0.28,
    underglow: 0.12,
    secondary: 0.2,
    volumetric: 0.18,
  };
}
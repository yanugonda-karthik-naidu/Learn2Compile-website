"use client";

import { useEffect, useState } from "react";

export type DeviceTier = "mobile" | "tablet" | "desktop";

export interface DeviceCapabilities {
  reduced: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  deviceTier: DeviceTier;
}

function getDeviceTier(): DeviceTier {
  if (typeof window === "undefined") return "desktop";
  const width = window.innerWidth;
  if (width < 768) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}

function initReduced(): boolean {
  if (typeof window === "undefined") return false;
  const mql = window.matchMedia?.("(prefers-reduced-motion: reduce)");
  return Boolean(mql?.matches);
}

/**
 * Centralized device capabilities detection hook.
 * Provides consistent values across all components while avoiding
 * repeated matchMedia calls and performance overhead.
 *
 * Usage:
 *   const { reduced, isMobile, deviceTier } = useDeviceCapabilities();
 */
export function useDeviceCapabilities(): DeviceCapabilities {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>({
    reduced: false,
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    deviceTier: "desktop",
  });

  useEffect(() => {
    const apply = () => {
      const tier = getDeviceTier();
      setCapabilities({
        reduced: initReduced(),
        isMobile: tier === "mobile",
        isTablet: tier === "tablet",
        isDesktop: tier === "desktop",
        deviceTier: tier,
      });
    };

    apply();

    // Listen for reduced motion preference changes
    const mql = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    mql?.addEventListener?.("change", apply);

    // Listen for viewport changes
    const resizeObserver = new ResizeObserver(() => {
      apply();
    });
    resizeObserver.observe(document.documentElement);

    return () => {
      mql?.removeEventListener?.("change", apply);
      resizeObserver.disconnect();
    };
  }, []);

  return capabilities;
}

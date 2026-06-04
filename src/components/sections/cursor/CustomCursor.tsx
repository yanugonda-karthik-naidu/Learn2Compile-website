"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "@/lib/gsap/config";

function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const hasTouch =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    const id = window.requestAnimationFrame(() => setIsTouch(Boolean(hasTouch)));
    return () => window.cancelAnimationFrame(id);
  }, []);

  return isTouch;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
}

// Interactive element priority for depth reactions
function getElementPriority(el: Element): number {
  if (el.tagName === "BUTTON" || el.getAttribute("role") === "button") return 1.0;
  if (el.tagName === "A") {
    if (el.getAttribute("href")?.startsWith("/")) return 0.8; // Internal link
    return 0.9; // External link
  }
  if (el.closest("[data-cta-priority]")) return 1.0;
  if (el.closest("[data-stagger-item]")) return 0.6;
  return 0.5;
}

export function CustomCursor({ hidden = false }: { hidden?: boolean }) {
  const isTouch = useIsTouchDevice();
  const isMobile = useIsMobile();

  // Cinematic cursor state
  const cursorRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: -100,
    y: -100,
    targetX: -100,
    targetY: -100,
  });
  const rafRef = useRef<number | null>(null);
  const interactiveElsRef = useRef<Element[]>([]);
  const glowIntensityRef = useRef(1);

  // Cursor size state for depth reactions
  const [cursorSize, setCursorSize] = useState({ width: 18, height: 18 });

  const styles = useMemo(
    () => ({
      base: {
        position: "fixed" as const,
        top: 0,
        left: 0,
        width: cursorSize.width,
        height: cursorSize.height,
        borderRadius: 9999,
        pointerEvents: "none" as const,
        zIndex: 9999,
        mixBlendMode: "screen" as const,
        background: "radial-gradient(circle, rgba(56,189,248,0.95), rgba(56,189,248,0.05) 65%)",
        transform: "translate3d(-50%, -50%, 0)",
        transition: "width 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94), height 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 200ms ease",
        opacity: isTouch ? 0 : 1,
        willChange: "transform",
      },
      dot: {
        position: "absolute" as const,
        inset: 0,
        borderRadius: 9999,
        boxShadow: "0 0 22px rgba(56,189,248,0.55), 0 0 55px rgba(139,92,246,0.18)",
        transition: "box-shadow 200ms ease",
      },
      glow: {
        position: "absolute" as const,
        inset: -18,
        borderRadius: 9999,
        background:
          "radial-gradient(circle, rgba(56,189,248,0.20), rgba(56,189,248,0) 62%)",
        filter: "blur(2px)",
        transition: "opacity 200ms ease",
      },
    }),
    [isTouch, cursorSize]
  );

  // Scan for interactive elements
  const scanInteractiveElements = useCallback(() => {
    if (typeof document === "undefined") return;
    interactiveElsRef.current = Array.from(
      document.querySelectorAll("a, button, [role='button'], [data-cta-priority]")
    );
  }, []);

  // Calculate magnetic offset toward nearest interactive element
  const calculateMagneticOffset = useCallback(
    (x: number, y: number): { offsetX: number; offsetY: number; targetEl: Element | null } => {
      const threshold = motion.cursor.magneticRadius;
      let closestEl: Element | null = null;
      let closestDistance = Infinity;
      let offsetX = 0;
      let offsetY = 0;

      for (const el of interactiveElsRef.current) {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.sqrt(
          Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
        );

        if (distance < threshold && distance < closestDistance) {
          closestDistance = distance;
          closestEl = el;
          closestDistance = distance;
        }
      }

      if (closestEl && closestDistance < threshold) {
        const rect = closestEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Stronger pull when closer
        const pullFactor = Math.pow(1 - closestDistance / threshold, 2);
        offsetX = (centerX - x) * pullFactor * motion.cursor.magneticStrength;
        offsetY = (centerY - y) * pullFactor * motion.cursor.magneticStrength;
      }

      return { offsetX, offsetY, targetEl: closestEl };
    },
    []
  );

  // Animation loop with lerped cursor and magnetic effect.
  // Use a stable frame function ref to avoid any "access before declare" issues.
  const frameFnRef = useRef<() => void>(() => {});

  const animate = useCallback(() => {
    const cursor = cursorRef.current;

    // Lerp factor for cinematic smoothness (~60fps)
    const lerpFactor = 0.2;
    const newX = cursor.x + (cursor.targetX - cursor.x) * lerpFactor;
    const newY = cursor.y + (cursor.targetY - cursor.y) * lerpFactor;

    cursor.x = newX;
    cursor.y = newY;

    const el = document.getElementById("bb-custom-cursor");
    if (el) {
      el.style.transform = `translate3d(${newX}px, ${newY}px, 0) translate3d(-50%, -50%, 0)`;
    }

    rafRef.current = requestAnimationFrame(() => {
      frameFnRef.current();
    });
  }, []);

  // Bind frame function once
  useEffect(() => {
    frameFnRef.current = animate;
  }, [animate]);




  // Pointer move handler
  useEffect(() => {
    if (isTouch || isMobile) return;

    scanInteractiveElements();

    const handleMouseMove = (e: PointerEvent) => {
      const { offsetX, offsetY, targetEl } = calculateMagneticOffset(
        e.clientX,
        e.clientY
      );

      cursorRef.current.targetX = e.clientX + offsetX;
      cursorRef.current.targetY = e.clientY + offsetY;

      // Update glow intensity based on proximity to interactive elements
      if (targetEl) {
        const priority = getElementPriority(targetEl);
        const rect = targetEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.sqrt(
          Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
        );
        const proximityFactor = Math.max(
          0,
          1 - distance / motion.cursor.magneticRadius
        );
        glowIntensityRef.current = 1 + proximityFactor * priority * 0.5;
      } else {
        glowIntensityRef.current = Math.max(1, glowIntensityRef.current - 0.05);
      }
    };

    window.addEventListener("pointermove", handleMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(() => animate());

    // Rescan on navigation

    const handleRouteChange = () => setTimeout(scanInteractiveElements, 500);
    window.addEventListener("popstate", handleRouteChange);

    return () => {
      window.removeEventListener("pointermove", handleMouseMove);
      window.removeEventListener("popstate", handleRouteChange);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isTouch, isMobile, animate, calculateMagneticOffset, scanInteractiveElements]);

  // Hover handlers for depth reactions
  useEffect(() => {
    if (isTouch || isMobile) return;

    const handleEnter = (e: Event) => {
      const target = e.target as Element;
      if (!target || !(target instanceof Element)) return;

      const priority = getElementPriority(target);
      const hoverSize = 24 + priority * 8; // 24-32px based on priority

      setCursorSize({ width: hoverSize, height: hoverSize });
    };

    const handleLeave = () => {
      setCursorSize({ width: 18, height: 18 });
    };

    // Initial scan
    scanInteractiveElements();

    // Add event listeners to new elements
    const observer = new MutationObserver(() => {
      scanInteractiveElements();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Delegate hover events
    const onEnter = (e: Event) => handleEnter(e);
    const onLeave = () => handleLeave();

    document.addEventListener("pointerenter", onEnter, true);
    document.addEventListener("pointerleave", onLeave, true);

    // Attach to existing elements
    const attachEvents = () => {
      interactiveElsRef.current.forEach((el) => {
        el.addEventListener("pointerenter", onEnter);
        el.addEventListener("pointerleave", onLeave);
      });
    };
    attachEvents();

    return () => {
      observer.disconnect();
      document.removeEventListener("pointerenter", onEnter, true);
      document.removeEventListener("pointerleave", onLeave, true);
      interactiveElsRef.current.forEach((el) => {
        el.removeEventListener("pointerenter", onEnter);
        el.removeEventListener("pointerleave", onLeave);
      });
    };
  }, [isTouch, isMobile, scanInteractiveElements]);

  if (hidden || isTouch || isMobile) return null;


  return (
    <div
      id="bb-custom-cursor"
      style={styles.base}
      aria-hidden="true"
    >
      <div style={styles.glow} />
      <div style={styles.dot} />
    </div>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";

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

export function CustomCursor() {
  const isTouch = useIsTouchDevice();
  const styles = useMemo(
    () => ({
      base: {
        position: "fixed" as const,
        top: 0,
        left: 0,
        width: 18,
        height: 18,
        borderRadius: 9999,
        pointerEvents: "none" as const,
        zIndex: 9999,
        mixBlendMode: "screen" as const,
        background: "radial-gradient(circle, rgba(56,189,248,0.95), rgba(56,189,248,0.05) 65%)",
        transform: "translate3d(-50%, -50%, 0)",
        transition: "width 160ms ease, height 160ms ease, opacity 200ms ease",
        opacity: isTouch ? 0 : 1,
      },
      dot: {
        position: "absolute" as const,
        inset: 0,
        borderRadius: 9999,
        boxShadow: "0 0 22px rgba(56,189,248,0.55), 0 0 55px rgba(139,92,246,0.18)",
      },
      glow: {
        position: "absolute" as const,
        inset: -18,
        borderRadius: 9999,
        background:
          "radial-gradient(circle, rgba(56,189,248,0.20), rgba(56,189,248,0) 62%)",
        filter: "blur(2px)",
      },
    }),
    [isTouch]
  );

  useEffect(() => {
    if (isTouch) return;

    let raf = 0;
    let x = 0;
    let y = 0;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;

      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        const el = document.getElementById("bb-custom-cursor");
        if (!el) return;
        (el as HTMLDivElement).style.transform = `translate3d(${x}px, ${y}px, 0) translate3d(-50%, -50%, 0)`;
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, [isTouch]);

  useEffect(() => {
    if (isTouch) return;

    const els = Array.from(document.querySelectorAll("a, button, [role='button']"));
    const onEnter = () => {
      const el = document.getElementById("bb-custom-cursor");
      if (!el) return;
      (el as HTMLDivElement).style.width = "28px";
      (el as HTMLDivElement).style.height = "28px";
    };
    const onLeave = () => {
      const el = document.getElementById("bb-custom-cursor");
      if (!el) return;
      (el as HTMLDivElement).style.width = "18px";
      (el as HTMLDivElement).style.height = "18px";
    };

    els.forEach((n) => {
      n.addEventListener("pointerenter", onEnter);
      n.addEventListener("pointerleave", onLeave);
    });

    return () => {
      els.forEach((n) => {
        n.removeEventListener("pointerenter", onEnter);
        n.removeEventListener("pointerleave", onLeave);
      });
    };
  }, [isTouch]);

  if (isTouch) return null;

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

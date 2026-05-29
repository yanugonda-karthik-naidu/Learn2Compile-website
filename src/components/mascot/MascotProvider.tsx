"use client";

import dynamic from "next/dynamic";
import { Mascot } from "./Mascot";
import { useMascot } from "./useMascot";

// Inner component that uses hooks
function MascotInner() {
  const { position: mascotPos, state, isTouch, reduced, sectionContext } = useMascot();

  if (isTouch || reduced) {
    return null;
  }

  // Direct cursor position - no offset, no delay
  return (
    <Mascot
      position={{
        x: mascotPos.x,
        y: mascotPos.y,
      }}
      state={state}
      reduced={reduced}
      sectionContext={sectionContext}
    />
  );
}

// Dynamically imported with ssr:false to prevent hydration issues
const MascotClient = dynamic(() => Promise.resolve(MascotInner), {
  ssr: false,
  loading: () => null,
});

export function MascotProvider() {
  return <MascotClient />;
}

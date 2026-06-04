"use client";

import { ReactNode } from "react";


// Lenis smooth scrolling removed.
// Keep this component as a no-op to avoid breaking potential imports.
export function LenisProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}



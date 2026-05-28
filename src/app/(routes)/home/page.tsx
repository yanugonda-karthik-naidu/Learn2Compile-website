import type { Metadata } from "next";
import { StudioFullLanding } from "@/components/sections/StudioFullLanding";

export const metadata: Metadata = {
  title: "We Build Future-Ready Digital Experiences",
  description:
    "Premium futuristic web development studio: cinematic UI, immersive 3D, fast performance, and conversion-focused experiences.",
};

export default function HomePage() {
  return <StudioFullLanding />;
}

import type { Metadata } from "next";
import { StudioFullLanding } from "@/components/sections/StudioFullLanding";

// Force dynamic rendering to prevent SSR issues with client components
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Build Future-Ready Digital Experiences",
  description:
    "Premium Indian digital studio crafting cinematic websites with immersive 3D environments, motion systems, and conversion-focused engineering for modern businesses.",
  keywords: [
    "digital studio",
    "futuristic web design",
    "3D websites",
    "immersive UI",
    "premium web development India",
  ],
  openGraph: {
    title: "Learn2Compile | Premium Digital Studio India",
    description:
      "Premium Indian digital studio crafting cinematic websites with immersive 3D, motion systems, and conversion-focused engineering.",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "Learn2Compile - Premium Digital Studio",
      },
    ],
  },
};

export default function HomePage() {
  return <StudioFullLanding />;
}

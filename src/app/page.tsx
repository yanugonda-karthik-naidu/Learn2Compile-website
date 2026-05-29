import { StudioFullLanding } from "@/components/sections/StudioFullLanding";

// Force dynamic rendering to prevent SSR issues with client components
export const dynamic = "force-dynamic";

export default function Home() {
  return <StudioFullLanding />;
}

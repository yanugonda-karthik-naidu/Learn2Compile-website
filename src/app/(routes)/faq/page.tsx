import type { Metadata } from "next";
import { StudioSimplePage } from "@/components/sections/StudioSimplePage";

export const metadata: Metadata = {
  title: "FAQ | Premium Studio Answers",
};

export default function FaqPage() {
  return (
    <StudioSimplePage
      eyebrow="Quick answers"
      title="Everything you need to know"
      body={
        "Timeline • Pricing • Revisions • Hosting • Maintenance • SEO • Mobile optimization • Custom features"
      }
    />
  );
}


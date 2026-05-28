import type { Metadata } from "next";
import { StudioSimplePage } from "@/components/sections/StudioSimplePage";
import { ContactSection } from "@/components/sections/contact/ContactSection";

export const metadata: Metadata = {
  title: "Contact | Start Your Project",
};

export default function ContactPage() {

  return (
    <div>
      <StudioSimplePage
        eyebrow="Client inquiries"
        title="Let’s build something future-ready"
        body={
          "Tell us what you’re building—timeline, budget range, and project goals. We'll respond with a cinematic, engineering-ready plan."
        }
      />
      <ContactSection />
    </div>
  );
}



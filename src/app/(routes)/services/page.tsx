import type { Metadata } from "next";
import { ServicesSection } from "@/components/sections/services/ServicesSection";

export const metadata: Metadata = {
  title: "Services | Premium Web Development | Learn2Compile",
  description: "Premium web development services for businesses, startups, weddings, restaurants, and personal brands. Stunning design, fast performance, conversion-focused.",
};

export default function ServicesPage() {
  return <ServicesSection />;
}
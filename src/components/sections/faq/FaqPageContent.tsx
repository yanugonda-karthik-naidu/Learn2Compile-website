"use client";

import { useState } from "react";
import { FaqHero } from "./FaqHero";
import { FaqSection } from "./FaqSection";
import { FAQSchemaMarkup } from "@/components/seo/SchemaMarkup";
import { getAllFaqItems } from "@/lib/seo/faqData";

export function FaqPageContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const faqItems = getAllFaqItems();

  return (
    <>
      <FAQSchemaMarkup faqs={faqItems} />
      <FaqHero onSearch={setSearchQuery} searchValue={searchQuery} />
      <FaqSection searchQuery={searchQuery} />
    </>
  );
}
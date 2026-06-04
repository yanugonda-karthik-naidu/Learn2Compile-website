// Re-export new sections for backwards compatibility
export { PricingHero } from "./PricingHero";
export { PricingCards } from "./PricingCards";
export { PricingConfigurator } from "./PricingConfigurator";
export { PricingValue } from "./PricingValue";
export { PricingCTA } from "./PricingCTA";

// Backwards compatibility wrapper - includes key sections
import { PricingCards } from "./PricingCards";
import { PricingValue } from "./PricingValue";
import { PricingCTA } from "./PricingCTA";
import { QuoteConfigurator } from "../custom-quote";

export function PricingSection() {
  return (
    <div className="flex flex-col gap-0">
      <PricingCards />
      <QuoteConfigurator />
      <PricingValue />
      <PricingCTA />
    </div>
  );
}
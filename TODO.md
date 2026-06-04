# TODO - ESTIMATOR LOCALIZATION & PRICING ALIGNMENT

## Plan
- Update `QuoteConfigurator` to use INR formatting (₹) and remove all hardcoded USD ($) strings.
- Replace estimator base/add-on/pricing logic to match Pricing page tiers and add-ons.
- Update delivery estimate ranges to: Starter 5–7, Business 7–14, Premium 14–21.
- Add disclaimer below estimator in the Custom Quote page.
- Ensure all numbers use Indian currency formatting (₹4,999 etc.).
- Run typecheck/build to ensure no regressions.

## Steps
1. Implement INR currency formatting + remove `$` usage in `src/components/sections/custom-quote/QuoteConfigurator.tsx`.
2. Align pricing constants/feature costs/pages additional pages/maintenance mapping + update total calculation.
3. Update delivery estimate text and selected package logic to match required tiers.
4. Add disclaimer under estimator (likely in `QuoteConfigurator` or `QuoteSummary`).
5. Update/verify for any remaining USD strings in custom quote section files.
6. Run `npm run lint` and `npm run build` (or project equivalent) to validate.


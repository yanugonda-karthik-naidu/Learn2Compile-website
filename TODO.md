# TODO - Fix build ESLint errors

## Plan approved scope
- Fix Next.js build failures by resolving ESLint errors and warnings in listed files.

## Steps
1. Remove unused imports/variables flagged by ESLint (no-unused-vars) across the provided files.
2. Fix `react/no-unescaped-entities` error in `PortfolioHeroSection.tsx` by escaping apostrophes.
3. Re-run `npm run build` to confirm compilation passes.
4. Re-run lint/build if any additional ESLint issues appear.


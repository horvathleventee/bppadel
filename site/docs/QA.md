# QA — 2026-10-14

- Production Next.js static export: successful (10 content routes plus 404, sitemap, robots).
- TypeScript: successful.
- ESLint: successful after removing an unused import.
- Automated export audit: 10 routes, 238 internal links, image src/srcset files, metadata, one H1 per page, Hungarian lang, main landmark, no tracker/iframe injection.
- Original club logo: SHA-256 equality against the user-supplied asset.
- Legal content: full normalized text comparison against each archived original page passed. Typography/whitespace only changed.
- Browser: homepage checked at 320, 360, 390, 430, 768, 1024, 1280, 1440, 1920 px, no horizontal overflow detected.
- All inner routes opened in browser at mobile width; correct titles, one H1, no overflow.
- Mobile menu: native modal opens, Escape closes, focus returns to trigger, route selection closes and navigates.
- Desktop/mobile screenshot review: readable hero, original logo, correct venue photographs, aligned editorial about section.
- Browser console: no errors or warnings observed.
- Booking: old tenant URL resolves to the real Budapest Padel Playtomic page; no booking/payment was submitted. Live availability is owned by Playtomic and not copied into this build.
- Local performance observations are not real-user Core Web Vitals. Lighthouse and a full assistive-technology audit were not run; no score or compliance certification is claimed.

## Dependency note

Next.js 16.4.0 / React 19.2 resolved through npm and locked. Sharp updated to patched 0.35.5. npm audit reports a development-only braces/fast-glob/eslint-config-next chain with no patched braces release available at time of checking; do not apply the suggested downgrade of Next lint tooling blindly. This chain is not served in the static output. Current Node 22.13+ or 24 LTS is recommended for full development-tool engine compatibility. Production dependency audit is checked separately.

Production dependency audit: zero vulnerabilities. Private review build sets noindex and uses its review origin for canonical URLs.


## Scroll animation verification

- New generated athlete and alpha-preserving responsive WebP files integrated.
- Browser observed approach (progress .357), racket contact (.485), foreground flight (.656), and reverse scroll back to contact (.485).
- Motion unit checks pass: exact contact point, continuous trajectory, clamping, finite transforms and bounded opacity.
- Scroll processing uses passive events, intersection gating and a single scheduled frame; reduced-motion branch renders a static contact pose.
- Inner pages additionally checked at all nine required widths (81 route/viewport combinations), no overflow.
- Final mobile framing refined so the complete racket remains inside the viewport throughout the swing.

## Small visual fixes

- Ball seam arcs now use proportional, smaller edge ellipses with a thinner stroke; they remain separated at mobile and desktop ball sizes.
- Footer uses the existing transparent PNG logo without the CSS ivory background or padding. The original asset remains byte-identical.
- Added a simple vector padel-racket favicon with 16/32 px PNG fallbacks and a 180 px Apple touch icon. This is a browser icon, not a replacement for the original club logo.

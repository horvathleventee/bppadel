# Budapest Padel

Premium Hungarian website redesign. Next.js App Router + TypeScript, statically exported for ordinary hosting. Eight courts were confirmed by the owner on 2026-10-14. The live budapestpadel.hu site was not changed.

## Run locally

Use a current Node 22 LTS release (22.13+ recommended) or Node 24 LTS, and npm.

```powershell
cd D:\bppadel\site
npm ci
npm run dev
```

Development: http://127.0.0.1:3000. Production build and preview:

```powershell
npm run build
npm run lint
npm run typecheck
npm test
node scripts/preview.mjs
```

The `out/` directory is the complete static website. `npm run assets` regenerates the responsive WebP files and legal JSON from archived source pages; it is not necessary for ordinary builds.

## Design and architecture

- Original gray Budapest Padel logo, unchanged. Ivory header keeps its original color readable.
- Dark forest green, lime accents, real court photography; Space Grotesk and Manrope locally hosted with Hungarian character support. Headlines use one consistent upright Space Grotesk treatment; hierarchy comes from size, line breaks and restrained color.
- Reusable server-rendered sections; the mobile navigation and scroll-linked athlete are small client components. Native modal dialog supplies focus containment and Escape support. CSS motion respects reduced-motion preferences.
- Custom CSS instead of a utility framework keeps the visual system explicit. No animation library needed for the transitions or the scroll-linked shot.
- Next Image with a custom local responsive-image loader. Build-time WebP optimization makes image optimization work on simple static hosting without a server or external image provider.
- `src/lib/config.ts`: contact details, booking URL, navigation, facilities, canonical origin.
- `src/components/`: header, footer, primitives, page sections.
- `src/app/[slug]/page.tsx`: dedicated routes, metadata and beginner guide.
- `content/`: original venue photos and losslessly extracted legal content.
- `docs/`: original public source snapshots, asset audit and verification notes.
- No WordPress, Elementor or paid plugin subscription required. Content is edited in source and rebuilt; this is not a CMS admin interface.

## Routes

`/`, `/rolunk/`, `/palyak/`, `/ghost-padel/`, `/dicsosegfal/`, `/kapcsolat/`, `/mi-az-a-padel/`, `/impresszum/`, `/adatkezelesi-tajekoztato/`, `/hazirend/`.

Also generated: custom 404, `/sitemap.xml`, `/robots.txt`. Existing page paths and the homepage contact anchor are preserved. Ghost Padel retains `/#ghostpadel`.

## Booking and contact

All booking buttons use https://playtomic.com/clubs/budapest-padel, the verified destination of the existing site's tenant booking link. The external provider manages availability, accounts, payments and confirmations. No reservation was made during testing. Phone, email, directions, Instagram and Facebook links are functional external links. No API keys or booking credentials are needed.

There is no contact form, tracking script, map embed, account system, or cookie storage in this implementation. Google Maps opens only when the visitor follows directions. Adding analytics later requires reviewing consent and the privacy notice first.

## Deployment

`out/` can be served by a static host, including a suitable existing hosting account. Serve directory index files, support trailing-slash URLs, use `404.html` for missing pages, enable HTTPS and compression, and cache hashed `_next/static/` resources immutably. Avoid replacing the existing WordPress site until its full files/database backup and domain/hosting access are available.

Set `NEXT_PUBLIC_SITE_URL` at build time to the destination origin. For private/staging review set `NEXT_PUBLIC_NOINDEX=true`; for the public Budapest Padel release unset it and use `https://budapestpadel.hu`. Rebuild after changes. The private Sites review uses the identity recorded in `.openai/hosting.json`; it does not redirect or replace the current domain.

## Owner review before a public launch

1. Confirm MONDO surface and digital scoring coverage on the four newly opened courts; the old website only documented the original four. General club-level claims are retained, not a claim that the expansion has identical equipment.
2. Check the original legal pages. They are preserved verbatim apart from layout/whitespace, but mention an old contact form, Analytics, hosting/e-mail providers, membership terms, and some rules that may no longer match operations. Update only after owner/legal approval.
3. Confirm the house rule forbidding wristbands against the advertised Bluetooth scoring wristbands, and the alcohol rule against actual bar operations.
4. Confirm continued photo usage rights, especially identifiable players in existing website photos. These are existing club website assets; no license documentation was supplied.
5. Supply new photos of the expansion if desired. Existing venue images date from the original site's July 2024 media directory.
6. Provide real Hall of Fame results if desired; no results, prices, event dates, testimonials or availability have been invented.
7. For launch on budapestpadel.hu, hosting/domain access and a rollback backup are still required.

## Verification

See `docs/QA.md` and `docs/AUDIT.md`. Build, TypeScript, lint, route/link/asset/legal/logo checks are included. Core Web Vitals are field metrics and cannot be certified from a local preview. No claimed Lighthouse score or WCAG certification.



## Client updates — 2026-10-14

Booking buttons now open a choice of phone, Playtomic or email. Pricing replaces the former fame section (16.000 Ft / court / hour; 1.500 Ft / racket / visit). Parking is free; digital scoring is no longer advertised. The gallery uses six existing venue photos; additional B-court photos are pending from the client.

The current house rules are supplied by the client and preserved verbatim in `docs/hazirend-client.txt` and `content/hazirend.json`. Asset regeneration intentionally leaves these rules untouched. Earlier audit notes about the original house rules and digital scoring are superseded by this update.

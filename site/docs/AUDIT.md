# Audit and asset inventory — 2026-10-14

## Sources inspected

- https://budapestpadel.hu/
- https://budapestpadel.hu/rolunk/
- https://budapestpadel.hu/dicsosegfal/
- https://budapestpadel.hu/hazirend/
- https://budapestpadel.hu/impresszum/
- https://budapestpadel.hu/adatkezelesi-tajekoztato/
- Existing contact navigation points to `/#kapcsolat`; a new dedicated `/kapcsolat/` is added.
- Existing booking opens an Elementor popup, containing `https://playtomic.io/tenant/1f54ab9e-b0bb-47cd-b9a0-de4c0dd0f474`. Verified redirect: https://playtomic.com/clubs/budapest-padel.
- Facebook/Instagram destination URLs extracted from the site's actual HTML.

## Findings

The previous site is WordPress/Elementor. Header navigation: homepage, about, Hall of Fame, contact anchor. Booking depends on an Elementor popup. The brief's mention of four courts matches the older website; Playtomic shows A1–A4 and B5–B8. The owner explicitly confirmed eight open courts in this chat. New copy uses eight. The new courts' precise equipment has not been independently verified.

Verified old-site facts: address, phone, email, daily opening hours, MONDO XN SUPERCOURT on original courts, Bluetooth scoring, racket rental, ball sales, showers, coded lockers, parking, lounge/bar, special-occasion Ghost Padel. Hall of Fame says “LÉGY TE AZ ELSŐ!” with no rankings; intentional empty state retained.

Old privacy text refers to a contact form and Analytics. These are absent from the new implementation. Existing imprint identifies TRE FONDI Kft. and Websupport; verify before the production hosting migration. House rules contain an apparent wristband/scoring inconsistency and membership details not promoted elsewhere. All legal text is retained; no legal claims were rewritten.

## Assets

| New asset | Source | Classification / use |
|---|---|---|
| `public/images/logo.png` | User's `budapest-padel-head-3.png` | Exact original Budapest Padel logo; byte-identical, no recoloring/filter/recreation |
| `content/action.png` | User's `budapest-padel-head-1.png` | Existing promotional player cutout, illustrative; not represented as a verified club visitor |
| `content/venue-1.jpg` | Existing site's `budapest-padel-gallery-1.jpg` | Authentic existing venue asset: rental rackets |
| `content/venue-2.jpg` | Existing site's `budapest-padel-gallery-2.jpg` | Authentic existing venue asset: balls; retained for later use |
| `content/venue-3.jpg` | Existing site's `budapest-padel-gallery-3.jpg` | Authentic existing venue asset: courts and seating |
| `content/venue-4.jpg` | Existing site's `budapest-padel-gallery-4.jpg` | Authentic existing venue asset: players on court; hero and court section |
| `content/venue-5.jpg` | Existing site's `budapest-padel-gallery-5.jpg` | Authentic existing venue asset: lounge seating |
| `content/venue-6.jpg` | Existing site's `budapest-padel-gallery-6.jpg` | Authentic existing venue asset: overhead court view |
| Ghost court lines and ball | CSS geometry | Decorative illustration, not an actual venue photo |

All gallery originals come from `https://budapestpadel.hu/wp-content/uploads/2024/07/`. Responsive derivatives: 160, 320, 360, 640, 960, 1440 and 1920 width WebPs (without upscaling). Original image files retained in `content/`. Existing supplied HEAD logo, Playtomic logo, Ghost mark and brush-cutout artwork are retained in the user's original folder; they are not required by the new composition. `head-logo.png` is the HEAD equipment brand, not the club logo.

Initially no AI images were generated; see the subsequent scroll-shot update below. No stock photos were acquired. No image-generation credentials are missing. No need to create artificial facility photography. A real Ghost event photo and photos of the expansion would be useful optional upgrades.

## Scroll-shot update

The beginner section now uses `content/athlete-v2.png`, a fictional AI-generated athlete produced with the built-in image_gen tool on 2026-10-14, plus responsive WebP derivatives. It replaces the old action cutout in the visible design. It is editorial illustration, not a club member or actual event photo. Alpha transparency is retained. Source generation prompt: `docs/ATHLETE-PROMPT.md`.

The athlete leans through the forehand as a separate CSS ball layer approaches the racket, makes contact and travels toward the foreground. Motion is reversible and scroll-linked, with a passive scroll listener, requestAnimationFrame and IntersectionObserver. It does not take over scrolling. Reduced-motion preference freezes the composition and removes impact/trail effects.


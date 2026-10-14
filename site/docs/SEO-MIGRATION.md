# SEO-ellenőrzés és Vercel-költözés — 2026. október 14.

## Eredmény és hatókör

A kód és a statikus export technikai SEO-ellenőrzése sikeres. Ez nem jelent garantált Google-helyezést vagy teljes körű éles SEO-minősítést. A budapestpadel.hu jelenleg továbbra is a régi WordPress-oldalt szolgálja ki; a Vercel HTTP-válaszai még nem ellenőrizhetők élesben.

A vizsgálat alapja a régi robots.txt, a WordPress sitemap és annak hat oldala, a kezdőlap linkjei és a nyilvános WordPress-oldallista. Az audit nyers eredménye: `legacy-url-audit.json`, az eredeti sitemap: `legacy-sitemap.xml`. Search Console-, szervernapló- és backlink-adatok nélkül régebben létezett, de ma már nem hivatkozott URL-ek teljes listája nem állapítható meg.

## Elkészült

- Céges csapatépítő oldal, menüpont, egyedi keresőcím és leírás, e-mailes ajánlatkérés, telefon.
- 12 oldal egyedi title/description/canonical értékekkel, magyar nyelvvel, egy H1 címmel és ellenőrzött belső linkekkel.
- Aloldali Open Graph öröklési hiba javítva; minden oldal valóban létező, pontosan 1200×630-as közösségi megosztási képet kapott. Twitter-kártya és morzsamenü strukturált adatok.
- SportsActivityLocation JSON-LD a tényleges üzleti elérhetőségekkel és nyitvatartással.
- Sitemapben csak aktív, kanonikus oldalak. A megszűnt oldal nincs benne.
- Production build indexelhető; a Vercel preview build automatikusan noindex. A *.vercel.app hosztokra külön X-Robots-Tag tiltás is van, hogy az éles domain aliasa se váljon külön indexelhető példánnyá.
- A privát Sites előnézet külön build: noindex és robots tiltás, saját előnézeti canonical URL-lel.
- Nem létező oldalakhoz 404.html; nincs minden URL-t főoldalra irányító szabály.
- Tesztek: `npm test`, `npm run test:seo`. Utóbbi a generált HTML-t és a Vercel-szabályok céljainak létezését/láncmentességét is ellenőrzi, de nem szimulálja a Vercel infrastruktúráját.

## Régi URL-ek

| Régi cím | Költözés után |
|---|---|
| `/` | Megmarad, 200 |
| `/rolunk/` | Megmarad, 200 |
| `/hazirend/` | Megmarad, 200 |
| `/impresszum/` | Megmarad, 200 |
| `/adatkezelesi-tajekoztato/` | Megmarad, 200 |
| `/dicsosegfal/` és slash nélküli alakja | 301 → `/galeria/` |
| `/wp-sitemap.xml` | 301 → `/sitemap.xml` |
| `/wp-sitemap-posts-page-1.xml` | 301 → `/sitemap.xml` |
| Hat régi, a kezdőlapról linkelt `budapest-padel-gallery-N.jpg` | 301 → azonos fotó új WebP változata |
| `www.budapestpadel.hu` | 301 → `budapestpadel.hu`, útvonal megtartásával |

A régi Dicsőségfal egy üres „Légy te az első” helyőrző volt, eredmények nélkül. A galéria a közösségi tartalom utódja; nem az árlistára irányítunk. A hat régi galériakép és a helyi eredetik SHA-256 egyezését ellenőriztük. Más régi médiák, letöltések és numerikus WordPress query URL-ek felméréséhez teljes médiaexport/Search Console szükséges; nem készültek találomra általános átirányítások.

A `site/vercel.json` explicit `statusCode: 301` szabályokat tartalmaz. A Vercel saját slash-normalizálása 308-at használhat: ez szintén végleges átirányítás. A meglévő domain HTTP→HTTPS és www→nem-www válasza a vizsgálat idején 301 volt a régi tárhelyen. Ezeket a költözés után újra kell mérni. A www és régi útvonal kombinációja két lépésből állhat.

## Vercel beállítások az élesítéshez

1. GitHub: `horvathleventee/bppadel`, Root Directory: **site**. Framework: Next.js. Build: `npm run build`, Output Directory: `out`. Node: 22.13+ vagy 24 LTS.
2. Production környezet: `NEXT_PUBLIC_SITE_URL=https://budapestpadel.hu`, `NEXT_PUBLIC_NOINDEX=false`. Preview környezetben noindex maradjon; a VERCEL_ENV automatikus védelmet ad. A Sites előnézethez használt változókat ne másold át productionbe.
3. Add hozzá a `budapestpadel.hu` és `www.budapestpadel.hu` domaineket; a Vercel által megadott DNS rekordokat használd. A levelezés MX/TXT rekordjait őrizd meg. A www hosztot ugyanahhoz a projekthez rendeld, a repo 301 szabályát használd; külön dashboard-átirányítás felülírhatja ezt.
4. WordPress mentés, médiaexport és DNS visszaállítási lehetőség legyen meg a váltás előtt. A teljes régi `/wp-content/uploads/` megtartása megőrzi a még fel nem mért médiák URL-jeit is.
5. Production build ellenőrzése a `site` mappából: `npm run test:seo` (alapértelmezett elvárás budapestpadel.hu, indexelhető). Előnézet ellenőrzéséhez állítsd a `SEO_EXPECT_ORIGIN` és `SEO_EXPECT_NOINDEX=true` értékeket.
6. Domainváltás után: `npm run test:seo:live -- https://budapestpadel.hu`. Ez tényleges 301/Location/200 válaszokat és ismeretlen URL-re 404-et kér számon. Futtasd a www és HTTP változatok külön ellenőrzését is.
7. Google Search Console: tulajdonjog megtartása/ellenőrzése, új sitemap.xml beküldése, kezdőlap és fontos aloldalak URL Inspection vizsgálata, indexelési és 404 riportok figyelése. Azonos domainnél nem kell domainváltást bejelenteni.
8. Átirányításokat legalább egy évig tartsd meg. A régi forgalmi/backlink URL-eket a Search Console exportjával egészítsd ki.

## Még élesben ellenőrizendő

- Vercel domain/DNS/SSL, tényleges 301/404 státuszok, válaszfejlécek és Google-bot hozzáférés.
- Google Rich Results Test és Search Console indexelhetőség.
- Mobil PageSpeed/Lighthouse és valós Core Web Vitals (LCP, INP, CLS). Itt nem készült hiteles valós forgalmi sebességmérés; a buildteszt nem helyettesíti.
- Teljes korábbi URL- és médiakészlet Search Console-ból/WordPress-exportból.
- Google Business Profile üzleti adatok és helyi keresési jelenlét. Kulcsszókutatás, tartalomstratégia és backlink-audit külön feladat.

## Hivatalos források

- https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes
- https://vercel.com/docs/project-configuration/vercel-json#redirects
- https://nextjs.org/docs/app/guides/static-exports

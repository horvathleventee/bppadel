import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  About,
  Courts,
  Ghost,
  Facilities,
  Beginner,
  Fame,
  Community,
  Booking,
  Contact,
} from "@/components/sections";
import { Button, Eyebrow } from "@/components/ui";
import { readFile } from "node:fs/promises";
import path from "node:path";
const pages: Record<
  string,
  { title: string; headline: string; description: string; label: string }
> = {
  rolunk: {
    title: "A központról",
    headline: "EGY HELY. KÖZÖS SZENVEDÉLY.",
    description:
      "Nyolc pálya és egy közösség Budapest XVI. kerületében. Ismerd meg a Budapest Padelt.",
    label: "Ez a Budapest Padel",
  },
  palyak: {
    title: "Padel pályák Budapesten",
    headline: "NYOLC PÁLYA. A TE JÁTÉKOD.",
    description:
      "Szuperpanorámás pályák, modern felszereltség és online pályafoglalás. Találkozunk a Kövirózsa utcában.",
    label: "A játék tere",
  },
  "ghost-padel": {
    title: "Ghost Padel",
    headline: "EGY MECCS. MÁS DIMENZIÓ.",
    description:
      "Fedezd fel a padel fluoreszkáló oldalát. Különleges alkalmak, különleges hangulat.",
    label: "Ghost Padel",
  },
  dicsosegfal: {
    title: "Dicsőségfal",
    headline: "ITT MARADNAK AZ EMLÉKEK.",
    description:
      "A Budapest Padel dicsőségfala. A közzétett eredmények és emlékezetes teljesítmények helye.",
    label: "A közösség pillanatai",
  },
  kapcsolat: {
    title: "Kapcsolat és megközelítés",
    headline: "TALÁLKOZUNK A PÁLYÁN.",
    description:
      "Budapest, XVI. kerület, Kövirózsa utca. Minden nap 08:00–23:00. Kérdésed van? Hívj vagy írj nekünk.",
    label: "Várunk a Budapest Padelben",
  },
  "mi-az-a-padel": {
    title: "Mi az a padel? Kezdő útmutató",
    headline: "AZ ELSŐ LABDAMENETED.",
    description:
      "Négy játékos, egy pálya, közös élmény. Ismerd meg a padel alapjait, mielőtt először pályára lépsz.",
    label: "Padel, egyszerűen",
  },
  impresszum: {
    title: "Impresszum",
    headline: "IMPRESSZUM",
    description: "A szolgáltató és a tárhelyszolgáltató adatai.",
    label: "Jogi információk",
  },
  hazirend: {
    title: "Házirend",
    headline: "HÁZIREND",
    description: "A Budapest Padel központ használatának szabályai.",
    label: "Jogi információk",
  },
  "adatkezelesi-tajekoztato": {
    title: "Adatkezelési tájékoztató",
    headline: "ADATKEZELÉSI TÁJÉKOZTATÓ",
    description: "Tájékoztatás a személyes adatok kezeléséről és a sütikről.",
    label: "Jogi információk",
  },
};
export const dynamicParams = false;
export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = pages[slug];
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/${slug}/` },
    openGraph: {
      title: `${page.title} | Budapest Padel`,
      description: page.description,
      url: `/${slug}/`,
    },
  };
}
function Guide() {
  const steps = [
    [
      "Ketten egy oldalon",
      "A padelt általában párosban játsszák. A cél, hogy a labdát a háló felett az ellenfél térfelére juttassátok, és pontot szerezzetek.",
    ],
    [
      "A fal is játékban van",
      "A pályát üvegfalak és kerítés veszi körül. A labda a talajon történő pattanás után az üvegfalról is visszajátszható. Ez adja a játék egyik különleges ritmusát.",
    ],
    [
      "Kezdj egy adogatással",
      "Az adogatás alulról, a labda lepattintása után történik, legfeljebb derékmagasságban. Átlósan az ellenfél adogatóudvarába kell érkeznie.",
    ],
    [
      "Figyeld a pontokat",
      "A pontszámítás alapja a teniszhez hasonló: 15, 30, 40, majd játék. A meccs pontos formátumát a játék előtt egyeztessétek.",
    ],
  ];
  return (
    <section className="section">
      <div className="container guide">
        {steps.map(([title, text], i) => (
          <article key={title} className="guide-step">
            <span>0{i + 1}</span>
            <div>
              <h2>{title}</h2>
              <p>{text}</p>
            </div>
          </article>
        ))}
        <div className="faq">
          <h2>Az első alkalom előtt</h2>
          <details>
            <summary>Mit hozzak magammal?</summary>
            <p>
              Kényelmes sportruhát, megfelelő sportcipőt és vizet. A részletes
              szabályokat a <Link href="/hazirend/">házirendben</Link> találod.
            </p>
          </details>
          <details>
            <summary>Kell saját ütő?</summary>
            <p>
              Nem feltétlenül. A Budapest Padelben ütőbérlés és labdavásárlás is
              elérhető. A részletekről érdeklődj a recepción.
            </p>
          </details>
          <details>
            <summary>Hogyan foglalhatok?</summary>
            <p>
              A Pályafoglalás gomb a Budapest Padel Playtomic-oldalára vezet. Az
              aktuális időpontokat és árakat ott találod. Telefonon is
              érdeklődhetsz.
            </p>
          </details>
          <details>
            <summary>Hogyan próbálhatom ki a Ghost Padelt?</summary>
            <p>
              A Ghost Padel különleges alkalmakon érhető el. Az aktuális
              lehetőségekről telefonon vagy e-mailben érdeklődj.
            </p>
          </details>
        </div>
      </div>
    </section>
  );
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = pages[slug];
  if (!data) notFound();
  const legal = ["impresszum", "hazirend", "adatkezelesi-tajekoztato"].includes(
    slug,
  );
  let blocks: { type: string; text: string }[] = [];
  if (legal)
    blocks = JSON.parse(
      await readFile(
        path.join(process.cwd(), "content", `${slug}.json`),
        "utf8",
      ),
    );
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Morzsamenü">
            <Link href="/">Kezdőlap</Link>
            <span>/</span>
            <span>{data.title}</span>
          </nav>
          <Eyebrow>{data.label}</Eyebrow>
          <h1>{data.headline}</h1>
          <p>{data.description}</p>
          {slug === "palyak" && <Button />}
        </div>
      </section>
      {slug === "rolunk" && (
        <>
          <About full />
          <Facilities />
          <Community />
        </>
      )}
      {slug === "palyak" && (
        <>
          <Courts full />
          <Facilities />
          <Beginner />
        </>
      )}
      {slug === "ghost-padel" && (
        <>
          <Ghost full />
          <Contact />
        </>
      )}
      {slug === "dicsosegfal" && (
        <>
          <Fame full />
          <Community />
        </>
      )}
      {slug === "kapcsolat" && <Contact />}
      {slug === "mi-az-a-padel" && (
        <>
          <Guide />
          <Beginner />
        </>
      )}
      {legal ? (
        <article className="container legal">
          {blocks.map((b, i) =>
            b.type === "heading" ? (
              <h2 key={i}>{b.text}</h2>
            ) : (
              <p key={i}>{b.text}</p>
            ),
          )}
        </article>
      ) : (
        <Booking />
      )}
    </>
  );
}

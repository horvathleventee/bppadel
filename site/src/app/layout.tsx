import "@fontsource-variable/manrope";

import "@fontsource-variable/space-grotesk";

import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { SITE_URL, club, IS_NOINDEX, socialImage } from "@/lib/config";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  title: {
    default: "Fedett padelpályák Budapesten | Budapest Padel",
    template: "%s | Budapest Padel",
  },
  description:
    "8 fedett, klimatizált padelpálya Budapest XVI. kerületében. Pályafoglalás, ütőbérlés, céges csapatépítő és ingyenes parkolás. Nyitva minden nap 8–23 óráig.",
  openGraph: {
    type: "website",
    locale: "hu_HU",
    siteName: "Budapest Padel",
    url: SITE_URL,
    images: [socialImage],
  },
  twitter: { card: "summary_large_image", images: [socialImage.url] },
  robots:
    IS_NOINDEX
      ? { index: false, follow: false }
      : { index: true, follow: true },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    "@id": `${SITE_URL}/#club`,
    name: club.name,
    image: `${SITE_URL}${socialImage.url}`,
    url: SITE_URL,
    telephone: club.phone,
    email: club.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kövirózsa utca",
      postalCode: "1163",
      addressLocality: "Budapest",
      addressCountry: "HU",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "08:00",
      closes: "23:00",
    },
    sameAs: [club.instagram, club.facebook],
  };
  return (
    <html lang="hu">
      <body>
        <a className="skip-link" href="#main">
          Ugrás a tartalomhoz
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}

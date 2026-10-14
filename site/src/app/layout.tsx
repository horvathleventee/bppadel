import "@fontsource-variable/manrope";

import "@fontsource-variable/space-grotesk";

import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { SITE_URL, club } from "@/lib/config";
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
    default: "Budapest Padel — Itt kezdődik a játék.",
    template: "%s | Budapest Padel",
  },
  description:
    "Nyolc szuperpanorámás padel pálya Budapest XVI. kerületében. Pályafoglalás, ütőbérlés és Ghost Padel különleges alkalmakon.",
  openGraph: {
    type: "website",
    locale: "hu_HU",
    siteName: "Budapest Padel",
    images: [
      {
        url: "/images/venue-4-1440.webp",
        width: 1440,
        height: 810,
        alt: "A Budapest Padel pályái",
      },
    ],
  },
  robots:
    process.env.NEXT_PUBLIC_NOINDEX === "true"
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
    name: club.name,
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

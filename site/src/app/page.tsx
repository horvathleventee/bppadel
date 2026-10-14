import {
  Hero,
  Facts,
  About,
  Courts,
  Ghost,
  Facilities,
  Beginner,
  Pricing,
  Community,
  Booking,
  Contact,
} from "@/components/sections";
import type { Metadata } from "next";
export const metadata: Metadata = { alternates: { canonical: "/" } };
export default function Home() {
  return (
    <>
      <Hero />
      <Facts />
      <About />
      <Courts />
      <Ghost />
      <Facilities />
      <Beginner />
      <Pricing />
      <Community />
      <Booking />
      <Contact />
    </>
  );
}

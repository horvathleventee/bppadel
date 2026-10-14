import type { MetadataRoute } from "next";
import { SITE_URL, navigation, legalNavigation } from "@/lib/config";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "/",
    ...navigation.map((p) => p.href),
    "/mi-az-a-padel/",
    ...legalNavigation.map((p) => p.href),
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}

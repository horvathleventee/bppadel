import type { MetadataRoute } from "next";
import { SITE_URL, IS_NOINDEX } from "@/lib/config";
export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      ...(IS_NOINDEX
        ? { disallow: "/" }
        : { allow: "/" }),
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

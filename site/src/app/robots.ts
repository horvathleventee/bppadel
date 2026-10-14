import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";
export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      ...(process.env.NEXT_PUBLIC_NOINDEX === "true"
        ? { disallow: "/" }
        : { allow: "/" }),
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

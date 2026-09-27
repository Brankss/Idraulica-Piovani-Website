import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo/metadata";
import { isDemo } from "@/lib/site-mode";

export default function robots(): MetadataRoute.Robots {
  // Demo previews stay out of search engines entirely.
  if (isDemo) return { rules: [{ userAgent: "*", disallow: "/" }] };
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/api", "/grazie"] }],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}

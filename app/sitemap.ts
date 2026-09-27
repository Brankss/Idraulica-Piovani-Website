import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { siteUrl } from "@/lib/seo/metadata";

/** /lavori and /grazie are noindex and deliberately left out. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly") => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });
  return [
    page("", 1, "weekly"),
    page("/servizi", 0.9),
    ...services.map((s) => page(`/servizi/${s.slug}`, 0.8)),
    page("/sanatherm", 0.8),
    page("/preventivo", 0.8),
    page("/prenota", 0.7),
    page("/bioedilizia", 0.7),
    page("/chi-siamo", 0.6),
    page("/zone-servite", 0.6),
    page("/faq", 0.6),
    page("/contatti", 0.7),
    page("/privacy", 0.2, "yearly"),
    page("/cookie-policy", 0.2, "yearly"),
    page("/termini", 0.2, "yearly"),
    page("/note-legali", 0.2, "yearly"),
    page("/accessibilita", 0.2, "yearly"),
  ];
}

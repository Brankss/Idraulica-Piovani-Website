import type { Metadata } from "next";
import { company } from "@/content/company";
import { isDemo } from "@/lib/site-mode";

/**
 * Canonical origin: explicit env var, else the host's own production URL
 * (Vercel / Netlify set these at build time), else the client's domain.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined) ??
  process.env.URL ??
  company.siteUrl;

/** Demo previews must never be indexed. */
export const demoRobots = { index: false, follow: false } as const;

type PageMeta = {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  /** Absolute or site-relative OG image; defaults to the route's opengraph-image */
  image?: string;
};

/** Page metadata with canonical URL and Open Graph, Italian locale. */
export function pageMetadata({ title, description, path, noindex, image }: PageMeta): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "it_IT",
      siteName: company.brand,
      url: path,
      title,
      description,
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: { card: "summary_large_image", title, description },
    robots: isDemo ? demoRobots : noindex ? { index: false, follow: true } : undefined,
  };
}

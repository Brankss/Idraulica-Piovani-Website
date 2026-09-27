import type { Metadata } from "next";
import { company } from "@/content/company";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? company.siteUrl;

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
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}

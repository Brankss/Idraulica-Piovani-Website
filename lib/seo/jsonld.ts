import { company, primaryAddress } from "@/content/company";
import type { Faq } from "@/content/faq";
import type { Service } from "@/content/services";
import { zones } from "@/content/zones";
import { siteUrl } from "./metadata";

const DAY_NAMES = ["", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

/** Serialise for a <script type="application/ld+json"> (XSS-safe). */
export function jsonLdString(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function businessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Plumber",
    "@id": `${siteUrl}/#business`,
    name: company.brand,
    url: siteUrl,
    logo: `${siteUrl}/brand/piovani-mark.svg`,
    image: `${siteUrl}/opengraph-image`,
    telephone: company.phones[0].e164,
    email: company.email,
    vatID: `IT${company.vatNumber}`,
    foundingDate: String(company.foundedYear),
    address: {
      "@type": "PostalAddress",
      streetAddress: primaryAddress.street,
      postalCode: primaryAddress.postalCode,
      addressLocality: primaryAddress.city,
      addressRegion: primaryAddress.province,
      addressCountry: "IT",
    },
    geo: { "@type": "GeoCoordinates", latitude: company.geo.lat, longitude: company.geo.lng },
    openingHoursSpecification: company.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days.map((d) => DAY_NAMES[d]),
      opens: h.opens,
      closes: h.closes,
    })),
    areaServed: [
      { "@type": "AdministrativeArea", name: "Provincia di Brescia" },
      ...zones.flatMap((z) => z.municipalities.map((m) => ({ "@type": "City", name: m }))),
    ],
    paymentAccepted: company.paymentMethods.join(", "),
    currenciesAccepted: "EUR",
  };
}

export function serviceJsonLd(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.metaDescription,
    serviceType: service.title,
    url: `${siteUrl}/servizi/${service.slug}`,
    provider: { "@id": `${siteUrl}/#business` },
    areaServed: { "@type": "AdministrativeArea", name: "Provincia di Brescia" },
  };
}

export function faqJsonLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${siteUrl}${it.path}`,
    })),
  };
}

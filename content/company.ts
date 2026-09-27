/**
 * Single source of truth for NAP (name, address, phone) and company facts.
 * Footer, contact page, JSON-LD and legal pages all read from here — change a
 * value once and every surface stays consistent (local SEO depends on it).
 *
 * `confirmed: false` marks facts still to be verified with the owner before
 * launch; they are tracked in docs/da-confermare.md.
 */

export type Phone = {
  label: string;
  /** E.164, used for tel: links and structured data */
  e164: string;
  display: string;
  whatsapp?: boolean;
};

export type OpeningSlot = {
  /** ISO weekday numbers, 1 = Monday */
  days: number[];
  opens: string;
  closes: string;
};

export const company = {
  brand: "Idraulica Piovani",
  tagline: "Idraulica · dal 1930",
  /**
   * Shown as on the client's current site. The exact legal form (ditta
   * individuale? società?) is [DA CONFERMARE] before launch.
   */
  legalName: "Idraulica Piovani",
  legalNameConfirmed: false,
  foundedYear: 1930,
  vatNumber: "01780070171",
  /** [DA CONFERMARE] */
  rea: null as string | null,
  /** [DA CONFERMARE] */
  pec: null as string | null,
  email: "info@idraulicapiovani.it",
  siteUrl: "https://www.idraulicapiovani.com",
  phones: [
    { label: "Cellulare e WhatsApp", e164: "+393477357987", display: "347 735 7987", whatsapp: true },
    { label: "Telefono fisso", e164: "+390306830780", display: "030 683 0780" },
  ] satisfies Phone[],
  addresses: [
    {
      label: "Brescia",
      street: "Via Fermi, 42",
      postalCode: "25133",
      city: "Brescia",
      province: "BS",
      primary: true,
      confirmed: true,
    },
    {
      /** Listed on the client's site without a role: [DA CONFERMARE] */
      label: "Caino",
      street: "Via Villa Mattina, 44G5",
      postalCode: "25070",
      city: "Caino",
      province: "BS",
      primary: false,
      confirmed: false,
    },
  ],
  geo: { lat: 45.57107, lng: 10.24645 },
  hours: [
    { days: [1, 2, 3, 4, 5], opens: "08:00", closes: "12:00" },
    { days: [1, 2, 3, 4, 5], opens: "13:00", closes: "19:00" },
  ] satisfies OpeningSlot[],
  hoursLabel: "Lun–Ven 8:00–12:00 · 13:00–19:00",
  hoursShort: "Lun–Ven 8–19",
  paymentMethods: ["Contanti", "Bonifico bancario", "Assegno"],
  areaServed: "Brescia e provincia",
} as const;

export const primaryPhone = company.phones[0];
export const officePhone = company.phones[1];
export const primaryAddress = company.addresses[0];

export function telHref(phone: Phone) {
  return `tel:${phone.e164}`;
}

export function whatsappHref(message?: string) {
  const number = primaryPhone.e164.replace("+", "");
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${number}${text}`;
}

export function formatAddress(a: (typeof company.addresses)[number]) {
  return `${a.street}, ${a.postalCode} ${a.city} (${a.province})`;
}

export const yearsOfActivity = () => new Date().getFullYear() - company.foundedYear;

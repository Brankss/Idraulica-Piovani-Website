import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { company } from "@/content/company";
import { demoRobots, siteUrl } from "@/lib/seo/metadata";
import { isDemo } from "@/lib/site-mode";
import "@/styles/globals.css";

// Self-hosted at build time by next/font: the browser never calls Google.
const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin", "latin-ext"],
  weight: "variable",
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${company.brand} · Idraulico a Brescia dal ${company.foundedYear}`,
    template: `%s · ${company.brand}`,
  },
  description:
    "Impianti idraulici, caldaie, riscaldamento radiante e bioedilizia a Brescia e provincia. Preventivo online in 2 minuti e prenotazione del sopralluogo.",
  applicationName: company.brand,
  robots: isDemo ? demoRobots : undefined,
  formatDetection: { telephone: false, address: false, email: false },
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName: company.brand,
  },
};

export const viewport: Viewport = {
  themeColor: "#f1f2ee",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="it" className={`${archivo.variable} ${plexSans.variable} ${plexMono.variable}`}>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}

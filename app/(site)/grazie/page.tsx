import { RiCheckboxCircleLine } from "@remixicon/react";
import type { Metadata } from "next";
import { company } from "@/content/company";
import { Container, CtaLink } from "@/components/site/ui";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Richiesta ricevuta",
  description: "Abbiamo ricevuto la tua richiesta.",
  path: "/grazie",
  noindex: true,
});

/** Landing page for form submissions without JavaScript (server fallback, backend phase). */
export default function GraziePage() {
  return (
    <Container className="max-w-2xl py-20 text-center md:py-28">
      <RiCheckboxCircleLine className="mx-auto size-14 text-text-eco" aria-hidden="true" />
      <h1 className="mt-6 font-display text-h1 md:text-h1-lg">Richiesta ricevuta</h1>
      <p className="mt-4 text-lead text-text-secondary">
        Grazie. Ti rispondiamo negli orari di apertura: {company.hoursLabel.toLowerCase()}.
      </p>
      <div className="mt-8 flex justify-center">
        <CtaLink href="/" variant="secondary">
          Torna alla home
        </CtaLink>
      </div>
    </Container>
  );
}

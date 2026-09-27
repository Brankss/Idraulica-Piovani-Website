import { RiCalculatorLine, RiCalendarCheckLine, RiPhoneLine } from "@remixicon/react";
import { company, primaryPhone, telHref } from "@/content/company";
import { Container, CtaLink, Eyebrow } from "./ui";

/** Closing call to action shared by most pages. */
export function CtaBand({
  title = "Raccontaci cosa ti serve",
  lead = "Stima online in due minuti, sopralluogo su appuntamento, oppure una telefonata: scegli tu.",
}: {
  title?: string;
  lead?: string;
}) {
  return (
    <section aria-labelledby="cta-title" className="bg-background-inverse text-text-inverse tech-grid-inverse">
      <Container className="py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <Eyebrow tone="inverse">Dal {company.foundedYear}, a Brescia</Eyebrow>
            <h2 id="cta-title" className="mt-4 font-display text-h2 text-balance md:text-h2-lg">
              {title}
            </h2>
            <p className="mt-4 max-w-xl text-lead text-text-inverse-secondary">{lead}</p>
          </div>
          <div className="grid gap-3">
            <CtaLink href="/preventivo" icon={RiCalculatorLine} trailing={false} className="w-full">
              Calcola il preventivo
            </CtaLink>
            <div className="grid grid-cols-2 gap-3">
              <CtaLink href="/prenota" variant="secondary" icon={RiCalendarCheckLine} trailing={false} className="w-full">
                Prenota
              </CtaLink>
              <CtaLink href={telHref(primaryPhone)} variant="secondary" icon={RiPhoneLine} trailing={false} className="w-full">
                Chiama
              </CtaLink>
            </div>
            <p className="text-center text-small text-text-inverse-secondary">{company.hoursLabel}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}

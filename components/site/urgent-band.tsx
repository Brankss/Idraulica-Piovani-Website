import { RiAlarmWarningLine, RiPhoneLine, RiWhatsappLine } from "@remixicon/react";
import Link from "next/link";
import { company, primaryPhone, telHref, whatsappHref } from "@/content/company";
import { Container, CtaLink } from "./ui";

export function UrgentBand() {
  return (
    <section aria-labelledby="urgenze-title" className="bg-background-inverse text-text-inverse">
      <Container className="py-6 md:py-5">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-background-inverse-raised text-text-accent-inverse">
              <RiAlarmWarningLine className="size-6" aria-hidden="true" />
            </span>
            <div>
              <h2 id="urgenze-title" className="text-copy-strong">
                Un guasto o una perdita d&apos;acqua?
              </h2>
              <p className="mt-1 text-small text-text-inverse-secondary">
                Chiudi il rubinetto generale e chiamaci: {company.hoursLabel.toLowerCase()}.{" "}
                <Link href="/servizi/pronto-intervento-idraulico" className="text-text-accent-inverse underline underline-offset-4">
                  Cosa fare subito
                </Link>
              </p>
            </div>
          </div>
          <div className="grid shrink-0 grid-cols-2 gap-3 md:flex">
            <CtaLink href={telHref(primaryPhone)} icon={RiPhoneLine} trailing={false}>
              Chiama
            </CtaLink>
            <CtaLink href={whatsappHref("Buongiorno, ho un problema urgente:")} variant="secondary" icon={RiWhatsappLine} trailing={false} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </CtaLink>
          </div>
        </div>
      </Container>
    </section>
  );
}

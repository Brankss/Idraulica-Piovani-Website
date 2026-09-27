import { RiPhoneLine } from "@remixicon/react";
import type { Metadata } from "next";
import { company, primaryPhone, telHref } from "@/content/company";
import { zones } from "@/content/zones";
import { Crumbs } from "@/components/site/crumbs";
import { CtaBand } from "@/components/site/cta-band";
import { StaticMap } from "@/components/site/static-map";
import { Container, CtaLink, PageHeader, Section, SectionHeading } from "@/components/site/ui";
import { ZoneList } from "@/components/site/zone-list";
import { pageMetadata } from "@/lib/seo/metadata";

const count = zones.reduce((n, z) => n + z.municipalities.length, 0);

export const metadata: Metadata = pageMetadata({
  title: "Zone servite: Brescia e provincia",
  description: `Idraulica Piovani lavora a Brescia e in provincia: hinterland, Valtrompia, Valle Sabbia, ovest e Franciacorta. Oltre ${count} comuni serviti.`,
  path: "/zone-servite",
});

export default function ZonePage() {
  return (
    <>
      <PageHeader
        breadcrumb={<Crumbs items={[{ name: "Zone servite", path: "/zone-servite" }]} />}
        eyebrow="Dove lavoriamo"
        title="Brescia e provincia"
        lead={`Partiamo dalla sede di Brescia, in via Fermi, e raggiungiamo ogni giorno i comuni della provincia. ${company.hoursShort}.`}
      />
      <Section>
        <Container className="space-y-12">
          <div>
            <SectionHeading
              eyebrow="Per zona"
              title="Organizziamo le uscite per zona"
              lead="Quando prenoti online ti proponiamo per primi i giorni in cui siamo già nella tua zona: meno strada per noi, più scelta di orari per te. I tempi indicati sono quelli medi di viaggio dalla sede."
            />
            <ZoneList className="mt-8" />
          </div>
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div className="rounded-card bg-background-secondary-default p-6">
              <p className="font-display text-h3">Il tuo comune non è nell&apos;elenco?</p>
              <p className="mt-2 text-copy text-text-secondary">
                Chiamaci: per lavori importanti ci spostiamo volentieri anche fuori da queste zone.
              </p>
              <CtaLink href={telHref(primaryPhone)} icon={RiPhoneLine} trailing={false} className="mt-5 w-full sm:w-auto">
                Chiama {primaryPhone.display}
              </CtaLink>
            </div>
            <StaticMap />
          </div>
        </Container>
      </Section>
      <CtaBand />
    </>
  );
}

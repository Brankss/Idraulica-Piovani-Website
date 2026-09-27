import type { Metadata } from "next";
import { services } from "@/content/services";
import { Crumbs } from "@/components/site/crumbs";
import { CtaBand } from "@/components/site/cta-band";
import { ServiceList } from "@/components/site/service-list";
import { Container, PageHeader, Section } from "@/components/site/ui";
import { UrgentBand } from "@/components/site/urgent-band";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Servizi idraulici e di riscaldamento a Brescia",
  description:
    "Pronto intervento, riparazioni, caldaie a condensazione, riscaldamento radiante, bagni, impianti solari, acqua piovana e stufe in terra cruda a Brescia e provincia.",
  path: "/servizi",
});

export default function ServiziPage() {
  const urgent = services.filter((s) => s.urgent);
  const rest = services.filter((s) => !s.urgent && !s.eco);
  const eco = services.filter((s) => s.eco);
  return (
    <>
      <PageHeader
        breadcrumb={<Crumbs items={[{ name: "Servizi", path: "/servizi" }]} />}
        eyebrow="Servizi"
        title="Cosa facciamo"
        lead="Dalla semplice riparazione dell'impianto idraulico fino agli impianti di bioedilizia: progettazione, installazione e manutenzione."
      />
      <Section>
        <Container className="space-y-14">
          <div>
            <h2 className="font-display text-h3 md:text-h3-lg">Impianti e riparazioni</h2>
            <ServiceList services={[...urgent, ...rest]} className="mt-6" />
          </div>
          <div>
            <h2 className="font-display text-h3 md:text-h3-lg">Energia e bioedilizia</h2>
            <p className="mt-2 max-w-2xl text-copy text-text-secondary">
              Impianti a bassa temperatura e fonti rinnovabili, per consumare meno e vivere meglio in casa.
            </p>
            <ServiceList services={eco} className="mt-6" />
          </div>
        </Container>
      </Section>
      <UrgentBand />
      <CtaBand />
    </>
  );
}

import type { Metadata } from "next";
import { company, formatAddress, primaryAddress } from "@/content/company";
import { images } from "@/content/images";
import { Crumbs } from "@/components/site/crumbs";
import { CtaBand } from "@/components/site/cta-band";
import { Figure } from "@/components/site/figure";
import { ProcessSteps } from "@/components/site/process-steps";
import { Container, PageHeader, Section, SectionHeading } from "@/components/site/ui";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Chi siamo",
  description: `Idraulica Piovani lavora a Brescia dal ${company.foundedYear}: progettazione, installazione e manutenzione di impianti idraulici, di riscaldamento e di bioedilizia.`,
  path: "/chi-siamo",
});

const values = [
  {
    title: "Progettare prima di installare",
    text: "Ogni impianto parte dal sopralluogo e dal disegno: misure, carichi, percorsi. Un lavoro pensato bene dura di più e costa meno nel tempo.",
  },
  {
    title: "Innovare con giudizio",
    text: "Condensazione, radiante, solare, recupero dell'acqua: adottiamo le tecnologie nuove quando migliorano davvero la casa, non per moda.",
  },
  {
    title: "Esserci anche dopo",
    text: "Manutenzione, assistenza e consigli: restiamo il riferimento per l'impianto anche a lavoro finito.",
  },
];

export default function ChiSiamoPage() {
  const years = new Date().getFullYear() - company.foundedYear;
  return (
    <>
      <PageHeader
        breadcrumb={<Crumbs items={[{ name: "Chi siamo", path: "/chi-siamo" }]} />}
        eyebrow={`Dal ${company.foundedYear}`}
        title={`${years} anni di impianti a Brescia`}
        lead="Dalla semplice riparazione all'impianto di una casa bioclimatica: progettiamo, installiamo e manteniamo impianti idraulici e di riscaldamento in tutta la provincia."
      />

      <Section labelledBy="storia-title">
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <SectionHeading id="storia-title" eyebrow="La nostra storia" title="Dal 1930, con lo sguardo avanti" />
            <div className="mt-6 space-y-4 text-lead text-text-secondary">
              <p>
                Idraulica Piovani lavora a Brescia dal {company.foundedYear}. In quasi un secolo gli impianti sono cambiati molto: oggi
                progettiamo caldaie a condensazione, sistemi radianti, impianti solari e di recupero dell&apos;acqua.
              </p>
              <p>
                Oggi l&apos;impresa è guidata da {company.owner}. La formazione tecnica ci permette di seguire ogni lavoro dal progetto
                all&apos;installazione, fino alla manutenzione negli anni.
              </p>
              <p>
                Produciamo direttamente il battiscopa radiante SANATHERM, e da sempre ci dedichiamo alla bioedilizia e al risparmio
                energetico.
              </p>
            </div>
          </div>
          <Figure image={images.rameCollettore} aspect="4 / 3" sizes="(min-width: 1024px) 45vw, 100vw" />
        </Container>
      </Section>

      <Section tone="raised" labelledBy="valori-title">
        <Container>
          <SectionHeading id="valori-title" eyebrow="Come la pensiamo" title="Tre cose a cui teniamo" />
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {values.map((v) => (
              <li key={v.title} className="rounded-card border border-border-card bg-background-full p-6">
                <p className="font-display text-h3">{v.title}</p>
                <p className="mt-3 text-copy text-text-secondary">{v.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section labelledBy="processo-chi">
        <Container>
          <SectionHeading id="processo-chi" eyebrow="Come lavoriamo" title="Sempre gli stessi quattro passaggi" />
          <ProcessSteps />
        </Container>
      </Section>

      <Section tone="muted" labelledBy="dati-title">
        <Container>
          <h2 id="dati-title" className="font-display text-h3 md:text-h3-lg">
            Dati aziendali
          </h2>
          <dl className="mt-6 grid gap-4 text-copy sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Denominazione", company.legalName],
              ["Sede", formatAddress(primaryAddress)],
              ["Partita IVA", company.vatNumber],
              ["Attività dal", String(company.foundedYear)],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="eyebrow text-eyebrow text-text-tertiary">{k}</dt>
                <dd className="mt-1 text-text-primary">{v}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}

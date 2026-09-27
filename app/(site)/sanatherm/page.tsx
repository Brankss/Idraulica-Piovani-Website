import { RiCalculatorLine, RiCalendarCheckLine } from "@remixicon/react";
import type { Metadata } from "next";
import type { Faq } from "@/content/faq";
import { Crumbs } from "@/components/site/crumbs";
import { CtaBand } from "@/components/site/cta-band";
import { FaqList } from "@/components/site/faq-list";
import { JsonLd } from "@/components/site/json-ld";
import { SanathermDrawing, sanathermLegend } from "@/components/site/sanatherm-drawing";
import { Container, CtaLink, PageHeader, Section, SectionHeading } from "@/components/site/ui";
import { faqJsonLd } from "@/lib/seo/jsonld";
import { pageMetadata, siteUrl } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "SANATHERM, battiscopa radiante",
  description:
    "SANATHERM è il battiscopa radiante prodotto da Idraulica Piovani: due tubi in rame con alette in alluminio, calore uniforme con acqua a 35–40 °C. Ideale anche in ristrutturazione.",
  path: "/sanatherm",
});

/** Indicative values from the published technical sheet — to be validated per project. */
const specs: [string, string][] = [
  ["Tubi", "2 × rame Ø 22 mm (mandata e ritorno)"],
  ["Scambiatore", "Alette in alluminio"],
  ["Ingombro", "circa 15 cm di altezza × 3 cm di profondità"],
  ["Temperatura dell'acqua", "35–40 °C per circa 20 °C in ambiente"],
  ["Resa termica", "754–967 W per metro lineare, secondo la temperatura dell'acqua"],
  ["Contenuto d'acqua", "circa 0,65 litri per metro"],
  ["Lunghezza del circuito", "fino a 6–7 metri"],
  ["Posa", "a vista, semi-incassata o incassata"],
];

const comparison: [string, string, string][] = [
  ["Temperatura dell'acqua", "Alta, tipicamente 60–70 °C", "Bassa, 35–40 °C"],
  ["Distribuzione del calore", "Concentrata vicino al radiatore; l'aria calda sale al soffitto", "Lungo tutto il perimetro, dal basso"],
  ["Con caldaia a condensazione o solare", "Rendono meno ad alta temperatura", "Lavora nel suo campo ideale"],
  ["In ristrutturazione", "Tubazioni da portare a ogni radiatore", "Corre sul perimetro: niente pavimenti da demolire"],
  ["Ingombro", "Corpi scaldanti sotto le finestre", "Un battiscopa di circa 15 cm"],
];

const faqs: Faq[] = [
  {
    q: "SANATHERM va bene per tutte le stanze?",
    a: "È pensato per ambienti di altezza normale: l'effetto del calore diminuisce oltre i 2 metri circa. Per spazi molto alti valutiamo con te soluzioni diverse.",
  },
  {
    q: "Si può abbinare alla caldaia che ho già?",
    a: "Lo valutiamo al sopralluogo. SANATHERM rende al meglio con acqua a bassa temperatura, come quella prodotta dalle caldaie a condensazione e dagli impianti solari.",
  },
  {
    q: "Serve rompere i pavimenti per installarlo?",
    a: "No: il battiscopa corre lungo le pareti e fa sia da radiatore sia da tubazione. Si può posare a vista oppure incassato in parte o del tutto.",
  },
];

export default function SanathermPage() {
  return (
    <>
      <PageHeader
        breadcrumb={<Crumbs items={[{ name: "SANATHERM", path: "/sanatherm" }]} />}
        eyebrow="Prodotto da noi"
        title="SANATHERM, il battiscopa radiante"
        lead="Due tubi di rame e un'aletta di alluminio lungo il perimetro della stanza: il battiscopa diventa l'impianto di riscaldamento. Lo produciamo e lo installiamo noi."
      >
        <div className="grid gap-3 sm:flex">
          <CtaLink href="/preventivo?categoria=radiante&sistema=battiscopa" icon={RiCalculatorLine} trailing={false}>
            Stima per casa tua
          </CtaLink>
          <CtaLink href="/prenota?servizio=sopralluogo" variant="secondary" icon={RiCalendarCheckLine} trailing={false}>
            Prenota un sopralluogo
          </CtaLink>
        </div>
      </PageHeader>

      <Section tone="inverse" className="tech-grid-inverse" labelledBy="sezione-title">
        <Container className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div className="rounded-card border border-border-inverse bg-background-inverse-raised/60 p-4 md:p-10">
            <SanathermDrawing tone="inverse" />
          </div>
          <div>
            <SectionHeading id="sezione-title" tone="inverse" eyebrow="In sezione" title="Com'è fatto" />
            <ol className="mt-8 space-y-5">
              {sanathermLegend.map((item) => (
                <li key={item.n} className="flex gap-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-pipe font-mono text-small-strong text-text-inverse">
                    {item.n}
                  </span>
                  <span>
                    <span className="block text-copy-strong">{item.title}</span>
                    <span className="mt-1 block text-copy text-text-inverse-secondary">{item.text}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      <Section labelledBy="scheda-title">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading id="scheda-title" eyebrow="Scheda tecnica" title="I numeri" />
            <dl className="tech-grid mt-8 divide-y divide-separator-border overflow-hidden rounded-card border border-border-card bg-background-primary-default">
              {specs.map(([k, v]) => (
                <div key={k} className="grid gap-1 p-4 sm:grid-cols-[11rem_1fr] sm:gap-4">
                  <dt className="eyebrow text-eyebrow text-text-tertiary sm:pt-0.5">{k}</dt>
                  <dd className="font-mono text-spec text-text-primary">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-small text-text-tertiary">
              Valori indicativi da scheda tecnica. Il dimensionamento si fa sul progetto di ogni casa.
            </p>
          </div>

          <div>
            <SectionHeading eyebrow="Confronto" title="Rispetto ai radiatori tradizionali" />
            {/* Stacked cards on phones, a real table from md up */}
            <ul className="mt-8 space-y-3 md:hidden">
              {comparison.map(([k, a, b]) => (
                <li key={k} className="rounded-xl border border-border-card bg-background-primary-default p-4">
                  <p className="text-copy-strong">{k}</p>
                  <p className="mt-2 text-small text-text-tertiary">Radiatori: {a}</p>
                  <p className="mt-1 text-small text-text-primary">
                    <span className="font-semibold text-text-accent">SANATHERM:</span> {b}
                  </p>
                </li>
              ))}
            </ul>
            <table className="mt-8 hidden w-full text-small md:table">
              <caption className="sr-only">Confronto tra radiatori tradizionali e SANATHERM</caption>
              <thead>
                <tr className="border-b border-separator-border-strong text-left">
                  <th scope="col" className="py-3 pr-4 font-semibold text-text-tertiary">
                    &nbsp;
                  </th>
                  <th scope="col" className="py-3 pr-4 font-semibold text-text-secondary">
                    Radiatori
                  </th>
                  <th scope="col" className="py-3 font-semibold text-text-accent">
                    SANATHERM
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map(([k, a, b]) => (
                  <tr key={k} className="border-b border-separator-border align-top">
                    <th scope="row" className="py-3 pr-4 text-left font-semibold text-text-primary">
                      {k}
                    </th>
                    <td className="py-3 pr-4 text-text-secondary">{a}</td>
                    <td className="py-3 text-text-primary">{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      <Section tone="raised" labelledBy="sanatherm-faq">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading id="sanatherm-faq" eyebrow="Domande" title="Prima di sceglierlo" />
          <FaqList faqs={faqs} />
        </Container>
      </Section>

      <CtaBand title="Vuoi SANATHERM in casa tua?" lead="Ti diamo una stima online in due minuti; il progetto lo facciamo al sopralluogo, stanza per stanza." />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: "SANATHERM",
          description: "Battiscopa radiante con due tubi in rame Ø 22 mm e alette in alluminio, per riscaldamento a bassa temperatura.",
          brand: { "@type": "Brand", name: "SANATHERM" },
          manufacturer: { "@id": `${siteUrl}/#business` },
          category: "Riscaldamento radiante a battiscopa",
        }}
      />
      <JsonLd data={faqJsonLd(faqs)} />
    </>
  );
}

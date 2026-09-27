import { RiArrowRightLine, RiCalculatorLine, RiCalendarCheckLine, RiPhoneLine } from "@remixicon/react";
import type { Metadata } from "next";
import { company, primaryPhone, telHref } from "@/content/company";
import { generalFaqs } from "@/content/faq";
import { images } from "@/content/images";
import { services } from "@/content/services";
import { CtaBand } from "@/components/site/cta-band";
import { FaqList } from "@/components/site/faq-list";
import { Figure } from "@/components/site/figure";
import { JsonLd } from "@/components/site/json-ld";
import { ProcessSteps } from "@/components/site/process-steps";
import { QuotePicker } from "@/components/site/quote-picker";
import { SanathermDrawing, sanathermLegend } from "@/components/site/sanatherm-drawing";
import { ServiceList } from "@/components/site/service-list";
import { ArrowLink, Container, CtaLink, Eyebrow, Section, SectionHeading } from "@/components/site/ui";
import { UrgentBand } from "@/components/site/urgent-band";
import { faqJsonLd } from "@/lib/seo/jsonld";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = {
  ...pageMetadata({
    title: `Idraulico a Brescia dal ${company.foundedYear}`,
    description:
      "Idraulica Piovani: riparazioni, caldaie a condensazione, riscaldamento radiante, bagni e bioedilizia a Brescia e provincia. Preventivo online in 2 minuti.",
    path: "/",
  }),
  title: { absolute: `${company.brand} · Idraulico a Brescia dal ${company.foundedYear}` },
};

const years = new Date().getFullYear() - company.foundedYear;

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section aria-labelledby="hero-title" className="overflow-hidden">
        <Container className="grid gap-10 pb-12 pt-8 md:pb-20 md:pt-14 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-14">
          <div>
            <Eyebrow>Idraulico a Brescia · dal {company.foundedYear}</Eyebrow>
            <h1 id="hero-title" className="mt-5 font-display text-hero text-balance md:text-hero-lg">
              Acqua e calore, fatti a regola d&apos;arte.
            </h1>
            <p className="mt-5 max-w-xl text-lead text-text-secondary md:text-lead-lg">
              Riparazioni, caldaie, riscaldamento radiante e bioedilizia in tutta la provincia. Da {years} anni progettiamo, installiamo e
              curiamo gli impianti delle case bresciane.
            </p>
            <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
              <CtaLink href="/preventivo" icon={RiCalculatorLine} trailing={false}>
                Calcola il preventivo
              </CtaLink>
              <CtaLink href={telHref(primaryPhone)} variant="secondary" icon={RiPhoneLine} trailing={false}>
                Chiama {primaryPhone.display}
              </CtaLink>
            </div>
            <dl className="mt-8 grid max-w-lg grid-cols-3 divide-x divide-separator-border-strong border-y border-separator-border-strong">
              {[
                ["Attivi dal", String(company.foundedYear)],
                ["Battiscopa", "SANATHERM"],
                ["Lun–Ven", "8–12 · 13–19"],
              ].map(([k, v]) => (
                <div key={k} className="px-3 py-3 first:pl-0">
                  <dt className="eyebrow text-[0.6875rem] tracking-[0.1em] text-text-tertiary">{k}</dt>
                  <dd className="mt-1 text-small-strong text-text-primary">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <Figure image={images.rameCollettore} preload aspect="4 / 3" sizes="(min-width: 1024px) 45vw, 100vw" />
            <div className="absolute -bottom-5 right-4 hidden rounded-xl border border-border-card bg-background-primary-default px-4 py-3 shadow-lg sm:block">
              <p className="font-mono text-eyebrow uppercase text-text-tertiary">Acqua di mandata</p>
              <p className="font-mono text-h3 text-text-primary">35–40 °C</p>
              <p className="text-small text-text-secondary">con impianti radianti a bassa temperatura</p>
            </div>
          </div>
        </Container>
      </section>

      <UrgentBand />

      {/* Services */}
      <Section labelledBy="servizi-title">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              id="servizi-title"
              eyebrow="Servizi"
              title="Tutto l'impianto, dalla riparazione al progetto"
              lead="Dalla semplice riparazione all'impianto completo: progettazione, installazione e manutenzione."
            />
            <ArrowLink href="/servizi" className="shrink-0">
              Tutti i servizi
            </ArrowLink>
          </div>
          <ServiceList services={services} className="mt-10" />
        </Container>
      </Section>

      {/* SANATHERM */}
      <Section tone="inverse" labelledBy="sanatherm-title-home" className="tech-grid-inverse">
        <Container className="grid gap-8 lg:grid-cols-2 lg:gap-x-16">
          <SectionHeading
            id="sanatherm-title-home"
            tone="inverse"
            eyebrow="Prodotto da noi"
            title="SANATHERM, il battiscopa che scalda la casa"
            lead="Un battiscopa radiante in rame e alluminio che corre lungo le pareti: calore uniforme dal basso, con acqua a bassa temperatura. Si installa anche in ristrutturazione, senza rompere i pavimenti."
          />
          <div className="rounded-card border border-border-inverse bg-background-inverse-raised/60 p-4 md:p-8 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
            <SanathermDrawing tone="inverse" />
          </div>
          <div>
            <ol className="grid gap-4 sm:grid-cols-2">
              {sanathermLegend.map((item) => (
                <li key={item.n} className="flex gap-3">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-pipe font-mono text-small-strong text-text-inverse">
                    {item.n}
                  </span>
                  <span>
                    <span className="block text-copy-strong">{item.title}</span>
                    <span className="mt-0.5 block text-small text-text-inverse-secondary">{item.text}</span>
                  </span>
                </li>
              ))}
            </ol>
            <div className="mt-8 grid gap-3 sm:flex">
              <CtaLink href="/sanatherm" icon={RiArrowRightLine}>
                Scopri SANATHERM
              </CtaLink>
              <CtaLink href="/preventivo?categoria=radiante" variant="secondary">
                Stima per casa tua
              </CtaLink>
            </div>
          </div>
        </Container>
      </Section>

      {/* Bio */}
      <Section tone="eco" labelledBy="bio-title">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          {/* Client archive photos are small scans: shown at (near) native size */}
          <div className="order-2 grid max-w-[34rem] grid-cols-2 gap-3 lg:order-1">
            {[images.bioSerra, images.bioInverno, images.bioInterno, images.bioCantiere2].map((img) => (
              <Figure key={img.src} image={img} aspect="4 / 3" sizes="(min-width: 640px) 270px, 50vw" />
            ))}
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeading
              id="bio-title"
              eyebrow="Bioedilizia"
              title="Case che consumano poco e rispettano chi ci vive"
              lead="Impianti solari, recupero dell'acqua piovana, fitodepurazione, stufe in terra cruda: soluzioni che abbassano la spesa energetica e rispettano l'ambiente."
            />
            <ul className="mt-6 space-y-2 text-copy text-text-secondary">
              <li>· Riscaldamento radiante a bassa temperatura</li>
              <li>· Impianti solari</li>
              <li>· Recupero e uso dell&apos;acqua piovana</li>
            </ul>
            <ArrowLink href="/bioedilizia" className="mt-6">
              Scopri la bioedilizia
            </ArrowLink>
          </div>
        </Container>
      </Section>

      {/* Process — the copper pipe */}
      <Section labelledBy="processo-title">
        <Container>
          <SectionHeading
            id="processo-title"
            eyebrow="Come lavoriamo"
            title="Dalla prima telefonata all'impianto finito"
            lead="Quattro passaggi, sempre gli stessi, per qualsiasi lavoro."
          />
          <ProcessSteps />
        </Container>
      </Section>

      {/* Quote + booking */}
      <Section tone="raised" labelledBy="preventivo-title">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center">
          <div>
            <SectionHeading
              id="preventivo-title"
              eyebrow="Preventivo online"
              title="Una stima in due minuti, senza impegno"
              lead="Rispondi a poche domande sul lavoro da fare: ti mostriamo subito una fascia di prezzo indicativa. Il preventivo definitivo arriva dopo il sopralluogo."
            />
            <div className="mt-8 rounded-card border border-border-card bg-background-full p-5">
              <p className="text-copy-strong">Preferisci che veniamo a vedere?</p>
              <p className="mt-1 text-small text-text-secondary">
                Scegli giorno e ora del sopralluogo: ti proponiamo gli orari in cui siamo già nella tua zona.
              </p>
              <CtaLink href="/prenota" variant="secondary" icon={RiCalendarCheckLine} trailing={false} className="mt-4 w-full sm:w-auto">
                Prenota un sopralluogo
              </CtaLink>
            </div>
          </div>
          <QuotePicker />
        </Container>
      </Section>

      {/* Heritage */}
      <Section tone="muted" labelledBy="storia-title">
        <Container className="grid gap-8 md:grid-cols-[auto_1fr] md:items-end md:gap-16">
          <p className="font-display text-[5.5rem] font-extrabold leading-none tracking-[-0.04em] text-pipe md:text-[9rem]" aria-hidden="true">
            1930
          </p>
          <div>
            <h2 id="storia-title" className="font-display text-h2 text-balance md:text-h2-lg">
              Quasi un secolo di impianti a Brescia
            </h2>
            <p className="mt-4 max-w-2xl text-lead text-text-secondary">
              Dal {company.foundedYear} i materiali sono cambiati, le caldaie consumano meno e il sole scalda l&apos;acqua. Il lavoro fatto bene,
              invece, è rimasto quello: ascoltare, misurare, installare con cura e restare a disposizione dopo.
            </p>
            <ArrowLink href="/chi-siamo" className="mt-6">
              Chi siamo
            </ArrowLink>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section tone="raised" labelledBy="faq-title">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <SectionHeading id="faq-title" eyebrow="Domande frequenti" title="Prima di chiamarci" />
            <ArrowLink href="/faq" className="mt-6">
              Tutte le domande
            </ArrowLink>
          </div>
          <FaqList faqs={generalFaqs.slice(0, 5)} />
        </Container>
      </Section>

      <CtaBand />
      <JsonLd data={faqJsonLd(generalFaqs.slice(0, 5))} />
    </>
  );
}

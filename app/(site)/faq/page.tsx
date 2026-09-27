import type { Metadata } from "next";
import { generalFaqs } from "@/content/faq";
import { services } from "@/content/services";
import { Crumbs } from "@/components/site/crumbs";
import { CtaBand } from "@/components/site/cta-band";
import { FaqList } from "@/components/site/faq-list";
import { JsonLd } from "@/components/site/json-ld";
import { ArrowLink, Container, PageHeader, Section } from "@/components/site/ui";
import { faqJsonLd } from "@/lib/seo/jsonld";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Domande frequenti",
  description: "Preventivi, sopralluoghi, urgenze, zone, pagamenti, detrazioni e SANATHERM: le risposte alle domande più frequenti.",
  path: "/faq",
});

export default function FaqPage() {
  const byService = services.filter((s) => s.faqs.length > 0);
  const all = [...generalFaqs, ...byService.flatMap((s) => s.faqs)];
  return (
    <>
      <PageHeader
        breadcrumb={<Crumbs items={[{ name: "Domande frequenti", path: "/faq" }]} />}
        eyebrow="FAQ"
        title="Domande frequenti"
        lead="Non trovi la risposta? Chiamaci o scrivici: ti rispondiamo negli orari di apertura."
      />
      <Section>
        <Container className="grid gap-12 lg:grid-cols-[16rem_1fr] lg:gap-16">
          <nav aria-label="Argomenti" className="lg:sticky lg:top-28 lg:self-start">
            <ul className="scrollbar-none -mx-5 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:flex-col lg:px-0">
              <li>
                <a href="#generali" className="inline-flex min-h-11 shrink-0 items-center whitespace-nowrap rounded-full border border-border-card bg-background-primary-default px-4 text-small-strong hover:border-pipe lg:w-full lg:rounded-lg">
                  Generali
                </a>
              </li>
              {byService.map((s) => (
                <li key={s.slug}>
                  <a
                    href={`#${s.slug}`}
                    className="inline-flex min-h-11 shrink-0 items-center whitespace-nowrap rounded-full border border-border-card bg-background-primary-default px-4 text-small-strong hover:border-pipe lg:w-full lg:rounded-lg"
                  >
                    {s.shortTitle}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="min-w-0 space-y-12">
            <section id="generali" aria-labelledby="generali-title">
              <h2 id="generali-title" className="font-display text-h3 md:text-h3-lg">
                Generali
              </h2>
              <FaqList faqs={generalFaqs} className="mt-4" />
            </section>
            {byService.map((s) => (
              <section key={s.slug} id={s.slug} aria-labelledby={`${s.slug}-title`}>
                <h2 id={`${s.slug}-title`} className="font-display text-h3 md:text-h3-lg">
                  {s.title}
                </h2>
                <FaqList faqs={s.faqs} className="mt-4" />
                <ArrowLink href={`/servizi/${s.slug}`} className="mt-2">
                  Vai al servizio
                </ArrowLink>
              </section>
            ))}
          </div>
        </Container>
      </Section>
      <CtaBand />
      <JsonLd data={faqJsonLd(all)} />
    </>
  );
}

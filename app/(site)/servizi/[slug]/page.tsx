import { RiCalculatorLine, RiCalendarCheckLine, RiCheckLine, RiPhoneLine, RiWhatsappLine } from "@remixicon/react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { company, primaryPhone, telHref, whatsappHref } from "@/content/company";
import { images, type SiteImage } from "@/content/images";
import { getService, services } from "@/content/services";
import { Crumbs } from "@/components/site/crumbs";
import { CtaBand } from "@/components/site/cta-band";
import { FaqList } from "@/components/site/faq-list";
import { Figure } from "@/components/site/figure";
import { JsonLd } from "@/components/site/json-ld";
import { SanathermDrawing } from "@/components/site/sanatherm-drawing";
import { ServiceList } from "@/components/site/service-list";
import { ArrowLink, Container, CtaLink, PageHeader, Section } from "@/components/site/ui";
import { faqJsonLd, serviceJsonLd } from "@/lib/seo/jsonld";
import { pageMetadata } from "@/lib/seo/metadata";
import { cx } from "@/utils/cx";

const imageFor: Record<string, SiteImage | undefined> = {
  "caldaie-a-condensazione": images.caldaia,
  "ristrutturazione-bagni": images.bagno,
  "riparazioni-idrauliche": images.rameCollettore,
  "solare-termico-e-rinnovabili": images.bioSerra,
  "acque-meteoriche-e-fitodepurazione": images.bioCantiere1,
  "stufe-in-terra-cruda-e-termocamini": images.bioInterno,
};

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/servizi/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return pageMetadata({ title: s.metaTitle, description: s.metaDescription, path: `/servizi/${s.slug}` });
}

export default async function ServicePage({ params }: PageProps<"/servizi/[slug]">) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const image = imageFor[s.slug];
  const related = s.related.map((r) => getService(r)).filter((x) => x !== undefined);
  const quoteHref = s.quoteCategory ? `/preventivo?categoria=${s.quoteCategory}` : null;

  const actions = (
    <div className="grid gap-3 sm:flex sm:flex-wrap">
      {s.urgent ? (
        <>
          <CtaLink href={telHref(primaryPhone)} icon={RiPhoneLine} trailing={false}>
            Chiama {primaryPhone.display}
          </CtaLink>
          <CtaLink href={whatsappHref("Buongiorno, ho un problema urgente:")} variant="secondary" icon={RiWhatsappLine} trailing={false} target="_blank" rel="noopener noreferrer">
            Scrivi su WhatsApp
          </CtaLink>
        </>
      ) : (
        <>
          {quoteHref && (
            <CtaLink href={quoteHref} icon={RiCalculatorLine} trailing={false}>
              Calcola il preventivo
            </CtaLink>
          )}
          {s.bookable && (
            <CtaLink href={`/prenota?servizio=${s.slug === "caldaie-a-condensazione" ? "manutenzione-caldaia" : s.slug === "riparazioni-idrauliche" ? "riparazione" : "sopralluogo"}`} variant="secondary" icon={RiCalendarCheckLine} trailing={false}>
              Prenota un sopralluogo
            </CtaLink>
          )}
        </>
      )}
    </div>
  );

  return (
    <>
      <PageHeader
        breadcrumb={
          <Crumbs
            items={[
              { name: "Servizi", path: "/servizi" },
              { name: s.shortTitle, path: `/servizi/${s.slug}` },
            ]}
          />
        }
        eyebrow={s.eco ? "Energia e bioedilizia" : s.urgent ? "Urgenze" : "Servizi"}
        title={s.title}
        lead={s.summary}
      >
        {actions}
      </PageHeader>

      <Section>
        <Container className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div className="min-w-0 space-y-10">
            <div className="space-y-4 text-lead text-text-secondary">
              {s.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            {s.slug === "riscaldamento-radiante" ? (
              <div className="rounded-card bg-background-inverse p-4 md:p-8">
                <SanathermDrawing tone="inverse" />
                <ArrowLink href="/sanatherm" tone="inverse" className="mt-4">
                  Com&apos;è fatto SANATHERM
                </ArrowLink>
              </div>
            ) : (
              image && <Figure image={image} aspect={image.archive ? undefined : "3 / 2"} sizes="(min-width: 1024px) 55vw, 100vw" className={image.archive ? "max-w-md" : undefined} />
            )}

            <div>
              <h2 className="font-display text-h3 md:text-h3-lg">{s.includes.title}</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {s.includes.items.map((it) => (
                  <li key={it} className="flex gap-3 rounded-xl border border-border-card bg-background-primary-default p-4 text-copy">
                    <RiCheckLine className="mt-0.5 size-5 shrink-0 text-text-accent" aria-hidden="true" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>

            {s.highlight && (
              <div
                className={cx(
                  "rounded-card p-6 md:p-8",
                  s.highlight.tone === "urgent" ? "bg-background-inverse text-text-inverse" : "bg-background-secondary-default",
                )}
              >
                <h2 className="font-display text-h3">{s.highlight.title}</h2>
                <ol className="mt-5 space-y-4">
                  {s.highlight.items.map((it, i) => (
                    <li key={it} className="flex gap-4">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-pipe font-mono text-small-strong text-text-inverse">
                        {i + 1}
                      </span>
                      <span className={cx("pt-1 text-copy", s.highlight?.tone === "urgent" ? "text-text-inverse" : "text-text-secondary")}>{it}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {s.faqs.length > 0 && (
              <div>
                <h2 className="font-display text-h3 md:text-h3-lg">Domande frequenti</h2>
                <FaqList faqs={s.faqs} className="mt-4" />
              </div>
            )}
          </div>

          <aside aria-label="Richiedi un intervento" className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-card border border-border-card bg-background-primary-default p-6">
              <p className="font-display text-h3">{s.urgent ? "Serve aiuto adesso?" : "Parliamone"}</p>
              <p className="mt-2 text-copy text-text-secondary">
                {s.urgent
                  ? "Chiamaci: al telefono ti diciamo cosa fare subito e quando possiamo arrivare."
                  : "Ottieni una stima indicativa online o prenota direttamente il sopralluogo."}
              </p>
              <div className="mt-5 hidden lg:block">{actions}</div>
              <dl className="mt-6 space-y-2 border-t border-separator-border pt-5 text-small">
                <div className="flex justify-between gap-4">
                  <dt className="text-text-tertiary">Telefono</dt>
                  <dd>
                    <a href={telHref(primaryPhone)} className="text-small-strong text-text-primary tabular-nums hover:text-text-accent">
                      {primaryPhone.display}
                    </a>
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-text-tertiary">Orari</dt>
                  <dd className="text-right text-text-secondary">{company.hoursLabel}</dd>
                </div>
              </dl>
            </div>
          </aside>
        </Container>
      </Section>

      {related.length > 0 && (
        <Section tone="muted">
          <Container>
            <h2 className="font-display text-h3 md:text-h3-lg">Servizi collegati</h2>
            <ServiceList services={related} className="mt-6" />
          </Container>
        </Section>
      )}

      <CtaBand />
      <JsonLd data={serviceJsonLd(s)} />
      {s.faqs.length > 0 && <JsonLd data={faqJsonLd(s.faqs)} />}
    </>
  );
}

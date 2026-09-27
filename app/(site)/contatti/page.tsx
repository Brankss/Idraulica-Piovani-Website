import { RiMailLine, RiMapPin2Line, RiPhoneLine, RiTimeLine, RiWalletLine, RiWhatsappLine } from "@remixicon/react";
import type { Metadata } from "next";
import { company, formatAddress, primaryPhone, telHref, whatsappHref } from "@/content/company";
import { ContactForm } from "@/components/forms/contact-form";
import { Crumbs } from "@/components/site/crumbs";
import { StaticMap } from "@/components/site/static-map";
import { ArrowLink, Container, PageHeader, Section } from "@/components/site/ui";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Contatti",
  description: `Idraulica Piovani, ${formatAddress(company.addresses[0])}. Telefono ${primaryPhone.display}, WhatsApp, email ${company.email}. ${company.hoursLabel}.`,
  path: "/contatti",
});

export default function ContattiPage() {
  const tile =
    "flex min-h-[4.5rem] items-center gap-4 rounded-xl border border-border-card bg-background-primary-default p-4 outline-none transition-colors hover:border-pipe focus-visible:ring-2 focus-visible:ring-border-focus-ring";
  return (
    <>
      <PageHeader
        breadcrumb={<Crumbs items={[{ name: "Contatti", path: "/contatti" }]} />}
        eyebrow="Contatti"
        title="Parliamo del tuo impianto"
        lead="Il modo più rapido è una telefonata o un messaggio su WhatsApp. Per richieste non urgenti scrivici qui sotto."
      />

      <Section>
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div className="space-y-8">
            <ul className="grid gap-3">
              {company.phones.map((p) => (
                <li key={p.e164}>
                  <a href={telHref(p)} className={tile}>
                    <RiPhoneLine className="size-6 shrink-0 text-text-accent" aria-hidden="true" />
                    <span>
                      <span className="block text-small text-text-tertiary">{p.label}</span>
                      <span className="text-copy-strong tabular-nums">{p.display}</span>
                    </span>
                  </a>
                </li>
              ))}
              <li>
                <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className={tile}>
                  <RiWhatsappLine className="size-6 shrink-0 text-text-accent" aria-hidden="true" />
                  <span>
                    <span className="block text-small text-text-tertiary">WhatsApp</span>
                    <span className="text-copy-strong">Scrivici un messaggio</span>
                  </span>
                </a>
              </li>
              <li>
                <a href={`mailto:${company.email}`} className={tile}>
                  <RiMailLine className="size-6 shrink-0 text-text-accent" aria-hidden="true" />
                  <span>
                    <span className="block text-small text-text-tertiary">Email</span>
                    <span className="text-copy-strong">{company.email}</span>
                  </span>
                </a>
              </li>
            </ul>

            <dl className="grid gap-5 rounded-card bg-background-secondary-default p-6 text-copy">
              <div className="flex gap-3">
                <RiTimeLine className="mt-0.5 size-5 shrink-0 text-text-accent" aria-hidden="true" />
                <div>
                  <dt className="text-copy-strong">Orari</dt>
                  <dd className="text-text-secondary">
                    Lunedì–venerdì 8:00–12:00 e 13:00–19:00
                    <br />
                    Sabato e domenica chiuso
                  </dd>
                </div>
              </div>
              <div className="flex gap-3">
                <RiMapPin2Line className="mt-0.5 size-5 shrink-0 text-text-accent" aria-hidden="true" />
                <div>
                  <dt className="text-copy-strong">Indirizzi</dt>
                  {company.addresses.map((a) => (
                    <dd key={a.street} className="text-text-secondary">
                      {a.label}: {formatAddress(a)}
                    </dd>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <RiWalletLine className="mt-0.5 size-5 shrink-0 text-text-accent" aria-hidden="true" />
                <div>
                  <dt className="text-copy-strong">Pagamenti</dt>
                  <dd className="text-text-secondary">{company.paymentMethods.join(", ")}</dd>
                </div>
              </div>
            </dl>

            <StaticMap />
          </div>

          <div>
            <h2 className="font-display text-h2 md:text-h2-lg">Scrivici</h2>
            <p className="mt-3 text-copy text-text-secondary">
              Vuoi una stima di costo? Il{" "}
              <ArrowLink href="/preventivo" className="inline-flex min-h-0">
                preventivo online
              </ArrowLink>{" "}
              è più veloce.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

import { RiCameraLine } from "@remixicon/react";
import type { Metadata } from "next";
import Link from "next/link";
import { images } from "@/content/images";
import { Crumbs } from "@/components/site/crumbs";
import { CtaBand } from "@/components/site/cta-band";
import { Figure } from "@/components/site/figure";
import { Container, PageHeader, Section } from "@/components/site/ui";
import { pageMetadata } from "@/lib/seo/metadata";

// Kept out of the index until the gallery has real projects (see docs/content-todo.md).
export const metadata: Metadata = pageMetadata({
  title: "Lavori realizzati",
  description: "Alcuni lavori realizzati da Idraulica Piovani a Brescia e provincia: impianti, bagni, riscaldamento radiante e bioedilizia.",
  path: "/lavori",
  noindex: true,
});

export default function LavoriPage() {
  return (
    <>
      <PageHeader
        breadcrumb={<Crumbs items={[{ name: "Lavori", path: "/lavori" }]} />}
        eyebrow="Lavori"
        title="Lavori realizzati"
        lead="Una selezione di impianti e cantieri. La raccolta cresce man mano che documentiamo i nuovi lavori."
      />
      <Section>
        <Container>
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <li>
              <Link
                href="/bioedilizia#archivio"
                className="group block rounded-card border border-border-card bg-background-primary-default p-3 outline-none transition-colors hover:border-pipe focus-visible:ring-2 focus-visible:ring-border-focus-ring"
              >
                <Figure image={images.bioSerra} aspect="3 / 2" sizes="(min-width: 1024px) 30vw, 100vw" />
                <div className="p-3">
                  <p className="eyebrow text-eyebrow text-text-eco">Bioedilizia</p>
                  <p className="mt-2 font-display text-h3">Casa bio in legno con serra solare</p>
                  <p className="mt-2 text-small text-text-secondary">Dal cantiere alla casa abitata: struttura in legno, serra esposta a sud.</p>
                </div>
              </Link>
            </li>
            <li className="flex flex-col items-start justify-center gap-3 rounded-card border border-dashed border-separator-border-strong p-8 md:col-span-1 lg:col-span-2">
              <RiCameraLine className="size-8 text-text-accent" aria-hidden="true" />
              <p className="font-display text-h3">Nuovi lavori in arrivo</p>
              <p className="max-w-md text-copy text-text-secondary">
                Stiamo raccogliendo fotografie e descrizioni dei cantieri più recenti: bagni, centrali termiche, impianti radianti e SANATHERM.
              </p>
            </li>
          </ul>
        </Container>
      </Section>
      <CtaBand />
    </>
  );
}

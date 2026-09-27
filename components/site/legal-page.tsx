import { RiFileTextLine } from "@remixicon/react";
import type { ReactNode } from "react";
import { legal, updatedLabel } from "@/content/legal";
import { Crumbs } from "./crumbs";
import { Container, PageHeader, Prose, Section } from "./ui";

/** Shared frame for legal pages: title, version/date, draft notice, table of contents. */
export function LegalPage({
  title,
  path,
  lead,
  toc,
  children,
}: {
  title: string;
  path: string;
  lead?: string;
  toc?: { id: string; label: string }[];
  children: ReactNode;
}) {
  return (
    <>
      <PageHeader breadcrumb={<Crumbs items={[{ name: title, path }]} />} eyebrow="Informazioni legali" title={title} lead={lead}>
        <p className="flex items-center gap-2 font-mono text-small text-text-tertiary">
          <RiFileTextLine className="size-4" aria-hidden="true" />
          Versione {legal.version} · aggiornata il {updatedLabel}
        </p>
        {legal.draft && (
          <p className="mt-4 max-w-2xl rounded-lg bg-background-accent-soft p-3 text-small text-text-accent" role="note">
            Testo in revisione legale: la versione definitiva sarà pubblicata prima dell&apos;attivazione dei servizi online.
          </p>
        )}
      </PageHeader>
      <Section>
        <Container className="grid gap-10 lg:grid-cols-[15rem_1fr] lg:gap-16">
          {toc && toc.length > 0 ? (
            <nav aria-label="Indice" className="lg:sticky lg:top-28 lg:self-start">
              <p className="eyebrow text-eyebrow text-text-tertiary">Indice</p>
              <ol className="mt-3 space-y-1 text-small">
                {toc.map((t) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`} className="inline-flex min-h-10 items-center text-text-secondary underline-offset-4 hover:text-text-accent hover:underline">
                      {t.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          ) : (
            <div />
          )}
          <Prose>{children}</Prose>
        </Container>
      </Section>
    </>
  );
}

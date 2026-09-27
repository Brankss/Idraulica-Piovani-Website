import { RiCalculatorLine, RiPhoneLine } from "@remixicon/react";
import type { Metadata } from "next";
import Link from "next/link";
import { primaryPhone, telHref } from "@/content/company";
import { mainNav } from "@/content/nav";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { Container, CtaLink } from "@/components/site/ui";

export const metadata: Metadata = { title: "Pagina non trovata", robots: { index: false } };

/** Global 404: rendered by the root layout, so it brings its own chrome. */
export default function NotFound() {
  return (
    <>
      <Header />
      <main id="contenuto" className="bg-background-full">
        <Container className="max-w-3xl py-20 md:py-28">
          <p className="font-display text-[6rem] font-extrabold leading-none text-pipe md:text-[9rem]" aria-hidden="true">
            404
          </p>
          <h1 className="mt-4 font-display text-h1 md:text-h1-lg">Questa pagina non c&apos;è</h1>
          <p className="mt-4 text-lead text-text-secondary">
            Forse l&apos;indirizzo è cambiato con il nuovo sito. Da qui puoi ripartire:
          </p>
          <div className="mt-8 grid gap-3 sm:flex">
            <CtaLink href="/preventivo" icon={RiCalculatorLine} trailing={false}>
              Calcola il preventivo
            </CtaLink>
            <CtaLink href={telHref(primaryPhone)} variant="secondary" icon={RiPhoneLine} trailing={false}>
              Chiama {primaryPhone.display}
            </CtaLink>
          </div>
          <ul className="mt-10 flex flex-wrap gap-2">
            {[{ label: "Home", href: "/" }, ...mainNav].map((i) => (
              <li key={i.href}>
                <Link href={i.href} className="inline-flex min-h-11 items-center rounded-full border border-border-card bg-background-primary-default px-4 text-small-strong hover:border-pipe">
                  {i.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </main>
      <Footer />
    </>
  );
}

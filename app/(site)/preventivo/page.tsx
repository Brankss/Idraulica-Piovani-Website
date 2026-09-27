import type { Metadata } from "next";
import { Suspense } from "react";
import { QuoteWizard } from "@/components/quote/quote-wizard";
import { Container, Eyebrow } from "@/components/site/ui";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Preventivo online",
  description:
    "Calcola in due minuti una stima indicativa per caldaia, bagno, riscaldamento radiante, solare termico o riparazioni a Brescia e provincia. Senza impegno.",
  path: "/preventivo",
});

export default function PreventivoPage() {
  return (
    <div className="bg-background-full">
      <Container className="max-w-4xl pb-16 pt-6 md:pb-24 md:pt-12">
        <div className="mb-8 md:mb-10">
          <Eyebrow>Preventivo online</Eyebrow>
          <h1 className="mt-3 text-lead text-text-secondary md:text-lead-lg">
            Rispondi a qualche domanda: ti mostriamo subito una stima indicativa, senza impegno.
          </h1>
        </div>
        <Suspense fallback={<div className="h-96 animate-pulse rounded-card bg-background-secondary-default motion-reduce:animate-none" aria-hidden="true" />}>
          <QuoteWizard />
        </Suspense>
      </Container>
    </div>
  );
}

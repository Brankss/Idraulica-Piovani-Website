import type { Metadata } from "next";
import { Suspense } from "react";
import { BookingFlow } from "@/components/booking/booking-flow";
import { Container, Eyebrow } from "@/components/site/ui";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Prenota un sopralluogo",
  description:
    "Prenota online sopralluogo, manutenzione caldaia o riparazione non urgente a Brescia e provincia. Ti proponiamo gli orari in cui siamo già nella tua zona.",
  path: "/prenota",
});

export default function PrenotaPage() {
  return (
    <div className="bg-background-full">
      <Container className="max-w-4xl pb-16 pt-6 md:pb-24 md:pt-12">
        <div className="mb-8 md:mb-10">
          <Eyebrow>Prenotazione online</Eyebrow>
          <h1 className="mt-3 text-lead text-text-secondary md:text-lead-lg">
            Scegli il giorno e l&apos;ora: ti proponiamo per primi quelli in cui siamo già vicino a te.
          </h1>
        </div>
        <Suspense fallback={<div className="h-96 animate-pulse rounded-card bg-background-secondary-default motion-reduce:animate-none" aria-hidden="true" />}>
          <BookingFlow />
        </Suspense>
      </Container>
    </div>
  );
}

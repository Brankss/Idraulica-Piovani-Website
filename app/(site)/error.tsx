"use client";

import { RiPhoneLine, RiRefreshLine } from "@remixicon/react";
import { Button } from "@/components/base/buttons/button";
import { primaryPhone, telHref } from "@/content/company";
import { Container, CtaLink } from "@/components/site/ui";

export default function SiteError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <Container className="max-w-3xl py-20 md:py-28">
      <h1 className="font-display text-h1 md:text-h1-lg">Qualcosa non ha funzionato</h1>
      <p className="mt-4 text-lead text-text-secondary">
        La pagina non si è caricata correttamente. Riprova; se il problema continua, chiamaci: ti aiutiamo al telefono.
      </p>
      <div className="mt-8 grid gap-3 sm:flex">
        <Button size="large" leadingIcon={RiRefreshLine} onClick={() => reset()}>
          Riprova
        </Button>
        <CtaLink href={telHref(primaryPhone)} variant="secondary" icon={RiPhoneLine} trailing={false}>
          Chiama {primaryPhone.display}
        </CtaLink>
      </div>
    </Container>
  );
}

"use client";

import { RiExternalLinkLine, RiMapPin2Fill } from "@remixicon/react";
import { company, formatAddress, primaryAddress } from "@/content/company";
import { Button } from "@/components/base/buttons/button";
import { saveConsent, useConsent } from "@/lib/consent/store";

const query = encodeURIComponent(`${company.brand}, ${formatAddress(primaryAddress)}`);
const embedSrc = `https://www.google.com/maps?q=${query}&output=embed`;
const openHref = `https://www.google.com/maps/search/?api=1&query=${query}`;

/**
 * Google Maps only after consent (it sets third-party cookies). Until then a
 * static, cookie-free placeholder with the address and a plain link.
 */
export function StaticMap() {
  const { consent } = useConsent();
  const allowed = consent?.media === true;

  return (
    <div className="overflow-hidden rounded-card border border-border-card bg-background-primary-default">
      <div className="relative aspect-[4/3] w-full md:aspect-[16/10]">
        {allowed ? (
          <iframe
            title={`Mappa: ${company.brand}, ${formatAddress(primaryAddress)}`}
            src={embedSrc}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <div className="tech-grid absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background-secondary-default p-6 text-center">
            <RiMapPin2Fill className="size-10 text-text-accent" aria-hidden="true" />
            <p className="text-copy-strong text-text-primary">{formatAddress(primaryAddress)}</p>
            <p className="max-w-sm text-small text-text-secondary">
              La mappa è fornita da Google, che può impostare cookie propri. La carichiamo solo se sei d&apos;accordo.
            </p>
            <Button variant="secondary" size="large" onClick={() => saveConsent({ media: true })}>
              Carica la mappa
            </Button>
          </div>
        )}
      </div>
      <a
        href={openHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-12 items-center justify-between gap-3 border-t border-separator-border px-4 text-small-strong text-text-accent outline-none hover:bg-background-primary-hover focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-border-focus-ring"
      >
        Apri in Google Maps
        <RiExternalLinkLine className="size-4" aria-hidden="true" />
      </a>
    </div>
  );
}

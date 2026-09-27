"use client";

import { RiCloseLine } from "@remixicon/react";
import Link from "next/link";
import { useState } from "react";
import { Dialog, Heading, Modal, ModalOverlay } from "react-aria-components";
import { Button } from "@/components/base/buttons/button";
import { Switch } from "@/components/base/switch/switch";
import { closeConsentPreferences, openConsentPreferences, saveConsent, useConsent, useConsentPreferences } from "@/lib/consent/store";
import { cx } from "@/utils/cx";

/**
 * Consent banner following the Garante's 2021 cookie guidelines:
 * - closing with the X means "reject" (no consent is inferred);
 * - "Rifiuta" and "Accetta" have the same visual weight;
 * - nothing optional is loaded before a choice; the footer link re-opens it.
 */
export function ConsentBanner() {
  const { status, consent } = useConsent();
  const { open: prefsOpen, session } = useConsentPreferences();

  const decide = (value: boolean) => {
    saveConsent({ media: value });
    closeConsentPreferences();
  };

  return (
    <>
      {status === "undecided" && !prefsOpen && (
        <div
          role="region"
          aria-label="Consenso ai cookie"
          className={cx(
            "fixed inset-x-0 bottom-0 z-[45] p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]",
            "md:inset-x-auto md:bottom-6 md:left-6 md:max-w-md md:p-0",
          )}
        >
          <div className="anim-rise-in relative rounded-card border border-border-card bg-background-primary-default p-5 shadow-xl">
            <button
              type="button"
              onClick={() => decide(false)}
              aria-label="Chiudi e rifiuta i contenuti facoltativi"
              className="absolute right-2 top-2 inline-flex size-11 items-center justify-center rounded-lg text-foreground-icon-secondary outline-none hover:bg-background-secondary-default focus-visible:ring-2 focus-visible:ring-border-focus-ring"
            >
              <RiCloseLine className="size-5" aria-hidden="true" />
            </button>
            <h2 className="pr-10 text-copy-strong text-text-primary">Cookie e contenuti esterni</h2>
            <p className="mt-2 text-small text-text-secondary">
              Usiamo solo cookie tecnici necessari al funzionamento del sito. Con il tuo consenso carichiamo anche contenuti di terze parti, come
              la mappa di Google, che possono impostare cookie propri. Puoi cambiare idea in qualsiasi momento da «Preferenze cookie» in fondo alla
              pagina.{" "}
              <Link href="/cookie-policy" className="text-text-accent underline">
                Cookie policy
              </Link>
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Button variant="secondary" size="large" onClick={() => decide(false)}>
                Rifiuta
              </Button>
              <Button variant="secondary" size="large" onClick={() => decide(true)}>
                Accetta
              </Button>
            </div>
            <button
              type="button"
              onClick={() => openConsentPreferences()}
              className="mt-2 inline-flex min-h-11 w-full items-center justify-center rounded-lg text-small-strong text-text-accent underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-border-focus-ring"
            >
              Personalizza
            </button>
          </div>
        </div>
      )}

      <ModalOverlay
        isOpen={prefsOpen}
        onOpenChange={(o) => (o ? openConsentPreferences() : closeConsentPreferences())}
        isDismissable
        className={({ isEntering, isExiting }) =>
          cx("fixed inset-0 z-50 flex items-end justify-center bg-background-scrim md:items-center", isEntering && "anim-fade-in", isExiting && "anim-fade-out")
        }
      >
        <Modal
          className={({ isEntering, isExiting }) =>
            cx(
              "w-full max-w-lg rounded-t-card bg-background-primary-default shadow-xl outline-none md:rounded-card",
              isEntering && "anim-rise-in",
              isExiting && "anim-rise-out",
            )
          }
        >
          <PreferencesDialog key={session} initialMedia={consent?.media ?? false} onDecide={decide} />
        </Modal>
      </ModalOverlay>
    </>
  );
}

/** Keyed by panel session: the draft resets to the saved choice on each opening. */
function PreferencesDialog({ initialMedia, onDecide }: { initialMedia: boolean; onDecide: (media: boolean) => void }) {
  const [media, setMedia] = useState(initialMedia);
  const decide = onDecide;
  return (
    <Dialog className="p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] outline-none">
            {({ close }) => (
              <>
                <div className="flex items-start justify-between gap-4">
                  <Heading slot="title" className="font-display text-h3 text-text-primary">
                    Preferenze cookie
                  </Heading>
                  <button
                    type="button"
                    onClick={close}
                    aria-label="Chiudi senza salvare"
                    className="-mr-2 -mt-2 inline-flex size-11 items-center justify-center rounded-lg text-foreground-icon-secondary outline-none hover:bg-background-secondary-default focus-visible:ring-2 focus-visible:ring-border-focus-ring"
                  >
                    <RiCloseLine className="size-5" aria-hidden="true" />
                  </button>
                </div>

                <ul className="mt-5 divide-y divide-separator-border rounded-xl border border-border-card">
                  <li className="flex items-start justify-between gap-4 p-4">
                    <div>
                      <p className="text-copy-strong text-text-primary">Necessari</p>
                      <p className="mt-1 text-small text-text-secondary">
                        Servono al funzionamento del sito e a ricordare la tua scelta sui cookie. Non si possono disattivare.
                      </p>
                    </div>
                    <Switch isSelected isDisabled aria-label="Cookie necessari, sempre attivi" />
                  </li>
                  <li className="flex items-start justify-between gap-4 p-4">
                    <div>
                      <p className="text-copy-strong text-text-primary">Contenuti esterni</p>
                      <p className="mt-1 text-small text-text-secondary">
                        Mappa di Google Maps nella pagina contatti. Google può impostare cookie propri quando la mappa viene caricata.
                      </p>
                    </div>
                    <Switch isSelected={media} onChange={setMedia} aria-label="Contenuti esterni" />
                  </li>
                </ul>

                <p className="mt-4 text-small text-text-tertiary">
                  Non usiamo cookie di profilazione né strumenti di pubblicità.{" "}
                  <Link href="/cookie-policy" onClick={close} className="text-text-accent underline">
                    Leggi la cookie policy
                  </Link>
                </p>

                <div className="mt-6 grid grid-cols-2 gap-2">
                  <Button variant="secondary" size="large" onClick={() => decide(false)}>
                    Rifiuta tutto
                  </Button>
                  <Button variant="primary" size="large" onClick={() => decide(media)}>
                    Salva scelte
                  </Button>
                </div>
              </>
            )}
    </Dialog>
  );
}

export function ConsentPreferencesLink({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => openConsentPreferences()}
      className={cx(
        "inline-flex min-h-11 items-center rounded-md text-small text-text-inverse-secondary underline-offset-4 outline-none hover:text-text-inverse hover:underline focus-visible:ring-2 focus-visible:ring-border-focus-ring",
        className,
      )}
    >
      Preferenze cookie
    </button>
  );
}

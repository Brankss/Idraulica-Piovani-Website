"use client";

import { RiSettings3Line } from "@remixicon/react";
import { Button } from "@/components/base/buttons/button";
import { openConsentPreferences } from "@/lib/consent/store";

/** Opens the consent preferences panel from inside a (server) page. */
export function ConsentPreferencesButton() {
  return (
    <Button variant="secondary" size="large" leadingIcon={RiSettings3Line} onClick={() => openConsentPreferences()}>
      Apri le preferenze cookie
    </Button>
  );
}

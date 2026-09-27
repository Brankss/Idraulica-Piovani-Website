"use client";

import { useSyncExternalStore } from "react";

/**
 * Cookie / third-party consent (Garante Privacy, linee guida 10/06/2021).
 *
 * The site sets no profiling cookies. The only optional category is "media":
 * external embeds (Google Maps) that may set third-party cookies, loaded only
 * after consent. The choice is kept locally with its policy version and date;
 * it is asked again after 6 months or when POLICY_VERSION changes.
 */

export const POLICY_VERSION = "2026-09";
const KEY = "piovani-consent";
const MAX_AGE_DAYS = 180;

export type ConsentState = {
  version: string;
  decidedAt: string;
  media: boolean;
};

type Snapshot = { status: "unknown" | "undecided" | "decided"; consent: ConsentState | null };

const listeners = new Set<() => void>();
let cache: Snapshot = { status: "unknown", consent: null };

function read(): Snapshot {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return { status: "undecided", consent: null };
    const parsed = JSON.parse(raw) as ConsentState;
    const ageDays = (Date.now() - new Date(parsed.decidedAt).getTime()) / 86_400_000;
    if (parsed.version !== POLICY_VERSION || !(ageDays < MAX_AGE_DAYS)) {
      return { status: "undecided", consent: null };
    }
    return { status: "decided", consent: parsed };
  } catch {
    return { status: "undecided", consent: null };
  }
}

function emit() {
  cache = read();
  listeners.forEach((l) => l());
}

export function saveConsent(choice: { media: boolean }) {
  const state: ConsentState = { version: POLICY_VERSION, decidedAt: new Date().toISOString(), media: choice.media };
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // Storage blocked: keep the choice for this page view only.
    cache = { status: "decided", consent: state };
    listeners.forEach((l) => l());
    return;
  }
  emit();
}

function subscribe(listener: () => void) {
  if (listeners.size === 0) {
    cache = read();
    window.addEventListener("storage", emit);
  }
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) window.removeEventListener("storage", emit);
  };
}

const serverSnapshot: Snapshot = { status: "unknown", consent: null };

export function useConsent(): Snapshot {
  return useSyncExternalStore(
    subscribe,
    () => cache,
    () => serverSnapshot,
  );
}

/**
 * Preferences panel state lives outside React so any component (footer link,
 * banner, map) can open it. `session` increments on every opening so the
 * dialog can reset its draft by keying on it.
 */
type PrefsSnapshot = { open: boolean; session: number };
let prefs: PrefsSnapshot = { open: false, session: 0 };
const prefsListeners = new Set<() => void>();
const emitPrefs = () => prefsListeners.forEach((l) => l());

export function openConsentPreferences() {
  prefs = { open: true, session: prefs.session + 1 };
  emitPrefs();
}

export function closeConsentPreferences() {
  prefs = { ...prefs, open: false };
  emitPrefs();
}

const closedPrefs: PrefsSnapshot = { open: false, session: 0 };

export function useConsentPreferences(): PrefsSnapshot {
  return useSyncExternalStore(
    (l) => {
      prefsListeners.add(l);
      return () => prefsListeners.delete(l);
    },
    () => prefs,
    () => closedPrefs,
  );
}

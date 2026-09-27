"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { pricebook } from "@/content/pricebook";
import type { ZoneId } from "@/content/zones";
import { MunicipalityField, type MunicipalityValue } from "@/components/forms/municipality-field";
import { WizardShell } from "@/components/forms/wizard-shell";
import { ServiceIcon } from "@/components/site/service-icon";
import { isQuoteCategory, quoteCategories } from "@/lib/quote/categories";
import { estimateQuote } from "@/lib/quote/engine";
import type { QuoteCategory, QuoteInput } from "@/lib/quote/types";
import { defaultDetails, DetailStep, validateDetails, type Details } from "./detail-steps";
import { QuoteResultCard } from "./quote-result";
import { QuoteSendForm } from "./quote-send-form";

const STEPS = ["Intervento", "Dettagli", "Zona", "Stima"];
const STORE = "piovani-quote";

type State = { category: QuoteCategory | null; details: Details; place: MunicipalityValue | null };

function load(): State | null {
  try {
    return JSON.parse(sessionStorage.getItem(STORE) ?? "null") as State | null;
  } catch {
    return null;
  }
}

export function buildInput(s: State): QuoteInput | null {
  if (!s.category || !s.place) return null;
  const zone = (s.place.zoneId ?? "unknown") as ZoneId | "unknown";
  const d = s.details;
  switch (s.category) {
    case "caldaia":
      return { category: "caldaia", zone, uso: d.uso as never, abitazione: d.abitazione as never, impiantoAttuale: d.impiantoAttuale as never };
    case "manutenzione":
      return { category: "manutenzione", zone };
    case "bagno":
      return { category: "bagno", zone, intervento: d.intervento as never, mq: Number(d.mq ?? 6), sospesi: Boolean(d.sospesi) };
    case "radiante":
      return { category: "radiante", zone, sistema: d.sistema as never, mq: Number(d.mq ?? 90), contesto: d.contesto as never };
    case "solare":
      return { category: "solare", zone, persone: Number(d.persone ?? 4) };
    case "riparazione":
      return { category: "riparazione", zone, tipo: d.tipo as never };
    case "acque":
    case "stufe":
      return { category: s.category, zone };
  }
}

const noopSubscribe = () => () => {};

/** Client-only: the wizard restores from sessionStorage, which the server can't see. */
export function QuoteWizard() {
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);
  if (!mounted) {
    return <div className="h-96 animate-pulse rounded-card bg-background-secondary-default motion-reduce:animate-none" aria-hidden="true" />;
  }
  return <Wizard />;
}

function initialState(params: URLSearchParams): State {
  const saved = load();
  const cat = params.get("categoria");
  let next: State = saved ?? { category: null, details: {}, place: null };
  if (isQuoteCategory(cat) && cat !== next.category) {
    next = { ...next, category: cat, details: defaultDetails(cat) };
    const sistema = params.get("sistema");
    if (cat === "radiante" && sistema) next.details = { ...next.details, sistema };
  }
  return next;
}

function Wizard() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const [state, setState] = useState<State>(() => initialState(new URLSearchParams(params.toString())));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [userNavigated, setUserNavigated] = useState(false);

  // Deep link with a category but no step: land on the details (URL only).
  useEffect(() => {
    if (isQuoteCategory(params.get("categoria")) && !params.get("passo")) {
      const q = new URLSearchParams(params.toString());
      q.set("passo", "2");
      router.replace(`${pathname}?${q.toString()}`, { scroll: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- once, on arrival
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORE, JSON.stringify(state));
    } catch {
      /* storage unavailable: the wizard still works for this visit */
    }
  }, [state]);

  const requested = Number(params.get("passo") ?? "1");
  // Guard: never show a step whose prerequisites are missing.
  const step = useMemo(() => {
    if (!state.category) return 1;
    if (requested >= 3 && Object.keys(validateDetails(state.category, state.details)).length) return 2;
    if (requested >= 4 && !state.place) return 3;
    return Math.min(Math.max(requested, 1), 4);
  }, [requested, state]);

  function go(n: number, category = state.category) {
    const q = new URLSearchParams();
    q.set("passo", String(n));
    if (category) q.set("categoria", category);
    setUserNavigated(true);
    setErrors({});
    router.push(`${pathname}?${q.toString()}`, { scroll: false });
  }

  const input = useMemo(() => buildInput(state), [state]);
  const result = useMemo(() => (input ? estimateQuote(input, pricebook) : null), [input]);

  const bookService = state.category === "manutenzione" ? "manutenzione-caldaia" : state.category === "riparazione" ? "riparazione" : "sopralluogo";
  const bookHref = `/prenota?servizio=${bookService}${state.place ? `&comune=${encodeURIComponent(state.place.name)}` : ""}`;

  if (step === 1) {
    return (
      <WizardShell focusOnChange={userNavigated} steps={STEPS} current={0} title="Di cosa hai bisogno?" hideNav>
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {quoteCategories.map((c) => {
            const selected = state.category === c.id;
            return (
              <li key={c.id}>
                <button
                  type="button"
                  aria-pressed={selected}
                  onClick={() => {
                    setState((s) => ({ ...s, category: c.id, details: s.category === c.id ? s.details : defaultDetails(c.id) }));
                    go(2, c.id);
                  }}
                  className={[
                    "flex h-full min-h-28 w-full flex-col justify-between gap-3 rounded-xl border p-4 text-left outline-none transition-colors",
                    "focus-visible:ring-2 focus-visible:ring-border-focus-ring",
                    selected ? "border-pipe bg-background-accent-soft" : "border-border-card bg-background-primary-default hover:border-pipe",
                  ].join(" ")}
                >
                  <ServiceIcon icon={c.icon} className="size-7 text-text-accent" />
                  <span>
                    <span className="block text-copy-strong text-text-primary">{c.label}</span>
                    <span className="mt-0.5 block text-small text-text-tertiary">{c.hint}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </WizardShell>
    );
  }

  const category = state.category!;
  const label = quoteCategories.find((c) => c.id === category)!.label;

  if (step === 2) {
    return (
      <WizardShell
        focusOnChange={userNavigated}
        steps={STEPS}
        current={1}
        title={label}
        onBack={() => go(1)}
        onNext={() => {
          const errs = validateDetails(category, state.details);
          if (Object.keys(errs).length) {
            setErrors(errs);
            return;
          }
          go(3);
        }}
      >
        <DetailStep
          category={category}
          details={state.details}
          errors={errors}
          set={(k, v) => {
            setState((s) => ({ ...s, details: { ...s.details, [k]: v } }));
            setErrors((e) => ({ ...e, [k]: "" }));
          }}
        />
      </WizardShell>
    );
  }

  if (step === 3) {
    return (
      <WizardShell
        focusOnChange={userNavigated}
        steps={STEPS}
        current={2}
        title="Dove si trova la casa?"
        onBack={() => go(2)}
        nextLabel="Vedi la stima"
        onNext={() => {
          if (!state.place) {
            setErrors({ place: "Indica il comune per calcolare la trasferta." });
            return;
          }
          go(4);
        }}
      >
        <MunicipalityField value={state.place} onChange={(v) => setState((s) => ({ ...s, place: v }))} error={errors.place} />
      </WizardShell>
    );
  }

  return (
    <WizardShell focusOnChange={userNavigated} steps={STEPS} current={3} title={result?.kind === "estimate" ? "La tua stima" : "Ci vuole un sopralluogo"} hideNav>
      {result && input && state.place && (
        <div className="space-y-10">
          <QuoteResultCard result={result} municipality={state.place.name} bookHref={bookHref} onEdit={() => go(2)} />
          <div className="no-print">
            <QuoteSendForm input={input} result={result} municipality={state.place.name} />
          </div>
        </div>
      )}
      <div className="no-print mt-8">
        <ResetLink
          onReset={() => {
            setState({ category: null, details: {}, place: null });
            go(1, null);
          }}
        />
      </div>
    </WizardShell>
  );
}

function ResetLink({ onReset }: { onReset: () => void }) {
  return (
    <button type="button" onClick={onReset} className="min-h-11 text-small-strong text-text-accent underline-offset-4 hover:underline">
      Ricomincia con un altro intervento
    </button>
  );
}

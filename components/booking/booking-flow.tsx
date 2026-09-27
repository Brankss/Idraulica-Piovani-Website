"use client";

import { RiAlarmWarningLine, RiCalendarCheckLine, RiCheckboxCircleLine, RiDownloadLine, RiTimeLine } from "@remixicon/react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { Button } from "@/components/base/buttons/button";
import { primaryPhone, telHref } from "@/content/company";
import { zoneForMunicipality } from "@/content/zones";
import { ChoiceGroup } from "@/components/forms/choice";
import { ErrorSummary, Honeypot, PrivacyChecks, TextAreaField, TextField } from "@/components/forms/fields";
import { MunicipalityField, type MunicipalityValue } from "@/components/forms/municipality-field";
import { WizardShell } from "@/components/forms/wizard-shell";
import { addDays, formatDayLong, formatTime, nowInRome } from "@/lib/booking/calendar";
import { bookableServices, bookingHorizonDays, getBookableService, workRules, zoneLites } from "@/lib/booking/config";
import { rankSlots } from "@/lib/booking/engine";
import { buildIcs, downloadIcs } from "@/lib/booking/ics";
import type { BookableServiceId, DayAvailability, Slot } from "@/lib/booking/types";
import { data, type BookingReceipt } from "@/lib/data";
import { contactDetailsSchema, fieldErrors, type ContactDetails, type FieldErrors } from "@/lib/quote/schema";
import { SlotPicker } from "./slot-picker";

const STEPS = ["Servizio", "Luogo", "Data e ora", "Contatti", "Conferma"];
const LABELS: Record<string, string> = { name: "Nome e cognome", email: "Email", phone: "Telefono", privacyAck: "Informativa privacy" };

const noopSubscribe = () => () => {};

export function BookingFlow() {
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);
  if (!mounted) return <div className="h-96 animate-pulse rounded-card bg-background-secondary-default motion-reduce:animate-none" aria-hidden="true" />;
  return <Flow />;
}

function Flow() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const [serviceId, setServiceId] = useState<BookableServiceId | undefined>(
    () => getBookableService(params.get("servizio") ?? "")?.id,
  );
  const [place, setPlace] = useState<MunicipalityValue | null>(() => {
    const c = params.get("comune");
    return c ? { name: c, zoneId: zoneForMunicipality(c)?.id ?? null } : null;
  });
  const [address, setAddress] = useState("");
  const [slot, setSlot] = useState<Slot | null>(null);
  const [days, setDays] = useState<DayAvailability[] | null>(null);
  const [contact, setContact] = useState({ name: "", email: "", phone: "", privacyAck: false, marketing: false, notes: "", company: "" });
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [receipt, setReceipt] = useState<BookingReceipt | null>(null);
  const [busy, setBusy] = useState(false);
  const [userNavigated, setUserNavigated] = useState(false);

  const service = serviceId ? getBookableService(serviceId) : undefined;
  const requested = Number(params.get("passo") ?? "1");
  const step = useMemo(() => {
    if (receipt) return 5;
    if (!service) return 1;
    if (requested >= 3 && (!place || !address.trim())) return 2;
    if (requested >= 4 && !slot) return 3;
    if (requested >= 5 && Object.keys(contactErrors(contact)).length) return 4;
    return Math.min(Math.max(requested, 1), 5);
  }, [requested, service, place, address, slot, contact, receipt]);

  // Load the calendar when the slot step opens (mock today, API tomorrow).
  useEffect(() => {
    if (step !== 3 || !service) return;
    let alive = true;
    const now = nowInRome();
    data.bookings.getBusy({ from: addDays(now.date, 1), to: addDays(now.date, bookingHorizonDays) }).then((busyBlocks) => {
      if (!alive) return;
      setDays(rankSlots({ service, zoneId: place?.zoneId ?? null, now, horizonDays: bookingHorizonDays }, workRules, busyBlocks, zoneLites));
    });
    return () => {
      alive = false;
    };
  }, [step, service, place]);

  function go(n: number) {
    const q = new URLSearchParams();
    q.set("passo", String(n));
    if (serviceId) q.set("servizio", serviceId);
    setUserNavigated(true);
    setErrors({});
    router.push(`${pathname}?${q.toString()}`, { scroll: false });
  }

  async function submit() {
    if (!service || !slot || !place) return;
    const parsed = contactDetailsSchema.safeParse(contact);
    if (!parsed.success || contact.company) return;
    setBusy(true);
    try {
      const r = await data.bookings.createBooking(
        {
          serviceId: service.id,
          date: slot.date,
          start: slot.start,
          end: slot.end,
          zoneId: place.zoneId,
          municipality: place.name,
          address,
          notes: contact.notes,
          customer: parsed.data,
        },
        service.confirmationMode,
      );
      setReceipt(r);
      setUserNavigated(true);
    } finally {
      setBusy(false);
    }
  }

  const urgentNote = (
    <p className="mb-6 flex gap-3 rounded-xl bg-background-inverse p-4 text-small text-text-inverse">
      <RiAlarmWarningLine className="mt-0.5 size-5 shrink-0 text-text-accent-inverse" aria-hidden="true" />
      <span>
        Per guasti urgenti o perdite d&apos;acqua non prenotare:{" "}
        <a href={telHref(primaryPhone)} className="font-semibold text-text-accent-inverse underline">
          chiama il {primaryPhone.display}
        </a>
        .
      </span>
    </p>
  );

  if (step === 1) {
    return (
      <>
        {urgentNote}
        <WizardShell
          focusOnChange={userNavigated}
          steps={STEPS}
          current={0}
          title="Per cosa vuoi prenotare?"
          onNext={() => (serviceId ? go(2) : setErrors({ service: "Scegli il tipo di appuntamento." }))}
        >
          <ChoiceGroup
            label="Tipo di appuntamento"
            value={serviceId}
            onChange={(v) => {
              setServiceId(v);
              setSlot(null);
              setErrors({});
            }}
            error={errors.service}
            options={bookableServices.map((s) => ({
              value: s.id,
              title: s.label,
              description: `${s.description} Circa ${s.durationMin} minuti.`,
            }))}
          />
        </WizardShell>
      </>
    );
  }

  if (step === 2) {
    return (
      <WizardShell
        focusOnChange={userNavigated}
        steps={STEPS}
        current={1}
        title="Dove dobbiamo venire?"
        onBack={() => go(1)}
        onNext={() => {
          const e: Record<string, string> = {};
          if (!place) e.place = "Indica il comune.";
          if (!address.trim()) e.address = "Scrivi via e numero civico.";
          if (Object.keys(e).length) return setErrors(e);
          setSlot(null);
          setDays(null);
          go(3);
        }}
      >
        <div className="space-y-8">
          <MunicipalityField
            value={place}
            onChange={(v) => {
              setPlace(v);
              setErrors((x) => ({ ...x, place: undefined }));
            }}
            error={errors.place}
          />
          <TextField
            id="field-address"
            label="Via e numero civico"
            isRequired
            autoComplete="street-address"
            value={address}
            onChange={(v) => {
              setAddress(v);
              setErrors((x) => ({ ...x, address: undefined }));
            }}
            error={errors.address}
          />
        </div>
      </WizardShell>
    );
  }

  if (step === 3 && service) {
    return (
      <WizardShell
        focusOnChange={userNavigated}
        steps={STEPS}
        current={2}
        title="Scegli giorno e ora"
        onBack={() => go(2)}
        onNext={() => (slot ? go(4) : setErrors({ slot: "Scegli un orario per continuare." }))}
      >
        <p className="mb-6 text-copy text-text-secondary">
          {service.label} a <strong className="text-text-primary">{place?.name}</strong>, circa {service.durationMin} minuti. Gli orari tengono già
          conto degli spostamenti tra un intervento e l&apos;altro.
        </p>
        {days ? (
          <SlotPicker
            days={days}
            value={slot}
            onChange={(s) => {
              setSlot(s);
              setErrors({});
            }}
          />
        ) : (
          <div className="space-y-3" aria-busy="true" aria-live="polite">
            <p className="sr-only">Caricamento degli orari disponibili…</p>
            <div className="h-28 animate-pulse rounded-xl bg-background-secondary-default motion-reduce:animate-none" />
            <div className="h-20 animate-pulse rounded-xl bg-background-secondary-default motion-reduce:animate-none" />
          </div>
        )}
        {errors.slot && (
          <p role="alert" className="mt-4 text-small text-text-error-primary">
            {errors.slot}
          </p>
        )}
      </WizardShell>
    );
  }

  if (step === 4) {
    return (
      <WizardShell
        focusOnChange={userNavigated}
        steps={STEPS}
        current={3}
        title="I tuoi contatti"
        onBack={() => go(3)}
        nextLabel="Riepilogo"
        onNext={() => {
          const e = contactErrors(contact);
          if (Object.keys(e).length) {
            setErrors(e);
            const first = Object.keys(LABELS).find((k) => e[k]);
            if (first) document.getElementById(`field-${first}`)?.focus();
            return;
          }
          go(5);
        }}
      >
        <div className="relative space-y-5">
          <ErrorSummary errors={errors} labels={LABELS} />
          <TextField id="field-name" label="Nome e cognome" isRequired autoComplete="name" value={contact.name} onChange={(v) => setContact((c) => ({ ...c, name: v }))} error={errors.name} />
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField id="field-phone" label="Telefono" type="tel" inputMode="tel" isRequired autoComplete="tel" value={contact.phone} onChange={(v) => setContact((c) => ({ ...c, phone: v }))} error={errors.phone} help="Ti chiamiamo solo per questo appuntamento." />
            <TextField id="field-email" label="Email" type="email" inputMode="email" isRequired autoComplete="email" value={contact.email} onChange={(v) => setContact((c) => ({ ...c, email: v }))} error={errors.email} />
          </div>
          <TextAreaField
            id="field-notes"
            label="Note per il tecnico (facoltative)"
            rows={3}
            value={contact.notes}
            onChange={(v) => setContact((c) => ({ ...c, notes: v }))}
            help="Citofono, piano, accesso, tipo di caldaia…"
          />
          <div id="field-privacyAck" tabIndex={-1}>
            <PrivacyChecks
              privacyAck={contact.privacyAck}
              marketing={contact.marketing}
              onPrivacyAck={(v) => setContact((c) => ({ ...c, privacyAck: v }))}
              onMarketing={(v) => setContact((c) => ({ ...c, marketing: v }))}
              error={errors.privacyAck}
            />
          </div>
          <Honeypot value={contact.company} onChange={(v) => setContact((c) => ({ ...c, company: v }))} />
        </div>
      </WizardShell>
    );
  }

  // Step 5 — summary, then receipt
  if (!service || !slot || !place) return null;
  const instant = service.confirmationMode === "instant";
  const when = `${formatDayLong(slot.date)}, ${formatTime(slot.start)}–${formatTime(slot.end)}`;

  if (receipt) {
    return (
      <WizardShell focusOnChange={userNavigated} steps={STEPS} current={4} title={receipt.status === "confirmed" ? "Appuntamento confermato" : "Richiesta inviata"} hideNav>
        <div role="status" className="rounded-card border border-border-card bg-background-primary-default p-6 md:p-8">
          <RiCheckboxCircleLine className="size-10 text-text-eco" aria-hidden="true" />
          <p className="mt-4 text-lead">
            {service.label}: <strong>{when}</strong>
          </p>
          <p className="mt-2 text-copy text-text-secondary">
            {receipt.status === "confirmed"
              ? "Ti aspettiamo all'indirizzo indicato. Se devi spostare l'appuntamento, chiamaci."
              : "Ti contattiamo per confermare l'orario. Finché non ricevi la conferma l'orario è riservato per te, ma non ancora definitivo."}
          </p>
          <p className="mt-2 text-small text-text-tertiary">
            Riferimento <span className="font-mono">{receipt.id}</span>
          </p>
          {data.demo && (
            <p className="mt-4 rounded-lg bg-background-accent-soft p-3 text-small text-text-accent">
              Versione dimostrativa: nessun appuntamento è stato realmente registrato.
            </p>
          )}
          <div className="mt-6 grid gap-3 sm:flex">
            <Button
              size="large"
              variant="secondary"
              leadingIcon={RiDownloadLine}
              onClick={() =>
                downloadIcs(
                  `piovani-${slot.date}.ics`,
                  buildIcs({
                    uid: receipt.id,
                    date: slot.date,
                    start: slot.start,
                    end: slot.end,
                    title: `${service.label} · Idraulica Piovani${receipt.status === "requested" ? " (da confermare)" : ""}`,
                    description: `Rif. ${receipt.id}. Telefono ${primaryPhone.display}.`,
                    location: `${address}, ${place.name}`,
                  }),
                )
              }
            >
              Aggiungi al calendario
            </Button>
            <Link href="/" className="inline-flex min-h-12 items-center justify-center px-4 text-copy-strong text-text-accent underline-offset-4 hover:underline">
              Torna alla home
            </Link>
          </div>
        </div>
      </WizardShell>
    );
  }

  return (
    <WizardShell
      focusOnChange={userNavigated}
      steps={STEPS}
      current={4}
      title="Controlla e conferma"
      onBack={() => go(4)}
      nextLabel={busy ? "Invio in corso…" : instant ? "Conferma l'appuntamento" : "Invia la richiesta"}
      busy={busy}
      onNext={submit}
    >
      <dl className="divide-y divide-separator-border overflow-hidden rounded-card border border-border-card bg-background-primary-default">
        {[
          ["Appuntamento", service.label],
          ["Quando", when],
          ["Dove", `${address}, ${place.name}`],
          ["Contatti", `${contact.name} · ${contact.phone} · ${contact.email}`],
          ...(contact.notes ? [["Note", contact.notes]] : []),
        ].map(([k, v]) => (
          <div key={k} className="grid gap-1 p-4 sm:grid-cols-[9rem_1fr] sm:gap-4">
            <dt className="eyebrow text-eyebrow text-text-tertiary sm:pt-1">{k}</dt>
            <dd className="text-copy text-text-primary">{v}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 flex gap-2 text-small text-text-secondary">
        {instant ? (
          <RiCalendarCheckLine className="mt-0.5 size-4 shrink-0 text-text-accent" aria-hidden="true" />
        ) : (
          <RiTimeLine className="mt-0.5 size-4 shrink-0 text-text-accent" aria-hidden="true" />
        )}
        {instant
          ? "L'appuntamento è confermato subito."
          : "Riceviamo la tua richiesta e ti contattiamo per confermare l'orario."}{" "}
        Leggi le{" "}
        <Link href="/termini#prenotazioni" className="text-text-accent underline">
          condizioni di prenotazione
        </Link>
        .
      </p>
    </WizardShell>
  );
}

function contactErrors(c: { name: string; email: string; phone: string; privacyAck: boolean; marketing: boolean }): Record<string, string> {
  const parsed = contactDetailsSchema.safeParse(c);
  return parsed.success ? {} : (fieldErrors(parsed.error) as FieldErrors<ContactDetails> as Record<string, string>);
}

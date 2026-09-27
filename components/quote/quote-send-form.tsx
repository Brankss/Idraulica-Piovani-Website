"use client";

import { RiCheckboxCircleLine, RiCloseLine, RiImageLine, RiSendPlaneLine } from "@remixicon/react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/base/buttons/button";
import { FileUpload, formatFileSize } from "@/components/base/file-upload/file-upload";
import { ErrorSummary, Honeypot, PrivacyChecks, TextAreaField, TextField } from "@/components/forms/fields";
import { data } from "@/lib/data";
import { contactDetailsSchema, fieldErrors, type ContactDetails, type FieldErrors } from "@/lib/quote/schema";
import type { QuoteInput, QuoteResult } from "@/lib/quote/types";

const LABELS: Record<string, string> = { name: "Nome e cognome", email: "Email", phone: "Telefono", privacyAck: "Informativa privacy" };
const MAX_PHOTOS = 5;

/**
 * "Send me the written quote": photos + notes + contact details. Photos stay
 * in the browser in this phase (the backend will upload them to private
 * storage and strip EXIF location data).
 */
export function QuoteSendForm({ input, result, municipality }: { input: QuoteInput; result: QuoteResult; municipality: string }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", privacyAck: false, marketing: false, notes: "", company: "" });
  const [photos, setPhotos] = useState<File[]>([]);
  const [errors, setErrors] = useState<FieldErrors<ContactDetails>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const [ref, setRef] = useState<string>();

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const parsed = contactDetailsSchema.safeParse(form);
    if (!parsed.success) {
      const errs = fieldErrors(parsed.error);
      setErrors(errs);
      const first = Object.keys(LABELS).find((k) => errs[k as keyof ContactDetails]);
      if (first) document.getElementById(`field-${first}`)?.focus();
      return;
    }
    if (form.company) return;
    setStatus("sending");
    try {
      const res = await data.quotes.submitQuote({ input, result, municipality, customer: parsed.data, notes: form.notes, photoCount: photos.length });
      setRef(res.id);
      setStatus("sent");
    } catch {
      setStatus("failed");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-card border border-border-card bg-background-primary-default p-6 md:p-8">
        <RiCheckboxCircleLine className="size-10 text-text-eco" aria-hidden="true" />
        <h3 className="mt-4 font-display text-h3">Richiesta inviata</h3>
        <p className="mt-2 text-copy text-text-secondary">
          Ti contattiamo per fissare il sopralluogo e prepararti il preventivo scritto. Riferimento: <span className="font-mono">{ref}</span>
        </p>
        {data.demo && (
          <p className="mt-4 rounded-lg bg-background-accent-soft p-3 text-small text-text-accent">
            Versione dimostrativa: la richiesta non è stata realmente inviata.
          </p>
        )}
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="relative space-y-5 rounded-card border border-border-card bg-background-primary-default p-5 md:p-8">
      <div>
        <h3 className="font-display text-h3">Ricevi il preventivo scritto</h3>
        <p className="mt-1 text-copy text-text-secondary">Ti ricontattiamo noi per il sopralluogo. Le risposte che hai dato sono già incluse.</p>
      </div>
      <ErrorSummary errors={errors} labels={LABELS} />

      <div className="space-y-3">
        <p className="text-copy-strong">
          Foto dell&apos;impianto <span className="font-normal text-text-tertiary">(facoltative, fino a {MAX_PHOTOS})</span>
        </p>
        {photos.length < MAX_PHOTOS && (
          <FileUpload
            key={photos.length}
            allowedExtensions={["jpg", "jpeg", "png", "heic", "webp"]}
            maxBytes={10 * 1024 * 1024}
            onUploadComplete={(f) => setPhotos((p) => [...p, f].slice(0, MAX_PHOTOS))}
          />
        )}
        {photos.length > 0 && (
          <ul className="space-y-2">
            {photos.map((p, i) => (
              <li key={`${p.name}-${i}`} className="flex min-h-12 items-center gap-3 rounded-lg bg-background-secondary-default px-3">
                <RiImageLine className="size-5 shrink-0 text-text-accent" aria-hidden="true" />
                <span className="min-w-0 flex-1 truncate text-small">{p.name}</span>
                <span className="text-small text-text-tertiary">{formatFileSize(p.size)}</span>
                <button
                  type="button"
                  onClick={() => setPhotos((all) => all.filter((_, j) => j !== i))}
                  aria-label={`Rimuovi ${p.name}`}
                  className="inline-flex size-11 items-center justify-center rounded-lg outline-none hover:bg-background-secondary-hover focus-visible:ring-2 focus-visible:ring-border-focus-ring"
                >
                  <RiCloseLine className="size-5" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <TextAreaField
        id="field-notes"
        label="Note (facoltative)"
        rows={3}
        value={form.notes}
        onChange={(v) => set("notes", v)}
        help="Piano, accessi, orari in cui preferisci essere chiamato…"
      />
      <TextField id="field-name" label="Nome e cognome" isRequired autoComplete="name" value={form.name} onChange={(v) => set("name", v)} error={errors.name} />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          id="field-email"
          label="Email"
          type="email"
          inputMode="email"
          isRequired
          autoComplete="email"
          value={form.email}
          onChange={(v) => set("email", v)}
          error={errors.email}
        />
        <TextField
          id="field-phone"
          label="Telefono"
          type="tel"
          inputMode="tel"
          isRequired
          autoComplete="tel"
          value={form.phone}
          onChange={(v) => set("phone", v)}
          error={errors.phone}
        />
      </div>
      <div id="field-privacyAck" tabIndex={-1}>
        <PrivacyChecks
          privacyAck={form.privacyAck}
          marketing={form.marketing}
          onPrivacyAck={(v) => set("privacyAck", v)}
          onMarketing={(v) => set("marketing", v)}
          error={errors.privacyAck}
        />
      </div>
      <Honeypot value={form.company} onChange={(v) => set("company", v)} />
      {status === "failed" && (
        <p role="alert" className="text-small text-text-error-primary">
          Invio non riuscito. Riprova tra poco oppure chiamaci.
        </p>
      )}
      <Button type="submit" size="large" leadingIcon={RiSendPlaneLine} className="w-full sm:w-auto" disabled={status === "sending"}>
        {status === "sending" ? "Invio in corso…" : "Invia la richiesta"}
      </Button>
    </form>
  );
}

"use client";

import { RiCheckboxCircleLine, RiSendPlaneLine } from "@remixicon/react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/base/buttons/button";
import { data } from "@/lib/data";
import { contactMessageSchema, fieldErrors, type ContactMessage, type FieldErrors } from "@/lib/quote/schema";
import { ErrorSummary, Honeypot, PrivacyChecks, TextAreaField, TextField } from "./fields";

const LABELS: Record<string, string> = {
  name: "Nome e cognome",
  email: "Email",
  phone: "Telefono",
  message: "Messaggio",
  privacyAck: "Informativa privacy",
};

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", privacyAck: false, marketing: false, company: "" });
  const [errors, setErrors] = useState<FieldErrors<ContactMessage>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const [ref, setRef] = useState<string>();

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k as keyof ContactMessage]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const parsed = contactMessageSchema.safeParse(form);
    if (!parsed.success) {
      const errs = fieldErrors(parsed.error);
      setErrors(errs);
      const first = Object.keys(LABELS).find((k) => errs[k as keyof ContactMessage]);
      if (first) document.getElementById(`field-${first}`)?.focus();
      return;
    }
    if (form.company) return; // honeypot tripped: silently ignore
    setStatus("sending");
    try {
      const res = await data.leads.submitContact(parsed.data);
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
        <h3 className="mt-4 font-display text-h3">Messaggio inviato</h3>
        <p className="mt-2 text-copy text-text-secondary">
          Grazie {form.name.split(" ")[0]}. Ti rispondiamo appena possibile negli orari di apertura. Riferimento: <span className="font-mono">{ref}</span>
        </p>
        {data.demo && (
          <p className="mt-4 rounded-lg bg-background-accent-soft p-3 text-small text-text-accent">
            Versione dimostrativa: il messaggio non è stato realmente inviato.
          </p>
        )}
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="relative space-y-5 rounded-card border border-border-card bg-background-primary-default p-5 md:p-8">
      <ErrorSummary errors={errors} labels={LABELS} />
      <TextField
        id="field-name"
        label="Nome e cognome"
        isRequired
        autoComplete="name"
        value={form.name}
        onChange={(v) => set("name", v)}
        error={errors.name}
      />
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
          label="Telefono (facoltativo)"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={form.phone}
          onChange={(v) => set("phone", v)}
          error={errors.phone}
          help="Se preferisci essere richiamato."
        />
      </div>
      <TextAreaField
        id="field-message"
        label="Come possiamo aiutarti?"
        isRequired
        rows={5}
        value={form.message}
        onChange={(v) => set("message", v)}
        error={errors.message}
        help="Descrivi il problema o il lavoro: tipo di impianto, stanza, da quanto tempo."
      />
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
      <Button type="submit" size="large" className="w-full sm:w-auto" leadingIcon={RiSendPlaneLine} disabled={status === "sending"} aria-disabled={status === "sending"}>
        {status === "sending" ? "Invio in corso…" : "Invia messaggio"}
      </Button>
      <p className="text-small text-text-tertiary">* Campi obbligatori</p>
    </form>
  );
}

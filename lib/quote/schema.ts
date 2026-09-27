import { z } from "zod";

/**
 * Validation shared by the browser forms and (later) the server actions.
 * Messages are the ones the user reads: say what is wrong and how to fix it.
 */

const phone = z
  .string()
  .trim()
  .regex(/^\+?[0-9\s./-]{6,20}$/, "Inserisci un numero di telefono valido, ad esempio 347 123 4567.");

export const contactDetailsSchema = z.object({
  name: z.string().trim().min(2, "Scrivi nome e cognome."),
  email: z.email("Inserisci un indirizzo email valido, ad esempio nome@esempio.it."),
  phone,
  privacyAck: z.literal(true, "Per inviare la richiesta devi dichiarare di aver letto l'informativa privacy."),
  marketing: z.boolean(),
});

export type ContactDetails = z.infer<typeof contactDetailsSchema>;

export const contactMessageSchema = contactDetailsSchema.extend({
  phone: phone.or(z.literal("")),
  message: z.string().trim().min(10, "Descrivi la tua richiesta in almeno 10 caratteri."),
  /** Honeypot: must stay empty */
  company: z.string().max(0).optional(),
});

export type ContactMessage = z.infer<typeof contactMessageSchema>;

export type FieldErrors<T> = Partial<Record<keyof T, string>>;

/** Flatten a Zod result into one message per field (first issue wins). */
export function fieldErrors<T>(error: z.ZodError<T>): FieldErrors<T> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "");
    if (key && !out[key]) out[key] = issue.message;
  }
  return out as FieldErrors<T>;
}

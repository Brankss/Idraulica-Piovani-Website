# Piano backend (non ancora implementato)

Il frontend dipende solo dalle interfacce in `lib/data/ports.ts`. Oggi le implementa `lib/data/mock.ts`; il backend aggiungerà `lib/data/supabase.ts` con le stesse firme, e `lib/data/index.ts` sceglierà quale usare. UI e motori (`lib/quote/engine.ts`, `lib/booking/engine.ts`) non cambiano: il server eseguirà le stesse funzioni.

## Stack

- **Supabase in regione UE (Francoforte):**
  - Postgres;
  - Auth solo per l'area admin, con MFA;
  - Storage privato per le foto dei preventivi;
  - RLS in deny-all per gli utenti anonimi.
- **Next.js:** Server Actions e Route Handlers, validazione con gli schemi Zod già in `lib/quote/schema.ts`.
- **Email transazionali:** conferma, promemoria a 24 ore, notifica al titolare. Fornitore con server UE, per esempio Resend.
- **Anti-spam:** Cloudflare Turnstile più rate limiting.
- **Cron:** promemoria, scadenza degli slot bloccati temporaneamente, pulizia dei dati secondo la policy di conservazione.
- **CSP con nonce per richiesta** tramite `proxy`, per eliminare `'unsafe-inline'` dagli script.

## Tabelle

| Tabella | Contenuto |
|---|---|
| `services` | durata, buffer, prenotabile, `confirmation_mode` |
| `zones` | comuni, fascia di spostamento, adiacenze |
| `availability_rules`, `closures` | orari e chiusure (le festività sono calcolate) |
| `bookings` | stati held → requested → confirmed → completed / cancelled; vincolo `EXCLUDE USING gist` su tstzrange contro le doppie prenotazioni; token di gestione salvato come hash |
| `customers` | contatti, consensi con data |
| `quote_requests` | risposte (jsonb), stima, `pricebook_version`, pipeline |
| `pricebooks` | listino versionato, modificabile dall'admin |
| `consent_log`, `audit_log` | prova del consenso, tracciamento delle modifiche |

## Integrazioni

- **Google Calendar del titolare:** gli impegni (freebusy) bloccano gli slot; alla conferma viene creato l'evento. I token OAuth sono salvati cifrati.
- **Foto dei preventivi:** controllo di tipo e peso e rimozione dei dati EXIF (posizione) prima dell'archiviazione.

## Area admin (componenti BoardUI)

- Dashboard con i KPI della settimana.
- Agenda.
- Prenotazioni e preventivi (`data-table`).
- Disponibilità e chiusure.
- Editor del listino.
- Impostazioni.

Il calendario mensile di BoardUI è a pagamento (Pro): in alternativa si fa una vista settimanale su misura.

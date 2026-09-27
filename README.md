# Idraulica Piovani: sito web

Nuovo sito di Idraulica Piovani (Brescia, dal 1930). Next.js 16, Tailwind CSS v4 e componenti BoardUI, pensato prima per il mobile.

**Stato: demo per il cliente.** Tutte le pagine sono complete. Preventivo online, calendario prenotazioni e modulo contatti funzionano con un backend simulato nel browser: non inviano né registrano nulla e lo dicono chiaramente. Il sito in modalità demo non viene indicizzato dai motori di ricerca.

## Pagine

Home · Servizi (indice e 8 schede) · SANATHERM · Bioedilizia · Chi siamo · FAQ · Contatti · Preventivo online · Prenota · Privacy · Cookie · Termini · Note legali · Accessibilità · 404.

Tutti i contenuti provengono dal sito attuale del cliente: vedi [docs/verifica-contenuti.md](docs/verifica-contenuti.md).

## Avvio in locale

Serve Node.js 20 o superiore.

```bash
npm install
npm run dev
```

Il sito è su http://localhost:3000.

| Comando | Cosa fa |
|---|---|
| `npm run dev` | sviluppo |
| `npm run build` | build di produzione (demo) |
| `npm run build:strict` | build per il **lancio reale**: fallisce finché ci sono contenuti segnaposto |
| `npm run lint` · `npm run typecheck` | controlli statici |
| `npm test` | test unitari dei motori di preventivo e calendario (Vitest) |
| `npm run test:e2e` | test end-to-end e accessibilità (Playwright + axe) sul build di produzione; eseguire prima `npm run build` e, una volta sola, `npx playwright install chromium` |

## Pubblicare la demo (gratis)

Il progetto non ha bisogno di variabili d'ambiente per la demo.

**Vercel**
1. Su vercel.com → *Add New Project* → importa questa repository da GitHub.
2. Lascia le impostazioni proposte (framework Next.js) e premi *Deploy*.

**Netlify** (alternativa)
1. *Add new site* → *Import an existing project* → scegli la repository.
2. Build command `npm run build`. Netlify riconosce Next.js da solo.

Nota: i piani gratuiti hanno condizioni d'uso diverse. Il piano Hobby di Vercel, per esempio, è per uso personale e non commerciale. Per la demo va bene; per il sito definitivo verifica i termini del servizio scelto.

### Variabili d'ambiente (facoltative)

| Variabile | Valore | Effetto |
|---|---|---|
| `NEXT_PUBLIC_SITE_MODE` | `demo` (predefinito) o `live` | `live` rende il sito indicizzabile e toglie gli avvisi demo. Usarlo solo al lancio |
| `NEXT_PUBLIC_SITE_URL` | es. `https://www.idraulicapiovani.com` | URL canonico; senza, usa l'URL fornito da Vercel o Netlify |

## Prima del lancio reale

Checklist completa in [docs/da-confermare.md](docs/da-confermare.md). In sintesi:
- listino prezzi reale;
- dati societari confermati;
- testi legali validati;
- backend attivo ([docs/piano-backend.md](docs/piano-backend.md));
- `NEXT_PUBLIC_SITE_MODE=live`.

`npm run build:strict` verifica tutto questo.

## Struttura

```
app/(site)/          pagine del sito
components/site/     layout, sezioni, logo, banner cookie
components/quote/    preventivo online
components/booking/  calendario prenotazioni
components/forms/    campi dei moduli (touch, 48px)
components/base/     componenti BoardUI
content/             dati aziendali, servizi, FAQ, listino (segnaposto), zone
lib/quote, lib/booking   motori puri, testati
lib/data/            interfacce dati e backend simulato
styles/brand.css     token del brand (rame, calce, inchiostro)
docs/                verifica contenuti, cose da confermare, piano backend
```

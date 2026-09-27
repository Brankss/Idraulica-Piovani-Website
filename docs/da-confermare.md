# Da confermare con il titolare prima del lancio

Il build di lancio (`npm run build:strict`) resta bloccato finché i punti con 🔒 non sono risolti.

## Dati e contenuti

- 🔒 **Forma giuridica esatta** (ditta individuale o società), **REA** ed eventuale **PEC**. Da aggiornare in `content/company.ts` (`legalName`, `rea`, `pec`), poi impostare `legalNameConfirmed: true`.
- **Indirizzo di Caino:** è la sede legale, operativa o un magazzino? Serve per l'etichetta in `content/company.ts`.
- **Servizi da aggiungere**, solo se confermati: climatizzazione, pompe di calore, disostruzione scarichi, dichiarazioni di conformità (abilitazione DM 37/08), controlli di efficienza (CURIT), marchi con cui si lavora. Oggi sono esclusi di proposito: vedi `docs/verifica-contenuti.md`.
- **Pronto intervento fuori orario:** c'è una reperibilità serale o nel weekend? Il sito oggi dice solo «negli orari di apertura».
- **Storia dell'impresa dal 1930:** generazioni, fondatore, foto storiche, per una pagina «Chi siamo» più ricca.
- **Foto reali:** team, furgone, cantieri, impianti SANATHERM installati. Sostituiranno le immagini illustrative.
- **Casa bio in legno:** in che ruolo l'impresa ha lavorato al progetto? Oggi è presentata solo come «dal nostro archivio».

## Preventivo online

- 🔒 **Listino reale:** sostituire le cifre in `content/pricebook.ts`, poi impostare `placeholder: false`. Da decidere anche se mostrare i prezzi IVA inclusa o esclusa.
- **Zone e trasferte:** quali comuni si servono e con quale costo di trasferta (`content/zones.ts`). Il dato non è mostrato, serve solo al calcolo.

## Prenotazioni

- Quali servizi si possono prenotare online (oggi: sopralluogo, manutenzione impianto termico, riparazione non urgente).
- **Conferma immediata o su richiesta,** per ciascun servizio (`lib/booking/config.ts`, `confirmationMode`). Oggi è impostato «su richiesta».
- Durata di ogni tipo di appuntamento, preavviso minimo, chiusure (ferie).
- Il sopralluogo è gratuito o a pagamento? Politica di disdetta.

## Legale

- 🔒 **Validazione dei testi** (privacy, cookie, termini, note legali) da parte di un legale o consulente privacy, poi `draft: false` in `content/legal.ts`.
- Nomina dei fornitori come responsabili del trattamento (hosting, email, database) quando si attiva il backend.

## Tecnico

- 🔒 Backend attivo (`lib/data/index.ts` non più sul mock).
- 🔒 `NEXT_PUBLIC_SITE_MODE=live` sull'ambiente di produzione.
- Dominio: accesso a DNS e contratto per idraulicapiovani.com (oggi su Italiaonline) e per idraulicapiovani.it.
- Accesso al profilo Google Business per allineare dati, orari e link.

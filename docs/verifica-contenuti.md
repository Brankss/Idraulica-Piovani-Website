# Verifica dei contenuti

Regola: il sito pubblica **solo** servizi e dati che Idraulica Piovani dichiara già. Lo scopo è evitare che i clienti chiedano lavori che l'impresa non fa.

Fonti usate (settembre 2026):

- **[S]** il sito attuale del cliente, idraulicapiovani.com: home, `/bioedilizia`, `/contatti`, e i dati strutturati della home;
- **[PB]** la scheda PagineBianche dell'impresa (solo per WhatsApp);
- **[EC]** la scheda tecnica SANATHERM su expoclima.net, che riporta i contatti di Idraulica Piovani (solo per i dati tecnici).

## Dati aziendali

| Dato sul nuovo sito | Fonte | Note |
|---|---|---|
| Idraulica Piovani, "Impianti idraulici e riparazioni" | S | forma giuridica esatta da confermare |
| Dal 1930 | S | |
| Via Fermi 42, 25133 Brescia | S | |
| Via Villa Mattina 44G5, Caino (BS) | S | il ruolo dell'indirizzo non è indicato: mostrato senza etichetta |
| 347 735 7987 · 030 683 0780 | S | |
| WhatsApp sul 347 735 7987 | PB | |
| info@idraulicapiovani.it | S | |
| P.IVA 01780070171 | S | |
| Lun–Ven 8–12 / 13–19, sabato e domenica chiuso | S | |
| Contanti, bonifici bancari, assegni | S | |
| Brescia e provincia | S | |
| Coordinate (45.57107, 10.24645) | S | dai dati strutturati del sito attuale |

## Servizi (ognuno riporta la fonte anche in `content/services.ts`, campo `verified`)

| Servizio sul nuovo sito | Frase del cliente [S] |
|---|---|
| Pronto intervento idraulico | «pronto intervento idraulico» |
| Riparazioni e manutenzione | «riparazione degli impianti idraulici», «riparazione di boiler a gas», «manutenzione degli impianti idraulici» |
| Caldaie e termosifoni | «nuove caldaie a condensazione», «installazione delle caldaie», «Sostituzione termosifoni e caldaie», «trasformazione degli impianti di riscaldamento», «manutenzione degli impianti termici» |
| Riscaldamento radiante (pavimento, parete, battiscopa) | «Riscaldamento a pavimento / a parete / a battiscopa», «sistemi di riscaldamento bio (a parete e a battiscopa)» |
| SANATHERM | «Produciamo direttamente il sistema a battiscopa radiante SANATHERM» |
| Ristrutturazione bagni | «ristrutturazione di bagni» |
| Impianti solari | «progettazione e installazione di impianti solari», «recupero energetico» |
| Acque meteoriche e fitodepurazione | «piani di fitodepurazione, recupero e uso delle acque meteoriche» |
| Stufe in terra cruda e termocamini | «stufe a legna in terra cruda ad alto potere termico e sistemi termocamino» |
| Bioedilizia e risparmio energetico | intera pagina `/bioedilizia` del cliente |
| Valori: servizio completo, esperienza e innovazione, puntualità e precisione | home del cliente |

## Dati tecnici SANATHERM [EC]

2 tubi in rame Ø 22 mm; alette in alluminio; ingombro di circa 15 × 3 cm; acqua a 35–40 °C; resa di 754–967 W/m; 0,65 l/m; circuito fino a 6–7 m; posa a vista, semi-incassata o incassata; carter anche in legno; effetto che si riduce sopra i 2 m. Sul sito sono indicati come «valori indicativi».

## Rimosso durante la verifica

Questi elementi erano stati aggiunti per completezza ma **non** sono dichiarati dal cliente, quindi sono stati tolti:

- disostruzione di scarichi, autoclavi, riduttori di pressione, ricerca perdite "sotto traccia", rubinetteria come servizio a sé;
- smaltimento della vecchia caldaia, adeguamento della canna fumaria, dichiarazione di conformità, controllo fumi ed efficienza;
- pompe di calore (in qualunque forma);
- integrazione del solare al riscaldamento, manutenzione del circuito solare, reti duali per WC e irrigazione;
- trasformazione della vasca in doccia, termoarredo, miscelatori termostatici;
- elenco di 40 comuni serviti e tempi di viaggio (pagina «Zone servite»);
- «impresa guidata da Geom. Massimo Piovani» e ragione sociale "di Piovani Geom. Massimo" (fonti: solo elenchi di terzi);
- marchi Beretta, Baxi e Bosch (fonte: solo un elenco di terzi);
- promesse su prezzi, tempi e prassi («te lo diciamo prima di partire», «preventivo con voci una per una», ecc.);
- pagina «Lavori», che si sarebbe riempita solo con foto non ancora disponibili.

## Cosa resta dimostrativo (e lo dice)

- **Prezzi del preventivo online:** listino di esempio (`content/pricebook.ts`, `placeholder: true`); il risultato mostra un avviso.
- **Disponibilità del calendario:** simulate; la pagina `/prenota` lo dichiara.
- **Invio dei moduli:** in modalità demo non parte nulla; ogni modulo lo dice.
- **Raggruppamento dei comuni in zone:** dato interno al solo calcolo della trasferta e degli orari; non è mai mostrato ai visitatori.
- **Immagini illustrative (AI):** etichettate sull'immagine stessa. Le foto d'archivio sono quelle del sito del cliente.

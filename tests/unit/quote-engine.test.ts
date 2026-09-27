import { describe, expect, it } from "vitest";
import { pricebook } from "@/content/pricebook";
import { estimateQuote, roundPrice } from "@/lib/quote/engine";
import type { QuoteEstimate } from "@/lib/quote/types";

const asEstimate = (r: ReturnType<typeof estimateQuote>) => {
  expect(r.kind).toBe("estimate");
  return r as QuoteEstimate;
};

describe("estimateQuote", () => {
  it("prices a combined boiler replacement in Brescia without travel", () => {
    const r = asEstimate(
      estimateQuote(
        { category: "caldaia", zone: "brescia", uso: "combinata", abitazione: "appartamento", fumi: "no", impiantoAttuale: "caldaia" },
        pricebook,
      ),
    );
    expect(r.min).toBe(2200);
    expect(r.max).toBe(3200);
    expect(r.lines).toHaveLength(1);
    expect(r.placeholder).toBe(true);
  });

  it("widens the range when the flue is unknown and adds travel for far zones", () => {
    const r = asEstimate(
      estimateQuote(
        { category: "caldaia", zone: "valsabbia", uso: "combinata", abitazione: "casa-indipendente", fumi: "non-so", impiantoAttuale: "caldaia" },
        pricebook,
      ),
    );
    // 2200×1.1=2420 → 2400; 3200×1.1=3520 → 3500; flue 0–900; travel 40–70
    expect(r.min).toBe(2400 + 0 + 40);
    expect(r.max).toBe(3500 + 900 + 70);
    expect(r.lines.map((l) => l.label)).toContain("Trasferta");
    expect(r.assumptions.join(" ")).toMatch(/scarico fumi/);
  });

  it("asks for an inspection when there is no existing system", () => {
    const r = estimateQuote(
      { category: "caldaia", zone: "brescia", uso: "combinata", abitazione: "appartamento", fumi: "no", impiantoAttuale: "nessuno" },
      pricebook,
    );
    expect(r.kind).toBe("inspection");
  });

  it("always sends custom work (rainwater, stoves) to an inspection", () => {
    expect(estimateQuote({ category: "acque", zone: "brescia" }, pricebook).kind).toBe("inspection");
    expect(estimateQuote({ category: "stufe", zone: "ovest" }, pricebook).kind).toBe("inspection");
  });

  it("scales a full bathroom with the extra square metres", () => {
    const r = asEstimate(
      estimateQuote({ category: "bagno", zone: "brescia", intervento: "completa", mq: 8, sospesi: true }, pricebook),
    );
    // base 3500–5500 + 3 extra m² × 150–250 = 3950–6250; sospesi 250–600
    expect(r.min).toBe(3950 + 250);
    expect(r.max).toBe(6250 + 600);
  });

  it("applies the radiant minimum on small surfaces", () => {
    const r = asEstimate(
      estimateQuote({ category: "radiante", zone: "brescia", sistema: "battiscopa", mq: 20, contesto: "ristrutturazione" }, pricebook),
    );
    expect(r.min).toBe(2500);
  });

  it("applies the renovation factor only to underfloor heating", () => {
    const floor = asEstimate(
      estimateQuote({ category: "radiante", zone: "brescia", sistema: "pavimento", mq: 100, contesto: "ristrutturazione" }, pricebook),
    );
    expect(floor.min).toBe(roundPrice(100 * 45 * 1.15));
    const wall = asEstimate(
      estimateQuote({ category: "radiante", zone: "brescia", sistema: "parete", mq: 100, contesto: "ristrutturazione" }, pricebook),
    );
    expect(wall.min).toBe(6000);
  });

  it("picks the solar tier by household size", () => {
    const small = asEstimate(estimateQuote({ category: "solare", zone: "brescia", persone: 2, uso: "acqua-calda" }, pricebook));
    const large = asEstimate(estimateQuote({ category: "solare", zone: "brescia", persone: 6, uso: "acqua-calda" }, pricebook));
    expect(small.min).toBe(3200);
    expect(large.min).toBe(5200);
    expect(
      estimateQuote({ category: "solare", zone: "brescia", persone: 4, uso: "integrazione-riscaldamento" }, pricebook).kind,
    ).toBe("inspection");
  });

  it("adds call-out plus repair and unknown-zone travel", () => {
    const r = asEstimate(estimateQuote({ category: "riparazione", zone: "unknown", tipo: "rubinetteria" }, pricebook));
    expect(r.min).toBe(70 + 80 + 0);
    expect(r.max).toBe(120 + 250 + 80);
  });
});

describe("roundPrice", () => {
  it("rounds to €10 under 1.000 and €50 above", () => {
    expect(roundPrice(134)).toBe(130);
    expect(roundPrice(2420)).toBe(2400);
    expect(roundPrice(3520)).toBe(3500);
    expect(roundPrice(5175)).toBe(5200);
  });
});

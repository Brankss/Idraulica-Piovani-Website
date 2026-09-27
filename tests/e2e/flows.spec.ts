import { expect, test, type Page } from "@playwright/test";

async function acceptNothing(page: Page) {
  await page.addInitScript(() => {
    localStorage.setItem("piovani-consent", JSON.stringify({ version: "2026-09", decidedAt: new Date().toISOString(), media: false }));
  });
}

test.describe("percorsi principali", () => {
  test("preventivo: dalla home alla stima", async ({ page }) => {
    await acceptNothing(page);
    await page.goto("/");
    await page.getByRole("link", { name: /Rifare il bagno/ }).click();
    await expect(page).toHaveURL(/categoria=bagno/);
    await page.getByText("Rifare la parte idraulica del bagno").click();
    await page.getByRole("button", { name: "Avanti" }).click();
    await expect(page.getByRole("heading", { name: "Dove si trova la casa?" })).toBeVisible();
    await page.getByRole("button", { name: "Brescia", exact: true }).click();
    await page.getByRole("button", { name: "Vedi la stima" }).click();
    await expect(page.getByRole("heading", { name: "La tua stima" })).toBeVisible();
    await expect(page.getByText(/\d\.\d{3} – \d\.\d{3} €/).first()).toBeVisible();
    await expect(page.getByText(/listino di esempio/)).toBeVisible();
  });

  test("preventivo: gli errori compaiono vicino al campo", async ({ page }) => {
    await acceptNothing(page);
    await page.goto("/preventivo?categoria=caldaia&passo=2");
    await page.getByRole("button", { name: "Avanti" }).click();
    await expect(page.getByText("Scegli una risposta per continuare.").first()).toBeVisible();
  });

  test("prenotazione: dal servizio alla richiesta inviata", async ({ page }) => {
    await acceptNothing(page);
    await page.goto("/prenota?servizio=sopralluogo&comune=Nave");
    await page.getByRole("button", { name: "Avanti" }).click();
    await page.getByLabel("Via e numero civico").fill("Via Roma 1");
    await page.getByRole("button", { name: "Avanti" }).click();
    await expect(page.getByRole("heading", { name: "Scegli giorno e ora" })).toBeVisible();
    const first = page.locator('section[aria-labelledby="consigliati-title"] button').first();
    await first.click();
    await expect(first).toHaveAttribute("aria-pressed", "true");
    await page.getByRole("button", { name: "Avanti" }).click();
    await page.getByLabel("Nome e cognome").fill("Mario Rossi");
    await page.getByLabel("Telefono").fill("347 000 0000");
    await page.getByLabel("Email").fill("mario@esempio.it");
    await page.getByText("informativa privacy", { exact: false }).first().locator("xpath=ancestor::label").click();
    await page.getByRole("button", { name: "Riepilogo" }).click();
    await expect(page.getByRole("heading", { name: "Controlla e conferma" })).toBeVisible();
    await page.getByRole("button", { name: "Invia la richiesta" }).click();
    await expect(page.getByRole("heading", { name: "Richiesta inviata" })).toBeVisible();
    await expect(page.getByText(/Versione dimostrativa/)).toBeVisible();
  });

  test("contatti: il modulo segnala i campi mancanti", async ({ page }) => {
    await acceptNothing(page);
    await page.goto("/contatti");
    await page.getByRole("button", { name: "Invia messaggio" }).click();
    await expect(page.getByText("Scrivi nome e cognome.", { exact: true })).toBeVisible();
    await expect(page.getByText(/Controlla \d campi/)).toBeVisible();
  });
});

test.describe("cookie e privacy", () => {
  test("nessuna richiesta a terze parti prima del consenso; la X equivale a rifiutare", async ({ page }) => {
    const external: string[] = [];
    page.on("request", (r) => {
      const url = new URL(r.url());
      if (url.hostname !== "localhost") external.push(url.hostname);
    });
    await page.goto("/contatti");
    await page.waitForLoadState("networkidle");
    expect(external).toEqual([]);

    const banner = page.getByRole("region", { name: "Consenso ai cookie" });
    await expect(banner).toBeVisible();
    await banner.getByRole("button", { name: /Chiudi e rifiuta/ }).click();
    await expect(banner).toBeHidden();
    const saved = await page.evaluate(() => JSON.parse(localStorage.getItem("piovani-consent") ?? "{}"));
    expect(saved.media).toBe(false);

    await page.reload();
    await expect(page.getByRole("region", { name: "Consenso ai cookie" })).toBeHidden();
    expect(external).toEqual([]);
  });

  test("le preferenze si riaprono dal footer", async ({ page }) => {
    await acceptNothing(page);
    await page.goto("/");
    await page.getByRole("button", { name: "Preferenze cookie" }).click();
    await expect(page.getByRole("dialog", { name: "Preferenze cookie" })).toBeVisible();
  });

  test("il sito demo non è indicizzabile", async ({ page, request }) => {
    await page.goto("/");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    const robots = await (await request.get("/robots.txt")).text();
    expect(robots).toMatch(/Disallow: \//);
  });
});

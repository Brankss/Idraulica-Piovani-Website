import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/servizi",
  "/servizi/pronto-intervento-idraulico",
  "/servizi/caldaie-a-condensazione",
  "/servizi/riscaldamento-radiante",
  "/sanatherm",
  "/bioedilizia",
  "/chi-siamo",
  "/faq",
  "/contatti",
  "/preventivo",
  "/prenota",
  "/privacy",
  "/cookie-policy",
  "/termini",
  "/note-legali",
  "/accessibilita",
  "/pagina-che-non-esiste",
];

test.describe("accessibilità (axe, WCAG 2.2 AA)", () => {
  test.beforeEach(async ({ page }) => {
    // Consent already given, so the banner does not cover the content under test.
    await page.addInitScript(() => {
      localStorage.setItem("piovani-consent", JSON.stringify({ version: "2026-09", decidedAt: new Date().toISOString(), media: false }));
    });
  });

  for (const route of routes) {
    test(`nessuna violazione grave su ${route}`, async ({ page }) => {
      await page.goto(route);
      await page.waitForLoadState("networkidle");
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
      const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
      expect(serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).slice(0, 3).join(" | ")}`)).toEqual([]);
    });
  }

  test("il banner cookie è accessibile", async ({ page, context }) => {
    await context.clearCookies();
    await page.addInitScript(() => localStorage.removeItem("piovani-consent"));
    await page.goto("/");
    await expect(page.getByRole("region", { name: "Consenso ai cookie" })).toBeVisible();
    const results = await new AxeBuilder({ page }).include('[aria-label="Consenso ai cookie"]').analyze();
    expect(results.violations.filter((v) => v.impact === "serious" || v.impact === "critical")).toEqual([]);
  });
});

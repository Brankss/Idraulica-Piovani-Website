#!/usr/bin/env node
/**
 * Launch gate: refuses a production build while placeholder content is still
 * in place. Run by `npm run build:strict` (the build used for the real site).
 */
import { readFileSync } from "node:fs";

const checks = [
  { file: "content/pricebook.ts", pattern: /placeholder:\s*true/, message: "Listino preventivi ancora segnaposto (content/pricebook.ts)." },
  { file: "content/legal.ts", pattern: /draft:\s*true/, message: "Testi legali ancora in bozza (content/legal.ts)." },
  { file: "content/company.ts", pattern: /legalNameConfirmed:\s*false/, message: "Ragione sociale da confermare (content/company.ts)." },
  { file: "lib/data/index.ts", pattern: /=\s*mockDataLayer/, message: "I form usano ancora il backend dimostrativo (lib/data/index.ts)." },
];

const failures = checks.filter((c) => c.pattern.test(readFileSync(c.file, "utf8")));

if (failures.length) {
  console.error("\n✖ Contenuti non pronti per il lancio:\n");
  for (const f of failures) console.error(`  - ${f.message}`);
  console.error("\nVedi docs/content-todo.md. Per un build di anteprima usa `npm run build`.\n");
  process.exit(1);
}
console.log("✓ Contenuti pronti per il lancio.");

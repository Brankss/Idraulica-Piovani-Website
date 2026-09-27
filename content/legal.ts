/**
 * Legal texts metadata. The texts are structured drafts written for the
 * client's lawyer/privacy consultant to validate before launch.
 * `draft: true` shows a visible notice on every legal page and makes
 * `npm run build:strict` fail (see scripts/check-launch-content.mjs).
 */
export const legal = {
  version: "2026-09",
  updated: "2026-09-27",
  draft: true,
};

export const updatedLabel = new Intl.DateTimeFormat("it-IT", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
  new Date(`${legal.updated}T00:00:00Z`),
);

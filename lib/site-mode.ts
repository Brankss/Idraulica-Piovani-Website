/**
 * Site mode.
 *  - "demo" (default): preview for the client on a free host. Not indexed by
 *    search engines, forms run on the in-browser mock backend, and the
 *    quote/booking/contact pages say so.
 *  - "live": the real site. Set NEXT_PUBLIC_SITE_MODE=live only once the
 *    backend, real prices and validated legal texts are in place
 *    (`npm run build:strict` enforces it).
 */
export const siteMode: "demo" | "live" = process.env.NEXT_PUBLIC_SITE_MODE === "live" ? "live" : "demo";
export const isDemo = siteMode === "demo";

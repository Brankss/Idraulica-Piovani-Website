import type { MetadataRoute } from "next";
import { company } from "@/content/company";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${company.brand} · Idraulico a Brescia`,
    short_name: "Piovani",
    description: "Impianti idraulici, riscaldamento e bioedilizia a Brescia dal 1930.",
    start_url: "/",
    display: "standalone",
    background_color: "#f1f2ee",
    theme_color: "#0f2330",
    lang: "it",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}

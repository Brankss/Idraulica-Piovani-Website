import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { company } from "@/content/company";

export const alt = `${company.brand} · Idraulico a Brescia dal ${company.foundedYear}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const display = readFile(join(process.cwd(), "assets/fonts/archivo-expanded-800-latin.woff"));
const mono = readFile(join(process.cwd(), "assets/fonts/plex-mono-500-latin.woff"));

/** Brand card for social shares: ink ground, copper pipe mark, wide wordmark. */
export default async function OpengraphImage() {
  const [displayData, monoData] = await Promise.all([display, mono]);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0f2330",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          padding: "72px 80px",
          color: "#f8f9f6",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <svg width="112" height="112" viewBox="0 0 64 64">
            <path d="M16 58V10h18a14 14 0 0 1 0 28H16" fill="none" stroke="#B8612B" strokeWidth="10" strokeLinejoin="round" />
            <rect x="9" y="46" width="14" height="4" rx="1" fill="#8E4520" />
            <rect x="24" y="3" width="4" height="14" rx="1" fill="#8E4520" />
            <rect x="24" y="31" width="4" height="14" rx="1" fill="#8E4520" />
            <path d="M32 18s-4.5 5.2-4.5 8.5a4.5 4.5 0 0 0 9 0C36.5 23.2 32 18 32 18Z" fill="#f8f9f6" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontFamily: "Archivo", fontSize: 72, letterSpacing: 2, lineHeight: 1 }}>PIOVANI</span>
            <span style={{ fontFamily: "Plex Mono", fontSize: 22, letterSpacing: 6, color: "#dfa57c", marginTop: 10 }}>IDRAULICA · DAL 1930</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontFamily: "Archivo", fontSize: 64, lineHeight: 1.05, maxWidth: 980 }}>Acqua e calore, fatti a regola d&apos;arte.</span>
          <span style={{ fontFamily: "Plex Mono", fontSize: 24, color: "#a9b6bc", marginTop: 28 }}>
            Brescia e provincia · Preventivo online · SANATHERM
          </span>
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 14, background: "#B8612B", display: "flex" }} />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Archivo", data: displayData, style: "normal", weight: 800 },
        { name: "Plex Mono", data: monoData, style: "normal", weight: 500 },
      ],
    },
  );
}

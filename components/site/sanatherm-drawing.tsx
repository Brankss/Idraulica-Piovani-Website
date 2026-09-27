import { cx } from "@/utils/cx";

export const sanathermLegend = [
  { n: 1, title: "Due tubi in rame Ø 22 mm", text: "Mandata e ritorno: il battiscopa è insieme radiatore e tubazione." },
  { n: 2, title: "Alette in alluminio", text: "Aumentano la superficie che cede calore alla parete e alla stanza." },
  { n: 3, title: "Carter di protezione", text: "Copertura sottile, anche in legno, lungo il perimetro della stanza." },
  { n: 4, title: "Calore radiante", text: "Acqua a bassa temperatura, 35–40 °C: ideale con condensazione e solare." },
];

/**
 * Technical cross-section of the SANATHERM skirting heater, drawn in code so
 * it is exact, weightless and never an AI approximation of the real product.
 * Labels are numbered callouts (legend in HTML) to stay legible on phones.
 */
export function SanathermDrawing({ tone = "inverse", className }: { tone?: "inverse" | "default"; className?: string }) {
  const line = tone === "inverse" ? "var(--color-ink-300)" : "var(--color-ink-500)";
  const text = tone === "inverse" ? "var(--color-calce-50)" : "var(--color-ink-900)";
  const faint = tone === "inverse" ? "var(--color-ink-600)" : "var(--color-ink-200)";
  return (
    <svg
      viewBox="0 0 360 320"
      className={cx("h-auto w-full", className)}
      role="img"
      aria-labelledby="sanatherm-title sanatherm-desc"
    >
      <title id="sanatherm-title">Sezione del battiscopa radiante SANATHERM</title>
      <desc id="sanatherm-desc">
        Il battiscopa è fissato alla parete a filo pavimento: due tubi in rame con alette in alluminio, coperti da un carter alto circa 15
        centimetri e profondo circa 3, emettono calore radiante nella stanza.
      </desc>

      <defs>
        <pattern id="hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="8" stroke={faint} strokeWidth="2" />
        </pattern>
        <clipPath id="above-floor">
          <rect x="100" y="0" width="260" height="279" />
        </clipPath>
      </defs>

      {/* Wall and floor, in section */}
      <rect x="36" y="20" width="24" height="262" fill="url(#hatch)" />
      <rect x="120" y="282" width="224" height="20" fill="url(#hatch)" />
      <path d="M60 20V280H344" fill="none" stroke={line} strokeWidth="1.5" />
      <text x="40" y="14" fill={line} fontFamily="var(--font-mono)" fontSize="11" letterSpacing="1">
        PARETE
      </text>
      <text x="344" y="274" fill={line} fontFamily="var(--font-mono)" fontSize="11" letterSpacing="1" textAnchor="end">
        PAVIMENTO
      </text>

      {/* Radiant heat */}
      <g clipPath="url(#above-floor)">
      {[48, 88, 128].map((r, i) => (
        <path
          key={r}
          d={`M${126 + r * 0.26} ${190 - r * 0.97} A ${r} ${r} 0 0 1 ${126 + r * 0.26} ${190 + r * 0.97}`}
          fill="none"
          stroke="var(--color-pipe)"
          strokeWidth="2"
          strokeDasharray="2 7"
          strokeLinecap="round"
          opacity={0.9 - i * 0.25}
        />
      ))}
      </g>

      {/* Casing */}
      <path d="M60 100H100V280" fill="none" stroke={text} strokeWidth="2" />
      {/* Aluminium fin */}
      <rect x="66" y="116" width="14" height="152" rx="2" fill={line} opacity="0.55" />
      {/* Copper tubes with water */}
      {[150, 234].map((cy) => (
        <g key={cy}>
          <circle cx="84" cy={cy} r="11" fill="var(--color-pipe)" />
          <circle cx="84" cy={cy} r="7" fill="var(--color-illustration-water)" />
        </g>
      ))}

      {/* Dimensions */}
      <g stroke={line} strokeWidth="1">
        <line x1="112" y1="100" x2="112" y2="280" />
        <line x1="107" y1="105" x2="117" y2="95" />
        <line x1="107" y1="285" x2="117" y2="275" />
        <line x1="60" y1="296" x2="100" y2="296" />
        <line x1="55" y1="301" x2="65" y2="291" />
        <line x1="95" y1="301" x2="105" y2="291" />
      </g>
      <text x="124" y="194" fill={text} fontFamily="var(--font-mono)" fontSize="13" transform="rotate(-90 124 194)" textAnchor="middle">
        ≈ 15 cm
      </text>
      <text x="80" y="315" fill={text} fontFamily="var(--font-mono)" fontSize="13" textAnchor="middle">
        ≈ 3 cm
      </text>

      {/* Callouts */}
      <g stroke={line} strokeWidth="1" strokeDasharray="3 3">
        <line x1="160" y1="50" x2="92" y2="144" />
        <line x1="204" y1="50" x2="78" y2="118" />
        <line x1="248" y1="50" x2="100" y2="102" />
        <line x1="306" y1="50" x2="238" y2="150" />
      </g>
      {[
        [160, 1],
        [204, 2],
        [248, 3],
        [306, 4],
      ].map(([x, n]) => (
        <g key={n}>
          <circle cx={x} cy="38" r="13" fill="var(--color-pipe)" />
          <text x={x} y="43" fill="var(--color-calce-50)" fontFamily="var(--font-mono)" fontSize="13" fontWeight="600" textAnchor="middle">
            {n}
          </text>
        </g>
      ))}
    </svg>
  );
}

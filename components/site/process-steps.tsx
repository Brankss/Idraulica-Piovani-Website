import { cx } from "@/utils/cx";

export const processSteps = [
  {
    title: "Ci racconti cosa serve",
    text: "Al telefono, su WhatsApp o con il preventivo online.",
  },
  {
    title: "Sopralluogo",
    text: "Veniamo a vedere l'impianto e ti consigliamo la soluzione adatta alla tua casa.",
  },
  {
    title: "Preventivo",
    text: "Ti prepariamo il preventivo per il lavoro da fare.",
  },
  {
    title: "Installazione e manutenzione",
    text: "Realizziamo l'impianto e ce ne occupiamo anche nella manutenzione.",
  },
];

/**
 * The signature copper pipe: it runs through the process and "fills" as the
 * section scrolls into view (CSS scroll-driven; static with reduced motion or
 * in browsers without support). Vertical on phones, horizontal on desktop.
 */
export function ProcessSteps({ tone = "default" }: { tone?: "default" | "inverse" }) {
  const muted = tone === "inverse" ? "text-text-inverse-secondary" : "text-text-secondary";
  return (
    <ol className="relative mt-10 grid gap-8 md:mt-14 md:grid-cols-4 md:gap-6">
      {/* Pipe — vertical (mobile) */}
      <div className="pointer-events-none absolute bottom-8 left-[21px] top-6 w-2.5 md:hidden" aria-hidden="true">
      <svg className="block h-full w-full" viewBox="0 0 10 100" preserveAspectRatio="none">
        <line x1="5" y1="0" x2="5" y2="100" stroke="var(--color-separator-border-strong)" strokeWidth="8" />
        <line
          x1="5"
          y1="0"
          x2="5"
          y2="100"
          pathLength={1}
          className="pipe-draw"
          stroke="var(--color-pipe)"
          strokeWidth="8"
        />
      </svg>
      </div>
      {/* Pipe — horizontal (desktop) */}
      <div className="pointer-events-none absolute left-6 right-6 top-[21px] hidden h-2.5 md:block" aria-hidden="true">
      <svg className="block h-full w-full" viewBox="0 0 100 10" preserveAspectRatio="none">
        <line x1="0" y1="5" x2="100" y2="5" stroke="var(--color-separator-border-strong)" strokeWidth="8" />
        <line
          x1="0"
          y1="5"
          x2="100"
          y2="5"
          pathLength={1}
          className="pipe-draw"
          stroke="var(--color-pipe)"
          strokeWidth="8"
        />
      </svg>
      </div>

      {processSteps.map((step, i) => (
        <li key={step.title} className="relative grid grid-cols-[3.25rem_1fr] gap-4 md:block">
          <span
            className={cx(
              "relative z-10 flex size-[3.25rem] items-center justify-center rounded-full border-[3px] border-pipe font-mono text-copy-strong tabular-nums",
              tone === "inverse" ? "bg-background-inverse text-text-inverse" : "bg-background-full text-text-primary",
            )}
            aria-hidden="true"
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="pt-2 md:mt-5 md:pt-0">
            <h3 className="font-display text-h3">
              <span className="sr-only">Passo {i + 1}: </span>
              {step.title}
            </h3>
            <p className={cx("mt-2 text-copy", muted)}>{step.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

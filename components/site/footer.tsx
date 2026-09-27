import { RiMailLine, RiMapPin2Line, RiPhoneLine, RiTimeLine } from "@remixicon/react";
import Link from "next/link";
import { company, formatAddress, telHref } from "@/content/company";
import { footerNav, legalNav } from "@/content/nav";
import { ConsentPreferencesLink } from "./consent-banner";
import { Logo } from "./logo";
import { Container } from "./ui";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-background-inverse text-text-inverse">
      <Container className="py-14 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_2fr]">
          <div className="space-y-6">
            <Logo tone="inverse" size="md" />
            <p className="max-w-sm text-copy text-text-inverse-secondary">
              Impianti idraulici, riscaldamento e bioedilizia a Brescia e provincia, dal {company.foundedYear}.
            </p>
            <ul className="space-y-3 text-small">
              {company.phones.map((p) => (
                <li key={p.e164}>
                  <a
                    href={telHref(p)}
                    className="inline-flex min-h-11 items-center gap-3 rounded-md outline-none hover:text-text-accent-inverse focus-visible:ring-2 focus-visible:ring-border-focus-ring"
                  >
                    <RiPhoneLine className="size-5 text-text-accent-inverse" aria-hidden="true" />
                    <span>
                      <span className="block text-text-inverse-secondary">{p.label}</span>
                      <span className="text-copy-strong tabular-nums">{p.display}</span>
                    </span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${company.email}`}
                  className="inline-flex min-h-11 items-center gap-3 rounded-md outline-none hover:text-text-accent-inverse focus-visible:ring-2 focus-visible:ring-border-focus-ring"
                >
                  <RiMailLine className="size-5 text-text-accent-inverse" aria-hidden="true" />
                  {company.email}
                </a>
              </li>
              <li className="flex gap-3">
                <RiTimeLine className="mt-0.5 size-5 shrink-0 text-text-accent-inverse" aria-hidden="true" />
                <span>
                  {company.hoursLabel}
                  <span className="block text-text-inverse-secondary">Sabato e domenica chiuso</span>
                </span>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
            {footerNav.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h2 className="eyebrow text-eyebrow text-text-accent-inverse">{col.title}</h2>
                <ul className="mt-4 space-y-1">
                  {col.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="inline-flex min-h-11 items-center rounded-md text-copy text-text-inverse outline-none hover:text-text-accent-inverse hover:underline focus-visible:ring-2 focus-visible:ring-border-focus-ring"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-4 border-t border-border-inverse pt-8 text-small text-text-inverse-secondary md:grid-cols-2">
          <address className="not-italic">
            {company.addresses.map((a) => (
              <p key={a.street} className="flex gap-2">
                <RiMapPin2Line className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                <span>
                  {a.label}: {formatAddress(a)}
                </span>
              </p>
            ))}
          </address>
          <p className="md:text-right">
            © {year} {company.legalName}
            <br />
            P.IVA {company.vatNumber}
            {company.rea && ` · REA ${company.rea}`}
            {company.pec && ` · PEC ${company.pec}`}
          </p>
        </div>

        <nav aria-label="Informazioni legali" className="mt-6">
          <ul className="flex flex-wrap gap-x-5 gap-y-1 text-small">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center rounded-md text-text-inverse-secondary underline-offset-4 outline-none hover:text-text-inverse hover:underline focus-visible:ring-2 focus-visible:ring-border-focus-ring"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <ConsentPreferencesLink />
            </li>
          </ul>
        </nav>
      </Container>
    </footer>
  );
}

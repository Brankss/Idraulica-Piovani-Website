import { ConsentBanner } from "@/components/site/consent-banner";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { JsonLd } from "@/components/site/json-ld";
import { MobileActionBar } from "@/components/site/mobile-action-bar";
import { businessJsonLd } from "@/lib/seo/jsonld";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#contenuto"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-background-inverse focus:px-4 focus:py-3 focus:text-text-inverse focus:outline-none focus:ring-2 focus:ring-border-focus-ring"
      >
        Vai al contenuto
      </a>
      <Header />
      <main id="contenuto" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />
      {/* Room for the fixed mobile action bar so the footer is never covered */}
      <div className="h-[calc(4.75rem+env(safe-area-inset-bottom))] bg-background-inverse md:hidden" aria-hidden="true" />
      <MobileActionBar />
      <ConsentBanner />
      <JsonLd data={businessJsonLd()} />
    </>
  );
}

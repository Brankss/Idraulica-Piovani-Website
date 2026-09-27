import { RiHome4Line } from "@remixicon/react";
import { Breadcrumb, BreadcrumbItem } from "@/components/base/breadcrumb/breadcrumb";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { JsonLd } from "./json-ld";

type Crumb = { name: string; path: string };

/** BoardUI breadcrumb + BreadcrumbList structured data from the same list. */
export function Crumbs({ items }: { items: Crumb[] }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <Breadcrumb aria-label="Percorso">
        {all.map((c, i) =>
          i === all.length - 1 ? (
            <BreadcrumbItem key={c.path} current>
              {c.name}
            </BreadcrumbItem>
          ) : (
            <BreadcrumbItem key={c.path} href={c.path} icon={i === 0 ? RiHome4Line : undefined} className="min-h-8">
              {i === 0 ? <span className="sr-only">Home</span> : c.name}
            </BreadcrumbItem>
          ),
        )}
      </Breadcrumb>
      <JsonLd data={breadcrumbJsonLd(all)} />
    </>
  );
}

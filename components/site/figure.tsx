import Image from "next/image";
import type { SiteImage } from "@/content/images";
import { cx } from "@/utils/cx";

/**
 * Photo with the honesty rules built in: AI images carry a visible
 * "Immagine illustrativa" label; archive photos say so.
 */
export function Figure({
  image,
  className,
  imgClassName,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  preload,
  aspect,
  caption,
}: {
  image: SiteImage;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  preload?: boolean;
  /** Force an aspect ratio (object-cover); defaults to the file's own */
  aspect?: string;
  caption?: string;
}) {
  const note = image.ai ? "Immagine illustrativa" : image.archive ? "Foto d'archivio" : undefined;
  const text = caption ?? image.caption;
  return (
    <figure className={cx("relative", className)}>
      <div className="relative overflow-hidden rounded-card bg-background-secondary-default" style={aspect ? { aspectRatio: aspect } : undefined}>
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
          preload={preload}
          className={cx("h-full w-full", aspect ? "object-cover" : "h-auto", imgClassName)}
        />
        {note && (
          <span className="absolute bottom-2 left-2 rounded-md bg-background-inverse/75 px-2 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-text-inverse">
            {note}
          </span>
        )}
      </div>
      {text && <figcaption className="mt-2 text-small text-text-tertiary">{text}</figcaption>}
    </figure>
  );
}

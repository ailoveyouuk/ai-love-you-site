import type { ReactNode } from "react";
import PlaceholderShot from "@/components/PlaceholderShot";

/**
 * Journal-style visual block: a large image (or placeholder), a small
 * uppercase caption directly beneath it (adapted from the AI Love You
 * Journal's .caption pattern), then a short paragraph of context.
 * Image-led, not text-led — keep body copy to 2–4 sentences.
 */
const VIDEO_EXTENSIONS = [".mov", ".mp4", ".webm"];

export default function VisualBlock({
  label,
  alt,
  caption,
  source,
  src,
  poster,
  children,
}: {
  label: string;
  alt: string;
  caption: string;
  source?: string;
  /** Real screenshot/GIF/video path (e.g. "/images/apki/product-hero.jpg"
   * or "/video/apki/homepage-to-product.mp4"). When omitted, falls back to
   * the dashed placeholder block. Video files autoplay muted/looped, no
   * controls needed for a passive case-study showcase. Plain <img>/<video>
   * are used (not next/image) so GIF motion and video playback both work
   * without extra config. */
  src?: string;
  /** Still frame shown before a video loads/plays (video src only). */
  poster?: string;
  children: ReactNode;
}) {
  const isVideo = src ? VIDEO_EXTENSIONS.some((ext) => src.toLowerCase().endsWith(ext)) : false;

  return (
    <div>
      {src ? (
        <div className="overflow-hidden border border-border bg-surface">
          {isVideo ? (
            <video
              src={src}
              poster={poster}
              autoPlay
              muted
              loop
              playsInline
              controls
              className="h-full w-full object-cover"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={src} alt={alt} className="h-full w-full object-cover" />
          )}
        </div>
      ) : (
        <PlaceholderShot label={label} alt={alt} />
      )}
      <span className="visual-caption">
        {caption}
        {source ? <span className="accent">{` // ${source}`}</span> : null}
      </span>
      <div className="mt-4 max-w-2xl space-y-3 text-sm text-muted [&_strong]:text-foreground">
        {children}
      </div>
    </div>
  );
}

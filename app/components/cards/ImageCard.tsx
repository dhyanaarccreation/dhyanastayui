"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";

// ============================================
// IMAGE CARD — shared base for every immersive,
// photo-first card in the app (property, destination,
// experience, curator/travel-guide, featured, category).
// Image fills the whole card, a bottom gradient keeps
// the overlaid title/subtitle readable, and an optional
// floating glass pill carries the call to action.
//
// Not meant for plain data/stat cards (dashboard tiles,
// reviews, blog excerpts) — those stay on the existing
// bg-surface/border/rounded-2xl treatment; only the
// photo-led "browse a place" cards adopt this look.
// ============================================

export type ImageCardSize = "sm" | "md" | "lg" | "fill";

const SIZE_CLASSES: Record<ImageCardSize, string> = {
  // Fixed-size — for horizontal scrollers/carousels
  sm: "w-[220px] h-[280px] sm:w-[260px] sm:h-[320px]",
  md: "w-[250px] h-[300px] sm:w-[280px] sm:h-[340px]",
  lg: "w-[280px] h-[340px] sm:w-[320px] sm:h-[380px]",
  // No built-in sizing at all — the caller specifies width/height entirely
  // via `className` (e.g. a grid cell with row-span + min-height).
  fill: "",
};

// Default (no `size`) — aspect-ratio driven so the card only needs a width
// from its parent (grid cell, flex item, wrapped carousel slide) rather than
// an explicit height. Horizontal/landscape, not the tall portrait look.
const DEFAULT_SIZE_CLASS = "w-full aspect-[4/3]";

export interface ImageCardProps {
  /** Destination URL — when set, the whole card is a Next Link. */
  href?: string;
  image?: string;
  alt: string;
  /** Replaces the default <img> entirely — for callers needing their own
   *  fallback (e.g. an initials avatar when no photo is on file). */
  imageNode?: React.ReactNode;
  /** When set, fades in and plays this looping muted clip over the image on
   *  hover/focus (e.g. the shared curated-experience reel on curator cards) —
   *  reuses one real asset rather than inventing a per-card video. */
  hoverVideoSrc?: string;
  /** Small pill top-left over the image (category, "Featured", "Trending"...). */
  badge?: string;
  /** Free-form overlay in the top-right corner (e.g. a curator avatar badge). */
  topRight?: React.ReactNode;
  title: string;
  /** Overrides the title's default font-size classes (kept separate from
   *  structural classes so callers can scale text without losing layout). */
  titleClassName?: string;
  subtitle?: string;
  subtitleClassName?: string;
  /** Extra row rendered above the title (e.g. rating · price, duration · price). */
  meta?: React.ReactNode;
  metaClassName?: string;
  actionLabel?: string;
  actionIcon?: LucideIcon;
  /** Extra classes for the action icon — e.g. a rotated Navigation glyph for "Directions". */
  actionIconClassName?: string;
  /** Secondary click handler for the action pill, when it must do something
   *  other than follow `href` (stopPropagation is handled internally). */
  onAction?: (e: React.MouseEvent) => void;
  /** Fixed-size variant for carousels/scrollers. Omit to fill the parent
   *  (grid contexts — pair with an aspect-ratio or h-full wrapper). */
  size?: ImageCardSize;
  /** "stack" (default) puts the action pill on its own line below the title —
   *  safest for longer property/experience names. "row" puts title and pill
   *  side by side, matching the reference exactly — best for short titles
   *  (destination names). */
  titleLayout?: "stack" | "row";
  className?: string;
  imgClassName?: string;
}

export default function ImageCard({
  href,
  image,
  imageNode,
  hoverVideoSrc,
  alt,
  badge,
  topRight,
  title,
  titleClassName,
  subtitle,
  subtitleClassName,
  meta,
  metaClassName,
  actionLabel,
  actionIcon: ActionIcon,
  actionIconClassName = "",
  onAction,
  size,
  titleLayout = "stack",
  className = "",
  imgClassName = "",
}: ImageCardProps) {
  const sizeClass = size ? SIZE_CLASSES[size] : DEFAULT_SIZE_CLASS;

  const [isPreviewing, setIsPreviewing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!hoverVideoSrc) return;
    const video = videoRef.current;
    if (!video) return;
    if (isPreviewing) {
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isPreviewing, hoverVideoSrc]);

  const hoverProps = hoverVideoSrc
    ? {
        onMouseEnter: () => setIsPreviewing(true),
        onMouseLeave: () => setIsPreviewing(false),
        onFocus: () => setIsPreviewing(true),
        onBlur: () => setIsPreviewing(false),
      }
    : {};

  const actionButton = actionLabel && (
    <button
      type="button"
      onClick={
        onAction
          ? (e: React.MouseEvent) => {
              e.preventDefault();
              e.stopPropagation();
              onAction(e);
            }
          : undefined
      }
      className={`shrink-0 flex items-center gap-1 rounded-full border border-white/10 bg-black/45 px-2.5 py-1.5 text-[10px] sm:text-xs font-semibold text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-black/65 active:scale-95 ${
        titleLayout === "stack" ? "mt-3 w-fit" : ""
      }`}
    >
      {ActionIcon && <ActionIcon size={10} strokeWidth={2.5} className={actionIconClassName} />}
      <span>{actionLabel}</span>
    </button>
  );

  const content = (
    <>
      {imageNode ?? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt={alt}
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${imgClassName}`}
        />
      )}

      {hoverVideoSrc && (
        <video
          ref={videoRef}
          src={hoverVideoSrc}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
            isPreviewing ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

      {badge && (
        <span className="absolute top-4 left-4 sm:top-5 sm:left-5 inline-flex items-center px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-semibold uppercase tracking-wider text-foreground">
          {badge}
        </span>
      )}

      {topRight && (
        <div className="absolute top-4 right-4 sm:top-5 sm:right-5">{topRight}</div>
      )}

      <div
        className={`absolute bottom-5 left-5 right-4 sm:bottom-7 sm:left-7 sm:right-5 ${
          titleLayout === "row" ? "flex items-end justify-between gap-3" : ""
        }`}
      >
        <div className="min-w-0">
          {meta && <div className={`mb-1 font-medium text-white/80 truncate ${metaClassName ?? "text-xs"}`}>{meta}</div>}
          <h3
            className={`font-bold leading-tight tracking-tight text-white ${
              titleClassName ??
              (titleLayout === "row"
                ? "text-sm sm:text-base truncate"
                : "text-lg sm:text-[22px] line-clamp-2")
            }`}
          >
            {title}
          </h3>
          {subtitle && (
            <p className={`mt-1 font-medium text-white/65 truncate ${subtitleClassName ?? "text-sm sm:text-[18px]"}`}>
              {subtitle}
            </p>
          )}
        </div>

        {actionButton}
      </div>
    </>
  );

  const shellClass = `group relative overflow-hidden rounded-card-lg border-[5px] border-white bg-surface-hover shadow-[0_12px_35px_rgba(0,0,0,0.12)] transition-all duration-300 hover:shadow-[0_16px_44px_rgba(0,0,0,0.16)] hover:-translate-y-1 ${sizeClass} ${className}`;

  if (href) {
    return (
      <Link href={href} className={shellClass} {...hoverProps}>
        {content}
      </Link>
    );
  }

  return (
    <div className={shellClass} {...hoverProps}>
      {content}
    </div>
  );
}

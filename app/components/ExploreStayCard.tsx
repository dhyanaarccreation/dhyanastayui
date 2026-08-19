import Link from "next/link";
import type { properties } from "@/lib/mock-data";

type Property = (typeof properties)[number];

// Minimal image + info-row card for the destination-first discovery grid.
// Image and the name/price row live inside ONE card element — the shadow/
// border/radius are all on this outer link, with `overflow-hidden` clipping
// both to match, so it reads as a single raised block. This is a separate
// component from the shared `PropertyCard`, which stays untouched for its
// other usages (homepage carousel, wishlist, etc.).
export default function ExploreStayCard({ property }: { property: Property }) {
  return (
    <Link
      href={`/stays/${property.slug}`}
      className="group block rounded-card overflow-hidden bg-surface border border-[var(--surface-border)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-[4px] transition-all duration-300 ease-out"
    >
      {/* Image — proportional height (~72% of the card) so every card aligns identically */}
      <div className="relative aspect-[1.55/1] overflow-hidden bg-surface-hover">
        <img
          loading="lazy"
          src={property.images[0]}
          alt={property.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Info row — name left, price right, both vertically centered */}
      <div className="min-h-[58px] flex items-center justify-between gap-3 px-[15px] py-3.5">
        <p className="flex-1 min-w-0 truncate text-base font-[650] leading-[1.2] text-foreground">
          {property.name}
        </p>
        <p className="shrink-0 whitespace-nowrap text-sm font-[650] text-foreground">
          ₹{property.price.toLocaleString()}
          <span className="font-normal text-muted">/night</span>
        </p>
      </div>
    </Link>
  );
}

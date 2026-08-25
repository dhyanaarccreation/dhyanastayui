import { ArrowRight } from "lucide-react";
import type { properties } from "@/lib/mock-data";
import ImageCard from "./cards/ImageCard";
import WishlistButton from "./WishlistButton";

type Property = (typeof properties)[number];

export default function PropertyCard({ property, className }: { property: Property; className?: string }) {
  return (
    <ImageCard
      href={`/stays/${property.slug}`}
      image={property.images[0]}
      alt={property.name}
      badge={property.isTrending ? "Trending" : property.category}
      topRight={<WishlistButton id={`stay-${property.id}`} label={property.name} variant="icon" />}
      title={property.name}
      subtitle={`${property.location.city}, ${property.location.state}`}
      meta={
        <span className="inline-flex items-center gap-1">
          {property.reviewCount} reviews
          <span className="mx-1 text-white/40">·</span>
          <span className="font-semibold text-white">
            ₹{property.price.toLocaleString()}
          </span>
          <span className="text-white/70">/night</span>
        </span>
      }
      actionLabel="View Stay"
      actionIcon={ArrowRight}
      className={className}
    />
  );
}

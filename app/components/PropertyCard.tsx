import { Star, ArrowRight } from "lucide-react";
import type { properties } from "@/lib/mock-data";
import ImageCard from "./cards/ImageCard";

type Property = (typeof properties)[number];

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <ImageCard
      href={`/stays/${property.slug}`}
      image={property.images[0]}
      alt={property.name}
      badge={property.isTrending ? "Trending" : property.category}
      title={property.name}
      subtitle={`${property.location.city}, ${property.location.state}`}
      meta={
        <span className="inline-flex items-center gap-1">
          <Star size={12} className="fill-primary text-primary" />
          {property.rating} ({property.reviewCount})
          <span className="mx-1 text-white/40">·</span>
          <span className="font-semibold text-white">
            ₹{property.price.toLocaleString()}
          </span>
          <span className="text-white/70">/night</span>
        </span>
      }
      actionLabel="View Stay"
      actionIcon={ArrowRight}
    />
  );
}

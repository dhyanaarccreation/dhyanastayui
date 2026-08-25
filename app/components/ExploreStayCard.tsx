import { ArrowRight, Play } from "lucide-react";
import type { properties } from "@/lib/mock-data";
import { getCuratorByHandle } from "@/lib/travel-guides-data";
import CuratorAvatar from "./CuratorAvatar";
import ImageCard from "./cards/ImageCard";

type Property = (typeof properties)[number];

export default function ExploreStayCard({
  property,
  className = "w-full aspect-[4/3]",
}: {
  property: Property;
  /** Overrides sizing entirely (e.g. a fixed carousel-slide width) — passed
   *  through as `size="fill"` so it never fights ImageCard's own default
   *  `w-full` (Tailwind can't reliably resolve two conflicting width
   *  utilities by class-string order alone). */
  className?: string;
}) {
  const curator = property.curatedBy ? getCuratorByHandle(property.curatedBy) : undefined;

  return (
    <ImageCard
      href={`/stays/${property.slug}`}
      image={property.images[0]}
      alt={property.name}
      title={property.name.split(" ").slice(0, 2).join(" ")}
      actionLabel={`₹${property.price.toLocaleString()}`}
      actionIcon={ArrowRight}
      titleLayout="row"
      size="fill"
      className={className}
      topRight={
        curator && (
          <div
            className="w-9 h-9 rounded-full ring-2 ring-white shadow-md overflow-hidden relative"
            title={`Stayed & filmed by ${curator.name}`}
          >
            <CuratorAvatar name={curator.name} avatar={curator.avatar} className="w-full h-full object-cover text-[11px]" />
            <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-primary flex items-center justify-center ring-2 ring-white">
              <Play size={7} className="text-white fill-white" />
            </span>
          </div>
        )
      }
    />
  );
}

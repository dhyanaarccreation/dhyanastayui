import type { ReactNode } from "react";
import { Sparkles } from "lucide-react";
import type { properties } from "@/lib/mock-data";
import ExploreStayCard from "./ExploreStayCard";
import HorizontalScrollRow from "./HorizontalScrollRow";

type Property = (typeof properties)[number];

export default function PropertyGrid({
  properties,
  emptyMessage = "No curated stays found here yet.",
  leading,
}: {
  properties: Property[];
  emptyMessage?: string;
  /** Extra grid item(s) rendered before the property cards — e.g. the
   *  Vaksana Farms partner card, which isn't a plain `Property`. */
  leading?: ReactNode;
}) {
  if (properties.length === 0 && !leading) {
    return (
      <div className="text-center py-16">
        <Sparkles size={28} className="text-subtle mx-auto mb-3" />
        <p className="text-sm text-subtle">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <HorizontalScrollRow label="stays">
      {leading}
      {properties.map((property) => (
        <ExploreStayCard
          key={property.id}
          property={property}
          className="shrink-0 w-[62vw] sm:w-64 lg:w-72 aspect-[4/3] snap-start"
        />
      ))}
    </HorizontalScrollRow>
  );
}

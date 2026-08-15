import type { ReactNode } from "react";
import { Sparkles } from "lucide-react";
import type { properties } from "@/lib/mock-data";
import ExploreStayCard from "./ExploreStayCard";

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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {leading}
      {properties.map((property) => (
        <ExploreStayCard key={property.id} property={property} />
      ))}
    </div>
  );
}

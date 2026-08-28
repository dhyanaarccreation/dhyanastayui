"use client";

import { CalendarPlus, CalendarCheck2 } from "lucide-react";
import { useItinerary } from "@/lib/useItinerary";

interface ItineraryButtonProps {
  /** Namespaced id, e.g. `guide-hidden-cafes`. */
  id: string;
  label: string;
  className?: string;
}

export default function ItineraryButton({ id, label, className = "" }: ItineraryButtonProps) {
  const { isAdded, toggle } = useItinerary();
  const added = isAdded(id);

  return (
    <button
      type="button"
      onClick={() => toggle(id)}
      aria-label={added ? `Remove ${label} from itinerary` : `Add ${label} to itinerary`}
      aria-pressed={added}
      className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
        added
          ? "border-sage/40 bg-sage/10 text-sage hover:bg-sage/15"
          : "border-border text-foreground hover:bg-surface-hover hover:border-sage/40"
      } ${className}`}
    >
      {added ? <CalendarCheck2 size={14} /> : <CalendarPlus size={14} />}
      {added ? "Added to Itinerary" : "Add to Itinerary"}
    </button>
  );
}

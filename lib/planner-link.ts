// ============================================
// "Open in AI Planner" deep-link — shared by every
// curator itinerary card/detail page so a traveller
// can jump from an influencer's guide straight into
// the AI Trip Planner with that guide pre-loaded as
// a starting point (see AGENTS.md — My Travel Guide).
// ============================================

import { type ItineraryDay } from "./influencer-data";

export interface PlannerSeedItinerary {
  title: string;
  region: string;
  durationLabel: string;
  days: ItineraryDay[];
}

/** Turns a curator's day-by-day stops into a natural-language seed prompt for the AI planner. */
export function buildPlannerPrompt(curatorName: string, itinerary: PlannerSeedItinerary): string {
  const highlights = itinerary.days
    .flatMap((d) => d.stops.map((s) => s.label))
    .slice(0, 6)
    .join(", ");
  return `A ${itinerary.durationLabel} trip in ${itinerary.region}, inspired by ${curatorName}'s guide "${itinerary.title}" — ${highlights}.`;
}

/** Builds the /traveller/ai-planner URL that seeds this itinerary as the starting point. */
export function buildAIPlannerHref(
  curatorName: string,
  curatorHandle: string,
  itinerary: PlannerSeedItinerary
): string {
  const params = new URLSearchParams({
    from: curatorHandle,
    curator: curatorName,
    trip: itinerary.title,
    prompt: buildPlannerPrompt(curatorName, itinerary),
  });
  return `/traveller/ai-planner?${params.toString()}`;
}

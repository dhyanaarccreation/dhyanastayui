"use client";

import { Clock, MapPin } from "lucide-react";

import { PageHeader, SectionCard, StatusPill } from "@/app/components/DashboardUI";
import { dailyMeals, directionsUrl } from "@/lib/trip-dashboard-data";

const statusTone = {
  Delivered: "sage",
  Reserved: "primary",
  Preparing: "muted",
} as const;

export default function TravellerFoodPage() {
  return (
    <div className="space-y-5 pb-16">
      <PageHeader
        title="My Food"
        subtitle="Today's curated meals — breakfast, lunch and dinner, pre-booked and reserved for you."
      />

      <div className="grid sm:grid-cols-3 gap-5">
        {dailyMeals.map((meal) => (
          <SectionCard key={meal.id} title={meal.meal}>
            <div className="p-5">
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="text-sm font-semibold text-foreground">{meal.restaurant}</p>
                <StatusPill tone={statusTone[meal.status]}>{meal.status}</StatusPill>
              </div>
              <p className="text-xs text-muted mb-3">{meal.items}</p>
              <p className="text-xs text-muted flex items-center gap-1.5 mb-1">
                <Clock size={12} /> {meal.time}
              </p>
              <p className="text-xs text-muted flex items-center gap-1.5">
                <MapPin size={12} /> {meal.location}
              </p>

              <a
                href={directionsUrl(meal.restaurant)}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full mt-4 py-2 text-center bg-surface-hover border border-border text-foreground text-xs font-medium rounded-lg hover:bg-surface transition-colors"
              >
                Navigate
              </a>
            </div>
          </SectionCard>
        ))}
      </div>
    </div>
  );
}

"use client";

import { Navigation, MapPin, Clock, LocateFixed } from "lucide-react";
import type { LiveLocation } from "@/lib/trip-dashboard-data";

export default function LiveMapCard({ location }: { location: LiveLocation }) {
  if (location.permission === "unavailable") {
    return (
      <div className="bg-surface border border-border rounded-2xl p-6 text-center">
        <LocateFixed size={22} className="mx-auto text-subtle mb-2" />
        <p className="text-sm font-medium text-foreground mb-1">Location unavailable</p>
        <p className="text-xs text-muted mb-3">
          Turn on location access to see your live position and travel time to {location.nextLabel}.
        </p>
        <button className="text-xs font-medium text-primary hover:underline">Enable location</button>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-2xl overflow-hidden h-full flex flex-col">
      <div
        className="relative flex-1 min-h-[220px]"
        style={{
          backgroundImage: "radial-gradient(var(--color-border) 1px, transparent 1px)",
          backgroundSize: "14px 14px",
          backgroundColor: "var(--color-surface-hover)",
        }}
      >
        <svg viewBox="0 0 300 150" className="absolute inset-0 w-full h-full">
          <path
            d="M 40 110 C 100 60, 160 130, 260 40"
            fill="none"
            stroke="var(--color-sage)"
            strokeWidth="2"
            strokeDasharray="1 7"
            strokeLinecap="round"
          />
        </svg>

        <div className="absolute" style={{ left: "13%", top: "73%", transform: "translate(-50%, -50%)" }}>
          <span className="absolute inset-0 -m-2 rounded-full bg-primary/30 animate-ping" />
          <span className="relative block w-3 h-3 rounded-full bg-primary border-2 border-background" />
        </div>

        <div className="absolute flex flex-col items-center" style={{ left: "87%", top: "27%", transform: "translate(-50%, -100%)" }}>
          <MapPin size={20} className="text-terracotta drop-shadow" fill="var(--color-terracotta)" />
        </div>
      </div>

      <div className="p-4 space-y-2">
        <p className="text-sm font-medium text-foreground flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
          You → {location.nextLabel}
        </p>
        <div className="flex items-center gap-4 text-xs text-muted">
          <span className="flex items-center gap-1">
            <Navigation size={13} /> {location.distanceKm} km
          </span>
          <span className="flex items-center gap-1">
            <Clock size={13} /> {location.etaMin} min
          </span>
          <span className="ml-auto text-primary font-medium">Leave by {location.recommendedDeparture}</span>
        </div>
      </div>
    </div>
  );
}

"use client";

import { LocateFixed, MapPin, ArrowDown } from "lucide-react";

import { PageHeader } from "@/app/components/DashboardUI";
import LiveMapCard from "@/app/components/trip/LiveMapCard";
import { liveLocation, todayTimeline, directionsUrl } from "@/lib/trip-dashboard-data";

export default function TravellerLocationPage() {
  // liveLocation.nextLabel already accounts for on-site stops that need no travel
  // (e.g. lunch at the current location) — find it in the timeline and use the
  // stop right after it as "After that", so nothing repeats.
  const nextIdx = todayTimeline.findIndex((a) => a.title === liveLocation.nextLabel);
  const after = nextIdx >= 0 ? todayTimeline[nextIdx + 1] : undefined;

  const waypoints = [
    { label: "You are here", title: liveLocation.currentLabel, distance: null as string | null, icon: LocateFixed },
    { label: "Next stop", title: liveLocation.nextLabel, distance: `${liveLocation.distanceKm} km`, icon: MapPin },
    ...(after
      ? [{ label: "After that", title: after.title, distance: `${(liveLocation.distanceKm + 3.4).toFixed(1)} km`, icon: MapPin }]
      : []),
  ];

  return (
    <div className="space-y-5 pb-16">
      <PageHeader
        title="Live Location"
        subtitle="Where you are right now, and where you need to go next."
      />

      <LiveMapCard location={liveLocation} />

      <div className="bg-surface border border-border rounded-2xl p-6">
        <p className="text-sm font-semibold text-foreground mb-4">Route to your next stops</p>
        <div className="space-y-0">
          {waypoints.map((wp, i) => (
            <div key={wp.label}>
              <div className="flex items-center gap-3">
                <span
                  className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                    i === 0 ? "bg-primary/10 text-primary" : "bg-surface-hover text-muted"
                  }`}
                >
                  <wp.icon size={15} />
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-subtle">{wp.label}</p>
                  <p className="text-sm font-medium text-foreground">{wp.title}</p>
                </div>
              </div>
              {i < waypoints.length - 1 && (
                <div className="flex items-center gap-3 pl-4 py-1">
                  <ArrowDown size={13} className="text-subtle" />
                  <span className="text-xs text-subtle">{waypoints[i + 1].distance}</span>
                </div>
              )}
            </div>
          ))}
        </div>
        <a
          href={directionsUrl(liveLocation.nextLabel)}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full mt-5 py-2.5 text-center bg-primary text-primary-foreground text-sm font-semibold rounded-xl hover:bg-primary-hover transition-colors"
        >
          Navigate to {liveLocation.nextLabel}
        </a>
      </div>
    </div>
  );
}

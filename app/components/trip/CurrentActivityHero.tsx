"use client";

import { useState } from "react";
import { MapPin, Clock } from "lucide-react";
import type { TimelineActivity } from "@/lib/trip-dashboard-data";
import { activeTrip } from "@/lib/trip-dashboard-data";

export default function CurrentActivityHero({
  activity,
  onSkip,
}: {
  activity: TimelineActivity | undefined;
  onSkip: (id: string) => void;
}) {
  const [arrival, setArrival] = useState<"unset" | "arrived" | "travelling">("unset");
  const [skipConfirm, setSkipConfirm] = useState(false);

  if (!activity) {
    return (
      <div className="relative rounded-2xl overflow-hidden bg-surface border border-border p-6 flex items-center justify-center min-h-[220px]">
        <p className="text-sm text-muted">No activity in progress right now.</p>
      </div>
    );
  }

  return (
    <div className="relative rounded-2xl overflow-hidden min-h-[220px] flex flex-col justify-end text-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={activeTrip.heroImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

      <div className="relative p-5 space-y-3">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider bg-white/15 backdrop-blur px-2.5 py-1 rounded-full w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse" /> Current Activity
        </span>

        <div>
          <h2 className="text-xl font-semibold leading-tight">{activity.title}</h2>
          <div className="flex items-center gap-3 text-xs text-white/80 mt-1">
            {activity.location && (
              <span className="flex items-center gap-1">
                <MapPin size={12} /> {activity.location}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Clock size={12} /> {activity.time}
            </span>
          </div>
        </div>

        {arrival === "arrived" && (
          <p className="text-xs font-medium text-sage bg-black/30 backdrop-blur px-3 py-1.5 rounded-lg w-fit">
            🟢 ARRIVED — You&apos;re marked as arrived.
          </p>
        )}
        {arrival === "travelling" && (
          <p className="text-xs font-medium text-white bg-black/30 backdrop-blur px-3 py-1.5 rounded-lg w-fit">
            Still travelling
          </p>
        )}

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setArrival("arrived")}
            className="px-4 py-2 bg-primary text-primary-foreground text-xs font-semibold rounded-lg hover:bg-primary-hover transition-colors"
          >
            I&apos;m Here
          </button>
          <button
            onClick={() => setArrival("travelling")}
            className="px-4 py-2 bg-white/15 backdrop-blur border border-white/30 text-white text-xs font-medium rounded-lg hover:bg-white/25 transition-colors"
          >
            Not Yet Arrived
          </button>
          <button
            onClick={() => setSkipConfirm(true)}
            className="px-4 py-2 border border-terracotta text-terracotta bg-white/90 text-xs font-medium rounded-lg hover:bg-white transition-colors"
          >
            Skip This Place
          </button>
        </div>
      </div>

      {skipConfirm && (
        <div
          className="fixed inset-0 z-[95] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center"
          onClick={() => setSkipConfirm(false)}
        >
          <div
            className="w-full sm:max-w-sm rounded-t-3xl sm:rounded-2xl bg-background border border-border shadow-2xl p-6 text-center text-foreground"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-sm font-semibold mb-1">Skip this activity?</p>
            <p className="text-xs text-muted mb-6">
              &quot;{activity.title}&quot; will be marked as skipped. Your itinerary can be adjusted based on this change.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setSkipConfirm(false)}
                className="flex-1 py-2.5 bg-surface-hover border border-border text-foreground text-sm font-medium rounded-xl hover:bg-surface transition-colors"
              >
                Keep Activity
              </button>
              <button
                onClick={() => {
                  onSkip(activity.id);
                  setSkipConfirm(false);
                  setArrival("unset");
                }}
                className="flex-1 py-2.5 bg-terracotta text-white text-sm font-semibold rounded-xl hover:bg-terracotta/90 transition-colors"
              >
                Skip Activity
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

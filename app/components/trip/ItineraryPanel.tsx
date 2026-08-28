"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Circle,
  XCircle,
  AlertTriangle,
  MapPin,
  Clock,
  SkipForward,
  Wand2,
} from "lucide-react";
import type { TimelineActivity } from "@/lib/trip-dashboard-data";

const statusStyles: Record<TimelineActivity["status"], { icon: typeof Circle; className: string }> = {
  completed: { icon: CheckCircle2, className: "bg-sage/10 text-sage" },
  current: { icon: Circle, className: "bg-primary/10 text-primary" },
  upcoming: { icon: Circle, className: "bg-surface-hover text-subtle" },
  delayed: { icon: AlertTriangle, className: "bg-terracotta/10 text-terracotta" },
  skipped: { icon: XCircle, className: "bg-surface-hover text-subtle" },
};

export default function ItineraryPanel({
  activities,
  onSkip,
  onReschedule,
}: {
  activities: TimelineActivity[];
  onSkip: (id: string) => void;
  onReschedule: () => void;
}) {
  const [arrival, setArrival] = useState<"unset" | "arrived" | "late">("unset");
  const [skipConfirmId, setSkipConfirmId] = useState<string | null>(null);
  const skipTarget = activities.find((a) => a.id === skipConfirmId);

  return (
    <div className="bg-surface border border-border rounded-2xl overflow-hidden h-full">
      <div className="px-5 py-4 border-b border-surface-hover">
        <h2 className="text-sm font-semibold text-foreground">Today&apos;s Itinerary</h2>
      </div>

      <ul className="divide-y divide-surface-hover max-h-[420px] overflow-y-auto">
        {activities.map((activity) => {
          const isCurrent = activity.status === "current";
          const { icon: Icon, className } = statusStyles[activity.status];

          return (
            <li key={activity.id} className={`px-5 py-3.5 ${isCurrent ? "bg-primary/5" : ""}`}>
              <div className="flex items-start gap-3.5">
                <span className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${className}`}>
                  <Icon size={16} />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-subtle tabular-nums flex items-center gap-1">
                    <Clock size={9} /> {activity.time}
                  </p>
                  <p
                    className={`text-sm font-medium truncate ${
                      activity.status === "skipped" ? "line-through text-subtle" : "text-foreground"
                    }`}
                  >
                    {activity.title}
                  </p>
                  {activity.location && (
                    <p className="text-xs text-muted truncate flex items-center gap-1 mt-0.5">
                      <MapPin size={10} /> {activity.location}
                    </p>
                  )}
                  {activity.status === "delayed" && activity.note && (
                    <p className="text-[11px] text-terracotta mt-0.5">{activity.note}</p>
                  )}
                </div>
                {isCurrent && (
                  <span className="text-[10px] font-semibold text-primary uppercase tracking-wider shrink-0 mt-0.5">
                    Now
                  </span>
                )}
              </div>

              {isCurrent && (
                <div className="mt-3 ml-[47px] space-y-2">
                  {arrival === "arrived" && (
                    <p className="text-xs font-medium text-sage">🟢 Marked as arrived</p>
                  )}
                  {arrival === "late" && (
                    <p className="text-xs font-medium text-terracotta">Marked as running late</p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setArrival("arrived")}
                      className="px-3 py-1.5 bg-primary text-primary-foreground text-xs font-semibold rounded-lg hover:bg-primary-hover transition-colors"
                    >
                      I&apos;ve Arrived
                    </button>
                    <button
                      onClick={() => setArrival("late")}
                      className="px-3 py-1.5 bg-surface-hover border border-border text-foreground text-xs font-medium rounded-lg hover:bg-surface transition-colors"
                    >
                      I&apos;m Late
                    </button>
                    <button
                      onClick={onReschedule}
                      className="flex items-center gap-1.5 px-3 py-1.5 border border-primary text-primary text-xs font-medium rounded-lg hover:bg-primary/10 transition-colors"
                    >
                      <Wand2 size={12} /> Reschedule
                    </button>
                    <button
                      onClick={() => setSkipConfirmId(activity.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 border border-terracotta text-terracotta text-xs font-medium rounded-lg hover:bg-terracotta/10 transition-colors"
                    >
                      <SkipForward size={12} /> Skip
                    </button>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {skipTarget && (
        <div
          className="fixed inset-0 z-[95] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center"
          onClick={() => setSkipConfirmId(null)}
        >
          <div
            className="w-full sm:max-w-sm rounded-t-3xl sm:rounded-2xl bg-background border border-border shadow-2xl p-6 text-center text-foreground"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-sm font-semibold mb-1">Skip this activity?</p>
            <p className="text-xs text-muted mb-6">
              &quot;{skipTarget.title}&quot; will be marked as skipped. Your itinerary can be adjusted based on this change.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setSkipConfirmId(null)}
                className="flex-1 py-2.5 bg-surface-hover border border-border text-foreground text-sm font-medium rounded-xl hover:bg-surface transition-colors"
              >
                Keep Activity
              </button>
              <button
                onClick={() => {
                  onSkip(skipTarget.id);
                  setSkipConfirmId(null);
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

"use client";

import { CheckCircle2, Circle, XCircle, AlertTriangle, MapPin } from "lucide-react";
import type { TimelineActivity } from "@/lib/trip-dashboard-data";

const statusStyles: Record<TimelineActivity["status"], { icon: typeof Circle; className: string }> = {
  completed: { icon: CheckCircle2, className: "text-sage" },
  current: { icon: Circle, className: "text-primary" },
  upcoming: { icon: Circle, className: "text-subtle" },
  delayed: { icon: AlertTriangle, className: "text-terracotta" },
  skipped: { icon: XCircle, className: "text-subtle" },
};

export default function TripTimeline({ activities }: { activities: TimelineActivity[] }) {
  return (
    <div className="divide-y divide-surface-hover">
      {activities.map((activity) => {
        const isCurrent = activity.status === "current";
        const { icon: Icon, className } = statusStyles[activity.status];

        return (
          <div key={activity.id} className={`px-5 py-2.5 ${isCurrent ? "bg-primary/5 border-l-2 border-primary" : ""}`}>
            <div className="flex items-center gap-3">
              <Icon size={15} className={`shrink-0 ${className}`} />
              <div className="flex-1 min-w-0 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className={`text-xs font-medium truncate ${activity.status === "skipped" ? "line-through text-subtle" : "text-foreground"}`}>
                    {activity.title}
                  </p>
                  {activity.location && (
                    <p className="text-[11px] text-muted flex items-center gap-1 truncate">
                      <MapPin size={10} /> {activity.location}
                    </p>
                  )}
                </div>
                <span className="text-[11px] text-subtle whitespace-nowrap shrink-0">{activity.time}</span>
              </div>
            </div>
            {isCurrent && <p className="text-[11px] text-primary font-medium mt-1 ml-[27px]">CURRENT</p>}
            {activity.status === "delayed" && activity.note && (
              <p className="text-[11px] text-terracotta mt-1 ml-[27px]">{activity.note}</p>
            )}
            {activity.status === "skipped" && <p className="text-[11px] text-subtle mt-1 ml-[27px]">Skipped</p>}
          </div>
        );
      })}
    </div>
  );
}

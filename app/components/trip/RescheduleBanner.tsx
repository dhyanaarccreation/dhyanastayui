"use client";

import { Wand2 } from "lucide-react";

const mockChanges = [
  { activity: "Lunch", change: "Moved to 2:00 PM" },
  { activity: "Beach Visit", change: "Moved to 5:30 PM" },
  { activity: "Dinner", change: "No change" },
];

export default function RescheduleBanner({
  onAccept,
  onKeep,
}: {
  onAccept: () => void;
  onKeep: () => void;
}) {
  return (
    <div className="bg-primary/5 border border-primary/30 rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-3">
        <Wand2 size={16} className="text-primary" />
        <p className="text-sm font-semibold text-foreground">Your itinerary has been adjusted</p>
      </div>
      <ul className="space-y-1.5 mb-4">
        {mockChanges.map((c) => (
          <li key={c.activity} className="flex items-center justify-between text-xs">
            <span className="text-foreground">{c.activity}</span>
            <span className={c.change === "No change" ? "text-subtle" : "text-primary font-medium"}>{c.change}</span>
          </li>
        ))}
      </ul>
      <div className="flex gap-3">
        <button
          onClick={onAccept}
          className="flex-1 py-2 bg-primary text-primary-foreground text-xs font-semibold rounded-lg hover:bg-primary-hover transition-colors"
        >
          Accept New Plan
        </button>
        <button
          onClick={onKeep}
          className="flex-1 py-2 bg-surface-hover border border-border text-foreground text-xs font-medium rounded-lg hover:bg-surface transition-colors"
        >
          Keep My Plan
        </button>
      </div>
    </div>
  );
}

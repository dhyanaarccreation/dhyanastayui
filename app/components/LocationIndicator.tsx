"use client";

import { useState } from "react";
import { MapPin, ChevronDown, LocateFixed, Loader2 } from "lucide-react";
import type { UserLocationStatus } from "@/lib/useUserLocation";

// Single location indicator next to the search bar — replaces the old
// hardcoded destination-pills row. Shows the geolocation-detected city, a
// "Detecting location..." loading state, or a "Set location" fallback
// (permission denied / detection failed / user cleared it) that opens a
// lightweight dropdown of the cities we actually have curated stays in.
export default function LocationIndicator({
  status,
  city,
  cityOptions,
  onSelectCity,
  onClear,
  onRetryDetection,
}: {
  status: UserLocationStatus;
  city: string | null;
  cityOptions: string[];
  onSelectCity: (city: string) => void;
  onClear: () => void;
  onRetryDetection: () => void;
}) {
  const [open, setOpen] = useState(false);
  const isDetecting = status === "detecting";
  const needsManualEntry = status === "denied" || !city;

  return (
    <div className="relative shrink-0">
      <button
        type="button"
        onClick={() => !isDetecting && setOpen((v) => !v)}
        disabled={isDetecting}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex items-center gap-1.5 w-full sm:w-auto h-[54px] px-4 rounded-full border text-sm font-medium bg-surface shadow-organic transition-colors whitespace-nowrap ${
          isDetecting
            ? "text-subtle cursor-default border-border"
            : "text-foreground border-border hover:border-border-light"
        }`}
      >
        {isDetecting ? (
          <Loader2 size={14} className="text-subtle animate-spin" />
        ) : (
          <MapPin size={14} className="text-primary shrink-0" />
        )}
        <span className="truncate">
          {isDetecting ? "Detecting location..." : needsManualEntry ? "Set location" : city}
        </span>
        {!isDetecting && (
          <ChevronDown size={13} className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
        )}
      </button>

      {open && !isDetecting && (
        <div className="absolute right-0 top-full mt-2 w-60 max-h-80 overflow-y-auto rounded-2xl bg-surface shadow-organic p-1.5 z-20 animate-fade-in">
          <button
            onClick={() => {
              onRetryDetection();
              setOpen(false);
            }}
            className="w-full flex items-center gap-2 text-left px-3 py-2 rounded-xl text-sm text-primary font-medium hover:bg-surface-hover transition-colors"
          >
            <LocateFixed size={14} /> Detect my location
          </button>
          <button
            onClick={() => {
              onClear();
              setOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-xl text-sm text-muted hover:bg-surface-hover hover:text-foreground transition-colors"
          >
            All stays
          </button>
          <div className="my-1 border-t border-border" />
          {cityOptions.map((option) => (
            <button
              key={option}
              onClick={() => {
                onSelectCity(option);
                setOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-colors ${
                city === option ? "bg-primary/10 text-primary font-medium" : "text-muted hover:bg-surface-hover hover:text-foreground"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

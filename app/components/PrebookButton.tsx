"use client";

import { Check, Clock } from "lucide-react";
import { usePrebookRequests } from "@/lib/usePrebookRequests";

interface PrebookButtonProps {
  /** Namespaced id, e.g. `guide-hidden-cafes`. */
  id: string;
  label: string;
  className?: string;
}

export default function PrebookButton({ id, label, className = "" }: PrebookButtonProps) {
  const { isRequested, toggle } = usePrebookRequests();
  const requested = isRequested(id);

  return (
    <button
      type="button"
      onClick={() => toggle(id)}
      aria-label={requested ? `Cancel pre-book request for ${label}` : `Pre-book ${label}`}
      aria-pressed={requested}
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
        requested
          ? "bg-primary/10 text-primary border border-primary/30 hover:bg-primary/15"
          : "bg-primary text-primary-foreground hover:bg-primary-hover"
      } ${className}`}
    >
      {requested ? <Check size={14} /> : <Clock size={14} />}
      {requested ? "Request Sent" : "Pre-book"}
    </button>
  );
}

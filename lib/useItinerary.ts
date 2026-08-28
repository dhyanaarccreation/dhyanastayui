"use client";

import { useCallback, useEffect, useState } from "react";

// Local, per-browser trip itinerary — same honesty as useWishlist: no
// backend exists for this yet, so saves persist to localStorage only.
// Ids are namespaced by the caller (e.g. `guide-hidden-cafes`) so this
// never collides with the separate wishlist list.
const STORAGE_KEY = "dhyana-itinerary";

function readItinerary(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeItinerary(ids: string[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // Storage unavailable (private mode, quota) — toggle still works for
    // the current session via React state, it just won't persist.
  }
}

export function useItinerary() {
  const [ids, setIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setIds(readItinerary());
    setHydrated(true);
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setIds(readItinerary());
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const isAdded = useCallback((id: string) => ids.includes(id), [ids]);

  const toggle = useCallback((id: string) => {
    setIds((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      writeItinerary(next);
      return next;
    });
  }, []);

  return { ids, hydrated, isAdded, toggle };
}

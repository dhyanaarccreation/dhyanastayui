"use client";

import { useCallback, useEffect, useState } from "react";

// Local, per-browser wishlist — no backend exists for this yet, so saves
// persist to localStorage only (same honesty as the rest of this mock data
// layer: real toggle behavior, not a fabricated "synced to your account").
// Ids are namespaced by the caller (e.g. `stay-1`, `experience-e4`,
// `destination-auroville`) so the three content types never collide.
const STORAGE_KEY = "dhyana-wishlist";

function readWishlist(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeWishlist(ids: string[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // Storage unavailable (private mode, quota) — toggle still works for
    // the current session via React state, it just won't persist.
  }
}

export function useWishlist() {
  const [ids, setIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setIds(readWishlist());
    setHydrated(true);
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setIds(readWishlist());
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const isSaved = useCallback((id: string) => ids.includes(id), [ids]);

  const toggle = useCallback((id: string) => {
    setIds((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      writeWishlist(next);
      return next;
    });
  }, []);

  return { ids, hydrated, isSaved, toggle };
}

"use client";

import { useCallback, useEffect, useState } from "react";

// Local record of "I want to pre-book this" intent — same honesty as
// useWishlist: there's no reservations backend for venue guides yet, so
// this tracks intent locally rather than faking a confirmed booking.
const STORAGE_KEY = "dhyana-prebook-requests";

function readRequests(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeRequests(ids: string[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // Storage unavailable (private mode, quota) — toggle still works for
    // the current session via React state, it just won't persist.
  }
}

export function usePrebookRequests() {
  const [ids, setIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setIds(readRequests());
    setHydrated(true);
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setIds(readRequests());
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const isRequested = useCallback((id: string) => ids.includes(id), [ids]);

  const toggle = useCallback((id: string) => {
    setIds((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      writeRequests(next);
      return next;
    });
  }, []);

  return { ids, hydrated, isRequested, toggle };
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { reverseGeocode } from "@/lib/geocode";

export type UserLocationStatus = "detecting" | "resolved" | "manual" | "denied";

interface UseUserLocationResult {
  status: UserLocationStatus;
  city: string | null;
  /** Explicitly pick a city, bypassing geolocation (the "Set location" fallback). */
  setManualCity: (city: string) => void;
  /** Clear the active city — back to "Set location" without a value. */
  clearCity: () => void;
  /** Re-run browser geolocation detection on demand. */
  retryDetection: () => void;
}

const STORAGE_KEY = "dhyana:user-location";

type CachedLocation = { status: "resolved" | "manual"; city: string } | { status: "denied" };

function readCache(): CachedLocation | null {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CachedLocation) : null;
  } catch {
    return null;
  }
}

function writeCache(value: CachedLocation) {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // sessionStorage unavailable (private browsing etc.) — detection just
    // re-runs next load, which is an acceptable degrade.
  }
}

/**
 * Detects the visitor's city via the browser Geolocation API, resolving
 * coordinates to a place name through `reverseGeocode` (lib/geocode.ts).
 *
 * This app has no authentication/session system to gate on (confirmed: no
 * auth context, cookie, or token exists anywhere in the repo — the login
 * page doesn't persist any state). Detection therefore runs for any
 * visitor, once per tab session: the result (or a prior denial) is cached
 * in sessionStorage so navigating around the site never re-prompts or
 * re-fetches.
 */
export function useUserLocation(): UseUserLocationResult {
  const [status, setStatus] = useState<UserLocationStatus>("detecting");
  const [city, setCity] = useState<string | null>(null);
  const hasRunRef = useRef(false);

  const detect = useCallback(() => {
    if (typeof navigator === "undefined" || !("geolocation" in navigator)) {
      setStatus("denied");
      writeCache({ status: "denied" });
      return;
    }

    setStatus("detecting");
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const resolved = await reverseGeocode(position.coords.latitude, position.coords.longitude);
          setCity(resolved.city);
          setStatus("resolved");
          writeCache({ status: "resolved", city: resolved.city });
        } catch {
          setStatus("denied");
          writeCache({ status: "denied" });
        }
      },
      () => {
        setStatus("denied");
        writeCache({ status: "denied" });
      },
      { timeout: 8000, maximumAge: 5 * 60 * 1000 }
    );
  }, []);

  useEffect(() => {
    if (hasRunRef.current) return;
    hasRunRef.current = true;

    const cached = readCache();
    if (cached?.status === "resolved" || cached?.status === "manual") {
      setCity(cached.city);
      setStatus(cached.status);
      return;
    }
    if (cached?.status === "denied") {
      setStatus("denied");
      return;
    }

    detect();
  }, [detect]);

  const setManualCity = useCallback((selected: string) => {
    setCity(selected);
    setStatus("manual");
    writeCache({ status: "manual", city: selected });
  }, []);

  const clearCity = useCallback(() => {
    setCity(null);
    setStatus("denied");
    writeCache({ status: "denied" });
  }, []);

  return { status, city, setManualCity, clearCity, retryDetection: detect };
}

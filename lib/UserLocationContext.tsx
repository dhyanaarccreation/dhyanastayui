"use client";

import { createContext, useContext } from "react";
import { useUserLocation, type UserLocationStatus } from "./useUserLocation";

interface UserLocationContextValue {
  status: UserLocationStatus;
  city: string | null;
  setManualCity: (city: string) => void;
  clearCity: () => void;
  retryDetection: () => void;
}

const UserLocationContext = createContext<UserLocationContextValue | null>(null);

/** Wraps the whole app (see app/layout.tsx) so every consumer — the Navbar's
 *  location picker and the homepage's StaysExplorer grid — shares one live
 *  location state. Picking a city in the navbar updates the grid instantly,
 *  even without a navigation. */
export function UserLocationProvider({ children }: { children: React.ReactNode }) {
  const value = useUserLocation();
  return <UserLocationContext.Provider value={value}>{children}</UserLocationContext.Provider>;
}

export function useUserLocationContext(): UserLocationContextValue {
  const ctx = useContext(UserLocationContext);
  if (!ctx) {
    throw new Error("useUserLocationContext must be used within a UserLocationProvider (see app/layout.tsx)");
  }
  return ctx;
}

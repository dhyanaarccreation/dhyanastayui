"use client";

import { createContext, useContext, useState } from "react";

interface SearchQueryContextValue {
  query: string;
  setQuery: (q: string) => void;
}

const SearchQueryContext = createContext<SearchQueryContextValue | null>(null);

/** Wraps the whole app (see app/layout.tsx) so the Navbar's stays search box
 *  and the homepage's StaysExplorer grid share one live search term —
 *  typing in the navbar filters the grid instantly, no navigation needed. */
export function SearchQueryProvider({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState("");
  return (
    <SearchQueryContext.Provider value={{ query, setQuery }}>
      {children}
    </SearchQueryContext.Provider>
  );
}

export function useSearchQuery(): SearchQueryContextValue {
  const ctx = useContext(SearchQueryContext);
  if (!ctx) {
    throw new Error("useSearchQuery must be used within a SearchQueryProvider (see app/layout.tsx)");
  }
  return ctx;
}

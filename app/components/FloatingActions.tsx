"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LayoutDashboard, Sparkles } from "lucide-react";
import { dashboardRoles, dashboardGroups } from "@/lib/dashboards";
import { LogoMark } from "./Logo";
import TripPlannerWidget from "./TripPlannerWidget";

// Single floating launcher, bottom-left on every page — a compact icon-only
// button that opens a glass popup menu with the dashboard shortcut and the
// AI planner, instead of an always-visible pill.
export default function FloatingActions() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const handlePointerDown = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  // Return focus to the trigger button whenever the popup closes, so
  // keyboard users don't lose their place.
  useEffect(() => {
    if (!menuOpen) triggerRef.current?.focus();
  }, [menuOpen]);

  return (
    <>
      <div
        ref={wrapperRef}
        className={`fixed left-6 bottom-6 z-[60] transition-opacity ${
          aiOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <button
          ref={triggerRef}
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-haspopup="menu"
          aria-label="Open dashboard and planner menu"
          className="flex items-center justify-center w-12 h-12 rounded-full bg-white/80 backdrop-blur-xl border border-white/60 shadow-[0_8px_28px_rgba(0,0,0,0.18)] text-foreground hover:scale-105 active:scale-95 transition-transform duration-200"
        >
          <LayoutDashboard size={19} />
        </button>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              role="menu"
              aria-label="Dashboard and planner menu"
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.96 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute bottom-full left-0 mb-4 w-[300px] max-w-[88vw] max-h-[70vh] overflow-y-auto rounded-[20px] bg-white/85 backdrop-blur-xl border border-white/50 shadow-[0_20px_60px_rgba(0,0,0,0.25)] p-4"
            >
              {/* Small arrow pointing down toward the trigger button */}
              <span
                aria-hidden="true"
                className="absolute -bottom-2 left-5 w-4 h-4 bg-white/85 backdrop-blur-xl border-b border-r border-white/50 rotate-45"
              />

              <div>
                <p className="text-[10px] uppercase tracking-wider text-subtle/80 mb-2 px-2.5">
                  Choose your dashboard
                </p>
                {dashboardGroups.map((group) => (
                  <div key={group} className="mb-3 last:mb-0">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-primary mb-1 px-2.5">
                      {group}
                    </p>
                    {dashboardRoles
                      .filter((r) => r.group === group && !r.hidden)
                      .map((r) => (
                        <Link
                          key={r.slug}
                          href={`/${r.slug}`}
                          role="menuitem"
                          onClick={() => setMenuOpen(false)}
                          className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm text-muted hover:text-foreground hover:bg-black/5 transition-colors"
                        >
                          <r.icon size={15} className="text-subtle shrink-0" />
                          {r.title.replace(" Dashboard", "")}
                        </Link>
                      ))}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* AI Trip Planner launcher, bottom-right — standalone, matching its
          original pill styling (spacing, shadow, radius, mobile scale). */}
      <div
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[60] origin-bottom-right scale-[0.82] sm:scale-100 transition-opacity ${
          aiOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <button
          onClick={() => setAiOpen(true)}
          aria-label="Open AI Trip Planner"
          className="flex items-center gap-2 pl-3 pr-4 py-2.5 rounded-full bg-surface border border-border shadow-[0_8px_32px_rgba(0,0,0,0.25)] hover:bg-surface-hover transition-colors"
        >
          <span className="flex items-center justify-center w-9 h-9 rounded-full bg-background shrink-0">
            <LogoMark size={22} />
          </span>
          <span className="text-sm font-medium text-foreground whitespace-nowrap">
            AI Planner
          </span>
          <Sparkles size={13} className="text-sage shrink-0" />
        </button>
      </div>

      <TripPlannerWidget open={aiOpen} onClose={() => setAiOpen(false)} />
    </>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Menu,
  X,
  Search,
  User,
  ChevronDown,
  Heart,
} from "lucide-react";
import { navLinks } from "@/lib/mock-data";
import { dashboardRoles, dashboardGroups } from "@/lib/dashboards";
import { ThemeToggle } from "./ThemeToggle";
import { LogoMark } from "./Logo";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dashOpen, setDashOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">

      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <LogoMark size={40} />
            <span className="text-xl font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
              Dhyana<span className="text-primary">Stays</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm text-muted hover:text-foreground transition-colors rounded-lg hover:bg-surface-hover"
              >
                {link.label}
              </Link>
            ))}

            {/* Dashboard role dropdown */}
            <div className="relative">
              <button
                onClick={() => setDashOpen(!dashOpen)}
                aria-expanded={dashOpen}
                className={`flex items-center gap-1 px-3 py-2 text-sm transition-colors rounded-lg ${
                  dashOpen
                    ? "text-foreground bg-surface-hover"
                    : "text-muted hover:text-foreground hover:bg-surface-hover"
                }`}
              >
                Dashboard
                <ChevronDown
                  size={14}
                  className={`transition-transform ${dashOpen ? "rotate-180" : ""}`}
                />
              </button>

              {dashOpen && (
                <div className="absolute right-0 top-full mt-3 w-[600px] max-h-[72vh] overflow-y-auto rounded-[28px] border border-border bg-surface shadow-organic p-5 animate-fade-in">
                  <p className="text-[10px] uppercase tracking-wider text-subtle mb-3">
                    Choose your dashboard — switch anytime if you hold multiple
                    roles
                  </p>
                  <div className="grid grid-cols-2 gap-x-6">
                    {dashboardGroups.map((group) => (
                      <div key={group} className="mb-4 break-inside-avoid">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-primary mb-1.5">
                          {group}
                        </p>
                        {dashboardRoles
                          .filter((r) => r.group === group)
                          .map((r) => (
                            <Link
                              key={r.slug}
                              href={`/${r.slug}`}
                              onClick={() => setDashOpen(false)}
                              className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm text-muted hover:text-foreground hover:bg-surface-hover transition-colors"
                            >
                              <r.icon size={15} className="text-subtle shrink-0" />
                              {r.title.replace(" Dashboard", "")}
                            </Link>
                          ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <button className="p-2 rounded-lg text-muted hover:text-foreground hover:bg-surface-hover transition-colors">
              <Search size={18} />
            </button>
            <button className="p-2 rounded-lg text-muted hover:text-foreground hover:bg-surface-hover transition-colors">
              <Heart size={18} />
            </button>
            <ThemeToggle />
            <Link
              href="/login"
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-primary-foreground bg-primary rounded-full shadow-organic hover:bg-primary-hover hover:-translate-y-0.5 transition-all"
            >
              <User size={16} />
              Sign In
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-background border-t border-border animate-fade-in">
          <div className="max-w-[1400px] mx-auto px-6 py-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-3 text-base text-muted hover:text-foreground hover:bg-surface-hover rounded-lg transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* Dashboards (mobile) */}
            <div className="pt-4 border-t border-border">
              <p className="px-4 pb-2 text-[10px] font-semibold uppercase tracking-wider text-primary">
                Dashboards
              </p>
              <div className="grid grid-cols-2 gap-1 max-h-64 overflow-y-auto">
                {dashboardRoles.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/${r.slug}`}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-muted hover:text-foreground hover:bg-surface-hover transition-colors"
                  >
                    <r.icon size={13} className="text-subtle shrink-0" />
                    {r.title.replace(" Dashboard", "")}
                  </Link>
                ))}
              </div>
            </div>
            <div className="pt-4 border-t border-border">
              <Link
                href="/login"
                className="block w-full text-center px-4 py-3 text-sm font-semibold text-primary-foreground bg-primary rounded-full"
                onClick={() => setMobileOpen(false)}
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

"use client";

import {
  Sparkles,
  BadgeCheck,
  Bookmark,
  TrendingUp,
  Percent,
  Gift,
  Star,
  Zap,
} from "lucide-react";
import { PageHeader, SectionCard, StatusPill } from "@/app/components/DashboardUI";
import {
  performanceTiers,
  currentTierKey,
  curatedStaysProgress,
  coreMetrics,
} from "@/lib/influencer-data";

// ============================================
// INFLUENCER — Benefits & Tier Progress
// Starter → Growing → Top Curator, and what
// unlocks at each stage.
// ============================================

const tierIcon = { starter: Bookmark, growing: TrendingUp, top: Star } as const;

export default function InfluencerBenefitsPage() {
  const currentIndex = performanceTiers.findIndex((t) => t.key === currentTierKey);
  const nextTier = performanceTiers[currentIndex + 1];
  const staysMet = curatedStaysProgress.current >= curatedStaysProgress.required;

  return (
    <div className="space-y-8 pb-12 animate-fade-in">
      <PageHeader
        title="Benefits & Tier Progress"
        subtitle="What you unlock as a Dhyana Travel Curator — from activation to your top tier."
      />

      {/* Tier ladder */}
      <SectionCard title="Curator Tiers" icon={Sparkles}>
        <div className="p-5">
          <div className="flex items-stretch gap-2">
            {performanceTiers.map((t, i) => {
              const Icon = tierIcon[t.key];
              const isCurrent = t.key === currentTierKey;
              const isPast = i < currentIndex;
              return (
                <div key={t.key} className="flex items-center flex-1">
                  <div className="flex flex-col items-center gap-2 flex-1">
                    <span
                      className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${
                        isCurrent
                          ? "bg-sage text-white ring-4 ring-sage/20"
                          : isPast
                          ? "bg-sage/20 text-sage"
                          : "bg-surface-hover text-subtle"
                      }`}
                    >
                      <Icon size={18} />
                    </span>
                    <div className="text-center">
                      <p className={`text-xs font-semibold ${isCurrent ? "text-foreground" : "text-muted"}`}>{t.label}</p>
                      <p className="text-[10px] text-subtle mt-0.5">{t.requirement}</p>
                      {isCurrent && <StatusPill tone="sage">You are here</StatusPill>}
                    </div>
                  </div>
                  {i < performanceTiers.length - 1 && (
                    <span className={`h-px flex-1 -mt-9 ${isPast ? "bg-sage" : "bg-border"}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </SectionCard>

      {/* Activation progress */}
      <SectionCard title="Activation Progress" icon={BadgeCheck}>
        <div className="px-5 py-4">
          <div className="flex justify-between text-xs text-muted mb-1.5">
            <span className="flex items-center gap-1"><Bookmark size={11} /> {curatedStaysProgress.current} of {curatedStaysProgress.required} curated stays</span>
            <span>{staysMet ? "Requirement met" : `${curatedStaysProgress.required - curatedStaysProgress.current} to go`}</span>
          </div>
          <div className="h-2 rounded-full bg-surface-hover overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-sage to-primary"
              style={{ width: `${Math.min(100, Math.round((curatedStaysProgress.current / curatedStaysProgress.required) * 100))}%` }}
            />
          </div>
        </div>
        <div className="px-5 pb-4 grid sm:grid-cols-3 gap-3">
          <div className="rounded-xl bg-background border border-border p-3.5 text-center">
            <p className="text-lg font-bold text-foreground tabular-nums">{coreMetrics.bookings}</p>
            <p className="text-[11px] text-subtle mt-0.5">Confirmed bookings</p>
          </div>
          <div className="rounded-xl bg-background border border-border p-3.5 text-center">
            <p className="text-lg font-bold text-foreground tabular-nums">{coreMetrics.conversionRate}%</p>
            <p className="text-[11px] text-subtle mt-0.5">Conversion rate</p>
          </div>
          <div className="rounded-xl bg-background border border-border p-3.5 text-center">
            <p className="text-lg font-bold text-foreground tabular-nums">₹{coreMetrics.commissionEarned.toLocaleString("en-IN")}</p>
            <p className="text-[11px] text-subtle mt-0.5">Lifetime commission</p>
          </div>
        </div>
      </SectionCard>

      {/* Current + next tier benefits */}
      <div className="grid lg:grid-cols-2 gap-6">
        <SectionCard title={`${performanceTiers[currentIndex].label} — Your Benefits`} icon={Gift}>
          <ul className="divide-y divide-surface-hover">
            {performanceTiers[currentIndex].benefits.map((b) => (
              <li key={b} className="flex items-center gap-2.5 px-5 py-3.5">
                <BadgeCheck size={14} className="text-sage shrink-0" />
                <span className="text-sm text-foreground">{b}</span>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title={nextTier ? `Unlock ${nextTier.label}` : "Highest Tier Reached"} icon={Zap}>
          {nextTier ? (
            <>
              <p className="px-5 pt-4 text-xs text-muted">{nextTier.requirement} to reach this tier.</p>
              <ul className="divide-y divide-surface-hover mt-2">
                {nextTier.benefits.map((b) => (
                  <li key={b} className="flex items-center gap-2.5 px-5 py-3.5 opacity-70">
                    <Percent size={14} className="text-subtle shrink-0" />
                    <span className="text-sm text-muted">{b}</span>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="px-5 py-6 text-sm text-muted text-center">
              You&apos;ve reached Top Curator — the highest tier in the program. Keep curating to stay there.
            </p>
          )}
        </SectionCard>
      </div>
    </div>
  );
}

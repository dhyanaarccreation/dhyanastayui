"use client";

import { useState } from "react";
import {
  Wallet,
  IndianRupee,
  ArrowDown,
  Layers,
  Send,
  FileText,
  Building2,
  Copy,
  Ticket,
} from "lucide-react";
import { PageHeader, SectionCard, StatGrid, StatusPill } from "@/app/components/DashboardUI";
import {
  coreMetrics,
  commissionRule,
  earningsHistory,
  payoutHistory,
  minimumPayoutThreshold,
  influencerProfile,
  itineraryBookings,
} from "@/lib/influencer-data";

// ============================================
// INFLUENCER — Earnings
// Revenue → commission → pending → paid funnel,
// the (view-only) commission rule, earnings
// history, and payout requests.
// ============================================

const earningsTone = (s: string) => (s === "Paid" ? "sage" : s === "Approved" ? "sage" : s === "Pending" ? "primary" : "muted");
const payoutTone = (s: string) => (s === "Paid" ? "sage" : s === "Processing" ? "primary" : s === "Failed" ? "terracotta" : "muted");

export default function InfluencerEarningsPage() {
  const [requested, setRequested] = useState(false);
  const canRequest = coreMetrics.pendingPayout >= minimumPayoutThreshold;

  return (
    <div className="space-y-8 pb-12 animate-fade-in">
      <PageHeader
        title="Earnings"
        subtitle="Your commission funnel, payout history, and the rule that decides your rate."
      />

      <StatGrid
        stats={[
          { label: "Total Earnings", value: `₹${coreMetrics.commissionEarned.toLocaleString("en-IN")}`, delta: "lifetime", icon: Wallet },
          { label: "Pending Balance", value: `₹${coreMetrics.pendingCommission.toLocaleString("en-IN")}`, delta: "awaiting validation", icon: ArrowDown },
          { label: "Approved Balance", value: `₹${coreMetrics.approvedCommission.toLocaleString("en-IN")}`, delta: "ready for payout", icon: Layers },
          { label: "Paid Balance", value: `₹${coreMetrics.paidCommission.toLocaleString("en-IN")}`, delta: "lifetime", icon: IndianRupee },
        ]}
      />

      {/* Funnel visualization */}
      <SectionCard title="Revenue → Commission Funnel" icon={IndianRupee}>
        <div className="p-5 grid sm:grid-cols-4 gap-3 text-center">
          {[
            { label: "Booking Revenue", value: `₹${(coreMetrics.revenueGenerated / 100000).toFixed(1)}L` },
            { label: "Commission", value: `₹${coreMetrics.commissionEarned.toLocaleString("en-IN")}` },
            { label: "Approved", value: `₹${coreMetrics.approvedCommission.toLocaleString("en-IN")}` },
            { label: "Paid", value: `₹${coreMetrics.paidCommission.toLocaleString("en-IN")}` },
          ].map((s, i, arr) => (
            <div key={s.label} className="relative rounded-xl bg-background border border-border p-4">
              <p className="text-lg font-bold text-foreground tabular-nums">{s.value}</p>
              <p className="text-[11px] text-subtle mt-1">{s.label}</p>
              {i < arr.length - 1 && (
                <span className="hidden sm:flex absolute top-1/2 -right-3.5 -translate-y-1/2 text-subtle">→</span>
              )}
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Your Commission Rule" icon={Layers}>
        <div className="px-5 pt-4">
          <StatusPill tone="primary">View only — set by Dhyana Stays</StatusPill>
          <p className="text-sm text-foreground mt-3">{commissionRule.model}: {commissionRule.description}</p>
        </div>
        <ul className="divide-y divide-surface-hover mt-3">
          {commissionRule.tiers.map((t) => (
            <li key={t.range} className={`flex items-center justify-between gap-3 px-5 py-3 ${t.range === commissionRule.currentTier ? "bg-primary/5" : ""}`}>
              <span className={`text-sm ${t.range === commissionRule.currentTier ? "text-foreground font-semibold" : "text-muted"}`}>
                {t.range}
              </span>
              <span className="flex items-center gap-2">
                {t.range === commissionRule.currentTier && <StatusPill tone="sage">Current tier</StatusPill>}
                <span className="text-sm font-semibold text-foreground">{t.rate}</span>
              </span>
            </li>
          ))}
        </ul>
      </SectionCard>

      {/* Two earning paths: direct promo-code clicks vs. copied itineraries */}
      <SectionCard title="How You're Earning" icon={Copy}>
        <div className="px-5 pt-4 grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-border bg-background p-4">
            <p className="text-xs font-semibold text-foreground flex items-center gap-1.5"><Ticket size={13} className="text-sage" /> Direct promo code</p>
            <p className="text-[11px] text-muted mt-1">Traveller clicks your code or link and books directly.</p>
            <p className="text-lg font-bold text-foreground mt-2 tabular-nums">
              ₹{(coreMetrics.commissionEarned - itineraryBookings.reduce((s, b) => s + Number(b.commission.replace(/[₹,]/g, "")), 0)).toLocaleString("en-IN")}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-background p-4">
            <p className="text-xs font-semibold text-foreground flex items-center gap-1.5"><Copy size={13} className="text-primary" /> Copied itinerary</p>
            <p className="text-[11px] text-muted mt-1">Traveller copies, customises and books your itinerary.</p>
            <p className="text-lg font-bold text-foreground mt-2 tabular-nums">
              ₹{itineraryBookings.reduce((s, b) => s + Number(b.commission.replace(/[₹,]/g, "")), 0).toLocaleString("en-IN")}
            </p>
          </div>
        </div>
        <ul className="divide-y divide-surface-hover mt-4">
          {itineraryBookings.map((b) => (
            <li key={b.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
              <div className="min-w-0">
                <p className="text-sm text-foreground truncate">{b.itinerary}</p>
                <p className="text-xs text-subtle mt-0.5">{b.travellerNote} · {b.date}</p>
              </div>
              <div className="flex items-center gap-2.5 shrink-0">
                <span className="text-xs text-muted">{b.bookingValue}</span>
                <span className="text-sm font-semibold text-sage tabular-nums">{b.commission}</span>
              </div>
            </li>
          ))}
        </ul>
        <p className="px-5 py-3 text-[11px] text-subtle border-t border-surface-hover">
          Your itineraries keep earning long after you publish them — manage them from My Collection.
        </p>
      </SectionCard>

      <div className="grid lg:grid-cols-2 gap-6">
        <SectionCard title="Commission History" icon={FileText}>
          <ul className="divide-y divide-surface-hover">
            {earningsHistory.map((e) => (
              <li key={e.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
                <div className="min-w-0">
                  <p className="text-sm text-foreground truncate">{e.label}</p>
                  <p className="text-xs text-subtle">{e.date}</p>
                </div>
                <div className="flex items-center gap-2.5 shrink-0">
                  <span className="text-sm font-semibold text-foreground tabular-nums">{e.amount}</span>
                  <StatusPill tone={earningsTone(e.status)}>{e.status}</StatusPill>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Payouts" icon={Send}>
          <div id="payout" className="px-5 pt-4 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 scroll-mt-24">
            <div className="flex items-center gap-2.5 text-xs text-muted">
              <Building2 size={13} className="text-subtle shrink-0" />
              {influencerProfile.payoutAccount.bank} ···· {influencerProfile.payoutAccount.accountMasked.replace("···· ", "")}
              {influencerProfile.payoutAccount.verified && <StatusPill tone="sage">Verified</StatusPill>}
            </div>
            <button
              onClick={() => setRequested(true)}
              disabled={!canRequest || requested}
              className="px-4 py-2 text-xs font-semibold bg-primary text-primary-foreground rounded-full hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
            >
              {requested ? "Requested" : "Request Payout"}
            </button>
          </div>
          {!canRequest && (
            <p className="px-5 pb-3 text-[11px] text-subtle">
              Minimum payout threshold is ₹{minimumPayoutThreshold.toLocaleString("en-IN")}.
            </p>
          )}
          <ul className="divide-y divide-surface-hover">
            {payoutHistory.map((p) => (
              <li key={p.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground">{p.amount}</p>
                  <p className="text-xs text-subtle">Requested {p.requestedOn}</p>
                </div>
                <StatusPill tone={payoutTone(p.status)}>{p.status}</StatusPill>
              </li>
            ))}
          </ul>
          <p className="px-5 py-3 text-[11px] text-subtle border-t border-surface-hover">
            Tax documents and payment invoices are available for download once a payout is marked Paid.
          </p>
        </SectionCard>
      </div>
    </div>
  );
}

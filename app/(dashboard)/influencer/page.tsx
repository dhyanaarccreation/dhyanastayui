"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Eye,
  MousePointerClick,
  Users,
  CalendarCheck,
  TrendingUp,
  IndianRupee,
  Wallet,
  Clock,
  CheckCircle2,
  Sprout,
  Copy,
  Check,
  Send,
  Image as ImageIcon,
  ArrowUpRight,
} from "lucide-react";
import { PageHeader, SectionCard, StatusPill } from "@/app/components/DashboardUI";
import { coreMetrics, promoCode, referralLinks, topContent, campaigns } from "@/lib/influencer-data";

// ============================================
// INFLUENCER — Dashboard (performance overview)
// The five questions this screen must answer:
// reach, funnel-through, bookings, revenue, earnings.
// ============================================

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard?.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-primary text-primary-foreground rounded-full hover:bg-primary-hover transition-colors shrink-0"
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export default function InfluencerDashboardPage() {
  const activeCampaigns = campaigns.filter((c) => c.status === "Active" || c.status === "Accepted");

  return (
    <div className="space-y-8 pb-12 animate-fade-in">
      <PageHeader
        title="Influencer Dashboard"
        subtitle="Content → Reach → Clicks → Leads → Promo Code Uses → Bookings → Revenue → Commission → Payout."
      />

      {/* Core funnel metrics — the ten numbers this screen must show */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: "Total Reach", value: coreMetrics.totalReach.toLocaleString("en-IN"), icon: Eye },
          { label: "Clicks", value: coreMetrics.clicks.toLocaleString("en-IN"), icon: MousePointerClick },
          { label: "Leads", value: coreMetrics.leads.toLocaleString("en-IN"), icon: Users },
          { label: "Bookings", value: String(coreMetrics.bookings), icon: CalendarCheck },
          { label: "Conversion Rate", value: `${coreMetrics.conversionRate}%`, icon: TrendingUp },
          { label: "Revenue Generated", value: `₹${(coreMetrics.revenueGenerated / 100000).toFixed(1)}L`, icon: IndianRupee },
          { label: "Commission Earned", value: `₹${coreMetrics.commissionEarned.toLocaleString("en-IN")}`, icon: Wallet },
          { label: "Pending Payout", value: `₹${coreMetrics.pendingPayout.toLocaleString("en-IN")}`, icon: Clock },
          { label: "Paid Payout", value: `₹${coreMetrics.paidPayout.toLocaleString("en-IN")}`, icon: CheckCircle2 },
          { label: "Seed Balls Generated", value: coreMetrics.seedBallsGenerated.toLocaleString("en-IN"), icon: Sprout },
        ].map((s) => (
          <div key={s.label} className="bg-surface border border-border rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <s.icon size={15} className="text-primary" />
            </div>
            <p className="text-xl font-bold text-foreground mt-2 tabular-nums">{s.value}</p>
            <p className="text-[11px] text-subtle mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <SectionCard title="Quick Actions" icon={Send}>
        <div className="p-5 flex flex-wrap gap-2.5">
          <Link href="/influencer/promo" className="px-4 py-2 text-xs font-semibold bg-primary text-primary-foreground rounded-full hover:bg-primary-hover transition-colors">
            Copy Referral Link
          </Link>
          <Link href="/influencer/promo" className="px-4 py-2 text-xs font-semibold bg-surface border border-sage text-sage rounded-full hover:bg-sage hover:text-white transition-colors">
            Copy Promo Code
          </Link>
          <Link href="/influencer/campaigns" className="px-4 py-2 text-xs font-medium border border-border text-muted rounded-full hover:text-foreground transition-colors">
            View Campaigns
          </Link>
          <Link href="/influencer/content" className="px-4 py-2 text-xs font-medium border border-border text-muted rounded-full hover:text-foreground transition-colors">
            Submit Content
          </Link>
          <Link href="/influencer/earnings" className="px-4 py-2 text-xs font-medium border border-border text-muted rounded-full hover:text-foreground transition-colors">
            View Earnings
          </Link>
          <Link href="/influencer/earnings#payout" className="px-4 py-2 text-xs font-medium border border-border text-muted rounded-full hover:text-foreground transition-colors">
            Request Payout
          </Link>
        </div>
      </SectionCard>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Promo code + referral quick copy */}
        <SectionCard title="Your Promo Code & Link" icon={Copy}>
          <div className="p-5 space-y-3">
            <div className="flex items-center justify-between gap-3 rounded-xl border border-dashed border-border bg-background px-4 py-3">
              <span className="font-mono text-sm font-bold text-foreground">{promoCode.code}</span>
              <CopyButton value={promoCode.code} />
            </div>
            <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background px-4 py-3">
              <span className="text-xs text-muted truncate">{referralLinks[0].url}</span>
              <CopyButton value={referralLinks[0].url} />
            </div>
            <p className="text-[11px] text-subtle">{promoCode.uses} uses · {promoCode.bookingConversions} bookings · {promoCode.revenueGenerated} generated</p>
          </div>
        </SectionCard>

        {/* Active campaigns snapshot */}
        <SectionCard title="Active Campaigns" icon={ImageIcon} action={{ label: "View all", href: "/influencer/campaigns" }}>
          <ul className="divide-y divide-surface-hover">
            {activeCampaigns.map((c) => (
              <li key={c.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{c.name}</p>
                  <p className="text-xs text-subtle mt-0.5">Deadline {c.deadline}</p>
                </div>
                <StatusPill tone={c.status === "Active" ? "sage" : "primary"}>{c.status}</StatusPill>
              </li>
            ))}
            {activeCampaigns.length === 0 && <li className="px-5 py-6 text-center text-sm text-subtle">No active campaigns.</li>}
          </ul>
        </SectionCard>
      </div>

      {/* Top performing content */}
      <SectionCard title="Top-Performing Content" icon={TrendingUp} action={{ label: "Full analytics", href: "/influencer/analytics" }}>
        <ul className="divide-y divide-surface-hover">
          {topContent.map((c) => (
            <li key={c.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
              <div className="min-w-0">
                <p className="text-sm text-foreground truncate">{c.title}</p>
                <p className="text-xs text-subtle">{c.platform}</p>
              </div>
              <span className="text-xs text-muted tabular-nums shrink-0">{c.reach} reach · {c.clicks} clicks</span>
            </li>
          ))}
        </ul>
        <div className="px-5 py-3 border-t border-surface-hover">
          <Link href="/influencer/analytics" className="text-xs text-primary hover:underline flex items-center gap-1 w-fit">
            See full audience &amp; performance analytics <ArrowUpRight size={12} />
          </Link>
        </div>
      </SectionCard>
    </div>
  );
}

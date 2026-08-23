"use client";

import { useState } from "react";
import {
  Megaphone,
  Image,
  Tag,
  Share2,
  Bell,
  TrendingUp,
  Users,
  MousePointerClick,
  Send,
} from "lucide-react";
import { PageHeader, SectionCard, StatGrid, StatusPill, Toggle } from "@/app/components/DashboardUI";

// ============================================
// SUPER ADMIN — Marketing & Notifications
// Campaigns, banners, coupons, referrals/affiliates
// and every outbound communication channel.
// ============================================

const initialCampaigns = [
  { id: "c1", name: "Monsoon Wellness Week", type: "Seasonal", budget: "₹1.2L", performance: "3.8% CVR", on: true },
  { id: "c2", name: "Weekend Escapes 15%", type: "Discount", budget: "₹40K", performance: "5.1% CVR", on: true },
  { id: "c3", name: "Founders Circle Launch", type: "Promotional", budget: "₹80K", performance: "2.4% CVR", on: false },
];

const initialBanners = [
  { id: "b1", slot: "Homepage Spotlight", content: "Nila Wellness Retreat", on: true },
  { id: "b2", slot: "Stays Top Banner", content: "Dhyana Curated Stays", on: true },
  { id: "b3", slot: "Booking Confirmation Popup", content: "Refer & earn ₹500", on: false },
];

const initialCoupons = [
  { id: "cp1", code: "MONSOON20", uses: 842, discount: "20% off" },
  { id: "cp2", code: "WEEKEND500", uses: 1204, discount: "₹500 off" },
  { id: "cp3", code: "FOODIE15", uses: 316, discount: "15% off" },
];

const affiliates = [
  { id: "a1", name: "Riya Malhotra", type: "Influencer", conversions: 164, earnings: "₹38,200" },
  { id: "a2", name: "TravelTales Blog", type: "Affiliate", conversions: 89, earnings: "₹19,600" },
  { id: "a3", name: "Referral Program", type: "Referral", conversions: 512, earnings: "₹2.56L payout" },
];

const notificationChannels = [
  { id: "n1", label: "Email notifications", sub: "Booking, payment & campaign emails", on: true },
  { id: "n2", label: "SMS notifications", sub: "Critical booking updates only", on: true },
  { id: "n3", label: "WhatsApp messages", sub: "Concierge, reminders & campaign announcements", on: true },
  { id: "n4", label: "Push notifications", sub: "App & web push for all users", on: true },
];

export default function SuperAdminMarketingPage() {
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [banners, setBanners] = useState(initialBanners);
  const [channels, setChannels] = useState(notificationChannels);
  const [broadcast, setBroadcast] = useState("");
  const [announcementOn, setAnnouncementOn] = useState(true);

  const toggleCampaign = (id: string) => setCampaigns((p) => p.map((c) => (c.id === id ? { ...c, on: !c.on } : c)));
  const toggleBanner = (id: string) => setBanners((p) => p.map((b) => (b.id === id ? { ...b, on: !b.on } : b)));
  const toggleChannel = (id: string) => setChannels((p) => p.map((c) => (c.id === id ? { ...c, on: !c.on } : c)));

  return (
    <div className="space-y-4 pb-12 animate-fade-in">
      <PageHeader
        title="Marketing & Notifications"
        subtitle="Campaigns, banners, coupons, affiliates and every outbound channel — one control room."
      />

      <StatGrid
        stats={[
          { label: "Active Campaigns", value: "6", delta: "2 seasonal", icon: Megaphone },
          { label: "Leads This Month", value: "1,240", delta: "+22% MoM", icon: Users },
          { label: "Conversion Rate", value: "3.8%", delta: "+0.4 pts", icon: MousePointerClick },
          { label: "Coupon Redemptions", value: "2,362", delta: "MONSOON20 top", icon: Tag },
        ]}
      />

      <SectionCard title="Campaigns" icon={Megaphone}>
        <ul className="divide-y divide-surface-hover">
          {campaigns.map((c) => (
            <li key={c.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{c.name}</p>
                <p className="text-xs text-subtle mt-0.5">{c.type} · Budget {c.budget} · {c.performance}</p>
              </div>
              <button onClick={() => toggleCampaign(c.id)} aria-label={`Toggle ${c.name}`} className="shrink-0">
                <Toggle on={c.on} />
              </button>
            </li>
          ))}
        </ul>
      </SectionCard>

      <div className="grid lg:grid-cols-2 gap-6">
        <SectionCard title="Banners & Landing Pages" icon={Image}>
          <ul className="divide-y divide-surface-hover">
            {banners.map((b) => (
              <li key={b.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
                <div className="min-w-0">
                  <p className="text-sm text-foreground truncate">{b.slot}</p>
                  <p className="text-xs text-subtle">{b.content}</p>
                </div>
                <button onClick={() => toggleBanner(b.id)} aria-label={`Toggle ${b.slot}`} className="shrink-0">
                  <Toggle on={b.on} />
                </button>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Coupon Management" icon={Tag}>
          <ul className="divide-y divide-surface-hover">
            {initialCoupons.map((c) => (
              <li key={c.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
                <div className="min-w-0">
                  <span className="font-mono text-sm font-bold text-foreground bg-surface-hover border border-dashed border-border px-2.5 py-1 rounded-lg">
                    {c.code}
                  </span>
                  <span className="text-xs text-subtle ml-2">{c.discount}</span>
                </div>
                <span className="text-sm font-semibold text-foreground tabular-nums shrink-0">{c.uses} uses</span>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <SectionCard title="Referrals & Affiliates" icon={Share2}>
        <ul className="divide-y divide-surface-hover">
          {affiliates.map((a) => (
            <li key={a.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{a.name}</p>
                <p className="text-xs text-subtle mt-0.5">{a.conversions} conversions</p>
              </div>
              <div className="flex items-center gap-2.5 shrink-0">
                <StatusPill tone="primary">{a.type}</StatusPill>
                <span className="text-sm font-semibold text-foreground tabular-nums">{a.earnings}</span>
              </div>
            </li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title="Notification Channels" icon={Bell}>
        <ul className="divide-y divide-surface-hover">
          {channels.map((c) => (
            <li key={c.id} className="flex items-center justify-between gap-4 px-5 py-4">
              <div>
                <p className="text-sm font-medium text-foreground">{c.label}</p>
                <p className="text-xs text-muted mt-0.5">{c.sub}</p>
              </div>
              <button onClick={() => toggleChannel(c.id)} aria-label={`Toggle ${c.label}`}>
                <Toggle on={c.on} />
              </button>
            </li>
          ))}
        </ul>

        {/* Platform-wide announcement banner */}
        <div className="mx-5 my-5 rounded-xl border border-border bg-background p-4">
          <div className="flex items-center justify-between gap-4 mb-3">
            <p className="text-sm font-medium text-foreground">Platform-wide announcement banner</p>
            <button onClick={() => setAnnouncementOn((v) => !v)} aria-label="Toggle announcement banner">
              <Toggle on={announcementOn} />
            </button>
          </div>
          <p className="text-xs text-muted">
            {announcementOn ? "Live: \"Monsoon sale — 20% off wellness retreats, ends Aug 31.\"" : "No announcement currently live."}
          </p>
        </div>

        {/* Quick broadcast composer */}
        <div className="mx-5 mb-5 flex flex-col sm:flex-row gap-2">
          <input
            value={broadcast}
            onChange={(e) => setBroadcast(e.target.value)}
            placeholder="Compose a booking reminder, payment reminder or campaign announcement…"
            className="flex-1 text-sm bg-background border border-border rounded-xl px-3.5 py-2.5 text-foreground placeholder-subtle focus:outline-none focus:border-primary transition-colors"
          />
          <button
            disabled={!broadcast.trim()}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold bg-primary text-primary-foreground rounded-xl hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
          >
            <Send size={13} /> Send Broadcast
          </button>
        </div>
      </SectionCard>

      <SectionCard title="Marketing Analytics" icon={TrendingUp}>
        <div className="px-5 py-4 grid sm:grid-cols-3 gap-4 text-xs">
          <div className="rounded-xl bg-background border border-border p-4">
            <p className="text-subtle">Email open rate</p>
            <p className="text-foreground font-semibold mt-1">42.6%</p>
          </div>
          <div className="rounded-xl bg-background border border-border p-4">
            <p className="text-subtle">WhatsApp response rate</p>
            <p className="text-foreground font-semibold mt-1">68.1%</p>
          </div>
          <div className="rounded-xl bg-background border border-border p-4">
            <p className="text-subtle">Push CTR</p>
            <p className="text-foreground font-semibold mt-1">9.3%</p>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

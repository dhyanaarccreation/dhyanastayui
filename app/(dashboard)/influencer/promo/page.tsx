"use client";

import { useState } from "react";
import {
  Ticket,
  Link2,
  QrCode,
  Copy,
  Check,
  Download,
  MousePointerClick,
  Percent,
} from "lucide-react";
import { PageHeader, SectionCard, StatusPill } from "@/app/components/DashboardUI";
import { promoCode, referralLinks } from "@/lib/influencer-data";

// ============================================
// INFLUENCER — Promo & Links
// Unique promo code, referral & tracking links,
// and a QR code — all read-only (the influencer
// can't edit commission rules or mint new codes).
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
      aria-label="Copy to clipboard"
      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-primary text-primary-foreground rounded-full hover:bg-primary-hover transition-colors shrink-0"
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export default function InfluencerPromoPage() {
  return (
    <div className="space-y-4 pb-12 animate-fade-in">
      <PageHeader
        title="Promo & Links"
        subtitle="Your unique promo code, tracking links and QR — every click and booking is attributed automatically."
      />

      <SectionCard title="Your Promo Code" icon={Ticket}>
        <div className="p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-dashed border-primary/40 bg-primary/5 px-5 py-4">
            <div>
              <p className="font-mono text-xl font-bold text-foreground">{promoCode.code}</p>
              <p className="text-xs text-muted mt-1">{promoCode.discount} · valid {promoCode.validity}</p>
            </div>
            <CopyButton value={promoCode.code} />
          </div>
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="rounded-xl bg-background border border-border p-3.5 text-center">
              <p className="text-lg font-bold text-foreground tabular-nums">{promoCode.uses}</p>
              <p className="text-[11px] text-subtle mt-0.5">Code uses</p>
            </div>
            <div className="rounded-xl bg-background border border-border p-3.5 text-center">
              <p className="text-lg font-bold text-foreground tabular-nums">{promoCode.bookingConversions}</p>
              <p className="text-[11px] text-subtle mt-0.5">Bookings</p>
            </div>
            <div className="rounded-xl bg-background border border-border p-3.5 text-center">
              <p className="text-lg font-bold text-foreground tabular-nums">{promoCode.revenueGenerated}</p>
              <p className="text-[11px] text-subtle mt-0.5">Revenue</p>
            </div>
          </div>
          <p className="text-[11px] text-subtle mt-4 flex items-center gap-1.5">
            <Percent size={11} className="shrink-0" /> Commission: {promoCode.commissionRate} · {promoCode.campaign} — code and commission rules are set by Dhyana Stays and can&apos;t be edited here.
          </p>
        </div>
      </SectionCard>

      <SectionCard title="Tracking Links" icon={Link2}>
        <ul className="divide-y divide-surface-hover">
          {referralLinks.map((l) => (
            <li key={l.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{l.label}</p>
                <p className="text-xs text-subtle mt-0.5 truncate font-mono">{l.url}</p>
                <p className="text-[11px] text-subtle mt-1 flex items-center gap-1">
                  <MousePointerClick size={10} /> {l.clicks.toLocaleString("en-IN")} clicks · {l.conversions} conversions
                </p>
              </div>
              <CopyButton value={l.url} />
            </li>
          ))}
        </ul>
        <p className="px-5 py-3 text-[11px] text-subtle border-t border-surface-hover">
          Property, experience, destination and campaign links are generated automatically when you're added to a campaign.
        </p>
      </SectionCard>

      <SectionCard title="QR Code" icon={QrCode}>
        <div className="p-5 flex flex-col sm:flex-row items-center gap-5">
          <div className="w-32 h-32 rounded-2xl bg-surface-hover border border-border flex items-center justify-center shrink-0">
            <QrCode size={64} className="text-muted" />
          </div>
          <div>
            <p className="text-sm text-foreground font-medium">Scan to open your referral link</p>
            <p className="text-xs text-muted mt-1 max-w-sm">
              Use this on printed material, story stickers or in-person meetups — every scan is tracked back to your account.
            </p>
            <button className="mt-3 flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-primary text-primary-foreground rounded-full hover:bg-primary-hover transition-colors">
              <Download size={13} /> Download QR
            </button>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

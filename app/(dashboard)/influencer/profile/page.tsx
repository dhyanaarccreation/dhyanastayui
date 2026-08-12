"use client";

import { useState } from "react";
import {
  User,
  BadgeCheck,
  Camera,
  PlayCircle,
  Mail,
  Phone,
  MapPin,
  Building2,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { PageHeader, SectionCard, StatusPill, Toggle } from "@/app/components/DashboardUI";
import { influencerProfile } from "@/lib/influencer-data";

// ============================================
// INFLUENCER — Profile
// Public creator information, verification
// status, contact & payout details, and basic
// account security.
// ============================================

export default function InfluencerProfilePage() {
  const [twoFactor, setTwoFactor] = useState(true);

  return (
    <div className="space-y-8 pb-12 animate-fade-in">
      <PageHeader
        title="Profile"
        subtitle="Your public creator information, verification status, and account details."
      />

      <SectionCard title="Creator Information" icon={User}>
        <div className="p-5 flex items-start gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={influencerProfile.avatar} alt={influencerProfile.name} className="w-16 h-16 rounded-full object-cover shrink-0" />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-base font-semibold text-foreground">{influencerProfile.name}</p>
              <StatusPill tone="sage"><BadgeCheck size={10} /> {influencerProfile.verificationStatus}</StatusPill>
            </div>
            <p className="text-sm text-primary">{influencerProfile.creatorName}</p>
            <p className="text-sm text-muted mt-2 leading-relaxed">{influencerProfile.bio}</p>
          </div>
        </div>

        <div className="px-5 pb-5 grid sm:grid-cols-2 gap-3">
          <div className="rounded-xl bg-background border border-border p-3.5">
            <p className="text-[11px] text-subtle flex items-center gap-1.5"><MapPin size={11} /> Location</p>
            <p className="text-sm text-foreground mt-1">{influencerProfile.location}</p>
          </div>
          <div className="rounded-xl bg-background border border-border p-3.5">
            <p className="text-[11px] text-subtle">Audience size</p>
            <p className="text-sm text-foreground mt-1">{influencerProfile.audienceSize}</p>
          </div>
          <div className="rounded-xl bg-background border border-border p-3.5">
            <p className="text-[11px] text-subtle">Audience location</p>
            <p className="text-sm text-foreground mt-1">{influencerProfile.audienceLocation}</p>
          </div>
          <div className="rounded-xl bg-background border border-border p-3.5">
            <p className="text-[11px] text-subtle">Languages</p>
            <p className="text-sm text-foreground mt-1">{influencerProfile.languages.join(", ")}</p>
          </div>
        </div>

        <div className="px-5 pb-5">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-subtle mb-2">Content categories</p>
          <div className="flex flex-wrap gap-2">
            {influencerProfile.contentCategories.map((c) => (
              <span key={c} className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium">{c}</span>
            ))}
          </div>
        </div>
      </SectionCard>

      <div className="grid lg:grid-cols-2 gap-6">
        <SectionCard title="Social Profiles" icon={Camera}>
          <ul className="divide-y divide-surface-hover">
            {influencerProfile.socials.map((s) => (
              <li key={s.platform} className="flex items-center justify-between gap-3 px-5 py-3.5">
                <div className="flex items-center gap-2.5">
                  {s.platform === "Instagram" ? <Camera size={15} className="text-primary" /> : <PlayCircle size={15} className="text-primary" />}
                  <div>
                    <p className="text-sm text-foreground">{s.platform}</p>
                    <p className="text-xs text-subtle">{s.handle}</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-foreground tabular-nums">{s.followers}</span>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Contact & Payout Information" icon={Building2}>
          <div className="divide-y divide-surface-hover">
            <div className="flex items-center gap-2.5 px-5 py-3.5">
              <Mail size={14} className="text-subtle shrink-0" />
              <span className="text-sm text-foreground">{influencerProfile.contact.email}</span>
            </div>
            <div className="flex items-center gap-2.5 px-5 py-3.5">
              <Phone size={14} className="text-subtle shrink-0" />
              <span className="text-sm text-foreground">{influencerProfile.contact.phone}</span>
            </div>
            <div className="flex items-center justify-between gap-3 px-5 py-3.5">
              <div className="flex items-center gap-2.5">
                <Building2 size={14} className="text-subtle shrink-0" />
                <span className="text-sm text-foreground">
                  {influencerProfile.payoutAccount.bank} {influencerProfile.payoutAccount.accountMasked}
                </span>
              </div>
              {influencerProfile.payoutAccount.verified && <StatusPill tone="sage">Verified</StatusPill>}
            </div>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Verification" icon={ShieldCheck}>
        <div className="px-5 py-4">
          <div className="flex items-center gap-2 mb-3">
            {["Applied", "Under Review", "Approved", "Active"].map((step, i, arr) => {
              const currentIdx = arr.indexOf(influencerProfile.verificationStatus);
              const done = i <= currentIdx;
              return (
                <div key={step} className="flex items-center flex-1">
                  <div className="flex flex-col items-center gap-1.5 flex-1">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${done ? "bg-sage text-white" : "bg-surface-hover text-subtle"}`}>
                      {done ? <BadgeCheck size={12} /> : i + 1}
                    </span>
                    <span className={`text-[10px] text-center ${done ? "text-foreground font-medium" : "text-subtle"}`}>{step}</span>
                  </div>
                  {i < arr.length - 1 && <span className={`h-px flex-1 -mt-4 ${i < currentIdx ? "bg-sage" : "bg-border"}`} />}
                </div>
              );
            })}
          </div>
          <p className="text-xs text-muted mt-2">
            Identity, audience and payment information were verified on account approval — no further action needed.
          </p>
        </div>
      </SectionCard>

      <SectionCard title="Account Security" icon={Smartphone}>
        <div className="divide-y divide-surface-hover">
          <div className="flex items-center justify-between gap-4 px-5 py-4">
            <div>
              <p className="text-sm font-medium text-foreground">Two-factor authentication</p>
              <p className="text-xs text-muted mt-0.5">Require an OTP at login</p>
            </div>
            <button onClick={() => setTwoFactor((v) => !v)} aria-label="Toggle two-factor authentication">
              <Toggle on={twoFactor} />
            </button>
          </div>
          <div className="flex items-center justify-between gap-4 px-5 py-4">
            <div>
              <p className="text-sm font-medium text-foreground">Active sessions</p>
              <p className="text-xs text-muted mt-0.5">1 device · Chrome on Windows · Bengaluru</p>
            </div>
            <button className="text-xs text-terracotta hover:underline">Sign out</button>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

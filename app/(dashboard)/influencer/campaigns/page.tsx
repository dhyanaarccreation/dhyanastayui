"use client";

import { useState } from "react";
import {
  Megaphone,
  CalendarDays,
  Home,
  Gift,
  FileText,
  Clock,
  MapPin,
} from "lucide-react";
import { PageHeader, SectionCard, StatusPill } from "@/app/components/DashboardUI";
import { campaigns as initialCampaigns, type CampaignStatus, calendarEvents, propertyVisits } from "@/lib/influencer-data";

// ============================================
// INFLUENCER — Campaigns
// Available / invited / accepted / active /
// completed campaigns, applications, upcoming
// deadlines and hosted-stay property visits.
// ============================================

const tabs: { key: CampaignStatus | "All"; label: string }[] = [
  { key: "All", label: "All" },
  { key: "Available", label: "Available" },
  { key: "Invited", label: "Invited" },
  { key: "Accepted", label: "Accepted" },
  { key: "Active", label: "Active" },
  { key: "Completed", label: "Completed" },
];

const statusTone = (s: CampaignStatus) =>
  s === "Active" ? "sage" : s === "Invited" ? "primary" : s === "Completed" ? "muted" : s === "Accepted" ? "sage" : "primary";

export default function InfluencerCampaignsPage() {
  const [tab, setTab] = useState<CampaignStatus | "All">("All");
  const [campaigns, setCampaigns] = useState(initialCampaigns);

  const applyToCampaign = (id: string) =>
    setCampaigns((prev) => prev.map((c) => (c.id === id ? { ...c, status: "Accepted" as CampaignStatus } : c)));

  const visible = tab === "All" ? campaigns : campaigns.filter((c) => c.status === tab);

  return (
    <div className="space-y-8 pb-12 animate-fade-in">
      <PageHeader
        title="Campaigns"
        subtitle="Browse invitations, apply for open campaigns, and track everything through to completion."
      />

      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
              tab === t.key ? "bg-primary text-primary-foreground border-primary" : "bg-surface border-border text-muted hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <SectionCard title="Campaigns" icon={Megaphone}>
        <ul className="divide-y divide-surface-hover">
          {visible.map((c) => (
            <li key={c.id} className="px-5 py-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground">{c.name}</p>
                  <p className="text-xs text-muted mt-1 leading-relaxed">{c.brief}</p>
                </div>
                <StatusPill tone={statusTone(c.status)}>{c.status}</StatusPill>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-[11px] text-subtle">
                <span className="flex items-center gap-1"><Home size={11} /> {c.targetProperty}</span>
                <span className="flex items-center gap-1"><Gift size={11} /> {c.offer}</span>
                <span className="flex items-center gap-1"><FileText size={11} /> {c.requiredContent}</span>
                <span className="flex items-center gap-1"><CalendarDays size={11} /> Deadline {c.deadline}</span>
                {c.performance && <span className="text-sage">{c.performance}</span>}
              </div>
              {c.status === "Available" && (
                <button
                  onClick={() => applyToCampaign(c.id)}
                  className="mt-3 px-4 py-1.5 text-xs font-semibold bg-primary text-primary-foreground rounded-full hover:bg-primary-hover transition-colors"
                >
                  Apply
                </button>
              )}
              {c.status === "Invited" && (
                <button
                  onClick={() => applyToCampaign(c.id)}
                  className="mt-3 px-4 py-1.5 text-xs font-semibold bg-sage text-white rounded-full hover:opacity-90 transition-opacity"
                >
                  Accept Invitation
                </button>
              )}
            </li>
          ))}
          {visible.length === 0 && <li className="px-5 py-6 text-center text-sm text-subtle">No campaigns in this view.</li>}
        </ul>
      </SectionCard>

      <div className="grid lg:grid-cols-2 gap-6">
        <SectionCard title="Upcoming Deadlines" icon={Clock}>
          <ul className="divide-y divide-surface-hover">
            {calendarEvents.map((e) => (
              <li key={e.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
                <div className="min-w-0">
                  <p className="text-sm text-foreground truncate">{e.label}</p>
                  <p className="text-xs text-subtle">{e.date}</p>
                </div>
                <StatusPill tone="muted">{e.type}</StatusPill>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Property Visits & Hosted Stays" icon={MapPin}>
          <ul className="divide-y divide-surface-hover">
            {propertyVisits.map((v) => (
              <li key={v.id} className="px-5 py-3.5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-foreground truncate">{v.property}</p>
                  <StatusPill tone="sage">{v.status}</StatusPill>
                </div>
                <p className="text-xs text-subtle mt-1">{v.campaign}</p>
                <p className="text-xs text-muted mt-1">
                  {v.checkIn} – {v.checkOut} · Host: {v.hostContact}
                </p>
                <p className="text-[11px] text-subtle mt-1">{v.contentRequirement}</p>
              </li>
            ))}
            {propertyVisits.length === 0 && <li className="px-5 py-6 text-center text-sm text-subtle">No hosted stays scheduled.</li>}
          </ul>
        </SectionCard>
      </div>
    </div>
  );
}

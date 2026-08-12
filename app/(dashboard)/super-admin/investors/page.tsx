"use client";

import { useState } from "react";
import {
  Briefcase,
  TrendingUp,
  FileText,
  LogOut,
  Check,
  X,
  BarChart3,
  Users,
  Repeat,
  MapPin,
} from "lucide-react";
import { PageHeader, SectionCard, StatGrid, StatusPill } from "@/app/components/DashboardUI";

// ============================================
// SUPER ADMIN — Investors & Analytics
// Investment approvals, payouts & agreements, and
// the platform's core business-intelligence view.
// ============================================

const pendingInvestments = [
  { id: "iv1", investor: "Shruti Agarwal", project: "Auroville Eco Cottages", amount: "₹32L" },
  { id: "iv2", investor: "Mohan Reddy", project: "ECR Beach House Cluster", amount: "₹75L" },
];

const investorPayouts = [
  { id: "p1", investor: "Navin Kumar", project: "Bay Breeze Villas · Phase 2", quarter: "Q2 FY26", amount: "₹4.8L", status: "Paid" },
  { id: "p2", investor: "Shruti Agarwal", project: "Auroville Eco Cottages", quarter: "Q2 FY26", amount: "₹2.1L", status: "Processing" },
  { id: "p3", investor: "Mohan Reddy", project: "ECR Beach House Cluster", quarter: "Q1 FY26", amount: "₹6.4L", status: "Paid" },
];

const exitRequests = [
  { id: "e1", investor: "Devika Rao", project: "Palakkad Wellness Cluster", stake: "₹18L", reason: "Liquidity need" },
];

const regionalPerformance = [
  { region: "Tamil Nadu · Pondicherry", occupancy: "78%", revenue: "₹18.2L", trend: "+12%" },
  { region: "Kerala", occupancy: "74%", revenue: "₹14.6L", trend: "+8%" },
  { region: "Himachal Pradesh", occupancy: "81%", revenue: "₹11.3L", trend: "+15%" },
  { region: "Karnataka", occupancy: "69%", revenue: "₹9.8L", trend: "+5%" },
];

export default function SuperAdminInvestorsPage() {
  const [investments, setInvestments] = useState(pendingInvestments);
  const [exits, setExits] = useState(exitRequests);

  const decideInvestment = (id: string) => setInvestments((p) => p.filter((i) => i.id !== id));
  const decideExit = (id: string) => setExits((p) => p.filter((e) => e.id !== id));

  return (
    <div className="space-y-8 pb-12 animate-fade-in">
      <PageHeader
        title="Investors & Analytics"
        subtitle="Investment approvals, capital allocation and payouts — plus the platform's core business-intelligence view."
      />

      <StatGrid
        stats={[
          { label: "Total Capital Deployed", value: "₹18.6Cr", delta: "96 investors", icon: Briefcase },
          { label: "Average ROI", value: "14.2%", delta: "+1.1 pts YoY", icon: TrendingUp },
          { label: "Pending Approvals", value: String(investments.length), delta: "new investment requests", icon: FileText },
          { label: "Exit Requests", value: String(exits.length), delta: "under review", icon: LogOut },
        ]}
      />

      <SectionCard title="Investment Approvals" icon={Briefcase}>
        <ul className="divide-y divide-surface-hover">
          {investments.map((i) => (
            <li key={i.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{i.investor}</p>
                <p className="text-xs text-subtle mt-0.5">{i.project} · {i.amount}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => decideInvestment(i.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-sage/40 text-sage rounded-full hover:bg-sage hover:text-white transition-colors"
                >
                  <Check size={12} /> Approve
                </button>
                <button
                  onClick={() => decideInvestment(i.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-border text-muted rounded-full hover:text-terracotta hover:border-terracotta/40 transition-colors"
                >
                  <X size={12} /> Reject
                </button>
              </div>
            </li>
          ))}
          {investments.length === 0 && <li className="px-5 py-6 text-center text-sm text-subtle">Queue is clear.</li>}
        </ul>
      </SectionCard>

      <div className="grid lg:grid-cols-2 gap-6">
        <SectionCard title="Revenue Distribution & Payouts" icon={FileText}>
          <ul className="divide-y divide-surface-hover">
            {investorPayouts.map((p) => (
              <li key={p.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{p.investor}</p>
                  <p className="text-xs text-subtle mt-0.5">{p.project} · {p.quarter}</p>
                </div>
                <div className="flex items-center gap-2.5 shrink-0">
                  <span className="text-sm font-semibold text-foreground tabular-nums">{p.amount}</span>
                  <StatusPill tone={p.status === "Paid" ? "sage" : "primary"}>{p.status}</StatusPill>
                </div>
              </li>
            ))}
          </ul>
          <p className="px-5 py-3 text-[11px] text-subtle border-t border-surface-hover">
            Agreements and full financial statements are attached to each investor's record.
          </p>
        </SectionCard>

        <SectionCard title="Exit Requests" icon={LogOut}>
          <ul className="divide-y divide-surface-hover">
            {exits.map((e) => (
              <li key={e.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{e.investor}</p>
                  <p className="text-xs text-subtle mt-0.5">{e.project} · {e.stake} · {e.reason}</p>
                </div>
                <button
                  onClick={() => decideExit(e.id)}
                  className="px-3 py-1.5 text-xs font-semibold bg-primary text-primary-foreground rounded-full hover:bg-primary-hover transition-colors shrink-0"
                >
                  Review
                </button>
              </li>
            ))}
            {exits.length === 0 && <li className="px-5 py-6 text-center text-sm text-subtle">No exit requests.</li>}
          </ul>
        </SectionCard>
      </div>

      <SectionCard title="Business Intelligence" icon={BarChart3}>
        <div className="px-5 pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "User Retention", value: "68%", icon: Repeat },
            { label: "Cancellation Rate", value: "4.2%", icon: Users },
            { label: "Conversion Rate", value: "3.8%", icon: TrendingUp },
            { label: "Forecast MTD", value: "₹46.1L", icon: BarChart3 },
          ].map((s) => (
            <div key={s.label} className="rounded-xl bg-background border border-border p-4">
              <s.icon size={14} className="text-primary" />
              <p className="text-lg font-bold text-foreground mt-1.5 tabular-nums">{s.value}</p>
              <p className="text-[11px] text-subtle mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="px-5 py-4 mt-1">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-subtle mb-3 flex items-center gap-1.5">
            <MapPin size={11} /> Regional Performance
          </p>
          <ul className="divide-y divide-surface-hover">
            {regionalPerformance.map((r) => (
              <li key={r.region} className="flex items-center justify-between gap-3 py-2.5">
                <span className="text-sm text-foreground">{r.region}</span>
                <span className="text-xs text-muted tabular-nums">
                  {r.occupancy} occ · {r.revenue} · <span className="text-sage">{r.trend}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <p className="px-5 pb-4 text-[11px] text-subtle">
          User behaviour, travel preferences and full forecast reports are exportable as detailed business reports.
        </p>
      </SectionCard>
    </div>
  );
}

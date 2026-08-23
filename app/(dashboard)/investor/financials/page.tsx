"use client";

import { useState } from "react";
import {
  IndianRupee,
  PieChart,
  Receipt,
  FileBarChart,
  Percent,
  Target,
  TrendingUp,
  CalendarDays,
} from "lucide-react";
import { PageHeader, SectionCard, StatGrid, StatusPill } from "@/app/components/DashboardUI";

// ============================================
// INVESTOR — Financials
// Consolidates Revenue, Expense, P&L and ROI
// dashboards into one read-only view. Every
// number here is calculated and published by
// Dhyana Stays — nothing on this page is
// editable by the investor.
// ============================================

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

// --- Revenue by source (portfolio-wide, current month) ---
const revenueSources = [
  { label: "Room Bookings", value: 840000 },
  { label: "Experiences", value: 125000 },
  { label: "Food & Beverage", value: 95000 },
  { label: "Events", value: 60000 },
  { label: "Bike Rentals", value: 22000 },
  { label: "Add-ons", value: 18000 },
];
const grossRevenue = revenueSources.reduce((sum, r) => sum + r.value, 0);

// --- Revenue funnel: gross → net → investor's slice ---
const revenueFunnel: { label: string; value: string; negative?: boolean }[] = [
  { label: "Gross Revenue", value: inr(1160000) },
  { label: "Operating Expenses", value: `−${inr(550500)}`, negative: true },
  { label: "Platform / Mgmt Fees", value: `−${inr(92800)}`, negative: true },
  { label: "Applicable Taxes", value: `−${inr(69600)}`, negative: true },
  { label: "Distributable Revenue", value: inr(447100) },
  { label: "Investor Share", value: inr(26800) },
];

// --- Expense categories: Monthly / YTD / Annual budget + status ---
type BudgetTone = "sage" | "primary" | "terracotta";
const expenseCategories: { label: string; monthly: number; ytd: number; annualBudget: number; status: string; tone: BudgetTone }[] = [
  { label: "Electricity", monthly: 42000, ytd: 326000, annualBudget: 420000, status: "Over Budget", tone: "terracotta" },
  { label: "Water", monthly: 9500, ytd: 61000, annualBudget: 120000, status: "Under Budget", tone: "sage" },
  { label: "Labour", monthly: 185000, ytd: 1295000, annualBudget: 2220000, status: "On Track", tone: "primary" },
  { label: "Maintenance", monthly: 38000, ytd: 305000, annualBudget: 400000, status: "Over Budget", tone: "terracotta" },
  { label: "Cleaning", monthly: 22000, ytd: 154000, annualBudget: 264000, status: "On Track", tone: "primary" },
  { label: "Property Management", monthly: 58000, ytd: 406000, annualBudget: 696000, status: "On Track", tone: "primary" },
  { label: "Marketing", monthly: 45000, ytd: 270000, annualBudget: 540000, status: "Under Budget", tone: "sage" },
  { label: "OTA / Booking Costs", monthly: 62000, ytd: 490000, annualBudget: 700000, status: "Over Budget", tone: "terracotta" },
  { label: "Repairs", monthly: 15000, ytd: 102000, annualBudget: 180000, status: "On Track", tone: "primary" },
  { label: "Supplies", monthly: 18500, ytd: 110000, annualBudget: 222000, status: "Under Budget", tone: "sage" },
  { label: "Internet", monthly: 6500, ytd: 45500, annualBudget: 78000, status: "On Track", tone: "primary" },
  { label: "Insurance", monthly: 12000, ytd: 84000, annualBudget: 144000, status: "On Track", tone: "primary" },
  { label: "Taxes", monthly: 28000, ytd: 196000, annualBudget: 336000, status: "On Track", tone: "primary" },
  { label: "Other", monthly: 9000, ytd: 54000, annualBudget: 108000, status: "Under Budget", tone: "sage" },
];
const totalMonthlyExpense = expenseCategories.reduce((s, e) => s + e.monthly, 0);
const totalYtdExpense = expenseCategories.reduce((s, e) => s + e.ytd, 0);
const totalAnnualBudget = expenseCategories.reduce((s, e) => s + e.annualBudget, 0);
const budgetUsedPct = (totalYtdExpense / totalAnnualBudget) * 100;

// --- Profit & Loss, by period ---
type Period = "monthly" | "quarterly" | "annual";
const plData: Record<Period, { periodLabel: string; revenue: number; opex: number; noi: number; investorShare: number; distributed: number; pending: number }> = {
  monthly: { periodLabel: "July 2026", revenue: 1160000, opex: 550500, noi: 609500, investorShare: 26800, distributed: 24500, pending: 2300 },
  quarterly: { periodLabel: "Q1 FY26–27 · Apr–Jun 2026", revenue: 3380000, opex: 1620000, noi: 1760000, investorShare: 78400, distributed: 73500, pending: 4900 },
  annual: { periodLabel: "FY 2025–26 · trailing 12 months", revenue: 13450000, opex: 6420000, noi: 7030000, investorShare: 312000, distributed: 286000, pending: 26000 },
};
const periodTabs: { key: Period; label: string }[] = [
  { key: "monthly", label: "Monthly" },
  { key: "quarterly", label: "Quarterly" },
  { key: "annual", label: "Annual" },
];

// --- ROI ---
const roi = {
  current: "11.8%",
  annualised: "14.2%",
  projected: "16.5%",
  holdingPeriod: "18 months",
  recovered: 3200000,
  investedCapital: 5000000,
};
const paybackPct = Math.round((roi.recovered / roi.investedCapital) * 100);

export default function InvestorFinancialsPage() {
  const [period, setPeriod] = useState<Period>("monthly");
  const pl = plData[period];

  return (
    <div className="space-y-4 pb-12 animate-fade-in">
      <PageHeader
        title="Financials"
        subtitle="Revenue, expenses, profit & loss and ROI across your portfolio — consolidated in one place."
      />

      <div className="flex flex-wrap items-center gap-2.5">
        <StatusPill tone="primary">View only</StatusPill>
        <span className="text-xs text-subtle">
          All figures below are calculated and published by Dhyana Stays. Nothing on this page is editable by investors.
        </span>
      </div>

      {/* Revenue by source */}
      <SectionCard title="Revenue by Source" icon={PieChart}>
        <div className="px-5 pt-4 pb-5">
          <p className="text-xs text-subtle mb-4">Gross revenue by category · July 2026 · portfolio-wide</p>
          <ul className="space-y-3.5">
            {revenueSources.map((r) => {
              const pct = (r.value / grossRevenue) * 100;
              return (
                <li key={r.label}>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="text-foreground">{r.label}</span>
                    <span className="flex items-center gap-2 shrink-0">
                      <span className="text-[11px] text-subtle tabular-nums">{pct.toFixed(1)}%</span>
                      <span className="font-semibold text-foreground tabular-nums">{inr(r.value)}</span>
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-surface-hover overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-surface-hover">
            <span className="text-sm font-semibold text-foreground">Gross Revenue</span>
            <span className="text-sm font-bold text-foreground tabular-nums">{inr(grossRevenue)}</span>
          </div>
        </div>
      </SectionCard>

      {/* Revenue funnel */}
      <SectionCard title="Revenue Funnel" icon={IndianRupee}>
        <div className="p-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
          {revenueFunnel.map((f, i, arr) => (
            <div key={f.label} className="relative rounded-xl bg-background border border-border p-4">
              <p className={`text-base font-bold tabular-nums ${f.negative ? "text-terracotta" : "text-foreground"}`}>
                {f.value}
              </p>
              <p className="text-[11px] text-subtle mt-1">{f.label}</p>
              {i < arr.length - 1 && (
                <span className="hidden lg:flex absolute top-1/2 -right-3.5 -translate-y-1/2 text-subtle">→</span>
              )}
            </div>
          ))}
        </div>
        <p className="px-5 pb-4 text-[11px] text-subtle">
          Distributable Revenue is split across investors by ownership share. Investor Share above reflects your
          blended ownership across active properties this period.
        </p>
      </SectionCard>

      {/* Expense dashboard */}
      <SectionCard title="Expense Dashboard" icon={Receipt}>
        <div className="p-5">
          <StatGrid
            stats={[
              { label: "Monthly Expenses", value: inr(totalMonthlyExpense), icon: Receipt },
              { label: "YTD Expenses", value: inr(totalYtdExpense), delta: "Jan–Jul 2026", icon: CalendarDays },
              { label: "Annual Budget", value: inr(totalAnnualBudget), icon: Target },
              { label: "Budget Used", value: `${budgetUsedPct.toFixed(1)}%`, delta: "of annual budget, YTD", icon: Percent },
            ]}
          />
        </div>
        <div className="overflow-x-auto border-t border-surface-hover">
          <table className="w-full text-left text-sm min-w-[640px]">
            <thead className="text-[11px] uppercase tracking-wide text-subtle bg-surface-hover">
              <tr>
                <th className="px-5 py-3 font-medium">Category</th>
                <th className="px-5 py-3 font-medium">Monthly</th>
                <th className="px-5 py-3 font-medium">YTD</th>
                <th className="px-5 py-3 font-medium">Annual Budget</th>
                <th className="px-5 py-3 font-medium">vs Budget</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-hover">
              {expenseCategories.map((e) => (
                <tr key={e.label} className="hover:bg-surface-hover/50 transition-colors">
                  <td className="px-5 py-3 text-foreground whitespace-nowrap">{e.label}</td>
                  <td className="px-5 py-3 text-muted tabular-nums whitespace-nowrap">{inr(e.monthly)}</td>
                  <td className="px-5 py-3 text-muted tabular-nums whitespace-nowrap">{inr(e.ytd)}</td>
                  <td className="px-5 py-3 text-muted tabular-nums whitespace-nowrap">{inr(e.annualBudget)}</td>
                  <td className="px-5 py-3">
                    <StatusPill tone={e.tone}>{e.status}</StatusPill>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {/* Profit & Loss */}
      <SectionCard title="Profit & Loss" icon={FileBarChart}>
        <div className="px-5 pt-4 flex items-center gap-2">
          {periodTabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setPeriod(t.key)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-colors ${
                period === t.key
                  ? "bg-primary text-primary-foreground"
                  : "bg-surface-hover text-muted hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <p className="px-5 pt-3 text-[11px] text-subtle">{pl.periodLabel}</p>
        <ul className="divide-y divide-surface-hover mt-3">
          <li className="flex items-center justify-between px-5 py-3.5">
            <span className="text-sm text-foreground">Revenue</span>
            <span className="text-sm font-semibold text-foreground tabular-nums">{inr(pl.revenue)}</span>
          </li>
          <li className="flex items-center justify-between px-5 py-3.5">
            <span className="text-sm text-foreground">Operating Expenses</span>
            <span className="text-sm font-semibold text-terracotta tabular-nums">−{inr(pl.opex)}</span>
          </li>
          <li className="flex items-center justify-between px-5 py-3.5 bg-primary/5">
            <span className="text-sm font-semibold text-foreground">Net Operating Income</span>
            <span className="text-sm font-bold text-sage tabular-nums">{inr(pl.noi)}</span>
          </li>
          <li className="flex items-center justify-between px-5 py-3.5">
            <span className="text-sm text-foreground">Investor Share</span>
            <span className="text-sm font-semibold text-foreground tabular-nums">{inr(pl.investorShare)}</span>
          </li>
          <li className="flex items-center justify-between px-5 py-3.5">
            <span className="text-sm text-foreground">Distributed</span>
            <span className="flex items-center gap-2">
              <span className="text-sm font-semibold text-sage tabular-nums">{inr(pl.distributed)}</span>
              <StatusPill tone="sage">Paid</StatusPill>
            </span>
          </li>
          <li className="flex items-center justify-between px-5 py-3.5">
            <span className="text-sm text-foreground">Pending</span>
            <span className="flex items-center gap-2">
              <span className="text-sm font-semibold text-primary tabular-nums">{inr(pl.pending)}</span>
              <StatusPill tone="primary">Next cycle</StatusPill>
            </span>
          </li>
        </ul>
        <p className="px-5 py-3 text-[11px] text-subtle border-t border-surface-hover">
          Statement is calculated by Dhyana Stays and provided for reference only.
        </p>
      </SectionCard>

      {/* ROI dashboard */}
      <SectionCard title="ROI Dashboard" icon={Percent}>
        <div className="p-5">
          <StatGrid
            stats={[
              { label: "Current ROI", value: roi.current, delta: "cumulative, to date", icon: Percent },
              { label: "Annualised ROI", value: roi.annualised, delta: "since first investment", icon: TrendingUp },
              { label: "Projected ROI", value: roi.projected, delta: "FY26 estimate — not guaranteed", icon: Target },
              { label: "Holding Period", value: roi.holdingPeriod, icon: CalendarDays },
            ]}
          />
        </div>
        <div className="px-5 pb-5">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="font-medium text-foreground">Payback Progress</span>
            <span className="text-muted tabular-nums">
              ₹{(roi.recovered / 100000).toFixed(0)}L of ₹{(roi.investedCapital / 100000).toFixed(0)}L invested capital recovered
            </span>
          </div>
          <div className="h-3 rounded-full bg-surface-hover overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-sage rounded-full"
              style={{ width: `${paybackPct}%` }}
            />
          </div>
          <p className="text-[11px] text-subtle mt-2">{paybackPct}% of invested capital recovered via distributions to date.</p>
        </div>
        <p className="px-5 pb-4 text-[11px] text-subtle border-t border-surface-hover pt-3">
          Projected ROI is an estimate based on current performance trends and is not a guaranteed return.
        </p>
      </SectionCard>
    </div>
  );
}

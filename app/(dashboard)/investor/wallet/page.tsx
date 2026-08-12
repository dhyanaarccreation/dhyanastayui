"use client";

import { useState } from "react";
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  Landmark,
  Download,
  Plus,
  Receipt,
  TrendingUp,
  Users,
  FileText,
  CheckCircle2,
  X,
} from "lucide-react";
import { PageHeader, SectionCard, StatGrid, StatusPill } from "@/app/components/DashboardUI";

const transactions = [
  { label: "June distribution · Nila Wellness", amount: "+₹16,800", date: "Jul 01", credit: true },
  { label: "June distribution · Canopy Village", amount: "+₹12,400", date: "Jul 01", credit: true },
  { label: "Withdrawal to ICICI ••8834", amount: "-₹25,000", date: "Jun 28", credit: false },
  { label: "May distribution · Stone Valley", amount: "+₹9,050", date: "Jun 01", credit: true },
  { label: "Investment · Glass Pavilion Annexe", amount: "-₹6,00,000", date: "May 12", credit: false },
];

// Every row below is calculated and released by Dhyana Stays — this is a read-only
// statement of what has already been paid, not a tool for computing distributions.
const distributionHistory = [
  {
    period: "Jun 2026",
    project: "Nila Wellness Expansion",
    grossRevenue: "₹4,66,750",
    investorPct: "4.0%",
    investorAmount: "₹18,670",
    taxDeducted: "₹1,870",
    amountTransferred: "₹16,800",
    paymentDate: "Jul 01, 2026",
    reference: "DHY-DIST-260701-0142",
  },
  {
    period: "Jun 2026",
    project: "Canopy Village · Phase 2",
    grossRevenue: "₹4,30,625",
    investorPct: "3.2%",
    investorAmount: "₹13,780",
    taxDeducted: "₹1,380",
    amountTransferred: "₹12,400",
    paymentDate: "Jul 01, 2026",
    reference: "DHY-DIST-260701-0143",
  },
  {
    period: "May 2026",
    project: "Nila Wellness Expansion",
    grossRevenue: "₹4,40,000",
    investorPct: "4.0%",
    investorAmount: "₹17,600",
    taxDeducted: "₹1,760",
    amountTransferred: "₹15,840",
    paymentDate: "Jun 01, 2026",
    reference: "DHY-DIST-260601-0118",
  },
  {
    period: "May 2026",
    project: "Stone Valley Cottages",
    grossRevenue: "₹4,02,400",
    investorPct: "2.5%",
    investorAmount: "₹10,060",
    taxDeducted: "₹1,010",
    amountTransferred: "₹9,050",
    paymentDate: "Jun 01, 2026",
    reference: "DHY-DIST-260601-0119",
  },
  {
    period: "Apr 2026",
    project: "Canopy Village · Phase 2",
    grossRevenue: "₹4,05,000",
    investorPct: "3.2%",
    investorAmount: "₹12,960",
    taxDeducted: "₹1,296",
    amountTransferred: "₹11,664",
    paymentDate: "May 01, 2026",
    reference: "DHY-DIST-260501-0097",
  },
  {
    period: "Apr 2026",
    project: "Stone Valley Cottages",
    grossRevenue: "₹3,80,000",
    investorPct: "2.5%",
    investorAmount: "₹9,500",
    taxDeducted: "₹950",
    amountTransferred: "₹8,550",
    paymentDate: "May 01, 2026",
    reference: "DHY-DIST-260501-0096",
  },
];

export default function InvestorWalletPage() {
  const [statementRequested, setStatementRequested] = useState(false);

  return (
    <div className="space-y-8 pb-12">
      <PageHeader
        title="Distributions"
        subtitle="Every payout is calculated and released by Dhyana Stays. Track what's landed, what's pending, and pull statements below."
      />

      {/* Balance card */}
      <div className="bg-gradient-to-r from-primary/15 via-surface to-surface border border-primary/25 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6">
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary flex items-center gap-1.5">
            <Wallet size={14} /> Available Balance
          </p>
          <p className="text-4xl font-bold text-foreground mt-2 tabular-nums">₹48,250</p>
          <p className="text-sm text-muted mt-1">Next distribution expected Sep 01 · ≈ ₹39,400</p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 text-sm font-semibold bg-primary text-primary-foreground rounded-xl hover:bg-primary-hover transition-colors flex items-center gap-1.5">
            <ArrowUpRight size={15} /> Withdraw
          </button>
          <button className="px-5 py-2.5 text-sm font-medium border border-border rounded-xl text-foreground hover:border-primary/50 transition-colors flex items-center gap-1.5">
            <Plus size={15} /> Reinvest
          </button>
        </div>
      </div>

      {/* Wallet summary */}
      <StatGrid
        stats={[
          { label: "Pending Distribution", value: "₹39,400", delta: "Jul 2026 · processing", icon: TrendingUp },
          { label: "Total Earnings (Lifetime)", value: "₹4,86,200", delta: "Since Feb 2025", icon: Receipt },
          { label: "Withdrawable Amount", value: "₹42,250", delta: "₹6,000 clearing (2 days)", icon: Landmark },
          { label: "Referral Earnings", value: "₹3,200", delta: "2 investors referred", icon: Users },
        ]}
      />

      {/* Distribution history / statements */}
      <SectionCard title="Distribution History" icon={Receipt}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-3.5 border-b border-surface-hover">
          <p className="text-xs text-muted">
            Read-only record of every distribution released to you. Need a copy for your records?
          </p>
          <button
            onClick={() => setStatementRequested(true)}
            className="shrink-0 px-3.5 py-2 text-xs font-semibold border border-primary/40 text-primary rounded-full hover:bg-primary/10 transition-colors flex items-center gap-1.5 self-start sm:self-auto"
          >
            <FileText size={13} /> Request Statement
          </button>
        </div>

        {statementRequested && (
          <div className="mx-5 mt-3 flex items-center justify-between gap-3 rounded-xl bg-sage/10 border border-sage/25 px-4 py-3">
            <p className="text-xs text-sage flex items-center gap-2">
              <CheckCircle2 size={14} className="shrink-0" /> Statement request received — our team will email a
              consolidated PDF to your registered address within 24 hours.
            </p>
            <button
              onClick={() => setStatementRequested(false)}
              className="text-subtle hover:text-foreground transition-colors shrink-0"
              aria-label="Dismiss"
            >
              <X size={14} />
            </button>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[980px]">
            <thead>
              <tr className="text-[11px] uppercase tracking-wider text-subtle border-b border-surface-hover">
                <th className="px-5 py-3 font-semibold">Period</th>
                <th className="px-3 py-3 font-semibold">Project</th>
                <th className="px-3 py-3 font-semibold">Gross Revenue</th>
                <th className="px-3 py-3 font-semibold">Investor %</th>
                <th className="px-3 py-3 font-semibold">Investor Amount</th>
                <th className="px-3 py-3 font-semibold">Tax Deducted</th>
                <th className="px-3 py-3 font-semibold">Transferred</th>
                <th className="px-3 py-3 font-semibold">Payment Date</th>
                <th className="px-5 py-3 font-semibold">Reference</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-hover">
              {distributionHistory.map((d) => (
                <tr key={d.reference} className="hover:bg-surface-hover/50 transition-colors">
                  <td className="px-5 py-4 text-sm text-foreground font-medium whitespace-nowrap">{d.period}</td>
                  <td className="px-3 py-4 text-sm text-muted whitespace-nowrap">{d.project}</td>
                  <td className="px-3 py-4 text-sm text-muted tabular-nums whitespace-nowrap">{d.grossRevenue}</td>
                  <td className="px-3 py-4 text-sm text-muted tabular-nums whitespace-nowrap">{d.investorPct}</td>
                  <td className="px-3 py-4 text-sm text-foreground font-medium tabular-nums whitespace-nowrap">
                    {d.investorAmount}
                  </td>
                  <td className="px-3 py-4 text-sm text-terracotta tabular-nums whitespace-nowrap">
                    -{d.taxDeducted}
                  </td>
                  <td className="px-3 py-4 text-sm text-sage font-semibold tabular-nums whitespace-nowrap">
                    {d.amountTransferred}
                  </td>
                  <td className="px-3 py-4 text-sm text-muted whitespace-nowrap">{d.paymentDate}</td>
                  <td className="px-5 py-4 text-xs text-subtle font-mono whitespace-nowrap">{d.reference}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[11px] text-subtle px-5 py-3.5 border-t border-surface-hover">
          Figures are set by Dhyana Stays based on each project's actuals and your ownership share — this statement
          is for your records only.
        </p>
      </SectionCard>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Transactions */}
        <SectionCard title="Transactions" icon={Wallet} className="lg:col-span-2" action={{ label: "Statement PDF", href: "/investor/wallet" }}>
          <ul className="divide-y divide-surface-hover">
            {transactions.map((t) => (
              <li key={t.label + t.date} className="flex items-center gap-3 px-5 py-3.5">
                <span
                  className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                    t.credit ? "bg-sage/15 text-sage" : "bg-terracotta/15 text-terracotta"
                  }`}
                >
                  {t.credit ? <ArrowDownLeft size={15} /> : <ArrowUpRight size={15} />}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground truncate">{t.label}</p>
                  <p className="text-[11px] text-subtle">{t.date}</p>
                </div>
                <span className={`text-sm font-semibold tabular-nums ${t.credit ? "text-sage" : "text-foreground"}`}>
                  {t.amount}
                </span>
              </li>
            ))}
          </ul>
        </SectionCard>

        {/* Linked account */}
        <div className="space-y-6">
          <SectionCard title="Linked Account" icon={Landmark}>
            <div className="px-5 py-4">
              <div className="rounded-xl bg-background border border-border p-4">
                <p className="text-xs text-subtle">ICICI Bank · Savings</p>
                <p className="text-base font-semibold text-foreground mt-1 tabular-nums">•••• •••• 8834</p>
                <div className="flex items-center justify-between mt-3">
                  <StatusPill tone="sage">Verified</StatusPill>
                  <button className="text-xs text-primary hover:underline">Change</button>
                </div>
              </div>
              <p className="text-[11px] text-subtle mt-3">
                Withdrawals settle in 1–2 business days. TDS certificates are issued quarterly.
              </p>
            </div>
          </SectionCard>

          <SectionCard title="Statements" icon={Download}>
            <ul className="divide-y divide-surface-hover">
              {["Q2 2026 statement", "Q1 2026 statement", "FY 2025-26 TDS certificate"].map((s) => (
                <li key={s}>
                  <button className="w-full flex items-center justify-between px-5 py-3.5 text-left hover:bg-surface-hover transition-colors group">
                    <span className="text-sm text-muted group-hover:text-foreground transition-colors">{s}</span>
                    <Download size={14} className="text-subtle group-hover:text-primary transition-colors" />
                  </button>
                </li>
              ))}
            </ul>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}

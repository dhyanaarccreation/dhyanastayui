"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Building2,
  TrendingUp,
  Wallet,
  ArrowUpRight,
  FileText,
  Percent,
  Home,
  PieChart,
  HandCoins,
  Briefcase,
  FileSignature,
  LogOut,
  Send,
  CheckCircle2,
  Layers,
  Check,
} from "lucide-react";

export default function InvestorDashboardOverview() {
  const [statementRequested, setStatementRequested] = useState(false);

  const portfolio = [
    { name: "The Glasshouse in the Pines", location: "Himachal", invested: 500000, ownership: "2.5%", return: "+12.4%", status: "Active" },
    { name: "Heritage Courtyard", location: "Rajasthan", invested: 250000, ownership: "1.0%", return: "+8.2%", status: "Active" },
    { name: "Coastal Eco Resort", location: "Goa", invested: 1000000, ownership: "5.0%", return: "Developing", status: "In Progress" },
  ];

  // The 8 questions the first screen must answer, at a glance.
  const overviewStats = [
    { label: "Total Investment", value: "₹17,50,000", change: "3 projects", icon: Wallet },
    { label: "Total Returns", value: "₹2,86,400", change: "+16.4% lifetime", icon: TrendingUp },
    { label: "Current ROI", value: "13.6%", change: "Blended annualised", icon: Percent },
    { label: "Occupancy", value: "78%", change: "Portfolio avg · 30d", icon: Home },
    { label: "Monthly Revenue", value: "₹6,12,000", change: "Combined · Jul 2026", icon: BarChart3 },
    { label: "My Share", value: "2.8%", change: "Blended ownership", icon: PieChart },
    { label: "Amount Distributed", value: "₹1,86,400", change: "₹24,500 pending", icon: HandCoins },
    { label: "Project Status", value: "Operating", change: "2 live · 1 in construction", icon: Building2 },
  ];

  const quickActions: { label: string; href: string; icon: typeof Briefcase }[] = [
    { label: "View Investments", href: "/investor/portfolio", icon: Briefcase },
    { label: "View Project", href: "/investor/projects", icon: Building2 },
    { label: "View ROI", href: "/investor/roi", icon: Percent },
    { label: "View Financial Report", href: "/investor/financials", icon: BarChart3 },
    { label: "View Documents", href: "/investor/agreements", icon: FileText },
    { label: "View Agreement", href: "/investor/agreements", icon: FileSignature },
    { label: "View Distribution", href: "/investor/wallet", icon: HandCoins },
    { label: "Request Exit", href: "/investor/exit", icon: LogOut },
  ];

  const journey = [
    { label: "Investment Created", done: true },
    { label: "KYC Completed", done: true },
    { label: "Agreement Signed", done: true },
    { label: "Capital Paid", done: true },
    { label: "Unit Allocated", done: true },
    { label: "Construction Started", done: true },
    { label: "Project Opened", done: false },
    { label: "First Booking", done: false },
    { label: "Revenue Generated", done: false },
    { label: "Distribution Received", done: false },
    { label: "ROI Updated", done: false },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="heading-display text-3xl text-foreground mb-2">
            Investor Portfolio
          </h1>
          <p className="text-sm text-muted">
            Track your fractional ownerships and monthly yields across Dhyana properties.
          </p>
        </div>
        <Link
          href="/investor/projects"
          className="px-6 py-3 bg-primary text-primary-foreground font-semibold text-sm rounded-xl hover:bg-primary-hover transition-colors flex items-center gap-2"
        >
          Explore New Projects <ArrowRight size={16} />
        </Link>
      </div>

      {/* Overview stats — the 8 questions the first screen must answer */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewStats.map((kpi, i) => (
          <div key={i} className="bg-surface border border-border rounded-2xl p-5 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <kpi.icon size={80} />
            </div>
            <div className="flex justify-between items-start mb-3">
              <div className="w-9 h-9 rounded-lg bg-surface-hover flex items-center justify-center text-primary">
                <kpi.icon size={17} />
              </div>
            </div>
            <div className="text-xl font-bold text-foreground mb-1 tabular-nums">{kpi.value}</div>
            <div className="text-xs text-muted">{kpi.label}</div>
            <div className="text-[11px] text-sage mt-1">{kpi.change}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-surface border border-border rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-foreground">Quick Actions</h2>
          <span className="text-xs text-subtle">Everything you need, one tap away</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="flex flex-col items-center gap-2 text-center px-3 py-4 rounded-xl border border-border hover:border-primary/50 hover:bg-surface-hover transition-colors"
            >
              <span className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <action.icon size={16} />
              </span>
              <span className="text-xs font-medium text-foreground leading-tight">{action.label}</span>
            </Link>
          ))}

          {statementRequested ? (
            <div className="flex flex-col items-center gap-2 text-center px-3 py-4 rounded-xl border border-sage/30 bg-sage/5">
              <span className="w-9 h-9 rounded-lg bg-sage/15 text-sage flex items-center justify-center">
                <CheckCircle2 size={16} />
              </span>
              <span className="text-xs font-medium text-sage leading-tight">Statement Requested</span>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setStatementRequested(true)}
              className="flex flex-col items-center gap-2 text-center px-3 py-4 rounded-xl border border-border hover:border-primary/50 hover:bg-surface-hover transition-colors"
            >
              <span className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <Send size={16} />
              </span>
              <span className="text-xs font-medium text-foreground leading-tight">Request Statement</span>
            </button>
          )}
        </div>
        {statementRequested && (
          <p className="text-xs text-sage mt-4">
            Your latest portfolio statement has been requested — expect it by email within 24 hours.
          </p>
        )}
      </div>

      {/* Investment Activity Timeline */}
      <div className="bg-surface border border-border rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Layers size={16} />
            </span>
            <h2 className="text-sm font-semibold text-foreground">Investment Journey — Coastal Eco Resort, Goa</h2>
          </div>
          <span className="text-xs text-subtle">6 of 11 milestones complete</span>
        </div>
        <div className="overflow-x-auto pb-1">
          <div className="flex items-start min-w-[880px]">
            {journey.map((step, i) => (
              <div key={step.label} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center gap-2 w-20 shrink-0">
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                      step.done
                        ? "bg-sage text-white"
                        : i === journey.findIndex((s) => !s.done)
                        ? "bg-primary/15 text-primary border-2 border-primary"
                        : "bg-surface-hover text-subtle border border-border"
                    }`}
                  >
                    {step.done ? <Check size={13} /> : <span className="text-[10px] font-semibold">{i + 1}</span>}
                  </span>
                  <span className={`text-[10px] text-center leading-tight ${step.done ? "text-foreground font-medium" : "text-subtle"}`}>
                    {step.label}
                  </span>
                </div>
                {i < journey.length - 1 && (
                  <div className={`h-0.5 flex-1 -mt-6 ${step.done ? "bg-sage" : "bg-border"}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Portfolio Table */}
          <div className="bg-surface border border-border rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-foreground">My Assets</h2>
              <button className="text-sm text-primary hover:underline">Download Report</button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-muted">
                <thead className="text-xs uppercase bg-surface-hover text-subtle">
                  <tr>
                    <th className="px-4 py-3 rounded-l-lg">Property</th>
                    <th className="px-4 py-3">Invested</th>
                    <th className="px-4 py-3">Ownership</th>
                    <th className="px-4 py-3">Yield</th>
                    <th className="px-4 py-3 rounded-r-lg">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {portfolio.map((item, i) => (
                    <tr key={i} className="hover:bg-surface-hover/50 transition-colors">
                      <td className="px-4 py-4">
                        <div className="font-medium text-foreground">{item.name}</div>
                        <div className="text-xs text-subtle">{item.location}</div>
                      </td>
                      <td className="px-4 py-4 font-medium text-foreground">₹{item.invested.toLocaleString()}</td>
                      <td className="px-4 py-4">{item.ownership}</td>
                      <td className="px-4 py-4">
                        <span className={`flex items-center gap-1 ${item.return.startsWith('+') ? 'text-sage' : 'text-subtle'}`}>
                          {item.return.startsWith('+') ? <ArrowUpRight size={14} /> : null} {item.return}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`px-2 py-1 text-[10px] uppercase tracking-wider rounded font-semibold border ${
                          item.status === "Active" ? "bg-sage/10 text-sage border-sage/20" : "bg-primary/10 text-primary border-primary/20"
                        }`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Performance Chart Placeholder */}
          <div className="bg-surface border border-border rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">Yield Performance (2026)</h2>
            <div className="h-64 flex items-end justify-between gap-2 border-b border-border pb-2 mb-2 relative">
              {/* Mock chart lines */}
              <div className="absolute inset-0 flex flex-col justify-between opacity-10">
                <div className="w-full h-px bg-foreground"></div>
                <div className="w-full h-px bg-foreground"></div>
                <div className="w-full h-px bg-foreground"></div>
                <div className="w-full h-px bg-foreground"></div>
              </div>
              
              {[30, 45, 60, 50, 75, 80, 70, 90, 85, 95].map((height, i) => (
                <div key={i} className="w-full bg-gradient-to-t from-primary/20 to-primary rounded-t-sm" style={{ height: `${height}%` }}></div>
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-subtle uppercase tracking-wider">
              <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Wallet / Payout */}
          <div className="bg-gradient-to-r from-surface to-surface-hover border border-primary/30 rounded-2xl p-6">
            <div className="text-sm font-medium text-muted mb-2 uppercase tracking-wider">Next Payout</div>
            <div className="text-3xl font-bold text-foreground mb-1">₹24,500</div>
            <div className="text-xs text-subtle mb-6">Expected on Nov 1, 2026</div>
            
            <button className="w-full py-3 bg-surface-hover border border-border text-foreground font-medium text-sm rounded-xl hover:bg-surface-hover transition-colors mb-3">
              Withdraw to Bank
            </button>
            <button className="w-full py-3 bg-primary text-primary-foreground font-semibold text-sm rounded-xl hover:bg-primary-hover transition-colors">
              Reinvest
            </button>
          </div>

          {/* Recent Documents */}
          <div className="bg-surface border border-border rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-foreground mb-4">Recent Documents</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-hover transition-colors cursor-pointer border border-transparent hover:border-border">
                <div className="w-10 h-10 rounded-lg bg-border flex items-center justify-center text-muted"><FileText size={18} /></div>
                <div>
                  <div className="text-sm font-medium text-foreground">Q3 Performance Report</div>
                  <div className="text-xs text-subtle">Oct 1, 2026</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-hover transition-colors cursor-pointer border border-transparent hover:border-border">
                <div className="w-10 h-10 rounded-lg bg-border flex items-center justify-center text-muted"><FileText size={18} /></div>
                <div>
                  <div className="text-sm font-medium text-foreground">Share Certificate - TGH</div>
                  <div className="text-xs text-subtle">Sep 15, 2026</div>
                </div>
              </div>
            </div>
            <button className="w-full mt-4 text-xs font-medium text-primary hover:underline">View all documents</button>
          </div>
        </div>
      </div>
    </div>
  );
}

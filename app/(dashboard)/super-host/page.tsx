"use client";

import Link from "next/link";
import {
  Building,
  TrendingUp,
  IndianRupee,
  Users,
  AlertTriangle,
  ArrowUpRight,
  Percent,
  Receipt,
  Wrench,
  Compass,
} from "lucide-react";
import { PageHeader, StatGrid, SectionCard, StatusPill } from "@/app/components/DashboardUI";

// ============================================
// SUPER HOST — Cluster Overview
// Manages a cluster of ~10-50 properties across
// several regional hosts. Approves pricing,
// availability & promotions; monitors quality.
// ============================================

const propertyPreview = [
  { id: "p1", name: "Canopy Tiny House", region: "Auroville", occupancy: "88%", revenue: "₹2.1L" },
  { id: "p2", name: "Stone Valley Villa", region: "Yelagiri", occupancy: "74%", revenue: "₹3.4L" },
  { id: "p3", name: "Nila Wellness Retreat", region: "Palakkad", occupancy: "91%", revenue: "₹2.8L" },
];

const pendingPreview = [
  { id: "pp1", property: "Canopy Tiny House", request: "Weekend pricing +12%", host: "Divya Krishnan" },
  { id: "pp2", property: "Bay Breeze Villas", request: "FOODIE15 promo bundle", host: "Suresh Babu" },
];

const alerts = [
  { id: "al1", text: "Maintenance overdue — Stone Valley Villa (pool filter)", tone: "terracotta" as const },
  { id: "al2", text: "Quality audit due this week — 4 properties", tone: "primary" as const },
];

// Cluster-wide expense tracking (per spec: electricity → repairs).
const clusterExpenses = [
  { id: "ce1", category: "Electricity", amount: "₹48,200" },
  { id: "ce2", category: "Water", amount: "₹12,400" },
  { id: "ce3", category: "Labour", amount: "₹86,000" },
  { id: "ce4", category: "Cleaning", amount: "₹34,500" },
  { id: "ce5", category: "Maintenance", amount: "₹52,300" },
  { id: "ce6", category: "Consumables", amount: "₹21,800" },
  { id: "ce7", category: "Internet", amount: "₹9,600" },
  { id: "ce8", category: "Repairs", amount: "₹27,900" },
];

// Repair log + vendor management.
const maintenanceLog = [
  { id: "mn1", job: "Pool filter replacement", property: "Stone Valley Villa", vendor: "AquaCare Services", status: "Overdue" },
  { id: "mn2", job: "Solar inverter service", property: "Nila Wellness Retreat", vendor: "SunTech Palakkad", status: "Scheduled" },
  { id: "mn3", job: "Deck wood treatment", property: "Canopy Tiny House", vendor: "Auroville Carpentry Co.", status: "In progress" },
];

// Local partner network — experiences, food & bike rentals for the cluster.
const localPartners = [
  { id: "lp1", type: "Local Experiences", detail: "8 live listings · 2 pending review", status: "Manage" },
  { id: "lp2", type: "Food Partners", detail: "5 restaurants · 26 menu items live", status: "Manage" },
  { id: "lp3", type: "Bike Rentals", detail: "3 providers · 22 vehicles available", status: "Manage" },
];

export default function SuperHostPage() {
  return (
    <div className="space-y-8 pb-12 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <PageHeader
          title="Cluster Overview"
          subtitle="32 properties across 5 regions — occupancy, revenue, pricing approvals and quality, all in one place."
        />
        <StatusPill tone="sage">South Cluster · 5 regions</StatusPill>
      </div>

      <StatGrid
        stats={[
          { label: "Properties in Cluster", value: "32", delta: "5 regions", icon: Building },
          { label: "Network Occupancy", value: "81%", delta: "+4% QoQ", icon: TrendingUp },
          { label: "Quarterly Revenue", value: "₹2.1Cr", delta: "+9% QoQ", icon: IndianRupee },
          { label: "Team Members", value: "38", delta: "6 regional hosts", icon: Users },
        ]}
      />

      <div className="grid lg:grid-cols-3 gap-6">
        <SectionCard
          title="Top Performing Properties"
          icon={Building}
          className="lg:col-span-2"
          action={{ label: "View all properties", href: "/super-host/properties" }}
        >
          <ul className="divide-y divide-surface-hover">
            {propertyPreview.map((p) => (
              <li key={p.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{p.name}</p>
                  <p className="text-xs text-subtle">{p.region}</p>
                </div>
                <div className="flex items-center gap-4 shrink-0 text-right">
                  <div>
                    <p className="text-[10px] text-subtle uppercase tracking-wider">Occupancy</p>
                    <p className="text-sm font-semibold text-foreground tabular-nums">{p.occupancy}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-subtle uppercase tracking-wider">Revenue</p>
                    <p className="text-sm font-semibold text-foreground tabular-nums">{p.revenue}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Quality Alerts" icon={AlertTriangle}>
          <ul className="divide-y divide-surface-hover">
            {alerts.map((a) => (
              <li key={a.id} className="px-5 py-3.5 flex items-start gap-2.5">
                <StatusPill tone={a.tone}>!</StatusPill>
                <p className="text-xs text-muted leading-relaxed">{a.text}</p>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <SectionCard title="Pending Pricing & Promo Approvals" icon={Percent} action={{ label: "Review all", href: "/super-host/properties" }}>
        <ul className="divide-y divide-surface-hover">
          {pendingPreview.map((p) => (
            <li key={p.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
              <div className="min-w-0">
                <p className="text-sm text-foreground truncate">{p.request}</p>
                <p className="text-xs text-subtle">{p.property} · submitted by {p.host}</p>
              </div>
              <StatusPill tone="primary">Pending</StatusPill>
            </li>
          ))}
        </ul>
        <div className="px-5 py-3 border-t border-surface-hover">
          <Link href="/super-host/properties" className="text-xs text-primary hover:underline flex items-center gap-1 w-fit">
            Approve pricing & promotions <ArrowUpRight size={12} />
          </Link>
        </div>
      </SectionCard>

      {/* Expenses, maintenance & local partners — full cluster operations */}
      <div className="grid lg:grid-cols-3 gap-6">
        <SectionCard title="Cluster Expenses · MTD" icon={Receipt}>
          <ul className="divide-y divide-surface-hover">
            {clusterExpenses.map((e) => (
              <li key={e.id} className="flex items-center justify-between gap-3 px-5 py-2.5">
                <p className="text-sm text-foreground">{e.category}</p>
                <span className="text-sm font-semibold text-foreground tabular-nums">{e.amount}</span>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between px-5 py-3.5 border-t border-surface-hover">
            <p className="text-xs text-muted">Total across 32 properties</p>
            <span className="text-sm font-bold text-foreground tabular-nums">₹2,92,700</span>
          </div>
        </SectionCard>

        <SectionCard title="Maintenance & Vendors" icon={Wrench}>
          <ul className="divide-y divide-surface-hover">
            {maintenanceLog.map((m) => (
              <li key={m.id} className="px-5 py-3.5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-foreground truncate">{m.job}</p>
                  <StatusPill
                    tone={m.status === "Overdue" ? "terracotta" : m.status === "In progress" ? "primary" : "muted"}
                  >
                    {m.status}
                  </StatusPill>
                </div>
                <p className="text-xs text-subtle mt-1">{m.property} · {m.vendor}</p>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between gap-3 px-5 py-3.5 border-t border-surface-hover">
            <p className="text-xs text-muted">Maintenance calendar · 6 jobs this month</p>
            <button className="px-3.5 py-1.5 text-xs font-semibold bg-primary text-primary-foreground rounded-full hover:bg-primary-hover transition-colors">
              Log Repair
            </button>
          </div>
        </SectionCard>

        <SectionCard title="Local Partners" icon={Compass}>
          <ul className="divide-y divide-surface-hover">
            {localPartners.map((p) => (
              <li key={p.id} className="flex items-center justify-between gap-3 px-5 py-4">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">{p.type}</p>
                  <p className="text-xs text-subtle mt-0.5">{p.detail}</p>
                </div>
                <button className="px-3.5 py-1.5 text-xs font-medium border border-border rounded-full text-muted hover:text-primary hover:border-primary/40 transition-colors shrink-0">
                  {p.status}
                </button>
              </li>
            ))}
          </ul>
          <p className="px-5 py-3 text-[11px] text-subtle border-t border-surface-hover">
            Experiences, food menus and rental fleets listed under your cluster&apos;s stays.
          </p>
        </SectionCard>
      </div>
    </div>
  );
}

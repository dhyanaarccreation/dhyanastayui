"use client";

import {
  Server,
  Percent,
  Lock,
  Database,
  ShieldCheck,
  Activity,
  Flag,
  Clock,
  Users,
  Building,
  Briefcase,
  IndianRupee,
  CalendarDays,
  Crown,
  Sprout,
  Map,
  Plus,
  Landmark,
  UserCog,
} from "lucide-react";
import { PageHeader, StatGrid, SectionCard, StatusPill } from "@/app/components/DashboardUI";

// ============================================
// SUPER ADMIN — Overview (Founder Dashboard)
// Full-access root view: system health, feature
// rollouts, and the platform's live audit feed.
// ============================================

const modules = [
  { icon: Server, title: "Platform Control", href: "/super-admin/platform", desc: "All modules, feature flags, listings, ads" },
  { icon: Percent, title: "Commerce Rules", href: "/super-admin/commerce", desc: "Pricing, commission floors, revenue control" },
  { icon: Lock, title: "Security & Access", href: "/super-admin/security", desc: "Permissions, admin roster, audit logs" },
  { icon: Database, title: "Systems & AI", href: "/super-admin/systems", desc: "Integrations, health, AI settings, backups" },
];

const auditFeed = [
  { id: "a1", text: "CA Neha Gupta approved a ₹1.8L payout batch", time: "2 min ago", tone: "sage" as const },
  { id: "a2", text: "Feature flag \"ai-concierge-v2\" rolled out to 25%", time: "18 min ago", tone: "primary" as const },
  { id: "a3", text: "Meera Chandran approved 2 new host applications — TN region", time: "41 min ago", tone: "sage" as const },
  { id: "a4", text: "Failed login attempt blocked — unrecognised device", time: "1h ago", tone: "terracotta" as const },
  { id: "a5", text: "Rahul Verma updated pricing rules for South Cluster", time: "2h ago", tone: "muted" as const },
];

const flags = [
  { name: "ai-concierge-v2", rollout: 25, status: "Rolling out" },
  { name: "membership-founders-circle", rollout: 100, status: "Live" },
  { name: "regional-admin-dashboard", rollout: 100, status: "Live" },
  { name: "razorpayx-auto-refunds", rollout: 10, status: "Testing" },
];

// ---- Employee Management (payroll, attendance, departments, leave) ----
const employees = [
  { id: "e1", name: "Priya Nair", dept: "Customer Support", salary: "₹58,000", attendance: "96%", leave: null as string | null },
  { id: "e2", name: "Aditya Sharma", dept: "Marketing", salary: "₹74,000", attendance: "92%", leave: "2 days pending" },
  { id: "e3", name: "CA Neha Gupta", dept: "Finance", salary: "₹1,10,000", attendance: "99%", leave: null },
  { id: "e4", name: "Maj. Arjun Singh", dept: "SOS Operations", salary: "₹88,000", attendance: "98%", leave: "1 day pending" },
];

// ---- Organization Management (regions, regional admins, super hosts) ----
const regions = [
  { id: "r1", name: "Tamil Nadu · Pondicherry", regionalAdmin: "Meera Chandran", superHost: "Rahul Verma", performance: "+12% MoM" },
  { id: "r2", name: "Kerala", regionalAdmin: "Thomas K.", superHost: "Divya Krishnan", performance: "+8% MoM" },
  { id: "r3", name: "Himachal Pradesh", regionalAdmin: "Unassigned", superHost: "Ankit Thakur", performance: "+15% MoM" },
];

// ---- Membership plan control (plans, pricing, reward & coupon rules) ----
const membershipPlans = [
  { id: "m1", name: "Explorer", price: "Free", members: "11,830", status: "Live" },
  { id: "m2", name: "Forest+", price: "₹4,999 / yr", members: "2,140", status: "Live" },
  { id: "m3", name: "Founders Circle", price: "Invite only", members: "235", status: "Live" },
];

const rewardRules = [
  { id: "rr1", rule: "₹100 spent = 1 reward point", scope: "All bookings" },
  { id: "rr2", rule: "10 points = 1 seed ball donation", scope: "Green rewards" },
  { id: "rr3", rule: "Referral = ₹500 both sides", scope: "After first stay" },
];

// ---- Financial controls snapshot (full detail lives in Finance dashboard) ----
const financialControls = [
  { id: "fc1", label: "GST payable · July", value: "₹3.4L", note: "due Aug 20", tone: "primary" as const },
  { id: "fc2", label: "TDS deducted · July", value: "₹1.1L", note: "filed on time", tone: "sage" as const },
  { id: "fc3", label: "Profit & Loss · MTD", value: "+₹9.8L", note: "margin 23%", tone: "sage" as const },
  { id: "fc4", label: "Platform expenses · MTD", value: "₹11.2L", note: "within budget", tone: "muted" as const },
];

export default function SuperAdminPage() {
  return (
    <div className="space-y-4 pb-12 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <PageHeader
          title="Super Admin"
          subtitle="Root access — every module, every region, every rupee. Nothing here is scoped."
        />
        <StatusPill tone="sage">
          <ShieldCheck size={11} /> Full platform access · audit logged
        </StatusPill>
      </div>

      <StatGrid
        stats={[
          { label: "Modules Online", value: "26/26", delta: "all healthy", icon: Server },
          { label: "Feature Flags", value: "14", delta: "3 in rollout", icon: Flag },
          { label: "System Uptime", value: "99.98%", delta: "30 days", icon: Activity },
          { label: "Audit Events Today", value: "1,872", delta: "0 critical", icon: Clock },
        ]}
      />

      {/* Module shortcuts */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {modules.map((m) => (
          <a
            key={m.title}
            href={m.href}
            className="bg-surface border border-border rounded-2xl p-5 hover:border-primary/40 transition-colors group"
          >
            <span className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <m.icon size={18} />
            </span>
            <p className="text-sm font-semibold text-foreground mt-3.5 group-hover:text-primary transition-colors">{m.title}</p>
            <p className="text-xs text-muted mt-1 leading-relaxed">{m.desc}</p>
          </a>
        ))}
      </div>

      {/* Global platform snapshot — the founder-level numbers from every module */}
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wider text-subtle mb-3">Platform Snapshot</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Users", value: "14,205", delta: "+2.4% MoM", icon: Users },
            { label: "Total Hosts", value: "624", delta: "38 pending approval", icon: Building },
            { label: "Total Properties", value: "182", delta: "+5 this month", icon: Building },
            { label: "Total Investors", value: "96", delta: "₹18.6Cr deployed", icon: Briefcase },
            { label: "Total Revenue · MTD", value: "₹42.6L", delta: "+9% MoM", icon: IndianRupee },
            { label: "Active Bookings", value: "342", delta: "78% occupancy", icon: CalendarDays },
            { label: "Members", value: "14,205", delta: "2,375 paid tiers", icon: Crown },
            { label: "Seed Balls Dispersed", value: "1.28Cr", delta: "12.8% of goal", icon: Sprout },
          ].map((s) => (
            <div key={s.label} className="bg-surface border border-border rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted">{s.label}</p>
                <s.icon size={15} className="text-primary" />
              </div>
              <p className="text-2xl font-bold text-foreground mt-1.5 tabular-nums">{s.value}</p>
              <p className="text-[11px] text-sage mt-1">{s.delta}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Employee & organization management */}
      <div className="grid lg:grid-cols-2 gap-6">
        <SectionCard title="Employee Management" icon={UserCog}>
          <ul className="divide-y divide-surface-hover">
            {employees.map((e) => (
              <li key={e.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{e.name}</p>
                  <p className="text-xs text-subtle">{e.dept} · attendance {e.attendance}</p>
                </div>
                <div className="flex items-center gap-2.5 shrink-0">
                  {e.leave && <StatusPill tone="primary">{e.leave}</StatusPill>}
                  <span className="text-sm font-semibold text-foreground tabular-nums">{e.salary}</span>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between gap-3 px-5 py-3.5 border-t border-surface-hover">
            <p className="text-xs text-muted">July payroll · 24 employees · ₹16.4L</p>
            <button className="px-4 py-2 text-xs font-semibold bg-primary text-primary-foreground rounded-full hover:bg-primary-hover transition-colors">
              Run Payroll
            </button>
          </div>
        </SectionCard>

        <SectionCard title="Organization Management" icon={Map}>
          <ul className="divide-y divide-surface-hover">
            {regions.map((r) => (
              <li key={r.id} className="px-5 py-3.5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-foreground truncate">{r.name}</p>
                  <StatusPill tone="sage">{r.performance}</StatusPill>
                </div>
                <p className="text-xs text-subtle mt-1">
                  Regional Admin:{" "}
                  <span className={r.regionalAdmin === "Unassigned" ? "text-terracotta font-medium" : "text-muted"}>
                    {r.regionalAdmin}
                  </span>{" "}
                  · Super Host: {r.superHost}
                </p>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between gap-3 px-5 py-3.5 border-t border-surface-hover">
            <p className="text-xs text-muted">Regions define approval scope &amp; reporting.</p>
            <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-primary text-primary-foreground rounded-full hover:bg-primary-hover transition-colors">
              <Plus size={13} /> Create Region
            </button>
          </div>
        </SectionCard>
      </div>

      {/* Membership control + financial controls */}
      <div className="grid lg:grid-cols-2 gap-6">
        <SectionCard title="Membership Plans & Rewards" icon={Crown}>
          <ul className="divide-y divide-surface-hover">
            {membershipPlans.map((m) => (
              <li key={m.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">{m.name}</p>
                  <p className="text-xs text-subtle">{m.members} members</p>
                </div>
                <div className="flex items-center gap-2.5 shrink-0">
                  <span className="text-sm font-semibold text-foreground">{m.price}</span>
                  <StatusPill tone="sage">{m.status}</StatusPill>
                </div>
              </li>
            ))}
          </ul>
          <div className="px-5 py-3.5 border-t border-surface-hover">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-subtle mb-2">Reward &amp; Coupon Rules</p>
            <ul className="space-y-1.5">
              {rewardRules.map((r) => (
                <li key={r.id} className="flex items-center justify-between gap-3 text-xs">
                  <span className="text-muted">{r.rule}</span>
                  <span className="text-subtle shrink-0">{r.scope}</span>
                </li>
              ))}
            </ul>
          </div>
        </SectionCard>

        <SectionCard title="Financial Controls" icon={Landmark} action={{ label: "Finance dashboard", href: "/finance" }}>
          <ul className="divide-y divide-surface-hover">
            {financialControls.map((f) => (
              <li key={f.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
                <p className="text-sm text-foreground">{f.label}</p>
                <div className="flex items-center gap-2.5 shrink-0">
                  <span className="text-sm font-semibold text-foreground tabular-nums">{f.value}</span>
                  <StatusPill tone={f.tone}>{f.note}</StatusPill>
                </div>
              </li>
            ))}
          </ul>
          <p className="px-5 py-3 text-[11px] text-subtle border-t border-surface-hover">
            GST &amp; TDS reports, P&amp;L and payroll exports are generated from the Finance module.
          </p>
        </SectionCard>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <SectionCard title="Live Audit Feed" icon={Activity} className="lg:col-span-2">
          <ul className="divide-y divide-surface-hover">
            {auditFeed.map((a) => (
              <li key={a.id} className="flex items-start justify-between gap-3 px-5 py-3.5">
                <div className="flex items-start gap-2.5 min-w-0">
                  <StatusPill tone={a.tone}>•</StatusPill>
                  <p className="text-xs text-muted leading-relaxed">{a.text}</p>
                </div>
                <span className="text-[10px] text-subtle shrink-0 whitespace-nowrap">{a.time}</span>
              </li>
            ))}
          </ul>
          <p className="px-5 py-3 text-[11px] text-subtle border-t border-surface-hover">
            Every action across every dashboard is written here — retained 24 months.
          </p>
        </SectionCard>

        <SectionCard title="Feature Flag Rollouts" icon={Flag}>
          <div className="px-5 py-4 space-y-4">
            {flags.map((f) => (
              <div key={f.name}>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-foreground font-mono">{f.name}</span>
                  <span className="text-subtle">{f.rollout}%</span>
                </div>
                <div className="h-2 rounded-full bg-surface-hover overflow-hidden">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${f.rollout}%` }} />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import {
  MapPin,
  ClipboardList,
  IndianRupee,
  TrendingUp,
  AlertTriangle,
  ArrowUpRight,
  Home,
  Building,
  Users,
  Receipt,
  Briefcase,
  FileText,
} from "lucide-react";
import { PageHeader, StatGrid, SectionCard, StatusPill } from "@/app/components/DashboardUI";

// ============================================
// REGIONAL ADMIN — Overview
// Manages hosts, properties, marketing and
// escalations for an assigned region only.
// Reports up to Super Admin; assigns Super Hosts
// & Hosts to properties within scope.
// ============================================

const approvalPreview = [
  { id: "ap1", type: "Host", name: "Karuna Homestays", region: "Pondicherry", submitted: "Jul 18" },
  { id: "ap2", type: "Property", name: "Palmyra Farm Cottage", region: "Auroville", submitted: "Jul 17" },
  { id: "ap3", type: "Host", name: "Coastal Roots Stays", region: "Cuddalore", submitted: "Jul 16" },
];

const escalationPreview = [
  { id: "es1", issue: "Guest refund dispute — Stone Valley Villa", severity: "High", sla: "2h left" },
  { id: "es2", issue: "Host unresponsive — Palmyra Farm Cottage", severity: "Medium", sla: "1d left" },
];

const campaignPreview = [
  { id: "c1", name: "Monsoon Wellness Week — TN & Pondi", status: "Live" },
  { id: "c2", name: "Weekend Escapes 15%", status: "Live" },
  { id: "c3", name: "Auroville Heritage Trail blog", status: "Scheduled" },
];

// Regional staff managed by this admin (payroll stays with Super Admin).
const regionalStaff = [
  { id: "st1", name: "Lakshmi Venkat", role: "Field Coordinator", area: "Pondicherry", status: "Active" },
  { id: "st2", name: "Arun Prasad", role: "Quality Inspector", area: "Auroville", status: "On visit" },
  { id: "st3", name: "Sofia D'Souza", role: "Guest Relations", area: "Chennai ECR", status: "Active" },
];

const regionalExpenses = [
  { id: "ex1", category: "Property inspections & travel", amount: "₹42,300" },
  { id: "ex2", category: "Regional marketing spend", amount: "₹68,500" },
  { id: "ex3", category: "Local staff & contractors", amount: "₹1,24,000" },
  { id: "ex4", category: "Host training workshops", amount: "₹18,200" },
];

// View-only — investor approvals stay with Super Admin.
const regionalInvestors = [
  { id: "in1", name: "Navin Kumar", project: "Bay Breeze Villas · Phase 2", value: "₹48L" },
  { id: "in2", name: "Shruti Agarwal", project: "Auroville Eco Cottages", value: "₹32L" },
  { id: "in3", name: "Mohan Reddy", project: "ECR Beach House Cluster", value: "₹75L" },
];

const localCmsContent = [
  { id: "cm1", page: "Tamil Nadu landing page", type: "Landing Page", status: "Published" },
  { id: "cm2", page: "Pondicherry travel guide", type: "Blog", status: "Draft" },
  { id: "cm3", page: "Monsoon offers banner — regional", type: "Banner", status: "Published" },
];

export default function RegionalAdminPage() {
  return (
    <div className="space-y-4 pb-12 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <PageHeader
          title="Regional Overview"
          subtitle="Tamil Nadu & Pondicherry — hosts, properties, marketing and escalations for your assigned region."
        />
        <StatusPill tone="sage">
          <MapPin size={11} /> Scope: Tamil Nadu · Pondicherry
        </StatusPill>
      </div>

      <StatGrid
        stats={[
          { label: "Pending Approvals", value: "6", delta: "3 hosts · 3 properties", icon: ClipboardList },
          { label: "Regional Revenue", value: "₹18.2L", delta: "+12% MoM", icon: IndianRupee },
          { label: "Regional Occupancy", value: "76%", delta: "+5% MoM", icon: TrendingUp },
          { label: "Open Escalations", value: "2", delta: "1 SLA at risk", icon: AlertTriangle },
        ]}
      />

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Pending approvals */}
        <SectionCard
          title="Pending Approvals"
          icon={ClipboardList}
          className="lg:col-span-2"
          action={{ label: "Review all", href: "/regional-admin/approvals" }}
        >
          <ul className="divide-y divide-surface-hover">
            {approvalPreview.map((a) => (
              <li key={a.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    {a.type === "Host" ? <Home size={15} /> : <Building size={15} />}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm text-foreground truncate">{a.name}</p>
                    <p className="text-xs text-subtle">{a.type} · {a.region} · submitted {a.submitted}</p>
                  </div>
                </div>
                <StatusPill tone="primary">Pending</StatusPill>
              </li>
            ))}
          </ul>
        </SectionCard>

        {/* Escalations */}
        <SectionCard title="Escalations" icon={AlertTriangle} action={{ label: "Full log", href: "/regional-admin/approvals" }}>
          <ul className="divide-y divide-surface-hover">
            {escalationPreview.map((e) => (
              <li key={e.id} className="px-5 py-3.5">
                <p className="text-xs text-foreground leading-snug">{e.issue}</p>
                <div className="flex items-center justify-between mt-2">
                  <StatusPill tone={e.severity === "High" ? "terracotta" : "primary"}>{e.severity}</StatusPill>
                  <span className="text-[10px] text-subtle">{e.sla}</span>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      {/* Regional campaign snapshot */}
      <SectionCard title="Regional Marketing Snapshot" icon={TrendingUp} action={{ label: "Manage", href: "/regional-admin/marketing" }}>
        <ul className="divide-y divide-surface-hover">
          {campaignPreview.map((c) => (
            <li key={c.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
              <p className="text-sm text-foreground truncate">{c.name}</p>
              <StatusPill tone={c.status === "Live" ? "sage" : "muted"}>{c.status}</StatusPill>
            </li>
          ))}
        </ul>
        <div className="px-5 py-3 border-t border-surface-hover">
          <Link href="/regional-admin/marketing" className="text-xs text-primary hover:underline flex items-center gap-1 w-fit">
            Manage regional campaigns, banners & blogs <ArrowUpRight size={12} />
          </Link>
        </div>
      </SectionCard>

      {/* Staff & expenses — scoped to this region only */}
      <div className="grid lg:grid-cols-2 gap-6">
        <SectionCard title="Regional Staff" icon={Users}>
          <ul className="divide-y divide-surface-hover">
            {regionalStaff.map((s) => (
              <li key={s.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{s.name}</p>
                  <p className="text-xs text-subtle">{s.role} · {s.area}</p>
                </div>
                <StatusPill tone={s.status === "Active" ? "sage" : "primary"}>{s.status}</StatusPill>
              </li>
            ))}
          </ul>
          <p className="px-5 py-3 text-[11px] text-subtle border-t border-surface-hover">
            Staff assignments only — company-wide payroll is managed by the Super Admin.
          </p>
        </SectionCard>

        <SectionCard title="Regional Expenses" icon={Receipt}>
          <ul className="divide-y divide-surface-hover">
            {regionalExpenses.map((e) => (
              <li key={e.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
                <p className="text-sm text-foreground">{e.category}</p>
                <span className="text-sm font-semibold text-foreground tabular-nums">{e.amount}</span>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between px-5 py-3.5 border-t border-surface-hover">
            <p className="text-xs text-muted">MTD regional expenses</p>
            <span className="text-sm font-bold text-foreground tabular-nums">₹2,53,000</span>
          </div>
        </SectionCard>
      </div>

      {/* Investors (view-only) & local CMS content */}
      <div className="grid lg:grid-cols-2 gap-6">
        <SectionCard title="Regional Investors" icon={Briefcase}>
          <div className="px-5 pt-3.5">
            <StatusPill tone="muted">View only — approvals with Super Admin</StatusPill>
          </div>
          <ul className="divide-y divide-surface-hover mt-1">
            {regionalInvestors.map((i) => (
              <li key={i.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{i.name}</p>
                  <p className="text-xs text-subtle truncate">{i.project}</p>
                </div>
                <span className="text-sm font-semibold text-foreground tabular-nums shrink-0">{i.value}</span>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Local CMS Content" icon={FileText} action={{ label: "Manage", href: "/regional-admin/marketing" }}>
          <ul className="divide-y divide-surface-hover">
            {localCmsContent.map((c) => (
              <li key={c.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
                <div className="min-w-0">
                  <p className="text-sm text-foreground truncate">{c.page}</p>
                  <p className="text-xs text-subtle">{c.type}</p>
                </div>
                <StatusPill tone={c.status === "Published" ? "sage" : "muted"}>{c.status}</StatusPill>
              </li>
            ))}
          </ul>
          <p className="px-5 py-3 text-[11px] text-subtle border-t border-surface-hover">
            Regional pages only — global CMS remains with Super Admin.
          </p>
        </SectionCard>
      </div>
    </div>
  );
}

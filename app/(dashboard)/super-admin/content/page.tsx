"use client";

import { useState } from "react";
import {
  FileText,
  Image,
  Megaphone,
  UserPlus,
  Users,
  Wrench,
  AlertTriangle,
  MessageSquare,
  Check,
  X,
  ArrowUpRight,
} from "lucide-react";
import { PageHeader, SectionCard, StatGrid, StatusPill, Toggle } from "@/app/components/DashboardUI";

// ============================================
// SUPER ADMIN — CMS & Operations
// Global content oversight (deep editing lives in
// Admin → CMS) and day-to-day operations: staff
// applications, assignments, tasks & incidents.
// ============================================

const contentTypes = [
  { id: "ct1", type: "Homepage Banners", status: "Published", updated: "2d ago" },
  { id: "ct2", type: "Blogs", status: "Published", updated: "1d ago" },
  { id: "ct3", type: "Property Stories", status: "Published", updated: "5d ago" },
  { id: "ct4", type: "Destination Guides", status: "Draft", updated: "6h ago" },
  { id: "ct5", type: "FAQs", status: "Published", updated: "2w ago" },
  { id: "ct6", type: "Policies", status: "Published", updated: "1mo ago" },
  { id: "ct7", type: "Careers", status: "Published", updated: "3w ago" },
  { id: "ct8", type: "Contact Information", status: "Published", updated: "1mo ago" },
];

const staffApplications = [
  { id: "sa1", name: "Divya Krishnan", role: "Regional Host — Kerala", experience: "4 yrs hospitality" },
  { id: "sa2", name: "Arjun Nair", role: "Field Coordinator — Pondicherry", experience: "2 yrs ops" },
];

const assignments = [
  { id: "as1", type: "Regional", who: "Meera Chandran", scope: "Tamil Nadu · Pondicherry" },
  { id: "as2", type: "Host", who: "Vikram Patel", scope: "3 properties · Auroville" },
  { id: "as3", type: "Regional", who: "Unassigned", scope: "Himachal Pradesh" },
];

const tasksIncidents = [
  { id: "ti1", label: "Pool filter replacement overdue", type: "Maintenance", severity: "Medium" },
  { id: "ti2", label: "Payment gateway latency spike", type: "Incident", severity: "High" },
  { id: "ti3", label: "Regional Admin onboarding — HP", type: "Task", severity: "Low" },
];

export default function SuperAdminContentPage() {
  const [applications, setApplications] = useState(staffApplications);
  const [items, setItems] = useState(tasksIncidents);
  const [announcementOn, setAnnouncementOn] = useState(true);

  const decideApplication = (id: string) => setApplications((p) => p.filter((a) => a.id !== id));
  const clearItem = (id: string) => setItems((p) => p.filter((i) => i.id !== id));

  return (
    <div className="space-y-4 pb-12 animate-fade-in">
      <PageHeader
        title="CMS & Operations"
        subtitle="Global content oversight and day-to-day operations — staffing, assignments, tasks and incidents."
      />

      <StatGrid
        stats={[
          { label: "Content Items", value: String(contentTypes.length), delta: "1 draft pending", icon: FileText },
          { label: "Staff Applications", value: String(applications.length), delta: "awaiting review", icon: UserPlus },
          { label: "Open Assignments", value: "1", delta: "region unassigned", icon: Users },
          { label: "Open Tasks & Incidents", value: String(items.length), delta: "1 high severity", icon: AlertTriangle },
        ]}
      />

      <SectionCard title="Content Management" icon={FileText} action={{ label: "Open full CMS", href: "/admin/cms" }}>
        <ul className="divide-y divide-surface-hover">
          {contentTypes.map((c) => (
            <li key={c.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
              <div className="min-w-0">
                <p className="text-sm text-foreground truncate">{c.type}</p>
                <p className="text-xs text-subtle">Updated {c.updated}</p>
              </div>
              <StatusPill tone={c.status === "Published" ? "sage" : "muted"}>{c.status}</StatusPill>
            </li>
          ))}
        </ul>
        <p className="px-5 py-3 text-[11px] text-subtle border-t border-surface-hover flex items-center gap-1">
          Media gallery and page-by-page editing happen in the Admin CMS module.
          <a href="/admin/cms" className="text-primary hover:underline flex items-center gap-0.5">
            Open <ArrowUpRight size={11} />
          </a>
        </p>
      </SectionCard>

      <div className="grid lg:grid-cols-2 gap-6">
        <SectionCard title="Homepage Announcement" icon={Megaphone}>
          <div className="px-5 py-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-foreground">Site-wide announcement strip</p>
              <p className="text-xs text-muted mt-0.5">
                {announcementOn ? "Live on homepage & every dashboard" : "Currently hidden"}
              </p>
            </div>
            <button onClick={() => setAnnouncementOn((v) => !v)} aria-label="Toggle homepage announcement">
              <Toggle on={announcementOn} />
            </button>
          </div>
          <div className="mx-5 mb-5 rounded-xl bg-background border border-dashed border-border p-3.5 text-xs text-muted">
            &ldquo;100 Million Seed Ball Mission — 12.8% to goal. Join the movement.&rdquo;
          </div>
        </SectionCard>

        <SectionCard title="Media Gallery" icon={Image}>
          <div className="px-5 py-4">
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square rounded-lg bg-surface-hover" />
              ))}
            </div>
            <p className="text-xs text-muted mt-3">248 assets · 6.2 GB used across property, experience & campaign media.</p>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Staff Applications" icon={UserPlus}>
        <ul className="divide-y divide-surface-hover">
          {applications.map((a) => (
            <li key={a.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{a.name}</p>
                <p className="text-xs text-subtle mt-0.5">{a.role} · {a.experience}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => decideApplication(a.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-sage/40 text-sage rounded-full hover:bg-sage hover:text-white transition-colors"
                >
                  <Check size={12} /> Approve
                </button>
                <button
                  onClick={() => decideApplication(a.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-border text-muted rounded-full hover:text-terracotta hover:border-terracotta/40 transition-colors"
                >
                  <X size={12} /> Reject
                </button>
              </div>
            </li>
          ))}
          {applications.length === 0 && <li className="px-5 py-6 text-center text-sm text-subtle">Queue is clear.</li>}
        </ul>
      </SectionCard>

      <div className="grid lg:grid-cols-2 gap-6">
        <SectionCard title="Regional & Host Assignments" icon={Users}>
          <ul className="divide-y divide-surface-hover">
            {assignments.map((a) => (
              <li key={a.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
                <div className="min-w-0">
                  <p className={`text-sm truncate ${a.who === "Unassigned" ? "text-terracotta font-medium" : "text-foreground"}`}>
                    {a.who}
                  </p>
                  <p className="text-xs text-subtle mt-0.5">{a.scope}</p>
                </div>
                <StatusPill tone={a.type === "Regional" ? "primary" : "muted"}>{a.type}</StatusPill>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Tasks & Incidents" icon={Wrench}>
          <ul className="divide-y divide-surface-hover">
            {items.map((i) => (
              <li key={i.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
                <div className="min-w-0">
                  <p className="text-sm text-foreground truncate">{i.label}</p>
                  <p className="text-xs text-subtle">{i.type}</p>
                </div>
                <div className="flex items-center gap-2.5 shrink-0">
                  <StatusPill tone={i.severity === "High" ? "terracotta" : i.severity === "Medium" ? "primary" : "muted"}>
                    {i.severity}
                  </StatusPill>
                  <button
                    onClick={() => clearItem(i.id)}
                    className="px-3 py-1.5 text-xs font-medium border border-border rounded-full text-muted hover:text-foreground transition-colors"
                  >
                    Clear
                  </button>
                </div>
              </li>
            ))}
            {items.length === 0 && <li className="px-5 py-6 text-center text-sm text-subtle">Nothing outstanding.</li>}
          </ul>
          <p className="px-5 py-3 text-[11px] text-subtle border-t border-surface-hover flex items-center gap-1.5">
            <MessageSquare size={11} /> Internal messaging &amp; full task monitoring live in each team's dashboard.
          </p>
        </SectionCard>
      </div>
    </div>
  );
}

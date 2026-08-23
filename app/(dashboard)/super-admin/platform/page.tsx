"use client";

import { useState } from "react";
import {
  Server,
  Flag,
  Building,
  Megaphone,
  Settings2,
  X,
  Plus,
  Check,
  UserCheck,
  Sprout,
} from "lucide-react";
import { PageHeader, SectionCard, StatusPill, Toggle } from "@/app/components/DashboardUI";
import { dashboardRoles } from "@/lib/dashboards";
import { seedBallMission } from "@/lib/seed-ball-mission";

// ============================================
// SUPER ADMIN — Platform Control
// Every dashboard module, feature flag, listing
// moderation queue and platform-wide ad slot —
// all live-toggleable from one root screen.
// ============================================

const initialFlags = [
  { id: "f1", name: "ai-concierge-v2", desc: "Unlimited AI concierge for Forest+ members", on: true },
  { id: "f2", name: "membership-founders-circle", desc: "Invitation-only tier visible on membership page", on: true },
  { id: "f3", name: "razorpayx-auto-refunds", desc: "Auto-process refunds under ₹5,000", on: false },
  { id: "f4", name: "regional-admin-dashboard", desc: "Regional Admin role & routes", on: true },
];

const listingQueue = [
  { id: "l1", name: "Palmyra Farm Cottage", region: "Auroville", status: "Live" },
  { id: "l2", name: "Whistling Pines Homestead", region: "Coorg", status: "Live" },
  { id: "l3", name: "Old Mill Guesthouse", region: "Wayanad", status: "Flagged" },
];

const adSlots = [
  { id: "ad1", name: "Homepage Spotlight", advertiser: "Nila Wellness Retreat", on: true },
  { id: "ad2", name: "Stays Top Banner", advertiser: "Dhyana Curated Stays", on: true },
  { id: "ad3", name: "Food Hub Tile", advertiser: "Meena's Kitchen", on: false },
];

// Pending regional / local host applications awaiting a super-admin decision.
const hostApplications = [
  { id: "h1", name: "Kaveri Homestays Collective", region: "Madurai, Tamil Nadu", role: "Regional Host", properties: 6, decision: null as "approved" | "rejected" | null },
  { id: "h2", name: "Anand Krishnan", region: "Varkala, Kerala", role: "Local Host", properties: 1, decision: null },
  { id: "h3", name: "Blue Pine Retreats", region: "Manali, Himachal Pradesh", role: "Regional Host", properties: 4, decision: null },
  { id: "h4", name: "Sunita Rao", region: "Hampi, Karnataka", role: "Local Host", properties: 2, decision: null },
];

const initialSpecies = ["Neem", "Tamarind", "Pongamia", "Banyan", "Amla", "Jamun"];

export default function SuperAdminPlatformPage() {
  const [modules, setModules] = useState<Record<string, boolean>>({});
  const [flags, setFlags] = useState(initialFlags);
  const [listings, setListings] = useState(listingQueue);
  const [ads, setAds] = useState(adSlots);
  const [applications, setApplications] = useState(hostApplications);

  // Add Property form
  const [newName, setNewName] = useState("");
  const [newRegion, setNewRegion] = useState("");

  // Seed Ball Mission master controls
  const [campaignActive, setCampaignActive] = useState(true);
  const [perBooking, setPerBooking] = useState(seedBallMission.perBookingContribution);
  const [monthlyTarget, setMonthlyTarget] = useState(seedBallMission.monthlyTarget);
  const [yearlyTarget, setYearlyTarget] = useState(seedBallMission.yearlyTarget);
  const [pointsPerBall, setPointsPerBall] = useState(10);
  const [species, setSpecies] = useState(initialSpecies);
  const [newSpecies, setNewSpecies] = useState("");
  const [reportPublished, setReportPublished] = useState(false);

  const isModuleOn = (slug: string) => modules[slug] ?? true;
  const toggleModule = (slug: string) => setModules((p) => ({ ...p, [slug]: !isModuleOn(slug) }));
  const toggleFlag = (id: string) => setFlags((p) => p.map((f) => (f.id === id ? { ...f, on: !f.on } : f)));
  const toggleAd = (id: string) => setAds((p) => p.map((a) => (a.id === id ? { ...a, on: !a.on } : a)));
  const delist = (id: string) => setListings((p) => p.filter((l) => l.id !== id));

  const addProperty = () => {
    if (!newName.trim() || !newRegion.trim()) return;
    setListings((p) => [
      { id: `l${Date.now()}`, name: newName.trim(), region: newRegion.trim(), status: "Live" },
      ...p,
    ]);
    setNewName("");
    setNewRegion("");
  };

  const decide = (id: string, decision: "approved" | "rejected") =>
    setApplications((p) => p.map((a) => (a.id === id ? { ...a, decision } : a)));

  const addSpecies = () => {
    const name = newSpecies.trim();
    if (!name || species.some((s) => s.toLowerCase() === name.toLowerCase())) return;
    setSpecies((p) => [...p, name]);
    setNewSpecies("");
  };
  const removeSpecies = (name: string) => setSpecies((p) => p.filter((s) => s !== name));

  return (
    <div className="space-y-4 pb-12 animate-fade-in">
      <PageHeader
        title="Platform Control"
        subtitle="Every dashboard module, feature flag, listing and ad slot — live across the whole platform."
      />

      <SectionCard title="All Modules" icon={Server}>
        <p className="px-5 pt-4 text-xs text-muted">
          {dashboardRoles.length} dashboard roles registered. Disabling a module hides it platform-wide.
        </p>
        <ul className="divide-y divide-surface-hover mt-2">
          {dashboardRoles.map((r) => (
            <li key={r.slug} className="flex items-center justify-between gap-3 px-5 py-3.5">
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <r.icon size={15} />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{r.title}</p>
                  <p className="text-xs text-subtle">{r.group}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <StatusPill tone={isModuleOn(r.slug) ? "sage" : "terracotta"}>
                  {isModuleOn(r.slug) ? "Enabled" : "Disabled"}
                </StatusPill>
                <button onClick={() => toggleModule(r.slug)} aria-label={`Toggle ${r.title}`}>
                  <Toggle on={isModuleOn(r.slug)} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </SectionCard>

      <div className="grid lg:grid-cols-2 gap-6">
        <SectionCard title="Feature Flags" icon={Flag}>
          <ul className="divide-y divide-surface-hover">
            {flags.map((f) => (
              <li key={f.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
                <div className="min-w-0">
                  <p className="text-sm font-mono text-foreground truncate">{f.name}</p>
                  <p className="text-xs text-subtle mt-0.5">{f.desc}</p>
                </div>
                <button onClick={() => toggleFlag(f.id)} aria-label={`Toggle ${f.name}`} className="shrink-0">
                  <Toggle on={f.on} />
                </button>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Advertisements" icon={Megaphone}>
          <ul className="divide-y divide-surface-hover">
            {ads.map((a) => (
              <li key={a.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
                <div className="min-w-0">
                  <p className="text-sm text-foreground truncate">{a.name}</p>
                  <p className="text-xs text-subtle">{a.advertiser}</p>
                </div>
                <button onClick={() => toggleAd(a.id)} aria-label={`Toggle ${a.name}`} className="shrink-0">
                  <Toggle on={a.on} />
                </button>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <SectionCard title="Listing / Delisting" icon={Building}>
        {/* Super admin can list a property directly, bypassing the host flow */}
        <div className="flex flex-col sm:flex-row gap-2 px-5 pt-4 pb-3 border-b border-surface-hover">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Property name"
            className="flex-1 text-sm bg-background border border-border rounded-xl px-3.5 py-2 text-foreground placeholder-subtle focus:outline-none focus:border-primary transition-colors"
          />
          <input
            type="text"
            value={newRegion}
            onChange={(e) => setNewRegion(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addProperty()}
            placeholder="Region"
            className="flex-1 text-sm bg-background border border-border rounded-xl px-3.5 py-2 text-foreground placeholder-subtle focus:outline-none focus:border-primary transition-colors"
          />
          <button
            onClick={addProperty}
            disabled={!newName.trim() || !newRegion.trim()}
            className="flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold bg-primary text-primary-foreground rounded-xl hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
          >
            <Plus size={13} /> Add Property
          </button>
        </div>
        <ul className="divide-y divide-surface-hover">
          {listings.map((l) => (
            <li key={l.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
              <div className="min-w-0">
                <p className="text-sm text-foreground truncate">{l.name}</p>
                <p className="text-xs text-subtle">{l.region}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <StatusPill tone={l.status === "Flagged" ? "terracotta" : "sage"}>{l.status}</StatusPill>
                <button
                  onClick={() => delist(l.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-border rounded-full text-muted hover:text-terracotta hover:border-terracotta/40 transition-colors"
                >
                  <X size={12} /> Delist
                </button>
              </div>
            </li>
          ))}
          {listings.length === 0 && (
            <li className="px-5 py-6 text-center text-sm text-subtle">Queue is clear.</li>
          )}
        </ul>
      </SectionCard>

      <SectionCard title="Host Applications" icon={UserCheck}>
        <p className="px-5 pt-4 text-xs text-muted">
          Regional and local host applications — approving grants dashboard access for their region.
        </p>
        <ul className="divide-y divide-surface-hover mt-2">
          {applications.map((a) => (
            <li key={a.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{a.name}</p>
                <p className="text-xs text-subtle mt-0.5">
                  {a.region} · {a.properties} {a.properties === 1 ? "property" : "properties"}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <StatusPill tone={a.role === "Regional Host" ? "primary" : "muted"}>{a.role}</StatusPill>
                {a.decision === null ? (
                  <>
                    <button
                      onClick={() => decide(a.id, "approved")}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-sage/40 text-sage rounded-full hover:bg-sage hover:text-white transition-colors"
                    >
                      <Check size={12} /> Approve
                    </button>
                    <button
                      onClick={() => decide(a.id, "rejected")}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-border text-muted rounded-full hover:text-terracotta hover:border-terracotta/40 transition-colors"
                    >
                      <X size={12} /> Reject
                    </button>
                  </>
                ) : (
                  <StatusPill tone={a.decision === "approved" ? "sage" : "terracotta"}>
                    {a.decision === "approved" ? "Approved" : "Rejected"}
                  </StatusPill>
                )}
              </div>
            </li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title="Seed Ball Mission Control" icon={Sprout}>
        {/* Campaign status + live numbers */}
        <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-surface-hover">
          <div>
            <p className="text-sm font-medium text-foreground">100 Million Seed Ball Campaign</p>
            <p className="text-xs text-muted mt-0.5">
              {seedBallMission.distributed.toLocaleString("en-IN")} of{" "}
              {seedBallMission.goal.toLocaleString("en-IN")} dispersed ·{" "}
              {((seedBallMission.distributed / seedBallMission.goal) * 100).toFixed(1)}% complete
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <StatusPill tone={campaignActive ? "sage" : "terracotta"}>
              {campaignActive ? "Active" : "Paused"}
            </StatusPill>
            <button onClick={() => setCampaignActive((v) => !v)} aria-label="Toggle campaign">
              <Toggle on={campaignActive} />
            </button>
          </div>
        </div>

        {/* Editable campaign rules */}
        <div className="px-5 py-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Seed balls per booking", value: perBooking, set: setPerBooking, hint: "funded from platform profits" },
            { label: "Monthly target", value: monthlyTarget, set: setMonthlyTarget, hint: "seed balls / month" },
            { label: "Yearly target", value: yearlyTarget, set: setYearlyTarget, hint: "seed balls / year" },
            { label: "Reward points per seed ball", value: pointsPerBall, set: setPointsPerBall, hint: "conversion rate" },
          ].map((f) => (
            <label key={f.label} className="rounded-xl bg-background border border-border p-4 block">
              <span className="text-xs text-subtle">{f.label}</span>
              <input
                type="number"
                min={0}
                value={Number.isFinite(f.value) ? f.value : ""}
                onChange={(e) => f.set(e.target.valueAsNumber)}
                onBlur={() => !Number.isFinite(f.value) && f.set(0)}
                className="w-full mt-1 text-sm font-semibold text-foreground tabular-nums bg-transparent focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <span className="text-[10px] text-subtle">{f.hint}</span>
            </label>
          ))}
        </div>

        {/* Seed species management */}
        <div className="px-5 pb-4">
          <p className="text-xs font-semibold text-foreground mb-2">Approved native seed species</p>
          <div className="flex flex-wrap items-center gap-2">
            {species.map((s) => (
              <span
                key={s}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sage/10 text-sage text-xs font-medium"
              >
                {s}
                <button onClick={() => removeSpecies(s)} aria-label={`Remove ${s}`} className="hover:text-terracotta transition-colors">
                  <X size={11} />
                </button>
              </span>
            ))}
            <span className="flex items-center gap-1">
              <input
                type="text"
                value={newSpecies}
                onChange={(e) => setNewSpecies(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addSpecies()}
                placeholder="Add species"
                className="w-28 text-xs bg-background border border-border rounded-full px-3 py-1.5 text-foreground placeholder-subtle focus:outline-none focus:border-primary transition-colors"
              />
              <button
                onClick={addSpecies}
                aria-label="Add species"
                className="w-7 h-7 rounded-full border border-border text-muted hover:text-sage hover:border-sage/40 flex items-center justify-center transition-colors"
              >
                <Plus size={12} />
              </button>
            </span>
          </div>
        </div>

        {/* Publish campaign report */}
        <div className="mx-5 mb-5 flex items-center justify-between gap-4 rounded-xl border border-border bg-background px-4 py-3.5">
          <div>
            <p className="text-sm font-medium text-foreground">July 2026 campaign report</p>
            <p className="text-xs text-muted mt-0.5">
              Publishes ride routes, dispersal counts and photos to all dashboards.
            </p>
          </div>
          {reportPublished ? (
            <StatusPill tone="sage">Published</StatusPill>
          ) : (
            <button
              onClick={() => setReportPublished(true)}
              className="px-4 py-2 text-xs font-semibold bg-sage text-white rounded-full hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              Publish Report
            </button>
          )}
        </div>
      </SectionCard>

      <SectionCard title="Platform Configuration" icon={Settings2}>
        <div className="px-5 py-4 grid sm:grid-cols-3 gap-4 text-xs">
          <div className="rounded-xl bg-background border border-border p-4">
            <p className="text-subtle">Default currency</p>
            <p className="text-foreground font-semibold mt-1">INR (₹)</p>
          </div>
          <div className="rounded-xl bg-background border border-border p-4">
            <p className="text-subtle">Default region on signup</p>
            <p className="text-foreground font-semibold mt-1">Tamil Nadu</p>
          </div>
          <div className="rounded-xl bg-background border border-border p-4">
            <p className="text-subtle">Maintenance mode</p>
            <p className="text-sage font-semibold mt-1">Off</p>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

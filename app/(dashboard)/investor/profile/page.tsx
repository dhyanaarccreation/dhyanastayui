"use client";

import { useState } from "react";
import {
  User,
  Camera,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  BadgeCheck,
  Landmark,
  Users,
  IdCard,
  CreditCard,
  Percent,
  Bell,
  Pencil,
  Briefcase,
} from "lucide-react";
import { PageHeader, SectionCard, StatusPill, Toggle } from "@/app/components/DashboardUI";

// ============================================
// INVESTOR — Profile
// Identity, PAN/KYC, bank & nominee details,
// tax information, investor category,
// verification status and communication
// preferences. All financial figures shown
// elsewhere in the dashboard remain read-only —
// this page only covers the investor's own
// account, KYC and contact information.
// ============================================

type Channel = "email" | "sms" | "whatsapp";
type PrefKey = "distributionAlerts" | "projectUpdates" | "capitalCalls";

const prefRows: { key: PrefKey; label: string; sub: string }[] = [
  { key: "distributionAlerts", label: "Distribution alerts", sub: "When payouts are credited to your wallet" },
  { key: "projectUpdates", label: "Project updates", sub: "Construction milestones & occupancy reports" },
  { key: "capitalCalls", label: "Capital call notices", sub: "When additional funding is requested" },
];

const investorTypes = ["Individual", "HUF", "Company", "NRI"] as const;

const avatarOptions = [
  "https://i.pravatar.cc/150?img=12",
  "https://i.pravatar.cc/150?img=33",
  "https://i.pravatar.cc/150?img=53",
];

function maskAccount(num: string) {
  return `${"•".repeat(Math.max(num.length - 4, 0))}${num.slice(-4)}`;
}

function maskIfsc(code: string) {
  return `${code.slice(0, 4)}••••${code.slice(-2)}`;
}

export default function InvestorProfilePage() {
  const [avatarIdx, setAvatarIdx] = useState(0);

  const [editingPersonal, setEditingPersonal] = useState(false);
  const [profile, setProfile] = useState({
    name: "Navin Kumar",
    email: "navin.kumar@gmail.com",
    phone: "+91 98450 12345",
    address: "204, Palm Meadows, Whitefield, Bengaluru, Karnataka 560066",
  });

  const [editingBank, setEditingBank] = useState(false);
  const [bank, setBank] = useState({
    accountHolder: "Navin Kumar",
    accountNumber: "50100234567890",
    ifsc: "HDFC0001234",
    bankName: "HDFC Bank",
    branch: "MG Road, Bengaluru",
    verified: true,
  });

  const [form15G, setForm15G] = useState(false);

  const [prefs, setPrefs] = useState<Record<PrefKey, Record<Channel, boolean>>>({
    distributionAlerts: { email: true, sms: true, whatsapp: false },
    projectUpdates: { email: true, sms: false, whatsapp: true },
    capitalCalls: { email: true, sms: true, whatsapp: true },
  });

  function updateProfileField(field: keyof typeof profile, value: string) {
    setProfile((p) => ({ ...p, [field]: value }));
  }

  function updateBankField(field: keyof typeof bank, value: string) {
    setBank((b) => ({ ...b, [field]: value }));
  }

  function saveBank() {
    setEditingBank(false);
    setBank((b) => ({ ...b, verified: false }));
  }

  function togglePref(key: PrefKey, channel: Channel) {
    setPrefs((p) => ({ ...p, [key]: { ...p[key], [channel]: !p[key][channel] } }));
  }

  const verificationSteps = ["Application", "KYC", "Verification", "Approved", "Investment Enabled"];
  const verificationStatus = "Investment Enabled";

  return (
    <div className="space-y-8 pb-12 animate-fade-in">
      <PageHeader
        title="Profile"
        subtitle="Your identity, KYC, bank and nominee details, tax information, and communication preferences."
      />

      {/* Identity hero */}
      <div className="bg-gradient-to-r from-surface to-surface-hover border border-border rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={avatarOptions[avatarIdx]}
          alt={profile.name}
          className="w-20 h-20 rounded-2xl object-cover border-2 border-primary/40 shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-xl font-semibold text-foreground">{profile.name}</h2>
            <StatusPill tone="sage">
              <ShieldCheck size={11} /> KYC Verified
            </StatusPill>
            <StatusPill tone="primary">
              <Briefcase size={10} /> Individual Investor
            </StatusPill>
          </div>
          <p className="text-sm text-muted mt-1">Investor since August 2024 · Premium tier</p>
        </div>
        <button
          onClick={() => setAvatarIdx((i) => (i + 1) % avatarOptions.length)}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium border border-border rounded-full text-muted hover:text-foreground hover:border-border-light transition-colors shrink-0"
        >
          <Camera size={13} /> Change photo
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Personal information */}
        <SectionCard title="Personal Information" icon={User}>
          <div className="flex justify-end px-5 pt-4">
            <button
              onClick={() => setEditingPersonal((v) => !v)}
              className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline font-medium"
            >
              <Pencil size={12} /> {editingPersonal ? "Save" : "Edit"}
            </button>
          </div>

          {editingPersonal ? (
            <div className="px-5 pb-5 pt-2 space-y-3">
              <div>
                <label className="text-xs text-subtle">Full Name</label>
                <input
                  value={profile.name}
                  onChange={(e) => updateProfileField("name", e.target.value)}
                  className="w-full mt-1 px-3 py-2 text-sm rounded-lg bg-background border border-border text-foreground focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="text-xs text-subtle">Email</label>
                <input
                  value={profile.email}
                  onChange={(e) => updateProfileField("email", e.target.value)}
                  className="w-full mt-1 px-3 py-2 text-sm rounded-lg bg-background border border-border text-foreground focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="text-xs text-subtle">Phone</label>
                <input
                  value={profile.phone}
                  onChange={(e) => updateProfileField("phone", e.target.value)}
                  className="w-full mt-1 px-3 py-2 text-sm rounded-lg bg-background border border-border text-foreground focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="text-xs text-subtle">Address</label>
                <textarea
                  value={profile.address}
                  onChange={(e) => updateProfileField("address", e.target.value)}
                  rows={2}
                  className="w-full mt-1 px-3 py-2 text-sm rounded-lg bg-background border border-border text-foreground focus:outline-none focus:border-primary resize-none"
                />
              </div>
            </div>
          ) : (
            <div className="px-5 pb-3 divide-y divide-surface-hover">
              <div className="flex items-center gap-2.5 py-3">
                <Mail size={14} className="text-subtle shrink-0" />
                <span className="text-sm text-foreground">{profile.email}</span>
              </div>
              <div className="flex items-center gap-2.5 py-3">
                <Phone size={14} className="text-subtle shrink-0" />
                <span className="text-sm text-foreground">{profile.phone}</span>
              </div>
              <div className="flex items-start gap-2.5 py-3">
                <MapPin size={14} className="text-subtle shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">{profile.address}</span>
              </div>
            </div>
          )}

          <div className="px-5 pb-5 pt-1">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-subtle mb-2">Investor Type</p>
            <div className="flex flex-wrap gap-2">
              {investorTypes.map((t) => (
                <span
                  key={t}
                  className={
                    t === "Individual"
                      ? "px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-medium"
                      : "px-3 py-1.5 rounded-full bg-surface-hover text-subtle text-xs"
                  }
                >
                  {t}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-subtle mt-2">
              To change investor category, contact investor relations — this requires fresh KYC.
            </p>
          </div>
        </SectionCard>

        {/* PAN, KYC & tax */}
        <SectionCard title="PAN, KYC & Tax Information" icon={ShieldCheck}>
          <div className="divide-y divide-surface-hover">
            <div className="flex items-center justify-between gap-3 px-5 py-3.5">
              <div className="flex items-center gap-2.5">
                <IdCard size={14} className="text-subtle shrink-0" />
                <div>
                  <p className="text-sm text-foreground">PAN</p>
                  <p className="text-xs text-subtle tabular-nums">AAKPN••••R</p>
                </div>
              </div>
              <StatusPill tone="sage">Verified</StatusPill>
            </div>
            <div className="flex items-center justify-between gap-3 px-5 py-3.5">
              <div className="flex items-center gap-2.5">
                <IdCard size={14} className="text-subtle shrink-0" />
                <div>
                  <p className="text-sm text-foreground">Aadhaar</p>
                  <p className="text-xs text-subtle tabular-nums">XXXX XXXX 8823</p>
                </div>
              </div>
              <StatusPill tone="sage">Verified</StatusPill>
            </div>
            <div className="flex items-center justify-between gap-3 px-5 py-3.5">
              <div className="flex items-center gap-2.5">
                <BadgeCheck size={14} className="text-subtle shrink-0" />
                <div>
                  <p className="text-sm text-foreground">KYC status</p>
                  <p className="text-xs text-subtle">Video KYC completed 18 Aug 2024</p>
                </div>
              </div>
              <StatusPill tone="sage">Verified</StatusPill>
            </div>
            <div className="flex items-center justify-between gap-3 px-5 py-3.5">
              <div>
                <p className="text-sm text-foreground">Tax residency status</p>
                <p className="text-xs text-subtle">Resident Indian (Ordinarily Resident)</p>
              </div>
              <span className="text-xs text-muted tabular-nums">TDS 10%</span>
            </div>
            <div className="flex items-center justify-between gap-4 px-5 py-3.5">
              <div>
                <p className="text-sm text-foreground">Form 15G — nil/lower TDS declaration</p>
                <p className="text-xs text-subtle">Self-declare if your total income is below the taxable limit</p>
              </div>
              <button onClick={() => setForm15G((v) => !v)} aria-label="Toggle Form 15G declaration">
                <Toggle on={form15G} />
              </button>
            </div>
          </div>
        </SectionCard>

        {/* Bank details */}
        <SectionCard title="Bank Details" icon={Landmark}>
          <div className="flex justify-end px-5 pt-4">
            <button
              onClick={() => (editingBank ? saveBank() : setEditingBank(true))}
              className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline font-medium"
            >
              <Pencil size={12} /> {editingBank ? "Save" : "Update"}
            </button>
          </div>

          {editingBank ? (
            <div className="px-5 pb-5 pt-2 space-y-3">
              <div>
                <label className="text-xs text-subtle">Bank name</label>
                <input
                  value={bank.bankName}
                  onChange={(e) => updateBankField("bankName", e.target.value)}
                  className="w-full mt-1 px-3 py-2 text-sm rounded-lg bg-background border border-border text-foreground focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="text-xs text-subtle">Account number</label>
                <input
                  value={bank.accountNumber}
                  onChange={(e) => updateBankField("accountNumber", e.target.value)}
                  className="w-full mt-1 px-3 py-2 text-sm rounded-lg bg-background border border-border text-foreground focus:outline-none focus:border-primary tabular-nums"
                />
              </div>
              <div>
                <label className="text-xs text-subtle">IFSC</label>
                <input
                  value={bank.ifsc}
                  onChange={(e) => updateBankField("ifsc", e.target.value)}
                  className="w-full mt-1 px-3 py-2 text-sm rounded-lg bg-background border border-border text-foreground focus:outline-none focus:border-primary tabular-nums"
                />
              </div>
              <p className="text-[11px] text-subtle">
                Updated bank details go through re-verification before payouts resume to the new account.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-surface-hover">
              <div className="flex items-center gap-2.5 px-5 py-3.5">
                <CreditCard size={14} className="text-subtle shrink-0" />
                <div>
                  <p className="text-sm text-foreground">{bank.bankName}</p>
                  <p className="text-xs text-subtle tabular-nums">{maskAccount(bank.accountNumber)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 px-5 py-3.5">
                <Landmark size={14} className="text-subtle shrink-0" />
                <div>
                  <p className="text-sm text-foreground">{maskIfsc(bank.ifsc)}</p>
                  <p className="text-xs text-subtle">{bank.branch}</p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-3 px-5 py-3.5">
                <span className="text-sm text-foreground">Account holder — {bank.accountHolder}</span>
                {bank.verified ? (
                  <StatusPill tone="sage">Verified</StatusPill>
                ) : (
                  <StatusPill tone="terracotta">Re-verification pending</StatusPill>
                )}
              </div>
            </div>
          )}
        </SectionCard>

        {/* Nominee details */}
        <SectionCard title="Nominee Details" icon={Users}>
          <div className="px-5 py-4 flex items-start gap-3">
            <span className="w-9 h-9 rounded-lg bg-surface-hover text-muted flex items-center justify-center shrink-0">
              <User size={16} />
            </span>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Sunita Kumar</p>
              <p className="text-xs text-muted mt-0.5">Spouse</p>
            </div>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-foreground tabular-nums">
              <Percent size={12} className="text-subtle" /> 100%
            </span>
          </div>
          <p className="px-5 pb-4 text-[11px] text-subtle">
            Nominee updates require OTP verification and take effect in 24 hours — manage from Settings.
          </p>
        </SectionCard>
      </div>

      {/* Verification stepper — mirrors influencer profile pattern */}
      <SectionCard title="Verification Status" icon={BadgeCheck}>
        <div className="px-5 py-4">
          <div className="flex items-center gap-2 mb-3">
            {verificationSteps.map((step, i, arr) => {
              const currentIdx = arr.indexOf(verificationStatus);
              const done = i <= currentIdx;
              return (
                <div key={step} className="flex items-center flex-1">
                  <div className="flex flex-col items-center gap-1.5 flex-1">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        done ? "bg-sage text-white" : "bg-surface-hover text-subtle"
                      }`}
                    >
                      {done ? <BadgeCheck size={12} /> : i + 1}
                    </span>
                    <span className={`text-[10px] text-center ${done ? "text-foreground font-medium" : "text-subtle"}`}>
                      {step}
                    </span>
                  </div>
                  {i < arr.length - 1 && (
                    <span className={`h-px flex-1 -mt-4 ${i < currentIdx ? "bg-sage" : "bg-border"}`} />
                  )}
                </div>
              );
            })}
          </div>
          <p className="text-xs text-muted mt-2">
            Your application, KYC and investor verification are complete — investments are fully enabled on your account.
          </p>
        </div>
      </SectionCard>

      {/* Communication preferences */}
      <SectionCard title="Communication Preferences" icon={Bell}>
        <div className="px-5 py-4">
          <div className="grid grid-cols-[1fr_repeat(3,56px)] sm:grid-cols-[1fr_repeat(3,76px)] items-center gap-2 pb-3 mb-1 border-b border-surface-hover">
            <span />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-subtle text-center">Email</span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-subtle text-center">SMS</span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-subtle text-center">WhatsApp</span>
          </div>
          {prefRows.map((row) => (
            <div
              key={row.key}
              className="grid grid-cols-[1fr_repeat(3,56px)] sm:grid-cols-[1fr_repeat(3,76px)] items-center gap-2 py-3"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground">{row.label}</p>
                <p className="text-xs text-muted truncate">{row.sub}</p>
              </div>
              {(["email", "sms", "whatsapp"] as Channel[]).map((ch) => (
                <button
                  key={ch}
                  onClick={() => togglePref(row.key, ch)}
                  aria-label={`Toggle ${ch} for ${row.label}`}
                  className="flex justify-center"
                >
                  <Toggle on={prefs[row.key][ch]} />
                </button>
              ))}
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

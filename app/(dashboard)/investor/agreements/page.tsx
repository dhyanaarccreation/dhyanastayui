import {
  FileText,
  Download,
  Eye,
  FileSignature,
  ShieldCheck,
  CircleCheck,
  Clock3,
  Landmark,
  FolderOpen,
  Lock,
} from "lucide-react";
import { PageHeader, SectionCard, StatusPill } from "@/app/components/DashboardUI";

type Tone = "sage" | "primary" | "terracotta" | "muted";

const agreements = [
  {
    name: "Investment Agreement",
    project: "Glass Pavilion Annexe · Wayanad, Kerala",
    version: "v1.0",
    date: "May 12, 2026",
    status: "Awaiting e-sign",
    tone: "terracotta" as Tone,
    signed: false,
    signature: "Awaiting your signature",
  },
  {
    name: "Investment Agreement",
    project: "Nila Wellness Expansion · Palakkad, Kerala",
    version: "v1.0",
    date: "Aug 20, 2024",
    status: "Signed",
    tone: "sage" as Tone,
    signed: true,
    signature: "Signed Aug 21, 2024",
  },
  {
    name: "Investment Agreement",
    project: "Canopy Village Phase 2 · Auroville, TN",
    version: "v1.2",
    date: "Jan 14, 2025",
    status: "Signed",
    tone: "sage" as Tone,
    signed: true,
    signature: "Signed Jan 15, 2025",
  },
  {
    name: "Investment Agreement",
    project: "Stone Valley Cottages · Kodaikanal, TN",
    version: "v1.0",
    date: "Jun 02, 2025",
    status: "Signed",
    tone: "sage" as Tone,
    signed: true,
    signature: "Signed Jun 03, 2025",
  },
  {
    name: "Partnership Agreement",
    project: "All projects",
    version: "v3.0",
    date: "Aug 20, 2024",
    status: "Signed",
    tone: "sage" as Tone,
    signed: true,
    signature: "Signed Aug 20, 2024",
  },
  {
    name: "Revenue-Share Agreement",
    project: "All projects · FY 2026-27",
    version: "v2.0",
    date: "Apr 01, 2026",
    status: "Signed",
    tone: "sage" as Tone,
    signed: true,
    signature: "Signed Apr 02, 2026",
  },
  {
    name: "Unit Allocation Agreement",
    project: "Nila Wellness Expansion · Palakkad, Kerala",
    version: "v1.0",
    date: "Aug 20, 2024",
    status: "Signed",
    tone: "sage" as Tone,
    signed: true,
    signature: "Signed Aug 21, 2024",
  },
  {
    name: "Exit Agreement",
    project: "Stone Valley Cottages · Kodaikanal, TN",
    version: "—",
    date: "Not yet initiated",
    status: "Not applicable",
    tone: "muted" as Tone,
    signed: false,
    signature: "Generated only after an exit request is approved",
  },
];

const financialDocs = [
  { name: "Monthly Statement · July 2026", meta: "All projects · Generated Aug 01, 2026", status: "Ready", tone: "sage" as Tone },
  { name: "Quarterly Statement · Q1 FY 2026-27", meta: "Apr–Jun 2026 · Generated Jul 05, 2026", status: "Ready", tone: "sage" as Tone },
  { name: "Annual Statement · FY 2025-26", meta: "All projects · Generated Apr 10, 2026", status: "Ready", tone: "sage" as Tone },
  { name: "Tax Document · TDS Certificate (Form 16A)", meta: "FY 2025-26 · Generated Jun 15, 2026", status: "Ready", tone: "sage" as Tone },
  { name: "Payment Receipt · Capital Contribution", meta: "Stone Valley Cottages · Jun 05, 2025", status: "Ready", tone: "sage" as Tone },
  { name: "Investment Certificate", meta: "Canopy Village Phase 2 · Issued Jan 20, 2025", status: "Ready", tone: "sage" as Tone },
];

const projectDocs = [
  { name: "Project Proposal", meta: "Glass Pavilion Annexe · Wayanad, Kerala · Shared Mar 02, 2026" },
  { name: "Architecture Drawings", meta: "Glass Pavilion Annexe · Wayanad, Kerala · Shared Mar 10, 2026" },
  { name: "BOQ Summary", meta: "Glass Pavilion Annexe · Wayanad, Kerala · Shared Mar 10, 2026" },
  { name: "Approvals Bundle (RERA, Panchayat NOC)", meta: "Glass Pavilion Annexe · Wayanad, Kerala · Shared Apr 18, 2026" },
  { name: "Development Report · Q2 FY 2026-27", meta: "Canopy Village Phase 2 · Auroville, TN · Shared Jul 15, 2026" },
  { name: "Operational Report · July 2026", meta: "Nila Wellness Expansion · Palakkad, Kerala · Shared Aug 05, 2026" },
];

export default function InvestorAgreementsPage() {
  const pending = agreements.filter((d) => !d.signed && d.status === "Awaiting e-sign");

  return (
    <div className="space-y-4 pb-12">
      <PageHeader
        title="Documents"
        subtitle="Agreements, financial statements, and project documents shared with you."
      />

      {/* Pending banner */}
      {pending.length > 0 && (
        <div className="border border-terracotta/30 bg-terracotta/5 rounded-2xl px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-4">
          <span className="w-10 h-10 rounded-xl bg-terracotta/15 text-terracotta flex items-center justify-center shrink-0">
            <FileSignature size={18} />
          </span>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">
              {pending.length} document{pending.length > 1 ? "s" : ""} awaiting your e-signature
            </p>
            <p className="text-xs text-muted mt-0.5">
              {pending[0].name} · {pending[0].project} — construction payouts begin after signing.
            </p>
          </div>
          <button className="px-4 py-2 text-xs font-semibold bg-terracotta text-white rounded-full hover:opacity-90 transition-opacity shrink-0">
            Review & sign
          </button>
        </div>
      )}

      {/* 1. Agreements */}
      <SectionCard title="Agreements" icon={FileSignature}>
        <ul className="divide-y divide-surface-hover">
          {agreements.map((d, i) => (
            <li key={`${d.name}-${i}`} className="flex items-center gap-4 px-5 py-4">
              <span className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <FileText size={16} />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{d.name}</p>
                <p className="text-[11px] text-subtle mt-0.5 truncate">
                  {d.project} · {d.version} · {d.date}
                </p>
              </div>
              <div className="hidden md:flex items-center gap-1.5 text-[11px] text-muted w-56 shrink-0">
                {d.signed ? (
                  <CircleCheck size={13} className="text-sage shrink-0" />
                ) : (
                  <Clock3 size={13} className="text-terracotta shrink-0" />
                )}
                <span className="truncate">{d.signature}</span>
              </div>
              <StatusPill tone={d.tone}>{d.status}</StatusPill>
              <button
                aria-label={`Download ${d.name}`}
                disabled={d.status === "Not applicable"}
                className="w-9 h-9 rounded-lg border border-border text-muted hover:text-foreground hover:border-border-light flex items-center justify-center transition-colors shrink-0 disabled:opacity-30 disabled:pointer-events-none"
              >
                <Download size={14} />
              </button>
            </li>
          ))}
        </ul>
      </SectionCard>

      {/* 2. Financial Documents */}
      <SectionCard title="Financial Documents" icon={Landmark}>
        <ul className="divide-y divide-surface-hover">
          {financialDocs.map((d) => (
            <li key={d.name} className="flex items-center gap-4 px-5 py-4">
              <span className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <FileText size={16} />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{d.name}</p>
                <p className="text-[11px] text-subtle mt-0.5 truncate">{d.meta}</p>
              </div>
              <StatusPill tone={d.tone}>{d.status}</StatusPill>
              <button
                aria-label={`Download ${d.name}`}
                className="w-9 h-9 rounded-lg border border-border text-muted hover:text-foreground hover:border-border-light flex items-center justify-center transition-colors shrink-0"
              >
                <Download size={14} />
              </button>
            </li>
          ))}
        </ul>
      </SectionCard>

      {/* 3. Project Documents */}
      <SectionCard title="Project Documents" icon={FolderOpen}>
        <div className="px-5 py-3 flex items-center gap-2 border-b border-surface-hover bg-surface-hover/40">
          <Lock size={12} className="text-subtle shrink-0" />
          <p className="text-[11px] text-subtle">
            Shared by each project&apos;s development team, view only — these files can&apos;t be edited or removed.
          </p>
        </div>
        <ul className="divide-y divide-surface-hover">
          {projectDocs.map((d) => (
            <li key={d.name} className="flex items-center gap-4 px-5 py-4">
              <span className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <FileText size={16} />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{d.name}</p>
                <p className="text-[11px] text-subtle mt-0.5 truncate">{d.meta}</p>
              </div>
              <StatusPill tone="muted">View only</StatusPill>
              <button
                aria-label={`View ${d.name}`}
                className="w-9 h-9 rounded-lg border border-border text-muted hover:text-foreground hover:border-border-light flex items-center justify-center transition-colors shrink-0"
              >
                <Eye size={14} />
              </button>
            </li>
          ))}
        </ul>
      </SectionCard>

      <p className="text-[11px] text-subtle flex items-center gap-1.5">
        <ShieldCheck size={12} className="text-sage" />
        Documents are e-stamped and stored with 256-bit encryption. Originals available on request.
      </p>
    </div>
  );
}

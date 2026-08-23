"use client";

import { useState } from "react";
import {
  DoorOpen,
  ShieldCheck,
  FileSignature,
  ClipboardCheck,
  Calculator,
  BadgeCheck,
  Wallet,
  CheckCircle2,
  Lock,
  Unlock,
  AlertTriangle,
  Info,
  Send,
} from "lucide-react";
import { PageHeader, SectionCard, StatusPill } from "@/app/components/DashboardUI";

// ============================================
// INVESTOR — Exit Request
// Dedicated flow for requesting an exit from an
// investment: eligibility & agreement conditions
// are shown up front, an ESTIMATED settlement is
// displayed (never a guarantee), and — once
// submitted — progress is tracked through the
// platform's exit pipeline via a status stepper.
// All financial figures here are platform-set and
// read-only; the investor can only submit the
// request and a reason.
// ============================================

type Investment = {
  id: string;
  name: string;
  location: string;
  investedAmount: string;
  investedDate: string;
  currentValue: string;
  lockInMonths: number;
  lockInEndDate: string;
  lockInComplete: boolean;
  exitConditions: string[];
  estimatedSettlement: string;
};

const investments: Investment[] = [
  {
    id: "nila",
    name: "Nila Wellness Expansion",
    location: "Palakkad, Kerala",
    investedAmount: "₹10,00,000",
    investedDate: "Aug 20, 2023",
    currentValue: "₹12,80,000",
    lockInMonths: 24,
    lockInEndDate: "Aug 20, 2025",
    lockInComplete: true,
    exitConditions: [
      "Minimum lock-in of 24 months from the date of investment — satisfied on Aug 20, 2025.",
      "90 days' written notice required before settlement is processed.",
      "Settlement value is based on an independent third-party valuation at the time of exit.",
      "A 2% processing fee is deducted from the final settlement amount.",
    ],
    estimatedSettlement: "₹12,54,400",
  },
  {
    id: "canopy",
    name: "Canopy Village · Phase 2",
    location: "Auroville, Tamil Nadu",
    investedAmount: "₹7,50,000",
    investedDate: "Jan 14, 2025",
    currentValue: "₹8,90,000",
    lockInMonths: 36,
    lockInEndDate: "Jan 14, 2028",
    lockInComplete: false,
    exitConditions: [
      "Minimum lock-in of 36 months from the date of investment — ends Jan 14, 2028.",
      "Early exit before lock-in completion may attract a 5% early-exit penalty on principal.",
      "90 days' written notice required before settlement is processed.",
      "Settlement value is based on an independent third-party valuation at the time of exit.",
    ],
    estimatedSettlement: "₹8,45,500",
  },
];

const EXIT_STAGES = [
  { label: "Exit Request", icon: Send, desc: "Your request and reason are recorded." },
  { label: "Eligibility Check", icon: ShieldCheck, desc: "Lock-in period and holding status are verified." },
  { label: "Agreement Check", icon: FileSignature, desc: "Terms in your signed investment agreement are reviewed." },
  { label: "Admin Review", icon: ClipboardCheck, desc: "The investments team reviews the request end-to-end." },
  { label: "Valuation & Settlement", icon: Calculator, desc: "Final settlement amount is calculated from current valuation." },
  { label: "Approval", icon: BadgeCheck, desc: "Exit and settlement amount are approved internally." },
  { label: "Payment", icon: Wallet, desc: "Settlement is transferred to your linked bank account." },
  { label: "Investment Closed", icon: CheckCircle2, desc: "Holding is closed and a final statement is issued." },
] as const;

type ExitRequest = {
  investmentId: string;
  reason: string;
  submittedDate: string;
  stageIndex: number;
};

export default function InvestorExitPage() {
  const [selectedId, setSelectedId] = useState(investments[0].id);
  const [reason, setReason] = useState("");
  const [exitRequest, setExitRequest] = useState<ExitRequest | null>(null);

  const selected = investments.find((i) => i.id === selectedId) ?? investments[0];

  function handleSubmit() {
    if (!reason.trim()) return;
    setExitRequest({
      investmentId: selectedId,
      reason: reason.trim(),
      submittedDate: "Aug 12, 2026",
      stageIndex: 1, // Exit Request done, Eligibility Check in progress
    });
  }

  function handleNewRequest() {
    setExitRequest(null);
    setReason("");
  }

  // ---------------------------------------------
  // View: an exit request already exists — show
  // the pipeline stepper and request summary.
  // ---------------------------------------------
  if (exitRequest) {
    const inv = investments.find((i) => i.id === exitRequest.investmentId) ?? investments[0];
    const currentLabel = EXIT_STAGES[exitRequest.stageIndex].label;

    return (
      <div className="space-y-4 pb-12 animate-fade-in">
        <PageHeader
          title="Exit Request"
          subtitle="Track your exit request as it moves through eligibility, review, valuation and payment."
        />

        <SectionCard title="Request Summary" icon={DoorOpen}>
          <div className="p-5 flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-base font-semibold text-foreground">{inv.name}</p>
                <StatusPill tone="primary">{currentLabel}</StatusPill>
              </div>
              <p className="text-xs text-subtle mt-1">{inv.location} · Requested {exitRequest.submittedDate}</p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-[11px] text-subtle">Estimated settlement</p>
              <p className="text-xl font-bold text-foreground tabular-nums">{inv.estimatedSettlement}</p>
            </div>
          </div>
          <div className="px-5 pb-5">
            <div className="rounded-xl bg-background border border-border p-3.5">
              <p className="text-[11px] text-subtle uppercase tracking-wider mb-1">Reason for exit</p>
              <p className="text-sm text-foreground leading-relaxed">{exitRequest.reason}</p>
            </div>
            <p className="text-[11px] text-subtle mt-3 flex items-center gap-1.5">
              <Info size={11} className="shrink-0" />
              Estimated — subject to final valuation, not guaranteed. The confirmed settlement amount is set by the platform after admin review.
            </p>
          </div>
        </SectionCard>

        <SectionCard title="Exit Process Status" icon={ClipboardCheck}>
          <div className="p-5">
            <ol className="space-y-0">
              {EXIT_STAGES.map((stage, i) => {
                const done = i < exitRequest.stageIndex;
                const current = i === exitRequest.stageIndex;
                const StageIcon = stage.icon;
                return (
                  <li key={stage.label} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <span
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${
                          done
                            ? "bg-sage text-white"
                            : current
                            ? "bg-primary text-primary-foreground"
                            : "bg-surface-hover text-subtle"
                        }`}
                      >
                        {done ? <CheckCircle2 size={15} /> : <StageIcon size={15} />}
                      </span>
                      {i < EXIT_STAGES.length - 1 && (
                        <span className={`w-px flex-1 min-h-[24px] ${done ? "bg-sage" : "bg-border"}`} />
                      )}
                    </div>
                    <div className={`pb-6 ${i === EXIT_STAGES.length - 1 ? "pb-0" : ""}`}>
                      <p
                        className={`text-sm font-medium ${
                          done || current ? "text-foreground" : "text-subtle"
                        }`}
                      >
                        {stage.label}
                        {current && <span className="ml-2 text-[10px] font-semibold text-primary align-middle">IN PROGRESS</span>}
                      </p>
                      <p className="text-xs text-muted mt-0.5">{stage.desc}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </SectionCard>

        <div className="flex items-center justify-between gap-4 flex-wrap">
          <p className="text-[11px] text-subtle flex items-center gap-1.5">
            <ShieldCheck size={12} className="text-sage shrink-0" />
            Have questions about your exit? Message the investments team from Support.
          </p>
          <button
            onClick={handleNewRequest}
            className="text-xs text-muted hover:text-foreground underline underline-offset-2 transition-colors"
          >
            Start a different exit request (demo)
          </button>
        </div>
      </div>
    );
  }

  // ---------------------------------------------
  // View: no request yet — show the form.
  // ---------------------------------------------
  return (
    <div className="space-y-4 pb-12 animate-fade-in">
      <PageHeader
        title="Exit Request"
        subtitle="Request to exit an investment. Review your lock-in status and estimated settlement before submitting."
      />

      <div className="grid lg:grid-cols-3 gap-6">
        <SectionCard title="Request an Exit" icon={DoorOpen} className="lg:col-span-2">
          <div className="p-5 space-y-5">
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-subtle mb-2 block">
                Select investment
              </label>
              <select
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-background border border-border rounded-xl text-foreground focus:outline-none focus:border-primary/50 transition-colors"
              >
                {investments.map((inv) => (
                  <option key={inv.id} value={inv.id}>
                    {inv.name} — {inv.location}
                  </option>
                ))}
              </select>
            </div>

            {/* Lock-in status */}
            <div
              className={`rounded-xl border p-4 flex items-start gap-3 ${
                selected.lockInComplete ? "border-sage/30 bg-sage/5" : "border-terracotta/30 bg-terracotta/5"
              }`}
            >
              {selected.lockInComplete ? (
                <Unlock size={16} className="text-sage shrink-0 mt-0.5" />
              ) : (
                <Lock size={16} className="text-terracotta shrink-0 mt-0.5" />
              )}
              <div>
                <p className="text-sm font-medium text-foreground">
                  {selected.lockInComplete ? "Lock-in period completed" : "Still within lock-in period"}
                </p>
                <p className="text-xs text-muted mt-0.5">
                  {selected.lockInMonths}-month lock-in from {selected.investedDate} · ends {selected.lockInEndDate}.
                  {!selected.lockInComplete && " Exiting now may attract an early-exit penalty — see conditions below."}
                </p>
              </div>
            </div>

            {/* Exit conditions */}
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-subtle mb-2">
                Exit conditions (from your investment agreement)
              </p>
              <ul className="space-y-2">
                {selected.exitConditions.map((c) => (
                  <li key={c} className="flex items-start gap-2 text-xs text-muted leading-relaxed">
                    <span className="w-1 h-1 rounded-full bg-subtle mt-1.5 shrink-0" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            {/* Estimated settlement */}
            <div className="rounded-xl bg-background border border-border p-4">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div>
                  <p className="text-[11px] text-subtle">Current value</p>
                  <p className="text-sm text-foreground font-medium tabular-nums mt-0.5">{selected.currentValue}</p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] text-subtle">Estimated settlement</p>
                  <p className="text-lg font-bold text-foreground tabular-nums mt-0.5">{selected.estimatedSettlement}</p>
                </div>
              </div>
              <p className="text-[11px] text-terracotta mt-3 flex items-start gap-1.5">
                <AlertTriangle size={12} className="shrink-0 mt-0.5" />
                Estimated — subject to final valuation, not guaranteed. The actual settlement amount is calculated by the
                platform after admin review and may differ from this figure.
              </p>
            </div>

            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-subtle mb-2 block">
                Reason for exit
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={4}
                placeholder="Tell us why you'd like to exit this investment..."
                className="w-full px-4 py-3 text-sm bg-background border border-border rounded-xl text-foreground placeholder:text-subtle focus:outline-none focus:border-primary/50 transition-colors resize-none"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={!reason.trim()}
              className="px-4 py-2 text-xs font-semibold bg-primary text-primary-foreground rounded-full hover:bg-primary-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 w-fit"
            >
              <Send size={13} /> Submit Exit Request
            </button>
          </div>
        </SectionCard>

        {/* Process preview */}
        <SectionCard title="How the Exit Process Works" icon={ClipboardCheck}>
          <div className="p-5">
            <ol className="space-y-0">
              {EXIT_STAGES.map((stage, i) => {
                const StageIcon = stage.icon;
                return (
                  <li key={stage.label} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <span className="w-7 h-7 rounded-full bg-surface-hover text-subtle flex items-center justify-center text-[10px] font-bold shrink-0">
                        <StageIcon size={13} />
                      </span>
                      {i < EXIT_STAGES.length - 1 && <span className="w-px flex-1 min-h-[16px] bg-border" />}
                    </div>
                    <div className={`pb-4 ${i === EXIT_STAGES.length - 1 ? "pb-0" : ""}`}>
                      <p className="text-xs font-medium text-foreground">{stage.label}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
            <p className="text-[11px] text-subtle mt-1">
              Every stage is tracked here once you submit a request — you'll be notified as it progresses.
            </p>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

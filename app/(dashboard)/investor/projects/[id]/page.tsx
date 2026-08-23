"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Info,
  IndianRupee,
  PieChart,
  ShieldCheck,
  Download,
  Calculator,
  MapPin,
  FileText,
  Layers,
  HardHat,
  ClipboardList,
  Hammer,
  Package,
  Camera,
  Video,
  CheckCircle2,
  Clock,
  Circle,
  Users,
  TrendingUp,
  CalendarDays,
} from "lucide-react";
import { SectionCard, StatGrid, StatusPill } from "@/app/components/DashboardUI";

// ============================================
// Local mock data — investor project detail
// (kept local to this file so concurrent agents editing
// lib/mock-data.ts or lib/dashboards.ts never conflict)
// ============================================

type DevStageStatus = "Complete" | "In Progress" | "Upcoming";

interface DevStage {
  stage: string;
  status: DevStageStatus;
  completion: number;
  target: string;
  actual: string | null;
}

interface BoqCategory {
  category: string;
  progress: number;
}

interface MajorWork {
  name: string;
  status: DevStageStatus;
  progress: number;
}

interface ConstructionProgress {
  currentPhase: string;
  materialProgress: number;
  labourProgress: number;
  boq: BoqCategory[];
  majorWorks: MajorWork[];
  lastMediaUpdate: string;
  photoCount: number;
  videoCount: number;
}

interface ProjectDetail {
  id: string;
  name: string;
  location: string;
  image: string;
  fundingStage: string;
  story: string;
  concept: string;
  architecture: string;
  developmentStatus: string;
  unitCount: number;
  totalInvestment: string;
  fundTarget: number;
  fundRaised: number;
  minInvestment: number;
  sliderMax: number;
  sliderStep: number;
  targetIRRPct: number;
  projectedAppreciationPct: number;
  holdingPeriod: string;
  revenueShare: string;
  constructionProgress: number;
  openingDate: string;
  occupancy: string;
  revenue: string;
  expenses: string;
  profit: string;
  financialsAreProjected: boolean;
  investors: number;
  inDevelopment: boolean;
  devStages: DevStage[];
  construction?: ConstructionProgress;
}

const projectsById: Record<string, ProjectDetail> = {
  "PRJ-01": {
    id: "PRJ-01",
    name: "The Malabar Eco Retreat",
    location: "Wayanad, Kerala",
    image:
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1200&auto=format&fit=crop",
    fundingStage: "Pre-Launch",
    story:
      "The Malabar Eco Retreat is a 12-key luxury eco-resort nestled in the hills of Wayanad. Designed by award-winning sustainable architects, the property features zero-carbon footprint villas, a farm-to-table restaurant, and an ayurvedic spa.",
    concept: "12-key luxury eco-resort with farm-to-table dining and an ayurvedic spa",
    architecture: "Off-grid villas on stilts, sustainable design by Studio Verdant Architects",
    developmentStatus: "Construction in progress — superstructure & roofing phase",
    unitCount: 12,
    totalInvestment: "₹5.0 Cr",
    fundTarget: 50000000,
    fundRaised: 32000000,
    minInvestment: 500000,
    sliderMax: 10000000,
    sliderStep: 100000,
    targetIRRPct: 18.5,
    projectedAppreciationPct: 8.0,
    holdingPeriod: "5 Years",
    revenueShare: "80% Investors / 20% Dhyana Stays",
    constructionProgress: 68,
    openingDate: "Q4 2027",
    occupancy: "Pre-operational — targeting 65% occupancy at year-1 stabilization",
    revenue: "₹4.8L / mo",
    expenses: "₹1.6L / mo",
    profit: "₹3.2L / mo",
    financialsAreProjected: true,
    investors: 42,
    inDevelopment: true,
    devStages: [
      { stage: "Land", status: "Complete", completion: 100, target: "Jan 2024", actual: "Jan 2024" },
      { stage: "Planning", status: "Complete", completion: 100, target: "Apr 2024", actual: "Mar 2024" },
      { stage: "Design", status: "Complete", completion: 100, target: "Aug 2024", actual: "Aug 2024" },
      { stage: "Approval", status: "Complete", completion: 100, target: "Nov 2024", actual: "Dec 2024" },
      { stage: "Construction", status: "In Progress", completion: 68, target: "Jun 2026", actual: null },
      { stage: "Interior", status: "Upcoming", completion: 0, target: "Oct 2026", actual: null },
      { stage: "Marketing", status: "In Progress", completion: 20, target: "Feb 2027", actual: null },
      { stage: "Pre-launch", status: "Upcoming", completion: 0, target: "Aug 2027", actual: null },
      { stage: "Opening", status: "Upcoming", completion: 0, target: "Nov 2027", actual: null },
      { stage: "Operations", status: "Upcoming", completion: 0, target: "Dec 2027", actual: null },
    ],
    construction: {
      currentPhase: "Phase 3 of 5 — Superstructure & Roofing",
      materialProgress: 72,
      labourProgress: 65,
      boq: [
        { category: "Civil & Structure", progress: 78 },
        { category: "MEP (Electrical, Plumbing, HVAC)", progress: 42 },
        { category: "Interiors & Furnishing", progress: 5 },
        { category: "Landscaping & External Works", progress: 0 },
        { category: "Utilities & Sustainability Systems", progress: 30 },
      ],
      majorWorks: [
        { name: "Foundation & Plinth", status: "Complete", progress: 100 },
        { name: "Superstructure (Walls & Roof)", status: "In Progress", progress: 75 },
        { name: "Roofing & Waterproofing", status: "In Progress", progress: 60 },
        { name: "Electrical Rough-in", status: "In Progress", progress: 40 },
        { name: "Plumbing Rough-in", status: "In Progress", progress: 35 },
        { name: "Interior Carpentry", status: "Upcoming", progress: 0 },
        { name: "Landscaping", status: "Upcoming", progress: 0 },
      ],
      lastMediaUpdate: "Aug 5, 2026",
      photoCount: 46,
      videoCount: 6,
    },
  },
  "PRJ-02": {
    id: "PRJ-02",
    name: "Himalayan Glass Cabins",
    location: "Manali, Himachal",
    image:
      "https://images.unsplash.com/photo-1542718610-a1d656d1884c?q=80&w=1200&auto=format&fit=crop",
    fundingStage: "Active Funding",
    story:
      "Himalayan Glass Cabins is a cluster of 20 free-standing glass-and-timber cabins framing valley and snow-peak views. Prefabricated off-site for a low-impact build, each cabin is designed for stargazing decks and wood-fired winter retreats.",
    concept: "20 free-standing glass cabins designed for stargazing and snow retreats",
    architecture: "Modular glass-and-timber cabins by Alpine Modular Co., prefabricated off-site",
    developmentStatus: "Design development — structural & MEP drawings underway",
    unitCount: 20,
    totalInvestment: "₹3.0 Cr",
    fundTarget: 30000000,
    fundRaised: 8000000,
    minInvestment: 250000,
    sliderMax: 5000000,
    sliderStep: 50000,
    targetIRRPct: 16.0,
    projectedAppreciationPct: 7.0,
    holdingPeriod: "5 Years",
    revenueShare: "75% Investors / 25% Dhyana Stays",
    constructionProgress: 0,
    openingDate: "Q2 2027",
    occupancy: "Pre-operational",
    revenue: "To be projected closer to launch",
    expenses: "To be projected closer to launch",
    profit: "To be projected closer to launch",
    financialsAreProjected: false,
    investors: 18,
    inDevelopment: true,
    devStages: [
      { stage: "Land", status: "Complete", completion: 100, target: "Feb 2025", actual: "Feb 2025" },
      { stage: "Planning", status: "Complete", completion: 100, target: "May 2025", actual: "Jun 2025" },
      { stage: "Design", status: "In Progress", completion: 55, target: "Sep 2026", actual: null },
      { stage: "Approval", status: "Upcoming", completion: 0, target: "Oct 2026", actual: null },
      { stage: "Construction", status: "Upcoming", completion: 0, target: "Feb 2027", actual: null },
      { stage: "Interior", status: "Upcoming", completion: 0, target: "Mar 2027", actual: null },
      { stage: "Marketing", status: "Upcoming", completion: 0, target: "Apr 2027", actual: null },
      { stage: "Pre-launch", status: "Upcoming", completion: 0, target: "May 2027", actual: null },
      { stage: "Opening", status: "Upcoming", completion: 0, target: "May 2027", actual: null },
      { stage: "Operations", status: "Upcoming", completion: 0, target: "Jun 2027", actual: null },
    ],
    construction: {
      currentPhase: "Design Development — Structural & MEP drawings",
      materialProgress: 8,
      labourProgress: 0,
      boq: [
        { category: "Civil & Structure", progress: 0 },
        { category: "MEP (Electrical, Plumbing, HVAC)", progress: 0 },
        { category: "Interiors & Furnishing", progress: 0 },
        { category: "Landscaping & External Works", progress: 0 },
        { category: "Utilities & Sustainability Systems", progress: 5 },
      ],
      majorWorks: [
        { name: "Site Survey & Soil Testing", status: "Complete", progress: 100 },
        { name: "Structural Design", status: "In Progress", progress: 60 },
        { name: "MEP Design", status: "In Progress", progress: 45 },
        { name: "Statutory Approvals Filing", status: "Upcoming", progress: 0 },
        { name: "Foundation Work", status: "Upcoming", progress: 0 },
      ],
      lastMediaUpdate: "Jul 28, 2026",
      photoCount: 12,
      videoCount: 2,
    },
  },
};

function crores(n: number) {
  return `${(n / 10000000).toFixed(1)}Cr`;
}
function lakhs(n: number) {
  return `${(n / 100000).toFixed(1)}L`;
}

function stageTone(status: DevStageStatus): "sage" | "primary" | "muted" {
  if (status === "Complete") return "sage";
  if (status === "In Progress") return "primary";
  return "muted";
}
function stageDotClasses(status: DevStageStatus) {
  if (status === "Complete") return "bg-sage/15 text-sage border-sage/40";
  if (status === "In Progress") return "bg-primary/15 text-primary border-primary/40";
  return "bg-surface-hover text-subtle border-border";
}
function stageBarClasses(status: DevStageStatus) {
  if (status === "Complete") return "bg-sage";
  if (status === "In Progress") return "bg-gradient-to-r from-primary to-primary-hover";
  return "bg-border";
}
function StageIcon({ status }: { status: DevStageStatus }) {
  if (status === "Complete") return <CheckCircle2 size={15} />;
  if (status === "In Progress") return <Clock size={15} />;
  return <Circle size={15} />;
}

function OverviewField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wider text-subtle mb-1">{label}</p>
      <p className="text-sm text-foreground font-medium">{value}</p>
    </div>
  );
}

/** View-only development stage stepper — Land through Operations. No edit/approve controls. */
function DevelopmentTimeline({ stages }: { stages: DevStage[] }) {
  return (
    <ol className="px-5 py-5">
      {stages.map((s, i) => (
        <li key={s.stage} className="relative pl-10 pb-7 last:pb-0">
          {i !== stages.length - 1 && (
            <span className="absolute left-[15px] top-8 bottom-0 w-px bg-border" aria-hidden="true" />
          )}
          <span
            className={`absolute left-0 top-0 w-8 h-8 rounded-full border flex items-center justify-center ${stageDotClasses(
              s.status
            )}`}
          >
            <StageIcon status={s.status} />
          </span>
          <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1.5">
            <div>
              <p className="text-sm font-semibold text-foreground">{s.stage}</p>
              <p className="text-[11px] text-subtle mt-0.5">
                Target {s.target}
                {s.actual ? ` · Actual ${s.actual}` : ""}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted tabular-nums">{s.completion}%</span>
              <StatusPill tone={stageTone(s.status)}>{s.status}</StatusPill>
            </div>
          </div>
          <div className="mt-2 h-1.5 w-full max-w-[220px] bg-surface-hover rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${stageBarClasses(s.status)}`}
              style={{ width: `${s.completion}%` }}
            />
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function InvestorProjectDetailPage() {
  const params = useParams();
  const idParam = (params?.id as string) || "PRJ-01";
  const project = projectsById[idParam] ?? projectsById["PRJ-01"];

  const [investmentAmount, setInvestmentAmount] = useState(project.minInvestment);

  const yearlyYield = (investmentAmount * project.targetIRRPct) / 100;
  const monthlyYield = yearlyYield / 12;
  const fiveYearValue = investmentAmount * Math.pow(1 + project.projectedAppreciationPct / 100, 5);

  const fundingPct = Math.round((project.fundRaised / project.fundTarget) * 100);
  const currentDevStage =
    project.devStages.find((s) => s.status === "In Progress") ??
    [...project.devStages].reverse().find((s) => s.status === "Complete") ??
    project.devStages[0];

  return (
    <div className="space-y-4 pb-12 max-w-[1000px] mx-auto">
      <Link
        href="/investor/projects"
        className="inline-flex items-center gap-2 text-xs text-muted hover:text-foreground transition-colors"
      >
        <ArrowLeft size={14} /> Back to Projects
      </Link>

      <div className="bg-surface border border-border rounded-2xl overflow-hidden">
        <div className="h-64 md:h-80 relative">
          <img src={project.image} alt={project.name} className="w-full h-full object-cover opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-3 py-1 bg-background/80 backdrop-blur-md text-primary text-[10px] uppercase tracking-wider rounded-full border border-primary/30 font-semibold inline-block">
                {project.fundingStage}
              </span>
              <span className="px-3 py-1 bg-background/80 backdrop-blur-md text-foreground text-[10px] uppercase tracking-wider rounded-full border border-border font-semibold inline-block">
                {currentDevStage.stage} · {currentDevStage.completion}% complete
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{project.name}</h1>
            <p className="text-muted flex items-center gap-2">
              <MapPin size={16} /> {project.location}
            </p>
          </div>
        </div>
      </div>

      <StatGrid
        stats={[
          {
            label: "Funding Raised",
            value: `${fundingPct}%`,
            delta: `₹${crores(project.fundRaised)} of ₹${crores(project.fundTarget)}`,
            icon: TrendingUp,
          },
          {
            label: "Construction Progress",
            value: `${project.constructionProgress}%`,
            delta: currentDevStage.stage,
            icon: HardHat,
          },
          { label: "Co-owners", value: `${project.investors}`, delta: `₹${lakhs(project.minInvestment)} min.`, icon: Users },
          { label: "Target Opening", value: project.openingDate, delta: "Estimate, not guaranteed", icon: CalendarDays },
        ]}
      />

      <div className="grid md:grid-cols-2 gap-5">
        {/* Left Column - Investment Calculator */}
        <div className="space-y-4">
          <div className="bg-surface border border-border rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <Calculator size={20} className="text-primary" /> Investment Calculator
            </h2>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-4">
                  <label className="text-sm font-medium text-muted">Your Investment</label>
                  <span className="text-lg font-bold text-foreground">₹{lakhs(investmentAmount)}</span>
                </div>
                <input
                  type="range"
                  min={project.minInvestment}
                  max={project.sliderMax}
                  step={project.sliderStep}
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                  className="w-full accent-primary h-2 bg-surface-hover rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-subtle mt-2">
                  <span>Min: ₹{lakhs(project.minInvestment)}</span>
                  <span>Max: ₹{lakhs(project.sliderMax)}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border">
                <div className="bg-surface-hover p-4 rounded-xl border border-border">
                  <div className="text-[10px] uppercase tracking-wider text-muted mb-1">Monthly Yield</div>
                  <div className="text-xl font-bold text-sage">
                    ₹{monthlyYield.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                </div>
                <div className="bg-surface-hover p-4 rounded-xl border border-border">
                  <div className="text-[10px] uppercase tracking-wider text-muted mb-1">Annual Yield</div>
                  <div className="text-xl font-bold text-sage">
                    ₹{yearlyYield.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                </div>
                <div className="col-span-2 bg-gradient-to-r from-surface-hover to-surface p-4 rounded-xl border border-primary/30">
                  <div className="text-[10px] uppercase tracking-wider text-primary mb-1 font-semibold">
                    Value after 5 Years (Projected)
                  </div>
                  <div className="text-2xl font-bold text-foreground">
                    ₹{fiveYearValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                  <div className="text-xs text-muted mt-1 flex items-center gap-1">
                    <Info size={12} /> Estimate only, assumes {project.projectedAppreciationPct}% annual capital
                    appreciation. Not a guaranteed return.
                  </div>
                </div>
              </div>

              <button className="w-full py-4 bg-gradient-to-r from-primary to-primary-hover text-primary-foreground font-semibold text-sm rounded-xl hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all">
                Invest Now
              </button>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-foreground mb-4">Investment Documents</h3>
            <div className="space-y-3">
              {["Project Brochure", "Financial Projections (Detailed)", "Term Sheet"].map((doc, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-3 border border-border rounded-xl hover:bg-surface-hover transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-border rounded text-muted">
                      <FileText size={16} />
                    </div>
                    <span className="text-sm text-foreground">{doc}</span>
                  </div>
                  <Download size={16} className="text-primary" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Project Details */}
        <div className="space-y-4">
          <div className="bg-surface border border-border rounded-2xl p-6 md:p-8">
            <h3 className="text-lg font-semibold text-foreground mb-4">Project Overview</h3>
            <p className="text-sm text-muted leading-relaxed mb-6">{project.story}</p>

            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4 mb-6 pb-6 border-b border-border">
              <OverviewField label="Property Concept" value={project.concept} />
              <OverviewField label="Architecture & Design" value={project.architecture} />
              <OverviewField label="Development Status" value={project.developmentStatus} />
              <OverviewField label="Unit Count" value={`${project.unitCount} keys`} />
              <OverviewField label="Total Investment" value={project.totalInvestment} />
              <OverviewField
                label="Funding Status"
                value={`₹${crores(project.fundRaised)} raised of ₹${crores(project.fundTarget)} (${fundingPct}%)`}
              />
              <OverviewField label="Construction Progress" value={`${project.constructionProgress}%`} />
              <OverviewField label="Opening Date (Target)" value={project.openingDate} />
              <OverviewField label="Occupancy" value={project.occupancy} />
              <OverviewField
                label="Investor Participation"
                value={`${project.investors} co-owners · ₹${lakhs(project.minInvestment)} min. entry`}
              />
            </div>

            <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider flex items-center gap-1.5">
              <IndianRupee size={13} className="text-primary" /> Financial Highlights
            </h3>
            <div className="space-y-3 text-sm border-b border-border pb-4 mb-3">
              <div className="flex justify-between">
                <span className="text-subtle">Total Project Cost</span>
                <span className="font-medium text-foreground">{project.totalInvestment}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-subtle">Targeted IRR</span>
                <span className="font-medium text-sage">{project.targetIRRPct}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-subtle">Holding Period</span>
                <span className="font-medium text-foreground">{project.holdingPeriod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-subtle">Revenue Share</span>
                <span className="font-medium text-foreground">{project.revenueShare}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-subtle">Revenue (Monthly){project.financialsAreProjected ? " · Projected" : ""}</span>
                <span className="font-medium text-foreground">{project.revenue}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-subtle">
                  Operating Expenses (Monthly){project.financialsAreProjected ? " · Projected" : ""}
                </span>
                <span className="font-medium text-foreground">{project.expenses}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-subtle">Net Profit (Monthly){project.financialsAreProjected ? " · Projected" : ""}</span>
                <span className="font-medium text-sage">{project.profit}</span>
              </div>
            </div>
            {project.financialsAreProjected && (
              <p className="text-[11px] text-subtle flex items-start gap-1.5 mb-6">
                <Info size={12} className="mt-0.5 shrink-0" /> Pre-operational figures are estimates set by the
                platform and are not a guarantee of returns.
              </p>
            )}

            <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              Ownership Structure
            </h3>
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full border-8 border-surface-hover relative flex items-center justify-center">
                <div
                  className="absolute inset-0 rounded-full border-8 border-primary"
                  style={{ clipPath: "polygon(50% 50%, 100% 0, 100% 100%, 0 100%, 0 0, 50% 0)" }}
                ></div>
                <div
                  className="absolute inset-0 rounded-full border-8 border-border"
                  style={{ clipPath: "polygon(50% 50%, 50% 0, 100% 0)" }}
                ></div>
                <PieChart className="text-subtle" size={24} />
              </div>
              <div className="flex-1 space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-primary"></div>
                  <span className="text-muted">{project.revenueShare.split(" / ")[0]}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-border"></div>
                  <span className="text-muted">{project.revenueShare.split(" / ")[1]}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Development Tracking */}
      <SectionCard title="Development Tracking" icon={Layers}>
        <p className="px-5 pt-4 text-[11px] text-subtle flex items-center gap-1.5">
          <Info size={11} /> View-only progress feed maintained by the platform. Investors cannot edit or approve
          stages.
        </p>
        <DevelopmentTimeline stages={project.devStages} />
      </SectionCard>

      {/* Construction Progress specifics — only while the project is still in development */}
      {project.inDevelopment && project.construction && (
        <SectionCard title="Construction Progress" icon={HardHat}>
          <div className="p-5 md:p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-subtle mb-1">Current Phase</p>
                <p className="text-sm font-semibold text-foreground">{project.construction.currentPhase}</p>
              </div>
              <p className="text-[11px] text-subtle">Updated {project.construction.lastMediaUpdate}</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-surface-hover p-4 rounded-xl border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted flex items-center gap-1.5">
                    <Package size={13} /> Material Progress
                  </span>
                  <span className="text-sm font-semibold text-foreground tabular-nums">
                    {project.construction.materialProgress}%
                  </span>
                </div>
                <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${project.construction.materialProgress}%` }}
                  />
                </div>
              </div>
              <div className="bg-surface-hover p-4 rounded-xl border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted flex items-center gap-1.5">
                    <HardHat size={13} /> Labour Progress
                  </span>
                  <span className="text-sm font-semibold text-foreground tabular-nums">
                    {project.construction.labourProgress}%
                  </span>
                </div>
                <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${project.construction.labourProgress}%` }}
                  />
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <ClipboardList size={13} className="text-primary" /> BOQ Summary
                <span className="text-subtle font-normal normal-case">— work completion by category</span>
              </h4>
              <div className="space-y-3">
                {project.construction.boq.map((b) => (
                  <div key={b.category}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted">{b.category}</span>
                      <span className="text-foreground font-medium tabular-nums">{b.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-surface-hover rounded-full overflow-hidden">
                      <div className="h-full bg-sage rounded-full" style={{ width: `${b.progress}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Hammer size={13} className="text-primary" /> Major Works
              </h4>
              <ul className="divide-y divide-surface-hover border border-border rounded-xl overflow-hidden">
                {project.construction.majorWorks.map((w) => (
                  <li key={w.name} className="flex items-center justify-between gap-3 px-4 py-2.5">
                    <span className="text-sm text-foreground">{w.name}</span>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-muted tabular-nums">{w.progress}%</span>
                      <StatusPill tone={stageTone(w.status)}>{w.status}</StatusPill>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">
                Site Photos & Videos
              </h4>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-xl bg-surface-hover border border-dashed border-border flex items-center justify-center text-subtle"
                  >
                    {i % 3 === 2 ? <Video size={16} /> : <Camera size={16} />}
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-subtle mt-3">
                {project.construction.photoCount} photos · {project.construction.videoCount} videos on file · last
                upload {project.construction.lastMediaUpdate}
              </p>
            </div>
          </div>
        </SectionCard>
      )}

      {/* Trust footer */}
      <div className="bg-surface border border-border rounded-2xl p-6 flex items-center gap-4">
        <ShieldCheck size={22} className="text-primary shrink-0" />
        <p className="text-xs text-muted">
          All financials, construction data and development milestones on this page are maintained and verified by
          Dhyana Stays. Investors have view-only access and cannot edit figures or approve stages.
        </p>
      </div>
    </div>
  );
}

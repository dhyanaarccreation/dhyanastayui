import { Briefcase, TrendingUp, Building, PiggyBank, Layers } from "lucide-react";
import { PageHeader, SectionCard, StatGrid, StatusPill } from "@/app/components/DashboardUI";

const holdings = [
  {
    project: "Nila Wellness Expansion",
    location: "Palakkad, Kerala",
    propertyType: "Wellness Villa",
    unit: "W-04",
    invested: "₹10.0L",
    investedLakhs: 10.0,
    value: "₹12.8L",
    roi: "+28.0%",
    share: 34,
    investmentDate: "12 Mar 2023",
    status: "Earning",
    tone: "sage" as const,
    monthlyRevenue: "₹1,42,000",
    revenueShare: "30%",
    occupancy: "82%",
    totalReturns: "₹3.6L",
    model: "Land + Investment Partner",
  },
  {
    project: "Canopy Village · Phase 2",
    location: "Auroville, TN",
    propertyType: "Tiny House",
    unit: "C-12",
    invested: "₹7.5L",
    investedLakhs: 7.5,
    value: "₹8.9L",
    roi: "+18.7%",
    share: 25,
    investmentDate: "08 Jul 2023",
    status: "Earning",
    tone: "sage" as const,
    monthlyRevenue: "₹96,500",
    revenueShare: "25%",
    occupancy: "76%",
    totalReturns: "₹2.1L",
    model: "Split Investment",
  },
  {
    project: "Stone Valley Cottages",
    location: "Kodaikanal, TN",
    propertyType: "Farm Stay Cottage",
    unit: "S-07",
    invested: "₹6.0L",
    investedLakhs: 6.0,
    value: "₹6.6L",
    roi: "+10.0%",
    share: 21,
    investmentDate: "22 Nov 2023",
    status: "Ramp-up",
    tone: "primary" as const,
    monthlyRevenue: "₹41,200",
    revenueShare: "20%",
    occupancy: "58%",
    totalReturns: "₹68,000",
    model: "Investment Without Land",
  },
  {
    project: "Glass Pavilion Annexe",
    location: "Wayanad, Kerala",
    propertyType: "Luxury Villa",
    unit: "G-02",
    invested: "₹6.0L",
    investedLakhs: 6.0,
    value: "₹6.1L",
    roi: "+1.7%",
    share: 20,
    investmentDate: "05 Feb 2024",
    status: "Under construction",
    tone: "muted" as const,
    monthlyRevenue: "Pre-launch",
    revenueShare: "22%",
    occupancy: "—",
    totalReturns: "₹0",
    model: "Land + Investment Partner",
  },
];

const allocation = [
  { label: "Wellness retreats", pct: 34, cls: "bg-primary" },
  { label: "Tiny house villages", pct: 25, cls: "bg-sage" },
  { label: "Farm stays", pct: 21, cls: "bg-primary-hover" },
  { label: "Luxury villas", pct: 20, cls: "bg-terracotta" },
];

const totalInvestedLakhs = holdings.reduce((sum, h) => sum + h.investedLakhs, 0);
const portfolioAllocation = holdings.map((h) => ({
  project: h.project,
  pct: Math.round((h.investedLakhs / totalInvestedLakhs) * 100),
}));

export default function InvestorPortfolioPage() {
  return (
    <div className="space-y-8 pb-12">
      <PageHeader
        title="My Portfolio"
        subtitle="Your holdings across Dhyana curated hospitality projects."
        action={{ label: "Explore New Projects", href: "/investor/projects", icon: Building }}
      />

      <StatGrid
        stats={[
          { label: "Total Invested", value: "₹29.5L", icon: PiggyBank },
          { label: "Current Value", value: "₹34.4L", delta: "+16.6% overall", icon: TrendingUp },
          { label: "Active Projects", value: "4", delta: "2 earning monthly" },
          { label: "Monthly Payout", value: "₹38,400", delta: "avg last 3 months" },
        ]}
      />

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Investment cards */}
        <SectionCard title="My Investments" icon={Briefcase} className="lg:col-span-2">
          <div className="p-5 space-y-4">
            {holdings.map((h) => (
              <div key={h.project} className="rounded-2xl border border-border bg-surface-hover/30 p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-sm text-foreground font-medium">{h.project}</p>
                    <p className="text-[11px] text-subtle mt-0.5">
                      {h.location} · {h.propertyType} · Unit {h.unit}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap justify-end">
                    <StatusPill tone={h.tone}>{h.status}</StatusPill>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-primary/10 text-primary border border-primary/20 whitespace-nowrap">
                      <Layers className="w-3 h-3" />
                      {h.model}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-5 gap-y-4 mt-5 pt-4 border-t border-surface-hover">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-subtle">Investment amount</p>
                    <p className="text-sm text-foreground font-medium tabular-nums mt-1">{h.invested}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-subtle">Ownership share</p>
                    <p className="text-sm text-foreground font-medium tabular-nums mt-1">{h.share}%</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-subtle">Investment date</p>
                    <p className="text-sm text-foreground font-medium mt-1">{h.investmentDate}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-subtle">Current value</p>
                    <p className="text-sm text-foreground font-medium tabular-nums mt-1">{h.value}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-subtle">Monthly revenue</p>
                    <p className="text-sm text-foreground font-medium tabular-nums mt-1">{h.monthlyRevenue}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-subtle">Investor revenue share</p>
                    <p className="text-sm text-foreground font-medium tabular-nums mt-1">{h.revenueShare}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-subtle">ROI</p>
                    <p className="text-sm font-semibold text-sage tabular-nums mt-1">{h.roi}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-subtle">Occupancy</p>
                    <p className="text-sm text-foreground font-medium tabular-nums mt-1">{h.occupancy}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-subtle">Total returns</p>
                    <p className="text-sm text-foreground font-medium tabular-nums mt-1">{h.totalReturns}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Allocation */}
        <SectionCard title="Allocation" icon={TrendingUp}>
          <div className="px-5 py-5">
            <div className="flex h-3 rounded-full overflow-hidden mb-5">
              {allocation.map((a) => (
                <div key={a.label} className={a.cls} style={{ width: `${a.pct}%` }} />
              ))}
            </div>
            <ul className="space-y-3">
              {allocation.map((a) => (
                <li key={a.label} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-muted">
                    <span className={`w-2.5 h-2.5 rounded-full ${a.cls}`} />
                    {a.label}
                  </span>
                  <span className="text-foreground font-medium tabular-nums">{a.pct}%</span>
                </li>
              ))}
            </ul>
            <p className="text-[11px] text-subtle mt-5">
              Diversified across 3 regions. Rebalancing suggestions appear when any class crosses 40%.
            </p>

            {holdings.length > 1 && (
              <div className="mt-6 pt-5 border-t border-surface-hover">
                <p className="text-[11px] uppercase tracking-wider text-subtle font-semibold mb-3">
                  Portfolio Allocation by Investment
                </p>
                <ul className="space-y-2.5">
                  {portfolioAllocation.map((p) => (
                    <li key={p.project} className="flex items-center justify-between gap-3 text-sm">
                      <span className="text-muted truncate">{p.project}</span>
                      <span className="text-foreground font-medium tabular-nums shrink-0">{p.pct}%</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

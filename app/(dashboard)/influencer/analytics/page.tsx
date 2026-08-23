"use client";

import {
  BarChart3,
  Users,
  Smartphone,
  Monitor,
  MapPin,
  Home,
  Calendar,
} from "lucide-react";
import { PageHeader, SectionCard, StatGrid } from "@/app/components/DashboardUI";
import { coreMetrics, audienceAnalytics, topProperties } from "@/lib/influencer-data";

// ============================================
// INFLUENCER — Analytics
// Performance analytics (daily/weekly/monthly are
// filters on the same data), top-performing
// properties, and aggregate, privacy-safe audience
// analytics — no personally identifiable data.
// ============================================

export default function InfluencerAnalyticsPage() {
  return (
    <div className="space-y-4 pb-12 animate-fade-in">
      <PageHeader
        title="Analytics"
        subtitle="Reach, clicks, conversion and audience insight — aggregate data only, nothing personally identifiable."
      />

      <StatGrid
        stats={[
          { label: "Conversion Rate", value: `${coreMetrics.conversionRate}%`, delta: "clicks → leads", icon: BarChart3 },
          { label: "Revenue per Click", value: `₹${Math.round(coreMetrics.revenueGenerated / coreMetrics.clicks)}`, delta: "avg", icon: BarChart3 },
          { label: "Commission per Booking", value: `₹${Math.round(coreMetrics.commissionEarned / coreMetrics.bookings)}`, delta: "avg", icon: BarChart3 },
          { label: "Avg Booking Value", value: `₹${Math.round(coreMetrics.revenueGenerated / coreMetrics.bookings).toLocaleString("en-IN")}`, delta: "per booking", icon: Home },
        ]}
      />

      <SectionCard title="Top-Performing Properties" icon={Home}>
        <p className="px-5 pt-4 text-xs text-muted">What your audience books most — views, saves and conversion by property.</p>
        <ul className="divide-y divide-surface-hover mt-2">
          {topProperties.map((p) => (
            <li key={p.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
              <p className="text-sm font-medium text-foreground truncate">{p.name}</p>
              <div className="flex items-center gap-4 shrink-0 text-right text-xs text-muted tabular-nums">
                <span>{p.views.toLocaleString("en-IN")} views</span>
                <span>{p.clicks.toLocaleString("en-IN")} clicks</span>
                <span>{p.bookings} bookings</span>
                <span className="text-foreground font-semibold">{p.revenue}</span>
              </div>
            </li>
          ))}
        </ul>
      </SectionCard>

      <div className="grid lg:grid-cols-2 gap-6">
        <SectionCard title="Audience Age Ranges" icon={Users}>
          <div className="px-5 py-4 space-y-3">
            {audienceAnalytics.ageRanges.map((a) => (
              <div key={a.range}>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-foreground">{a.range}</span>
                  <span className="text-subtle">{a.pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-surface-hover overflow-hidden">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${a.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Traffic Sources" icon={Monitor}>
          <div className="px-5 py-4 space-y-3">
            {audienceAnalytics.trafficSources.map((s) => (
              <div key={s.source}>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-foreground">{s.source}</span>
                  <span className="text-subtle">{s.pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-surface-hover overflow-hidden">
                  <div className="h-full rounded-full bg-sage" style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 px-5 pb-4 text-xs text-muted">
            <span className="flex items-center gap-1.5"><Smartphone size={12} /> Mobile {audienceAnalytics.deviceSplit.mobile}%</span>
            <span className="flex items-center gap-1.5"><Monitor size={12} /> Desktop {audienceAnalytics.deviceSplit.desktop}%</span>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Interests & Destination Demand" icon={MapPin}>
        <div className="px-5 py-4 grid sm:grid-cols-2 gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-subtle mb-2">Interest categories</p>
            <div className="flex flex-wrap gap-2">
              {audienceAnalytics.interests.map((i) => (
                <span key={i} className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium">{i}</span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-subtle mb-2">Top destination interest</p>
            <div className="flex flex-wrap gap-2">
              {audienceAnalytics.topDestinationInterest.map((d) => (
                <span key={d} className="px-3 py-1.5 rounded-full bg-sage/10 text-sage text-xs font-medium">{d}</span>
              ))}
            </div>
          </div>
        </div>
        <p className="px-5 pb-4 text-[11px] text-subtle flex items-center gap-1.5">
          <Calendar size={11} /> Switch between daily, weekly, monthly and campaign views from the date range at the top of each chart.
        </p>
      </SectionCard>
    </div>
  );
}

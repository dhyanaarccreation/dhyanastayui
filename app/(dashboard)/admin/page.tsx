"use client";

import Link from "next/link";
import { ArrowUpRight, BarChart3, Building, ShieldCheck, TrendingUp, Users, Wallet, AlertCircle } from "lucide-react";

export default function AdminDashboardOverview() {
  const kpis = [
    { label: "Global Gross Booking Value", value: "₹4.2 Cr", change: "+18%", icon: Wallet },
    { label: "Total Platform Revenue", value: "₹63.0 L", change: "+15%", icon: TrendingUp },
    { label: "Total Active Users", value: "14,205", change: "+2.4%", icon: Users },
    { label: "Active Properties", value: "182", change: "+5", icon: Building },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="heading-display text-3xl text-foreground mb-2">
            Command Center
          </h1>
          <p className="text-sm text-muted">
            System-wide metrics and actionable alerts across the Dhyana ecosystem.
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/admin/inspections"
            className="px-4 py-2 bg-surface-hover border border-border text-foreground font-semibold text-sm rounded-xl hover:bg-surface-hover transition-colors flex items-center gap-2"
          >
            <ShieldCheck size={16} /> Inspections (4 Pending)
          </Link>
          <button className="px-4 py-2 bg-primary text-primary-foreground font-semibold text-sm rounded-xl hover:bg-primary-hover transition-colors">
            Generate Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <div key={i} className="bg-surface border border-border rounded-2xl p-6 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <kpi.icon size={100} />
            </div>
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-xl bg-surface-hover flex items-center justify-center text-primary">
                <kpi.icon size={20} />
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-md bg-sage/20 text-sage`}>
                {kpi.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">{kpi.value}</div>
            <div className="text-sm text-muted">{kpi.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Revenue Chart Placeholder */}
          <div className="bg-surface border border-border rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-foreground">Platform Revenue (Last 6 Months)</h2>
              <select className="bg-background border border-border text-sm text-foreground rounded-lg px-3 py-1 focus:outline-none">
                <option>All Regions</option>
                <option>North India</option>
                <option>South India</option>
              </select>
            </div>
            <div className="h-64 flex items-end justify-between gap-2 border-b border-border pb-2 mb-2 relative">
              {/* Mock chart lines */}
              <div className="absolute inset-0 flex flex-col justify-between opacity-10">
                <div className="w-full h-px bg-foreground"></div>
                <div className="w-full h-px bg-foreground"></div>
                <div className="w-full h-px bg-foreground"></div>
                <div className="w-full h-px bg-foreground"></div>
              </div>
              
              {[40, 55, 45, 70, 85, 100].map((height, i) => (
                <div key={i} className="w-full flex flex-col justify-end gap-1 group" style={{ height: `100%` }}>
                  <div className="w-full bg-surface-hover rounded-t-sm transition-all group-hover:bg-primary/50" style={{ height: `${height * 0.4}%` }}></div>
                  <div className="w-full bg-gradient-to-t from-primary/50 to-primary rounded-t-sm transition-all group-hover:from-primary group-hover:to-primary-hover" style={{ height: `${height}%` }}></div>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-subtle uppercase tracking-wider px-2">
              <span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span>
            </div>
            <div className="flex justify-center gap-6 mt-4 text-xs text-muted">
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-primary rounded-sm"></div> Stay Revenue</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-surface-hover rounded-sm"></div> Experiences & Add-ons</div>
            </div>
          </div>

          {/* Recent Host Applications */}
          <div className="bg-surface border border-border rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-foreground">Recent Host Applications</h2>
              <Link href="/admin/users" className="text-sm text-primary hover:underline">View All</Link>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-muted">
                <thead className="text-xs uppercase bg-surface-hover text-subtle">
                  <tr>
                    <th className="px-4 py-3 rounded-l-lg">Applicant</th>
                    <th className="px-4 py-3">Property Type</th>
                    <th className="px-4 py-3">Location</th>
                    <th className="px-4 py-3 rounded-r-lg">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="hover:bg-surface-hover/50 transition-colors">
                    <td className="px-4 py-4 font-medium text-foreground">Arjun Singh</td>
                    <td className="px-4 py-4">Heritage Fort</td>
                    <td className="px-4 py-4">Jodhpur</td>
                    <td className="px-4 py-4"><span className="text-orange-400">KYC Pending</span></td>
                  </tr>
                  <tr className="hover:bg-surface-hover/50 transition-colors">
                    <td className="px-4 py-4 font-medium text-foreground">Priya Desai</td>
                    <td className="px-4 py-4">Eco Villa</td>
                    <td className="px-4 py-4">Coorg</td>
                    <td className="px-4 py-4"><span className="text-primary">Under Curation</span></td>
                  </tr>
                  <tr className="hover:bg-surface-hover/50 transition-colors">
                    <td className="px-4 py-4 font-medium text-foreground">Rohan Mehta</td>
                    <td className="px-4 py-4">Treehouse</td>
                    <td className="px-4 py-4">Munnar</td>
                    <td className="px-4 py-4"><span className="text-sage">Approved</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* System Alerts */}
          <div className="bg-surface border border-red-500/20 rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <AlertCircle className="text-red-500" size={16} /> System Alerts
            </h3>
            <div className="space-y-4">
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                <div className="text-sm font-medium text-red-400 mb-1">SOS Triggered - PRJ-12</div>
                <div className="text-xs text-muted">Medical emergency reported at The Glasshouse in the Pines. Local authorities dispatched.</div>
                <button className="text-xs font-medium text-red-400 mt-2 hover:underline">View Incident Log</button>
              </div>
              <div className="p-3 bg-surface-hover border border-border rounded-xl">
                <div className="text-sm font-medium text-foreground mb-1">High Server Load</div>
                <div className="text-xs text-muted">Payment gateway integration is experiencing higher latency than usual (450ms).</div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-surface border border-border rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-foreground mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full py-2.5 px-4 bg-surface-hover border border-border text-foreground text-sm text-left rounded-xl hover:bg-surface-hover transition-colors">
                Issue Platform Refund
              </button>
              <button className="w-full py-2.5 px-4 bg-surface-hover border border-border text-foreground text-sm text-left rounded-xl hover:bg-surface-hover transition-colors">
                Create Promo Code
              </button>
              <button className="w-full py-2.5 px-4 bg-surface-hover border border-border text-foreground text-sm text-left rounded-xl hover:bg-surface-hover transition-colors">
                Send Global Notification
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Daily operations queues — refunds, document verification, review moderation */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Refund Requests */}
        <div className="bg-surface border border-border rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-semibold text-foreground">Refund Requests</h3>
            <span className="text-xs text-muted">3 pending</span>
          </div>
          <div className="space-y-3">
            {[
              { booking: "DHY-8412", guest: "Kavya S.", amount: "₹8,400", reason: "Host cancelled — AC failure" },
              { booking: "DHY-8397", guest: "Imran K.", amount: "₹3,200", reason: "Partial refund — late check-in" },
              { booking: "DHY-8375", guest: "Neeta P.", amount: "₹12,750", reason: "Medical emergency, 7-day notice" },
            ].map((r) => (
              <div key={r.booking} className="p-3 bg-background border border-border rounded-xl">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-foreground">{r.booking} · {r.guest}</span>
                  <span className="text-sm font-semibold text-foreground">{r.amount}</span>
                </div>
                <p className="text-xs text-muted mb-2">{r.reason}</p>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 bg-primary text-primary-foreground text-xs font-medium rounded-lg hover:bg-primary-hover transition-colors">Approve</button>
                  <button className="px-3 py-1.5 border border-border text-xs font-medium text-foreground rounded-lg hover:bg-surface-hover transition-colors">Escalate</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Document Verification */}
        <div className="bg-surface border border-border rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-semibold text-foreground">Document Verification</h3>
            <span className="text-xs text-muted">4 in queue</span>
          </div>
          <div className="space-y-3">
            {[
              { who: "Arjun Singh · Heritage Fort", doc: "Aadhaar KYC", status: "Pending" },
              { who: "Priya Desai · Eco Villa", doc: "GST Certificate", status: "Pending" },
              { who: "Coastal Roots Stays", doc: "Trade Licence", status: "Re-submitted" },
              { who: "Rohan Mehta · Treehouse", doc: "Bank Details", status: "Verified" },
            ].map((d) => (
              <div key={d.who + d.doc} className="flex items-center justify-between p-3 bg-background border border-border rounded-xl">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{d.who}</p>
                  <p className="text-xs text-subtle">{d.doc}</p>
                </div>
                <span className={`text-[10px] px-2 py-1 rounded uppercase tracking-wider font-semibold shrink-0 ${
                  d.status === "Verified"
                    ? "bg-sage/10 text-sage border border-sage/20"
                    : d.status === "Re-submitted"
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "bg-surface-hover text-muted border border-border"
                }`}>
                  {d.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Moderation */}
        <div className="bg-surface border border-border rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-semibold text-foreground">Reviews Moderation</h3>
            <span className="text-xs text-muted">2 flagged</span>
          </div>
          <div className="space-y-3">
            {[
              { property: "Stone Valley Villa", excerpt: "“Contains guest phone number in the text…”", flag: "Personal info" },
              { property: "Old Mill Guesthouse", excerpt: "“Abusive language directed at host…”", flag: "Abusive" },
            ].map((rv) => (
              <div key={rv.property} className="p-3 bg-background border border-border rounded-xl">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-foreground truncate">{rv.property}</span>
                  <span className="text-[10px] px-2 py-1 rounded bg-red-500/10 text-red-400 border border-red-500/20 uppercase tracking-wider font-semibold shrink-0">{rv.flag}</span>
                </div>
                <p className="text-xs text-muted italic mb-2">{rv.excerpt}</p>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 border border-border text-xs font-medium text-foreground rounded-lg hover:bg-surface-hover transition-colors">Publish</button>
                  <button className="px-3 py-1.5 border border-red-500/30 text-xs font-medium text-red-400 rounded-lg hover:bg-red-500/10 transition-colors">Remove</button>
                </div>
              </div>
            ))}
            <p className="text-[11px] text-subtle pt-1">
              Complaints &amp; CRM follow-ups are tracked with support — escalations route to the Regional Admin.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

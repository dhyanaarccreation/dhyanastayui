import {
  Gift,
  Copy,
  Ticket,
  Users,
  Share2,
  ArrowUpRight,
  Sprout,
  TreePine,
  Wind,
  ShoppingBag,
  BadgeCheck,
  CalendarDays,
  MapPin,
  Leaf,
  HandHeart,
} from "lucide-react";
import { PageHeader, SectionCard, StatGrid, StatusPill } from "@/app/components/DashboardUI";
import {
  greenImpactLevels,
  getGreenImpactLevel,
  seedBallPacks,
  rewardPointConversions,
  dispersalGuidelines,
  upcomingCampaignEvents,
} from "@/lib/seed-ball-mission";

const coupons = [
  { code: "MONSOON20", desc: "20% off wellness retreats", expiry: "Valid till Aug 31", tone: "sage" as const },
  { code: "WEEKEND500", desc: "₹500 off weekend stays over ₹5,000", expiry: "Valid till Jul 31", tone: "primary" as const },
  { code: "FOODIE15", desc: "15% off curated food pre-bookings", expiry: "Valid till Sep 15", tone: "sage" as const },
];

// Seed balls sponsored (50/booking, per the platform's per-booking commitment) +
// purchased + donated + earned via volunteering — replaces the old cashback feed.
const seedBallHistory = [
  { label: "The Canopy Tiny House · booking", amount: "+50", date: "Jul 02" },
  { label: "Bike rental · Auroville", amount: "+10", date: "Jun 28" },
  { label: "Converted 750 reward points", amount: "+75", date: "Jun 25" },
  { label: "Referral bonus · Priya joined", amount: "+25", date: "Jun 20" },
  { label: "Donation · ₹250", amount: "+125", date: "Jun 14" },
  { label: "Weekend plantation drive", amount: "+30", date: "Jun 08" },
];

// Sponsored (via bookings) + purchased + converted from reward points = total
// seed balls, driving the tier below.
const seedBallsSponsored = 550;
const seedBallsPurchased = 340;
const rewardPointsDonated = 750; // loyalty points converted so far → 75 seed balls
const seedBallsFromPoints = 75;
const volunteerEventsJoined = 3;
const rewardPointsBalance = 1240; // points available to convert
const totalSeedBalls = seedBallsSponsored + seedBallsPurchased + seedBallsFromPoints;
const { current, next } = getGreenImpactLevel(totalSeedBalls);
const tierProgressPct = next
  ? ((totalSeedBalls - current.threshold) / (next.threshold - current.threshold)) * 100
  : 100;

export default function TravellerRewardsPage() {
  return (
    <div className="space-y-8 pb-12">
      <PageHeader
        title="My Green Impact"
        subtitle="Every seed ball you fund, buy or earn — tracked here as your contribution to India's 100 Million Seed Ball Mission."
      />

      {/* Seed ball hero */}
      <div className="bg-gradient-to-r from-sage/15 via-surface to-surface border border-sage/25 rounded-2xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-sage flex items-center gap-1.5">
              <span>{current.emoji}</span> {current.label}
            </p>
            <p className="text-4xl font-bold text-foreground mt-2 tabular-nums">
              {totalSeedBalls.toLocaleString("en-IN")} Seed Balls
            </p>
            <p className="text-sm text-muted mt-1">Funded through bookings, donations &amp; purchases</p>
          </div>
          <div className="md:w-80">
            <div className="flex justify-between text-xs text-muted mb-1.5">
              <span>{current.label}</span>
              <span>{next ? `${next.label} at ${next.threshold.toLocaleString("en-IN")}` : "Highest level reached"}</span>
            </div>
            <div className="h-2 rounded-full bg-surface-hover overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-sage to-primary"
                style={{ width: `${Math.min(100, tierProgressPct)}%` }}
              />
            </div>
            {next && (
              <p className="text-[11px] text-subtle mt-2 flex items-center gap-1">
                <Sprout size={11} className="text-sage" /> {(next.threshold - totalSeedBalls).toLocaleString("en-IN")} seed balls to {next.label}
              </p>
            )}
          </div>
        </div>

        {/* Environmental impact level badges */}
        <div className="flex items-center gap-2 mt-6 flex-wrap">
          {greenImpactLevels.map((l) => (
            <span
              key={l.key}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                l.key === current.key
                  ? "bg-sage text-white border-sage"
                  : "bg-background text-subtle border-border"
              }`}
            >
              <span>{l.emoji}</span> {l.label}
            </span>
          ))}
        </div>
      </div>

      <StatGrid
        stats={[
          { label: "Seed Balls Sponsored", value: seedBallsSponsored.toLocaleString("en-IN"), delta: "via bookings", icon: Sprout },
          { label: "Seed Balls Purchased", value: seedBallsPurchased.toLocaleString("en-IN"), delta: "2 orders", icon: ShoppingBag },
          { label: "Reward Points Donated", value: rewardPointsDonated.toLocaleString("en-IN"), delta: `${seedBallsFromPoints} seed balls created`, icon: Gift },
          { label: "Volunteer Events Joined", value: String(volunteerEventsJoined), delta: "this year", icon: Users },
          { label: "Trees Estimated to Grow", value: "241", delta: "from your seed balls", icon: TreePine },
          { label: "CO₂ Offset Estimate", value: "7.2 tons", delta: "lifetime", icon: Wind },
        ]}
      />

      <div className="grid lg:grid-cols-2 gap-6">
        <SectionCard title="Your Coupons" icon={Ticket}>
          <ul className="divide-y divide-surface-hover">
            {coupons.map((c) => (
              <li key={c.code} className="flex items-center justify-between gap-3 px-5 py-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-foreground bg-surface-hover border border-dashed border-border px-2.5 py-1 rounded-lg">
                      {c.code}
                    </span>
                    <StatusPill tone={c.tone}>{c.expiry}</StatusPill>
                  </div>
                  <p className="text-xs text-muted mt-1.5">{c.desc}</p>
                </div>
                <button
                  aria-label={`Copy ${c.code}`}
                  className="w-9 h-9 rounded-lg border border-border text-muted hover:text-foreground hover:border-border-light flex items-center justify-center transition-colors shrink-0"
                >
                  <Copy size={14} />
                </button>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Seed Ball History" icon={Sprout}>
          <ul className="divide-y divide-surface-hover">
            {seedBallHistory.map((c) => (
              <li key={c.label} className="flex items-center justify-between px-5 py-3.5">
                <div className="min-w-0">
                  <p className="text-sm text-foreground truncate">{c.label}</p>
                  <p className="text-xs text-subtle">{c.date}</p>
                </div>
                <span className="text-sm font-semibold text-sage tabular-nums">{c.amount} 🌱</span>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      {/* Convert reward points → seed balls + volunteer campaign events */}
      <div className="grid lg:grid-cols-2 gap-6">
        <SectionCard title="Convert Reward Points to Seed Balls" icon={Gift}>
          <div className="p-5">
            <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
              <p className="text-sm text-muted max-w-xs">
                Turn your loyalty points into native-species seed balls for India&apos;s forests.
              </p>
              <span className="flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/10 px-3 py-1.5 rounded-full whitespace-nowrap">
                <Gift size={12} /> {rewardPointsBalance.toLocaleString("en-IN")} points available
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {rewardPointConversions.map((c) => (
                <button
                  key={c.points}
                  className="rounded-xl border border-border bg-background p-3.5 text-center hover:border-sage/50 transition-colors"
                >
                  <p className="text-lg font-bold text-foreground tabular-nums">{c.points.toLocaleString("en-IN")}</p>
                  <p className="text-[11px] text-subtle">points</p>
                  <p className="text-xs font-semibold text-sage mt-2 flex items-center justify-center gap-1">
                    <Sprout size={11} /> {c.seedBalls} seed balls
                  </p>
                </button>
              ))}
            </div>
            <p className="text-[11px] text-subtle mt-4 flex items-center gap-1.5">
              <BadgeCheck size={12} className="text-sage shrink-0" />
              You&apos;ll receive a digital certificate for every conversion, recording your contribution to the mission.
            </p>
          </div>
        </SectionCard>

        <SectionCard title="Join the Campaign" icon={HandHeart}>
          <ul className="divide-y divide-surface-hover">
            {upcomingCampaignEvents.map((e) => (
              <li key={e.name} className="flex items-center justify-between gap-3 px-5 py-4">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{e.name}</p>
                  <p className="text-xs text-muted mt-1 flex items-center gap-3 flex-wrap">
                    <span className="flex items-center gap-1"><CalendarDays size={11} /> {e.date}</span>
                    <span className="flex items-center gap-1"><MapPin size={11} /> {e.location}</span>
                  </p>
                  <p className="text-[11px] text-subtle mt-1">
                    Meet at {e.meetingPoint} · {e.volunteers} volunteers · {e.seedBallTarget.toLocaleString("en-IN")} seed ball target
                  </p>
                </div>
                <button className="px-4 py-2 text-xs font-semibold bg-sage text-white rounded-lg hover:opacity-90 transition-opacity shrink-0">
                  Register
                </button>
              </li>
            ))}
          </ul>
          <p className="px-5 py-3 text-[11px] text-subtle border-t border-surface-hover">
            Volunteers earn badges, reward points and community recognition for every drive.
          </p>
        </SectionCard>
      </div>

      {/* Buy Seed Balls */}
      <div id="buy-seed-balls" className="scroll-mt-24">
        <SectionCard title="Buy Seed Balls" icon={ShoppingBag}>
          <div className="p-5">
            <p className="text-sm text-muted mb-4 max-w-xl">
              Order seed balls to disperse yourself on your next trip — delivered to your address, with simple
              guidelines on suitable locations, planting seasons and native species included.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {seedBallPacks.map((pack) => (
                <button
                  key={pack.count}
                  className="rounded-xl border border-border bg-background p-3.5 text-center hover:border-sage/50 transition-colors"
                >
                  <p className="text-lg font-bold text-foreground tabular-nums">{pack.count}</p>
                  <p className="text-[11px] text-subtle mb-2">Seed Balls</p>
                  <p className="text-xs font-semibold text-sage">₹{pack.price}</p>
                </button>
              ))}
            </div>

            {/* Responsible dispersal guidelines */}
            <div className="grid sm:grid-cols-2 gap-3 mt-5">
              {dispersalGuidelines.map((g) => (
                <div key={g.title} className="rounded-xl bg-background border border-border p-3.5">
                  <p className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                    <Leaf size={12} className="text-sage shrink-0" /> {g.title}
                  </p>
                  <p className="text-[11px] text-muted mt-1 leading-relaxed">{g.tip}</p>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>
      </div>

      {/* Referral */}
      <div className="bg-surface border border-border rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6">
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Share2 size={16} className="text-primary" /> Refer friends, earn ₹500 each
          </h2>
          <p className="text-sm text-muted mt-1.5 max-w-md">
            Your friend gets ₹500 off their first curated stay, you get ₹500 cashback after their first trip.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm text-foreground bg-background border border-dashed border-primary/40 px-4 py-2.5 rounded-xl">
            dhyana.in/r/ANANYA500
          </span>
          <button className="px-4 py-2.5 text-sm font-medium bg-primary text-primary-foreground rounded-xl hover:bg-primary-hover transition-colors flex items-center gap-1.5">
            Share <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import {
  X,
  Send,
  MapPin,
  AlertTriangle,
  Globe,
  Database,
  PhoneCall,
  RefreshCw,
  Check,
  Star,
  Sparkles,
  Bell,
  Bike,
  Utensils,
  CloudSun,
  Sunrise,
  ShieldAlert,
  Share2,
  LocateFixed,
  BadgeCheck,
  MessageCircle,
} from "lucide-react";
import { properties } from "@/lib/mock-data";
import { LogoMark } from "./Logo";

// ============================================
// Module 15 — AI Trip Planner / Itinerary Widget
// Floating on every page. UI-only mock: planner
// timeline with live tracking + rescheduling,
// AI assistant (web + property DB fetch), and
// end-to-end SOS assistance.
// ============================================

type Tab = "planner" | "assistant" | "sos";

interface PlanItem {
  id: number;
  min: number; // minutes from midnight
  title: string;
  sub: string;
  icon: React.ReactNode;
  status: "done" | "now" | "next" | "later";
}

interface ChatMsg {
  role: "user" | "ai";
  text: string;
  sources?: string[];
}

const fmt = (min: number) => {
  const h24 = Math.floor(min / 60) % 24;
  const m = min % 60;
  const h = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h}:${m.toString().padStart(2, "0")} ${h24 < 12 ? "AM" : "PM"}`;
};

// Synced from the traveller dashboard (Module 2) — mock
const preferences = ["Wellness", "Farm Stays", "Under ₹8,000", "Nature"];

const initialPlan: PlanItem[] = [
  { id: 1, min: 6 * 60 + 30, title: "Sunrise yoga at the stay", sub: "The Canopy Tiny House · deck", icon: <Sunrise size={15} />, status: "done" },
  { id: 2, min: 9 * 60, title: "Organic farm breakfast", sub: "Included with your stay", icon: <Utensils size={15} />, status: "done" },
  { id: 3, min: 11 * 60, title: "Matrimandir & Auroville tour", sub: "Guided · 3 km from stay", icon: <MapPin size={15} />, status: "now" },
  { id: 4, min: 16 * 60 + 30, title: "Cycle to Serenity Beach", sub: "Bike rental booked (Module 17)", icon: <Bike size={15} />, status: "next" },
  { id: 5, min: 19 * 60, title: "Sunset & candlelight dinner", sub: "Reserved · Curated Food partner", icon: <CloudSun size={15} />, status: "later" },
];

const cannedReplies: ChatMsg[] = [
  {
    role: "ai",
    text: "The pool at Stone Valley Farm Stay is open 6 AM – 8 PM. Tomorrow looks sunny (31°C), so I'd suggest a morning swim before your farm tour at 10 AM.",
    sources: ["Property database", "Live web"],
  },
  {
    role: "ai",
    text: "I found 3 curated food spots within 2 km of your stay — Tanto Pizzeria (4.7★), Marc's Café (4.6★) and Naturellement (4.5★). Want me to add one to today's plan?",
    sources: ["Live web", "Curated Food (M18)"],
  },
  {
    role: "ai",
    text: "Done — I've drafted Day 2: sunrise meditation, Sadhana Forest visit, and a pottery workshop. It fits your Wellness + Nature preferences. Review it in the Planner tab.",
    sources: ["Your preferences", "Property database"],
  },
];

export default function TripPlannerWidget() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("planner");
  const [plan, setPlan] = useState<PlanItem[]>(initialPlan);
  const [delayAlert, setDelayAlert] = useState(true);
  const [rescheduled, setRescheduled] = useState(false);
  const [input, setInput] = useState("");
  const [replyIdx, setReplyIdx] = useState(0);
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      role: "ai",
      text: "Namaste! I'm your Dhyana trip assistant. Ask me anything — your stay, places nearby, timings — I'll pull answers from the web and your property's details, and keep your whole trip on track.",
    },
  ]);

  // Preference-matched shortlist (mock scores)
  const shortlist = [
    { p: properties.find((x) => x.slug === "canopy-tiny-house")!, match: 96 },
    { p: properties.find((x) => x.slug === "stone-valley-farm-stay")!, match: 91 },
  ].filter((s) => s.p);

  const autoReschedule = () => {
    setPlan((prev) =>
      prev.map((it) => (it.min > 11 * 60 ? { ...it, min: it.min + 30 } : it))
    );
    setDelayAlert(false);
    setRescheduled(true);
  };

  const send = (text: string) => {
    const q = text.trim();
    if (!q) return;
    setMessages((prev) => [
      ...prev,
      { role: "user", text: q },
      cannedReplies[replyIdx % cannedReplies.length],
    ]);
    setReplyIdx((i) => i + 1);
    setInput("");
  };

  return (
    <>
      {/* ---------- Floating launcher (all pages, bottom-right) ---------- */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open AI Trip Planner"
        className={`fixed bottom-6 right-6 z-[60] flex items-center gap-2.5 pl-2.5 pr-4 py-2.5 rounded-full bg-surface border border-sage/40 shadow-[0_8px_32px_rgba(0,0,0,0.25)] hover:border-sage hover:-translate-y-0.5 transition-all ${
          open ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <span className="relative flex items-center justify-center w-9 h-9 rounded-full bg-background">
          <LogoMark size={26} />
          {delayAlert && (
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-terracotta animate-pulse" />
          )}
        </span>
        <span className="text-sm font-medium text-foreground">
          AI Planner
        </span>
        <Sparkles size={14} className="text-sage" />
      </button>

      {/* ---------- Mobile backdrop ---------- */}
      {open && (
        <div
          className="fixed inset-0 z-[65] bg-black/50 backdrop-blur-sm sm:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ---------- Slide-over panel ---------- */}
      <aside
        className={`fixed inset-y-0 right-0 z-[70] w-full sm:w-[400px] bg-background border-l border-border shadow-2xl flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-surface">
          <LogoMark size={34} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground leading-tight">
              Dhyana AI Planner
            </p>
            <p className="text-xs text-muted flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse" />
              Live · tracking your Auroville trip
            </p>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close planner"
            className="p-2 rounded-lg text-muted hover:text-foreground hover:bg-surface-hover transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border bg-surface">
          {(
            [
              ["planner", "Planner"],
              ["assistant", "Assistant"],
              ["sos", "SOS"],
            ] as [Tab, string][]
          ).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 ${
                tab === key
                  ? key === "sos"
                    ? "border-terracotta text-terracotta"
                    : "border-sage text-sage"
                  : "border-transparent text-subtle hover:text-muted"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ================= PLANNER TAB ================= */}
        {tab === "planner" && (
          <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">
            {/* Trip summary */}
            <div className="rounded-2xl bg-gradient-to-br from-sage/15 to-primary/10 border border-sage/25 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground">
                  Auroville Escape
                </p>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-sage bg-sage/15 px-2 py-0.5 rounded-full">
                  Day 2 of 3
                </span>
              </div>
              <p className="text-xs text-muted mt-1">
                The Canopy Tiny House · 2 guests · ends Sun
              </p>
              {/* Preferences synced from dashboard (Module 2) */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {preferences.map((p) => (
                  <span
                    key={p}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-background/60 border border-border text-muted"
                  >
                    {p}
                  </span>
                ))}
                <span className="text-[10px] px-2 py-0.5 rounded-full text-subtle flex items-center gap-1">
                  <RefreshCw size={9} /> synced from your dashboard
                </span>
              </div>
            </div>

            {/* Timing alert */}
            {delayAlert && (
              <div className="rounded-xl border border-terracotta/40 bg-terracotta/10 p-3.5 animate-fade-in">
                <div className="flex items-start gap-2.5">
                  <AlertTriangle size={16} className="text-terracotta mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-foreground">
                      You&apos;re running ~30 min behind
                    </p>
                    <p className="text-xs text-muted mt-0.5">
                      The Matrimandir tour is overrunning. Shift your beach ride
                      and dinner so nothing clashes?
                    </p>
                    <div className="flex gap-2 mt-2.5">
                      <button
                        onClick={autoReschedule}
                        className="px-3 py-1.5 text-xs font-medium rounded-lg bg-terracotta text-white hover:opacity-90 transition-opacity"
                      >
                        Auto-reschedule
                      </button>
                      <button
                        onClick={() => setDelayAlert(false)}
                        className="px-3 py-1.5 text-xs font-medium rounded-lg border border-border text-muted hover:text-foreground transition-colors"
                      >
                        Keep plan
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {rescheduled && (
              <div className="rounded-xl border border-sage/40 bg-sage/10 p-3 flex items-center gap-2 animate-fade-in">
                <Check size={14} className="text-sage shrink-0" />
                <p className="text-xs text-muted">
                  Plan updated — later stops moved by 30 min. Host and dinner
                  reservation notified.
                </p>
              </div>
            )}

            {/* Day timeline */}
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-subtle mb-3">
                Today&apos;s plan
              </p>
              <div className="space-y-1">
                {plan.map((item, i) => (
                  <div key={item.id} className="flex gap-3">
                    {/* Rail */}
                    <div className="flex flex-col items-center">
                      <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border ${
                          item.status === "done"
                            ? "bg-surface border-border text-subtle"
                            : item.status === "now"
                            ? "bg-sage text-white border-sage"
                            : "bg-surface border-border text-muted"
                        }`}
                      >
                        {item.status === "done" ? <Check size={12} /> : item.icon}
                      </span>
                      {i < plan.length - 1 && (
                        <span className="w-px flex-1 bg-border my-1" />
                      )}
                    </div>
                    {/* Content */}
                    <div className={`pb-4 flex-1 ${item.status === "done" ? "opacity-50" : ""}`}>
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-medium text-subtle tabular-nums">
                          {fmt(item.min)}
                        </p>
                        {item.status === "now" && (
                          <span className="text-[9px] font-bold uppercase tracking-wider text-sage bg-sage/15 px-1.5 py-0.5 rounded-full">
                            Now
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-foreground font-medium mt-0.5">
                        {item.title}
                      </p>
                      <p className="text-xs text-muted">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Next-up nudge */}
            <div className="rounded-xl bg-surface border border-border p-3 flex items-start gap-2.5">
              <Bell size={14} className="text-primary mt-0.5 shrink-0" />
              <p className="text-xs text-muted">
                Leave by{" "}
                <span className="text-foreground font-medium">
                  {fmt((rescheduled ? 16 * 60 + 30 + 30 : 16 * 60 + 30) - 20)}
                </span>{" "}
                to reach your bike pickup on time — 20 min away by auto.
              </p>
            </div>

            {/* Preference-matched shortlist */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-subtle">
                  Shortlisted for your next trip
                </p>
                <Sparkles size={12} className="text-sage" />
              </div>
              <div className="space-y-3">
                {shortlist.map(({ p, match }) => (
                  <div
                    key={p.id}
                    className="flex gap-3 rounded-xl bg-surface border border-border p-2.5 hover:border-sage/50 transition-colors"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img loading="lazy"
                      src={p.images[0]}
                      alt={p.name}
                      className="w-16 h-16 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {p.name}
                      </p>
                      <p className="text-xs text-muted flex items-center gap-1">
                        <MapPin size={10} /> {p.location.city} ·{" "}
                        <Star size={10} className="text-primary fill-primary" />{" "}
                        {p.rating}
                      </p>
                      <div className="flex items-center justify-between mt-1.5">
                        <span className="text-[10px] font-semibold text-sage bg-sage/15 px-1.5 py-0.5 rounded-full">
                          {match}% match
                        </span>
                        <Link
                          href={`/stays/${p.slug}`}
                          className="text-xs font-medium text-primary-foreground bg-primary px-3 py-1 rounded-full hover:bg-primary-hover transition-colors"
                        >
                          Book
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= ASSISTANT TAB ================= */}
        {tab === "assistant" && (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
              {messages.map((m, i) =>
                m.role === "user" ? (
                  <div key={i} className="flex justify-end">
                    <p className="max-w-[85%] rounded-2xl rounded-br-sm bg-primary text-primary-foreground text-sm px-4 py-2.5">
                      {m.text}
                    </p>
                  </div>
                ) : (
                  <div key={i} className="flex gap-2.5">
                    <span className="w-7 h-7 rounded-full bg-surface border border-border flex items-center justify-center shrink-0 mt-0.5">
                      <LogoMark size={18} />
                    </span>
                    <div className="max-w-[85%]">
                      <p className="rounded-2xl rounded-tl-sm bg-surface border border-border text-sm text-foreground px-4 py-2.5">
                        {m.text}
                      </p>
                      {m.sources && (
                        <div className="flex flex-wrap gap-1.5 mt-1.5">
                          {m.sources.map((s) => (
                            <span
                              key={s}
                              className="flex items-center gap-1 text-[10px] text-subtle bg-surface border border-border px-2 py-0.5 rounded-full"
                            >
                              {s.includes("web") || s.includes("Web") ? (
                                <Globe size={9} />
                              ) : (
                                <Database size={9} />
                              )}
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Quick prompts */}
            <div className="px-5 pb-2 flex gap-2 overflow-x-auto scrollbar-hide">
              {["Plan my day 3", "Food near my stay", "Is the pool open?"].map(
                (q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="shrink-0 text-xs text-muted border border-border rounded-full px-3 py-1.5 hover:text-foreground hover:border-sage/50 transition-colors"
                  >
                    {q}
                  </button>
                )
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="p-4 border-t border-border bg-surface flex items-center gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about your stay, places, timings…"
                className="flex-1 bg-background border border-border rounded-full px-4 py-2.5 text-sm text-foreground placeholder-subtle focus:border-sage outline-none"
              />
              <button
                type="submit"
                aria-label="Send"
                className="w-10 h-10 rounded-full bg-sage text-white flex items-center justify-center hover:opacity-90 transition-opacity shrink-0"
              >
                <Send size={16} />
              </button>
            </form>
          </>
        )}

        {/* ================= SOS TAB ================= */}
        {tab === "sos" && (
          <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
            <div className="text-center">
              <button className="relative w-28 h-28 rounded-full bg-terracotta text-white font-bold text-xl tracking-widest shadow-[0_0_40px_rgba(192,90,60,0.4)] hover:scale-105 transition-transform">
                <span className="absolute inset-0 rounded-full bg-terracotta animate-ping opacity-20" />
                SOS
              </button>
              <p className="text-xs text-muted mt-3 max-w-[260px] mx-auto">
                Tap to alert your host and Dhyana support instantly — your live
                location is shared over web and SMS.
              </p>
            </div>

            {/* Host contact */}
            <div className="rounded-xl bg-surface border border-border p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-subtle mb-3">
                Your host — The Canopy Tiny House
              </p>
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy"
                  src={properties[0].host.avatar}
                  alt={properties[0].host.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground flex items-center gap-1">
                    {properties[0].host.name}
                    <BadgeCheck size={13} className="text-sage" />
                  </p>
                  <p className="text-xs text-muted">
                    Responds {properties[0].host.responseTime}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    aria-label="Call host"
                    className="w-9 h-9 rounded-full bg-sage/15 text-sage flex items-center justify-center hover:bg-sage hover:text-white transition-colors"
                  >
                    <PhoneCall size={15} />
                  </button>
                  <button
                    aria-label="Message host"
                    className="w-9 h-9 rounded-full bg-sage/15 text-sage flex items-center justify-center hover:bg-sage hover:text-white transition-colors"
                  >
                    <MessageCircle size={15} />
                  </button>
                </div>
              </div>
            </div>

            {/* Dhyana support */}
            <div className="rounded-xl bg-surface border border-border p-4 flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0">
                <ShieldAlert size={18} />
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  Dhyana 24×7 Support
                </p>
                <p className="text-xs text-muted">1800-369-DHYANA · always on</p>
              </div>
              <button className="px-3.5 py-2 text-xs font-medium rounded-full bg-primary text-primary-foreground hover:bg-primary-hover transition-colors">
                Call now
              </button>
            </div>

            {/* Emergency numbers */}
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-subtle mb-2.5">
                Local emergency — Tamil Nadu
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  ["Police", "100"],
                  ["Ambulance", "108"],
                  ["Fire", "101"],
                  ["Tourist Helpline", "1363"],
                ].map(([label, num]) => (
                  <button
                    key={label}
                    className="rounded-lg border border-border bg-surface px-3 py-2.5 text-left hover:border-terracotta/50 transition-colors"
                  >
                    <p className="text-xs text-muted">{label}</p>
                    <p className="text-sm font-semibold text-foreground tabular-nums">
                      {num}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <button className="w-full flex items-center justify-center gap-2 rounded-xl border border-border bg-surface py-3 text-sm text-foreground hover:border-sage/50 transition-colors">
              <Share2 size={15} className="text-sage" />
              Share live location with host
            </button>
            <p className="text-[11px] text-subtle flex items-center gap-1.5 justify-center pb-2">
              <LocateFixed size={11} className="text-sage" />
              Location tracking on — connected to host &amp; support end-to-end
            </p>
          </div>
        )}
      </aside>
    </>
  );
}

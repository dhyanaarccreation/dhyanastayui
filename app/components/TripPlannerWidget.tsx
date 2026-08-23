"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
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
  BellOff,
  Bike,
  Utensils,
  CloudSun,
  Sunrise,
  ShieldAlert,
  Share2,
  LocateFixed,
  BadgeCheck,
  MessageCircle,
  Mic,
  MicOff,
  Volume2,
  Navigation,
  SkipForward,
  Loader2,
  ChevronDown,
  Route,
  Map as MapIcon,
  Sunset,
  CalendarClock,
  CloudRain,
  LogOut,
  Ticket,
  Timer,
  CheckCircle2,
  Clock,
  Ban,
  Eye,
  CalendarCheck,
  type LucideIcon,
} from "lucide-react";
import { properties } from "@/lib/mock-data";
import { LogoMark } from "./Logo";

// ============================================
// Module 15 — AI Trip Planner / Itinerary Widget
// Floating on every page. UI-only mock: planner
// timeline with live tracking + rescheduling +
// Advanced mode, AI assistant with voice input/
// output (Web Speech API), a global notification
// kill switch, and end-to-end SOS assistance.
// ============================================

type Tab = "planner" | "assistant" | "sos";

type BookingStatusKind = "Confirmed" | "Pending" | "Not Required";
type ActivityBadge = "upcoming" | "ongoing" | "completed" | "skipped" | "cancelled" | "arrived";

interface PlanItem {
  id: number;
  min: number; // minutes from midnight
  title: string;
  sub: string;
  icon: React.ReactNode;
  status: "done" | "now" | "next" | "later";
  // ---- Expanded activity details (UI-only additions) ----
  endMin: number;
  location: string;
  travelTimeMin: number;
  distanceKm: number;
  estCost: number;
  bookingStatus: BookingStatusKind;
  eta: string;
  routeDetails: string;
}

interface ChatMsg {
  role: "user" | "ai";
  text: string;
  sources?: string[];
}

// Minimal ambient typing for the Web Speech API — not in default TS lib.
interface SpeechRecognitionResultLike {
  transcript: string;
}
interface SpeechRecognitionEventLike {
  results: { [index: number]: { [index: number]: SpeechRecognitionResultLike } };
}
interface SpeechRecognitionLike {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((e: SpeechRecognitionEventLike) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  start: () => void;
  stop: () => void;
}

type SpeechRecognitionWindow = Window & {
  SpeechRecognition?: new () => SpeechRecognitionLike;
  webkitSpeechRecognition?: new () => SpeechRecognitionLike;
};

function getSpeechRecognitionCtor(): (new () => SpeechRecognitionLike) | undefined {
  if (typeof window === "undefined") return undefined;
  const w = window as SpeechRecognitionWindow;
  return w.SpeechRecognition ?? w.webkitSpeechRecognition;
}

// No external event to subscribe to — browser capability is static for the session.
const noopSubscribe = () => () => {};

const fmt = (min: number) => {
  const h24 = Math.floor(min / 60) % 24;
  const m = min % 60;
  const h = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h}:${m.toString().padStart(2, "0")} ${h24 < 12 ? "AM" : "PM"}`;
};

// ---------- Mock QR code — deterministic pseudo-random pattern with real
// QR-style finder squares, seeded per booking id. Visual only, encodes no
// data (there's no real ticketing backend behind this UI yet). ----------
function MockQRCode({ seed, size = 44 }: { seed: number; size?: number }) {
  const grid = 7;
  const cell = size / grid;
  const isFinder = (r: number, c: number) =>
    (r < 3 && c < 3) || (r < 3 && c >= grid - 3) || (r >= grid - 3 && c < 3);
  const isFinderRing = (r: number, c: number) => {
    const inTL = r < 3 && c < 3;
    const inTR = r < 3 && c >= grid - 3;
    const lr = inTL || inTR ? r : r - (grid - 3);
    const lc = inTL ? c : inTR ? c - (grid - 3) : c;
    return lr === 1 && lc === 1;
  };
  const cells = Array.from({ length: grid * grid }, (_, i) => {
    const n = Math.sin(seed * 12.9898 + i * 78.233) * 43758.5453;
    return n - Math.floor(n) > 0.5;
  });
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0" aria-hidden="true">
      <rect width={size} height={size} fill="white" rx={4} />
      {Array.from({ length: grid }).map((_, r) =>
        Array.from({ length: grid }).map((__, c) => {
          const finder = isFinder(r, c);
          const filled = finder ? !isFinderRing(r, c) : cells[r * grid + c];
          if (!filled) return null;
          return <rect key={`${r}-${c}`} x={c * cell} y={r * cell} width={cell} height={cell} fill="#1f2a1f" />;
        })
      )}
    </svg>
  );
}

// Synced from the traveller dashboard (Module 2) — mock
const preferences = ["Wellness", "Farm Stays", "Under ₹8,000", "Nature"];

// ---------- Resizable panel width (drag the left edge) ----------
const PANEL_MIN_WIDTH = 360;
const PANEL_MAX_WIDTH = 700;
const PANEL_DEFAULT_WIDTH = 400; // unchanged from the original fixed sm:w-[400px]
const PANEL_WIDTH_STORAGE_KEY = "dhyana-ai-planner-width";

const initialPlan: PlanItem[] = [
  {
    id: 1, min: 6 * 60 + 30, title: "Sunrise yoga at the stay", sub: "The Canopy Tiny House · deck", icon: <Sunrise size={15} />, status: "done",
    endMin: 6 * 60 + 60, location: "The Canopy Tiny House", travelTimeMin: 0, distanceKm: 0, estCost: 0,
    bookingStatus: "Not Required", eta: "On-site", routeDetails: "At your stay — no travel required.",
  },
  {
    id: 2, min: 9 * 60, title: "Organic farm breakfast", sub: "Included with your stay", icon: <Utensils size={15} />, status: "done",
    endMin: 9 * 60 + 45, location: "The Canopy Tiny House", travelTimeMin: 0, distanceKm: 0, estCost: 0,
    bookingStatus: "Confirmed", eta: "On-site", routeDetails: "At your stay — included with your booking.",
  },
  {
    id: 3, min: 11 * 60, title: "Matrimandir & Auroville tour", sub: "Guided · 3 km from stay", icon: <MapPin size={15} />, status: "now",
    endMin: 11 * 60 + 150, location: "Matrimandir, Auroville", travelTimeMin: 12, distanceKm: 3, estCost: 600,
    bookingStatus: "Confirmed", eta: "11:12 AM", routeDetails: "Auto from stay → Matrimandir viewpoint → Auroville township loop.",
  },
  {
    id: 4, min: 16 * 60 + 30, title: "Cycle to Serenity Beach", sub: "Bike rental booked (Module 17)", icon: <Bike size={15} />, status: "next",
    endMin: 16 * 60 + 30 + 90, location: "Serenity Beach", travelTimeMin: 20, distanceKm: 6.2, estCost: 0,
    bookingStatus: "Confirmed", eta: "4:52 PM", routeDetails: "Cycle route via ECR service road, mostly shaded.",
  },
  {
    id: 5, min: 19 * 60, title: "Sunset & candlelight dinner", sub: "Reserved · Curated Food partner", icon: <CloudSun size={15} />, status: "later",
    endMin: 19 * 60 + 90, location: "Naturellement, Auroville", travelTimeMin: 15, distanceKm: 2.4, estCost: 1400,
    bookingStatus: "Pending", eta: "7:15 PM", routeDetails: "Auto from beach → Naturellement restaurant, coastal road.",
  },
];

// ---------- Notification Center (mock) ----------
interface PlannerNotification {
  id: number;
  icon: React.ReactNode;
  title: string;
  message: string;
  priority: "high" | "medium" | "low";
  timestamp: string;
}

const initialNotifications: PlannerNotification[] = [
  { id: 1, icon: <Navigation size={14} />, title: "Leave for next destination", message: "Leave by 4:10 PM to reach Serenity Beach on time.", priority: "high", timestamp: "2 min ago" },
  { id: 2, icon: <CalendarCheck size={14} />, title: "Booking starts in 30 minutes", message: "Matrimandir & Auroville tour begins at 11:00 AM.", priority: "high", timestamp: "5 min ago" },
  { id: 3, icon: <Utensils size={14} />, title: "Restaurant reminder", message: "Naturellement has your table reserved for 7:15 PM.", priority: "medium", timestamp: "12 min ago" },
  { id: 4, icon: <Sparkles size={14} />, title: "Workshop reminder", message: "Pottery workshop slot opens tomorrow at 10 AM — reserve soon.", priority: "low", timestamp: "20 min ago" },
  { id: 5, icon: <CalendarClock size={14} />, title: "Event reminder", message: "Sadhana Forest community walk starts in 2 hours.", priority: "medium", timestamp: "25 min ago" },
  { id: 6, icon: <CloudRain size={14} />, title: "Weather warning", message: "Light showers expected near Auroville after 6 PM.", priority: "medium", timestamp: "34 min ago" },
  { id: 7, icon: <AlertTriangle size={14} />, title: "Heavy traffic warning", message: "ECR route is congested — add 10–15 min to your travel time.", priority: "high", timestamp: "40 min ago" },
  { id: 8, icon: <Sunset size={14} />, title: "Sunset reminder", message: "Sunset at 6:34 PM — leave for the beach by 6:00 PM for the best view.", priority: "low", timestamp: "48 min ago" },
  { id: 9, icon: <MapPin size={14} />, title: "Check-in reminder", message: "Check-in at The Canopy Tiny House closes at 9 PM.", priority: "low", timestamp: "1 hr ago" },
  { id: 10, icon: <LogOut size={14} />, title: "Check-out reminder", message: "Check-out is at 11 AM on Sunday — housekeeping will confirm the night before.", priority: "low", timestamp: "1 hr ago" },
];

const NOTIFICATION_PRIORITY_STYLE: Record<PlannerNotification["priority"], string> = {
  high: "text-terracotta bg-terracotta/10",
  medium: "text-primary bg-primary/10",
  low: "text-sage bg-sage/10",
};

// ---------- Live tracking (mock) ----------
const liveTrackingInfo = {
  currentLocation: "Near Matrimandir, Auroville",
  nextDestination: "Serenity Beach",
  eta: "4:52 PM",
  remainingDistance: "6.2 km",
  travelTime: "20 min",
  lastUpdated: "Just now",
};

const STATUS_BADGE: Record<ActivityBadge, { label: string; className: string }> = {
  upcoming: { label: "Upcoming", className: "text-muted bg-surface-hover border border-border" },
  ongoing: { label: "Ongoing", className: "text-sage bg-sage/15" },
  completed: { label: "Completed", className: "text-subtle bg-surface-hover border border-border" },
  skipped: { label: "Skipped", className: "text-primary bg-primary/10" },
  cancelled: { label: "Cancelled", className: "text-terracotta bg-terracotta/10" },
  arrived: { label: "✓ Arrived", className: "text-sage bg-sage/15" },
};

const BOOKING_BADGE: Record<BookingStatusKind, string> = {
  Confirmed: "text-sage bg-sage/10",
  Pending: "text-primary bg-primary/10",
  "Not Required": "text-subtle bg-surface-hover border border-border",
};

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

export default function TripPlannerWidget({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
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

  // ---------- Resizable panel width ----------
  const [panelWidth, setPanelWidth] = useState(PANEL_DEFAULT_WIDTH);
  const [isResizing, setIsResizing] = useState(false);
  const asideRef = useRef<HTMLElement>(null);
  const panelWidthRef = useRef(PANEL_DEFAULT_WIDTH);

  // Restore a previously resized width for this session, clamped to the
  // current viewport so the panel can never overflow on load.
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(PANEL_WIDTH_STORAGE_KEY);
      if (!stored) return;
      const parsed = Number(stored);
      if (Number.isNaN(parsed)) return;
      const maxAllowed = Math.min(PANEL_MAX_WIDTH, window.innerWidth);
      const clamped = Math.min(maxAllowed, Math.max(PANEL_MIN_WIDTH, parsed));
      panelWidthRef.current = clamped;
      // One-time restore of a persisted, client-only value — required to avoid
      // an SSR/hydration width mismatch (localStorage isn't available server-side).
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPanelWidth(clamped);
    } catch {
      // localStorage unavailable (e.g. private browsing) — keep default width.
    }
  }, []);

  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = panelWidthRef.current;
    setIsResizing(true);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const maxAllowed = Math.min(PANEL_MAX_WIDTH, window.innerWidth);
      const dx = startX - moveEvent.clientX; // dragging left (toward screen edge) grows the panel
      const nextWidth = Math.min(maxAllowed, Math.max(PANEL_MIN_WIDTH, startWidth + dx));
      panelWidthRef.current = nextWidth;
      // Mutate the CSS var directly during drag (bypassing React state) so
      // resizing stays at 60fps instead of re-rendering on every pixel.
      asideRef.current?.style.setProperty("--planner-width", `${nextWidth}px`);
    };

    const stopResizing = () => {
      setIsResizing(false);
      setPanelWidth(panelWidthRef.current);
      try {
        window.localStorage.setItem(PANEL_WIDTH_STORAGE_KEY, String(panelWidthRef.current));
      } catch {
        // localStorage unavailable — width just won't persist this session.
      }
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", stopResizing);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", stopResizing);
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  // ---------- Notification kill switch ----------
  const [notificationsOn, setNotificationsOn] = useState(true);
  const [notifPanelOpen, setNotifPanelOpen] = useState(false);


  // ---------- Expanded activity cards & UI-only per-activity actions ----------
  // Additive local UI state only — none of this touches `plan`, `markDone`,
  // or `skipItem`, so the existing timeline data/logic is untouched.
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());
  const [activityBadgeOverrides, setActivityBadgeOverrides] = useState<Record<number, ActivityBadge>>({});
  const [bookingOverrides, setBookingOverrides] = useState<Record<number, BookingStatusKind>>({});
  const [sharedId, setSharedId] = useState<number | null>(null);

  const toggleExpand = (id: number) =>
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });

  const setQuickBadge = (id: number, badge: ActivityBadge) =>
    setActivityBadgeOverrides((prev) => ({ ...prev, [id]: badge }));

  const confirmBooking = (id: number) =>
    setBookingOverrides((prev) => ({ ...prev, [id]: "Confirmed" }));

  // ---------- Dynamic Re-scheduling UI (UI-only; never writes back to `plan`) ----------
  const [lateModalItem, setLateModalItem] = useState<PlanItem | null>(null);
  const [skipModalItem, setSkipModalItem] = useState<PlanItem | null>(null);
  const [cancelModalItem, setCancelModalItem] = useState<PlanItem | null>(null);
  const [plannerPreview, setPlannerPreview] = useState<{
    kind: "late" | "skip";
    activityTitle: string;
    timeSaved: string;
    newArrivalTime: string;
    shiftedCount: number;
    alternativeSuggested: string;
  } | null>(null);
  const notificationIdRef = useRef(1000);

  const pushNotification = (title: string, message: string) => {
    const id = notificationIdRef.current++;
    setNotifications((prev) => [
      { id, icon: <Check size={14} />, title, message, priority: "low", timestamp: "Just now" },
      ...prev,
    ]);
  };

  // Mock before → after rows for the Running Late preview — purely display,
  // computed from the real plan's titles/times but never written back.
  const getLatePreviewRows = (item: PlanItem) => {
    const idx = plan.findIndex((p) => p.id === item.id);
    return plan.slice(idx, idx + 3).map((p, i) => ({
      title: p.title,
      before: fmt(p.min),
      after: fmt(p.min + Math.max(40 - i * 5, 20)),
    }));
  };

  const confirmRunningLate = (item: PlanItem) => {
    const rows = getLatePreviewRows(item);
    const lastRow = rows[rows.length - 1];
    setPlannerPreview({
      kind: "late",
      activityTitle: item.title,
      timeSaved: "12 min",
      newArrivalTime: lastRow ? lastRow.after : fmt(item.min + 40),
      shiftedCount: rows.length,
      alternativeSuggested: "Naturellement (4.5★, 1.2 km)",
    });
    setLateModalItem(null);
  };

  const confirmSkip = (item: PlanItem) => {
    setQuickBadge(item.id, "skipped");
    const idx = plan.findIndex((p) => p.id === item.id);
    const remaining = plan.slice(idx + 1);
    setPlannerPreview({
      kind: "skip",
      activityTitle: item.title,
      timeSaved: `${item.travelTimeMin + 30} min`,
      newArrivalTime: remaining[0] ? fmt(Math.max(remaining[0].min - 30, item.min)) : fmt(item.min),
      shiftedCount: remaining.length,
      alternativeSuggested: "Sadhana Forest community walk (4.6★, nearby)",
    });
    setSkipModalItem(null);
  };

  const confirmCancelVisit = (item: PlanItem) => {
    setQuickBadge(item.id, "cancelled");
    pushNotification("Visit Cancelled", `${item.title} has been cancelled.`);
    setCancelModalItem(null);
  };

  const applyPlannerPreview = () => {
    if (!plannerPreview) return;
    if (plannerPreview.kind === "late") {
      pushNotification("Itinerary Updated", `Rest of the day re-optimized around ${plannerPreview.activityTitle}.`);
      pushNotification("Restaurant Shifted", `Dinner moved to ${plannerPreview.newArrivalTime}.`);
    } else {
      pushNotification("Itinerary Updated", `${plannerPreview.activityTitle} skipped — remaining stops recalculated.`);
      pushNotification("Traffic Avoided", "Alternative route applied to save travel time.");
    }
    setPlannerPreview(null);
  };

  const shareActivity = async (item: PlanItem) => {
    const text = `${item.title} — ${fmt(item.min)} at ${item.location}`;
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title: item.title, text });
      } else if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(text);
      }
    } catch {
      // User cancelled the share sheet, or the API is unavailable — no-op.
    }
    setSharedId(item.id);
    window.setTimeout(() => setSharedId((cur) => (cur === item.id ? null : cur)), 1800);
  };

  const getBadge = (item: PlanItem): ActivityBadge =>
    activityBadgeOverrides[item.id] ??
    (item.status === "done" ? "completed" : item.status === "now" ? "ongoing" : "upcoming");

  // ---------- Notification Center (UI-only; independent of the mute switch) ----------
  const [notifications, setNotifications] = useState<PlannerNotification[]>(initialNotifications);
  const dismissNotification = (id: number) =>
    setNotifications((prev) => prev.filter((n) => n.id !== id));

  // ---------- Quick Actions bar (UI-only busy/done feedback) ----------
  const [quickActionBusy, setQuickActionBusy] = useState<string | null>(null);
  const [quickActionDone, setQuickActionDone] = useState<string | null>(null);
  const runQuickAction = (key: string, label: string) => {
    setQuickActionBusy(key);
    setQuickActionDone(null);
    window.setTimeout(() => {
      setQuickActionBusy(null);
      setQuickActionDone(label);
      window.setTimeout(() => setQuickActionDone((cur) => (cur === label ? null : cur)), 2200);
    }, 900);
  };

  // ---------- Route/Map & Bookings modals (UI-only) ----------
  const [routeModalOpen, setRouteModalOpen] = useState(false);
  const [bookingsModalOpen, setBookingsModalOpen] = useState(false);

  // ---------- Voice assistance (Assistant tab) ----------
  // useSyncExternalStore reads browser capability without an effect+setState
  // round-trip — snapshot matches SSR (false) until hydrated on the client.
  const voiceInputSupported = useSyncExternalStore(
    noopSubscribe,
    () => Boolean(getSpeechRecognitionCtor()),
    () => false
  );
  const voiceOutputSupported = useSyncExternalStore(
    noopSubscribe,
    () => typeof window !== "undefined" && "speechSynthesis" in window,
    () => false
  );
  const [listening, setListening] = useState(false);
  const [speakingIdx, setSpeakingIdx] = useState<number | null>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  useEffect(() => {
    const SR = getSpeechRecognitionCtor();
    if (SR && !recognitionRef.current) {
      const rec = new SR();
      rec.lang = "en-IN";
      rec.interimResults = false;
      rec.continuous = false;
      recognitionRef.current = rec;
    }
  }, []);

  const startListening = () => {
    const rec = recognitionRef.current;
    if (!rec) return;
    rec.onresult = (e: SpeechRecognitionEventLike) => {
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
      setListening(false);
      send(transcript);
    };
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    setListening(true);
    rec.start();
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

  const speak = (text: string, idx: number) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    if (speakingIdx === idx) {
      window.speechSynthesis.cancel();
      setSpeakingIdx(null);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-IN";
    utterance.rate = 1;
    utterance.onend = () => setSpeakingIdx(null);
    utterance.onerror = () => setSpeakingIdx(null);
    setSpeakingIdx(idx);
    window.speechSynthesis.speak(utterance);
  };

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

  const markDone = (id: number) =>
    setPlan((prev) => prev.map((it) => (it.id === id ? { ...it, status: "done" } : it)));

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

  const mutedNotice = !notificationsOn && (delayAlert || (plan.some((p) => p.status !== "done")));

  const panelStyle = { "--planner-width": `${panelWidth}px` } as React.CSSProperties;

  // ---------- Derived stats for the header & Live Tracking (real, from existing `plan` state) ----------
  const completedCount = plan.filter((p) => p.status === "done").length;
  const completionPct = plan.length ? Math.round((completedCount / plan.length) * 100) : 0;

  // ---------- Mock live-tracking map geometry (Zomato-style dashed route + moving
  // location dot) — zigzag points generated from `plan`, no real map tiles/API. ----------
  const MAP_WIDTH = 300;
  const MAP_HEIGHT = 150;
  const routePoints = plan.map((_, i) => ({
    x: plan.length > 1 ? (i / (plan.length - 1)) * (MAP_WIDTH - 60) + 30 : MAP_WIDTH / 2,
    y: i % 2 === 0 ? MAP_HEIGHT - 35 : 40,
  }));
  const routePathD = routePoints.length
    ? `M ${routePoints.map((p) => `${p.x} ${p.y}`).join(" L ")}`
    : "";
  const nowIdx = plan.findIndex((p) => p.status === "now");
  const liveMarker =
    nowIdx >= 0 && nowIdx < routePoints.length - 1
      ? {
          x: routePoints[nowIdx].x + (routePoints[nowIdx + 1].x - routePoints[nowIdx].x) * 0.5,
          y: routePoints[nowIdx].y + (routePoints[nowIdx + 1].y - routePoints[nowIdx].y) * 0.5,
        }
      : nowIdx >= 0
      ? routePoints[nowIdx]
      : null;

  return (
    <>
      {/* ---------- Mobile backdrop ---------- */}
      {open && (
        <div
          className="fixed inset-0 z-[82] bg-black/50 backdrop-blur-sm sm:hidden"
          onClick={onClose}
        />
      )}

      {/* ---------- Slide-over panel ---------- */}
      <aside
        ref={asideRef}
        style={panelStyle}
        className={`fixed inset-y-0 right-0 z-[85] w-full sm:w-[var(--planner-width)] bg-background border-l border-border shadow-2xl flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
      >
        {/* Resize handle — desktop only; drag to resize the planner's width */}
        <div
          onMouseDown={handleResizeStart}
          role="separator"
          aria-orientation="vertical"
          aria-label="Resize AI planner panel"
          className="hidden sm:block absolute -left-1 top-0 bottom-0 w-2 cursor-col-resize z-10 group"
        >
          <div
            className={`absolute inset-y-0 left-1/2 -translate-x-1/2 w-px transition-colors duration-200 ${
              isResizing ? "bg-sage/50" : "bg-transparent group-hover:bg-sage/40"
            }`}
          />
        </div>

        {/* Header */}
        <div className="border-b border-border bg-surface">
          <div className="flex items-center gap-3 px-5 py-4">
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
            <div className="relative">
              <button
                onClick={() => setNotifPanelOpen((v) => !v)}
                aria-label="Notifications"
                aria-expanded={notifPanelOpen}
                className="relative p-2 rounded-lg text-muted hover:text-foreground hover:bg-surface-hover transition-colors"
              >
                <Bell size={17} />
                {notifications.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 rounded-full bg-terracotta text-white text-[9px] font-bold flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </button>

              {notifPanelOpen && (
                <>
                  <div className="fixed inset-0 z-[89]" onClick={() => setNotifPanelOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 w-[320px] max-h-[70vh] overflow-y-auto rounded-2xl bg-background border border-border shadow-2xl z-[90] animate-fade-in">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-border sticky top-0 bg-background">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-subtle">Notification center</p>
                        <p className="text-[10px] text-subtle mt-0.5">{notifications.length} active</p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setNotificationsOn((v) => !v)}
                          aria-label={notificationsOn ? "Mute notifications" : "Unmute notifications"}
                          title={notificationsOn ? "Notifications on — tap to mute" : "Notifications muted — tap to unmute"}
                          className={`p-1.5 rounded-lg transition-colors ${
                            notificationsOn ? "text-muted hover:text-foreground hover:bg-surface-hover" : "text-terracotta bg-terracotta/10"
                          }`}
                        >
                          {notificationsOn ? <Bell size={14} /> : <BellOff size={14} />}
                        </button>
                        <button
                          onClick={() => setNotifPanelOpen(false)}
                          aria-label="Close notifications"
                          className="p-1.5 rounded-lg text-muted hover:text-foreground hover:bg-surface-hover transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                    <div className="p-3">
                      {notifications.length === 0 ? (
                        <p className="text-xs text-subtle text-center py-6">You&apos;re all caught up.</p>
                      ) : (
                        <div className="space-y-2">
                          {notifications.map((n) => (
                            <div
                              key={n.id}
                              className="flex items-start gap-2.5 rounded-xl bg-surface border border-border p-2.5"
                            >
                              <span className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${NOTIFICATION_PRIORITY_STYLE[n.priority]}`}>
                                {n.icon}
                              </span>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2">
                                  <p className="text-xs font-medium text-foreground truncate">{n.title}</p>
                                  <span className="text-[9px] text-subtle shrink-0">{n.timestamp}</span>
                                </div>
                                <p className="text-[11px] text-muted mt-0.5">{n.message}</p>
                              </div>
                              <button
                                onClick={() => dismissNotification(n.id)}
                                aria-label={`Dismiss: ${n.title}`}
                                className="shrink-0 p-1 rounded-full text-subtle hover:text-foreground hover:bg-surface-hover transition-colors"
                              >
                                <X size={12} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
            <button
              onClick={onClose}
              aria-label="Close planner"
              className="p-2 rounded-lg text-muted hover:text-foreground hover:bg-surface-hover transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Quick Actions bar */}
        <div className="flex items-center gap-2 px-5 py-2.5 border-b border-border bg-surface/60 overflow-x-auto scrollbar-hide">
          {(
            [
              ["refresh", "Refresh Plan", RefreshCw],
              ["optimize", "Optimize Again", Sparkles],
              ["reschedule", "Reschedule Day", CalendarClock],
              ["add", "Add Activity", MapPin],
              ["book", "Book Remaining", Ticket],
              ["map", "View Map", MapIcon],
            ] as [string, string, typeof RefreshCw][]
          ).map(([key, label, Icon]) => (
            <button
              key={key}
              onClick={() =>
                key === "map" ? setRouteModalOpen(true) : key === "book" ? setBookingsModalOpen(true) : runQuickAction(key, `${label.replace(/ .*/, "")} updated`)
              }
              disabled={quickActionBusy === key}
              className="shrink-0 flex items-center gap-1.5 text-[11px] font-medium text-muted border border-border rounded-full px-3 py-1.5 hover:text-foreground hover:border-sage/50 transition-colors disabled:opacity-60"
            >
              {quickActionBusy === key ? (
                <Loader2 size={11} className="animate-spin" />
              ) : (
                <Icon size={11} />
              )}
              {label}
            </button>
          ))}
        </div>
        {quickActionDone && (
          <p className="px-5 py-1.5 text-[11px] text-sage bg-sage/10 flex items-center gap-1.5 animate-fade-in">
            <Check size={11} /> {quickActionDone}
          </p>
        )}

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

            {/* Live Tracking */}
            <div className="rounded-2xl bg-surface border border-border p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-subtle flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse" /> Live tracking
                </p>
                <span className="text-[10px] text-subtle">{liveTrackingInfo.lastUpdated}</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  <LocateFixed size={12} className="text-sage shrink-0" />
                  <span className="text-muted">Current:</span>
                  <span className="text-foreground font-medium truncate">{liveTrackingInfo.currentLocation}</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Navigation size={12} className="text-primary shrink-0" />
                  <span className="text-muted">Next:</span>
                  <span className="text-foreground font-medium truncate">{liveTrackingInfo.nextDestination}</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2.5 mt-3">
                {[
                  ["ETA", liveTrackingInfo.eta],
                  ["Remaining", liveTrackingInfo.remainingDistance],
                  ["Travel time", liveTrackingInfo.travelTime],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl bg-background border border-border p-2">
                    <p className="text-[9px] uppercase tracking-wider text-subtle">{label}</p>
                    <p className="text-xs font-semibold text-foreground mt-0.5">{value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-3">
                <div className="flex items-center justify-between text-[10px] text-subtle mb-1">
                  <span>Daily progress</span>
                  <span className="text-foreground font-medium">{completionPct}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-surface-hover overflow-hidden">
                  <div className="h-full rounded-full bg-sage" style={{ width: `${completionPct}%` }} />
                </div>
              </div>
            </div>

            {/* Notification muted micro-affordance */}
            {mutedNotice && (
              <button
                onClick={() => setNotificationsOn(true)}
                className="w-full flex items-center gap-2 rounded-xl border border-border bg-surface px-3.5 py-2.5 text-left hover:border-terracotta/40 transition-colors"
              >
                <BellOff size={13} className="text-terracotta shrink-0" />
                <span className="text-xs text-muted flex-1">Notifications muted — tap to turn back on</span>
              </button>
            )}

            {/* Timing alert */}
            {delayAlert && notificationsOn && (
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
            {rescheduled && notificationsOn && (
              <div className="rounded-xl border border-sage/40 bg-sage/10 p-3 flex items-center gap-2 animate-fade-in">
                <Check size={14} className="text-sage shrink-0" />
                <p className="text-xs text-muted">
                  Plan updated — later stops moved by 30 min. Host and dinner
                  reservation notified.
                </p>
              </div>
            )}

            {/* Planner Preview — shown after confirming Running Late / Skip & Recalculate */}
            {plannerPreview && (
              <div className="rounded-2xl border border-sage/40 bg-sage/10 p-4 animate-fade-in">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-sage mb-3">
                  Updated Itinerary Preview
                </p>
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="rounded-xl bg-background border border-border p-2.5">
                    <p className="text-[9px] uppercase tracking-wider text-subtle">Time Saved</p>
                    <p className="text-sm font-semibold text-foreground mt-1">{plannerPreview.timeSaved}</p>
                  </div>
                  <div className="rounded-xl bg-background border border-border p-2.5">
                    <p className="text-[9px] uppercase tracking-wider text-subtle">New Arrival Time</p>
                    <p className="text-sm font-semibold text-foreground mt-1">{plannerPreview.newArrivalTime}</p>
                  </div>
                  <div className="rounded-xl bg-background border border-border p-2.5">
                    <p className="text-[9px] uppercase tracking-wider text-subtle">Activities Shifted</p>
                    <p className="text-sm font-semibold text-foreground mt-1">{plannerPreview.shiftedCount}</p>
                  </div>
                  <div className="rounded-xl bg-background border border-border p-2.5">
                    <p className="text-[9px] uppercase tracking-wider text-subtle">Alternative Suggested</p>
                    <p className="text-xs font-semibold text-foreground mt-1">{plannerPreview.alternativeSuggested}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => setPlannerPreview(null)}
                    className="flex-1 px-3 py-2 text-xs font-medium rounded-lg border border-border text-muted hover:text-foreground transition-colors"
                  >
                    Discard Changes
                  </button>
                  <button
                    onClick={applyPlannerPreview}
                    className="flex-1 px-3 py-2 text-xs font-medium rounded-lg bg-sage text-white hover:opacity-90 transition-opacity"
                  >
                    Apply Changes
                  </button>
                </div>
              </div>
            )}

            {/* Day timeline */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-subtle">
                  Today&apos;s plan
                </p>
              </div>
              <div className="space-y-1">
                {plan.map((item, i) => {
                  const badge = getBadge(item);
                  const isExpanded = expandedIds.has(item.id);
                  const booking = bookingOverrides[item.id] ?? item.bookingStatus;
                  const nextItem = plan[i + 1];
                  return (
                    <div key={item.id} className="flex gap-3">
                      {/* Rail — location icon, status indicator, connector line */}
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
                      <div className={`pb-4 flex-1 min-w-0 ${item.status === "done" ? "opacity-50" : ""}`}>
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-xs font-medium text-subtle tabular-nums">
                            {fmt(item.min)}
                          </p>
                          {item.status === "now" && (
                            <span className="text-[9px] font-bold uppercase tracking-wider text-sage bg-sage/15 px-1.5 py-0.5 rounded-full">
                              Now
                            </span>
                          )}
                          {/* Status badge */}
                          <span className={`text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full ${STATUS_BADGE[badge].className}`}>
                            {STATUS_BADGE[badge].label}
                          </span>
                        </div>
                        <div className="flex items-start justify-between gap-2 mt-0.5">
                          <div className="min-w-0">
                            <p className="text-sm text-foreground font-medium truncate">
                              {item.title}
                            </p>
                            <p className="text-xs text-muted truncate">{item.sub}</p>
                          </div>
                          {/* Expand button */}
                          <button
                            onClick={() => toggleExpand(item.id)}
                            aria-label={isExpanded ? "Collapse activity details" : "Expand activity details"}
                            aria-expanded={isExpanded}
                            className="shrink-0 p-1 rounded-full text-subtle hover:text-foreground hover:bg-surface-hover transition-colors"
                          >
                            <ChevronDown size={14} className={`transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                          </button>
                        </div>

                        {/* Quick action buttons — every activity */}
                        <div className="flex items-center gap-2.5 mt-1.5 flex-wrap">
                          <button
                            onClick={() => setRouteModalOpen(true)}
                            className="flex items-center gap-1 text-[10px] font-medium text-muted hover:text-foreground"
                          >
                            <Navigation size={10} /> Navigate
                          </button>
                          <button
                            onClick={() => confirmBooking(item.id)}
                            className="flex items-center gap-1 text-[10px] font-medium text-muted hover:text-foreground"
                          >
                            <Ticket size={10} /> Book
                          </button>
                          <button
                            onClick={() => toggleExpand(item.id)}
                            className="flex items-center gap-1 text-[10px] font-medium text-muted hover:text-foreground"
                          >
                            <Eye size={10} /> View Details
                          </button>
                          <button
                            onClick={() => shareActivity(item)}
                            className="flex items-center gap-1 text-[10px] font-medium text-muted hover:text-foreground"
                          >
                            <Share2 size={10} /> {sharedId === item.id ? "Shared!" : "Share"}
                          </button>
                          <button
                            onClick={() => markDone(item.id)}
                            className="flex items-center gap-1 text-[10px] font-medium text-sage hover:underline"
                          >
                            <Check size={10} /> Mark Complete
                          </button>
                        </div>

                        {/* Expanded details */}
                        {isExpanded && (
                          <div className="mt-3 rounded-xl bg-surface border border-border p-3 animate-fade-in">
                            <div className="grid grid-cols-2 gap-2.5 text-[11px]">
                              <div>
                                <p className="text-subtle">Start Time</p>
                                <p className="text-foreground font-medium">{fmt(item.min)}</p>
                              </div>
                              <div>
                                <p className="text-subtle">End Time</p>
                                <p className="text-foreground font-medium">{fmt(item.endMin)}</p>
                              </div>
                              <div>
                                <p className="text-subtle">Travel Time</p>
                                <p className="text-foreground font-medium">{item.travelTimeMin > 0 ? `${item.travelTimeMin} min` : "—"}</p>
                              </div>
                              <div>
                                <p className="text-subtle">Distance</p>
                                <p className="text-foreground font-medium">{item.distanceKm > 0 ? `${item.distanceKm} km` : "—"}</p>
                              </div>
                              <div>
                                <p className="text-subtle">Estimated Cost</p>
                                <p className="text-foreground font-medium">{item.estCost > 0 ? `₹${item.estCost.toLocaleString("en-IN")}` : "Included"}</p>
                              </div>
                              <div>
                                <p className="text-subtle">ETA</p>
                                <p className="text-foreground font-medium">{item.eta}</p>
                              </div>
                              <div className="col-span-2">
                                <p className="text-subtle">Booking Status</p>
                                <span className={`inline-block mt-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${BOOKING_BADGE[booking]}`}>
                                  {booking}
                                </span>
                              </div>
                              <div className="col-span-2">
                                <p className="text-subtle">Route Details</p>
                                <p className="text-foreground">{item.routeDetails}</p>
                              </div>
                            </div>

                            {/* Arrived reveal-card */}
                            {badge === "arrived" && (
                              <div className="mt-2.5 rounded-xl bg-sage/10 border border-sage/25 p-3 animate-fade-in">
                                <p className="text-[11px] font-semibold text-sage flex items-center gap-1.5">
                                  <CheckCircle2 size={12} /> Current Stop Completed
                                </p>
                                <div className="grid grid-cols-2 gap-2.5 mt-2 text-[11px]">
                                  <div>
                                    <p className="text-subtle">Next Destination</p>
                                    <p className="text-foreground font-medium truncate">{nextItem ? nextItem.title : "End of day"}</p>
                                  </div>
                                  <div>
                                    <p className="text-subtle">Est. Departure Time</p>
                                    <p className="text-foreground font-medium">{fmt(item.endMin)}</p>
                                  </div>
                                </div>
                                <button
                                  onClick={() => setRouteModalOpen(true)}
                                  className="mt-2.5 w-full flex items-center justify-center gap-1.5 px-3 py-1.5 text-[11px] font-medium rounded-lg bg-sage text-white hover:opacity-90 transition-opacity"
                                >
                                  <Navigation size={11} /> Navigate to Next Stop
                                </button>
                              </div>
                            )}

                            {/* 4 action buttons — UI only */}
                            <div className="grid grid-cols-2 gap-2 mt-3">
                              <button
                                onClick={() => {
                                  setQuickBadge(item.id, "arrived");
                                  pushNotification("Checked In", `You've arrived at ${item.title}.`);
                                }}
                                className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 text-[11px] font-medium rounded-lg bg-sage/10 text-sage hover:bg-sage/15 transition-colors"
                              >
                                <CheckCircle2 size={12} /> I&apos;m Arrived
                              </button>
                              <button
                                onClick={() => setLateModalItem(item)}
                                className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 text-[11px] font-medium rounded-lg bg-primary/10 text-primary hover:bg-primary/15 transition-colors"
                              >
                                <Clock size={12} /> Running Late
                              </button>
                              <button
                                onClick={() => setSkipModalItem(item)}
                                className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 text-[11px] font-medium rounded-lg border border-border text-muted hover:text-foreground transition-colors"
                              >
                                <SkipForward size={12} /> Skip
                              </button>
                              <button
                                onClick={() => setCancelModalItem(item)}
                                className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 text-[11px] font-medium rounded-lg bg-terracotta/10 text-terracotta hover:bg-terracotta/15 transition-colors"
                              >
                                <Ban size={12} /> Cancel Visit
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Next-up nudge */}
            {notificationsOn && (
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
            )}

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
                      <div className="rounded-2xl rounded-tl-sm bg-surface border border-border text-sm text-foreground px-4 py-2.5 flex items-start gap-2">
                        <span className="flex-1">{m.text}</span>
                        {voiceOutputSupported && (
                          <button
                            onClick={() => speak(m.text, i)}
                            aria-label={speakingIdx === i ? "Stop reading aloud" : "Read aloud"}
                            className={`shrink-0 p-1 rounded-full transition-colors ${
                              speakingIdx === i ? "text-sage" : "text-subtle hover:text-foreground"
                            }`}
                          >
                            <Volume2 size={13} className={speakingIdx === i ? "animate-pulse" : ""} />
                          </button>
                        )}
                      </div>
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
              {listening && (
                <div className="flex justify-end animate-fade-in">
                  <p className="flex items-center gap-2 text-xs text-sage bg-sage/10 border border-sage/30 rounded-full px-3.5 py-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse" /> Listening…
                  </p>
                </div>
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
              {voiceInputSupported && (
                <button
                  type="button"
                  onClick={listening ? stopListening : startListening}
                  aria-label={listening ? "Stop voice input" : "Speak your question"}
                  title={listening ? "Stop listening" : "Ask by voice"}
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    listening ? "bg-terracotta text-white animate-pulse" : "bg-background border border-border text-muted hover:text-sage hover:border-sage/50"
                  }`}
                >
                  <Mic size={16} />
                </button>
              )}
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={listening ? "Listening…" : "Ask about your stay, places, timings…"}
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
            {!voiceInputSupported && (
              <p className="px-5 pb-3 -mt-2 text-[10px] text-subtle flex items-center gap-1">
                <MicOff size={10} /> Voice input isn&apos;t supported in this browser — try Chrome or Edge.
              </p>
            )}
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

        {/* Sticky bottom toolbar */}
        <div className="shrink-0 flex items-stretch border-t border-border bg-surface">
          {(
            [
              ["Today", CalendarClock, () => setTab("planner")],
              ["Map", MapIcon, () => setRouteModalOpen(true)],
              ["Notifications", Bell, () => setNotifPanelOpen(true)],
              ["Bookings", Ticket, () => setBookingsModalOpen(true)],
              ["AI Assistant", MessageCircle, () => setTab("assistant")],
            ] as [string, LucideIcon, () => void][]
          ).map(([label, Icon, onClick]) => (
            <button
              key={label}
              onClick={onClick}
              className="flex-1 flex flex-col items-center justify-center gap-1 py-2.5 text-muted hover:text-foreground hover:bg-surface-hover transition-colors"
            >
              <Icon size={16} />
              <span className="text-[9px] font-medium">{label}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* Route / Map modal — shared by "View Route", "Open Map", "Navigate" and the bottom toolbar's "Map" */}
      {routeModalOpen && (
        <div
          className="fixed inset-0 z-[95] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={() => setRouteModalOpen(false)}
        >
          <div
            className="w-full sm:max-w-md max-h-[85vh] overflow-y-auto rounded-t-3xl sm:rounded-2xl bg-background border border-border shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-surface sticky top-0">
              <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                <MapIcon size={16} className="text-sage" /> Route Map
              </p>
              <button
                onClick={() => setRouteModalOpen(false)}
                aria-label="Close route map"
                className="p-1.5 rounded-lg text-muted hover:text-foreground hover:bg-surface-hover transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            <div className="p-5 space-y-4">
              {/* Live-tracking map mock — Zomato-style dashed route + moving location dot,
                  built entirely from mock plan data (no real map tiles/API). */}
              <div className="relative h-40 rounded-xl bg-gradient-to-br from-sage/10 to-primary/5 border border-border overflow-hidden">
                <div
                  className="absolute inset-0 opacity-25"
                  style={{
                    backgroundImage:
                      "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
                    backgroundSize: "22px 22px",
                  }}
                />
                <svg viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`} className="absolute inset-0 w-full h-full">
                  <path
                    d={routePathD}
                    fill="none"
                    stroke="var(--color-sage)"
                    strokeWidth={2.5}
                    strokeDasharray="1 7"
                    strokeLinecap="round"
                  />
                  {liveMarker && (
                    <g transform={`translate(${liveMarker.x}, ${liveMarker.y})`}>
                      <circle r={9} className="fill-primary/25 animate-ping" />
                      <circle r={5} className="fill-primary stroke-white" strokeWidth={1.5} />
                    </g>
                  )}
                </svg>
                {plan.map((item, i) => (
                  <span
                    key={item.id}
                    className={`absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full text-[10px] font-bold flex items-center justify-center shadow ${
                      item.status === "done"
                        ? "bg-surface border border-border text-subtle"
                        : item.status === "now"
                        ? "bg-sage text-white"
                        : "bg-white border border-sage/40 text-sage"
                    }`}
                    style={{
                      left: `${(routePoints[i].x / MAP_WIDTH) * 100}%`,
                      top: `${(routePoints[i].y / MAP_HEIGHT) * 100}%`,
                    }}
                  >
                    {i + 1}
                  </span>
                ))}
                {liveMarker && (
                  <span
                    className="absolute -translate-x-1/2 text-[9px] font-semibold text-primary bg-white/90 px-1.5 py-0.5 rounded-full shadow whitespace-nowrap"
                    style={{
                      left: `${(liveMarker.x / MAP_WIDTH) * 100}%`,
                      top: `${(liveMarker.y / MAP_HEIGHT) * 100}%`,
                      transform: "translate(-50%, 10px)",
                    }}
                  >
                    You are here
                  </span>
                )}
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-subtle mb-2">Stops</p>
                <div className="space-y-2.5">
                  {plan.map((item, i) => (
                    <div key={item.id} className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-sage/15 text-sage text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-foreground">{item.title}</p>
                        <p className="text-[11px] text-muted">{item.location} · {item.distanceKm > 0 ? `${item.distanceKm} km` : "on-site"} {item.travelTimeMin > 0 ? `· ${item.travelTimeMin} min` : ""}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bookings modal — shared by "Book Remaining" and the bottom toolbar's "Bookings" */}
      {bookingsModalOpen && (
        <div
          className="fixed inset-0 z-[95] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={() => setBookingsModalOpen(false)}
        >
          <div
            className="w-full sm:max-w-md max-h-[85vh] overflow-y-auto rounded-t-3xl sm:rounded-2xl bg-background border border-border shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-surface sticky top-0">
              <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Ticket size={16} className="text-sage" /> Bookings
              </p>
              <button
                onClick={() => setBookingsModalOpen(false)}
                aria-label="Close bookings"
                className="p-1.5 rounded-lg text-muted hover:text-foreground hover:bg-surface-hover transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            <div className="p-5 space-y-3">
              {plan.map((item) => {
                const booking = bookingOverrides[item.id] ?? item.bookingStatus;
                return (
                  <div key={item.id} className="flex items-stretch rounded-2xl bg-surface border border-border overflow-hidden">
                    {/* Main stub */}
                    <div className="flex-1 min-w-0 p-3.5 flex items-center gap-3">
                      <span className="w-9 h-9 rounded-full bg-sage/10 text-sage flex items-center justify-center shrink-0">
                        {item.icon}
                      </span>
                      <div className="min-w-0">
                        <p className="text-[9px] font-semibold uppercase tracking-wider text-sage">Dhyana Pass</p>
                        <p className="text-sm font-semibold text-foreground truncate">{item.title}</p>
                        <p className="text-[11px] text-muted mt-0.5">
                          {fmt(item.min)} · {item.estCost > 0 ? `₹${item.estCost.toLocaleString("en-IN")}` : "Included"}
                        </p>
                      </div>
                    </div>

                    {/* Perforated tear divider */}
                    <div className="relative shrink-0 w-0">
                      <span className="absolute inset-y-2.5 left-0 border-l-2 border-dashed border-border/70" />
                      <span className="absolute z-10 -top-[7px] -left-[7px] w-3.5 h-3.5 rounded-full bg-background" />
                      <span className="absolute z-10 -bottom-[7px] -left-[7px] w-3.5 h-3.5 rounded-full bg-background" />
                    </div>

                    {/* QR stub */}
                    <div className="w-[92px] shrink-0 flex flex-col items-center justify-center gap-1.5 bg-sage/5 py-3 px-2">
                      <MockQRCode seed={item.id} size={44} />
                      <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full text-center leading-tight ${BOOKING_BADGE[booking]}`}>
                        {booking}
                      </span>
                      {booking !== "Confirmed" && booking !== "Not Required" && (
                        <button
                          onClick={() => confirmBooking(item.id)}
                          className="text-[9px] font-semibold text-sage hover:underline"
                        >
                          Confirm
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Running Late — bottom sheet with a preview of adjustments (UI only) */}
      {lateModalItem && (
        <div
          className="fixed inset-0 z-[96] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={() => setLateModalItem(null)}
        >
          <div
            className="w-full sm:max-w-md max-h-[85vh] overflow-y-auto rounded-t-3xl sm:rounded-2xl bg-background border border-border shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 pt-5 pb-1">
              <p className="text-sm font-semibold text-foreground">Running Late</p>
              <p className="text-xs text-muted mt-1">We&apos;ll automatically optimize the rest of your day.</p>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-2.5">
                {(
                  [
                    ["Travel Time", "+8 min added due to delay", Timer],
                    ["Visit Duration", "Shortened by 10 min", Clock],
                    ["Next Booking", "Auto-adjusted", CalendarClock],
                    ["Restaurant Timing", "Moved later", Utensils],
                  ] as [string, string, LucideIcon][]
                ).map(([label, value, Icon]) => (
                  <div key={label} className="rounded-xl bg-surface border border-border p-2.5">
                    <p className="text-[9px] uppercase tracking-wider text-subtle flex items-center gap-1">
                      <Icon size={10} /> {label}
                    </p>
                    <p className="text-[11px] text-foreground font-medium mt-1">{value}</p>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-subtle mb-2">Affected activities</p>
                <div className="space-y-2">
                  {getLatePreviewRows(lateModalItem).map((row) => (
                    <div key={row.title} className="flex items-center justify-between gap-2 rounded-xl bg-surface border border-border p-2.5">
                      <p className="text-xs font-medium text-foreground truncate">{row.title}</p>
                      <p className="text-xs text-muted tabular-nums shrink-0">
                        {row.before} <span className="text-subtle">→</span> <span className="text-foreground font-medium">{row.after}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => setLateModalItem(null)}
                  className="flex-1 px-3 py-2.5 text-sm font-medium rounded-lg border border-border text-muted hover:text-foreground transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => confirmRunningLate(lateModalItem)}
                  className="flex-1 px-3 py-2.5 text-sm font-medium rounded-lg bg-sage text-white hover:opacity-90 transition-opacity"
                >
                  Update Itinerary
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Skip — confirmation modal (UI only) */}
      {skipModalItem && (
        <div
          className="fixed inset-0 z-[96] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={() => setSkipModalItem(null)}
        >
          <div
            className="w-full sm:max-w-sm rounded-t-3xl sm:rounded-2xl bg-background border border-border shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5">
              <p className="text-sm font-semibold text-foreground">Skip this activity?</p>
              <p className="text-xs text-muted mt-1.5">Skipping this stop will automatically:</p>
              <div className="space-y-2 mt-3">
                {(
                  [
                    ["Remove this attraction", X],
                    ["Recalculate timings", RefreshCw],
                    ["Reorder remaining destinations", Route],
                    ["Suggest nearby alternatives if available", Sparkles],
                  ] as [string, LucideIcon][]
                ).map(([label, Icon]) => (
                  <div key={label} className="flex items-center gap-2.5 text-xs text-muted">
                    <Icon size={13} className="text-subtle shrink-0" /> {label}
                  </div>
                ))}
              </div>
              <div className="flex gap-2 pt-4">
                <button
                  onClick={() => setSkipModalItem(null)}
                  className="flex-1 px-3 py-2.5 text-sm font-medium rounded-lg border border-border text-muted hover:text-foreground transition-colors"
                >
                  Keep Activity
                </button>
                <button
                  onClick={() => confirmSkip(skipModalItem)}
                  className="flex-1 px-3 py-2.5 text-sm font-medium rounded-lg bg-terracotta text-white hover:opacity-90 transition-opacity"
                >
                  Skip &amp; Recalculate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Visit — confirmation modal (UI only) */}
      {cancelModalItem && (
        <div
          className="fixed inset-0 z-[96] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={() => setCancelModalItem(null)}
        >
          <div
            className="w-full sm:max-w-sm rounded-t-3xl sm:rounded-2xl bg-background border border-border shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5">
              <div className="flex items-start gap-2.5">
                <AlertTriangle size={16} className="text-terracotta mt-0.5 shrink-0" />
                <p className="text-sm text-foreground">This booking may have cancellation charges.</p>
              </div>
              <div className="flex gap-2 pt-4">
                <button
                  onClick={() => setCancelModalItem(null)}
                  className="flex-1 px-3 py-2.5 text-sm font-medium rounded-lg border border-border text-muted hover:text-foreground transition-colors"
                >
                  Go Back
                </button>
                <button
                  onClick={() => confirmCancelVisit(cancelModalItem)}
                  className="flex-1 px-3 py-2.5 text-sm font-medium rounded-lg bg-terracotta text-white hover:opacity-90 transition-opacity"
                >
                  Cancel Visit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import { useState } from "react";
import { MessageSquare, Send, LifeBuoy } from "lucide-react";
import { PageHeader, SectionCard, StatusPill } from "@/app/components/DashboardUI";

// ============================================
// INVESTOR — Messages
// Communication with the Dhyana Stays investment
// team — project updates, distribution notices,
// and investor support.
// ============================================

const initialMessages = [
  {
    id: "msg1",
    from: "Dhyana Stays Investment Team",
    text: "Good news — Nila Wellness closed June at 84% occupancy, ahead of forecast. Your distribution has been scheduled for Aug 01.",
    time: "2 days ago",
    unread: false,
  },
  {
    id: "msg2",
    from: "You",
    text: "Thanks for the update. Could you also send the latest audited statement for Canopy Village?",
    time: "2 days ago",
    unread: false,
  },
  {
    id: "msg3",
    from: "Dhyana Stays Investment Team",
    text: "Sure — the Q2 audited statement for Canopy Village is now available under Reports. We'll notify you as soon as Q3 is finalized.",
    time: "yesterday",
    unread: false,
  },
  {
    id: "msg4",
    from: "Dhyana Stays Investment Team",
    text: "Heads up: a capital call for Stone Valley Phase 2 has been raised on your account. Please review and respond from the Capital Calls section at your convenience.",
    time: "this morning",
    unread: true,
  },
];

const supportCategories = [
  "Investment support",
  "Payment support",
  "Agreement support",
  "Financial support",
  "Tax/document support",
  "Project support",
  "Exit support",
];

export default function InvestorMessagesPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState("");

  const send = () => {
    if (!draft.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: `msg${Date.now()}`, from: "You", text: draft.trim(), time: "Just now", unread: false },
    ]);
    setDraft("");
  };

  const markRead = (id: string) => setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, unread: false } : m)));

  return (
    <div className="space-y-4 pb-12 animate-fade-in">
      <PageHeader
        title="Messages"
        subtitle="Talk to the Dhyana Stays investment team — project updates, distribution notices, and support."
      />

      <SectionCard title="Dhyana Stays Investment Team" icon={MessageSquare}>
        <ul className="divide-y divide-surface-hover">
          {messages.map((m) => (
            <li
              key={m.id}
              onClick={() => markRead(m.id)}
              className={`flex items-start justify-between gap-3 px-5 py-3.5 cursor-pointer ${m.unread ? "bg-primary/5" : ""}`}
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-foreground truncate">{m.from}</p>
                  {m.unread && <StatusPill tone="primary">New</StatusPill>}
                </div>
                <p className="text-xs text-muted mt-1 leading-relaxed">{m.text}</p>
              </div>
              <span className="text-[10px] text-subtle shrink-0 whitespace-nowrap">{m.time}</span>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2 px-5 py-4 border-t border-surface-hover">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Message the investment team…"
            className="flex-1 text-sm bg-background border border-border rounded-full px-4 py-2.5 text-foreground placeholder-subtle focus:outline-none focus:border-primary transition-colors"
          />
          <button
            onClick={send}
            disabled={!draft.trim()}
            aria-label="Send message"
            className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0"
          >
            <Send size={15} />
          </button>
        </div>
      </SectionCard>

      <SectionCard title="Need Help?" icon={LifeBuoy}>
        <div className="p-5 flex flex-wrap gap-2.5">
          {supportCategories.map((label) => (
            <button
              key={label}
              className="px-4 py-2 text-xs font-medium border border-border rounded-full text-muted hover:text-foreground transition-colors"
            >
              {label}
            </button>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

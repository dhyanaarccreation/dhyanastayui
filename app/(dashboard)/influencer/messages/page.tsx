"use client";

import { useState } from "react";
import { MessageSquare, Send, LifeBuoy } from "lucide-react";
import { PageHeader, SectionCard, StatusPill } from "@/app/components/DashboardUI";
import { messages as initialMessages } from "@/lib/influencer-data";

// ============================================
// INFLUENCER — Messages
// Communication with the Dhyana Stays marketing
// team — campaign messages, revision requests,
// partnership updates and support.
// ============================================

export default function InfluencerMessagesPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState("");

  const send = () => {
    if (!draft.trim()) return;
    setMessages((prev) => [
      { id: `msg${Date.now()}`, from: "You", text: draft.trim(), time: "Just now", unread: false },
      ...prev,
    ]);
    setDraft("");
  };

  const markRead = (id: string) => setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, unread: false } : m)));

  return (
    <div className="space-y-8 pb-12 animate-fade-in">
      <PageHeader
        title="Messages"
        subtitle="Talk to the Dhyana Stays marketing team — campaign updates, content feedback, and support."
      />

      <SectionCard title="Marketing Team" icon={MessageSquare}>
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
            placeholder="Message the marketing team…"
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
          <button className="px-4 py-2 text-xs font-medium border border-border rounded-full text-muted hover:text-foreground transition-colors">
            Campaign support
          </button>
          <button className="px-4 py-2 text-xs font-medium border border-border rounded-full text-muted hover:text-foreground transition-colors">
            Payment support
          </button>
          <button className="px-4 py-2 text-xs font-medium border border-border rounded-full text-muted hover:text-foreground transition-colors">
            Content support
          </button>
          <button className="px-4 py-2 text-xs font-medium border border-border rounded-full text-muted hover:text-foreground transition-colors">
            Technical support
          </button>
          <button className="px-4 py-2 text-xs font-medium border border-border rounded-full text-muted hover:text-foreground transition-colors">
            Raise a dispute
          </button>
        </div>
      </SectionCard>
    </div>
  );
}

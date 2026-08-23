"use client";

import { useState } from "react";
import {
  Video,
  Link2,
  Send,
  PlayCircle,
  BookOpen,
  Camera,
  ImagePlay,
} from "lucide-react";
import { PageHeader, SectionCard, StatusPill } from "@/app/components/DashboardUI";
import { contentSubmissions as initialSubmissions, campaigns, type ContentStatus } from "@/lib/influencer-data";

// ============================================
// INFLUENCER — Content
// Submit content by URL (Instagram post, Reel,
// YouTube video, story, blog, photos) and track
// it through Draft → Submitted → Review →
// Approved → Published. No raw file uploads —
// link submission only.
// ============================================

const contentTypes = ["Instagram Post", "Reel", "YouTube Video", "Story", "Blog", "Photographs"] as const;

const typeIcon: Record<string, typeof Camera> = {
  "Instagram Post": Camera,
  Reel: Video,
  "YouTube Video": PlayCircle,
  Story: ImagePlay,
  Blog: BookOpen,
  Photographs: Camera,
};

const statusTone = (s: ContentStatus) =>
  s === "Published" ? "sage" : s === "Approved" ? "sage" : s === "Review" ? "primary" : s === "Submitted" ? "primary" : "muted";

export default function InfluencerContentPage() {
  const [submissions, setSubmissions] = useState(initialSubmissions);
  const [title, setTitle] = useState("");
  const [type, setType] = useState<(typeof contentTypes)[number]>("Reel");
  const [campaign, setCampaign] = useState(campaigns[0]?.name ?? "");
  const [url, setUrl] = useState("");

  const submit = () => {
    if (!title.trim() || !url.trim()) return;
    setSubmissions((prev) => [
      { id: `ct${Date.now()}`, title: title.trim(), type, campaign, url: url.trim(), status: "Submitted", submittedOn: "Just now" },
      ...prev,
    ]);
    setTitle("");
    setUrl("");
  };

  return (
    <div className="space-y-4 pb-12 animate-fade-in">
      <PageHeader
        title="Content"
        subtitle="Submit a link to your published content — no raw uploads. Track approval status through to Published."
      />

      <SectionCard title="Submit Content" icon={Send}>
        <div className="p-5 space-y-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Content title"
            className="w-full text-sm bg-background border border-border rounded-xl px-3.5 py-2.5 text-foreground placeholder-subtle focus:outline-none focus:border-primary transition-colors"
          />
          <div className="grid sm:grid-cols-2 gap-3">
            <select
              value={type}
              onChange={(e) => setType(e.target.value as (typeof contentTypes)[number])}
              className="text-sm bg-background border border-border rounded-xl px-3.5 py-2.5 text-foreground focus:outline-none focus:border-primary transition-colors"
            >
              {contentTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <select
              value={campaign}
              onChange={(e) => setCampaign(e.target.value)}
              className="text-sm bg-background border border-border rounded-xl px-3.5 py-2.5 text-foreground focus:outline-none focus:border-primary transition-colors"
            >
              {campaigns.map((c) => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3.5 py-2.5">
            <Link2 size={15} className="text-subtle shrink-0" />
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste the content URL (Instagram, YouTube, blog…)"
              className="flex-1 bg-transparent text-sm text-foreground placeholder-subtle focus:outline-none"
            />
          </div>
          <button
            onClick={submit}
            disabled={!title.trim() || !url.trim()}
            className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold bg-primary text-primary-foreground rounded-xl hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={13} /> Submit for Review
          </button>
          <p className="text-[11px] text-subtle">
            Content is reviewed by the marketing team — you can&apos;t approve your own submissions.
          </p>
        </div>
      </SectionCard>

      <SectionCard title="Your Submissions" icon={Video}>
        <ul className="divide-y divide-surface-hover">
          {submissions.map((c) => {
            const Icon = typeIcon[c.type];
            return (
              <li key={c.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Icon size={14} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{c.title}</p>
                    <p className="text-xs text-subtle mt-0.5 truncate">
                      {c.campaign} · {c.submittedOn}
                      {c.url && (
                        <>
                          {" · "}
                          <a href={c.url} target="_blank" rel="noreferrer" className="text-primary hover:underline">
                            View link
                          </a>
                        </>
                      )}
                    </p>
                  </div>
                </div>
                <StatusPill tone={statusTone(c.status)}>{c.status}</StatusPill>
              </li>
            );
          })}
        </ul>
      </SectionCard>
    </div>
  );
}

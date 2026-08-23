"use client";

import { Image as ImageIcon, ExternalLink } from "lucide-react";
import { PageHeader, SectionCard, StatusPill } from "@/app/components/DashboardUI";
import { marketingAssets } from "@/lib/influencer-data";

// ============================================
// INFLUENCER — Marketing Assets
// Ready-to-use property photos, brand kits,
// campaign posters and templates — every asset
// opens as a link, no direct file uploads/hosting.
// ============================================

export default function InfluencerAssetsPage() {
  return (
    <div className="space-y-4 pb-12 animate-fade-in">
      <PageHeader
        title="Marketing Assets"
        subtitle="Property photos, brand guidelines, campaign posters and content templates — ready to use, one click away."
      />

      <SectionCard title="Asset Library" icon={ImageIcon}>
        <ul className="divide-y divide-surface-hover">
          {marketingAssets.map((a) => (
            <li key={a.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{a.name}</p>
                <p className="text-xs text-subtle mt-0.5">{a.type}</p>
              </div>
              <a
                href={a.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold bg-primary text-primary-foreground rounded-full hover:bg-primary-hover transition-colors shrink-0"
              >
                Open <ExternalLink size={11} />
              </a>
            </li>
          ))}
        </ul>
        <p className="px-5 py-3 text-[11px] text-subtle border-t border-surface-hover">
          Assets are hosted by Dhyana Stays and update automatically for active campaigns — always link to the latest version rather than re-uploading.
        </p>
      </SectionCard>
    </div>
  );
}

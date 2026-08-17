import type { LucideIcon } from "lucide-react";

// Compact icon + name pill for the category carousel — no photos, just a
// small centered icon and a label, so the row reads as a clean set of
// filters rather than a second gallery of images.
export default function CategoryTile({
  name,
  icon: Icon,
  active,
  onClick,
}: {
  name: string;
  icon: LucideIcon;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`group flex-none w-[120px] h-[78px] flex flex-col items-center justify-center gap-1.5 px-2 rounded-2xl bg-surface text-center border transition-all duration-300 ease-out hover:-translate-y-[2px] ${
        active
          ? "border-primary bg-primary/10 shadow-[var(--shadow-hover-pill)] -translate-y-px"
          : "border-[var(--surface-border)] shadow-[var(--shadow-soft-pill)] hover:shadow-[var(--shadow-hover-pill)]"
      }`}
    >
      <Icon size={24} strokeWidth={1.75} className={active ? "text-primary" : "text-foreground"} />
      <p className={`w-full text-xs font-semibold truncate ${active ? "text-primary" : "text-foreground"}`}>
        {name}
      </p>
    </button>
  );
}

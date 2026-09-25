import type { LucideIcon } from "lucide-react";

// Compact horizontal category chip — icon and name sit on the same row,
// sized to their content (no fixed card width/height), so the row reads as
// a set of filter chips rather than a gallery of cards.
export default function CategoryTile({
  name,
  icon: Icon,
  iconColorClass,
  active,
  onClick,
}: {
  name: string;
  icon: LucideIcon;
  iconColorClass: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex-none flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-surface border whitespace-nowrap transition-all duration-300 ease-out hover:-translate-y-px ${
        active
          ? "border-primary shadow-[var(--shadow-hover-pill)]"
          : "border-[var(--surface-border)] shadow-[var(--shadow-soft-pill)] hover:shadow-[var(--shadow-hover-pill)]"
      }`}
    >
      <Icon size={14} strokeWidth={2} className={iconColorClass} />
      <span className={`text-xs font-semibold ${active ? "text-primary" : "text-foreground"}`}>
        {name}
      </span>
    </button>
  );
}

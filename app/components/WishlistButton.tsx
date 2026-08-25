"use client";

import { Heart } from "lucide-react";
import { useWishlist } from "@/lib/useWishlist";

interface WishlistButtonProps {
  /** Namespaced id, e.g. `stay-1`, `experience-e4`, `destination-auroville`. */
  id: string;
  label: string;
  /** "pill" matches the labeled Share/Save buttons on detail page headers.
   *  "icon" is a bare circular toggle for overlaying on a card corner. */
  variant?: "pill" | "icon";
  className?: string;
}

export default function WishlistButton({ id, label, variant = "pill", className = "" }: WishlistButtonProps) {
  const { isSaved, toggle } = useWishlist();
  const saved = isSaved(id);

  const handleClick = (e: React.MouseEvent) => {
    // Cards wrap this in a Link — never follow it or bubble to a parent
    // onClick when the guest is just toggling the heart.
    e.preventDefault();
    e.stopPropagation();
    toggle(id);
  };

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-label={saved ? `Remove ${label} from wishlist` : `Add ${label} to wishlist`}
        aria-pressed={saved}
        className={`w-9 h-9 rounded-full bg-black/35 hover:bg-black/50 backdrop-blur-sm flex items-center justify-center text-white transition-colors ${className}`}
      >
        <Heart size={15} className={saved ? "fill-current text-red-400" : ""} />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={saved ? `Remove ${label} from wishlist` : `Add ${label} to wishlist`}
      aria-pressed={saved}
      className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
        saved
          ? "border-red-300 bg-red-50 text-red-500 hover:bg-red-100"
          : "border-border text-foreground hover:bg-surface-hover hover:text-red-400"
      } ${className}`}
    >
      <Heart size={14} className={saved ? "fill-current" : ""} />
      {saved ? "Saved" : "Save"}
    </button>
  );
}

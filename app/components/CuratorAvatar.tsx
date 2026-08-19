// ============================================
// CURATOR AVATAR
// Renders a photo when one is provided (fictional
// mock personas use a stock photo, same as the rest
// of the app). When no photo is supplied — e.g. a
// real creator we have no licensed photo for — it
// falls back to an initials badge instead of a
// random stock face standing in for someone's
// actual likeness.
// ============================================

export default function CuratorAvatar({
  name,
  avatar,
  className = "",
}: {
  name: string;
  avatar?: string;
  className?: string;
}) {
  if (avatar) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={avatar} alt={name} className={className} />
    );
  }

  const initials = name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      className={`flex items-center justify-center bg-sage text-white font-semibold ${className}`}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}

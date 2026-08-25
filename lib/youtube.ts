// Shared helpers for embedding real YouTube videos inline (never navigating
// the guest away from Dhyana). Used wherever a card/reel item carries a real
// `youtubeUrl` instead of (or alongside) a local video asset.

const YOUTUBE_ID_PATTERN =
  /(?:youtube(?:-nocookie)?\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

export function getYouTubeVideoId(url: string): string | null {
  const match = url.match(YOUTUBE_ID_PATTERN);
  return match ? match[1] : null;
}

/** Builds a youtube-nocookie.com embed URL for inline, in-page playback.
 *  The embedded player's own fullscreen control expands just the iframe via
 *  the Fullscreen API, so it stays on this page rather than opening YouTube. */
export function getYouTubeEmbedUrl(url: string, opts: { autoplay?: boolean } = {}): string | null {
  const id = getYouTubeVideoId(url);
  if (!id) return null;
  const params = new URLSearchParams({ rel: "0", playsinline: "1" });
  if (opts.autoplay) params.set("autoplay", "1");
  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
}

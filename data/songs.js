export function getCoverUrl(song) {
  if (song?.cover && song.cover !== "/covers/default.svg") {
    return song.cover;
  }
  if (song?.youtubeId && !String(song.youtubeId).startsWith("REPLACE_")) {
    return `https://i.ytimg.com/vi/${song.youtubeId}/mqdefault.jpg`;
  }
  return "/covers/default.svg";
}

export function extractYoutubeId(input) {
  if (!input || typeof input !== "string") return "";
  const trimmed = input.trim();
  if (/^[\w-]{11}$/.test(trimmed)) return trimmed;
  const match = trimmed.match(
    /(?:youtube\.com\/(?:watch\?.*v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/
  );
  return match?.[1] ?? "";
}

export function extractPlaylistId(input) {
  if (!input || typeof input !== "string") return "";
  const trimmed = input.trim();
  if (/^PL[\w-]+$/.test(trimmed)) return trimmed;
  const match = trimmed.match(/[?&]list=([\w-]+)/);
  return match?.[1] ?? "";
}

export function songFromPlayer(player) {
  try {
    const data = player?.getVideoData?.() || {};
    const videoId = data.video_id || "";
    if (!videoId) return null;
    return {
      id: videoId,
      title: data.title || "…",
      artist: data.author || "",
      youtubeId: videoId,
    };
  } catch {
    return null;
  }
}

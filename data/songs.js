export function getCoverUrl(song) {
  if (song?.cover && song.cover !== "/covers/default.svg") {
    return song.cover;
  }
  if (song?.youtubeId && !String(song.youtubeId).startsWith("REPLACE_")) {
    return `https://i.ytimg.com/vi/${song.youtubeId}/mqdefault.jpg`;
  }
  return "/covers/default.svg";
}

export function pickRandomSong(songs, category, excludeId = null) {
  const list = Array.isArray(songs)
    ? songs.filter((song) => !category || song.category === category)
    : [];

  const valid = list.filter(
    (song) =>
      song.youtubeId && !String(song.youtubeId).startsWith("REPLACE_")
  );
  const pool = valid.filter((song) => song.id !== excludeId);
  const choices = pool.length > 0 ? pool : valid;
  if (choices.length === 0) return null;
  return choices[Math.floor(Math.random() * choices.length)];
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

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CATALOG_PATH = path.join(process.cwd(), "content", "catalog.mdx");

function extractYoutubeId(input) {
  if (!input || typeof input !== "string") return "";
  const trimmed = input.trim();
  if (/^[\w-]{11}$/.test(trimmed)) return trimmed;
  const match = trimmed.match(
    /(?:youtube\.com\/(?:watch\?.*v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/
  );
  return match?.[1] ?? trimmed;
}

function extractPlaylistId(input) {
  if (!input || typeof input !== "string") return "";
  const trimmed = input.trim();
  if (/^PL[\w-]+$/.test(trimmed)) return trimmed;
  const match = trimmed.match(/[?&]list=([\w-]+)/);
  return match?.[1] ?? "";
}

function normalizeCatalog(data) {
  const stations = Array.isArray(data?.stations) ? data.stations : [];

  const normalizedStations = stations.map((station, stationIndex) => {
    const id = String(station.id || `station-${stationIndex + 1}`).trim();
    const songs = Array.isArray(station.songs) ? station.songs : [];

    return {
      id,
      label: String(station.label || id).trim(),
      group: "main",
      background: String(station.background || "").trim(),
      backgroundType: station.backgroundType === "video" ? "video" : "image",
      poster: String(station.poster || "").trim() || null,
      overlay: String(station.overlay || "rgba(20, 12, 10, 0.42)").trim(),
      youtubePlaylist: extractPlaylistId(String(station.youtubePlaylist || "")),
      songs: songs.map((song, songIndex) => ({
        id: Number(song.id) || stationIndex * 1000 + songIndex + 1,
        title: String(song.title || "Untitled").trim(),
        artist: String(song.artist || "Unknown").trim(),
        category: id,
        youtubeId: extractYoutubeId(String(song.youtubeId || "")),
        cover: String(song.cover || "/covers/default.svg").trim(),
      })),
    };
  });

  const songs = normalizedStations.flatMap((station) =>
    station.songs.map(({ ...song }) => song)
  );

  const stationMeta = normalizedStations.map(
    ({ songs: _songs, ...station }) => station
  );

  return { stations: stationMeta, songs };
}

export function loadCatalog() {
  const raw = fs.readFileSync(CATALOG_PATH, "utf8");
  const { data } = matter(raw);
  return normalizeCatalog(data);
}

import { loadCatalog } from "@/lib/catalog";

/** Server-only helpers. Prefer loadCatalog() from page.js for the app. */
export function getStations() {
  return loadCatalog().stations;
}

export function getSongs() {
  return loadCatalog().songs;
}

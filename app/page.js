import MusicExperience from "@/components/MusicExperience";
import { loadCatalog } from "@/lib/catalog";

export default function HomePage() {
  const catalog = loadCatalog();

  return (
    <main>
      <MusicExperience
        stations={catalog.stations}
        songs={catalog.songs}
      />
    </main>
  );
}

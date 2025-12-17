import MobileWrapper from "@/components/layout/MobileWrapper";
import BottomNav from "@/components/layout/BottomNav";
import HeroBanner from "@/components/home/HeroBanner";
import ModernDramaCard from "@/components/shared/ModernDramaCard";
import { Search, TrendingUp, Sparkles, Clock } from "lucide-react";

// Dummy data with more metadata
const DUMMY_DRAMAS = [
  {
    id: "1",
    title: "The Mysterious CEO",
    cover: "https://picsum.photos/seed/drama1/400/600",
    tags: ["Romance", "Drama", "CEO"],
    rating: 4.7,
    episodes: 80,
    duration: "2min",
  },
  {
    id: "2",
    title: "Return of the Legend",
    cover: "https://picsum.photos/seed/drama2/400/600",
    tags: ["Action", "Revenge"],
    rating: 4.9,
    episodes: 100,
    duration: "3min",
  },
  {
    id: "3",
    title: "Hidden Marriage Secret",
    cover: "https://picsum.photos/seed/drama3/400/600",
    tags: ["Romance", "Marriage"],
    rating: 4.5,
    episodes: 65,
    duration: "2min",
  },
  {
    id: "4",
    title: "Reborn as a Billionaire",
    cover: "https://picsum.photos/seed/drama4/400/600",
    tags: ["Fantasy", "Wealthy"],
    rating: 4.8,
    episodes: 90,
    duration: "3min",
  },
  {
    id: "5",
    title: "My Ex-Wife's Secret",
    cover: "https://picsum.photos/seed/drama5/400/600",
    tags: ["Drama", "Mystery"],
    rating: 4.6,
    episodes: 75,
    duration: "2min",
  },
  {
    id: "6",
    title: "The Contract Bride",
    cover: "https://picsum.photos/seed/drama6/400/600",
    tags: ["Romance", "Contract"],
    rating: 4.7,
    episodes: 70,
    duration: "2min",
  },
  {
    id: "7",
    title: "Unexpected Love Story",
    cover: "https://picsum.photos/seed/drama7/400/600",
    tags: ["Romance", "Comedy"],
    rating: 4.4,
    episodes: 60,
    duration: "3min",
  },
  {
    id: "8",
    title: "Hidden Heir",
    cover: "https://picsum.photos/seed/drama8/400/600",
    tags: ["Drama", "Family"],
    rating: 4.6,
    episodes: 85,
    duration: "2min",
  },
];

export default function HomePage() {
  const featured = DUMMY_DRAMAS[0];
  const trending = DUMMY_DRAMAS.slice(0, 6);
  const latest = DUMMY_DRAMAS.slice(0, 6);
  const recommended = DUMMY_DRAMAS;

  return (
    <MobileWrapper>
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 bg-gradient-to-b from-nongton-black via-nongton-black/95 to-transparent backdrop-blur-sm z-40 px-4 py-3">
        <div className="flex justify-between items-center max-w-2xl mx-auto">
          <h1 className="text-2xl font-black text-nongton-red tracking-tight">
            NONGTON
          </h1>
          <button className="p-2 hover:bg-zinc-800/50 rounded-full transition-colors">
            <Search className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-14 pb-16">
        {/* Hero Banner */}
        <HeroBanner
          title={featured.title}
          cover={featured.cover}
          tags={featured.tags}
        />

        {/* Trending Section */}
        <section className="mt-5 mb-6">
          <div className="flex items-center gap-2 px-4 mb-3">
            <TrendingUp className="w-4 h-4 text-nongton-red" />
            <h2 className="text-base font-bold">Trending Now</h2>
          </div>
          <div className="flex gap-2.5 overflow-x-auto no-scrollbar px-4">
            {trending.map((drama) => (
              <ModernDramaCard
                key={drama.id}
                id={drama.id}
                title={drama.title}
                cover={drama.cover}
                rating={drama.rating}
                episodes={drama.episodes}
                duration={drama.duration}
                size="medium"
              />
            ))}
          </div>
        </section>

        {/* Latest Releases Section */}
        <section className="mb-6">
          <div className="flex items-center justify-between px-4 mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-nongton-red" />
              <h2 className="text-base font-bold">New Releases</h2>
            </div>
            <button className="text-nongton-gray text-xs hover:text-nongton-red transition-colors">
              View All →
            </button>
          </div>
          <div className="flex gap-2.5 overflow-x-auto no-scrollbar px-4">
            {latest.map((drama) => (
              <ModernDramaCard
                key={drama.id}
                id={drama.id}
                title={drama.title}
                cover={drama.cover}
                rating={drama.rating}
                episodes={drama.episodes}
                duration={drama.duration}
                isNew
                size="medium"
              />
            ))}
          </div>
        </section>

        {/* Recommended Section */}
        <section className="mb-6">
          <div className="flex items-center gap-2 px-4 mb-3">
            <Clock className="w-4 h-4 text-nongton-red" />
            <h2 className="text-base font-bold">Quick Watch</h2>
          </div>
          <div className="flex gap-2.5 overflow-x-auto no-scrollbar px-4">
            {recommended.map((drama) => (
              <ModernDramaCard
                key={drama.id}
                id={drama.id}
                title={drama.title}
                cover={drama.cover}
                rating={drama.rating}
                episodes={drama.episodes}
                duration={drama.duration}
                size="small"
              />
            ))}
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </MobileWrapper>
  );
}


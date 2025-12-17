import MobileWrapper from "@/components/layout/MobileWrapper";
import BottomNav from "@/components/layout/BottomNav";
import HeroBanner from "@/components/home/HeroBanner";
import DramaCard from "@/components/shared/DramaCard";
import { Search } from "lucide-react";

// Dummy data for initial UI
const DUMMY_DRAMAS = [
  {
    id: "1",
    title: "The Mysterious CEO",
    cover: "https://picsum.photos/seed/drama1/400/600",
    tags: ["Romance", "Drama", "CEO"],
  },
  {
    id: "2",
    title: "Return of the Legend",
    cover: "https://picsum.photos/seed/drama2/400/600",
    tags: ["Action", "Revenge"],
  },
  {
    id: "3",
    title: "Hidden Marriage",
    cover: "https://picsum.photos/seed/drama3/400/600",
    tags: ["Romance", "Marriage"],
  },
  {
    id: "4",
    title: "Reborn as a Billionaire",
    cover: "https://picsum.photos/seed/drama4/400/600",
    tags: ["Fantasy", "Wealthy"],
  },
  {
    id: "5",
    title: "My Ex-Wife's Secret",
    cover: "https://picsum.photos/seed/drama5/400/600",
    tags: ["Drama", "Mystery"],
  },
  {
    id: "6",
    title: "The Contract Bride",
    cover: "https://picsum.photos/seed/drama6/400/600",
    tags: ["Romance", "Contract"],
  },
  {
    id: "7",
    title: "Unexpected Love",
    cover: "https://picsum.photos/seed/drama7/400/600",
    tags: ["Romance", "Comedy"],
  },
  {
    id: "8",
    title: "Hidden Heir",
    cover: "https://picsum.photos/seed/drama8/400/600",
    tags: ["Drama", "Family"],
  },
];

export default function HomePage() {
  const featured = DUMMY_DRAMAS[0];
  const trending = DUMMY_DRAMAS.slice(0, 10);
  const latest = DUMMY_DRAMAS.slice(0, 8);

  return (
    <MobileWrapper>
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 bg-nongton-black/80 backdrop-blur-md z-40 px-4 py-4 flex justify-between items-center border-b border-zinc-800/50">
        <h1 className="text-2xl font-black text-nongton-red tracking-tight">
          NONGTON
        </h1>
        <button className="hover:text-nongton-red transition-colors">
          <Search className="w-6 h-6" />
        </button>
      </header>

      {/* Main Content */}
      <main className="pt-16 pb-20">
        {/* Hero Banner */}
        <HeroBanner
          title={featured.title}
          cover={featured.cover}
          tags={featured.tags}
        />

        {/* Top 10 Trending Section */}
        <section className="mt-6 mb-6">
          <h2 className="text-lg font-bold mb-3 px-4">Top 10 Trending</h2>
          <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 pb-2">
            {trending.map((drama, index) => (
              <DramaCard
                key={drama.id}
                id={drama.id}
                title={drama.title}
                cover={drama.cover}
                rank={index + 1}
              />
            ))}
          </div>
        </section>

        {/* Latest Releases Section */}
        <section className="mb-6">
          <div className="flex items-center justify-between px-4 mb-3">
            <h2 className="text-lg font-bold">Latest Releases</h2>
            <button className="text-nongton-gray text-sm hover:text-nongton-white transition-colors">
              See All →
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 pb-2">
            {latest.map((drama) => (
              <DramaCard
                key={drama.id}
                id={drama.id}
                title={drama.title}
                cover={drama.cover}
                showBadge
                variant="large"
              />
            ))}
          </div>
        </section>

        {/* For You Section */}
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-3 px-4">For You</h2>
          <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 pb-2">
            {DUMMY_DRAMAS.map((drama) => (
              <DramaCard
                key={drama.id}
                id={drama.id}
                title={drama.title}
                cover={drama.cover}
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


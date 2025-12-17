import MobileWrapper from "@/components/layout/MobileWrapper";
import BottomNav from "@/components/layout/BottomNav";
import { Search, Flame } from "lucide-react";

const GENRES = [
  "Romance", "Action", "Drama", "Comedy", "Thriller", 
  "Fantasy", "Mystery", "CEO", "Revenge", "Marriage"
];

export default function ExplorePage() {
  return (
    <MobileWrapper>
      <header className="fixed top-0 left-0 right-0 bg-gradient-to-b from-nongton-black via-nongton-black/95 to-transparent backdrop-blur-sm z-40 px-4 py-3">
        <div className="flex justify-between items-center max-w-2xl mx-auto">
          <h1 className="text-2xl font-black text-nongton-red tracking-tight">
            EXPLORE
          </h1>
          <button className="p-2 hover:bg-zinc-800/50 rounded-full transition-colors">
            <Search className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="pt-14 pb-16 px-4">
        {/* Trending Search */}
        <section className="mt-5">
          <div className="flex items-center gap-2 mb-3">
            <Flame className="w-4 h-4 text-nongton-red" />
            <h2 className="text-base font-bold">Trending Searches</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {GENRES.map((genre, index) => (
              <button
                key={index}
                className="px-4 py-2 bg-nongton-card hover:bg-nongton-card/80 rounded-full text-sm transition-colors"
              >
                {genre}
              </button>
            ))}
          </div>
        </section>

        <div className="flex items-center justify-center min-h-[40vh] mt-10">
          <p className="text-nongton-gray text-sm">More features coming soon...</p>
        </div>
      </main>

      <BottomNav />
    </MobileWrapper>
  );
}


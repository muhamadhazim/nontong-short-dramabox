'use client';

import { useState, useEffect } from "react";
import MobileWrapper from "@/components/layout/MobileWrapper";
import BottomNav from "@/components/layout/BottomNav";
import AppHeader from "@/components/layout/AppHeader";
import ModernDramaCard from "@/components/shared/ModernDramaCard";
import SectionHeader from "@/components/ui/SectionHeader";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { Flame, TrendingUp, Film } from "lucide-react";
import { getTrending, getLatest } from "@/lib/api";
import type { DramaCard } from "@/types/drama";

const GENRES = [
  { name: "Romance", icon: "❤️", color: "from-pink-500/20 to-red-500/20 hover:from-pink-500/40 hover:to-red-500/40" },
  { name: "Action", icon: "⚔️", color: "from-orange-500/20 to-yellow-500/20 hover:from-orange-500/40 hover:to-yellow-500/40" },
  { name: "Drama", icon: "🎭", color: "from-purple-500/20 to-blue-500/20 hover:from-purple-500/40 hover:to-blue-500/40" },
  { name: "Comedy", icon: "😂", color: "from-yellow-500/20 to-green-500/20 hover:from-yellow-500/40 hover:to-green-500/40" },
  { name: "Thriller", icon: "🔪", color: "from-red-500/20 to-gray-500/20 hover:from-red-500/40 hover:to-gray-500/40" },
  { name: "Fantasy", icon: "✨", color: "from-indigo-500/20 to-purple-500/20 hover:from-indigo-500/40 hover:to-purple-500/40" },
  { name: "Mystery", icon: "🔍", color: "from-gray-500/20 to-slate-500/20 hover:from-gray-500/40 hover:to-slate-500/40" },
  { name: "CEO", icon: "💼", color: "from-blue-500/20 to-cyan-500/20 hover:from-blue-500/40 hover:to-cyan-500/40" },
  { name: "Revenge", icon: "⚡", color: "from-red-500/20 to-black/20 hover:from-red-500/40 hover:to-black/40" },
  { name: "Marriage", icon: "💍", color: "from-pink-500/20 to-rose-500/20 hover:from-pink-500/40 hover:to-rose-500/40" },
];

const CATEGORIES = [
  { title: "New Releases", count: 48, gradient: "from-nongton-red/20 to-pink-500/20" },
  { title: "Top Rated", count: 156, gradient: "from-yellow-500/20 to-orange-500/20" },
  { title: "Most Watched", count: 203, gradient: "from-blue-500/20 to-cyan-500/20" },
  { title: "Completed", count: 89, gradient: "from-green-500/20 to-emerald-500/20" },
];

export default function ExplorePage() {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [trendingDramas, setTrendingDramas] = useState<DramaCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDramas = async () => {
      setIsLoading(true);
      try {
        const data = await getTrending();
        // Filter out invalid dramas
        const validData = data.filter(d => d.id && d.title && d.cover);
        setTrendingDramas(validData.slice(0, 8));
      } catch (error) {
        console.error("Error fetching trending dramas:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDramas();
  }, []);

  return (
    <MobileWrapper maxWidth="full">
      <AppHeader title="EXPLORE" />

      <main className="pt-14 pb-20">
        <Container size="lg">
          {/* Trending Search Section */}
          <section className="mt-5 mb-8 animate-fade-in">
            <SectionHeader icon={Flame} title="Trending Searches" className="mb-4" />
            
            <div className="flex flex-wrap gap-2.5">
              {GENRES.map((genre, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedGenre(genre.name)}
                  className={`group px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r ${genre.color} backdrop-blur-sm rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95 border border-white/10 hover:border-nongton-red/50 ${
                    selectedGenre === genre.name ? 'ring-2 ring-nongton-red' : ''
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="mr-1.5">{genre.icon}</span>
                  {genre.name}
                </button>
              ))}
            </div>
          </section>

          {/* Trending Dramas Section */}
          <section className="mb-8 animate-fade-in-delay">
            <SectionHeader 
              icon={TrendingUp} 
              title="Trending Now"
              action={
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-nongton-gray hover:text-nongton-red"
                >
                  View All →
                </Button>
              }
            />
            
            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                {[...Array(8)].map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="bg-zinc-800 rounded-lg aspect-[2/3]" />
                    <div className="mt-2 h-4 bg-zinc-800 rounded" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                {trendingDramas.map((drama, index) => (
                  <div 
                    key={drama.id}
                    className="animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <ModernDramaCard
                      id={drama.id}
                      title={drama.title}
                      cover={drama.cover}
                      rating={drama.rating}
                      episodes={drama.episodes}
                      duration={drama.duration}
                      size="large"
                    />
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Browse by Category */}
          <section className="mb-8 animate-fade-in-delay-2">
            <SectionHeader icon={Film} title="Browse by Category" className="mb-4" />
            
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {CATEGORIES.map((category, index) => (
                <button
                  key={index}
                  className={`group relative overflow-hidden bg-gradient-to-br ${category.gradient} hover:scale-105 transition-all duration-300 rounded-xl p-5 sm:p-6 text-left border border-white/10 hover:border-nongton-red/50 active:scale-95`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative z-10">
                    <h3 className="font-bold text-base sm:text-lg mb-1 group-hover:text-nongton-red transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-nongton-gray">{category.count} dramas</p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </section>
        </Container>
      </main>

      <BottomNav />
    </MobileWrapper>
  );
}


"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import MobileWrapper from "@/components/layout/MobileWrapper";
import BottomNav from "@/components/layout/BottomNav";
import Container from "@/components/ui/Container";
import ModernDramaCard from "@/components/shared/ModernDramaCard";
import { Search, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { searchDramas } from "@/lib/api";
import type { DramaCard } from "@/types/drama";

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q") || "";
  
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [results, setResults] = useState<DramaCard[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (queryParam) {
      setSearchQuery(queryParam);
      performSearch(queryParam);
    }
  }, [queryParam]);

  const performSearch = async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    setIsLoading(true);
    try {
      const data = await searchDramas(query);
      // Filter out invalid dramas
      const validData = data.filter(d => d.id && d.title && d.cover);
      setResults(validData);
      setHasSearched(true);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
      setHasSearched(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      performSearch(searchQuery);
    }
  };

  return (
    <MobileWrapper maxWidth="full">
      {/* Header with Search */}
      <header className="fixed top-0 left-0 right-0 bg-nongton-black border-b border-white/10 z-40">
        <Container size="lg">
          <div className="flex items-center gap-3 py-3">
            <Link 
              href="/"
              className="p-2 hover:bg-zinc-800/50 rounded-full transition-all active:scale-95"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>

            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-nongton-gray" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search dramas..."
                  className="w-full bg-zinc-900 border border-white/10 rounded-lg pl-11 pr-4 py-2.5 text-white placeholder:text-nongton-gray focus:outline-none focus:border-nongton-red transition-colors"
                  autoFocus
                />
              </div>
            </form>
          </div>
        </Container>
      </header>

      <main className="pt-20 pb-20">
        <Container size="lg">
          {isLoading ? (
            // Loading state
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
              <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mb-4 animate-pulse">
                <Search className="w-10 h-10 text-nongton-gray" />
              </div>
              <h2 className="text-xl font-bold mb-2">Searching...</h2>
              <p className="text-nongton-gray text-sm max-w-sm">
                Finding dramas for you
              </p>
            </div>
          ) : !hasSearched ? (
            // Empty state - sebelum search
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
              <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mb-4">
                <Search className="w-10 h-10 text-nongton-gray" />
              </div>
              <h2 className="text-xl font-bold mb-2">Search for Dramas</h2>
              <p className="text-nongton-gray text-sm max-w-sm">
                Type a drama name or genre and press Enter to search
              </p>
            </div>
          ) : results.length > 0 ? (
            // Ada hasil
            <>
              <div className="mb-6">
                <p className="text-nongton-gray text-sm">
                  Found {results.length} result{results.length !== 1 ? 's' : ''} for "{queryParam}"
                </p>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                {results.map((drama) => (
                  <ModernDramaCard
                    key={drama.id}
                    id={drama.id}
                    title={drama.title}
                    cover={drama.cover}
                    rating={drama.rating}
                    episodes={drama.episodes}
                    duration={drama.duration}
                    size="large"
                  />
                ))}
              </div>
            </>
          ) : (
            // Tidak ada hasil
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
              <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mb-4">
                <Search className="w-10 h-10 text-nongton-gray" />
              </div>
              <h2 className="text-xl font-bold mb-2">No results found</h2>
              <p className="text-nongton-gray text-sm max-w-sm">
                No dramas match your search for "{queryParam}". Try different keywords.
              </p>
            </div>
          )}
        </Container>
      </main>

      <BottomNav />
    </MobileWrapper>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <MobileWrapper maxWidth="full">
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-pulse text-nongton-gray">Loading...</div>
        </div>
      </MobileWrapper>
    }>
      <SearchContent />
    </Suspense>
  );
}

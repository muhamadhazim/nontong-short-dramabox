import MobileWrapper from "@/components/layout/MobileWrapper";
import BottomNav from "@/components/layout/BottomNav";
import AppHeader from "@/components/layout/AppHeader";
import DramaCarousel from "@/components/shared/DramaCarousel";
import ModernDramaCard from "@/components/shared/ModernDramaCard";
import SectionHeader from "@/components/ui/SectionHeader";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { TrendingUp, Sparkles, Clock } from "lucide-react";
import { getForYou, getLatest, getTrending } from "@/lib/api";

export default async function HomePage() {
  // Fetch data dari API
  const [allDramas, latestDramas, trendingDramas] = await Promise.all([
    getForYou(),
    getLatest(),
    getTrending()
  ]);

  // Filter out dramas with invalid data and ensure unique IDs
  const filterValidDramas = (dramas: any[]) => {
    const seen = new Set();
    return dramas.filter(d => {
      if (!d.id || !d.title || !d.cover) return false;
      if (seen.has(d.id)) return false;
      seen.add(d.id);
      return true;
    });
  };

  const featuredDramas = filterValidDramas(allDramas).slice(0, 4);
  const trending = filterValidDramas(trendingDramas).slice(0, 6);
  const latest = filterValidDramas(latestDramas).slice(0, 6);
  const recommended = filterValidDramas(allDramas).slice(0, 8);

  return (
    <MobileWrapper maxWidth="full">
      <AppHeader />

      <main className="pt-14 pb-20">
        {/* Carousel Banner - Full Width */}
        {featuredDramas.length > 0 && (
          <DramaCarousel 
            dramas={featuredDramas.map(d => ({
              id: d.id,
              title: d.title,
              cover: d.cover,
              tags: d.tags,
              rating: d.rating,
              description: d.description
            }))} 
            autoPlay={true} 
            interval={5000} 
          />
        )}

        {/* Trending Section */}
        {trending.length > 0 && (
          <section className="mt-5 mb-7 animate-fade-in">
            <Container size="lg">
              <SectionHeader icon={TrendingUp} title="Trending Now" />
            </Container>
            
            <Container size="lg" noPadding>
              <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 sm:px-6 lg:px-8">
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
            </Container>
          </section>
        )}

        {/* Latest Releases Section */}
        {latest.length > 0 && (
          <section className="mb-7 animate-fade-in-delay">
            <Container size="lg">
              <SectionHeader 
                icon={Sparkles} 
                title="New Releases"
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
            </Container>

            <Container size="lg" noPadding>
              <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 sm:px-6 lg:px-8">
                {latest.map((drama) => (
                  <ModernDramaCard
                    key={drama.id}
                    id={drama.id}
                    title={drama.title}
                    cover={drama.cover}
                    rating={drama.rating}
                    episodes={drama.episodes}
                    duration={drama.duration}
                    isNew={drama.isNew}
                    size="medium"
                  />
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* Recommended Section */}
        {recommended.length > 0 && (
          <section className="mb-7 animate-fade-in-delay-2">
            <Container size="lg">
              <SectionHeader icon={Clock} title="Quick Watch" />
            </Container>

            <Container size="lg" noPadding>
              <div className="flex gap-2.5 overflow-x-auto no-scrollbar px-4 sm:px-6 lg:px-8">
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
            </Container>
          </section>
        )}
      </main>

      <BottomNav />
    </MobileWrapper>
  );
}


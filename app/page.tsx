import MobileWrapper from "@/components/layout/MobileWrapper";
import BottomNav from "@/components/layout/BottomNav";
import AppHeader from "@/components/layout/AppHeader";
import DramaCarousel from "@/components/shared/DramaCarousel";
import TrendingSection from "@/components/home/TrendingSection";
import LatestSection from "@/components/home/LatestSection";
import RecommendedSection from "@/components/home/RecommendedSection";
import { getForYou, getLatest, getTrending } from "@/lib/api";
import { filterValidDramas } from "@/lib/utils";
import { 
  FEATURED_DRAMAS_LIMIT, 
  TRENDING_DRAMAS_LIMIT, 
  LATEST_DRAMAS_LIMIT, 
  RECOMMENDED_DRAMAS_LIMIT,
  CAROUSEL_INTERVAL
} from "@/lib/constants";

export default async function HomePage() {
  // Fetch data from API
  const [allDramas, latestDramas, trendingDramas] = await Promise.all([
    getForYou(),
    getLatest(),
    getTrending()
  ]);

  const featuredDramas = filterValidDramas(allDramas).slice(0, FEATURED_DRAMAS_LIMIT);
  const trending = filterValidDramas(trendingDramas).slice(0, TRENDING_DRAMAS_LIMIT);
  const latest = filterValidDramas(latestDramas).slice(0, LATEST_DRAMAS_LIMIT);
  const recommended = filterValidDramas(allDramas).slice(0, RECOMMENDED_DRAMAS_LIMIT);

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
            interval={CAROUSEL_INTERVAL} 
          />
        )}

        <TrendingSection dramas={trending} />
        <LatestSection dramas={latest} />
        <RecommendedSection dramas={recommended} />
      </main>

      <BottomNav />
    </MobileWrapper>
  );
}

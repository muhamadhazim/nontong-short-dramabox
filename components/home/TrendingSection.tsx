import ModernDramaCard from "@/components/shared/ModernDramaCard";
import SectionHeader from "@/components/ui/SectionHeader";
import Container from "@/components/ui/Container";
import { TrendingUp } from "lucide-react";
import { DramaCard } from "@/types/drama";

interface TrendingSectionProps {
  dramas: DramaCard[];
}

export default function TrendingSection({ dramas }: TrendingSectionProps) {
  if (dramas.length === 0) return null;

  return (
    <section className="mt-5 mb-7 animate-fade-in">
      <Container size="lg">
        <SectionHeader icon={TrendingUp} title="Trending Now" />
      </Container>
      
      <Container size="lg" noPadding>
        <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 sm:px-6 lg:px-8">
          {dramas.map((drama) => (
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
  );
}

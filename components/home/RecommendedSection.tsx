import ModernDramaCard from "@/components/shared/ModernDramaCard";
import SectionHeader from "@/components/ui/SectionHeader";
import Container from "@/components/ui/Container";
import { Clock } from "lucide-react";
import { DramaCard } from "@/types/drama";

interface RecommendedSectionProps {
  dramas: DramaCard[];
}

export default function RecommendedSection({ dramas }: RecommendedSectionProps) {
  if (dramas.length === 0) return null;

  return (
    <section className="mb-7 animate-fade-in-delay-2">
      <Container size="lg">
        <SectionHeader icon={Clock} title="Quick Watch" />
      </Container>

      <Container size="lg" noPadding>
        <div className="flex gap-2.5 overflow-x-auto no-scrollbar px-4 sm:px-6 lg:px-8">
          {dramas.map((drama) => (
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
  );
}
